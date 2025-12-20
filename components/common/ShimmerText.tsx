"use client";

import { cn } from "@/lib/utils";

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
}

export default function ShimmerText({
  children,
  className,
  shimmerColor = "rgba(255, 255, 255, 0.5)", // Default shimmer color
}: ShimmerTextProps) {
  return (
    <span
      className={cn(
        "relative inline-block bg-clip-text text-transparent bg-[linear-gradient(110deg,#2563EB,45%,#93C5FD,55%,#2563EB)] bg-[length:200%_100%] animate-shimmer",
        className
      )}
    >
      {children}
    </span>
  );
}
