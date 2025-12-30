import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Users, Trophy, RotateCcw } from "lucide-react";

interface GameControlsProps {
  onRevealAll: () => void;
  onHideAll: () => void;
  onSwitchTeam: () => void;
  onShowTrivia: () => void;
  onResetGame: () => void;
  hasCurrentSong: boolean;
}

export function GameControls({
  onRevealAll,
  onHideAll,
  onSwitchTeam,
  onShowTrivia,
  onResetGame,
  hasCurrentSong,
}: GameControlsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Button
        variant="outline"
        onClick={onRevealAll}
        disabled={!hasCurrentSong}
      >
        <Eye className="w-4 h-4 mr-2" />
        Visa alla
      </Button>
      <Button
        variant="outline"
        onClick={onHideAll}
        disabled={!hasCurrentSong}
      >
        <EyeOff className="w-4 h-4 mr-2" />
        Dölj alla
      </Button>
      <Button variant="outline" onClick={onSwitchTeam}>
        <Users className="w-4 h-4 mr-2" />
        Byt lag
      </Button>
      <Button
        variant="default"
        className="bg-game-gold text-game-gold-foreground hover:bg-game-gold/90"
        onClick={onShowTrivia}
        disabled={!hasCurrentSong}
      >
        <Trophy className="w-4 h-4 mr-2" />
        Rätt svar!
      </Button>
      <Button variant="destructive" onClick={onResetGame}>
        <RotateCcw className="w-4 h-4 mr-2" />
        Nollställ
      </Button>
    </div>
  );
}
