import Link from "next/link";

export default function BookingCard({
  tid,
  user,
  campground,
  date,
  // status,
  // submitImage,
  role,
}: {
  tid: string;
  user: string;
  campground: any;
  date: Date;
  // status: string;
  // submitImage: String[];
  role: string;
}) {
  console.log(user ? user : "no user name");
  return (
    <main>
      <div className="flex flex-row text-center items-center justify-center align-middle mt-4 w-full">
        <div className="w-1/3 flex items-center justify-center align-middle">{user}</div>

        <div className="w-1/3 flex items-center justify-center align-middle">
          {campground.name}
        </div>

        <div className="w-1/3 flex items-center justify-center align-middle">
          {date.toLocaleDateString("en-GB")}
        </div>
      </div>
    </main>
  );
}
