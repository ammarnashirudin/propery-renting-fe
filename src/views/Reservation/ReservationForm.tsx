"use client";

import dayjs from "dayjs";
import { Input } from "@/components/ui/input";

interface Props {
  room: any;

  checkIn: string;

  checkOut: string;

  guest: number;

  setCheckIn: (v: string) => void;

  setCheckOut: (v: string) => void;

  setGuest: (v: number) => void;
}

export default function ReservationForm({
  room,
  checkIn,
  checkOut,
  guest,
  setCheckIn,
  setCheckOut,
  setGuest,
}: Props) {
  return (
    <div className="md:col-span-2 border rounded-xl p-6">

      <h1 className="text-2xl font-semibold mb-8">

        Reservation

      </h1>

      <div className="space-y-5">

        <div>

          <label className="text-sm">

            Room

          </label>

          <Input value={room.name} disabled />

        </div>

        <div>

          <label className="text-sm">

            Check In

          </label>

          <Input
            type="date"
            min={dayjs().format("YYYY-MM-DD")}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />

        </div>

        <div>

          <label className="text-sm">

            Check Out

          </label>

          <Input
            type="date"
            min={
              checkIn ||
              dayjs().format("YYYY-MM-DD")
            }
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />

        </div>

        <div>

          <label className="text-sm">

            Guest

          </label>

          <Input
            type="number"
            min={1}
            value={guest}
            onChange={(e) =>
              setGuest(Number(e.target.value))
            }
          />

        </div>

      </div>

    </div>
  );
}