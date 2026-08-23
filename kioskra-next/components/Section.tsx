import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  isFullWidth?: boolean;
}

export default function Section({
  children,
  className = "",
  containerClassName = "",
  id,
  isFullWidth = false,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-20 lg:py-24 ${className}`}
      {...props}
    >
      {isFullWidth ? (
        children
      ) : (
        <div
          className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 ${containerClassName}`}
        >
          {children}
        </div>
      )}
    </section>
  );
}
