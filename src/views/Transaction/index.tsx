"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";

import { transactionService } from "@/services/transaction.service";

import { Transaction } from "@/interfaces/transaction.interface";

import TransactionDetail from "@/views/Transaction/TransactionDetail";
import UploadProof from "@/views/Transaction/UploudProof";
import Countdown from "@/views/Transaction/Countdown";
import CancelOrderButton from "@/views/Transaction/CancelOrderButton";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function TransactionView() {
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);

  const [transaction, setTransaction] =
    useState<Transaction | null>(null);

  async function fetchTransaction() {
    try {
      setLoading(true);

      const res =
        await transactionService.getTransaction(id);

      setTransaction(res.data);

    } catch (err) {

      enqueueSnackbar(
        "Failed to load transaction.",
        {
          variant: "error",
        }
      );

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchTransaction();
    }
  }, [id]);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto py-10">

        <div className="grid lg:grid-cols-3 gap-8">

          <Card className="lg:col-span-2">

            <CardContent className="h-162.5 animate-pulse" />

          </Card>

          <Card>

            <CardContent className="h-125 animate-pulse" />

          </Card>

        </div>

      </section>
    );
  }

  if (!transaction) {
    return (
      <section className="py-20 text-center">

        Transaction Not Found

      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-10 px-4">

      <div className="grid lg:grid-cols-3 gap-8">

        <TransactionDetail
          transaction={transaction}
        />

        <div className="space-y-6">

          <Countdown
            expiredAt={transaction.expiredAt}
            status={transaction.status}
          />

          <UploadProof
            transaction={transaction}
            refresh={fetchTransaction}
          />

          <CancelOrderButton
            transaction={transaction}
            refresh={fetchTransaction}
          />

        </div>

      </div>

    </section>
  );
}