"use client";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TextareaWithCountProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  error?: string;
}

export function TextareaWithCount({
  maxLength = 500,
  error,
  className,
  value,
  onChange,
  ...props
}: TextareaWithCountProps) {
  const currentLength = typeof value === "string" ? value.length : 0;

  return (
    <div className="space-y-2">
      <Textarea
        className={cn(
          error && "border-red-500 focus:border-red-500",
          className,
        )}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        {...props}
      />
      <div className="flex justify-between text-xs">
        <span className={error ? "text-red-500" : "text-gray-500"}>
          {error}
        </span>
        <span className="text-gray-500">
          {currentLength}/{maxLength} characters
        </span>
      </div>
    </div>
  );
}
