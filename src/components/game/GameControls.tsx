import { Button } from "@/components/ui/button";
import { Users, Trophy, RotateCcw, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface GameControlsProps {
  onSwitchTeam: () => void;
  onShowTrivia: () => void;
  onResetGame: () => void;
  hasCurrentSong: boolean;
}

export function GameControls({
  onSwitchTeam,
  onShowTrivia,
  onResetGame,
  hasCurrentSong,
}: GameControlsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Button variant="secondary" onClick={onSwitchTeam}>
        <Users className="w-4 h-4 mr-2" />
        Turen går över
      </Button>
      <Button
        variant="default"
        className="bg-game-gold text-game-gold-foreground hover:bg-game-gold/90 font-bold"
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
