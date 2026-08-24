import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  eyebrow?: string;
  actions?: React.ReactNode;
  className?: string;
};

export function PageHeader({
  icon: Icon,
  title,
  description,
  eyebrow,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="flex min-w-0 items-start gap-3.5">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-[0_10px_24px_-16px_rgba(252,101,205,0.65)] dark:border-primary/25 dark:bg-primary/10 dark:text-primary">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          {eyebrow ? (
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-[1.75rem]">
            {title}
          </h1>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2 pl-14 sm:pl-0">{actions}</div> : null}
    </div>
  );
}
