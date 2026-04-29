import { cn } from "@/lib/utils";

export const LogoHome = ({
  className,
  uniColor,
}: {
  className?: string;
  uniColor?: boolean;
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-10 w-10", className)}
      fill="none"
    >
      {/* House Body */}
      <path
        d="M4 11L12 5L20 11V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V11Z"
        fill={uniColor ? "currentColor" : "url(#property-gradient)"}
      />

      {/* Keyhole (Rental Concept) */}
      <circle cx="12" cy="14" r="2" fill="white" />
      <rect x="11.4" y="16" width="1.2" height="3" rx="1" fill="white" />

      {!uniColor && (
        <defs>
          <linearGradient
            id="property-gradient"
            x1="0"
            y1="0"
            x2="24"
            y2="24"
          >
            <stop stopColor="#1A73E8" />
            <stop offset="1" stopColor="#0B57D0" />
          </linearGradient>
        </defs>
      )}
    </svg>
  );
};