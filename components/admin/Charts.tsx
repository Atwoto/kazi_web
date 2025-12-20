"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BarChartProps {
  data: { label: string; value: number }[];
  title: string;
  color?: string;
}

export function BarChart({ data, title, color = "#3b82f6" }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <Card className="border-0 shadow-lg shadow-black/[0.08] bg-gradient-to-br from-white to-slate-50/50 overflow-hidden hover:shadow-xl hover:shadow-black/[0.12] transition-all duration-300">
      <CardHeader className="p-5 sm:p-6 border-b border-slate-100/50 bg-gradient-to-r from-slate-50/50 to-transparent">
        <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg shadow-blue-500/30">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 sm:p-6">
        <div className="space-y-5">
          {data.map((item, index) => (
            <div key={index} className="group">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">{item.label}</span>
                <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-lg">{item.value}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all duration-700 group-hover:h-4"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    background: `linear-gradient(to right, ${color}, ${color}dd)`,
                    boxShadow: `0 0 10px ${color}40`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface PieChartProps {
  data: { label: string; value: number; color: string }[];
  title: string;
}

export function PieChart({ data, title }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  const pieChartSize = 200;
  const center = pieChartSize / 2;
  const radius = center - 20;

  const arcPath = (index: number, item: { label: string; value: number; color: string }) => {
    const percentage = (item.value / total) * 100;
    const startAngle = (cumulativePercentage / 100) * 2 * Math.PI;
    cumulativePercentage += percentage;
    const endAngle = (cumulativePercentage / 100) * 2 * Math.PI;

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const largeArcFlag = percentage > 50 ? 1 : 0;

    const pathData = [
      `M ${center} ${center}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      "Z",
    ].join(" ");

    return pathData;
  };

  return (
    <Card className="border-0 shadow-lg shadow-black/[0.08] bg-gradient-to-br from-white to-slate-50/50 overflow-hidden hover:shadow-xl hover:shadow-black/[0.12] transition-all duration-300">
      <CardHeader className="p-5 sm:p-6 border-b border-slate-100/50 bg-gradient-to-r from-slate-50/50 to-transparent">
        <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg shadow-purple-500/30">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-8">
          <div className="relative">
            <svg width={pieChartSize} height={pieChartSize} className="drop-shadow-lg">
              {data.map((item, index) => (
                <path
                  key={index}
                  d={arcPath(index, item)}
                  fill={item.color}
                  stroke="white"
                  strokeWidth={3}
                  className="hover:opacity-90 transition-all duration-300 hover:scale-105"
                  style={{
                    filter: `drop-shadow(0 0 8px ${item.color}40)`,
                  }}
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">{total}</p>
                <p className="text-xs text-slate-500 font-medium">Total</p>
              </div>
            </div>
          </div>
          <div className="space-y-3 w-full sm:w-auto">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-3 group">
                <div
                  className="w-5 h-5 rounded shadow-md flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-sm font-semibold text-slate-700 truncate group-hover:text-blue-600 transition-colors">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold text-slate-900 whitespace-nowrap">
                      {item.value} ({((item.value / total) * 100).toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${(item.value / total) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface LineChartProps {
  data: { label: string; value: number }[];
  title: string;
  color?: string;
}

export function LineChart({ data, title, color = "#10b981" }: LineChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 180 + 20;
    const y = 120 - ((item.value - minValue) / range) * 80;
    return `${x},${y}`;
  });

  const pathData = points.join(" ");

  return (
    <Card className="border-0 shadow-lg shadow-black/[0.08] bg-gradient-to-br from-white to-slate-50/50 overflow-hidden hover:shadow-xl hover:shadow-black/[0.12] transition-all duration-300">
      <CardHeader className="p-5 sm:p-6 border-b border-slate-100/50 bg-gradient-to-r from-slate-50/50 to-transparent">
        <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-lg shadow-emerald-500/30">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 sm:p-6">
        <div className="relative">
          <svg width="100%" height="180" viewBox="0 0 200 160" className="overflow-visible">
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color} stopOpacity="0.1" />
                <stop offset="50%" stopColor={color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={color} stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* Area under the line */}
            <path
              d={`M ${pathData} L 200 160 L 0 160 Z`}
              fill={`url(#lineGradient)`}
              className="opacity-50"
            />

            {/* Main line */}
            <path
              d={`M ${pathData}`}
              fill="none"
              stroke={color}
              strokeWidth="3"
              className="drop-shadow-lg"
              style={{
                filter: `drop-shadow(0 0 8px ${color}50)`,
              }}
            />

            {/* Data points */}
            {points.map((point, index) => {
              const [x, y] = point.split(",");
              return (
                <g key={index}>
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill="white"
                    stroke={color}
                    strokeWidth="3"
                    className="hover:r-6 transition-all cursor-pointer"
                    style={{
                      filter: `drop-shadow(0 0 4px ${color}60)`,
                    }}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="10"
                    fill={color}
                    opacity="0"
                    className="hover:opacity-20 transition-opacity"
                  />
                </g>
              );
            })}
          </svg>
        </div>
        <div className="flex justify-between mt-4 px-2">
          {data.map((item, index) => (
            <span key={index} className="text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors">
              {item.label}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
