import MyBooking from "@/components/MyBooking";
import getAppointments from "@/libs/getAppointments";
import { Skeleton } from "@mui/material";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import getUserDashboard from "../../libs/getUserProfile";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AppointmentCatalog from "@/components/AppointmentCatalog";

export default async function DashbordPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const profile = await getUserDashboard(session.user.token);
  var createdAt = new Date(profile.data.createdAt);

  const appointment = await getAppointments(session.user.token);

  return (
    <main className="text-center p-5 mx-[8%]">
      <div className="text-4xl font-bold m-10 text-left">My profile</div>

      <div className="bg-slate-200 flex flex-col justify-center px-4 p-5 text-left rounded-2xl">
        <div className="text-3xl m-3 font-medium">{profile.data.name}</div>
        <table className="table-auto border-collapse border-separate border-spacing-3">
          <tbody>
            <tr>
              <td>Email: </td>
              <td>{profile.data.email}</td>
            </tr>
            <tr>
              <td>Telephone: </td>
              <td>{profile.data.tel}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col justify-center items-start align-middle">
        {profile.data.role === "admin" ? (
          <div className="text-4xl font-bold m-10 text-left">User Booking</div>
        ) : profile.data.role === "user" ? (
          <div className="text-4xl font-bold m-10 text-left">My Booking</div>
        ) : null}
        <div className="">
          <Suspense fallback={<Skeleton />}>
            <AppointmentCatalog
              appointmentJson={appointment}
              session={session}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
