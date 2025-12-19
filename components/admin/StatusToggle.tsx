"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2 } from "lucide-react";

interface StatusToggleProps {
  id: number;
  initialStatus: string;
  table: 'quotes' | 'applicants';
  options: string[];
}

export function StatusToggle({ id, initialStatus, table, options }: StatusToggleProps) {
  const [status, setStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdate(newStatus: string) {
    if (newStatus === status) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/update-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus, table }),
      });

      if (response.ok) {
        setStatus(newStatus);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const getBadgeColor = (s: string) => {
    switch (s) {
      case 'New': return 'bg-green-500 hover:bg-green-600';
      case 'Contacted': return 'bg-blue-500 hover:bg-blue-600';
      case 'Applied': return 'bg-blue-500 hover:bg-blue-600';
      case 'Vetted': return 'bg-green-600 hover:bg-green-700';
      case 'Won': return 'bg-indigo-600 hover:bg-indigo-700';
      case 'Rejected': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-slate-400 hover:bg-slate-500';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none focus:ring-0">
          <Badge className={`${getBadgeColor(status)} cursor-pointer transition-all flex items-center gap-1 min-w-[90px] justify-center py-1`}>
            {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : status}
          </Badge>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-xl border-slate-100">
        {options.map((opt) => (
          <DropdownMenuItem 
            key={opt} 
            onClick={() => handleUpdate(opt)}
            className="cursor-pointer font-medium text-slate-600 focus:text-blue-600 focus:bg-blue-50"
          >
            {opt}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
