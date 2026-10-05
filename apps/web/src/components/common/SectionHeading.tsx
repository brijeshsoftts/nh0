import { goldHairline } from "@/lib/ui";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl space-y-4",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <h2 className="font-display text-4xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
        {title}
      </h2>
      <div
        aria-hidden
        className={cn(
          "h-px w-24",
          goldHairline,
          align === "center" && "mx-auto"
        )}
      />
      {description ? (
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
