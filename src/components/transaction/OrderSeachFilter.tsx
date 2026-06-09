"use client";

interface Props {
  search: string;
  date: string;

  onSearchChange: (
    value: string
  ) => void;

  onDateChange: (
    value: string
  ) => void;
}

export default function OrderSearchFilter({
  search,
  date,
  onSearchChange,
  onDateChange,
}: Props) {
  return (
    <div className="flex gap-3 mb-4">
      <input
        placeholder="Cari nomor order..."
        className="border p-2 rounded"
        value={search}
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
      />

      <input
        type="date"
        className="border p-2 rounded"
        value={date}
        onChange={(e) =>
          onDateChange(e.target.value)
        }
      />
    </div>
  );
}