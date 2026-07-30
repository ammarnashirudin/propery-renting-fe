"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { DateRange } from "react-day-picker";
import { enqueueSnackbar } from "notistack";

import ReservationForm from "./ReservationForm";
import BookingSummary from "./BookingSummary";

import { propertyCatalogService } from "@/services/propertyCatalog.service";

import { Room } from "@/interfaces/room.interface";
import { PriceBreakdownItem } from "@/interfaces/reservation.interface";

import {calculateRoomPrice} from "@/lib/calculatorPrice";
import { roomAvailable } from "@/lib/checkAvailability";

export default function ReservationView() {
  const searchParams = useSearchParams();

  const roomId = Number(searchParams.get("roomId"));

  const [loading, setLoading] = useState(true);

  const [room, setRoom] = useState<Room | null>(null);

  const [range, setRange] = useState<DateRange>();

  const [guest, setGuest] = useState(1);

  useEffect(() => {
    if (!roomId) return;

    fetchRoom();
  }, [roomId]);

  async function fetchRoom() {
    try {
      setLoading(true);

      const res =
        await propertyCatalogService.getRoomById(roomId);

      setRoom(res.data);
    } catch (err) {
      enqueueSnackbar("Failed to load room", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  const checkIn = useMemo(() => {
    if (!range?.from) return "";

    return dayjs(range.from).format("YYYY-MM-DD");
  }, [range]);

  const checkOut = useMemo(() => {
    if (!range?.to) return "";

    return dayjs(range.to).format("YYYY-MM-DD");
  }, [range]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;

    return dayjs(checkOut).diff(
      dayjs(checkIn),
      "day"
    );
  }, [checkIn, checkOut]);

  const available = useMemo(() => {
    if (!room) return true;

    if (!checkIn) return true;

    if (!checkOut) return true;

    return roomAvailable(
      room,
      checkIn,
      checkOut
    );
  }, [room, checkIn, checkOut]);

  const breakdown = useMemo<
    PriceBreakdownItem[]
  >(() => {
    if (!room) return [];

    if (!checkIn || !checkOut) return [];

    const result: PriceBreakdownItem[] = [];

    let current = dayjs(checkIn);

    while (
      current.isBefore(dayjs(checkOut), "day")
    ) {
      const date =
        current.format("YYYY-MM-DD");

      const price =
        calculateRoomPrice(
          room.basePrice,
          date,
          room.peakRates
        );

      const isPeak =
        room.peakRates.some((item) =>
          current.isBetween(
            dayjs(item.startDate),
            dayjs(item.endDate),
            "day",
            "[]"
          )
        );

      result.push({
        date,
        price,
        isPeak,
      });

      current = current.add(1, "day");
    }

    return result;
  }, [room, checkIn, checkOut]);

  const subtotal = useMemo(() => {
    return breakdown.reduce(
      (sum, item) => sum + item.price,
      0
    );
  }, [breakdown]);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto py-12 px-4">

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 h-[550px] rounded-xl bg-muted animate-pulse" />

          <div className="h-[420px] rounded-xl bg-muted animate-pulse" />

        </div>

      </section>
    );
  }

  if (!room) {
    return (
      <section className="py-24 text-center">

        <h2 className="text-2xl font-semibold">

          Room Not Found

        </h2>

      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-10 px-4">

      <div className="mb-10">

        <h1 className="text-3xl font-bold">

          Complete Your Reservation

        </h1>

        <p className="text-muted-foreground mt-2">

          Choose your stay date and confirm your booking.

        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        <ReservationForm
          room={room}
          range={range}
          setRange={setRange}
          guest={guest}
          setGuest={setGuest}
        />

        <BookingSummary
          room={room}
          roomId={room.id}
          guest={guest}
          checkIn={checkIn}
          checkOut={checkOut}
          nights={nights}
          subtotal={subtotal}
          available={available}
          breakdown={breakdown}
        />

      </div>

    </section>
  );
}