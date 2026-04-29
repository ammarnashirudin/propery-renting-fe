import { useEffect, useState } from "react";
import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";

export function useProfile(){
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);

    const fetchProfile = async () => {
        const res = await userService.getProfile();
        setProfile(res.data);        
    };

    useEffect(()=>{
        fetchProfile();
    },[]);

    const updateProfile = async (name?: string, file?: File) =>{
        try {
            setLoading(true);
            const formData = new FormData();
            if(name) formData.append("name", name);
            if(file) formData.append("profileImage", file);

            await userService.updateProfile(formData);
            setMessage("Profile updated successfully");
            fetchProfile();
        } catch (e:any) {
            setMessage(e.response?.data?.message);
        } finally{
            setLoading(false);
        }
    };

    const updateEmail = async (email: string)=>{
        try {
            setLoading(true);
            await userService.updateEmail(email);
            setMessage("Email updated successfully");
            fetchProfile();
        } catch (e:any) {
            setMessage(e.response?.data?.message);
        } finally{
            setLoading(false);
        }
    };

    const resendVerification = async () => {
        try {
            setLoading(true);
            await authService.resendVerification(profile.email);
            setMessage("Verification email resent. Please check your inbox.");
        } catch (e: any) {
            setMessage(e.response?.data?.message);
        } finally{
            setLoading(false);
        }
    };

    const updatePassword = async (
        currentPassword: string,
        newPassword: string,
    ) => {
        try {
            setLoading(true);
            await userService.updatePassword({
                currentPassword,
                newPassword,
            });
            setMessage("Password updated successfully");
        } catch (e:any) {
            setMessage(e.response?.data?.message);
        } finally{
            setLoading(false);
        }
    };

    return {
        profile,
        loading,
        message,
        updateProfile,
        updateEmail,
        resendVerification,
        updatePassword,
    }

    
}