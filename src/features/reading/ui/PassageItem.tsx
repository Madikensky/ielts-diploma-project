import { FC } from "react";
import { Controller, useFormState } from "react-hook-form";
import { RadioGroup } from "@/components/ui/radio-group";
import { PassageItemProps } from "../model/passage";

export const PassageItem: FC<PassageItemProps> = ({
  passageNumber,
  passageText,
  passageQuestions,
  control,
}) => {
  const { errors } = useFormState({ control });
  return (
    <>
      <h2 className="font-semibold text-lg mb">{`Passage ${passageNumber}`}</h2>
      <div>{passageText}</div>
      {passageQuestions.map((question, index) => (
        <div className="mt-2 flex flex-col gap-2" key={question.id}>
          <div className="font-semibold">
            {`${index + 1}. ${question.question}`}
          </div>
          <Controller
            name={question.id}
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
                        id={`option-${ans}`}
                        value={ans}
                        checked={field.value === ans}
                        onChange={() => field.onChange(ans)}
                        className="h-4 w-4"
                      />
                      <label htmlFor={`option-${ans}`} className="font-normal">
                        {ans}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
                {errors[question.id] && (
                  <p className="text-red-500 text-sm">
                    {errors[question.id]?.message as string}
                  </p>
                )}
              </>
            )}
          />
        </div>
      ))}
    </>
  );
};
