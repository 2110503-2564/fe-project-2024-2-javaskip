"use client"; // Make sure this is a client component

import { useSession } from "next-auth/react";  // Use this hook for session
import Image from "next/image";
import Link from "next/link";  // Use next Link instead of material-ui Link
import getUserProfile from "@/libs/getUserProfile";  // Make sure this is working as expected
import { useEffect, useState } from "react";

export default function TopMenu() {
  const { data: session } = useSession();  // Get session using next-auth/react hook
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (session) {
      // Fetch profile only when session is available
      const fetchProfile = async () => {
        try {
          const profileData = await getUserProfile(session.user.token);
          setProfile(profileData);  // Store the profile data in the state
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchProfile();
    }
  }, [session]);

  return (
    <nav className="top-0 w-full h-[70px] bg-[#043873]  fixed flex flex-row justify-start items-center z-40 p-1 gap-x-3  drop-shadow-xl">
      <Link href="/">
        <Image
          src="/img/logo.png"
          alt="Logo"
          width={360}
          height={40}
          className="rounded-full inline"
          priority
        />
      </Link>

      <div className="ml-auto p-4 flex items-center">
        {session ? (
          <div className="flex flex-row gap-3">
            {/* If user is not admin, show the "Book Now" button */}
            {profile && profile.data.role !== "admin" && (
              <Link href="/campground" className="no-underline">
                <button className="flex items-center h-full px-2 text-white text-lg">
                  <p className=" ">Book Now</p>
                </button>
              </Link>
            )}

            {/* "My Booking" button */}
            <Link href="/myBooking" className="no-underline">
              <button className="flex items-center h-full px-2 text-white text-lg">
                <p className=" ">My Booking</p>
              </button>
            </Link>

            {/* LogOut button */}
            <Link href="/api/auth/signout" className="no-underline">
              <div className="bg-[#FFE492] text-[#043873] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#FFD966] transition-all duration-300 ease-in-out">
                LogOut
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex flex-row gap-3">
            <Link href="/register">
              <div className="flex items-center h-full px-2 text-white text-lg">Register</div>
            </Link>
            <Link href="/api/auth/signin">
              <div className="bg-[#FFE492] text-[#043873] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#FFD966] transition-all duration-300 ease-in-out">
                LogIn
              </div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
