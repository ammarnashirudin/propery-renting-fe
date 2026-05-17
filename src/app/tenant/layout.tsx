"use client";

import AppSidebar from "@/views/Navbar/sidebar";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TenantLayout({
    children,
}:{
    children: React.ReactNode;
}) {
    const {isVerified, role, token} = useAuthStore();
    const router = useRouter();

    useEffect(()=>{
        if(!token){
            router.replace("/Login/tenant");
            return;
        }

        if(!isVerified){
            router.replace("/verify-email");
            return;
        }

        if(role !== "TENANT"){
            router.replace("/");
            return;
        }

    },[isVerified, role, token]);

    if(!token || !isVerified || role !== "TENANT"){
        return null;
    }


    return (
        <div className="flex h-screen w-screen">
            <AppSidebar />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>

    );
}