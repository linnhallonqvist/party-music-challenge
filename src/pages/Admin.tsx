import { useState } from "react";
import { useGameState } from "@/hooks/useGameState";
import { SongForm } from "@/components/admin/SongForm";
import { SongList } from "@/components/admin/SongList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Song } from "@/types/game";
import { ArrowLeft, Plus } from "lucide-react";

export default function Admin() {
  const { songs, addSong, updateSong, deleteSong } = useGameState();
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = (song: Song) => {
    if (editingSong) {
      updateSong(song);
      setEditingSong(null);
    } else {
      addSong(song);
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setEditingSong(null);
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tillbaka till spelet
            </Link>
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">🎬 Backstage</h1>
        </div>
        {!isAdding && !editingSong && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Lägg till låt
          </Button>
        )}
      </header>

      <div className="max-w-3xl mx-auto">
        {(isAdding || editingSong) ? (
          <SongForm
            song={editingSong || undefined}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <SongList
            songs={songs}
            onEdit={setEditingSong}
            onDelete={deleteSong}
          />
        )}
      </div>
    </div>
  );
}
