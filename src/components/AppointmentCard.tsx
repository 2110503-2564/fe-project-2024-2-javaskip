import Link from "next/link";

export default function AppointmentCard({
  aid,
  userId,
  campground,
  appointmentDate,
}: {
  aid: string;
  userId: string;
  campground: any;
  appointmentDate: Date;
}) {
  return (
    <main className="flex justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center text-left">
          {/* User ID */}
          <div>
            <div className="text-lg font-semibold text-gray-700">User ID</div>
            <div className="text-gray-500">{userId}</div>
          </div>

          {/* Campground */}
          <div>
            <div className="text-lg font-semibold text-gray-700">Campground</div>
            <div className="text-gray-500 truncate">{campground.name}</div>
          </div>

          {/* Appointment Date */}
          <div>
            <div className="text-lg font-semibold text-gray-700">Appointment Date</div>
            <div className="text-gray-500">{appointmentDate.toLocaleDateString("en-GB")}</div>
          </div>

          {/* Detail Button */}
          <div className="flex justify-start md:justify-end">
            <Link href={`/booking/${aid}`}>
              <button className="bg-[#043873] text-[#FFE492] px-6 py-2 font-medium rounded-full border border-purple-500 transition-all duration-300 hover:bg-[#124e92]  w-full md:w-auto">
                Detail
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
