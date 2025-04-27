"use client";

import { Button } from "@/components/ui/button";
import { PartItem } from "@/shared/ui/PartItem";
import MainLayout from "@/widgets/MainLayout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import {
  ListeningTest,
  ListeningTestResults,
  RequestListeningI,
  ResponseListeningI,
} from "@/features/listening/model";
import {
  getAllListeningTests,
  getListeningTestById,
  submitListeningTest as submitListening,
} from "@/features/listening/api/listening";
import { TestWidget } from "@/widgets/TestWidget";

const Listening: FC = () => {
  const [testId, setTestId] = useState<number | null>(null);

  const { data: allTests } = useQuery<ListeningTestResults[], AxiosError>({
    queryKey: ["all_listening_tests"],
    queryFn: getAllListeningTests,
  });

  const { mutate: getListeningTest, data } = useMutation<
    ListeningTest,
    AxiosError,
    number
  >({
    mutationFn: (id: number) => {
      setTestId(id);
      return getListeningTestById(id);
    },
  });

  const { mutate: submitListeningTest, data: score } = useMutation<
    ResponseListeningI, // response type
    AxiosError,
    RequestListeningI
  >({
    mutationFn: submitListening,
  });

  const { control, handleSubmit } = useForm<{
    [key: string]: string;
  }>();

  const onSubmit = (data: { [key: string]: string }) => {
    const transformedData = Object.entries(data).map(([k, v]) => {
      return {
        question_id: +k.replace("question_", ""),
        answer: v,
      };
    });

    if (testId) {
      submitListeningTest({
        test_id: testId,
        test_type: "listening",
        answers: transformedData,
      });
    }
  };

  const availableTests = (allTests ?? []).filter((test) => !test.passed);
  const completedTests = (allTests ?? []).filter((test) => test.passed);

  return (
    <MainLayout
      description="In this section, you'll practice the IELTS Listening test by listening to real exam-style recordings and answering questions within a set time. You can track both completed and pending tests on this page. Completed tests can be retaken to work on mistakes, and if a test has already been completed, your highest score will be displayed."
      title="Listening"
      isStarted={!!data}
    >
      {data ? (
        <div className="flex flex-col h-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <PartItem
                control={control}
                passageTitle={data.test[0].title}
                passageQuestions={data.test[0].questions}
                isScoreAvailable={!!score}
                // passageAudio={"https://ielts-up.com/listening/5.1.mp3"}
                passageAudio={data.test[0].audio_url}
              />
              <PartItem
                control={control}
                passageTitle={data.test[1].title}
                passageQuestions={data.test[1].questions}
                isScoreAvailable={!!score}
                passageAudio={data.test[1].audio_url}
                // passageAudio={
                //   "https://codeskulptor-demos.commondatastorage.googleapis.com/descent/Zombie.mp3"
                // }
              />
              <PartItem
                control={control}
                passageTitle={data.test[2].title}
                passageQuestions={data.test[2].questions}
                isScoreAvailable={!!score}
                passageAudio={data.test[2].audio_url}
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
      ) : (
        <TestWidget
          completedTests={completedTests}
          availableTests={availableTests}
          isReading={false}
          onClick={(id) => getListeningTest(id)}
        />
      )}
    </MainLayout>
  );
};

export default Listening;
