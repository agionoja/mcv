import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={`rounded-lg border px-3.5 py-2.5 transition duration-200 focus:border-primary-cta ${className}`}
      {...props}
    />
  );
}
