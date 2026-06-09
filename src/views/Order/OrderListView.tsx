"use client";

import { useState, useEffect } from "react";

import {getOrders} from "@/services/transaction.service";
import OrderCard from "../../components/transaction/OrderCard";
import OrderSearchFilter from "../../components/transaction/OrderSeachFilter";

export default function OrderListView() {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");

    const fetchOrders = async () => {
        const result =
            await getOrders({
                search,
                date,
            });
        setOrders(result.data);
    };

    useEffect(() => {
        fetchOrders();
    }, [search, date]);
  return (
    <div>
      <OrderSearchFilter
        search={search}
        date={date}
        onSearchChange={setSearch}
        onDateChange={setDate}
      />

      <div className="grid gap-4">
        {orders.map((order: any) => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))}
      </div>
    </div>
  );
}