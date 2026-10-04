import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

/** Inherits text colour from its parent, so it works over the hero and on theme surfaces. */
export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        aria-hidden
        className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-amber-300 via-amber-500 to-yellow-700 font-display text-2xl font-semibold text-neutral-950 shadow-md shadow-amber-500/30"
      >
        N
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-2xl font-semibold tracking-wide">
          Nivara
        </span>
        <span className="mt-1 text-xs tracking-[0.18em] opacity-70">
          Hotels
        </span>
      </span>
    </span>
  );
}
