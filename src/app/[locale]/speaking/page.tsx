"use client";

import { Button } from "@/components/ui/button";
import { continueSpeakingTest, finishSpeakingTest, startSpeakingTest } from "@/features/speaking/api/speaking";
import { TAnswer, TContinueSpeakingResponse, TFinishSpeakingResponse, TQuestion, TStartSpeakingResponse } from "@/features/speaking/model";
import { Loader } from "@/shared/ui/Loader";
import MainLayout from "@/widgets/MainLayout";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Mic, MicOff } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  sender: string;
  text?: string;
  part?: number;
  isAudio?: boolean;
  question_id?: number;
}

const Speaking: FC = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isLastPart, setIsLastPart] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [questions, setQuestions] = useState<TQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<TAnswer[]>([]);

  const { data,  mutate, isPending } = useMutation<TStartSpeakingResponse>({
    mutationKey: ['speaking-start'],
    mutationFn: startSpeakingTest,
    // enabled: false,
    // staleTime: 0
  });

  const continueMutation = useMutation<TContinueSpeakingResponse, AxiosError, { answersRequest: TAnswer[], id: number }>({
    mutationKey: ['speaking-continue'],
    mutationFn: ({ answersRequest, id }) => continueSpeakingTest(answersRequest, id),
    onSuccess: (response) => {
      setIsLastPart(true);
      setQuestions(response.questions);
      if (response.questions.length > 0) {
        setCurrentQuestionIndex(response.questions.length - 1);
        setAnswers([]);
      }
    }
  });

  const finishMutation = useMutation<TFinishSpeakingResponse, AxiosError, { answersRequest: TAnswer[], id: number }>({
    mutationKey: ['speaking-finish'],
    mutationFn: ({ answersRequest, id }) => finishSpeakingTest(answersRequest, id),
    onSuccess: () => {
      setIsSubmitted(true)
    }
  });

  useEffect(() => {
    if (data) {
      setMessages([
        {
          id: `intro_${Date.now()}`,
          sender: 'ai',
          text: 'Welcome to the IELTS Speaking test simulation. I will ask you some questions, and you can respond by recording your voice. Let\'s start with Part 1 questions.',
        }
      ]);
      if (data.questions && data.questions.length > 0) {
        const reorderedQuestions = [
          data.questions.find((q) => q.part === 2),
          ...data.questions.filter(q => q.part === 1),
        ].filter((q): q is TQuestion => q !== undefined); // type guard
        setQuestions(reorderedQuestions);
        const lastIndex = Math.min(reorderedQuestions.length - 1, reorderedQuestions.length - 1);
        setCurrentQuestionIndex(lastIndex);
      }
    }
  }, [data]);

  useEffect(() => {
    if (currentQuestionIndex === null || !questions.length) return;

    if (currentQuestionIndex >= 0) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'typing',
          sender: 'ai',
          text: 'Typing...',
        }
      ]);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === 'typing'
              ? {
                  id: questions[currentQuestionIndex].id.toString(),
                  sender: 'ai',
                  part: questions[currentQuestionIndex].part,
                  text: questions[currentQuestionIndex].sub_questions?.length
                    ? `${questions[currentQuestionIndex].question}\n\n${questions[currentQuestionIndex].sub_questions
                        .map((sub, idx) => `${idx + 1}. ${sub}`)
                        .join('\n')}`
                    : questions[currentQuestionIndex].question,
                }
              : m
          )
        );
      }, 2500);
    } else if (currentQuestionIndex === -1 && data) {
      if (!isLastPart) {
        continueMutation.mutate({ answersRequest: answers, id: data.id });
      } else {
        finishMutation.mutate({answersRequest: answers, id: data.id})
      }
    }
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (finishMutation.isPending) {
      setMessages((prev) => [...prev, {
        text: 'Reviewing answers, please wait...',
        id: 'review',
        sender: 'ai',
      }])
    } else {
      setMessages((prev) => [...prev, {
        text: 'Thank you for the participation. Now you can review our conversation and return to main menu.',
        id: 'thank',
        sender: 'ai',
      }])
    }

  }, [finishMutation.isPending])

  useEffect(() => {
    if (continueMutation.isPending) {
      setMessages((prev) => [...prev, {
        text: 'Generating for you part 3 questions, please wait...',
        id: 'part3-generating',
        sender: 'ai',
      }])
    }
  }, [continueMutation.isPending])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });

        if (currentQuestionIndex !== null && currentQuestionIndex >= 0 && questions[currentQuestionIndex]) {
          const currQuestion = questions[currentQuestionIndex].id;
          // Store the answer with its corresponding question ID
          const newAnswer = {
            question_id: currQuestion,
            audio_file: audioBlob
          };
          setAnswers(prev => [...prev, newAnswer]);
          
          // Add user message with audio
          const newMessage: Message = {
            id: `user_response_${Date.now()}`,
            sender: 'user',
            isAudio: true,
            question_id: currQuestion,
            // Store the question ID to reference the correct audio later
            part: questions[currentQuestionIndex].part
          };
          setMessages(prev => [...prev, newMessage]);
          setCurrentQuestionIndex(prev => prev !== null ? prev - 1 : null);
        }
        
        // Stop all tracks from the stream
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <MainLayout
    description="In this section, you will interact with a speaking practice bot that simulates real IELTS exam conditions. The bot will ask you a series of exam-style questions, and you will respond by recording your voice answers. Once you complete the session, the bot will analyze your responses, assess your speaking skills across key IELTS criteria, and provide you with detailed feedback and suggestions for improvement. This interactive practice will help you track your progress, identify weaknesses, and become more confident for the real test."
    title="Speaking"
      isSubmitted={isSubmitted}
      onClick={() => {
        mutate()
      }}
      score={finishMutation.data?.score}
      isStarted={!!data}
      areas={finishMutation.data?.areas_for_improvement}
      strength={finishMutation.data?.strengths}
      recommendations={finishMutation.data?.recommendations}
    >
      
      {isPending ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : data ? (
        <div className="border-2 rounded-xl border-borderCommon bg-white flex flex-col h-full">
          <div className="overflow-auto p-4 flex-1">
            {messages.map((message, index) => {
              const isAI = message.sender === 'ai';
              return (
                <div
                  key={`${message.id}_${index}`}
                  className={`rounded-xl whitespace-pre-wrap max-w-xl p-3 mb-3 ${isAI ? 'bg-gray-100' : 'bg-blue-50 ml-auto'}`}
                >
                  {isAI && message.part ? (
                    <div className="font-semibold mb-1">Part {message.part}</div>
                  ) : null}
                  {message.text}
                  {message.isAudio && message.sender === 'user' && (
                    <audio controls className="mt-2 w-full">
                      <source 
                        src={URL.createObjectURL(
                          // Find the corresponding answer audio blob
                          answers.find(answer => 
                            answer.question_id === message.question_id
                          )?.audio_file || new Blob()
                        )} 
                        type="audio/wav" 
                      />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              );
            })}
          </div>

          <div className="border-t p-4 flex items-center justify-center">
            <Button
              onClick={handleMicClick}
              className={`rounded-full p-3 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-bgCommon hover:bg-red-700'}`}
              disabled={currentQuestionIndex === null || currentQuestionIndex < 0}
            >
              {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
            </Button>
            <div className="ml-3 text-sm">
              {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
            </div>
          </div>
        </div>
      ) : (
        null
      )}
    </MainLayout>
  );
};

export default Speaking;