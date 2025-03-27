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
    <main className="flex justify-center px-4 my-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 items-center text-left">
          {/* User ID */}
          <div className="flex flex-col w-full">
            <div className="text-lg font-semibold text-gray-700">User ID</div>
            <div className="text-gray-500 w-full">{userId}</div>
          </div>

          {/* Campground */}
          <div className="flex flex-col w-full">
            <div className="text-lg font-semibold text-gray-700">
              Campground
            </div>
            <div className="text-gray-500 w-full">{campground.name}</div>
          </div>

          {/* Appointment Date */}
          <div className="flex flex-col w-full">
            <div className="text-lg font-semibold text-gray-700">
              Appointment Date
            </div>
            <div className="text-gray-500 w-full">
              {appointmentDate.toLocaleDateString("en-GB")}
            </div>
          </div>

          {/* Buttons - Flex Container */}
          <div className="flex justify-end space-x-4 mt-4 sm:mt-0">
            <Link href={`/myBooking/manage/edit?id=${aid}`}>
              <button className="border-2 border-blue-800 bg-blue-800 px-6 py-2 text-white font-medium rounded-full hover:bg-white hover:text-blue-800 transition-all">
                Edit
              </button>
            </Link>

            <Link href={`/myBooking/manage/delete?id=${aid}`}>
              <button className="border-2 border-red-800 bg-red-800 px-6 py-2 text-white font-medium rounded-full hover:bg-white hover:text-red-800 transition-all">
                Delete
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
