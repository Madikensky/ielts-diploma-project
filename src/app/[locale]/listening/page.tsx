"use client";

import { Button } from "@/components/ui/button";
// import { Reading } from "@/features/reading/model/passage";
import {
  getReadingTest,
  submitReadingTest,
} from "@/features/reading/api/reading";
import { ReadingTest, SubmitReadingI } from "@/features/reading/model/passage";
import { PassageItem } from "@/features/reading/ui/PassageItem";
import MainLayout from "@/widgets/MainLayout";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";
import data from "./mock.json";
import { AxiosError } from "axios";

const Listening: FC = () => {
  const { mutate, data: data2 } = useMutation<ReadingTest>({
    mutationFn: getReadingTest,
  });

  const { mutate: submitReading, data: data3 } = useMutation<
    unknown, // response type
    AxiosError,
    SubmitReadingI
  >({
    mutationFn: submitReadingTest,
  });

  const { control, handleSubmit } = useForm<{
    [key: string]: string;
  }>();

  const onSubmit = (data: { [key: string]: string }) => {
    console.log(data);
  };

  return (
    <MainLayout
      description="In this section, you'll practice the IELTS Reading test by working through real exam-style passages and answering comprehension questions within a set time. After completing the test, you'll receive instant feedback with explanations for correct answers, helping you improve your reading skills, time management, and accuracy."
      title="Reading"
      onClick={() => {
        mutate();
      }}
    >
      {data ? (
        <div className="flex flex-col h-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <PassageItem
                control={control}
                passageTitle={data.test[0].title}
                passageQuestions={data.test[0].questions}
                passageText={data.test[0].text}
              />
              {/* <PassageItem
                control={control}
                passageTitle={data.test[1].title}
                passageQuestions={data.test[1].questions}
                passageText={data.test[1].text}
              /> */}
              {/* <PassageItem
                control={control}
                passageTitle={data.test[2].title}
                passageQuestions={data.test[2].questions}
                passageText={data.test[2].text}
              /> */}
            </div>
            <div className="mt-5 mb-8 text-end">
              <Button type="submit" variant={"primary"}>
                Submit Test
              </Button>
            </div>
          </form>
        </div>
      ) : null}
    </MainLayout>
  );
};

export default Listening;
