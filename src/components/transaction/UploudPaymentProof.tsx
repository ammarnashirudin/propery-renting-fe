"use client";

import { useState } from "react";
import { transactionService } from "@/services/transaction.service";
import { Button } from "../ui/button";
import { useSnackbar } from "notistack";

export default function UploadPaymentProof({
  orderId,
}: {
  orderId: number;
}) {
  const [file, setFile] = useState<File>();
  const { enqueueSnackbar } = useSnackbar();
  
  async function handleUpload() {
    if (!file) return;

    const allowed = [
      "image/jpeg",
      "image/png",
    ];

    if (!allowed.includes(file.type)) {
      enqueueSnackbar("Only JPG and PNG are allowed", { variant: "warning" });
      return;
    }

    if (file.size > 1024 * 1024) {
      enqueueSnackbar("Max file size is 1MB", { variant: "warning" });
      return;
    }

    await transactionService.uploadPaymentProof(orderId, file);

    enqueueSnackbar("Upload success", { variant: "success" });
  }

  return (
    <div className="space-y-3">
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={(e) =>
          setFile(
            e.target.files?.[0]
          )
        }
      />

      <Button onClick={handleUpload}>
        Upload Proof
      </Button>
    </div>
  );
}