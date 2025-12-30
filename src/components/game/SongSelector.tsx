import { Song } from "@/types/game";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Music } from "lucide-react";

interface SongSelectorProps {
  songs: Song[];
  currentSongId: string | null;
  onSelectSong: (songId: string) => void;
}

export function SongSelector({ songs, currentSongId, onSelectSong }: SongSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <Music className="w-5 h-5 text-muted-foreground" />
      <Select value={currentSongId || ""} onValueChange={onSelectSong}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Välj en låt..." />
        </SelectTrigger>
        <SelectContent>
          {songs.map((song) => (
            <SelectItem key={song.id} value={song.id}>
              {song.title} - {song.artist}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
