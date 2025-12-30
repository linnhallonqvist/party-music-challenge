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
        "relative w-full aspect-square rounded-xl text-center transition-all duration-500 transform-gpu",
        "shadow-lg hover:shadow-xl hover:scale-105",
        "flex items-center justify-center",
        isRevealed
          ? "bg-game-gold text-game-gold-foreground rotate-y-180"
          : "bg-game-blue text-game-blue-foreground cursor-pointer"
      )}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-xl transition-opacity duration-300",
          isRevealed ? "opacity-0" : "opacity-100"
        )}
      >
        <span className="text-4xl md:text-6xl font-bold drop-shadow-md">{number}</span>
      </div>
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-xl p-2 transition-opacity duration-300",
          isRevealed ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="text-xl md:text-3xl font-bold uppercase tracking-wide break-words">
          {word}
        </span>
      </div>
    </button>
  );
}
