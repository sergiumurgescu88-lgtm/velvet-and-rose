import { createParser } from "eventsource-parser";
import { flushSync } from "react-dom";

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-image`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export async function streamImage(
  prompt: string,
  onFrame: (dataUrl: string, isFinal: boolean) => void,
  size = "1024x1024"
): Promise<void> {
  const res = await fetch(FN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${ANON}` },
    body: JSON.stringify({ prompt, size }),
  });
  if (!res.ok || !res.body) {
    const errBody = await res.text().catch(() => "");
    throw new Error(`Image gen failed (${res.status}): ${errBody}`);
  }
  let done = false;
  const parser = createParser({
    onEvent(ev) {
      if (ev.event !== "image_generation.partial_image" && ev.event !== "image_generation.completed") return;
      try {
        const payload = JSON.parse(ev.data);
        const isFinal = ev.event === "image_generation.completed";
        flushSync(() => onFrame(`data:image/png;base64,${payload.b64_json}`, isFinal));
        if (isFinal) done = true;
      } catch {}
    },
  });
  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  try {
    while (true) {
      const { value, done: rd } = await reader.read();
      if (rd) break;
      parser.feed(value);
    }
  } finally {
    reader.cancel().catch(() => {});
  }
  if (!done) throw new Error("Stream ended without completion");
}

export async function editImage(prompt: string, images: string[]): Promise<string> {
  const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/edit-image`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${ANON}` },
    body: JSON.stringify({ prompt, images }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Edit failed");
  return json.image as string;
}

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

// Upload base64 data URL to user's media bucket and create media_assets row
export async function saveImageToLibrary(opts: {
  dataUrl: string;
  prompt?: string;
  source?: string;
  folder?: string;
}): Promise<{ url: string; id: string } | null> {
  const { supabase } = await import("@/integrations/supabase/client");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Sign in required");

  const b64 = opts.dataUrl.split(",")[1];
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const blob = new Blob([bytes], { type: "image/png" });

  const path = `${user.id}/${crypto.randomUUID()}.png`;
  const { error: upErr } = await supabase.storage.from("media").upload(path, blob, { contentType: "image/png" });
  if (upErr) throw upErr;
  const { data: signed } = await supabase.storage.from("media").createSignedUrl(path, 60 * 60 * 24 * 365);
  const url = signed?.signedUrl ?? "";

  const { data, error } = await supabase.from("media_assets").insert({
    user_id: user.id,
    kind: "image",
    storage_path: path,
    url,
    size_bytes: blob.size,
    source: opts.source ?? "ai",
    prompt: opts.prompt ?? null,
    folder: opts.folder ?? null,
  }).select("id").single();
  if (error) throw error;
  return { url, id: data.id };
}
