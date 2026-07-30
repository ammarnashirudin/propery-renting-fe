"use client";

import { Dispatch, SetStateAction } from "react";
import { DateRange } from "react-day-picker";
import { BedDouble, CalendarDays, Users, Minus, Plus } from "lucide-react";

import { Room } from "@/interfaces/room.interface";

import DateRangePicker from "@/components/reservation/date-range-picker";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ReservationFormProps {
  room: Room;

  range: DateRange | undefined;

  setRange: Dispatch<SetStateAction<DateRange | undefined>>;

  guest: number;

  setGuest: Dispatch<SetStateAction<number>>;
}

export default function ReservationForm({
  room,
  range,
  setRange,
  guest,
  setGuest,
}: ReservationFormProps) {
  const disabledDates =
    room.availabilities
      ?.filter((item) => !item.isAvailable)
      .map((item) => new Date(item.date)) ?? [];

  const increaseGuest = () => {
    if (guest >= room.capacity) return;

    setGuest((prev) => prev + 1);
  };

  const decreaseGuest = () => {
    if (guest <= 1) return;

    setGuest((prev) => prev - 1);
  };

  return (
    <Card className="lg:col-span-2 shadow-sm">

      <CardHeader>

        <CardTitle className="text-2xl">

          Reservation

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-8">

        {/* ROOM */}

        <div className="rounded-xl border p-5">

          <div className="flex gap-4">

            <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">

              <BedDouble className="w-8 h-8" />

            </div>

            <div className="flex-1">

              <h3 className="font-semibold text-lg">

                {room.name}

              </h3>

              <p className="text-sm text-muted-foreground mt-1">

                {room.description}

              </p>

              <div className="mt-3 flex items-center gap-2 text-sm">

                <Users className="h-4 w-4" />

                Capacity {room.capacity} Guest

              </div>

            </div>

          </div>

        </div>

        {/* DATE */}

        <div className="space-y-3">

          <div className="flex items-center gap-2">

            <CalendarDays className="w-5 h-5" />

            <span className="font-medium">

              Stay Date

            </span>

          </div>

          <DateRangePicker
            value={range}
            onChange={setRange}
            disabledDates={disabledDates}
          />

        </div>

        {/* GUEST */}

        <div className="space-y-3">

          <p className="font-medium">

            Guest

          </p>

          <div className="flex items-center justify-between rounded-xl border p-4">

            <div>

              <p className="font-medium">

                Number of Guest

              </p>

              <p className="text-sm text-muted-foreground">

                Maximum {room.capacity} guest

              </p>

            </div>

            <div className="flex items-center gap-3">

              <Button
                variant="outline"
                size="icon"
                onClick={decreaseGuest}
                disabled={guest <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>

              <span className="w-8 text-center font-semibold text-lg">

                {guest}

              </span>

              <Button
                variant="outline"
                size="icon"
                onClick={increaseGuest}
                disabled={guest >= room.capacity}
              >
                <Plus className="w-4 h-4" />
              </Button>

            </div>

          </div>

        </div>

        {/* INFO */}

        <div className="rounded-xl bg-muted/30 border p-5">

          <h3 className="font-semibold mb-3">

            Reservation Information

          </h3>

          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">

            <li>
              Check-out must be after check-in.
            </li>

            <li>
              Unavailable dates cannot be selected.
            </li>

            <li>
              Peak season prices are calculated automatically.
            </li>

            <li>
              Payment proof must be uploaded within 1 hour after reservation.
            </li>

            <li>
              Reservation can be cancelled before payment.
            </li>

          </ul>

        </div>

      </CardContent>

    </Card>
  );
}