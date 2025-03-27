import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundCatalog from "@/components/CampgroundCatalog";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import getUserProfile from "@/libs/getUserProfile";

export default async function Campground() {
  const campgrounds = getCampgrounds(50);
  const session = await getServerSession(authOptions);
  const profile = await getUserProfile(session.user.token);
  if (!campgrounds) return null;

  return (
    <main className="flex flex-col text-center p-5 mx-[8%]">
      <div className="text-4xl font-bold m-10 mt-20 text-left">Campground</div>
      <div>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-40">
              <CircularProgress color="primary" />
            </div>
          }
        >
          <CampgroundCatalog campgroundJson={campgrounds} />
        </Suspense>
      </div>
      <div className="bottom-10 flex justify-center w-full">
        {profile.data.role == "admin" ? (
          <Link href="/campground/manage/add">
            <button className="bg-teal-700 px-4 py-1 text-white font-medium rounded-full hover:bg-white hover:text-emerald-500 border-[2px] border-teal-500">
              Add Campground
            </button>
          </Link>
        ) : null}
      </div>
    </main>
  );
}
