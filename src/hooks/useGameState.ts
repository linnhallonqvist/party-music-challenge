import { useLocalStorage } from "./useLocalStorage";
import { useEffect } from "react";
import { GameState, DEFAULT_GAME_STATE, DEFAULT_TEAMS, Song, SONGS } from "@/types/game";

export function useGameState() {
  const [rawGameState, setGameState] = useLocalStorage<GameState>("game-state", DEFAULT_GAME_STATE);
  const [songs, setSongs] = useLocalStorage<Song[]>("songs-library", SONGS);

  // Ensure gameState always has valid structure
  const gameState: GameState = {
    ...DEFAULT_GAME_STATE,
    ...rawGameState,
    teams: rawGameState.teams?.length === 2 ? rawGameState.teams : DEFAULT_TEAMS,
    playedSongIds: Array.isArray(rawGameState.playedSongIds) ? rawGameState.playedSongIds : [],
    revealedBoxes: Array.isArray(rawGameState.revealedBoxes) ? rawGameState.revealedBoxes : [],
    redBoxIndices: Array.isArray(rawGameState.redBoxIndices) ? rawGameState.redBoxIndices : [],
  };

  // Helper to generate random red box indices for a song
  const generateRedBoxIndices = (wordCount: number): number[] => {
    const indices = Array.from({ length: wordCount }, (_, i) => i);
    // Shuffle and pick 1-2 random indices
    const shuffled = indices.sort(() => Math.random() - 0.5);
    const count = Math.random() < 0.5 ? 1 : 2;
    return shuffled.slice(0, count);
  };

  // Migrate old triviaQuestions format (string[]) to new format ({ question, answer }[])
  useEffect(() => {
    const needsMigration = songs.some(
      (song) =>
        song.triviaQuestions.length > 0 &&
        typeof song.triviaQuestions[0] === "string"
    );
    if (needsMigration) {
      // Reset to fresh data from JSON file
      setSongs(SONGS);
    }
  }, []);

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

  const selectNextSong = () => {
    const unplayedSongs = songs.filter(
      (s) => !gameState.playedSongIds.includes(s.id)
    );
    if (unplayedSongs.length === 0) {
      setGameState((prev) => ({ ...prev, isGameComplete: true, currentSongId: null }));
      return;
    }
    const nextSong = unplayedSongs[0];
    const redIndices = generateRedBoxIndices(nextSong.words.length);
    setGameState((prev) => ({
      ...prev,
      currentSongId: nextSong.id,
      playedSongIds: [...prev.playedSongIds, nextSong.id],
      revealedBoxes: [],
      redBoxIndices: redIndices,
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

  const startGame = (team1Name: string, team2Name: string) => {
    setGameState(() => ({
      ...DEFAULT_GAME_STATE,
      hasStarted: true,
      teams: [
        { ...DEFAULT_TEAMS[0], name: team1Name, score: 0 },
        { ...DEFAULT_TEAMS[1], name: team2Name, score: 0 },
      ],
      playedSongIds: [],
      isGameComplete: false,
      currentSongId: null,
    }));
  };

  const resetGame = () => {
    setGameState({
      ...DEFAULT_GAME_STATE,
      teams: gameState.teams.map((t) => ({ ...t, score: 0 })),
      playedSongIds: [],
      isGameComplete: false,
      hasStarted: false,
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
    selectNextSong,
    switchTeam,
    awardPoint,
    updateTeamName,
    setTimerSeconds,
    setTimerRunning,
    showTrivia,
    nextTrivia,
    hideTrivia,
    startGame,
    resetGame,
    addSong,
    updateSong,
    deleteSong,
  };
}
