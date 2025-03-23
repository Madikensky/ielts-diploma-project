import { Control } from "react-hook-form";

// export interface TestInfo {
//   cardinality: string;
//   field: string;
//   owner: string;
// }

// export interface TestDataI {
//   part1: Part;
//   part2: Part;
//   part3: Part;
// }

////////////////////////////

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
