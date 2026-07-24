import { api } from "./api";

export const transactionService = {
  createReservation: (data: {
    roomId: number;
    checkIn: string;
    checkOut: string;
  }) => api.post("/orders", data),

  getMyOrders: () => api.get("/orders/me"),

  cancelOrder: (id: number) => 
    api.patch(`/orders/${id}/cancel`),

  uploadPaymentProof: (id: number, file: File) => 
    {
    const formData = new FormData();
    formData.append("file", file);
    return api.post(`/orders/${id}/upload-proof`, formData);
  },
}

