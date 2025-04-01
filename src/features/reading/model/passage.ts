export interface ReadingTest {
  question_count: number;
  reading_id: number;
  test: Part[];
}

export interface Part {
  text: string;
  questions: Question[];
  title: string;
}

export interface Question {
  answers: string[];
  correct_answer: string;
  part: number;
  question: string;
  question_id: number;
}

export interface Answer {
  question_id: number;
  answer: string;
}

export interface ResponseReadingI {
  score: number;
}

export interface RequestReadingI {
  test_type: "reading";
  test_id: number;
  answers: Answer[];
}

export interface ReadingTestResult {
  passed: boolean;
  passed_time: string;
  reading_id: number;
  score: number;
}
