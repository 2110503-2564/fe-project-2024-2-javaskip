"use client";
import React, { useState } from "react";
import { Session } from "next-auth";
import { AppointmentJson } from "interface";
import { Prompt } from "next/font/google";
import BookingCard from "@/components/BookingCard";
import { AppointmentItem } from "interface";

const prompt = Prompt({
  weight: "600",
  subsets: ["latin"],
  display: "swap",
});

export default function MyBooking({
  appointmentJson,
  session,
  role,
}: {
  appointmentJson: AppointmentJson;
  session: Session;
  role: string;
}) {
  const appointmentJsonReady = appointmentJson;

  return (
    <main className="text-center">
      <div className="rounded-[20px] items-center justify-center border border-solid pb-3">
        <div className="flex flex-row bg-[#043873] text-white text-2xl h-[50px] items-center rounded-t-[20px] font-semibold">
          <div className="w-1/3">User</div>
          <div className="w-1/3">Campground</div>
          <div className="w-1/3">Date</div>
        </div>

        {appointmentJsonReady.data.map((AppointmentItems: AppointmentItem) => (
          <BookingCard
            key={AppointmentItems._id}
            tid={AppointmentItems._id}
            user={AppointmentItems.user}
            campground={AppointmentItems.campground}
            date={new Date(AppointmentItems.apptDate)}
            role={role}
          />
        ))}
      </div>
    </main>
  );
}
