export interface CreateReservationPayload {
  roomId: number;
  checkIn: string;
  checkOut: string;
  guest: number;
}

export interface PriceBreakdownItem {
  date: string;
  price: number;
  isPeak: boolean;
}

export interface ReservationSummary {
  subtotal: number;
  total: number;
  nights: number;
}