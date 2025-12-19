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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <span className="text-xl">⚡</span>
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={activity.id} className="relative">
              {index !== activities.length - 1 && (
                <div className="absolute left-4 top-8 w-0.5 h-full bg-slate-200" />
              )}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-lg shadow-sm z-10">
                  {getIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-slate-900">{activity.title}</p>
                    {activity.status && (
                      <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5">{activity.subtitle}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <p className="italic">No recent activity</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
