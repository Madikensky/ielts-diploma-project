"use client";

import { Exam } from "@/shared/ui/Exam";
import { MainLayoutHeader } from "@/widgets/ExerciseIntro";
import MainLayout from "@/widgets/MainLayout";
import LandingReading from "@/shared/assets/images/landing-reading.png";
import LandingListening from "@/shared/assets/images/landing-listening.png";
import LandingSpeaking from "@/shared/assets/images/landing-speaking.png";
import LandingWriting from "@/shared/assets/images/landing-writing.png";

const HomePage = () => {
  return (
    <MainLayout>
      <MainLayoutHeader
        title="Welcome to 7Easy!"
        description="
          7Easy is a modern platform that helps you prepare for all parts of IELTS. Here you will find structured assignments,
          useful materials, and an intelligent AI instructor who will improve your exam preparation skills.
          "
      />
      <p className="mt-2">
        Here are our simulators. Explore brief descriptions and enhance your
        skills.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 place-items-center gap-10">
        <Exam
          imgSrc={LandingReading}
          offerType="Reading"
          description="Enhance your reading skills by analyzing complex texts and practicing comprehension of key ideas and details."
        />
        <Exam
          imgSrc={LandingSpeaking}
          offerType="Speaking"
          description="Practice your spoken English with AI assistance, boosting fluency, pronunciation, and confidence in responses."
        />
        <Exam
          imgSrc={LandingWriting}
          offerType="Writing"
          description="Improve your essay and letter writing with AI-powered feedback to refine structure, clarity, and coherence."
        />
        <Exam
          imgSrc={LandingListening}
          offerType="Listening"
          description="Train your ability to understand spoken English through diverse audio exercises and real-life scenarios."
        />
      </div>
    </MainLayout>
  );
};

export default HomePage;
