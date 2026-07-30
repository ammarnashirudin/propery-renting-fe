export interface PeakRate {
  id: number;
  startDate: string;
  endDate: string;
  type: "PERCENT" | "FIXED";
  value: number;
}

export interface Availability {
  id: number;
  date: string;
  isAvailable: boolean;
}

export interface RoomImage {
  id: number;
  url: string;
}

export interface Room {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  capacity: number;

  images?: RoomImage[];

  peakRates: PeakRate[];

  availabilities: Availability[];
}