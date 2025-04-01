"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { PassageItem } from "@/features/reading/ui/PassageItem";
import MainLayout from "@/widgets/MainLayout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArrowRight, BookOpen, CheckCircle } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

const Reading: FC = () => {
  const [testId, setTestId] = useState<number | null>(null);

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

  const { mutate: submitReading, data: score } = useMutation<
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
    }
  };

  const availableTests = (allTests ?? []).filter((test) => !test.passed);
  const completedTests = (allTests ?? []).filter((test) => test.passed);

  return (
    <MainLayout
      description="In this section, you'll practice the IELTS Reading test by working through real exam-style passages and answering comprehension questions within a set time. After completing the test, you'll receive instant feedback with explanations for correct answers, helping you improve your reading skills, time management, and accuracy."
      title="Reading"
      score={score?.score}
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
                isScoreAvailable={!!score}
              />
              <PassageItem
                control={control}
                passageTitle={data.test[1].title}
                passageQuestions={data.test[1].questions}
                passageText={data.test[1].text}
                isScoreAvailable={!!score}
              />
              <PassageItem
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
      ) : (
        <Tabs defaultValue="available">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="available">Available Tests</TabsTrigger>
            <TabsTrigger value="completed">Completed Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {availableTests.length > 0 ? (
                availableTests.map((test) => {
                  const isCompleted = completedTests.some(
                    (test) => test.reading_id === test.reading_id,
                  );

                  return (
                    <Card
                      key={test.reading_id}
                      className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow aspect-square flex flex-col"
                    >
                      <CardHeader className="bg-[#d15c65] text-white p-3 space-y-1">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <BookOpen className="h-4 w-4" />
                          Test {test.reading_id}
                        </CardTitle>
                        <CardDescription className="text-gray-100 text-xs">
                          {isCompleted ? "Completed" : "Not attempted"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-3 flex-grow flex flex-col justify-between">
                        {
                          <div className="mb-2 text-xl flex items-center justify-center h-full">
                            {isCompleted ? (
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-[20px] w-[20px]" />
                                <span>
                                  Score:{" "}
                                  {
                                    completedTests.find(
                                      (completedT) =>
                                        test.reading_id ===
                                        completedT.reading_id,
                                    )?.score
                                  }{" "}
                                  / 9.0
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center text-textCommon">
                                Not completed
                              </div>
                            )}
                          </div>
                        }
                        <Button
                          className="w-full bg-[#d15c65] hover:bg-[#b84c55] text-md p-2 rounded-[10px]"
                          onClick={() => {
                            getReadingTest(test.reading_id);
                          }}
                        >
                          {isCompleted ? "Retake" : "Start"}
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="w-full pl-1">No tests available...</div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {completedTests.length > 0 ? (
                completedTests.map((test) => {
                  const isCompleted = true;

                  return (
                    <Card
                      key={test.reading_id}
                      className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow aspect-square flex flex-col"
                    >
                      <CardHeader className="bg-[#d15c65] text-white p-3 space-y-1">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <BookOpen className="h-4 w-4" />
                          Test {test.reading_id}
                        </CardTitle>
                        <CardDescription className="text-gray-100 text-xs">
                          {isCompleted ? "Completed" : "Not attempted"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-3 flex-grow flex flex-col justify-between">
                        {isCompleted && (
                          <div className="mb-2 text-xl flex items-center justify-center h-full">
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="h-[20px] w-[20px]" />
                              <span>
                                Highest Score:{" "}
                                {
                                  completedTests.find(
                                    (completedT) =>
                                      test.reading_id === completedT.reading_id,
                                  )?.score
                                }{" "}
                                / 9.0
                              </span>
                            </div>
                          </div>
                        )}
                        <Button
                          className="w-full bg-[#d15c65] hover:bg-[#b84c55] text-md p-2 rounded-[10px]"
                          onClick={() => {
                            getReadingTest(test.reading_id);
                          }}
                        >
                          {isCompleted ? "Retake" : "Start"}
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="w-full pl-1">No tests completed...</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </MainLayout>
  );
};

export default Reading;
