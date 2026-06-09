import {api} from "./api";

export const createReservation = async (payload : {
    roomId : number;
    checkIn : string;
    checkOut : string;
}) => {
    const {data} = await api.post("/transactions/reservations", payload);
    return data;   
};

export const getOrders = async (params?:{
    page?: number;
    search?: string;
    date? : string;
}) => {
    const {data} = await api.get("/transactions/orders", {params});
    return data;
}

export const cancelOrder = async (orderId : number) => {
    const {data} = await api.post(`/transactions/orders/${orderId}/cancel`);
    return data;
};

export const uploadPaymentProof = async (orderId : number, file : File) => {
    const formData = new FormData();
    formData.append("paymentProof", file);

    const {data} = await api.post(
        `/transactions/orders/${orderId}/payment-proof`, 
        formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;

};