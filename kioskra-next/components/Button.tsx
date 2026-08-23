import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "pill" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string;
  withArrow?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  withArrow = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs font-medium",
    md: "px-6 py-3 text-sm font-semibold",
    lg: "px-8 py-4 text-base font-semibold",
  }[size];

  const variantClasses = {
    primary:
      "bg-brand-electricBlue text-white hover:brightness-110 active:scale-[0.97] shadow-md shadow-brand-electricBlue/25 hover:shadow-xl hover:shadow-brand-electricBlue/35 rounded-lg",
    secondary:
      "bg-brand-softStone/60 hover:bg-brand-softStone text-brand-deepBlack border border-brand-softStone active:scale-[0.97] rounded-lg",
    pill:
      "bg-brand-electricBlue text-white hover:brightness-110 active:scale-[0.97] shadow-md shadow-brand-electricBlue/25 hover:shadow-lg hover:shadow-brand-electricBlue/35 rounded-full",
    ghost:
      "bg-transparent hover:bg-black/5 text-brand-charcoal hover:text-brand-electricBlue rounded-lg",
    dark:
      "bg-brand-deepBlack text-brand-warmOffWhite hover:bg-brand-charcoal active:scale-[0.97] rounded-lg shadow-sm",
  }[variant];

  const baseClasses =
    "inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer select-none";

  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        <span>{children}</span>
        {withArrow && <ArrowRight className="w-4 h-4" />}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      <span>{children}</span>
      {withArrow && <ArrowRight className="w-4 h-4" />}
    </button>
  );
}
