import { FC } from "react";
import { MainLayoutHeaderProps } from "./model";
import { Button } from "@/components/ui/button";

export const MainLayoutHeader: FC<MainLayoutHeaderProps> = ({
  title,
  onClick,
  description,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-semibold text-2xl">{title}</h2>
      {description && <p className="text-md text-start">{description}</p>}
      {onClick && (
        <Button onClick={onClick} variant={"primary"} className="w-[150px]">
          {"Start"}
        </Button>
      )}
    </div>
  );
};
