export interface getWritingTestI {
  task: string;
  test_id: number;
}

export interface postWritingTestI {
  essay: string;
  test_id: number;
}

export interface WritingFeedback {
  user_id: number;
  score: number;
  user_essay: string;
  writing_id: number;
  grammar_feedback: string;
  vocabulary_feedback: string;
  structure_feedback: string;
  overall_feedback: string;
  ai_essay: string;
}
