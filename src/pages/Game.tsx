import { useGameState } from "@/hooks/useGameState";
import { GameBoard } from "@/components/game/GameBoard";
import { TeamPanel } from "@/components/game/TeamPanel";
import { GameTimer } from "@/components/game/GameTimer";
import { TriviaPanel } from "@/components/game/TriviaPanel";
import { SongSelector } from "@/components/game/SongSelector";
import { GameControls } from "@/components/game/GameControls";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

export default function Game() {
  const {
    gameState,
    songs,
    revealBox,
    revealAllBoxes,
    hideAllBoxes,
    selectSong,
    switchTeam,
    awardPoint,
    updateTeamName,
    setTimerSeconds,
    setTimerRunning,
    showTrivia,
    nextTrivia,
    hideTrivia,
    resetGame,
  } = useGameState();

  const currentSong = songs.find((s) => s.id === gameState.currentSongId) || null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-game-blue/10 p-4 md:p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground">
          🎵 Så Ska Det Låta
        </h1>
        <div className="flex items-center gap-4">
          <SongSelector
            songs={songs}
            currentSongId={gameState.currentSongId}
            onSelectSong={selectSong}
          />
          <Button variant="outline" asChild>
            <Link to="/admin">
              <Settings className="w-4 h-4 mr-2" />
              Backstage
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Game Area */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-6 mb-8">
        {/* Team 1 */}
        <TeamPanel
          team={gameState.teams[0]}
          teamIndex={0}
          isActive={gameState.currentTeamIndex === 0}
          onAwardPoint={() => awardPoint(0)}
          onUpdateName={(name) => updateTeamName(0, name)}
        />

        {/* Game Board */}
        <div className="space-y-6">
          <GameBoard
            song={currentSong}
            revealedBoxes={gameState.revealedBoxes}
            onRevealBox={revealBox}
          />

          {/* Timer */}
          <GameTimer
            seconds={gameState.timerSeconds}
            isRunning={gameState.isTimerRunning}
            onSecondsChange={setTimerSeconds}
            onRunningChange={setTimerRunning}
          />

          {/* Trivia Panel */}
          {gameState.showTrivia && currentSong && (
            <TriviaPanel
              questions={currentSong.triviaQuestions}
              currentIndex={gameState.currentTriviaIndex}
              onNext={nextTrivia}
              onClose={hideTrivia}
              songTitle={currentSong.title}
              artist={currentSong.artist}
            />
          )}
        </div>

        {/* Team 2 */}
        <TeamPanel
          team={gameState.teams[1]}
          teamIndex={1}
          isActive={gameState.currentTeamIndex === 1}
          onAwardPoint={() => awardPoint(1)}
          onUpdateName={(name) => updateTeamName(1, name)}
        />
      </div>

      {/* Game Controls */}
      <GameControls
        onRevealAll={revealAllBoxes}
        onHideAll={hideAllBoxes}
        onSwitchTeam={switchTeam}
        onShowTrivia={showTrivia}
        onResetGame={resetGame}
        hasCurrentSong={!!currentSong}
      />
    </div>
  );
}
