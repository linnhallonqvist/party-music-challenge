import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameTimerProps {
  seconds: number;
  isRunning: boolean;
  onSecondsChange: (seconds: number) => void;
  onRunningChange: (running: boolean) => void;
  defaultSeconds?: number;
}

export function GameTimer({
  seconds,
  isRunning,
  onSecondsChange,
  onRunningChange,
  defaultSeconds = 30,
}: GameTimerProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        onSecondsChange(seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      onRunningChange(false);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, seconds, onSecondsChange, onRunningChange]);

  const reset = () => {
    onRunningChange(false);
    onSecondsChange(defaultSeconds);
  };

  const toggle = () => {
    onRunningChange(!isRunning);
  };

  const isLow = seconds <= 10;
  const isCritical = seconds <= 5;

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={cn(
          "text-7xl md:text-9xl font-mono font-bold transition-all duration-300",
          isCritical && "text-destructive animate-pulse scale-110",
          isLow && !isCritical && "text-game-gold",
          !isLow && "text-foreground"
        )}
        style={{
          textShadow: isCritical 
            ? "0 0 40px hsl(0 72% 51% / 0.8)" 
            : isLow 
              ? "0 0 40px hsl(45 93% 55% / 0.5)" 
              : "0 0 20px rgba(255,255,255,0.3)"
        }}
      >
        {String(Math.floor(seconds / 60)).padStart(2, "0")}:
        {String(seconds % 60).padStart(2, "0")}
      </div>
      <div className="flex gap-3">
        <Button
          size="lg"
          variant={isRunning ? "destructive" : "default"}
          onClick={toggle}
          className={cn(
            "min-w-[140px] font-bold",
            !isRunning && "bg-game-gold text-game-gold-foreground hover:bg-game-gold/90"
          )}
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5 mr-2" /> Pausa
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" /> Starta
            </>
          )}
        </Button>
        <Button size="lg" variant="secondary" onClick={reset}>
          <RotateCcw className="w-5 h-5 mr-2" /> Reset
        </Button>
      </div>
    </div>
  );
}
