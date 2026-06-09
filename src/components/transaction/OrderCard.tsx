import {IOrder} from "@/interfaces/transaction.interface";
import OrderStatusBadge from "./OrderStatusBadge";

interface Props {
    order : IOrder;
}

export default function OrderCard({
    order,
}:Props){
    return (
    <div className="border rounded-xl p-4">
      <h3 className="font-bold">
        {order.propertyName}
      </h3>

      <p>{order.roomName}</p>

      <p>
        {order.checkIn} - {order.checkOut}
      </p>

      <p>
        Rp
        {order.totalPrice.toLocaleString(
          "id-ID"
        )}
      </p>

      <OrderStatusBadge
        status={order.status}
      />
    </div>
    )
}