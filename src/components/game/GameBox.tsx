import { cn } from "@/lib/utils";

interface GameBoxProps {
  number: number;
  word: string;
  isRevealed: boolean;
  isRed: boolean;
  onClick: () => void;
}

function getWordSizeClass(word: string): string {
  const len = word.length;
  if (len <= 4) return "text-xl md:text-3xl lg:text-4xl";
  if (len <= 6) return "text-lg md:text-2xl lg:text-3xl";
  if (len <= 8) return "text-base md:text-xl lg:text-2xl";
  if (len <= 10) return "text-sm md:text-lg lg:text-xl";
  return "text-xs md:text-base lg:text-lg";
}

export function GameBox({ number, word, isRevealed, isRed, onClick }: GameBoxProps) {
  const getRevealedStyle = () => {
    if (isRed) {
      return "bg-gradient-to-br from-red-500/90 to-red-600 border-red-500";
    }
    return "bg-gradient-to-br from-game-gold/90 to-game-gold border-game-gold";
  };

  const getBoxShadow = () => {
    if (!isRevealed) {
      return "0 8px 32px rgba(0,0,0,0.4), inset 0 2px 10px rgba(255,255,255,0.1)";
    }
    if (isRed) {
      return "0 0 30px rgba(239, 68, 68, 0.6), inset 0 2px 10px rgba(255,255,255,0.2)";
    }
    return "0 0 30px hsl(45 93% 55% / 0.5), inset 0 2px 10px rgba(255,255,255,0.2)";
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full aspect-[4/3] rounded-lg text-center transition-all duration-500",
        "flex items-center justify-center overflow-hidden",
        "border-4",
        isRevealed
          ? getRevealedStyle()
          : "bg-gradient-to-br from-game-panel to-game-blue border-game-panel-border cursor-pointer hover:scale-105 hover:border-game-gold/50"
      )}
      style={{
        boxShadow: getBoxShadow(),
      }}
    >
      {/* Number display - z-10 ensures it stays on top during transitions */}
      <div
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center transition-all duration-500",
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

      {/* Word display - only rendered when revealed */}
      {isRevealed && (
        <div
          className="absolute inset-0 z-0 flex items-center justify-center p-2"
        >
          <span
            className={cn(
              "font-bold uppercase tracking-wide text-game-gold-foreground text-center leading-tight",
              getWordSizeClass(word)
            )}
            style={{ wordBreak: "break-word", hyphens: "auto" }}
          >
            {word}
          </span>
        </div>
      )}
    </button>
  );
}
