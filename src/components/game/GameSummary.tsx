import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, RotateCcw } from "lucide-react";
import { Team } from "@/types/game";
import { cn } from "@/lib/utils";

interface GameSummaryProps {
  teams: Team[];
  onPlayAgain: () => void;
}

export function GameSummary({ teams, onPlayAgain }: GameSummaryProps) {
  const team1 = teams[0];
  const team2 = teams[1];

  const getWinner = () => {
    if (team1.score > team2.score) return team1;
    if (team2.score > team1.score) return team2;
    return null; // Tie
  };

  const winner = getWinner();
  const isTie = winner === null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg bg-card border-4 border-game-gold shadow-[0_0_60px_rgba(234,179,8,0.4)]">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <Trophy className="w-16 h-16 text-game-gold animate-pulse" />
          </div>
          <CardTitle className="text-3xl md:text-4xl font-black text-game-gold">
            Spelet är slut!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scores */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className={cn(
                "text-center p-4 rounded-lg border-2",
                winner?.id === team1.id
                  ? "bg-team-red/30 border-team-red"
                  : "bg-muted/50 border-muted"
              )}
            >
              <p className="text-lg font-semibold text-team-red">{team1.name}</p>
              <p className="text-5xl font-black text-team-red">{team1.score}</p>
              {winner?.id === team1.id && (
                <p className="text-sm font-bold text-game-gold mt-2">VINNARE!</p>
              )}
            </div>
            <div
              className={cn(
                "text-center p-4 rounded-lg border-2",
                winner?.id === team2.id
                  ? "bg-team-blue/30 border-team-blue"
                  : "bg-muted/50 border-muted"
              )}
            >
              <p className="text-lg font-semibold text-team-blue">{team2.name}</p>
              <p className="text-5xl font-black text-team-blue">{team2.score}</p>
              {winner?.id === team2.id && (
                <p className="text-sm font-bold text-game-gold mt-2">VINNARE!</p>
              )}
            </div>
          </div>

          {/* Winner announcement */}
          <div className="text-center">
            {isTie ? (
              <p className="text-2xl font-bold text-foreground">
                Oavgjort!
              </p>
            ) : (
              <p className="text-2xl font-bold text-game-gold">
                {winner?.name} vinner!
              </p>
            )}
          </div>

          {/* Play again button */}
          <Button
            onClick={onPlayAgain}
            className="w-full bg-game-gold text-game-gold-foreground hover:bg-game-gold/90 text-lg font-bold py-6"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Spela igen
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
