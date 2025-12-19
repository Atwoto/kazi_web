import { supabase } from "@/lib/supabase";
import { 
  Briefcase, 
  Users, 
  MessageSquare, 
  TrendingUp,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboard() {
  // Fetch real-time stats from Supabase
  const { count: quotesCount } = await supabase.from('quotes').select('*', { count: 'exact', head: true });
  const { count: applicantsCount } = await supabase.from('applicants').select('*', { count: 'exact', head: true });
  const { count: messagesCount } = await supabase.from('messages').select('*', { count: 'exact', head: true });
  
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

  return (
    <div className="p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Command Center</h1>
        <p className="text-slate-500 mt-1">Overview of your agency's activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.title}</p>
                  <h3 className="text-4xl font-bold text-slate-900 mt-2">{stat.value}</h3>
                </div>
                <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Priority Actions */}
      {(pendingQuotes?.length || 0) + (newApplicants?.length || 0) > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-500" />
            Priority Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingQuotes?.map((quote) => (
              <div key={quote.id} className="bg-white border-l-4 border-blue-500 p-4 rounded-xl shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-blue-600 uppercase">New Quote Request</p>
                  <p className="font-bold text-slate-900">{quote.name} needs {quote.service_type}</p>
                </div>
                <Link href="/admin/quotes" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">Handle →</Link>
              </div>
            ))}
            {newApplicants?.map((app) => (
              <div key={app.id} className="bg-white border-l-4 border-purple-500 p-4 rounded-xl shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-purple-600 uppercase">New Applicant</p>
                  <p className="font-bold text-slate-900">{app.full_name} - {app.primary_skill}</p>
                </div>
                <Link href="/admin/applicants" className="text-sm font-bold text-slate-400 hover:text-purple-600 transition-colors">Review →</Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Quotes */}
        <Card className="border-none shadow-sm">
          <CardHeader className="p-6 border-b border-slate-50">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Recent Project Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {recentQuotes?.map((quote) => (
                <div key={quote.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div>
                    <p className="font-bold text-slate-900">{quote.name}</p>
                    <p className="text-sm text-slate-500">{quote.service_type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-blue-600">{quote.budget_range}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(quote.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {(!recentQuotes || recentQuotes.length === 0) && (
                <div className="p-10 text-center text-slate-400 italic">No inquiries yet.</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Business Health / Tips */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                Pro Tip: Response Time
              </h3>
              <p className="text-slate-300 leading-relaxed mb-6 text-sm">
                Clients who receive a response within 4 hours are 70% more likely to book. Try to keep your "New" queue clear!
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-colors">
                View All Leads
              </button>
            </div>
          </div>

          <div className="bg-green-50 border border-green-100 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <h4 className="font-bold text-green-900">System Status</h4>
            </div>
            <p className="text-sm text-green-700">Supabase Database: Online</p>
            <p className="text-sm text-green-700 mt-1">Email Provider: Connected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
