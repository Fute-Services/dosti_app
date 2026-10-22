import type { ReactNode } from "react";

interface FullPageLayoutProps {
  background?: string;
  children?: ReactNode;
}

export default function FullPageLayout({
  background,
  children,
}: FullPageLayoutProps) {
  return (
    <div
      className="flex h-screen w-screen items-center justify-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {children}
    </div>
  );
}
