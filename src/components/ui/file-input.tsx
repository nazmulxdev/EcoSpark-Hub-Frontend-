"use client";

import { useRef, useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import Image from "next/image";

interface FileInputProps {
  onChange: (files: File[]) => void;
  value: File[];
  maxFiles?: number;
  accept?: string;
  maxSize?: number; // in MB
  error?: string;
  disabled?: boolean;
}

export function FileInput({
  onChange,
  value,
  maxFiles = 5,
  accept = "image/*",
  maxSize = 5,
  error,
  disabled,
}: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (value.length + files.length > maxFiles) {
      alert(`You can upload maximum ${maxFiles} images`);
      return;
    }

    const validFiles: File[] = [];
    const newPreviews: string[] = [];

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed");
        return;
      }
      if (file.size > maxSize * 1024 * 1024) {
        alert(`Image size should be less than ${maxSize}MB`);
        return;
      }
      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    });

    if (validFiles.length > 0) {
      onChange([...value, ...validFiles]);
      setPreviews([...previews, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange(newFiles);

    URL.revokeObjectURL(previews[index]);
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative group">
            <Image
              src={preview}
              alt={`Preview ${index + 1}`}
              fill
              priority
              className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-zinc-700"
            />
            <Button
              type="button"
              onClick={() => removeImage(index)}
              disabled={disabled}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ))}

        {previews.length < maxFiles && (
          <label
            className={cn(
              "flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
              error
                ? "border-red-300 dark:border-red-700 hover:border-red-400"
                : "border-gray-300 dark:border-zinc-700 hover:border-green-500",
              disabled && "opacity-50 cursor-not-allowed",
            )}
          >
            <Upload className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-500 mt-1">Add Image</span>
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              multiple
              onChange={handleFileSelect}
              className="hidden"
              disabled={disabled}
            />
          </label>
        )}
      </div>
      <p className="text-xs text-gray-500 text-center">
        Upload up to {maxFiles} images. {accept.split("/")[1].toUpperCase()},
        PNG, GIF. Max {maxSize}MB each.
      </p>
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </div>
  );
}
