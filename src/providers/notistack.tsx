"use client";

import { SnackbarProvider } from "notistack";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Providers({ 
    children, 
}: { 
    children: React.ReactNode; 
}) {
    return (
        <SnackbarProvider 
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
                {children}
            </GoogleOAuthProvider>
        </SnackbarProvider>
    );
}