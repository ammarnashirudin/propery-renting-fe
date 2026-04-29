import { useState } from "react";
import { authService } from "@/services/auth.service";

export function useRegister(expectedRole: "USER" | "TENANT") {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: any) => {
    try {
      setLoading(true);
      setError(null);

      if (expectedRole === "TENANT") {
        await authService.registerTenant({
          name: "TENANT",
          email: data.email,
          companyName: data.companyName,
          phoneNumber: data.phoneNumber,
        });

        alert("Cek email untuk verifikasi & set password");
      } else {
        await authService.registerUser({
          name: "USER",
          email: data.email,
        });
      }

    } catch (e: any) {
      setError(e.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}