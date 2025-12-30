import { GameBox } from "./GameBox";
import { Song } from "@/types/game";

interface GameBoardProps {
  song: Song | null;
  revealedBoxes: number[];
  onRevealBox: (index: number) => void;
}

export function GameBoard({ song, revealedBoxes, onRevealBox }: GameBoardProps) {
  if (!song) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <p className="text-xl">Välj en låt för att starta spelet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto">
      {song.words.map((word, index) => (
        <GameBox
          key={index}
          number={index + 1}
          word={word}
          isRevealed={revealedBoxes.includes(index)}
          onClick={() => onRevealBox(index)}
        />
      ))}
    </div>
  );
}
