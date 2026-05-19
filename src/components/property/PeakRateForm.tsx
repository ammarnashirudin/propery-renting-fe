"use client";

import { useState } from "react";
import { useRoomCalendar } from "@/hooks/useRoomCalender";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSnackbar } from "notistack";

export default function PeakRateForm({ 
  roomId,
  onSuccess,
 }: { 
  roomId: number;
  onSuccess:()=>void;
}) {
  const { createPeak } = useRoomCalendar();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    type: "PERCENT",
    value: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  async function submit() {
    if (!form.startDate || !form.endDate || !form.value) {
      enqueueSnackbar("Semua field wajib diisi", { variant: "error" });
      return;
    }

    try {
      setLoading(true);
      await createPeak(roomId, {
        ...form,
        value: Number(form.value),
      });
      onSuccess();
      enqueueSnackbar("Peak rate saved successfully", { variant: "success" });
    } catch(e:any){
      enqueueSnackbar(e.response?.data?.message || "Gagal menyimpan peak rate", { variant: "error" });
    } finally {
      setLoading(false);
    }


  }

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm space-y-4">
      <h3 className="text-lg font-semibold">
        Add Peak Season Rate
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          type="date"
          onChange={(e) =>
            setForm({ ...form, startDate: e.target.value })
          }
        />

        <Input
          type="date"
          onChange={(e) =>
            setForm({ ...form, endDate: e.target.value })
          }
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <select
          className="h-10 rounded-md border bg-background px-3 text-sm"
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        >
          <option value="PERCENT">Percent (%)</option>
          <option value="NOMINAL">Nominal</option>
        </select>

        <Input
          type="number"
          placeholder="Value"
          onChange={(e) =>
            setForm({ ...form, value: e.target.value })
          }
        />
      </div>

      <Button  
      onClick={submit} 
      disabled={loading}
      className={loading ? "cursor-wait" : "cursor-pointer"}
      >
        {loading ? "Saving..." : "Save Peak Rate"}
        
      </Button>
    </div>
  );
}
