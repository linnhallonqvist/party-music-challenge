import { Song } from "@/types/game";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, Music } from "lucide-react";

interface SongListProps {
  songs: Song[];
  onEdit: (song: Song) => void;
  onDelete: (songId: string) => void;
}

export function SongList({ songs, onEdit, onDelete }: SongListProps) {
  if (songs.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          <Music className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Inga låtar tillagda ännu.</p>
          <p className="text-sm">Klicka på "Lägg till låt" för att börja.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {songs.map((song) => (
        <Card key={song.id}>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {song.title}
                  <span className="text-muted-foreground font-normal ml-2">
                    - {song.artist}
                  </span>
                </h3>
                <div className="text-sm text-muted-foreground mt-1">
                  <span className="mr-4">
                    {song.words.length} ledtrådsord: {song.words.join(", ")}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {song.triviaQuestions.length} följdfrågor
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(song)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => onDelete(song.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
