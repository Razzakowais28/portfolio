import { useEffect, useState } from "react";
import {
  formatSaudiTime,
  getCurrentStatus,
  LOCATION_LABEL,
  type LiveStatus as Status,
} from "@/lib/live-status";
import { cn } from "@/lib/utils";

export default function LiveStatusBadge({ className }: { className?: string }) {
  const [now, setNow] = useState(() => new Date());
  const [status, setStatus] = useState<Status>(() => getCurrentStatus());

  useEffect(() => {
    const tick = () => {
      const date = new Date();
      setNow(date);
      setStatus(getCurrentStatus(date));
    };
    tick();

    const id = window.setInterval(tick, 1_000);
    return () => window.clearInterval(id);
  }, []);

  const timeLabel = formatSaudiTime(now);
  const presence = status.active ? "live" : "away";

  return (
    <div
      className={cn(
        "live-status inline-flex flex-col gap-0.5 font-mono text-foreground select-none",
        "border-2 border-foreground bg-card px-2.5 py-1 sm:py-1.5 shadow-[2px_2px_0px_0px_var(--foreground)]",
        className,
      )}
      aria-live="polite"
      title={`${status.icon} ${status.label} · ${timeLabel} in ${LOCATION_LABEL}`}
    >
      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-wider font-bold leading-none">
        <span className="relative flex size-2 shrink-0" aria-hidden>
          {status.active && (
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-600 opacity-60" />
          )}
          <span
            className={cn(
              "relative inline-flex size-2 rounded-full",
              status.active
                ? "bg-emerald-600"
                : "bg-muted-foreground opacity-60",
            )}
          />
        </span>
        <span className="status-label text-muted-foreground hidden md:inline">
          LIVE_STATUS:
        </span>
        <span className="status-value truncate">{status.label}</span>
      </div>

      <div className="pl-[14px] text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold leading-none truncate">
        <span className="hidden sm:inline">
          {timeLabel} in {LOCATION_LABEL}
        </span>
        <span className="sm:hidden">{timeLabel} AST</span>
        <span className="mx-1 opacity-50">·</span>
        <span>{presence}</span>
      </div>
    </div>
  );
}
