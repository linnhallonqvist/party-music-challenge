import { useLocalStorage } from "./useLocalStorage";
import { GameState, DEFAULT_GAME_STATE, Song, SAMPLE_SONGS } from "@/types/game";

export function useGameState() {
  const [gameState, setGameState] = useLocalStorage<GameState>("game-state", DEFAULT_GAME_STATE);
  const [songs, setSongs] = useLocalStorage<Song[]>("songs-library", SAMPLE_SONGS);

  const revealBox = (index: number) => {
    setGameState((prev) => ({
      ...prev,
      revealedBoxes: prev.revealedBoxes.includes(index)
        ? prev.revealedBoxes
        : [...prev.revealedBoxes, index],
    }));
  };

  const revealAllBoxes = () => {
    const currentSong = songs.find((s) => s.id === gameState.currentSongId);
    if (currentSong) {
      setGameState((prev) => ({
        ...prev,
        revealedBoxes: currentSong.words.map((_, i) => i),
      }));
    }
  };

  const hideAllBoxes = () => {
    setGameState((prev) => ({
      ...prev,
      revealedBoxes: [],
    }));
  };

  const selectSong = (songId: string) => {
    setGameState((prev) => ({
      ...prev,
      currentSongId: songId,
      revealedBoxes: [],
      showTrivia: false,
      currentTriviaIndex: 0,
    }));
  };

  const switchTeam = () => {
    setGameState((prev) => ({
      ...prev,
      currentTeamIndex: prev.currentTeamIndex === 0 ? 1 : 0,
    }));
  };

  const awardPoint = (teamIndex: number) => {
    setGameState((prev) => ({
      ...prev,
      teams: prev.teams.map((team, i) =>
        i === teamIndex ? { ...team, score: team.score + 1 } : team
      ),
    }));
  };

  const updateTeamName = (teamIndex: number, name: string) => {
    setGameState((prev) => ({
      ...prev,
      teams: prev.teams.map((team, i) =>
        i === teamIndex ? { ...team, name } : team
      ),
    }));
  };

  const setTimerSeconds = (seconds: number) => {
    setGameState((prev) => ({ ...prev, timerSeconds: seconds }));
  };

  const setTimerRunning = (running: boolean) => {
    setGameState((prev) => ({ ...prev, isTimerRunning: running }));
  };

  const showTrivia = () => {
    setGameState((prev) => ({ ...prev, showTrivia: true, currentTriviaIndex: 0 }));
  };

  const nextTrivia = () => {
    setGameState((prev) => ({
      ...prev,
      currentTriviaIndex: prev.currentTriviaIndex + 1,
    }));
  };

  const hideTrivia = () => {
    setGameState((prev) => ({ ...prev, showTrivia: false, currentTriviaIndex: 0 }));
  };

  const resetGame = () => {
    setGameState({
      ...DEFAULT_GAME_STATE,
      teams: gameState.teams.map((t) => ({ ...t, score: 0 })),
    });
  };

  const addSong = (song: Song) => {
    setSongs((prev) => [...prev, song]);
  };

  const updateSong = (song: Song) => {
    setSongs((prev) => prev.map((s) => (s.id === song.id ? song : s)));
  };

  const deleteSong = (songId: string) => {
    setSongs((prev) => prev.filter((s) => s.id !== songId));
  };

  return {
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
    addSong,
    updateSong,
    deleteSong,
  };
}
