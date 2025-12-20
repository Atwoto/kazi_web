"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  ChevronLeft,
  Briefcase,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { checkAuth, logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function verifyAuth() {
      // Skip auth check for login and signup pages
      if (pathname === "/admin/login" || pathname === "/admin/signup") {
        setLoading(false);
        return;
      }

      const session = await checkAuth();
      if (!session) {
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
      setLoading(false);
    }

    verifyAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      router.push("/admin/login");
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show login/signup pages without layout
  if (pathname === "/admin/login" || pathname === "/admin/signup") {
    return <>{children}</>;
  }

  // Don't render admin content if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-2xl
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
              K
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight group-hover:text-blue-300 transition-colors">Kazi Admin</span>
              <p className="text-xs text-slate-400 font-medium">Management Console</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all text-slate-300 hover:text-white hover:translate-x-1"
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
            <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          </Link>
          <Link
            href="/admin/quotes"
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all text-slate-300 hover:text-white hover:translate-x-1"
            onClick={() => setSidebarOpen(false)}
          >
            <Briefcase className="w-5 h-5" />
            <span className="font-medium">Quotes & Leads</span>
          </Link>
          <Link
            href="/admin/applicants"
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all text-slate-300 hover:text-white hover:translate-x-1"
            onClick={() => setSidebarOpen(false)}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Talent Pool</span>
          </Link>
          <Link
            href="/admin/messages"
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all text-slate-300 hover:text-white hover:translate-x-1"
            onClick={() => setSidebarOpen(false)}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Messages</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all text-slate-300 hover:text-white hover:translate-x-1"
            onClick={() => setSidebarOpen(false)}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-slate-400 hover:text-white hover:bg-white/10 rounded-xl h-11"
          >
            <LogOut className="w-4 h-4 mr-3" />
            <span className="font-medium">Logout</span>
          </Button>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white text-sm group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6 text-slate-700" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
              K
            </div>
            <div>
              <span className="font-bold text-slate-900 block leading-tight">Kazi Admin</span>
              <span className="text-xs text-slate-500 font-medium">Management</span>
            </div>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50/30 to-white">
          {children}
        </main>
      </div>
    </div>
  );
}
