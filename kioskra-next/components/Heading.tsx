import React from "react";

interface HeadingProps {
  sansPrefix?: string;
  serifAccent?: string;
  sansSuffix?: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center" | "right";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function Heading({
  sansPrefix,
  serifAccent,
  sansSuffix,
  subtitle,
  badge,
  align = "left",
  size = "lg",
  className = "",
}: HeadingProps) {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  }[align];

  const sizeClass = {
    sm: "text-2xl sm:text-3xl lg:text-[2rem]",
    md: "text-3xl sm:text-4xl lg:text-5xl",
    lg: "text-[2.5rem] sm:text-5xl lg:text-[3.5rem]",
    xl: "text-[2.75rem] sm:text-6xl lg:text-[4.5rem]",
  }[size];

  return (
    <div className={`flex flex-col mb-10 sm:mb-14 ${alignClass} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-softStone/50 text-brand-charcoal text-[11px] font-bold uppercase tracking-[0.15em] mb-5 border border-brand-softStone/80">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-electricBlue inline-block" />
          {badge}
        </div>
      )}

      <h2
        className={`font-sans font-extrabold tracking-tight text-brand-deepBlack leading-[1.1] ${sizeClass}`}
      >
        {sansPrefix && <span>{sansPrefix} </span>}
        {serifAccent && (
          <span className="font-serif italic font-normal text-brand-electricBlue">
            {serifAccent}
          </span>
        )}
        {sansSuffix && <span> {sansSuffix}</span>}
      </h2>

      {subtitle && (
        <p className="mt-5 text-base sm:text-lg text-brand-charcoal/70 max-w-2xl font-normal leading-[1.75]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
