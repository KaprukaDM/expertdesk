"use client";

import { AreaChart, Area, BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { estimateLkr } from "@/lib/tokenConstants";

type MonthPoint = { month: string; tokensToppedUp: number; ordersCount: number };

function ChartTooltip({
  active,
  payload,
  label,
  formatValue,
  seriesLabel,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
  formatValue: (v: number) => string;
  seriesLabel: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border-border bg-popover text-popover-foreground rounded-lg border px-3 py-2 text-xs shadow-md">
      <p className="text-muted-foreground mb-0.5">{label}</p>
      <p className="font-medium">
        {formatValue(payload[0].value)} <span className="text-muted-foreground font-normal">{seriesLabel}</span>
      </p>
    </div>
  );
}

export function RevenueTrendChart({ data }: { data: MonthPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.28} />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--color-border)" />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
        />
        <Tooltip
          cursor={{ stroke: "var(--color-border)", strokeWidth: 1 }}
          content={
            <ChartTooltip
              formatValue={(v) => estimateLkr(v)}
              seriesLabel="revenue"
            />
          }
        />
        <Area
          type="monotone"
          dataKey="tokensToppedUp"
          stroke="var(--color-primary)"
          strokeWidth={2}
          fill="url(#revenueFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function OrdersTrendChart({ data }: { data: MonthPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--color-border)" />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
        />
        <Tooltip
          cursor={{ fill: "var(--color-muted)" }}
          content={<ChartTooltip formatValue={(v) => `${v}`} seriesLabel="orders placed" />}
        />
        <Bar dataKey="ordersCount" fill="var(--color-primary)" radius={[4, 4, 0, 0]} maxBarSize={36} />
      </BarChart>
    </ResponsiveContainer>
  );
}
