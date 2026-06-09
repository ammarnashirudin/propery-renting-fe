export interface IOrder {
    id : number;
    roomId : number;
    roomName : string;
    propertyName : string;

    checkIn : string;
    checkOut : string;
    totalPrice : number;
    status : | "Menunggu Pembayaran" | "Menunggu Konfirmasi" | "Dibatalkan" ;
    
    paymentProof? : string;

    expiredAt? : string;

    createdAt : string;
}