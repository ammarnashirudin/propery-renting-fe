"use client";

import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Clock } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

dayjs.extend(duration);

interface CountdownProps {
  expiredAt: string;
  status: string;
}

export default function Countdown({
  expiredAt,
  status,
}: CountdownProps) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (status !== "WAITING_PAYMENT") return;

    const update = () => {
      const diff = dayjs(expiredAt).diff(dayjs(), "second");
      setRemaining(Math.max(diff, 0));
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [expiredAt, status]);

  const time = useMemo(() => {
    const d = dayjs.duration(remaining, "seconds");

    const hours = String(Math.floor(d.asHours())).padStart(2, "0");
    const minutes = String(d.minutes()).padStart(2, "0");
    const seconds = String(d.seconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }, [remaining]);

  if (status !== "WAITING_PAYMENT") {
    return null;
  }

  return (
    <Card>

      <CardHeader>

        <CardTitle className="flex items-center gap-2">

          <Clock className="w-5 h-5" />

          Payment Deadline

        </CardTitle>

      </CardHeader>

      <CardContent>

        {remaining > 0 ? (
          <>
            <p className="text-4xl font-bold tracking-widest text-center">

              {time}

            </p>

            <p className="text-sm text-muted-foreground text-center mt-4">

              Upload your payment proof before the countdown ends.

            </p>
          </>
        ) : (
          <>
            <div className="rounded-lg bg-red-50 border border-red-200 p-4">

              <p className="text-center text-red-600 font-semibold">

                Payment deadline has expired.

              </p>

            </div>
          </>
        )}

      </CardContent>

    </Card>
  );
}