"use client";

import { getProfile } from "@/features/profile/api/profile";
import { Profile as ProfileI } from "@/features/profile/model";
import { HistoryItem } from "@/features/profile/ui/HistoryItem";
import { ProgressBar } from "@/features/profile/ui/ProgressBar";
import MainLayout from "@/widgets/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

const Profile: FC = () => {
  const { data } = useQuery<ProfileI>({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  return (
    <MainLayout title="Your Progress (average scores)">
      <div className="mt-5">
        <ProgressBar
          type={"Listening"}
          value={data?.avg_listening_score || 0}
        />
        <ProgressBar type={"Reading"} value={data?.avg_reading_score || 0} />
        <ProgressBar type={"Writing"} value={data?.avg_writing_score || 0} />
        <ProgressBar type={"Speaking"} value={data?.avg_speaking_score || 0} />
      </div>
      <h2 className="font-semibold text-2xl mt-5">History</h2>
      <div className="w-full max-h-[100px] mt-2">
        {data?.results.length ? (
          <>
            {data.results.map((item, id) => {
              return (
                <HistoryItem
                  score={`${item.score}`}
                  date={item.taken_at}
                  type={item.test_type}
                  key={id}
                />
              );
            })}
          </>
        ) : (
          <div className="p-10 flex items-center justify-center text-lg text-gray-500">
            No data..
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Profile;
