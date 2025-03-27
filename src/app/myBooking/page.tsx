import getAppointments from "@/libs/getAppointments";
import { Skeleton } from "@mui/material";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import getUserProfile from "../../libs/getUserProfile";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AppointmentCatalog from "@/components/AppointmentCatalog";

export default async function MyBookingPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const profile = await getUserProfile(session.user.token);
  const appointment = await getAppointments(session.user.token);

  return (
    <main className="p-6 mt-10 max-w-7xl mx-auto">
      {/* Profile Section */}
      <div>
        <div className="text-4xl font-bold mb-6 text-left text-gray-800">
          My Profile
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 border mx-[58px] border-gray-200">
          <h2 className="text-3xl font-medium text-gray-700">
            {profile.data.name}
          </h2>

          {/* Profile Details */}
          <div className="mt-4 ml-5 text-gray-600 space-y-3">
            <div>
              <span className="font-semibold">Email:</span> {profile.data.email}
            </div>
            <div>
              <span className="font-semibold">Telephone:</span>{" "}
              {profile.data.telephone}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="mt-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          {profile.data.role === "admin" ? "User Bookings" : "My Bookings"}
        </h2>

        <Suspense
          fallback={
            <Skeleton variant="rectangular" width="100%" height={150} />
          }
        >
          <AppointmentCatalog appointmentJson={appointment} session={session} />
        </Suspense>
      </div>
    </main>
  );
}
