export interface ReservationFormData {
  roomId: number;
  checkIn: string;
  checkOut: string;
  guest: number;
}

export interface Room {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  property?: {
    name: string;
  };
}