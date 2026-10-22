import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface FloatingActionButtonProps {
  icon: ReactNode;
  label: string;
  to: string;
  external?: boolean;
}

export default function FloatingActionButton({
  icon,
  label,
  to,
  external = false,
}: FloatingActionButtonProps) {
  const commonClasses = `
    h-auto w-[62%] text-wrap text-center h-auto py-2 md:py-2.5 px-1
    bg-gradient-to-b from-black/40 to-black/20
    backdrop-blur-xl
    border border-white/20
    shadow-2xl
    flex flex-col items-center justify-center
    rounded-xl
    text-gray-800
    hover:from-black/50 hover:to-black/30
    hover:text-white/80
    hover:scale-105
    transition-all
  `;

  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClasses}
      >
        {icon}
        <span className="text-[5px] md:text-[8.5px] font-medium">{label}</span>
      </a>
    );
  }

  return (
    <Link to={to} className={commonClasses}>
      {icon}
      <span className="text-[7px] lg:text-[8.5px] font-medium">{label}</span>
    </Link>
  );
}
