"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function RoomPriceList({
  rooms,
}: {
  rooms: any[];
}) {
  const router = useRouter();

  return (
    <div className="space-y-3">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="border rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <p className="font-medium">{room.name}</p>
            <p className="text-sm text-muted-foreground">
              {room.description}
            </p>
          </div>

          <div className="text-right">
            <p className="font-semibold mb-2">
              IDR {room.basePrice.toLocaleString()}
            </p>

            <Button
              onClick={() =>
                router.push(`/reservations/create?roomId=${room.id}`)
              }
            >
              Reserve
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}