import { Team } from "@/types/game";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TeamPanelProps {
  team: Team;
  teamIndex: number;
  isActive: boolean;
  onAwardPoint: () => void;
  onUpdateName: (name: string) => void;
}

export function TeamPanel({
  team,
  teamIndex,
  isActive,
  onAwardPoint,
  onUpdateName,
}: TeamPanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(team.name);

  const handleSave = () => {
    onUpdateName(tempName);
    setIsEditing(false);
  };

  const teamColor = teamIndex === 0 ? "team-red" : "team-blue";

  return (
    <div
      className={cn(
        "rounded-xl p-4 md:p-6 transition-all duration-300",
        teamIndex === 0 ? "bg-team-red/10 border-2 border-team-red" : "bg-team-blue/10 border-2 border-team-blue",
        isActive && "ring-4 ring-game-gold shadow-lg scale-105"
      )}
    >
      {isActive && (
        <div className="text-center mb-2">
          <span className="bg-game-gold text-game-gold-foreground px-3 py-1 rounded-full text-sm font-bold animate-pulse">
            ER TUR!
          </span>
        </div>
      )}

      {isEditing ? (
        <div className="flex gap-2 mb-4">
          <Input
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            className="text-center font-bold"
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
          <Button size="sm" onClick={handleSave}>
            Spara
          </Button>
        </div>
      ) : (
        <h2
          className={cn(
            "text-xl md:text-2xl font-bold text-center mb-4 cursor-pointer hover:opacity-80",
            teamIndex === 0 ? "text-team-red" : "text-team-blue"
          )}
          onClick={() => {
            setTempName(team.name);
            setIsEditing(true);
          }}
        >
          {team.name}
        </h2>
      )}

      <div className="text-center">
        <div className={cn(
          "text-5xl md:text-7xl font-bold mb-4",
          teamIndex === 0 ? "text-team-red" : "text-team-blue"
        )}>
          {team.score}
        </div>
        <div className="flex justify-center gap-2">
          <Button
            size="lg"
            className={cn(
              "text-lg",
              teamIndex === 0 
                ? "bg-team-red hover:bg-team-red/90 text-white" 
                : "bg-team-blue hover:bg-team-blue/90 text-white"
            )}
            onClick={onAwardPoint}
          >
            <Plus className="w-5 h-5 mr-1" />
            Poäng
          </Button>
        </div>
      </div>
    </div>
  );
}
