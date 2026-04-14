"use client"

import type React from "react"
import { cn } from "@/lib/utils"

export function AnimatedBlobs({ className }: { className?: string }) {
  const blobStyle = {
    "--border-radius": "115% 140% 145% 110% / 125% 140% 110% 125%",
    "--border-width": "5vmin",
    aspectRatio: "1",
    display: "block",
    gridArea: "stack",
    backgroundSize: "calc(100% + var(--border-width) * 2)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    border: "var(--border-width) solid transparent",
    borderRadius: "var(--border-radius)",
    maskImage: "linear-gradient(transparent, transparent), linear-gradient(black, white)",
    maskClip: "padding-box, border-box",
    maskComposite: "intersect",
    mixBlendMode: "screen" as const,
    height: "60vmin", // Slightly smaller for background use
    filter: "blur(2vmin)", // Increased blur for better background atmosphere
  } as React.CSSProperties

  const blobs = [
    {
      backgroundColor: "#0074D9",
      backgroundImage: "linear-gradient(#0074D9, #39CCCC, #0074D9)",
      transform: "rotate(30deg) scale(1.03)",
    },
    {
      backgroundColor: "#FF4136",
      backgroundImage: "linear-gradient(#FF4136, #FF851B, #FF4136)",
      transform: "rotate(60deg) scale(0.95)",
    },
    {
      backgroundColor: "#3D9970",
      backgroundImage: "linear-gradient(#3D9970, #01FF70, #3D9970)",
      transform: "rotate(90deg) scale(0.97)",
    },
    {
      backgroundColor: "#B10DC9",
      backgroundImage: "linear-gradient(#B10DC9, #85144B, #B10DC9)",
      transform: "rotate(120deg) scale(1.02)",
    },
  ]

  return (
    <div className={cn("absolute inset-0 w-full flex items-center justify-center overflow-hidden pointer-events-none z-0", className)}>
      <div className="grid opacity-60" style={{ gridTemplateAreas: "'stack'" }}>
        <div
          className="grid relative animate-[spin_15s_linear_infinite]"
          style={{
            gridTemplateAreas: "'stack'",
            gridArea: "stack",
          }}
        >
          {blobs.map((blob, index) => (
            <span
              key={index}
              style={{
                ...blobStyle,
                ...blob,
              }}
            />
          ))}
        </div>
      </div>

      {/* Standard Readability Overlay */}
      <div className="absolute inset-0 bg-white/60 dark:bg-slate-950/80 backdrop-blur-[2px]" />
    </div>
  )
}
