import { Team } from "@/types/game";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
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

  return (
    <div
      className={cn(
        "rounded-xl p-4 md:p-6 transition-all duration-300 border-2",
        teamIndex === 0 
          ? "bg-team-red/20 border-team-red" 
          : "bg-team-blue/20 border-team-blue",
        isActive && "ring-4 ring-game-gold shadow-[0_0_40px_rgba(234,179,8,0.3)] scale-105"
      )}
    >
      {isActive && (
        <div className="text-center mb-3">
          <span className="bg-game-gold text-game-gold-foreground px-4 py-1.5 rounded-full text-sm font-bold animate-pulse shadow-lg">
            ER TUR!
          </span>
        </div>
      )}

      {isEditing ? (
        <div className="flex gap-2 mb-4">
          <Input
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            className="text-center font-bold bg-background/50"
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
          <Button size="sm" onClick={handleSave} variant="secondary">
            OK
          </Button>
        </div>
      ) : (
        <h2
          className={cn(
            "text-xl md:text-2xl font-bold text-center mb-4 cursor-pointer hover:opacity-80 transition-opacity",
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
        <div 
          className={cn(
            "text-6xl md:text-8xl font-bold mb-4 drop-shadow-lg",
            teamIndex === 0 ? "text-team-red" : "text-team-blue"
          )}
          style={{
            textShadow: teamIndex === 0 
              ? "0 0 30px hsl(350 80% 55% / 0.5)" 
              : "0 0 30px hsl(200 80% 55% / 0.5)"
          }}
        >
          {team.score}
        </div>
        <Button
          size="lg"
          className={cn(
            "text-lg font-bold",
            teamIndex === 0 
              ? "bg-team-red hover:bg-team-red/80 text-white" 
              : "bg-team-blue hover:bg-team-blue/80 text-white"
          )}
          onClick={onAwardPoint}
        >
          <Plus className="w-5 h-5 mr-1" />
          Poäng
        </Button>
      </div>
    </div>
  );
}
