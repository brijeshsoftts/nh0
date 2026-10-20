import {
  ArrowUpRight,
  BedDouble,
  CalendarCheck,
  CircleDollarSign,
  ClipboardList,
  FileText,
  type LucideIcon,
  Users,
  Wrench,
} from "lucide-react";

export interface StatCard {
  id: string;
  title: string;
  value: string;
  icon: string;
  link?: string;
}

interface KpiCardProps {
  data: StatCard;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  bookings: CalendarCheck,
  rooms: BedDouble,
  revenue: CircleDollarSign,
  payments: CircleDollarSign,
  tasks: ClipboardList,
  invoices: FileText,
  customers: Users,
  users: Users,
  issues: Wrench,
};

export function KpiCard({ data, className = "" }: KpiCardProps) {
  const Icon = iconMap[data.icon.toLowerCase()] ?? CalendarCheck;

  const cardClassName = `
    group relative flex min-w-0 items-center gap-3
    overflow-hidden rounded-none border border-border/70
    bg-card px-3.5 py-3 text-card-foreground
    transition-colors duration-200
    hover:border-ring/40
    ${className}
  `;

  const content = (
    <>
      {/* Icon */}
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors duration-200 group-hover:bg-accent group-hover:text-accent-foreground">
        <Icon aria-hidden="true" className="size-4.5" strokeWidth={1.8} />
      </div>

      {/* Title and value */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-muted-foreground">
          {data.title}
        </p>

        <p className="mt-0.5 truncate text-xl leading-tight font-semibold tracking-tight text-foreground tabular-nums">
          {data.value}
        </p>
      </div>

      {/* Navigation indicator */}
      {data.link && (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground/70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
        />
      )}
    </>
  );

  if (data.link) {
    return (
      <a
        href={data.link}
        aria-label={`${data.title}: ${data.value}`}
        className={cardClassName}
      >
        {content}
      </a>
    );
  }

  return <div className={cardClassName}>{content}</div>;
}
