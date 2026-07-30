import { api } from "./api";

export interface CreateReservationPayload {
  roomId: number;
  checkIn: string;
  checkOut: string;
  guest: number;
}

export const transactionService = {
  createReservation(data: CreateReservationPayload) {
    return api.post("/transactions", data);
  },

  getTransaction(id: number | string) {
    return api.get(`/transactions/${id}`);
  },

  getMyTransactions(params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) {
    return api.get("/transactions", {
      params,
    });
  },

  uploadPaymentProof(
    id: number | string,
    file: File
  ) {
    const formData = new FormData();

    formData.append("paymentProof", file);

    return api.patch(
      `/transactions/${id}/payment-proof`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  },

  cancel(id: number | string) {
    return api.patch(
      `/transactions/${id}/cancel`
    );
  },
  
};