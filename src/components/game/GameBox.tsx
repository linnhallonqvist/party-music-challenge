import { cn } from "@/lib/utils";

interface GameBoxProps {
  number: number;
  word: string;
  isRevealed: boolean;
  onClick: () => void;
}

export function GameBox({ number, word, isRevealed, onClick }: GameBoxProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full aspect-[4/3] rounded-lg text-center transition-all duration-500",
        "flex items-center justify-center overflow-hidden",
        "border-4",
        isRevealed
          ? "bg-gradient-to-br from-game-gold/90 to-game-gold border-game-gold"
          : "bg-gradient-to-br from-game-panel to-game-blue border-game-panel-border cursor-pointer hover:scale-105 hover:border-game-gold/50"
      )}
      style={{
        boxShadow: isRevealed 
          ? "0 0 30px hsl(45 93% 55% / 0.5), inset 0 2px 10px rgba(255,255,255,0.2)" 
          : "0 8px 32px rgba(0,0,0,0.4), inset 0 2px 10px rgba(255,255,255,0.1)",
      }}
    >
      {/* Number display */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-500",
          isRevealed ? "opacity-0 scale-50" : "opacity-100 scale-100"
        )}
      >
        <span 
          className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500"
          style={{
            textShadow: "0 4px 20px rgba(100,150,255,0.5)",
            WebkitTextStroke: "1px rgba(255,255,255,0.2)",
          }}
        >
          {number}
        </span>
      </div>
      
      {/* Word display */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center p-3 transition-all duration-500",
          isRevealed ? "opacity-100 scale-100" : "opacity-0 scale-150"
        )}
      >
        <span className="text-lg md:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-game-gold-foreground break-words text-center leading-tight">
          {word}
        </span>
      </div>
    </button>
  );
}
