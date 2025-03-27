import Image from "next/image";
import InteractiveCard from "./InteractiveCard";

export default function Card({
  campgroundName,
  imgSrc,
  campgroundAddress,
}: {
  campgroundName: string;
  imgSrc: string;
  campgroundAddress: string;
}) {
  return (
    <InteractiveCard>
      <div className="w-full h-[70%] relative rounded-t-lg">
        <Image
          src={imgSrc}
          alt="Campground Picture"
          fill={true}
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="w-full h-[30%] p-[10px] text-base mt-[10px]">
        <div>{campgroundName}</div>
      </div>
    </InteractiveCard>
  );
}
