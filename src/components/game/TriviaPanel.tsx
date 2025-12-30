import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, X, Trophy } from "lucide-react";

interface TriviaPanelProps {
  questions: string[];
  currentIndex: number;
  onNext: () => void;
  onClose: () => void;
  songTitle: string;
  artist: string;
}

export function TriviaPanel({
  questions,
  currentIndex,
  onNext,
  onClose,
  songTitle,
  artist,
}: TriviaPanelProps) {
  const isComplete = currentIndex >= questions.length;

  return (
    <Card className="bg-game-gold/10 border-2 border-game-gold">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-game-gold">
            <Trophy className="w-6 h-6" />
            Rätt svar!
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-lg font-bold text-foreground">
          {songTitle} - {artist}
        </p>
      </CardHeader>
      <CardContent>
        {isComplete ? (
          <div className="text-center py-4">
            <p className="text-xl font-semibold text-muted-foreground">
              Alla följdfrågor besvarade!
            </p>
            <Button onClick={onClose} className="mt-4">
              Nästa låt
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Följdfråga {currentIndex + 1} av {questions.length}
            </div>
            <p className="text-xl md:text-2xl font-medium text-foreground">
              {questions[currentIndex]}
            </p>
            <Button onClick={onNext} className="w-full">
              Nästa fråga <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
