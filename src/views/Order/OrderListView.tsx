"use client";

import { useEffect, useState } from "react";

import { transactionService } from "@/services/transaction.service";

export default function TransactionView() {
  const [orders, setOrders] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const res = await transactionService.getMyOrders();

    setOrders(res.data);
  }

  const filtered = orders.filter(
    (o: any) =>
      String(o.id).includes(keyword)
  );

  return (
    <div className="space-y-4">
      <input
        placeholder="Search Order"
        value={keyword}
        onChange={(e) =>
          setKeyword(
            e.target.value
          )
        }
      />

      {filtered.map((order: any) => (
        <div
          key={order.id}
          className="border p-4 rounded"
        >
          <h3>
            Order #{order.id}
          </h3>

          <p>{order.status}</p>

          <p>
            {order.checkIn} -
            {order.checkOut}
          </p>
        </div>
      ))}
    </div>
  );
}