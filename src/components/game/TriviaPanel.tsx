import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, X, Trophy, Music, Eye } from "lucide-react";
import { TriviaQuestion } from "@/types/game";

interface TriviaPanelProps {
  questions: TriviaQuestion[];
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
  const [showAnswer, setShowAnswer] = useState(false);
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex >= questions.length - 1;

  const handleNext = () => {
    setShowAnswer(false);
    onNext();
  };

  return (
    <Card className="bg-card/95 border-2 border-game-gold shadow-[0_0_40px_rgba(234,179,8,0.3)]">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-game-gold">
            <Trophy className="w-6 h-6" />
            Rätt svar!
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Music className="w-5 h-5 text-game-gold" />
          {songTitle} - {artist}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Följdfråga {currentIndex + 1} av {questions.length}
          </div>
          <p className="text-xl md:text-2xl font-medium text-foreground">
            {currentQuestion.question}
          </p>

          {showAnswer ? (
            <>
              <div className="p-4 rounded-lg bg-game-gold/20 border border-game-gold">
                <p className="text-lg font-bold text-game-gold">
                  {currentQuestion.answer}
                </p>
              </div>
              <Button onClick={handleNext} className="w-full bg-game-gold text-game-gold-foreground hover:bg-game-gold/90">
                {isLastQuestion ? "Nästa låt" : "Nästa fråga"} <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              onClick={() => setShowAnswer(true)}
              className="w-full border-game-gold text-game-gold hover:bg-game-gold/10"
            >
              <Eye className="w-4 h-4 mr-2" />
              Visa svar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
