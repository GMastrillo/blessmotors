"use client";

import React from "react";

interface BlessMarkProps {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

/**
 * Motivo geométrico inspirado no emblema losango BM da Bless Motors (@bless.motors)
 */
export function BlessMark({ size = "md", className = "" }: BlessMarkProps) {
  const boxSizes = {
    xs: "w-2.5 h-2.5",
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const innerSizes = {
    xs: "w-1 h-1",
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rotate-45 border border-[#D4AF37] bg-[#0B0B0F] shrink-0 select-none ${boxSizes[size]} ${className}`}
      aria-hidden="true"
    >
      <span className={`${innerSizes[size]} bg-[#DC2626]`} />
    </span>
  );
}

export function BlessGradientLine({
  className = "",
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  if (orientation === "vertical") {
    return (
      <div
        className={`w-[2px] bg-gradient-to-b from-[#DC2626] via-[#D4AF37] to-[#DC2626] ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`h-[2px] w-full bg-gradient-to-r from-[#DC2626] via-[#D4AF37] to-[#DC2626] ${className}`}
      aria-hidden="true"
    />
  );
}

export function BlessBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 bg-[#111115]/95 text-neutral-100 border border-[#D4AF37]/30 text-[10px] font-mono tracking-widest uppercase shadow-sm ${className}`}
    >
      <BlessMark size="xs" />
      <span>{children}</span>
    </div>
  );
}
