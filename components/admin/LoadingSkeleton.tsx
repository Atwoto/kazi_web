"use client";

export function TableSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="h-4 bg-slate-200 rounded animate-pulse flex-1" />
          <div className="h-4 bg-slate-200 rounded animate-pulse w-24" />
          <div className="h-4 bg-slate-200 rounded animate-pulse w-20" />
          <div className="h-4 bg-slate-200 rounded animate-pulse w-32" />
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="h-6 bg-slate-200 rounded animate-pulse mb-4 w-1/3" />
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 rounded animate-pulse" />
        <div className="h-4 bg-slate-200 rounded animate-pulse w-5/6" />
        <div className="h-4 bg-slate-200 rounded animate-pulse w-4/6" />
      </div>
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded animate-pulse w-24" />
          <div className="h-8 bg-slate-200 rounded animate-pulse w-16" />
        </div>
        <div className="h-12 w-12 bg-slate-200 rounded-2xl animate-pulse" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="h-6 bg-slate-200 rounded animate-pulse mb-6 w-1/3" />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-slate-200 rounded animate-pulse w-1/4" />
            <div className="h-2 bg-slate-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
