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
      <div className="flex items-center justify-center h-32 text-muted-foreground">
        <p className="text-xl">Tryck på "Ny runda" för att starta</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-3 md:gap-4 lg:gap-6 w-full max-w-6xl mx-auto px-4">
      {song.words.map((word, index) => (
        <div key={index} className="flex-1 max-w-[180px]">
          <GameBox
            number={index + 1}
            word={word}
            isRevealed={revealedBoxes.includes(index)}
            onClick={() => onRevealBox(index)}
          />
        </div>
      ))}
    </div>
  );
}
