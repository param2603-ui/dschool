import { cn } from "@/lib/utils";

interface BackgroundComponentProps {
  children?: React.ReactNode;
  variant?: "yellow" | "default";
  fitContent?: boolean;
}

export const BackgroundComponent = ({
  children,
  variant = "yellow",
  fitContent = false,
}: BackgroundComponentProps) => {
  const yellowGradient = `
    radial-gradient(circle at center, #FFF991 0%, transparent 70%)
  `;

  const defaultGradient = `
    radial-gradient(circle at center, #fde047, transparent)
  `;

  const backgroundImage = variant === "yellow" ? yellowGradient : defaultGradient;

  return (
    <div className={`${fitContent ? "" : "min-h-screen "} w-full relative bg-white overflow-x-clip`}>
      {/* Soft Yellow/Sunny Glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage,
          opacity: variant === "yellow" ? 0.6 : 1,
          mixBlendMode: "multiply",
        }}
      />
      {/* Your Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BackgroundComponent;
