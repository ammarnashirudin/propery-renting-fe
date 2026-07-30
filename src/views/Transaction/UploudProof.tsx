"use client";

import { useRef, useState, ChangeEvent } from "react";
import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import { Loader2, Upload, ImageIcon } from "lucide-react";

import { transactionService } from "@/services/transaction.service";
import { Transaction } from "@/interfaces/transaction.interface";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

interface Props {
  transaction: Transaction;
  refresh: () => Promise<void>;
}

const MAX_SIZE = 1024 * 1024;

export default function UploadProof({
  transaction,
  refresh,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const disabled =
    transaction.status !== "WAITING_PAYMENT";

  function chooseFile() {
    inputRef.current?.click();
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const selected = e.target.files?.[0];

    if (!selected) return;

    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!validTypes.includes(selected.type)) {
      enqueueSnackbar(
        "Only JPG, JPEG and PNG are allowed.",
        {
          variant: "error",
        }
      );

      return;
    }

    if (selected.size > MAX_SIZE) {
      enqueueSnackbar(
        "Maximum file size is 1 MB.",
        {
          variant: "error",
        }
      );

      return;
    }

    setFile(selected);

    setPreview(URL.createObjectURL(selected));
  }

  async function upload() {
    if (!file) return;

    try {
      setLoading(true);

      await transactionService.uploadPaymentProof(
        transaction.id,
        file
      );

      enqueueSnackbar(
        "Payment proof uploaded.",
        {
          variant: "success",
        }
      );

      setFile(null);

      setPreview("");

      await refresh();

    } catch {
      enqueueSnackbar(
        "Upload failed.",
        {
          variant: "error",
        }
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>

      <CardHeader>

        <CardTitle>

          Upload Payment Proof

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-5">

        {preview ? (
          <div className="relative w-full h-56 rounded-lg overflow-hidden border">

            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />

          </div>
        ) : transaction.paymentProof ? (
          <div className="relative w-full h-56 rounded-lg overflow-hidden border">

            <Image
              src={transaction.paymentProof}
              alt="Payment Proof"
              fill
              className="object-cover"
            />

          </div>
        ) : (
          <div className="h-56 border-2 border-dashed rounded-lg flex flex-col justify-center items-center text-muted-foreground">

            <ImageIcon className="h-10 w-10 mb-3" />

            No Image Selected

          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          hidden
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleChange}
        />

        <Button
          variant="outline"
          className="w-full"
          onClick={chooseFile}
          disabled={disabled}
        >
          Choose Image
        </Button>

        <Button
          className="w-full"
          disabled={
            disabled ||
            !file ||
            loading
          }
          onClick={upload}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />

              Uploading...

            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />

              Upload Payment Proof

            </>
          )}
        </Button>

      </CardContent>

    </Card>
  );
}