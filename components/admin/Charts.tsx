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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
                <span className="text-sm font-bold text-slate-900">{item.value}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: color,
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-8">
          <svg width={pieChartSize} height={pieChartSize}>
            {data.map((item, index) => (
              <path
                key={index}
                d={arcPath(index, item)}
                fill={item.color}
                stroke="white"
                strokeWidth={2}
                className="hover:opacity-80 transition-opacity"
              />
            ))}
          </svg>
          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <div className="flex justify-between gap-4">
                    <span className="text-sm font-medium text-slate-700">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {item.value} ({((item.value / total) * 100).toFixed(0)}%)
                    </span>
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <svg width="100%" height="160" viewBox="0 0 200 160">
          <path
            d={`M ${pathData}`}
            fill="none"
            stroke={color}
            strokeWidth="2"
            className="drop-shadow-sm"
          />
          {points.map((point, index) => {
            const [x, y] = point.split(",");
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="3"
                fill={color}
                className="hover:r-4 transition-all"
              />
            );
          })}
        </svg>
        <div className="flex justify-between mt-2">
          {data.map((item, index) => (
            <span key={index} className="text-xs text-slate-500">
              {item.label}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
