export type TStartSpeakingResponse = {
    "id": number,
    "status": boolean,
    "questions": TQuestion[];
}

export type TQuestion = {
  id: number;
  part: number;
  question: string;
  test_type: string;
  sub_questions: string[];
}


export type TAnswer = {
  question_id: number;
  audio_file: File | Blob;
}

export type TContinueSpeakingRequest = {
  answersRequest: TAnswer[];
  id: number
}

export type TContinueSpeakingResponse = {
  "questions": TQuestion[];
}

export type TFinishSpeakingResponse = {
  areas_for_improvement: string;
  recommendations: string;
  score: number;
  strengths: string;
}

