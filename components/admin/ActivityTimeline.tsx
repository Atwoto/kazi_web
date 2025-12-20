"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Activity {
  id: string;
  type: "quote" | "applicant" | "message";
  action: string;
  title: string;
  subtitle: string;
  timestamp: string;
  status?: string;
}

interface ActivityTimelineProps {
  activities: Activity[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "quote":
        return "💼";
      case "applicant":
        return "👤";
      case "message":
        return "📧";
      default:
        return "•";
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "New":
      case "Applied":
        return "bg-green-100 text-green-800";
      case "Contacted":
      case "Screening":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Won":
      case "Vetted":
        return "bg-purple-100 text-purple-800";
      case "Lost":
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <Card className="border-0 shadow-lg shadow-black/[0.08] bg-gradient-to-br from-white to-slate-50/50 overflow-hidden hover:shadow-xl hover:shadow-black/[0.12] transition-all duration-300">
      <CardHeader className="p-5 sm:p-6 border-b border-slate-100/50 bg-gradient-to-r from-slate-50/50 to-transparent">
        <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg shadow-lg shadow-amber-500/30">
            <span className="text-white text-lg">⚡</span>
          </span>
          Recent Activity
          <span className="ml-auto px-2 py-1 text-xs font-bold bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full">
            LIVE
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 sm:p-6">
        <div className="space-y-5 sm:space-y-6">
          {activities.map((activity, index) => (
            <div key={activity.id} className="relative group">
              {index !== activities.length - 1 && (
                <div className="absolute left-[18px] top-10 w-0.5 h-full bg-gradient-to-b from-slate-200 to-slate-100" />
              )}
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center text-lg shadow-md z-10 group-hover:border-blue-300 group-hover:scale-110 transition-all duration-300">
                  {getIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">{activity.title}</p>
                    {activity.status && (
                      <Badge className={`text-xs ${getStatusColor(activity.status)} shrink-0`}>
                        {activity.status}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mt-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                    {activity.subtitle}
                  </p>
                  <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <div className="text-center py-10 sm:py-12 text-slate-400">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="italic text-sm">No recent activity</p>
              <p className="text-xs text-slate-400 mt-1">New activities will appear here</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
