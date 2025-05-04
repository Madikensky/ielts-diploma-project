import { baseApiInstance } from "@/shared/api";
import { number } from "zod";
import { TAnswer, TContinueSpeakingRequest } from "../model";

export const startSpeakingTest = async () => {
  const res = await baseApiInstance.get('/api/speaking/start');
  return res.data;
}

export const continueSpeakingTest = async (answers: TAnswer[], speaking_id: number) => {
  const formData = new FormData();

  formData.append('test_type', 'speaking');
  formData.append('speaking_id', speaking_id.toString());

  answers.forEach((answer, index) => {
    formData.append(`answers[${index}][question_id]`, answer.question_id.toString());
    formData.append(`answers[${index}][audio_file]`, answer.audio_file);
  });

  console.log(answers);

  const res = await baseApiInstance.post('api/speaking/continue', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
}

export const finishSpeakingTest = async (answers: TAnswer[], speaking_id: number) => {
  const formData = new FormData();

  formData.append('test_type', 'speaking');
  formData.append('speaking_id', speaking_id.toString());

  answers.forEach((answer, index) => {
    formData.append(`answers[${index}][question_id]`, answer.question_id.toString());
    formData.append(`answers[${index}][audio_file]`, answer.audio_file);
  });

  console.log(answers);

  const res = await baseApiInstance.post('api/speaking/save', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
}

