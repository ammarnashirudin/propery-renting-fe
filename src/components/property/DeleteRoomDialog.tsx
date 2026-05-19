"use client";

import { useRooms } from "@/hooks/useRooms";
import { useSnackbar } from "notistack";

export default function DeleteRoomDialog({ roomId }: { roomId: number }) {
  const { remove } = useRooms();
  const { enqueueSnackbar } = useSnackbar();

  async function onDelete() {
    if (!confirm("Hapus room ini?")) return;
    await remove(roomId);
    enqueueSnackbar("Room deleted successfully", { variant: "success" });
    location.reload();
  }

  return (
    <button onClick={onDelete} className="inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium hover:bg-muted text-red-500">
      Delete
    </button>
  );
}
