"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export const Background = ({ children }: { children?: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen w-full bg-white relative overflow-x-clip">
      {/* Sunny Glow Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, #fde047, transparent)
          `,
        }}
      />
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Background;
