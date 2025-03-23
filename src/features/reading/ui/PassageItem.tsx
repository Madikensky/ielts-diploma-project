import { FC } from "react";
import { Control, Controller, useFormState } from "react-hook-form";
import { RadioGroup } from "@/components/ui/radio-group";
import { Question } from "../model/passage";
import { Input } from "@/components/ui/input";

interface PassageItemProps {
  passageTitle: string;
  passageText: string;
  passageQuestions: Question[];
  control: Control;
}

export const PassageItem: FC<PassageItemProps> = ({
  passageTitle,
  passageText,
  passageQuestions,
  control,
}) => {
  const { errors } = useFormState({ control });

  return (
    <>
      <h2 className="font-semibold text-lg mb mt-2">{`${passageTitle}`}</h2>
      <div>{passageText}</div>
      {passageQuestions.map((question, index) => {
        return (
          <div className="mt-2 flex flex-col gap-2" key={question.question_id}>
            <div className="font-semibold">
              {`${index + 1}. ${question.question}`}
            </div>

            {question.answers.length ? (
              <Controller
                name={`question_${question.question_id}`}
                control={control}
                rules={{ required: "This field is required!" }}
                render={({ field }) => (
                  <>
                    <RadioGroup {...field} onValueChange={field.onChange}>
                      {question.answers.map((ans) => (
                        <div
                          className="flex items-center space-x-2"
                          key={`key-${ans}`}
                        >
                          <input
                            type="radio"
                            id={`option-${ans}-${question.question_id}`}
                            value={ans}
                            checked={field.value === ans}
                            onChange={() => field.onChange(ans)}
                            className="h-4 w-4"
                          />
                          <label
                            htmlFor={`option-${ans}-${question.question_id}`}
                            className="font-normal"
                          >
                            {ans}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors[`question_${question.question_id}`] && (
                      <p className="text-red-500 text-sm">
                        {
                          errors[`question_${question.question_id}`]
                            ?.message as string
                        }
                      </p>
                    )}
                  </>
                )}
              />
            ) : (
              <Controller
                name={`question_${question.question_id}`}
                control={control}
                rules={{
                  required: "This field is required!",
                }}
                defaultValue={""}
                render={({ field }) => {
                  return (
                    <>
                      <Input
                        placeholder="Enter your answer here"
                        {...field}
                        className="w-fit rounded"
                      />
                      {errors[`question_${question.question_id}`] && (
                        <p className="text-red-500 text-sm">
                          {
                            errors[`question_${question.question_id}`]
                              ?.message as string
                          }
                        </p>
                      )}
                    </>
                  );
                }}
              />
            )}
          </div>
        );
      })}
    </>
  );
};
