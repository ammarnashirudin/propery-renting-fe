import { api } from "./api";

export type PropertyQuery = {
    page : number;
    limit? : number;
    search? : string;
    categoryId? : string;
    sortBy? : "name" | "price";
    sortOrder? : "asc" | "desc";
    checkIn? : string;
    checkOut? : string;
    latitude? : number;
    longitude? : number;
};

export const propertyCatalogService = {
    getProperties : (params:PropertyQuery = {page:1, limit:10}) => 
        api.get("/properties", {params}),

    getPropertyDetail : (id:number) => 
        api.get(`/properties/${id}`),

    getRoomById : (id:number) =>
        api.get(`/rooms/${id}`),
}


