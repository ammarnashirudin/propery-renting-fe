"use client";

import { useEffect, useState } from "react";

interface Props {
  expiresAt: string;
}

export default function CountdownTimer({
  expiresAt,
}: Props) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const diff =
        new Date(expiresAt).getTime() -
        Date.now();

      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const minutes = Math.floor(
        diff / 1000 / 60
      );

      const seconds = Math.floor(
        (diff / 1000) % 60
      );

      setTimeLeft(
        `${minutes}m ${seconds}s`
      );
    }, 1000);

    return () =>
      clearInterval(interval);
  }, [expiresAt]);

  return (
    <span className="text-red-500 font-bold">
      {timeLeft}
    </span>
  );
}