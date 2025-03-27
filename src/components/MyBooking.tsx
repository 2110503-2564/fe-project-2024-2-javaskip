"use client";
import React, { useState } from "react";
import { Session } from "next-auth";
import TransactionCard from "./BookingCard";
import { AppointmentJson } from "interface";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { ListItemText } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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

  // const [statusFilter, setStatusFilter] = useState("Default");
  // const statusList = [
  //   "Default",
  //   "WAITING",
  //   "VERIFYING",
  //   "REJECTED",
  //   "COMPLETED",
  // ];

  //For mui drop down list
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    // setStatusFilter(statusList[index]);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            // status={AppointmentItems.status}
            // submitImage={AppointmentItems.submitted_slip_images}
            role={role}
          />
        ))}
      </div>
    </main>
  );
}
