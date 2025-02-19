import SduLogo from "@/shared/assets/images/sdu_logo.svg";
import Image from "next/image";

export const OurTeam = () => {
  return (
    <section
      id="our_team"
      className="p-10 bg-bgCommon flex flex-col gap-8 rounded-2xl text-textWhite font-semibold text-xs md:text-base"
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
  );
};
