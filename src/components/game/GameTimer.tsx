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
          "text-6xl md:text-8xl font-mono font-bold transition-colors duration-300",
          isCritical && "text-destructive animate-pulse",
          isLow && !isCritical && "text-game-gold",
          !isLow && "text-foreground"
        )}
      >
        {String(Math.floor(seconds / 60)).padStart(2, "0")}:
        {String(seconds % 60).padStart(2, "0")}
      </div>
      <div className="flex gap-3">
        <Button
          size="lg"
          variant={isRunning ? "destructive" : "default"}
          onClick={toggle}
          className="min-w-[120px]"
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
        <Button size="lg" variant="outline" onClick={reset}>
          <RotateCcw className="w-5 h-5 mr-2" /> Reset
        </Button>
      </div>
    </div>
  );
}
