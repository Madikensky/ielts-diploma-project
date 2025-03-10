import { Control } from "react-hook-form";

export interface TestInfo {
  cardinality: string;
  field: string;
  owner: string;
}

export interface Question {
  id: string;
  status: string;
  test: TestInfo;
  question: string;
  test_id: string;
  inserted_at: string;
  updated_at: string;
  answers: string[];
  correct_answer: string;
}

export interface Part {
  text: string;
  questions: Question[];
}

export interface TestDataI {
  part1: Part;
  part2: Part;
  part3: Part;
}

export interface PassageItemProps {
  passageNumber: number;
  passageText: string;
  passageQuestions: Question[];
  control: Control;
}
