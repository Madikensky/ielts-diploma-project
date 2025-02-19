import { StaticImageData } from "next/image";

export interface OfferProps {
  imgSrc: string | StaticImageData;
  offerType: string;
  description: string;
}
