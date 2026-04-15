"use client";

import React from "react";

export const BackgroundComponent = ({
  children,
  variant = "default",
  fitContent = false,
}: {
  children?: React.ReactNode;
  variant?: "default" | "yellow" | "dark";
  fitContent?: boolean;
}) => {
  const bgColors = {
    default: "bg-slate-950",
    yellow: "bg-amber-500",
    dark: "bg-black",
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${bgColors[variant]} ${
        fitContent ? "h-fit" : "min-h-screen"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
