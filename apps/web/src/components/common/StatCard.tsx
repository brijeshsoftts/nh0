import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { icons } from "@/constants/icons";
import { Sparkles } from "lucide-react";

type Shape = "rings" | "blob" | "diamonds" | "dots" | "waves";

type Tone = "gold" | "emerald" | "sky" | "violet" | "rose" | "teal";

/**
 * Every class is written out in full so Tailwind can see it.
 * Light: soft tinted wash + tinted border.  Dark: low-alpha glow so text contrast holds.
 * `shape` colour uses currentColor, so one SVG works in both themes.
 */
const TONES: Record<
  Tone,
  { card: string; chip: string; shape: string; shapeType: Shape }
> = {
  gold: {
    card: "border-amber-300/50 bg-linear-to-br from-amber-100/80 via-amber-50/40 to-transparent dark:border-amber-400/20 dark:from-amber-400/15 dark:via-amber-400/5",
    chip: "bg-amber-500/15 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
    shape: "text-amber-500/20 dark:text-amber-300/10",
    shapeType: "rings",
  },
  emerald: {
    card: "border-emerald-300/50 bg-linear-to-bl from-emerald-100/80 via-emerald-50/40 to-transparent dark:border-emerald-400/20 dark:from-emerald-400/15 dark:via-emerald-400/5",
    chip: "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300",
    shape: "text-emerald-500/20 dark:text-emerald-300/10",
    shapeType: "blob",
  },
  sky: {
    card: "border-sky-300/50 bg-linear-to-tr from-sky-100/80 via-sky-50/40 to-transparent dark:border-sky-400/20 dark:from-sky-400/15 dark:via-sky-400/5",
    chip: "bg-sky-500/15 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300",
    shape: "text-sky-500/20 dark:text-sky-300/10",
    shapeType: "waves",
  },
  violet: {
    card: "border-violet-300/50 bg-linear-to-br from-violet-100/80 via-violet-50/40 to-transparent dark:border-violet-400/20 dark:from-violet-400/15 dark:via-violet-400/5",
    chip: "bg-violet-500/15 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300",
    shape: "text-violet-500/20 dark:text-violet-300/10",
    shapeType: "diamonds",
  },
  rose: {
    card: "border-rose-300/50 bg-linear-to-bl from-rose-100/80 via-rose-50/40 to-transparent dark:border-rose-400/20 dark:from-rose-400/15 dark:via-rose-400/5",
    chip: "bg-rose-500/15 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300",
    shape: "text-rose-500/20 dark:text-rose-300/10",
    shapeType: "dots",
  },
  teal: {
    card: "border-teal-300/50 bg-linear-to-tr from-teal-100/80 via-teal-50/40 to-transparent dark:border-teal-400/20 dark:from-teal-400/15 dark:via-teal-400/5",
    chip: "bg-teal-500/15 text-teal-700 dark:bg-teal-400/15 dark:text-teal-300",
    shape: "text-teal-500/20 dark:text-teal-300/10",
    shapeType: "rings",
  },
};

export const STAT_TONES = Object.keys(TONES) as Tone[];

function BackgroundShape({
  type,
  className,
}: {
  type: Shape;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 120"
      fill="none"
      className={cn(
        "pointer-events-none absolute -right-5 -bottom-7 size-32 select-none",
        className
      )}
    >
      {type === "rings" && (
        <g stroke="currentColor" strokeWidth="1.5">
          <circle cx="70" cy="70" r="16" />
          <circle cx="70" cy="70" r="32" />
          <circle cx="70" cy="70" r="48" />
        </g>
      )}
      {type === "blob" && (
        <path
          fill="currentColor"
          d="M88 22c18 10 26 34 18 54-8 21-30 34-52 30C32 102 14 84 14 62c0-20 16-30 30-38 14-8 30-10 44-2Z"
        />
      )}
      {type === "diamonds" && (
        <g stroke="currentColor" strokeWidth="1.5">
          <rect
            x="52"
            y="52"
            width="40"
            height="40"
            transform="rotate(45 72 72)"
          />
          <rect
            x="34"
            y="34"
            width="76"
            height="76"
            transform="rotate(45 72 72)"
          />
        </g>
      )}
      {type === "dots" && (
        <g fill="currentColor">
          {Array.from({ length: 6 }).flatMap((_, r) =>
            Array.from({ length: 6 }).map((_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={16 + c * 18}
                cy={16 + r * 18}
                r="2.4"
              />
            ))
          )}
        </g>
      )}
      {type === "waves" && (
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M8 44c14-12 28 12 42 0s28 12 42 0 18 6 22 0" />
          <path d="M8 66c14-12 28 12 42 0s28 12 42 0 18 6 22 0" />
          <path d="M8 88c14-12 28 12 42 0s28 12 42 0 18 6 22 0" />
        </g>
      )}
    </svg>
  );
}

export interface StatCard {
  id: string;
  title: string | ReactNode;
  value: string | ReactNode;
  description: string | ReactNode;
  icon: string;
  link?: string;
  tone?: Tone;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  link,
  tone = "gold",
}: StatCard) {
  const t = TONES[tone];
  const Icon = icons[icon] || Sparkles;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Link
        to={link ? `/dashboard/${link}` : "#"}
        className="block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Card
          className={cn(
            "relative overflow-hidden rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md",
            t.card
          )}
        >
          <BackgroundShape type={t.shapeType} className={t.shape} />

          <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium tracking-normal text-muted-foreground">
              {title}
            </CardTitle>
            <span className={cn("rounded-md p-1.5", t.chip)}>
              <Icon className="size-4" />
            </span>
          </CardHeader>

          <CardContent className="relative">
            <div className="text-2xl font-semibold tracking-tight tabular-nums">
              {value}
            </div>
            {description && (
              <p className="mt-2 text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

/* Usage:
 *   <StatCard title="Bookings" value="1,284" icon={CalendarCheck} tone="gold" />
 *   <StatCard title="Revenue"  value="₹8.4L" icon={IndianRupee}  tone="emerald" />
 *   <StatCard title="Guests"   value="932"   icon={Users}        tone="sky" />
 *   // or auto-assign:  tone={STAT_TONES[index % STAT_TONES.length]}
 */
