"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";

import ReservationForm from "./ReservationForm";
import BookingSummary from "./BookingSummary";

import { getRoomById } from "@/services/propertyCatalog.service";

export default function ReservationView() {
  const params = useSearchParams();

  const roomId = Number(params.get("roomId"));

  const [room, setRoom] = useState<any>();

  const [checkIn, setCheckIn] = useState("");

  const [checkOut, setCheckOut] = useState("");

  const [guest, setGuest] = useState(1);

  useEffect(() => {
    if (!roomId) return;

    getRoomById(roomId).then((res) => {
      setRoom(res.data);
    });
  }, [roomId]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;

    return dayjs(checkOut).diff(dayjs(checkIn), "day");
  }, [checkIn, checkOut]);

  const total = useMemo(() => {
    if (!room) return 0;

    return room.basePrice * nights;
  }, [room, nights]);

  if (!room) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-10 px-4">

      <div className="grid md:grid-cols-3 gap-8">

        <ReservationForm
          room={room}
          checkIn={checkIn}
          checkOut={checkOut}
          guest={guest}
          setCheckIn={setCheckIn}
          setCheckOut={setCheckOut}
          setGuest={setGuest}
        />

        <BookingSummary
          room={room}
          nights={nights}
          guest={guest}
          total={total}
          roomId={roomId}
          checkIn={checkIn}
          checkOut={checkOut}
        />

      </div>

    </section>
  );
}