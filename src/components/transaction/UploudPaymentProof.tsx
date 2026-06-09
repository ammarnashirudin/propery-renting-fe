"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {uploadPaymentProof} from "@/services/transaction.service";
import {useSnackbar} from "notistack";

interface Props {
  orderId: number;
}

export default function UploudPaymentProof({
    orderId 
}: Props) {
    const [file, setFile] = useState<File | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    const handleUpload = async () => {
        if(!file) return;

        const allowed = [
            "image/jpeg", 
            "image/png",
        ];

        if(!allowed.includes(file.type)) {
            enqueueSnackbar("Only JPEG and PNG files are allowed", { variant: "warning" });
            return;
        }

        if(file.size > 5 * 1024 * 1024) {
            enqueueSnackbar("File size must be less than 5MB", { variant: "warning" });
            return;
        }

        try{
            await uploadPaymentProof(orderId, file);
            enqueueSnackbar("Payment proof uploaded successfully", { variant: "success" });
        } catch (error) {
            enqueueSnackbar("Failed to upload payment proof", { variant: "error" });
        }
    };
    return (
        <div className="space-y-3">
        <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) =>
            setFile(
                e.target.files?.[0] || null
            )
            }
        />

        <Button onClick={handleUpload}>
            Upload Bukti Bayar
        </Button>
        </div>
        );
}
    
