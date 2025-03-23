export interface TestResult {
  test_type: string;
  test_id: number;
  score: number;
  taken_at: string; // Можно заменить на Date, если парсить через new Date()
}

export interface Profile {
  user_id: number;
  email: string;
  avg_listening_score: number | null;
  avg_reading_score: number | null;
  avg_speaking_score: number | null;
  avg_writing_score: number | null;
  current_score: number | null;
  results: TestResult[];
}
