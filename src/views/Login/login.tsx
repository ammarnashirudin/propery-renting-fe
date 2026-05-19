"use client"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogoHome } from "@/components/logo";
import Link from "next/link";
import LoginSchema from "./schema";
import { useLogin } from "@/hooks/useLogin";
import { useSocialLogin } from "@/hooks/useSocialLogin";
import { LoginBody } from "@/types/auth.type";
import { Formik, Form } from "formik";
import { GoogleLogin } from "@react-oauth/google";
import { useSnackbar } from "notistack";

type Props = {
    role: "USER" | "TENANT";
}

export default function LoginPage({ role }: Props) {
    const {login} = useLogin(role);
    const {login: socialLogin} = useSocialLogin(role);
    const { enqueueSnackbar } = useSnackbar();
    const initialValues : LoginBody = {
        email: "",
        password: "",
    };

    const handleSubmit = async (values: LoginBody) => {
      try {
        await login(values.email, values.password);
        enqueueSnackbar("Login successful", { variant: "success" });        
      } catch (error) {
        enqueueSnackbar("Login failed. Please check your credentials.", { variant: "error" });
      }

    }
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F6F7FB] px-6">
      <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
      >
      {({values, errors, touched, handleChange, isSubmitting})=>(
        <Form className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center space-y-2">
              <Link href="/">
                <LogoHome className="h-10 w-10 mx-auto" />
              </Link>

              <h1 className="text-2xl font-semibold">
                {role === "TENANT" ? "Tenant Login" : "User Login"}
              </h1>

              <p className="text-sm text-gray-500">
                Sign in to continue
              </p>
            </CardHeader>
            <CardContent>
              <div>
                <div className="mt-6">
                  <GoogleLogin
                  onSuccess={async(credentialResponse)=>{
                    if(!credentialResponse.credential) return;
                    await socialLogin("google",{
                      token: credentialResponse.credential,
                    });
                  }}
                  onError={()=>alert("Google Login Failed")}
                  />
                </div>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative text-center text-xs text-gray-400 bg-white px-2">
                      OR
                    </div>
                  </div>

                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="@gmail.com"
                      required
                    />
                    {touched.email && errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="/Reset-Password"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input 
                    id="password" 
                    type="password" 
                    value={values.password}
                    onChange={handleChange}
                    placeholder="********"
                    required 
                    />
                    {touched.password && errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button 
              type="submit"
              disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "sign in"}
              </Button>

              <div className="border-t p-3 text-center text-sm space-y-1">
                <p>
                  Don&apos;t have an account?
                  <Link
                  href={role === "USER" ? "/Register/user" : "/Register/tenant"}
                  className="ml-1 text-muted-foreground hover:text-black"
                  >
                  Register
                  </Link>
                </p>
                <p>
                  Login as{" "}
                  <Link
                  href={role === "TENANT" ? "/Login/user" : "/Login/tenant"}
                  className="ml-1 text-muted-foreground hover:text-black"
                  >
                  {role === "TENANT" ? "User" : "Tenant"}
                  </Link>
                </p>

              </div>
            </CardFooter>
          </Card>
    </Form>
    )}
    </Formik>
    </section>
  )
}
