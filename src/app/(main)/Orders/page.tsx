import OrderListView from "@/views/Order/OrderListView";

export default function OrdersPage() {
  return (
    <div className="mt-10 container py-10">
      <h1 className="text-3xl font-bold mb-6">
        Riwayat Pesanan
      </h1>

      <OrderListView />
    </div>
  );
}