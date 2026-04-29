"use client";

import Link from "next/link";
import { Formik, Form } from "formik";

import { LogoHome } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRegister } from "@/hooks/useRegister";
import { useResendVerification } from "@/hooks/useSendVerification";
import { RegisterUserSchema, RegisterTenantSchema } from "./schema";
import SocialLogin from "@/components/auth/socialLogin";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

type Props = {
  role: "USER" | "TENANT";
};

export default function RegisterPage({ role }: Props) {
  const { register, loading, error } = useRegister(role);
  const { resend, loading: resendLoading, message } =
    useResendVerification();

  const initialValues =
    role === "TENANT"
      ? { email: "", companyName: "", phoneNumber: "" }
      : { email: "" };

  const handleSubmit = async (values: any) => {
    await register(values);
  };

    return (
      <section className="min-h-screen flex items-center justify-center bg-[#F6F7FB] px-6">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={
            role === "TENANT"
              ? RegisterTenantSchema
              : RegisterUserSchema
          }
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, isSubmitting }) => (
            <Form className="w-full max-w-md">
              <Card>
                <CardHeader className="text-center space-y-2">
                  <Link href="/">
                    <LogoHome className="h-10 w-10 mx-auto" />
                  </Link>

                  <h1 className="text-2xl font-semibold">
                    {role === "TENANT" ? "Tenant Register" : "User Register"}
                  </h1>

                  <p className="text-sm text-gray-500">
                    Create your account
                  </p>
                </CardHeader>

                <CardContent>
                  <div>

                    <div className="mt-6">
                      <SocialLogin role={role} />
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
                        <Label>Email</Label>
                        <Input
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          placeholder="@gmail.com"
                        />
                        {touched.email && errors.email && (
                          <p className="text-sm text-red-500">
                            {errors.email as string}
                          </p>
                        )}
                      </div>

                      {role === "TENANT" && (
                        <>
                          <div className="grid gap-2">
                            <Label>Company Name</Label>
                            <Input
                              name="companyName"
                              value={values.companyName}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="grid gap-2">
                            <Label>Phone Number</Label>
                            <Input
                              name="phoneNumber"
                              value={values.phoneNumber}
                              onChange={handleChange}
                            />
                          </div>
                        </>
                      )}

                      {error && (
                        <p className="text-sm text-red-500 text-center">
                          {error}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex-col gap-3">

                  <Button
                    type="submit"
                    disabled={loading || isSubmitting}
                  >
                    {loading ? "Processing..." : "Continue"}
                  </Button>

                  <div className="border-t p-3 text-center text-sm space-y-2 w-full">
                    <p>Belum menerima email verifikasi?</p>

                    <Button
                      type="button"
                      variant="link"
                      disabled={resendLoading || !values.email}
                      onClick={() => resend(values.email)}
                    >
                      {resendLoading ? "Mengirim..." : "Kirim ulang"}
                    </Button>

                    {message && (
                      <p className="text-green-600">{message}</p>
                    )}

                    <p>
                      Register as{" "}
                      <Link
                        href={
                          role === "USER"
                            ? "/Register/tenant"
                            : "/Register/user"
                        }
                        className="ml-1 text-muted-foreground hover:text-black"
                      >
                        {role === "USER" ? "Tenant" : "User"}
                      </Link>
                    </p>

                    <p>
                      Already have an account?{" "}
                      <Link
                        href={
                          role === "USER"
                            ? "/Login/user"
                            : "/Login/tenant"
                        }
                        className="ml-1 text-muted-foreground hover:text-black"
                      >
                        Login
                      </Link>
                    </p>
                  </div>

                </CardFooter>
              </Card>
            </Form>
          )}
        </Formik>
      </section>
    );
}