"use client";

import { MainLayoutHeader } from "@/widgets/ExerciseIntro";
import MainLayout from "@/widgets/MainLayout";
import { FC } from "react";

const Reading: FC = () => {
  return (
    <MainLayout>
      <MainLayoutHeader
        description="In this section, you'll practice the IELTS Reading test by working through real exam-style passages and answering comprehension questions within a set time.
          After completing the test, you'll receive instant feedback with explanations for correct answers, helping you improve your reading skills, time management, and accuracy."
        title="Reading"
        onClick={() => {}}
      />
    </MainLayout>
  );
};

export default Reading;
