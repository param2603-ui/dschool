"use client";

import { cn } from "@/lib/utils";

interface GradientBlurBgProps {
  className?: string;
}

export const GradientBlurBg = ({ className }: GradientBlurBgProps) => {
  return (
    <div 
      className={cn(
        "absolute inset-0 z-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      {/* 
        Combined Gradient Design:
        - Grid lines from snippet 1
        - Dual radial gradients from snippet 2 for richness
      */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px),
            radial-gradient(circle 600px at 80% 20%, rgba(139,92,246,0.15), transparent),
            radial-gradient(circle 600px at 20% 80%, rgba(59,130,246,0.15), transparent)
          `,
          backgroundSize: "64px 64px, 64px 64px, 100% 100%, 100% 100%",
        }}
      />
      
      {/* Readability Overlay Layer */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
    </div>
  );
};
