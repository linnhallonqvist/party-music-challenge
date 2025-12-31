import { useGameState } from "@/hooks/useGameState";
import { GameBoard } from "@/components/game/GameBoard";
import { TeamPanel } from "@/components/game/TeamPanel";
import { GameTimer } from "@/components/game/GameTimer";
import { TriviaPanel } from "@/components/game/TriviaPanel";
import { GameControls } from "@/components/game/GameControls";
import { GameSummary } from "@/components/game/GameSummary";
import { WelcomeScreen } from "@/components/game/WelcomeScreen";
import { useCallback } from "react";

export default function Game() {
  const {
    gameState,
    songs,
    revealBox,
    selectNextSong,
    switchTeam,
    awardPoint,
    subtractPoint,
    updateTeamName,
    setTimerSeconds,
    setTimerRunning,
    showTrivia,
    nextTrivia,
    hideTrivia,
    startGame,
    resetGame,
  } = useGameState();

  const currentSong = songs.find((s) => s.id === gameState.currentSongId) || null;

  // All hooks must be called before any early returns
  const handleCorrectAnswer = useCallback(() => {
    if (!currentSong) return;

    setTimerRunning(false);

    // Reveal boxes one by one from left to right
    const unrevealedBoxes = currentSong.words
      .map((_, index) => index)
      .filter((index) => !gameState.revealedBoxes.includes(index));

    unrevealedBoxes.forEach((boxIndex, i) => {
      setTimeout(() => {
        revealBox(boxIndex);
      }, i * 300);
    });

    // Show trivia after all boxes are revealed
    setTimeout(() => {
      showTrivia();
    }, unrevealedBoxes.length * 300 + 200);
  }, [currentSong, gameState.revealedBoxes, revealBox, setTimerRunning, showTrivia]);

  // Show welcome screen if game hasn't started
  if (!gameState.hasStarted) {
    return <WelcomeScreen onStart={(team1, team2) => {
      startGame(team1, team2);
      selectNextSong();
    }} />;
  }

  const handleNextSong = () => {
    selectNextSong();
    setTimerSeconds(20);
    setTimerRunning(false);
  };

  const handleRevealBox = (index: number) => {
    // Don't reveal already revealed boxes
    if (gameState.revealedBoxes.includes(index)) return;

    revealBox(index);

    // Check if this is a red box - if so, switch teams
    if (gameState.redBoxIndices.includes(index)) {
      switchTeam();
      // Reset timer for the other team
      setTimerSeconds(20);
      setTimerRunning(true);
      return;
    }

    // Start timer when revealing a box
    if (!gameState.isTimerRunning) {
      setTimerSeconds(20);
      setTimerRunning(true);
    }
  };

  const handleNextTrivia = () => {
    const isLastQuestion = currentSong && gameState.currentTriviaIndex >= currentSong.triviaQuestions.length - 1;
    if (isLastQuestion) {
      hideTrivia();
      handleNextSong();
    } else {
      nextTrivia();
    }
  };

  return (
    <div 
      className="min-h-screen p-4 md:p-6 flex flex-col"
      style={{
        background: "radial-gradient(ellipse at center, hsl(225 60% 18%) 0%, hsl(225 60% 8%) 100%)",
      }}
    >
      {/* Decorative background pattern */}
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

      {/* Header with title */}
      <header className="text-center mb-6 relative z-10">
        <h1
          className="text-4xl md:text-6xl font-black tracking-tight"
          style={{
            background: "linear-gradient(180deg, hsl(45 93% 65%) 0%, hsl(45 93% 45%) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 4px 30px hsl(45 93% 55% / 0.5)",
          }}
        >
          Så Ska Det Låta
        </h1>
        <p className="text-muted-foreground mt-2">
          Låt {gameState.playedSongIds.length} av {songs.length}
        </p>
      </header>

      {/* Game Boxes - Horizontal row at top */}
      <div className="mb-8 relative z-10">
        <GameBoard
          song={currentSong}
          revealedBoxes={gameState.revealedBoxes}
          redBoxIndices={gameState.redBoxIndices}
          onRevealBox={handleRevealBox}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-start relative z-10">
        {/* Team 1 */}
        <TeamPanel
          team={gameState.teams[0]}
          teamIndex={0}
          isActive={gameState.currentTeamIndex === 0}
          onAwardPoint={() => awardPoint(0)}
          onSubtractPoint={() => subtractPoint(0)}
          onUpdateName={(name) => updateTeamName(0, name)}
        />

        {/* Center - Timer and Trivia */}
        <div className="flex flex-col items-center gap-6 min-w-[300px]">
          <GameTimer
            seconds={gameState.timerSeconds}
            isRunning={gameState.isTimerRunning}
            onSecondsChange={setTimerSeconds}
            onRunningChange={setTimerRunning}
          />

          {/* Trivia Panel */}
          {gameState.showTrivia && currentSong && (
            <div className="w-full max-w-md">
              <TriviaPanel
                questions={currentSong.triviaQuestions}
                currentIndex={gameState.currentTriviaIndex}
                onNext={handleNextTrivia}
                onClose={hideTrivia}
                songTitle={currentSong.title}
                artist={currentSong.artist}
                spotifyUrl={currentSong.spotifyUrl}
              />
            </div>
          )}
        </div>

        {/* Team 2 */}
        <TeamPanel
          team={gameState.teams[1]}
          teamIndex={1}
          isActive={gameState.currentTeamIndex === 1}
          onAwardPoint={() => awardPoint(1)}
          onSubtractPoint={() => subtractPoint(1)}
          onUpdateName={(name) => updateTeamName(1, name)}
        />
      </div>

      {/* Game Controls - Bottom */}
      <div className="mt-8 relative z-10">
        <GameControls
          onSwitchTeam={switchTeam}
          onShowTrivia={handleCorrectAnswer}
          onResetGame={resetGame}
          hasCurrentSong={!!currentSong}
        />
      </div>

      {/* Game Summary - shown when all songs are played */}
      {gameState.isGameComplete && (
        <GameSummary teams={gameState.teams} onPlayAgain={resetGame} />
      )}
    </div>
  );
}
