import { FC } from "react";
import { ProgressBarProps } from "../../model/ProgressBar";
import { Progress } from "@/components/ui/progress";

export const ProgressBar: FC<ProgressBarProps> = ({ type, value }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <h2 className="font-semibold text-lg text-start">{type}</h2>
      <Progress value={value} />
      <div className="text-neutral-900/50 text-xs text-end font-semibold">
        {value}%
      </div>
    </div>
  );
};
