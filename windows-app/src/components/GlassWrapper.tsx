import type { ReactNode } from "react";

interface GlassWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function GlassWrapper({
  children,
  className = "",
}: GlassWrapperProps) {
  return (
    <div
      className={`
         bg-white/25 backdrop-blur-3xl
        border border-white/30 w-full h-full overflow-y-scroll lg:h-screen p-10 text-center  flex flex-col justify-center items-center
        shadow-2xl
        
        ${className}
      `}
      style={{
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    >
      {children}
    </div>
  );
}
