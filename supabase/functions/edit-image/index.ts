// Edit / face-swap / inpaint via Gemini image edit
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { prompt, images } = await req.json() as { prompt: string; images: string[] };
    if (!prompt || !Array.isArray(images) || images.length === 0) {
      return new Response(JSON.stringify({ error: "prompt and images[] required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) throw new Error("LOVABLE_API_KEY not configured");

    const content: any[] = [{ type: "text", text: prompt }];
    for (const url of images) content.push({ type: "image_url", image_url: { url } });

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [{ role: "user", content }],
        modalities: ["image", "text"],
      }),
    });

    if (!upstream.ok) {
      if (upstream.status === 429) return new Response(JSON.stringify({ error: "Rate limited" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (upstream.status === 402) return new Response(JSON.stringify({ error: "Payment required" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const t = await upstream.text();
      return new Response(JSON.stringify({ error: t }), { status: upstream.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const data = await upstream.json();
    // Extract returned image (base64 data url) from Gemini chat-completions image response
    const msg = data?.choices?.[0]?.message;
    let imageDataUrl: string | null = null;
    if (msg?.images?.length) {
      const img = msg.images[0];
      imageDataUrl = img?.image_url?.url ?? null;
    }
    if (!imageDataUrl) {
      return new Response(JSON.stringify({ error: "No image returned", raw: data }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ image: imageDataUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
