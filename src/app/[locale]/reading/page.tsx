"use client";

import { Button } from "@/components/ui/button";
// import { Reading } from "@/features/reading/model/passage";
import { PassageItem } from "@/features/reading/ui/PassageItem";
import MainLayout from "@/widgets/MainLayout";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getReadingTest } from "@/features/reading/api/reading";
import { ReadingTest } from "@/features/reading/model/passage";

const Reading: FC = () => {
  const { mutate, data } = useMutation<ReadingTest>({
    mutationFn: getReadingTest,
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
                passageNumber={2}
                passageQuestions={testData.part2.questions}
                passageText={testData.part2.text}
              />
              <PassageItem
                control={control}
                passageNumber={3}
                passageQuestions={testData.part3.questions}
                passageText={testData.part3.text}
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

export default Reading;
