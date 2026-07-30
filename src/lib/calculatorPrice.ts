import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

import { PeakRate } from "@/interfaces/room.interface";

dayjs.extend(isBetween);

export function calculateRoomPrice(
  basePrice: number,
  date: string,
  peakRates: PeakRate[]
) {
  const peak = peakRates.find((item) =>
    dayjs(date).isBetween(
      item.startDate,
      item.endDate,
      "day",
      "[]"
    )
  );

  if (!peak) {
    return basePrice;
  }

  if (peak.type === "PERCENT") {
    return Math.round(
      basePrice + basePrice * peak.value / 100
    );
  }

  return basePrice + peak.value;
}