import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Play } from "lucide-react";

interface WelcomeScreenProps {
  onStart: (team1Name: string, team2Name: string) => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [team1Name, setTeam1Name] = useState("Lag 1");
  const [team2Name, setTeam2Name] = useState("Lag 2");

  const handleStart = () => {
    onStart(team1Name || "Lag 1", team2Name || "Lag 2");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "radial-gradient(ellipse at center, hsl(225 60% 18%) 0%, hsl(225 60% 8%) 100%)",
      }}
    >
      {/* Decorative background */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, hsl(45 93% 55% / 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, hsl(45 93% 55% / 0.2) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, hsl(200 80% 55% / 0.1) 0%, transparent 70%)
          `,
        }}
      />

      <Card className="w-full max-w-md bg-card/95 border-4 border-game-gold shadow-[0_0_60px_rgba(234,179,8,0.3)] relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Music className="w-16 h-16 text-game-gold" />
          </div>
          <CardTitle
            className="text-4xl md:text-5xl font-black"
            style={{
              background:
                "linear-gradient(180deg, hsl(45 93% 65%) 0%, hsl(45 93% 45%) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Så Ska Det Låta
          </CardTitle>
          <p className="text-muted-foreground">
            Ange lagnamn och starta spelet!
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-team-red">
                Lag 1
              </label>
              <Input
                value={team1Name}
                onChange={(e) => setTeam1Name(e.target.value)}
                placeholder="Ange lagnamn..."
                className="border-team-red/50 focus:border-team-red"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-team-blue">
                Lag 2
              </label>
              <Input
                value={team2Name}
                onChange={(e) => setTeam2Name(e.target.value)}
                placeholder="Ange lagnamn..."
                className="border-team-blue/50 focus:border-team-blue"
              />
            </div>
          </div>

          <Button
            onClick={handleStart}
            className="w-full bg-game-gold text-game-gold-foreground hover:bg-game-gold/90 text-lg font-bold py-6"
          >
            <Play className="w-5 h-5 mr-2" />
            Starta spelet
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
