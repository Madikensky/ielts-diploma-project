import { FC } from "react";
import { OfferProps } from "../../model/Offer";
import Image from "next/image";

export const Offer: FC<OfferProps> = ({ imgSrc, offerType, description }) => {
  return (
    <div className="flex flex-col gap-2 max-w-[300px]">
      <div className="flex items-center justify-center max-w-[300px] rounded-xl bg-bgCommonLight">
        <Image src={imgSrc} alt="" width={200} height={0} />
      </div>
      <h2 className="font-semibold text-xl pl-2">{offerType}</h2>
      <div className="text-lg text-gray-400 pl-2">{description}</div>
    </div>
  );
};
