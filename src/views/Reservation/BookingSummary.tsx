"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { enqueueSnackbar } from "notistack";

import { transactionService } from "@/services/transaction.service";

interface Props {
  room: any;

  nights: number;

  guest: number;

  total: number;

  roomId: number;

  checkIn: string;

  checkOut: string;
}

export default function BookingSummary({
  room,
  nights,
  guest,
  total,
  roomId,
  checkIn,
  checkOut,
}: Props) {
  const router = useRouter();

  async function handleBook() {
    if (!checkIn || !checkOut) {
      enqueueSnackbar("Choose reservation date", {
        variant: "warning",
      });

      return;
    }

    if (nights <= 0) {
      enqueueSnackbar("Invalid reservation date", {
        variant: "warning",
      });

      return;
    }

    try {
      const res =
        await transactionService.createReservation({
          roomId,
          checkIn,
          checkOut,
          guest,
        });

      enqueueSnackbar("Reservation Created", {
        variant: "success",
      });

      router.push(`/transactions/${res.data.id}`);
    } catch (err: any) {
      enqueueSnackbar(
        err?.response?.data?.message ??
          "Failed create reservation",
        {
          variant: "error",
        }
      );
    }
  }

  return (
    <div className="border rounded-xl p-6 h-fit sticky top-24">

      <h2 className="text-xl font-semibold mb-6">

        Booking Summary

      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">

          <span>Room</span>

          <span>{room.name}</span>

        </div>

        <div className="flex justify-between">

          <span>Price / Night</span>

          <span>
            IDR {room.basePrice.toLocaleString()}
          </span>

        </div>

        <div className="flex justify-between">

          <span>Nights</span>

          <span>{nights}</span>

        </div>

        <div className="flex justify-between">

          <span>Guest</span>

          <span>{guest}</span>

        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">

          <span>Total</span>

          <span>
            IDR {total.toLocaleString()}
          </span>

        </div>

      </div>

      <Button
        className="w-full mt-8"
        onClick={handleBook}
      >
        Book Now
      </Button>

    </div>
  );
}