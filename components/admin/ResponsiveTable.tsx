"use client";

import { ReactNode } from "react";

interface ResponsiveTableProps {
  headers: { label: string; key: string }[];
  children: ReactNode;
}

export function ResponsiveTable({ headers, children }: ResponsiveTableProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block">
        <table className="w-full">{children}</table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">{children}</div>
    </div>
  );
}

function TableHeader({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-slate-50/50 hidden lg:table-header-group">
      {children}
    </thead>
  );
}

function TableBody({ children }: { children: ReactNode }) {
  return (
    <tbody className="hidden lg:table-row-group">
      {children}
    </tbody>
  );
}

function TableRow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <>
      {/* Desktop Row */}
      <tr className={`hover:bg-slate-50/50 transition-colors border-slate-50 hidden lg:table-row ${className}`}>
        {children}
      </tr>

      {/* Mobile Card */}
      <tr className="lg:hidden">
        <td colSpan={12} className="p-0">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 space-y-3">
            {children}
          </div>
        </td>
      </tr>
    </>
  );
}

function TableCell({ children, className = "", label }: { children: ReactNode; className?: string; label?: string }) {
  return (
    <>
      {/* Desktop Cell */}
      <td className={`py-4 px-4 hidden lg:table-cell ${className}`}>
        {children}
      </td>

      {/* Mobile Label */}
      {label && (
        <div className="lg:hidden">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            {label}
          </div>
          <div className="text-sm font-medium text-slate-900">{children}</div>
        </div>
      )}
    </>
  );
}

// Export as named exports for use in tables
export { TableHeader, TableBody, TableRow, TableCell };
