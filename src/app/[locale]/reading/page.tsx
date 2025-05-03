"use client";

import { Button } from "@/components/ui/button";
import {
  getAllReadingTests,
  getReadingTestById,
  submitReadingTest,
} from "@/features/reading/api/reading";
import {
  ReadingTest,
  ReadingTestResult,
  RequestReadingI,
  ResponseReadingI,
} from "@/features/reading/model/passage";
import { Loader } from "@/shared/ui/Loader";
import { PartItem } from "@/shared/ui/PartItem";
import MainLayout from "@/widgets/MainLayout";
import { TestWidget } from "@/widgets/TestWidget";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

const Reading: FC = () => {
  const [testId, setTestId] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate: getReadingTest, data } = useMutation<
    ReadingTest,
    AxiosError,
    number
  >({
    mutationFn: (id: number) => {
      setTestId(id);
      return getReadingTestById(id);
    },
  });

  const { mutate: submitReading, data: score, isPending } = useMutation<
    ResponseReadingI, // response type
    AxiosError,
    RequestReadingI
  >({
    mutationFn: submitReadingTest,
  });

  const { data: allTests } = useQuery<ReadingTestResult[], AxiosError>({
    queryKey: ["allReadingTests"],
    queryFn: getAllReadingTests,
  });

  const { control, handleSubmit } = useForm<{
    [key: string]: string;
  }>();

  const onSubmit = (data: { [key: string]: string }) => {
    const transformed = Object.entries(data).map(([k, v]) => {
      return {
        question_id: +k.replace("question_", ""),
        answer: v,
      };
    });

    if (testId) {
      submitReading({
        test_id: testId,
        test_type: "reading",
        answers: transformed,
      });

      setIsSubmitted(true);
    }
  };

  const availableTests = (allTests ?? []).filter((test) => !test.passed);
  const completedTests = (allTests ?? []).filter((test) => test.passed);

  return (
    <MainLayout
      description="In this section, you'll practice the IELTS Reading test by working through real exam-style passages and answering comprehension questions within a set time. You can track both completed and pending tests on this page. Completed tests can be retaken to work on mistakes, and if a test has already been completed, your highest score will be displayed."
      title="Reading"
      score={score?.score}
      isStarted={!!data}
      isSubmitted={isSubmitted}
    >
      {data ? (
        <div className="flex flex-col h-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <PartItem
                control={control}
                passageTitle={data.test[0].title}
                passageQuestions={data.test[0].questions}
                passageText={data.test[0].text}
                isScoreAvailable={!!score}
              />
              <PartItem
                control={control}
                passageTitle={data.test[1].title}
                passageQuestions={data.test[1].questions}
                passageText={data.test[1].text}
                isScoreAvailable={!!score}
              />
              <PartItem
                control={control}
                passageTitle={data.test[2].title}
                passageQuestions={data.test[2].questions}
                passageText={data.test[2].text}
                isScoreAvailable={!!score}
              />
            </div>
            <div className="mt-5 mb-8 text-end flex flex-row gap-3 justify-end">
              {!!score && (
                <Button
                  variant={"primary"}
                  onClick={() => window.location.reload()}
                >
                  To Menu
                </Button>
              )}
              <Button type="submit" variant={"primary"} disabled={!!score}>
                Submit Test
              </Button>
            </div>
          </form>
        </div>
      ) : isPending ? (
        <Loader/>
      ) : (
        <TestWidget
          completedTests={completedTests}
          availableTests={availableTests}
          isReading
          onClick={(id) => getReadingTest(id)}
        />
      )}
    </MainLayout>
  );
};

export default Reading;
