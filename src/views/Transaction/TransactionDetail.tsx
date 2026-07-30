"use client";

import dayjs from "dayjs";

import { Transaction } from "@/interfaces/transaction.interface";

import StatusBadge from "./StatusBadge";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import {
  Calendar,
  Users,
  Receipt,
  BedDouble,
} from "lucide-react";

interface Props {
  transaction: Transaction;
}

export default function TransactionDetail({
  transaction,
}: Props) {
  return (
    <Card className="lg:col-span-2 shadow-sm">

      <CardHeader>

        <div className="flex justify-between items-center">

          <div>

            <CardTitle className="text-2xl">

              Invoice

            </CardTitle>

            <p className="text-sm text-muted-foreground mt-1">

              {transaction.invoiceNumber}

            </p>

          </div>

          <StatusBadge
            status={transaction.status}
          />

        </div>

      </CardHeader>

      <CardContent className="space-y-8">

        {/* ROOM */}

        <div className="flex gap-5">

          <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted">

            {transaction.room.images?.length ? (
              <img
                src={transaction.room.images[0].url}
                alt={transaction.room.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">

                <BedDouble className="h-10 w-10" />

              </div>
            )}

          </div>

          <div>

            <h2 className="font-semibold text-xl">

              {transaction.room.name}

            </h2>

            <p className="text-muted-foreground mt-1">

              Booking Detail

            </p>

          </div>

        </div>

        <Separator />

        {/* DATE */}

        <div className="grid md:grid-cols-2 gap-6">

          <div className="flex gap-3">

            <Calendar className="mt-1 h-5 w-5" />

            <div>

              <p className="text-sm text-muted-foreground">

                Check In

              </p>

              <p className="font-medium">

                {dayjs(transaction.checkIn).format(
                  "DD MMM YYYY"
                )}

              </p>

            </div>

          </div>

          <div className="flex gap-3">

            <Calendar className="mt-1 h-5 w-5" />

            <div>

              <p className="text-sm text-muted-foreground">

                Check Out

              </p>

              <p className="font-medium">

                {dayjs(transaction.checkOut).format(
                  "DD MMM YYYY"
                )}

              </p>

            </div>

          </div>

        </div>

        <Separator />

        {/* GUEST */}

        <div className="flex items-center gap-3">

          <Users className="h-5 w-5" />

          <div>

            <p className="text-sm text-muted-foreground">

              Guest

            </p>

            <p className="font-medium">

              {transaction.guest} Guest

            </p>

          </div>

        </div>

        <Separator />

        {/* PAYMENT */}

        <div>

          <div className="flex justify-between mb-3">

            <span className="text-muted-foreground">

              Total Payment

            </span>

            <span className="font-bold text-2xl">

              IDR {transaction.total.toLocaleString()}
            </span>

          </div>

        </div>

        <Separator />

        {/* INFORMATION */}

        <div className="rounded-xl border bg-muted/30 p-5">

          <div className="flex gap-2 mb-3">

            <Receipt className="h-5 w-5" />

            <h3 className="font-semibold">

              Payment Information

            </h3>

          </div>

          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">

            <li>
              Upload payment proof before the payment deadline.
            </li>

            <li>
              Payment will be verified by the property owner.
            </li>

            <li>
              Reservations that are not paid before expiration
              will be cancelled automatically.
            </li>

          </ul>

        </div>

      </CardContent>

    </Card>
  );
}