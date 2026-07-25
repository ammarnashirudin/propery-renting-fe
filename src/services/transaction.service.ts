import {api} from "./api";

export const transactionService = {
    createReservation : (data : {
        roomId : number;
        checkIn : string;
        checkOut : string;
        guest : number;
    }) => api.post("/transactions", data),
  
}