export interface Transaction {

  id: number;

  invoiceNumber: string;

  status:
    | "WAITING_PAYMENT"
    | "WAITING_CONFIRMATION"
    | "PAID"
    | "CANCELLED"
    | "COMPLETED"
    | "EXPIRED";

  total: number;

  paymentProof?: string;

  expiredAt: string;

  createdAt: string;

  checkIn: string;

  checkOut: string;

  guest: number;

  room: {
    id: number;
    name: string;
    images: {
      url: string;
    }[];
  };
}

export interface TransactionPagination {

  data: Transaction[];

  meta: {

    page: number;

    take: number;

    total: number;

    pageCount: number;

  };

}