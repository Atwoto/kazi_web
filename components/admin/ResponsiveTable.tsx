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

interface TableHeaderProps {
  children: ReactNode;
}

export function TableHeader({ children }: TableHeaderProps) {
  return (
    <thead className="bg-slate-50/50 hidden lg:table-header-group">
      {children}
    </thead>
  );
}

interface TableBodyProps {
  children: ReactNode;
}

export function TableBody({ children }: TableBodyProps) {
  return (
    <tbody className="hidden lg:table-row-group">
      {children}
    </tbody>
  );
}

interface TableRowProps {
  children: ReactNode;
  className?: string;
}

export function TableRow({ children, className = "" }: TableRowProps) {
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

interface TableCellProps {
  children: ReactNode;
  className?: string;
  label?: string;
}

export function TableCell({ children, className = "", label }: TableCellProps) {
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
