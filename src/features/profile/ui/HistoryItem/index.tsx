import {
  AudioOutlined,
  EditOutlined,
  ReadOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import { FC, ReactNode } from "react";
import { HistoryItemProps } from "../../model/HistoryItem";

export const HistoryItem: FC<HistoryItemProps> = ({ type, date, score }) => {
  const examIcon: { [key: string]: ReactNode } = {
    listening: <CustomerServiceOutlined style={{ color: "white" }} />,
    reading: <ReadOutlined style={{ color: "white" }} />,
    speaking: <AudioOutlined style={{ color: "white" }} />,
    writing: <EditOutlined style={{ color: "white" }} />,
  };
  return (
    <div className="flex flex-row items-center pl-2">
      <div className="bg-bgCommon p-4 rounded-xl flex justify-center items-center w-[45px] h-[45px]">
        {examIcon[type]}
      </div>
      <div className="flex-1 flex flex-row justify-between p-4 items-center">
        <div className="flex flex-col gap-1">
          <span className="text-base font-semibold capitalize">{type}</span>
          <span className="text-sm font-semibold text-neutral-600/60">
            {date}
          </span>
        </div>
        <div className="text-base font-semibold">{score}</div>
      </div>
    </div>
  );
};
