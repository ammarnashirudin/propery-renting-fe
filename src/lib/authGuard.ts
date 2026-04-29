import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";

type Props = {
    role? : "USER" | "TENANT";
    verified? : boolean;
};

export function useAuthguard(props?:Props){
    const {token, role, isVerified} = useAuthStore();

    useEffect(()=>{
        if(!token){
            window.location.href = "/";
            return;
        }
        if(props?.role && role !== props.role){
            window.location.href = "/";
            return;
        }
        if(props?.verified && !isVerified){
            alert("Akun belum diverifikasi. Cek email untuk verifikasi & set password");
            window.location.href = "/";
            return;
        }
    },[token, role, isVerified]);
}