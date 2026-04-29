import { api } from "./api";

export const userService = {
    getProfile : () => api.get("/users/profile"),

    updateProfile : (formData : FormData) => 
        api.patch("/users/profile", formData,{
            headers:{
                "Content-Type": "multipart/form-data",
            },
        }),
    
    updateEmail : (email: string) =>
        api.patch("/users/email", {email}),

    updatePassword : (body:{
        currentPassword: string;
        newPassword: string;
    }) => api.patch("/users/password", body),
}