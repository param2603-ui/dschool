"use client";

import React from "react";

export const DottedSurface = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative w-full h-full bg-slate-950 ${className}`}>
      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,_#ffffff33_1px,_transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
