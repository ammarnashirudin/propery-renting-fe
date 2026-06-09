"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {createReservation} from "@/services/reservation.service";
import {useSnackbar} from "notistack";

interface Props {
  roomId: number;
}

export default function ReservationForm({ 
    roomId 
}: Props) {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");

    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async () => {
        try{
            await createReservation({
                roomId,
                checkIn,
                checkOut,
            });
            enqueueSnackbar("Reservation created successfully", { variant: "success" });

        } catch (error) {
            enqueueSnackbar("Failed to create reservation", { variant: "error" });
        }

    }

    return (
    <div className="space-y-4 border p-4 rounded-xl">
      <div>
        <label>Check In</label>

        <input
          type="date"
          className="border rounded p-2 w-full"
          value={checkIn}
          onChange={(e) =>
            setCheckIn(e.target.value)
          }
        />
      </div>

      <div>
        <label>Check Out</label>

        <input
          type="date"
          className="border rounded p-2 w-full"
          value={checkOut}
          onChange={(e) =>
            setCheckOut(e.target.value)
          }
        />
      </div>

      <Button onClick={onSubmit}>
        Pesan Sekarang
      </Button>
    </div>
  );
}