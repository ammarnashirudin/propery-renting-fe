"use client";

import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { Loader2 } from "lucide-react";

import { transactionService } from "@/services/transaction.service";
import { Transaction } from "@/interfaces/transaction.interface";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  transaction: Transaction;
  refresh: () => Promise<void>;
}

export default function CancelOrderButton({
  transaction,
  refresh,
}: Props) {
  const [loading, setLoading] = useState(false);

  const disabled =
    transaction.status !== "WAITING_PAYMENT";

  async function handleCancel() {
    try {
      setLoading(true);

      await transactionService.cancel(
        transaction.id
      );

      enqueueSnackbar(
        "Reservation cancelled successfully.",
        {
          variant: "success",
        }
      );

      await refresh();

    } catch (error: unknown) {
      enqueueSnackbar(
        "Failed to cancel reservation.",
        {
          variant: "error",
        }
      );
    } finally {
      setLoading(false);
    }
  }

  if (disabled) return null;

  return (
    <AlertDialog>

      <AlertDialogTrigger asChild>

        <Button
          variant="destructive"
          className="w-full"
        >
          Cancel Reservation
        </Button>

      </AlertDialogTrigger>

      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>

            Cancel Reservation?

          </AlertDialogTitle>

          <AlertDialogDescription>

            This action cannot be undone.
            Your reservation will be cancelled immediately.

          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Back
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleCancel}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              "Yes, Cancel"
            )}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>
  );
}