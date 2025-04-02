export interface Answer {
  question_id: number;
  answer: string;
}

export interface RequestListeningI {
  test_type: "listening";
  test_id: number;
  answers: Answer[];
}

export interface ResponseListeningI {
  score: number;
}

export interface ListeningTestResults {
  score: number | null;
  listening_id: number;
  passed_time: null | string;
  passed: boolean;
}

export interface ListeningTest {
  question_count: number;
  listening_id: number;
  test: Part[];
}

export interface Part {
  questions: Question[];
  title: string;
  part: number;
  audio_url: string;
}

export interface Question {
  answers: string[];
  correct_answer: string;
  part: number;
  question: string;
  question_id: number;
}
