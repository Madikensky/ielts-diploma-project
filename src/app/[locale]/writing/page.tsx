"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  getWritingTest,
  submitWritingTest,
} from "@/features/writing/api/writing";
import {
  getWritingTestI,
  postWritingTestI,
  WritingFeedback,
} from "@/features/writing/model";
import { Loader } from "@/shared/ui/Loader";
import MainLayout from "@/widgets/MainLayout";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FC, useEffect, useState } from "react";

const Writing: FC = () => {
  const { mutate, data } = useMutation<getWritingTestI>({
    mutationFn: getWritingTest,
  });
  const { mutate: submitWriting, data: feedback } = useMutation<
    WritingFeedback,
    AxiosError,
    postWritingTestI
  >({
    mutationFn: submitWritingTest,
  });
  const [wordCount, setWordCount] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAIAnswered, setIsAIAnswered] = useState(false);

  useEffect(() => {
    setWordCount(text.trim().length > 0 ? text.trim().split(/\s+/).length : 0);
  }, [text]);

  return (
    <MainLayout
      description="In this section, you'll practice Task 2 of the IELTS Writing test. You'll receive a real exam-style essay prompt and a set time to complete your response. 
      After submitting your essay, our AI will analyze your writing and provide feedback on structure, coherence, grammar, and vocabulary, helping you refine your skills and improve your score."
      title="Writing"
      onClick={() => {
        mutate();
        setIsLoading(true);
      }}
      isStarted={!!data}
    >
      {data ? (
        <>
          <p>
            Your essay topis is: <span className="font-bold">{data.task}</span>
          </p>
          <div className="flex flex-row flex-1 min-h-[350px] border-blue-300 gap-5 mt-5">
            <div className="flex flex-col gap-4 w-1/2">
              <Textarea
                className="border-2 border-borderCommon rounded-xl w-full h-full flex flex-col gap-3"
                placeholder="Start your essay here"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <div className="flex flex-row justify-between px-1">
                <p>Word count: {wordCount}</p>
                <Button
                  type="button"
                  variant={"primary"}
                  disabled={wordCount <= 1}
                  onClick={() => {
                    setIsAIAnswered(true);
                    submitWriting({
                      test_id: data?.test_id,
                      essay: text,
                      test_type: "writing",
                    });
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
            <div className="border-2 border-borderCommon w-1/2 rounded-xl px-4 py-2 overflow-y-auto">
              {feedback ? (
                <div className="flex flex-col gap-5">
                  <p className="font-semibold">
                    Score: <span className="font-normal">{feedback.score}</span>
                  </p>
                  <p className="font-semibold">
                    Grammar Feedback:{" "}
                    <span className="font-normal">
                      {feedback.grammar_feedback}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Structure Feedback:{" "}
                    <span className="font-normal">
                      {feedback.structure_feedback}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Vocabulary Feedback:{" "}
                    <span className="font-normal">
                      {feedback.vocabulary_feedback}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Overall:{" "}
                    <span className="font-normal">
                      {feedback.overall_feedback}
                    </span>
                  </p>
                  <p className="font-semibold">
                    AI&apos;s essay variant:{" "}
                    <span className="font-normal">{feedback.ai_essay}</span>
                  </p>
                </div>
              ) : (
                // <Loader />
                <>
                  {isAIAnswered ? (
                    <Loader />
                  ) : (
                    <div className="text-gray-500">
                      AI&apos;s feedback will be here..
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      ) : isLoading ? (
        <Loader />
      ) : null}
    </MainLayout>
  );
};

export default Writing;
