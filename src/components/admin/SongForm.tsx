import { useState } from "react";
import { Song, TriviaQuestion } from "@/types/game";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, X } from "lucide-react";

interface SongFormProps {
  song?: Song;
  onSave: (song: Song) => void;
  onCancel: () => void;
}

function triviaToText(questions: TriviaQuestion[]): string {
  return questions.map((q) => `${q.question} | ${q.answer}`).join("\n");
}

function textToTrivia(text: string): TriviaQuestion[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|");
      return {
        question: parts[0]?.trim() || "",
        answer: parts[1]?.trim() || "",
      };
    })
    .filter((q) => q.question);
}

export function SongForm({ song, onSave, onCancel }: SongFormProps) {
  const [title, setTitle] = useState(song?.title || "");
  const [artist, setArtist] = useState(song?.artist || "");
  const [wordsText, setWordsText] = useState(song?.words.join(", ") || "");
  const [triviaText, setTriviaText] = useState(
    song?.triviaQuestions ? triviaToText(song.triviaQuestions) : ""
  );
  const [spotifyUrl, setSpotifyUrl] = useState(song?.spotifyUrl || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSong: Song = {
      id: song?.id || `song-${Date.now()}`,
      title,
      artist,
      words: wordsText.split(",").map((w) => w.trim()).filter(Boolean),
      triviaQuestions: textToTrivia(triviaText),
      spotifyUrl: spotifyUrl || undefined,
    };
    onSave(newSong);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{song ? "Redigera låt" : "Lägg till ny låt"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Låttitel</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="T.ex. Dancing Queen"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="artist">Artist</Label>
              <Input
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="T.ex. ABBA"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="words">
              Ledtrådsord (separera med komma, 5-6 ord rekommenderas)
            </Label>
            <Textarea
              id="words"
              value={wordsText}
              onChange={(e) => setWordsText(e.target.value)}
              placeholder="ord1, ord2, ord3, ord4, ord5, ord6"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trivia">
              Följdfrågor med svar (format: Fråga | Svar, en per rad)
            </Label>
            <Textarea
              id="trivia"
              value={triviaText}
              onChange={(e) => setTriviaText(e.target.value)}
              placeholder="Vilket år släpptes låten? | 1976&#10;Vem skrev låten? | Benny Andersson"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="spotifyUrl">Spotify-länk (valfritt)</Label>
            <Input
              id="spotifyUrl"
              value={spotifyUrl}
              onChange={(e) => setSpotifyUrl(e.target.value)}
              placeholder="https://open.spotify.com/track/..."
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Avbryt
            </Button>
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              {song ? "Spara ändringar" : "Lägg till"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
