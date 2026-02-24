import { useState } from "react";
import { motion } from "framer-motion";
import {
  FolderOpen, Search, Grid3x3, List, Filter, Upload,
  Image, Video, Music, Users, Download, Pencil, Trash2,
  Eye, FolderPlus, HardDrive, CheckSquare, X,
  MoreVertical, FileType,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockFiles = [
  { id: 1, name: "fashion_shoot_01.jpg", type: "image", size: "2.4 MB", date: "Feb 20", source: "Generated", duration: null },
  { id: 2, name: "lifestyle_reel.mp4", type: "video", size: "48 MB", date: "Feb 19", source: "Generated", duration: "0:30" },
  { id: 3, name: "voiceover_intro.mp3", type: "audio", size: "1.2 MB", date: "Feb 18", source: "Uploaded", duration: "0:15" },
  { id: 4, name: "luna_avatar.png", type: "image", size: "890 KB", date: "Feb 17", source: "Generated", duration: null },
  { id: 5, name: "dance_clip.mp4", type: "video", size: "92 MB", date: "Feb 16", source: "Generated", duration: "0:45" },
  { id: 6, name: "product_photo.jpg", type: "image", size: "3.1 MB", date: "Feb 15", source: "Uploaded", duration: null },
  { id: 7, name: "bg_music_chill.mp3", type: "audio", size: "4.5 MB", date: "Feb 14", source: "Purchased", duration: "3:22" },
  { id: 8, name: "mia_portrait.png", type: "image", size: "1.8 MB", date: "Feb 13", source: "Generated", duration: null },
];

const typeIcons: Record<string, any> = {
  image: Image,
  video: Video,
  audio: Music,
};

const typeColors: Record<string, string> = {
  image: "bg-primary/10 text-primary",
  video: "bg-safe/10 text-safe",
  audio: "bg-accent text-accent-foreground",
};

const mockFolders = [
  { id: 1, name: "Fashion Content", count: 24 },
  { id: 2, name: "Videos", count: 12 },
  { id: 3, name: "Avatars", count: 8 },
];

const MediaLibrary = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [bulkMode, setBulkMode] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [previewFile, setPreviewFile] = useState<typeof mockFiles[0] | null>(null);

  const usedGB = 2.4;
  const totalGB = 10;

  const filtered = mockFiles.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || f.type === typeFilter;
    const matchSource = sourceFilter === "all" || f.source.toLowerCase() === sourceFilter;
    return matchSearch && matchType && matchSource;
  });

  const toggleSelect = (id: number) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <div className="flex h-full min-h-screen flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-foreground">
              <FolderOpen className="h-7 w-7 text-primary" /> Media Library
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">Toate fișierele tale media într-un singur loc.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={() => setBulkMode(!bulkMode)}>
              <CheckSquare className="h-3.5 w-3.5" /> {bulkMode ? "Cancel" : "Select"}
            </Button>
            <Button size="sm" className="gap-1">
              <Upload className="h-3.5 w-3.5" /> Upload
            </Button>
          </div>
        </div>

        {/* Storage */}
        <div className="mt-4 flex items-center gap-3">
          <HardDrive className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1 max-w-xs">
            <Progress value={(usedGB / totalGB) * 100} className="h-2" />
          </div>
          <span className="text-xs text-muted-foreground">{usedGB} GB / {totalGB} GB used</span>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search files..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Tabs value={typeFilter} onValueChange={setTypeFilter}>
            <TabsList className="h-8">
              <TabsTrigger value="all" className="text-xs h-7">All</TabsTrigger>
              <TabsTrigger value="image" className="text-xs h-7">Images</TabsTrigger>
              <TabsTrigger value="video" className="text-xs h-7">Videos</TabsTrigger>
              <TabsTrigger value="audio" className="text-xs h-7">Audio</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-[130px] h-8 text-xs">
              <Filter className="mr-1 h-3 w-3" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="generated">Generated</SelectItem>
              <SelectItem value="uploaded">Uploaded</SelectItem>
              <SelectItem value="purchased">Purchased</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-1 ml-auto">
            <Button variant={view === "grid" ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => setView("grid")}>
              <Grid3x3 className="h-3.5 w-3.5" />
            </Button>
            <Button variant={view === "list" ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => setView("list")}>
              <List className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {bulkMode && selected.length > 0 && (
          <div className="mt-3 flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2">
            <span className="text-xs text-primary font-medium">{selected.length} selected</span>
            <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs"><Download className="h-3 w-3" /> Download ZIP</Button>
            <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-destructive"><Trash2 className="h-3 w-3" /> Delete</Button>
          </div>
        )}
      </div>

      <div className="flex flex-1">
        {/* Folders sidebar */}
        <div className="hidden w-52 shrink-0 border-r border-border bg-card/50 p-4 lg:block">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-foreground">Folders</h3>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <FolderPlus className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="space-y-1">
            {mockFolders.map((folder) => (
              <button
                key={folder.id}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <FolderOpen className="h-3.5 w-3.5 text-primary" />
                <span className="flex-1 text-left truncate">{folder.name}</span>
                <span className="text-[10px]">{folder.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {view === "grid" ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filtered.map((file, i) => {
                const Icon = typeIcons[file.type] || FileType;
                return (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => bulkMode ? toggleSelect(file.id) : setPreviewFile(file)}
                    className={`group relative cursor-pointer rounded-xl border bg-card p-3 transition-all hover:border-primary/30 ${
                      selected.includes(file.id) ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    {bulkMode && (
                      <div className={`absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded border text-[10px] ${
                        selected.includes(file.id) ? "border-primary bg-primary text-primary-foreground" : "border-border"
                      }`}>
                        {selected.includes(file.id) && "✓"}
                      </div>
                    )}
                    <div className={`mb-2 flex h-24 items-center justify-center rounded-lg ${typeColors[file.type]}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <p className="truncate text-xs font-medium text-foreground">{file.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-muted-foreground">{file.size}</span>
                      <span className="text-[10px] text-muted-foreground">{file.date}</span>
                    </div>
                    {/* Hover actions */}
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 rounded-b-xl bg-card/90 py-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button variant="ghost" size="icon" className="h-6 w-6"><Eye className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6"><Download className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6"><Pencil className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive"><Trash2 className="h-3 w-3" /></Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    {bulkMode && <th className="p-3 w-8"></th>}
                    <th className="p-3">Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Size</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Source</th>
                    <th className="p-3 w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((file) => {
                    const Icon = typeIcons[file.type] || FileType;
                    return (
                      <tr key={file.id} className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer" onClick={() => bulkMode ? toggleSelect(file.id) : setPreviewFile(file)}>
                        {bulkMode && (
                          <td className="p-3">
                            <div className={`flex h-4 w-4 items-center justify-center rounded border text-[8px] ${
                              selected.includes(file.id) ? "border-primary bg-primary text-primary-foreground" : "border-border"
                            }`}>
                              {selected.includes(file.id) && "✓"}
                            </div>
                          </td>
                        )}
                        <td className="p-3 flex items-center gap-2 text-sm text-foreground">
                          <Icon className="h-4 w-4 text-muted-foreground" /> {file.name}
                        </td>
                        <td className="p-3"><Badge variant="outline" className="text-[10px]">{file.type}</Badge></td>
                        <td className="p-3 text-xs text-muted-foreground">{file.size}</td>
                        <td className="p-3 text-xs text-muted-foreground">{file.date}</td>
                        <td className="p-3 text-xs text-muted-foreground">{file.source}</td>
                        <td className="p-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7"><MoreVertical className="h-3.5 w-3.5" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem><Eye className="mr-2 h-3.5 w-3.5" /> Preview</DropdownMenuItem>
                              <DropdownMenuItem><Download className="mr-2 h-3.5 w-3.5" /> Download</DropdownMenuItem>
                              <DropdownMenuItem><Pencil className="mr-2 h-3.5 w-3.5" /> Edit</DropdownMenuItem>
                              <DropdownMenuItem><Video className="mr-2 h-3.5 w-3.5" /> Use in Video</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-3.5 w-3.5" /> Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" onClick={() => setPreviewFile(null)}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6"
          >
            <button onClick={() => setPreviewFile(null)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
            <div className="mb-4 flex h-48 items-center justify-center rounded-xl bg-muted">
              {(() => { const Icon = typeIcons[previewFile.type]; return <Icon className="h-16 w-16 text-muted-foreground/30" />; })()}
            </div>
            <h3 className="font-semibold text-foreground">{previewFile.name}</h3>
            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
              <p>Type: {previewFile.type} · Size: {previewFile.size}</p>
              <p>Date: {previewFile.date} · Source: {previewFile.source}</p>
              {previewFile.duration && <p>Duration: {previewFile.duration}</p>}
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="gap-1"><Download className="h-3 w-3" /> Download</Button>
              <Button variant="outline" size="sm" className="gap-1"><Pencil className="h-3 w-3" /> Use in Editor</Button>
              <Button variant="outline" size="sm" className="gap-1"><Video className="h-3 w-3" /> Use in Video</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
