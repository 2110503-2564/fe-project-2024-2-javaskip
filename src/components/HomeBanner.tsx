"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function HomeBanner() {
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0);
  const bannerCoverSrc = [
    "/img/cover4.png",
    "/img/cover3.jpg",
    "/img/cover2.jpg",
    "/img/cover1.jpg",
  ];

  const changeCover = () => {
    const nextIndex = (currentCoverIndex + 1) % bannerCoverSrc.length;
    setCurrentCoverIndex(nextIndex);
  };

  return (
    <div className="fixed inset-0 overflow-hidden" onClick={changeCover}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={bannerCoverSrc[currentCoverIndex]}
          alt="cover"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>

      {/* Text Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 space-y-6">
        <h1 className="text-4xl font-bold drop-shadow-lg">
          Experience The Heart of Nature
        </h1>
        <h3 className="text-xl drop-shadow-md">Book your Campground today!</h3>
      </div>

      {/* Button Container */}
      <div className="absolute bottom-10 right-10 z-20">
        <Link href="/campground">
          <button
            className="bg-[#FFE492] text-[#043873] text-xl font-semibold px-6 py-3 rounded-lg shadow-md 
            hover:bg-[#FFD966] transition-all duration-300 ease-in-out"
          >
            Select your Campground NOW!
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomeBanner;
