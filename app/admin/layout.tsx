import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  MessageSquare, 
  ChevronLeft,
  Briefcase,
  Settings
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">K</div>
          <span className="text-xl font-bold tracking-tight">Kazi Admin</span>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors text-slate-300 hover:text-white">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/quotes" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors text-slate-300 hover:text-white">
            <Briefcase className="w-5 h-5" />
            <span>Quotes & Leads</span>
          </Link>
          <Link href="/admin/applicants" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors text-slate-300 hover:text-white">
            <Users className="w-5 h-5" />
            <span>Talent Pool</span>
          </Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors text-slate-300 hover:text-white">
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors text-slate-400 hover:text-white text-sm">
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
