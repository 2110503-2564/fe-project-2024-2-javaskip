import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Link } from "@mui/material";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);

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
        <Link href="/campground">
          <button className="flex items-center h-full px-2 text-white text-lg">
            <p className=" ">Book Now</p>
          </button>
        </Link>
        {session ? (
          ""
        ) : (
          <Link href="/register">
            <div className="flex items-center h-full px-2 text-white text-lg">
              Register
            </div>
          </Link>
        )}
        {session ? (
          <Link href="/api/auth/signout">
            <div
              className="bg-[#FFE492] text-[#043873] font-semibold px-6 py-3 rounded-lg shadow-md 
            hover:bg-[#FFD966] transition-all duration-300 ease-in-out"
            >
              LogOut
            </div>
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            <div
              className="bg-[#FFE492] text-[#043873] font-semibold px-6 py-3 rounded-lg shadow-md 
            hover:bg-[#FFD966] transition-all duration-300 ease-in-out"
            >
              LogIn
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}


