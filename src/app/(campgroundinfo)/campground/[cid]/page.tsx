//"use client";

import Image from "next/image";
import getCampground from "@/libs/getCampground";
import Link from "next/link";
import { profile } from "console";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CampgroundDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const campgroundDetail = await getCampground(params.cid);
  const session = await getServerSession(authOptions);
  const profile = await getUserProfile(session.user.token);

  return (
    <main className="flex justify-center mt-20">
      <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-lg shadow-lg w-full max-w-5xl">
        {/* Campground Image */}
        <Image
          src={campgroundDetail.data.picture}
          alt="Campground Picture"
          width={600}
          height={400}
          className="rounded-lg object-cover shadow-md"
        />

        {/* Campground Detail */}
        <div className="space-y-6 text-left w-[468px]">
          <h2 className="text-3xl font-bold">{campgroundDetail.data.name}</h2>

          <p className="text-lg font-semibold">
            <span className="text-xl font-medium">Address :</span>{" "}
            {campgroundDetail.data.address}
          </p>

          <p className="text-lg font-semibold">
            <span className="font-light">Tel :</span>{" "}
            {campgroundDetail.data.tel}
          </p>

          {/* ปุ่มต่าง ๆ */}
          <div className="flex gap-4 flex-col">
            {profile.data.role !== "admin" ? (
              <Link
                href="/bookings"
                className="text-center px-2 py-1 bg-[#043873] text-[#FFE492] font-semibold rounded shadow hover:bg-blue-700 transition"
              >
                Make Booking
              </Link>
            ) : null}

            <Link
              href="/campground"
              className="text-center px-2 py-1 bg-[#FFE492] text-[#043873] font-semibold rounded shadow  hover:bg-[#FFD966] transition"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
      <div className="fixed bottom-28 items-center">
        {profile.data.role == "admin" ? (
          <>
            <Link
              href={`/campground/manage/edit?id=${params.cid}&name=${campgroundDetail.data.name}`}
            >
              <button className="border-[2px] border-blue-800 bg-blue-800 px-10 py-1 ml-10 mr-10 text-white font-medium rounded-full hover:bg-white hover:text-blue-800">
                Edit
              </button>
            </Link>
            <Link
              href={`/campground/manage/delete?id=${params.cid}&name=${campgroundDetail.data.name}`}
            >
              <button className="border-[2px] border-red-800 bg-red-800 px-10 py-1 text-white font-medium rounded-full hover:bg-white hover:text-red-800">
                Delete
              </button>
            </Link>
          </>
        ) : null}
      </div>
    </main>
  );
}
