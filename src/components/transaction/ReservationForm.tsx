"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { createReservation } from "@/services/transaction.service";
import {useSnackbar} from "notistack";

interface Props {
  roomId: number;
}

export default function ReservationForm({
  roomId,
}: Props) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit() {
    try {
      await createReservation({
        roomId,
        checkIn,
        checkOut,
      });

      enqueueSnackbar("Reservation created successfully", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Failed to create reservation", { variant: "error" });
      console.log(err);
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="date"
        value={checkIn}
        onChange={(e) =>
          setCheckIn(e.target.value)
        }
      />

      <input
        type="date"
        value={checkOut}
        onChange={(e) =>
          setCheckOut(e.target.value)
        }
      />

      <Button onClick={handleSubmit}>
        Reserve Room
      </Button>
    </div>
  );
}