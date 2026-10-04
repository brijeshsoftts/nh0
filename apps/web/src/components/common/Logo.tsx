import { useId } from "react";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";

type LogoProps = {
  className?: string;
  /** sm: dashboard sidebar/header · md: marketing navbar · lg: footer/hero */
  size?: LogoSize;
  /** Show the slogan under the name. Defaults to on for md/lg, off for sm. */
  showSlogan?: boolean;
  /** Mark only, e.g. collapsed sidebar or favicon-sized spots. */
  iconOnly?: boolean;
  slogan?: string;
};

const SIZES: Record<
  LogoSize,
  { icon: string; gap: string; name: string; slogan: string }
> = {
  sm: {
    icon: "size-7",
    gap: "gap-2",
    name: "text-[17px]",
    slogan: "text-[10px]",
  },
  md: {
    icon: "size-9",
    gap: "gap-2.5",
    name: "text-xl",
    slogan: "text-[11px]",
  },
  lg: { icon: "size-11", gap: "gap-3", name: "text-2xl", slogan: "text-xs" },
};

/**
 * The mark: a gold tile holding a solid "N" with a small spark
 * (a lit window / star-rating cue). Fixed brand colours for the tile;
 * the wordmark and slogan inherit `currentColor`, so the logo works on
 * dark heroes, light dashboards and any theme surface.
 *
 * Wordmark font: load a refined serif as `--font-display`, e.g. with next/font:
 *   const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["600"], variable: "--font-display" });
 * and in Tailwind v4 CSS:  @theme { --font-display: var(--font-display), "Georgia", serif; }
 */
export function LogoMark({ className }: { className?: string }) {
  const uid = useId();
  const fill = `${uid}-fill`;
  const sheen = `${uid}-sheen`;

  return (
    <svg
      aria-hidden
      viewBox="0 0 40 40"
      className={cn("shrink-0 drop-shadow-sm", className)}
    >
      <defs>
        <linearGradient
          id={fill}
          x1="4"
          y1="2"
          x2="36"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#F6DC8B" />
          <stop offset="0.5" stopColor="#D4A23A" />
          <stop offset="1" stopColor="#8F6516" />
        </linearGradient>
        <linearGradient
          id={sheen}
          x1="20"
          y1="0"
          x2="20"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff" stopOpacity="0.38" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* tile */}
      <rect width="40" height="40" rx="11" fill={`url(#${fill})`} />
      <rect width="40" height="40" rx="11" fill={`url(#${sheen})`} />
      <rect
        x="0.75"
        y="0.75"
        width="38.5"
        height="38.5"
        rx="10.25"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />

      {/* N */}
      <path
        d="M12 28V12h3.4l9.2 11.2V12H28v16h-3.4l-9.2-11.2V28H12Z"
        fill="#1A1408"
      />

      {/* spark */}
      <path
        d="M30.5 5.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z"
        fill="#FFF4CC"
      />
    </svg>
  );
}

export function Logo({ className, size = "md", iconOnly = false }: LogoProps) {
  const s = SIZES[size];

  return (
    <span
      className={cn("inline-flex items-center", s.gap, className)}
      aria-label={iconOnly ? "Nivara Hotels" : undefined}
    >
      <LogoMark className={s.icon} />

      {!iconOnly && (
        <span className="flex flex-col">
          <span
            className={cn(
              "font-display leading-none font-semibold tracking-[0.04em]",
              s.name
            )}
          >
            Nivara
          </span>
        </span>
      )}
    </span>
  );
}
