import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, BookOpen, CheckCircle, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader } from "@/shared/ui/Loader";

interface TestResult {
  score: number | null;
  listening_id?: number;
  reading_id?: number;
  passed_time: null | string;
  passed: boolean;
}

interface TestWidgetProps {
  onClick: (id: number) => void;
  availableTests: TestResult[];
  completedTests: TestResult[];
  isReading: boolean;
}

export const TestWidget: FC<TestWidgetProps> = ({
  availableTests,
  completedTests,
  isReading,
  onClick,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <Loader />;
  return (
    <Tabs defaultValue="available">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="available">Available Tests</TabsTrigger>
        <TabsTrigger value="completed">Completed Tests</TabsTrigger>
      </TabsList>

      <TabsContent value="available" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {availableTests.length > 0 ? (
            availableTests.map((test) => {
              return (
                <Card
                  key={isReading ? test.reading_id : test.listening_id}
                  className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow aspect-square flex flex-col"
                >
                  <CardHeader className="bg-[#d15c65] text-white p-3 space-y-1">
                    <CardTitle className="flex items-center gap-2 text-base">
                      {isReading ? (
                        <BookOpen className="h-4 w-4" />
                      ) : (
                        <Headphones className="h-4 w-4" />
                      )}
                      Test {isReading ? test.reading_id : test.listening_id}
                    </CardTitle>
                    <CardDescription className="text-gray-100 text-xs">
                      {"Not attempted"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 flex-grow flex flex-col justify-between">
                    {
                      <div className="mb-2 text-xl flex items-center justify-center h-full">
                          <div className="flex items-center text-textCommon">
                            0.0 / 9.0
                          </div>
                      </div>
                    }
                    <Button
                      className="w-full bg-[#d15c65] hover:bg-[#b84c55] text-md p-2 rounded-[10px]"
                      onClick={() => {
                        setIsLoading(true);
                        onClick(
                          isReading
                            ? test.reading_id ?? 1
                            : test.listening_id ?? 1,
                        );
                      }}
                    >
                      {"Start"}
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
                  key={isReading ? test.reading_id : test.listening_id}
                  className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow aspect-square flex flex-col"
                >
                  <CardHeader className="bg-[#d15c65] text-white p-3 space-y-1">
                    <CardTitle className="flex items-center gap-2 text-base">
                      {isReading ? (
                        <BookOpen className="h-4 w-4" />
                      ) : (
                        <Headphones className="h-4 w-4" />
                      )}
                      Test {isReading ? test.reading_id : test.listening_id}
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
                              completedTests.find((completedT) =>
                                isReading
                                  ? test.reading_id === completedT.reading_id
                                  : test.listening_id === test.listening_id,
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
                        setIsLoading(true);
                        onClick(
                          isReading
                            ? test.reading_id ?? 1
                            : test.listening_id ?? 1,
                        );
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
  );
};
