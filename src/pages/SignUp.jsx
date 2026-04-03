import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../features/auth/authSlice";
import AuthLayout from "../components/layout/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    preferredName: z.string().min(1, { message: "Preferred name is required" }),
    title: z.string().min(1, { message: "Title is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email format" }),

    // PHONE VALIDATION
    phone: z
      .string()
      .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),

    // PASSWORD VALIDATION
    password: z
      .string()
      .min(8, { message: "Must be at least 8 characters long" })
      .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Must contain at least one special character",
      }),

    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location.state?.termsAccepted) {
      navigate("/legal/terms", { replace: true });
    }
  }, [location, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
  });

  const formFields = [
    { id: "firstName", label: "First Name", type: "text", required: true },
    { id: "lastName", label: "Last Name", type: "text", required: true },
    {
      id: "preferredName",
      label: "Preferred Name",
      type: "text",
      required: true,
    },
    { id: "title", label: "Title", type: "text", required: true },
    { id: "email", label: "Email Address", type: "email", required: true },
    {
      id: "phone",
      label: "Phone Number (10 digits)",
      type: "number",
      required: true,
    },
    { id: "password", label: "Password", type: "password", required: true },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      required: true,
    },
  ];

  const onSubmit = (data) => {
    const finalPayload = {
      ...data,
      agreeTerms: location.state?.termsAccepted || true,
    };

    dispatch(setUserData(finalPayload));
    navigate("/auth/verify");
  };

  return (
    <AuthLayout showBack={true}>
      <div className="flex flex-col justify-center min-h-[calc(100vh-10rem)] w-full">
        <div className="mb-10 lg:mb-12">
          <h1 className="text-4xl font-bold mb-3 text-gray-900">Sign Up</h1>
        </div>

        <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            {formFields.map((field) => (
              <div key={field.id} className="space-y-4">
                <Label
                  htmlFor={field.id}
                  className="text-base font-semibold text-gray-700"
                >
                  {field.label}{" "}
                  {field.required && <span className="text-red-500">*</span>}
                </Label>

                <Input
                  id={field.id}
                  type={field.type}
                  {...register(field.id)}
                  className={`h-14 px-4 text-base md:text-base transition-all ${
                    errors[field.id]
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-gray-300 focus-visible:ring-iwePrimary"
                  }`}
                />

                {errors[field.id] && (
                  <p className="text-red-500 text-sm font-medium mt-1">
                    {errors[field.id].message}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="pb-4">
            <Button
              type="submit"
              className="w-full md:w-40 bg-iwePrimary hover:bg-iwePrimaryHover text-white h-14 text-lg font-bold transition-all shadow-sm"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
