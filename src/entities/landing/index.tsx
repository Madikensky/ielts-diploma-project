import { FC } from "react";
import Image from "next/image";
import { Header } from "./ui/Header";
import { Offer } from "./ui/Offer";
import LandingBackground from "@/shared/assets/images/landing-bg.svg";
import LandingReading from "@/shared/assets/images/landing-reading.svg";
import LandingListening from "@/shared/assets/images/landing-listening.svg";
import LandingSpeaking from "@/shared/assets/images/landing-speaking.svg";
import LandingWriting from "@/shared/assets/images/landing-writing.svg";
import "@ant-design/v5-patch-for-react-19";
import { OurTeam } from "./ui/OurTeam";
import { FAQ } from "./ui/FAQ";

export const LandingContent: FC = () => {
  return (
    <>
      <Header />
      <div className="p-10 flex flex-col gap-10">
        <section
          id="home"
          className="flex flex-col text-textWhite text-2xl md:text-3xl bg-bgCommonLight p-5 gap-10 rounded-xl font-semibold"
        >
          <div className="text-start">Get ready for the IELTS test</div>
          <div className="w-full flex items-center justify-center">
            <Image src={LandingBackground} alt="" width={0} height={0} />
          </div>
          <div className="text-end">Learn. Practice. Achieve.</div>
        </section>
        <section
          id="offerings"
          className="flex flex-col gap-10 items-center justify-center"
        >
          <h2 className="text-center text-2xl font-semibold">What we offer</h2>
          <div className="grid grid-cols-1 grid-rows-2 gap-10 md:grid-cols-2 text-3xl">
            <Offer
              imgSrc={LandingReading}
              offerType="Reading"
              description="Enhance your reading skills by analyzing complex texts and practicing comprehension of key ideas and details."
            />
            <Offer
              imgSrc={LandingSpeaking}
              offerType="Speaking"
              description="Practice your spoken English with AI assistance, boosting fluency, pronunciation, and confidence in responses."
            />
            <Offer
              imgSrc={LandingWriting}
              offerType="Writing"
              description="Improve your essay and letter writing with AI-powered feedback to refine structure, clarity, and coherence."
            />
            <Offer
              imgSrc={LandingListening}
              offerType="Listening"
              description="Train your ability to understand spoken English through diverse audio exercises and real-life scenarios."
            />
          </div>
        </section>
        <FAQ />
        <OurTeam />
      </div>
    </>
  );
};
