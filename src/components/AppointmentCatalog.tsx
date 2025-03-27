"use client";
import { useEffect, useState } from "react";
import AppointmentCard from "./AppointmentCard";
import getUserDashboard from "@/libs/getUserProfile";
import getAppointments from "@/libs/getAppointments";
import { Session } from "next-auth";
import { AppointmentItem, AppointmentJson } from "interface";
import { CircularProgress } from "@mui/material"; // Material-UI Spinner

export default function AppointmentCatalog({
  appointmentJson,
  session,
}: {
  appointmentJson: AppointmentJson;
  session: Session;
}) {
  const [appointmentJsonReady, setAppointmentJsonReady] =
    useState<AppointmentJson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      setLoading(true);
      try {
        await getUserDashboard(session.user.token); // Fetch user details (not stored)
        const appointment = await getAppointments(session.user.token);
        setAppointmentJsonReady(appointment);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    setData();
  }, [session.user.token]);

  return (
    <div className="mx-10">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress color="primary" />
        </div>
      ) : appointmentJsonReady && appointmentJsonReady.data.length > 0 ? (
        appointmentJsonReady.data.map((appointmentItem: AppointmentItem) => (
          <AppointmentCard
            key={appointmentItem._id}
            aid={appointmentItem._id}
            userId={appointmentItem.user}
            campground={appointmentItem.campground}
            appointmentDate={new Date(appointmentItem.apptDate)}
          />
        ))
      ) : (
        <div className="text-xl text-gray-600 text-center">
          You have not made any booking
        </div>
      )}
    </div>
  );
}
