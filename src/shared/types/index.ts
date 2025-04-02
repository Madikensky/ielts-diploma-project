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
