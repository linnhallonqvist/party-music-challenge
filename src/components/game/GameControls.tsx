import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Users, Trophy, RotateCcw, Shuffle, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface GameControlsProps {
  onRevealAll: () => void;
  onHideAll: () => void;
  onSwitchTeam: () => void;
  onShowTrivia: () => void;
  onResetGame: () => void;
  onNewRound: () => void;
  hasCurrentSong: boolean;
}

export function GameControls({
  onRevealAll,
  onHideAll,
  onSwitchTeam,
  onShowTrivia,
  onResetGame,
  onNewRound,
  hasCurrentSong,
}: GameControlsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Button
        variant="default"
        className="bg-game-gold text-game-gold-foreground hover:bg-game-gold/90 font-bold"
        onClick={onNewRound}
      >
        <Shuffle className="w-4 h-4 mr-2" />
        Ny runda
      </Button>
      <Button
        variant="secondary"
        onClick={onRevealAll}
        disabled={!hasCurrentSong}
      >
        <Eye className="w-4 h-4 mr-2" />
        Visa alla
      </Button>
      <Button
        variant="secondary"
        onClick={onHideAll}
        disabled={!hasCurrentSong}
      >
        <EyeOff className="w-4 h-4 mr-2" />
        Dölj alla
      </Button>
      <Button variant="secondary" onClick={onSwitchTeam}>
        <Users className="w-4 h-4 mr-2" />
        Byt lag
      </Button>
      <Button
        variant="default"
        className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
        onClick={onShowTrivia}
        disabled={!hasCurrentSong}
      >
        <Trophy className="w-4 h-4 mr-2" />
        Rätt svar!
      </Button>
      <Button variant="outline" onClick={onResetGame}>
        <RotateCcw className="w-4 h-4 mr-2" />
        Nollställ
      </Button>
      <Button variant="outline" asChild>
        <Link to="/admin">
          <Settings className="w-4 h-4 mr-2" />
          Backstage
        </Link>
      </Button>
    </div>
  );
}
