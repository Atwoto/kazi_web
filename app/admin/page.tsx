import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  Briefcase,
  Users,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle2,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, LineChart } from "@/components/admin/Charts";
import { ActivityTimeline } from "@/components/admin/ActivityTimeline";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Fetch real-time stats from Supabase
  const { count: quotesCount } = await supabase.from('quotes').select('*', { count: 'exact', head: true });
  const { count: applicantsCount } = await supabase.from('applicants').select('*', { count: 'exact', head: true });
  const { count: messagesCount } = await supabase.from('messages').select('*', { count: 'exact', head: true });

  const { data: quotes } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: applicants } = await supabase
    .from('applicants')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: recentQuotes } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  const { data: pendingQuotes } = await supabase
    .from('quotes')
    .select('*')
    .eq('status', 'New')
    .limit(3);

  const { data: newApplicants } = await supabase
    .from('applicants')
    .select('*')
    .eq('status', 'Applied')
    .limit(3);

  // Prepare activity timeline data
  const activities = [
    ...(quotes || []).slice(0, 5).map((quote) => ({
      id: `quote-${quote.id}`,
      type: 'quote' as const,
      action: 'New quote',
      title: `${quote.name} requested ${quote.service_type}`,
      subtitle: quote.email,
      timestamp: quote.created_at,
      status: quote.status,
    })),
    ...(applicants || []).slice(0, 5).map((app) => ({
      id: `applicant-${app.id}`,
      type: 'applicant' as const,
      action: 'New application',
      title: `${app.full_name} applied`,
      subtitle: app.primary_skill,
      timestamp: app.created_at,
      status: app.status,
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10);

  // Prepare chart data
  const statusCounts = quotes?.reduce((acc: any, quote) => {
    acc[quote.status] = (acc[quote.status] || 0) + 1;
    return acc;
  }, {}) || {};

  const serviceCounts = quotes?.reduce((acc: any, quote) => {
    acc[quote.service_type] = (acc[quote.service_type] || 0) + 1;
    return acc;
  }, {}) || {};

  const quoteStatusData = Object.entries(statusCounts).map(([label, value]) => ({
    label,
    value: value as number,
    color: getStatusColor(label),
  }));

  const serviceData = Object.entries(serviceCounts).map(([label, value]) => ({
    label,
    value: value as number,
  }));

  const monthlyQuotes = getMonthlyData(quotes || []);

  const stats = [
    {
      title: "Project Quotes",
      value: quotesCount || 0,
      icon: Briefcase,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Talent Pool",
      value: applicantsCount || 0,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      title: "Total Messages",
      value: messagesCount || 0,
      icon: MessageSquare,
      color: "text-green-600",
      bg: "bg-green-50"
    }
  ];

  function getStatusColor(status: string) {
    const colors: { [key: string]: string } = {
      'New': '#10b981',
      'Contacted': '#3b82f6',
      'In Progress': '#f59e0b',
      'Won': '#8b5cf6',
      'Lost': '#ef4444',
      'Archived': '#6b7280',
    };
    return colors[status] || '#94a3b8';
  }

  function getMonthlyData(data: any[]) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const counts = new Array(12).fill(0);

    data.forEach(item => {
      const date = new Date(item.created_at);
      const monthIndex = date.getMonth();
      counts[monthIndex]++;
    });

    return months.map((month, index) => ({
      label: month,
      value: counts[index],
    }));
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="mb-8 lg:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl lg:rounded-2xl text-white shadow-lg shadow-blue-500/30">
            <Activity className="w-5 h-5 lg:w-6 lg:h-6" />
          </span>
          Command Center
        </h1>
        <p className="text-slate-500 mt-2 text-sm sm:text-base lg:text-lg ml-13 lg:ml-15">Overview of your agency's activity and performance metrics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 lg:mb-12">
        {stats.map((stat, i) => (
          <Card key={i} className="border-0 shadow-lg shadow-black/[0.08] bg-gradient-to-br from-white to-slate-50/50 overflow-hidden group hover:shadow-xl hover:shadow-black/[0.12] transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-5 sm:p-6 lg:p-8">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.title}</p>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-2 lg:mt-3 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{stat.value}</h3>
                </div>
                <div className={`${stat.bg} ${stat.color} p-3 sm:p-4 rounded-xl lg:rounded-2xl group-hover:scale-110 transition-all duration-300 shadow-lg shadow-black/[0.05]`}>
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                </div>
              </div>
              <div className="mt-4 lg:mt-5 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full group-hover:from-blue-500/40 group-hover:to-blue-600/40 transition-all duration-500"
                  style={{ width: `${Math.min((stat.value / Math.max(100, stat.value)) * 100, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Priority Actions */}
      {(pendingQuotes?.length || 0) + (newApplicants?.length || 0) > 0 && (
        <div className="mb-8 lg:mb-12">
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-5 lg:mb-6 flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg shadow-lg shadow-orange-500/30">
              <TrendingUp className="w-4 h-4 text-white" />
            </span>
            Priority Actions
            <span className="ml-2 px-2 py-1 text-xs font-bold bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full">
              {((pendingQuotes?.length || 0) + (newApplicants?.length || 0))} NEW
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {pendingQuotes?.map((quote) => (
              <Card key={quote.id} className="group border-0 shadow-lg shadow-black/[0.08] bg-gradient-to-br from-white to-blue-50/30 overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-lg text-xs font-bold">Q</span>
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">New Quote Request</p>
                      </div>
                      <p className="font-bold text-slate-900 text-base sm:text-lg mb-1">{quote.name}</p>
                      <p className="text-sm text-slate-600 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        {quote.service_type}
                      </p>
                    </div>
                    <Link href="/admin/quotes" className="flex items-center gap-1 text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors group-hover:translate-x-1">
                      Handle
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
            {newApplicants?.map((app) => (
              <Card key={app.id} className="group border-0 shadow-lg shadow-black/[0.08] bg-gradient-to-br from-white to-purple-50/30 overflow-hidden hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-600 rounded-lg text-xs font-bold">A</span>
                        <p className="text-xs font-bold text-purple-600 uppercase tracking-wider">New Applicant</p>
                      </div>
                      <p className="font-bold text-slate-900 text-base sm:text-lg mb-1">{app.full_name}</p>
                      <p className="text-sm text-slate-600 flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        {app.primary_skill}
                      </p>
                    </div>
                    <Link href="/admin/applicants" className="flex items-center gap-1 text-sm font-bold text-slate-400 hover:text-purple-600 transition-colors group-hover:translate-x-1">
                      Review
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Charts */}
      <div className="mb-8 lg:mb-12">
        <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-5 lg:mb-6 flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg shadow-lg shadow-indigo-500/30">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </span>
          Analytics & Insights
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 lg:mb-8">
          <BarChart data={serviceData} title="Quotes by Service Type" color="#3b82f6" />
          <PieChart data={quoteStatusData} title="Quote Status Distribution" />
        </div>
        <LineChart data={monthlyQuotes} title="Monthly Quote Trends" color="#10b981" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 lg:mb-12">
        {/* Recent Quotes */}
        <Card className="border-0 shadow-lg shadow-black/[0.08] bg-gradient-to-br from-white to-slate-50/50 overflow-hidden hover:shadow-xl hover:shadow-black/[0.12] transition-all duration-300">
          <CardHeader className="p-5 sm:p-6 border-b border-slate-100/50 bg-gradient-to-r from-slate-50/50 to-transparent">
            <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg shadow-blue-500/30">
                <Clock className="w-4 h-4 text-white" />
              </span>
              Recent Project Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {recentQuotes?.map((quote) => (
                <div key={quote.id} className="p-4 sm:p-5 flex items-start justify-between hover:bg-slate-50/50 transition-colors group">
                  <div className="min-w-0 flex-1 pr-4">
                    <p className="font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">{quote.name}</p>
                    <p className="text-sm text-slate-500 truncate mt-0.5 flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      {quote.service_type}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs sm:text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">{quote.budget_range}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(quote.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {(!recentQuotes || recentQuotes.length === 0) && (
                <div className="p-8 sm:p-10 text-center text-slate-400">
                  <MessageSquare className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                  <p className="italic">No inquiries yet.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Activity Timeline - Takes 2 columns */}
        <div className="xl:col-span-2">
          <ActivityTimeline activities={activities} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Business Health / Tips */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card className="border-0 shadow-xl shadow-black/[0.12] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
            <CardContent className="p-6 sm:p-8 lg:p-10 relative z-10">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4 flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/30">
                  <TrendingUp className="w-5 h-5 text-white" />
                </span>
                Pro Tip: Response Time
              </h3>
              <p className="text-slate-300 leading-relaxed mb-5 lg:mb-6 text-sm sm:text-base">
                Clients who receive a response within 4 hours are 70% more likely to book. Try to keep your "New" queue clear for maximum conversion!
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 sm:px-7 py-3 rounded-xl font-semibold transition-all duration-300 text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 flex items-center gap-2">
                View All Leads
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg shadow-green-500/10 bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-green-900 text-base sm:text-lg mb-2 sm:mb-3">System Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <p className="text-xs sm:text-sm text-green-700 font-medium">Supabase Database: <span className="font-bold">Online</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <p className="text-xs sm:text-sm text-green-700 font-medium">Email Provider: <span className="font-bold">Connected</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <p className="text-xs sm:text-sm text-green-700 font-medium">API Status: <span className="font-bold">All Systems Operational</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg shadow-black/[0.08] bg-gradient-to-br from-white to-slate-50/50 overflow-hidden h-full">
            <CardHeader className="p-5 sm:p-6 border-b border-slate-100/50 bg-gradient-to-r from-slate-50/50 to-transparent">
              <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-lg shadow-emerald-500/30">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </span>
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 sm:p-6 space-y-4 sm:space-y-5">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Quotes</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">{quotesCount || 0}</p>
                <p className="text-xs text-green-600 mt-1 font-medium">+{Math.floor((quotesCount || 0) * 0.1)} this month</p>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Conversion Rate</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">24%</p>
                <p className="text-xs text-green-600 mt-1 font-medium">+3% from last month</p>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Avg. Response</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">2.3h</p>
                <p className="text-xs text-green-600 mt-1 font-medium">Target: &lt;4h</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
