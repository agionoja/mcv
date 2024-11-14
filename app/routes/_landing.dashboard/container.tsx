import { HTMLAttributes } from "react";

export function Container({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col gap-8 bg-white p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}
