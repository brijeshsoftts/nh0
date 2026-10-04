import type { ReactNode } from "react";

type HeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  rightContent?: ReactNode;
};

export function Header({
  eyebrow,
  title,
  description,
  rightContent,
}: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-border/60 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-1.5 flex items-center gap-2 text-xs font-medium text-primary">
            <span aria-hidden className="h-px w-5 bg-primary/60" />
            {eyebrow}
          </p>
        )}

        <h1 className="text-xl font-semibold tracking-[-0.015em] text-balance text-foreground sm:text-[22px] sm:leading-8">
          {title}
        </h1>

        {description && (
          <p className="mt-1 max-w-xl text-[13px] leading-5 text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {rightContent && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {rightContent}
        </div>
      )}
    </header>
  );
}
