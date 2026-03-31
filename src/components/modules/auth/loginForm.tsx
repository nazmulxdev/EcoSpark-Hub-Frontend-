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

const formData = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath =
    searchParams.get("redirect") || `${env.NEXT_PUBLIC_APP_URL}`;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  console.log(redirectPath);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formData,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      const toastId = toast.loading("Signing you in...");

      try {
        const { data, error } = await authClient.signIn.email({
          ...value,
          callbackURL: redirectPath,
          rememberMe: true,
        });

        if (error) {
          toast.error("Invalid email or password", { id: toastId });
          setIsLoading(false);
          return;
        }

        if (data) {
          toast.success("Welcome back!", { id: toastId });
          router.push(redirectPath);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.", { id: toastId });
        setIsLoading(false);
      }
    },
  });

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    const toastId = toast.loading("Redirecting to Google...");

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectPath,
      });
    } catch (error) {
      console.error("Google sign in error:", error);
      toast.error("Failed to sign in with Google. Please try again.", {
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
          Welcome back
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your credentials to access your account
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
                    Email
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
              return (
                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      htmlFor={field.name}
                    >
                      Password
                    </FieldLabel>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
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
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || isGoogleLoading}
          className="w-full h-12 text-base font-medium bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
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

        {/* Social Login */}
        <div className="w-full">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading || isGoogleLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin" />
                <span className="text-sm">Redirecting...</span>
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

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 underline-offset-4 hover:underline transition-all"
          >
            Create account
          </Link>
        </p>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-500 mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
          <Shield className="w-3 h-3" />
          <span>Secure login with 256-bit encryption</span>
        </div>
      </form>
    </div>
  );
}
