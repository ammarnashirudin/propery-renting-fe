import dayjs from "dayjs";

import { Room } from "@/interfaces/room.interface";

export function roomAvailable(
  room: Room,
  checkIn: string,
  checkOut: string
) {
  let current = dayjs(checkIn);

  while (current.isBefore(dayjs(checkOut), "day")) {
    const blocked = room.availabilities.find(
      (item) =>
        item.date === current.format("YYYY-MM-DD") &&
        !item.isAvailable
    );

    if (blocked) {
      return false;
    }

    current = current.add(1, "day");
  }

  return true;
}