"use client";

import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

export default function StatusBadge({
  status,
}: Props) {
  switch (status) {
    case "WAITING_PAYMENT":
      return (
        <Badge variant="secondary">
          Waiting Payment
        </Badge>
      );

    case "WAITING_CONFIRMATION":
      return (
        <Badge>
          Waiting Confirmation
        </Badge>
      );

    case "PAID":
      return (
        <Badge className="bg-green-600">
          Paid
        </Badge>
      );

    case "COMPLETED":
      return (
        <Badge className="bg-blue-600">
          Completed
        </Badge>
      );

    case "CANCELLED":
      return (
        <Badge variant="destructive">
          Cancelled
        </Badge>
      );

    case "EXPIRED":
      return (
        <Badge variant="outline">
          Expired
        </Badge>
      );

    default:
      return (
        <Badge variant="outline">
          Unknown
        </Badge>
      );
  }
}