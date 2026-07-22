import { api } from "./api";

export async function createReservation(data: {
  roomId: number;
  checkIn: string;
  checkOut: string;
}) {
  return api.post("/orders", data);
}

export async function getMyOrders() {
  return api.get("/orders/me");
}

export async function cancelOrder(id: number) {
  return api.patch(`/orders/${id}/cancel`);
}

export async function uploadPaymentProof(
  id: number,
  file: File
) {
  const formData = new FormData();

  formData.append("file", file);

  return api.post(
    `/orders/${id}/upload-proof`,
    formData
  );
}