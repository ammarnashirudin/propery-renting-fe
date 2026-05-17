import { GoogleOAuthProvider } from "@react-oauth/google";
import AppSidebar from "@/views/Navbar/sidebar";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {token, role, isVerified} = useAuthStore();
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
  },[token, role, isVerified, router]);

  if(!token || !isVerified || role !== "TENANT"){
    return null;
  }


  return (
    <div className="flex h-screen">
      <AppSidebar/>
      <body>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        {children}
        </GoogleOAuthProvider>
      </body>
    </div>
  );
}
