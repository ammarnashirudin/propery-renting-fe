interface Props {
  status: string;
}

export default function OrderStatusBadge({
  status,
}: Props) {
  const map = {
    Menunggu_Pembayaran:
      "bg-yellow-100 text-yellow-700",

    Menunggu_Konfirmasi_Pembayaran:
      "bg-blue-100 text-blue-700",

    Dibatalkan:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm ${
        map[
          status as keyof typeof map
        ]
      }`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}