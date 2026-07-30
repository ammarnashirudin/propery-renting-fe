"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { Loader2, Calendar, Users, AlertCircle } from "lucide-react";

import { Room } from "@/interfaces/room.interface";
import { PriceBreakdownItem } from "@/interfaces/reservation.interface";

import { transactionService } from "@/services/transaction.service";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

interface BookingSummaryProps {
  room: Room;

  roomId: number;

  guest: number;

  checkIn: string;

  checkOut: string;

  nights: number;

  subtotal: number;

  available: boolean;

  breakdown: PriceBreakdownItem[];
}

export default function BookingSummary({
  roomId,
  room,
  guest,
  checkIn,
  checkOut,
  nights,
  subtotal,
  available,
  breakdown,
}: BookingSummaryProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleReservation() {
    if (!checkIn || !checkOut) {
      enqueueSnackbar("Please select reservation date.", {
        variant: "warning",
      });

      return;
    }

    if (nights <= 0) {
      enqueueSnackbar("Invalid reservation date.", {
        variant: "warning",
      });

      return;
    }

    if (!available) {
      enqueueSnackbar(
        "Selected room is unavailable for the chosen dates.",
        {
          variant: "error",
        }
      );

      return;
    }

    try {
      setLoading(true);

      const res =
        await transactionService.createReservation({
          roomId,
          checkIn,
          checkOut,
          guest,
        });

      enqueueSnackbar(
        "Reservation created successfully.",
        {
          variant: "success",
        }
      );

      router.push(`/transactions/${res.data.id}`);
    } catch (err: any) {
      enqueueSnackbar(
        err?.response?.data?.message ??
          "Failed to create reservation.",
        {
          variant: "error",
        }
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="sticky top-24 shadow-sm h-fit">

      <CardHeader>

        <CardTitle>

          Booking Summary

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-6">

        <div>

          <h3 className="font-semibold text-lg">

            {room.name}

          </h3>

          <p className="text-sm text-muted-foreground">

            IDR {room.basePrice.toLocaleString()} / night

          </p>

        </div>

        <div className="space-y-3 rounded-xl border p-4">

          <div className="flex items-center gap-2">

            <Calendar className="w-4 h-4" />

            <span className="text-sm">

              {checkIn && checkOut
                ? `${dayjs(checkIn).format("DD MMM YYYY")} - ${dayjs(
                    checkOut
                  ).format("DD MMM YYYY")}`
                : "Select stay date"}

            </span>

          </div>

          <div className="flex items-center gap-2">

            <Users className="w-4 h-4" />

            <span className="text-sm">

              {guest} Guest

            </span>

          </div>

        </div>

        <div>

          <h3 className="font-semibold mb-4">

            Price Breakdown

          </h3>

          {breakdown.length === 0 ? (
            <div className="rounded-lg border border-dashed p-5 text-center text-sm text-muted-foreground">
              Select your stay date to see the price.
            </div>
          ) : (
            <div className="space-y-3">

              {breakdown.map((item) => (
                <div
                  key={item.date}
                  className="flex justify-between items-center"
                >
                  <div>

                    <p className="text-sm">

                      {dayjs(item.date).format(
                        "DD MMM"
                      )}

                    </p>

                    {item.isPeak && (
                      <Badge
                        variant="destructive"
                        className="mt-1"
                      >
                        Peak Rate
                      </Badge>
                    )}

                  </div>

                  <span className="font-medium">

                    IDR {item.price.toLocaleString()}

                  </span>

                </div>
              ))}

            </div>
          )}

        </div>

        <hr />

        <div className="space-y-3">

          <div className="flex justify-between">

            <span>

              Nights

            </span>

            <span>

              {nights}

            </span>

          </div>

          <div className="flex justify-between">

            <span>

              Guest

            </span>

            <span>

              {guest}

            </span>

          </div>

          <div className="flex justify-between">

            <span>

              Subtotal

            </span>

            <span>

              IDR {subtotal.toLocaleString()}

            </span>

          </div>

          <div className="flex justify-between">

            <span>

              Service Fee

            </span>

            <span>

              IDR 0

            </span>

          </div>

        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">

          <span>

            Total

          </span>

          <span>

            IDR {subtotal.toLocaleString()}

          </span>

        </div>

        {!available && checkIn && checkOut && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-3">

            <div className="flex gap-2">

              <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />

              <p className="text-sm text-red-600">

                Room is unavailable for the selected date.

              </p>

            </div>

          </div>
        )}

        <Button
          className="w-full"
          disabled={
            loading ||
            !checkIn ||
            !checkOut ||
            nights <= 0 ||
            !available
          }
          onClick={handleReservation}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />

              Creating Reservation...

            </>
          ) : (
            "Reserve Now"
          )}
        </Button>

      </CardContent>

    </Card>
  );
}