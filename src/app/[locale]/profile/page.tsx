import mockData from "@/features/profile/mock.json";
import { HistoryItem } from "@/features/profile/ui/HistoryItem";
import { ProgressBar } from "@/features/profile/ui/ProgressBar";
import MainLayout from "@/widgets/MainLayout";
import { FC } from "react";

const Profile: FC = () => {
  return (
    <MainLayout title="Your Progress">
      <div className="mt-5">
        <ProgressBar type={"Listening"} value={mockData.progress.listening} />
        <ProgressBar type={"Reading"} value={mockData.progress.reading} />
        <ProgressBar type={"Writing"} value={mockData.progress.writing} />
        <ProgressBar type={"Speaking"} value={mockData.progress.speaking} />
      </div>
      <h2 className="font-semibold text-2xl mt-5">History</h2>
      <div className="w-full max-h-[100px] mt-2">
        {mockData.history.map((item, id) => {
          return (
            <HistoryItem
              score={item.score}
              date={item.date}
              type={item.type}
              key={id}
            />
          );
        })}
      </div>
    </MainLayout>
  );
};

export default Profile;
