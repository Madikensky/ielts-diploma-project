"use client";

import { Button } from "@/components/ui/button";
import { PassageItem } from "@/features/reading/ui/PassageItem";
import MainLayout from "@/widgets/MainLayout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import {
  ListeningTestResults,
  ResponseListeningI,
} from "@/features/listening/model";
import {
  getAllListeningTests,
  getListeningTestById,
} from "@/features/listening/api/listening";
import { TestWidget } from "@/widgets/TestWidget";

const Listening: FC = () => {
  const { data: allTests } = useQuery<ListeningTestResults[], AxiosError>({
    queryKey: ["all_listening_tests"],
    queryFn: getAllListeningTests,
  });

  const { mutate: getListeningTest, data } = useMutation<
    ResponseListeningI,
    AxiosError,
    number
  >({
    mutationFn: (id: number) => getListeningTestById(id),
  });

  // const { mutate: submitReading, data: data3 } = useMutation<
  //   unknown, // response type
  //   AxiosError,
  //   SubmitReadingI
  // >({
  //   mutationFn: submitReadingTest,
  // });

  const { control, handleSubmit } = useForm<{
    [key: string]: string;
  }>();

  const onSubmit = (data: { [key: string]: string }) => {
    console.log(data);
  };

  const availableTests = (allTests ?? []).filter((test) => !test.passed);
  const completedTests = (allTests ?? []).filter((test) => test.passed);

  return (
    <MainLayout
      description="In this section, you'll practice the IELTS Listening test by listening to real exam-style recordings and answering 40 questions within a set time.
        After completing the test, you'll receive instant feedback with correct answers and explanations, helping you improve your listening accuracy, note-taking skills, and ability to understand different accents."
      title="Listening"
    >
      <TestWidget
        availableTests={availableTests}
        completedTests={completedTests}
        isReading={false}
        onClick={(id) => getListeningTest(id)}
      />
    </MainLayout>
  );
};

export default Listening;
