import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/authOptions";
import NextAuthProvider from "./providers/NextAuthProvider";

const prompt = Prompt({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin", "thai", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Campground Booking System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextAuthSession = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={prompt.className}>
        <NextAuthProvider session={nextAuthSession}>
          <div className="z-50 w-full fixed ">
            <TopMenu />
          </div>
          <div className="pt-[70px]">{children}</div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
