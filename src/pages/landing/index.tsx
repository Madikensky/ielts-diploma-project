import { FC } from "react";
import Image from "next/image";
import { Header } from "./ui/Header";
import { Offer } from "./ui/Offer";
import LandingBackground from "@/shared/assets/images/landing-bg.svg";
import LandingReading from "@/shared/assets/images/landing-reading.svg";
import LandingListening from "@/shared/assets/images/landing-listening.svg";
import LandingSpeaking from "@/shared/assets/images/landing-speaking.svg";
import LandingWriting from "@/shared/assets/images/landing-writing.svg";
import SduLogo from "@/shared/assets/images/sdu-logo.svg";
import "@ant-design/v5-patch-for-react-19";

export const LandingContent: FC = () => {
  return (
    <>
      <Header />
      <div className="p-10 flex flex-col gap-5">
        <section
          id="home"
          className="flex flex-col text-textWhite text-3xl bg-bgCommonLight p-5 gap-10 rounded-xl font-semibold"
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
          <div className="grid grid-cols-1 grid-rows-2 gap-10 md:grid-cols-2">
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
        <section
          id="our_team"
          className="p-10 bg-bgCommon flex flex-col gap-8 rounded-2xl text-textWhite font-semibold "
        >
          <div className="flex items-center justify-center">
            <Image src={SduLogo} alt="" width={150} height={0} />
          </div>
          <div className="flex justify-between items-center flex-wrap gap-5">
            {[
              {
                name: "Kenzhebayev Madiyar",
                email: "210107098@stu.sdu.edu.kz",
              },
              { name: "Orazkhan Miras", email: "210107066@stu.sdu.edu.kz" },
              {
                name: "Maskeugaliyev Dauren",
                email: "210103184@stu.sdu.edu.kz",
              },
            ].map(({ name, email }, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center w-full lg:w-auto p-2"
              >
                <p className="text-center">{name}</p>
                <p className="text-center">{email}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center">@7Easy.2025</div>
        </section>
      </div>
    </>
  );
};
