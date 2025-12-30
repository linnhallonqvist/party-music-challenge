import songsData from "@/data/songs.json";

export interface TriviaQuestion {
  question: string;
  answer: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  words: string[];
  triviaQuestions: TriviaQuestion[];
}

export const SONGS: Song[] = songsData;

export interface Team {
  id: string;
  name: string;
  score: number;
}

export interface GameState {
  currentSongId: string | null;
  revealedBoxes: number[];
  redBoxIndices: number[];
  currentTeamIndex: number;
  teams: Team[];
  timerSeconds: number;
  isTimerRunning: boolean;
  showTrivia: boolean;
  currentTriviaIndex: number;
  playedSongIds: string[];
  isGameComplete: boolean;
  hasStarted: boolean;
}

export const DEFAULT_TEAMS: Team[] = [
  { id: "team-1", name: "Lag 1", score: 0 },
  { id: "team-2", name: "Lag 2", score: 0 },
];

export const DEFAULT_GAME_STATE: GameState = {
  currentSongId: null,
  revealedBoxes: [],
  redBoxIndices: [],
  currentTeamIndex: 0,
  teams: DEFAULT_TEAMS,
  timerSeconds: 30,
  isTimerRunning: false,
  showTrivia: false,
  currentTriviaIndex: 0,
  playedSongIds: [],
  isGameComplete: false,
  hasStarted: false,
};

