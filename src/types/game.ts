export interface Song {
  id: string;
  title: string;
  artist: string;
  words: string[];
  triviaQuestions: string[];
}

export interface Team {
  id: string;
  name: string;
  score: number;
}

export interface GameState {
  currentSongId: string | null;
  revealedBoxes: number[];
  currentTeamIndex: number;
  teams: Team[];
  timerSeconds: number;
  isTimerRunning: boolean;
  showTrivia: boolean;
  currentTriviaIndex: number;
}

export const DEFAULT_TEAMS: Team[] = [
  { id: "team-1", name: "Lag 1", score: 0 },
  { id: "team-2", name: "Lag 2", score: 0 },
];

export const DEFAULT_GAME_STATE: GameState = {
  currentSongId: null,
  revealedBoxes: [],
  currentTeamIndex: 0,
  teams: DEFAULT_TEAMS,
  timerSeconds: 30,
  isTimerRunning: false,
  showTrivia: false,
  currentTriviaIndex: 0,
};

export const SAMPLE_SONGS: Song[] = [
  {
    id: "song-1",
    title: "Dancing Queen",
    artist: "ABBA",
    words: ["Friday", "night", "dancing", "queen", "seventeen", "tambourine"],
    triviaQuestions: [
      "Vilket år släpptes Dancing Queen?",
      "Vilken medlem i ABBA skrev huvudmelodin?",
      "I vilken film används låten i en ikonisk scen?",
    ],
  },
  {
    id: "song-2",
    title: "Sommartider",
    artist: "Gyllene Tider",
    words: ["sommartider", "ringer", "glömma", "vågor", "strand", "sol"],
    triviaQuestions: [
      "Vem är sångare i Gyllene Tider?",
      "Vilket år släpptes Sommartider?",
      "Vilket skivbolag gav ut låten?",
    ],
  },
];
