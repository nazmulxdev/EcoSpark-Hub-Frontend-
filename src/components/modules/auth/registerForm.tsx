"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Shield,
  Sparkles,
  User,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { env } from "@/config/env";

// Password strength checker
const checkPasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
  if (password.match(/\d/)) strength++;
  if (password.match(/[^a-zA-Z\d]/)) strength++;

  return {
    score: strength,
    label:
      strength === 0
        ? "Very Weak"
        : strength === 1
          ? "Weak"
          : strength === 2
            ? "Fair"
            : strength === 3
              ? "Good"
              : "Strong",
    color:
      strength === 0
        ? "bg-red-500"
        : strength === 1
          ? "bg-orange-500"
          : strength === 2
            ? "bg-yellow-500"
            : strength === 3
              ? "bg-blue-500"
              : "bg-green-500",
  };
};

const formData = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath =
    searchParams.get("redirect") || `${env.NEXT_PUBLIC_APP_URL}`;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "",
    color: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: formData,
    },
    onSubmit: async ({ value }) => {
      if (!acceptedTerms) {
        toast.error("Please accept the terms and conditions");
        return;
      }

      setIsLoading(true);
      const toastId = toast.loading("Creating your account...");

      try {
        const { data, error } = await authClient.signUp.email({
          email: value.email,
          password: value.password,
          name: value.name,
          callbackURL: redirectPath,
        });

        if (error) {
          toast.error(
            error.message || "Registration failed. Please try again.",
            {
              id: toastId,
            },
          );
          setIsLoading(false);
          return;
        }

        if (data) {
          toast.success(
            "Account created successfully! Welcome to EcoSpark Hub!",
            { id: toastId },
          );
          router.push(redirectPath);
          router.refresh();
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.", { id: toastId });
        setIsLoading(false);
      }
    },
  });

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    const toastId = toast.loading("Redirecting to Google...");

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectPath,
      });
    } catch (error) {
      console.error("Google sign up error:", error);
      toast.error("Failed to sign up with Google. Please try again.", {
        id: toastId,
      });
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create an account
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Join the sustainability movement today
        </p>
      </motion.div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        <FieldGroup>
          {/* Name Field */}
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor={field.name}
                  >
                    Full Name
                  </FieldLabel>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="John Doe"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={() => field.handleBlur()}
                      className="pl-10 h-12 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Email Field */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor={field.name}
                  >
                    Email Address
                  </FieldLabel>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="hello@ecosparkhub.com"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={() => field.handleBlur()}
                      className="pl-10 h-12 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Password Field */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const value = field.state.value as string;

              return (
                <Field>
                  <FieldLabel
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor={field.name}
                  >
                    Password
                  </FieldLabel>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        setPasswordStrength(
                          checkPasswordStrength(e.target.value),
                        );
                      }}
                      onBlur={() => field.handleBlur()}
                      className="pl-10 pr-12 h-12 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {value && value.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-all ${
                              level <= passwordStrength.score
                                ? passwordStrength.color
                                : "bg-gray-200 dark:bg-zinc-700"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          Password strength:
                        </span>
                        <span
                          className={`font-medium ${
                            passwordStrength.score === 0
                              ? "text-red-500"
                              : passwordStrength.score === 1
                                ? "text-orange-500"
                                : passwordStrength.score === 2
                                  ? "text-yellow-500"
                                  : passwordStrength.score === 3
                                    ? "text-blue-500"
                                    : "text-green-500"
                          }`}
                        >
                          {passwordStrength.label}
                        </span>
                      </div>
                    </div>
                  )}
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Confirm Password Field */}
          <form.Field name="confirmPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor={field.name}
                  >
                    Confirm Password
                  </FieldLabel>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={() => field.handleBlur()}
                      className="pl-10 pr-12 h-12 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  {field.state.value &&
                    form.getFieldValue("password") &&
                    field.state.value === form.getFieldValue("password") && (
                      <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Passwords match
                      </p>
                    )}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label
            htmlFor="terms"
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-green-600 hover:text-green-700 dark:text-green-500 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-green-600 hover:text-green-700 dark:text-green-500 hover:underline"
            >
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || isGoogleLoading || !acceptedTerms}
          className="w-full h-12 text-base font-medium bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Creating account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white dark:bg-zinc-900 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Sign Up */}
        <div className="w-full">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isLoading || isGoogleLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin" />
                <span className="text-sm">Redirecting to Google...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    className="fill-[#4285F4]"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    className="fill-[#34A853]"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    className="fill-[#FBBC05]"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    className="fill-[#EA4335]"
                  />
                </svg>
                <span className="text-sm">Continue with Google</span>
              </>
            )}
          </button>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 underline-offset-4 hover:underline transition-all"
          >
            Sign in
          </Link>
        </p>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-500 mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
          <Shield className="w-3 h-3" />
          <span>Your data is protected with 256-bit encryption</span>
        </div>
      </form>
    </div>
  );
}
