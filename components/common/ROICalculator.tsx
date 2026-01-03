"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Calculator, ArrowRight } from "lucide-react";

export default function ROICalculator() {
  const { t } = useLanguage();
  const [visitors, setVisitors] = useState(1000);
  const [conversionRate, setConversionRate] = useState(1); // 1%
  const [avgValue, setAvgValue] = useState(100);

  const currentRevenue = visitors * (conversionRate / 100) * avgValue;
  
  // Conservative estimate: Kazi improvements usually boost conversion by 0.5% - 1.5% minimum
  const improvedConversionRate = conversionRate + 1.5; 
  const potentialRevenue = visitors * (improvedConversionRate / 100) * avgValue;
  const extraRevenue = potentialRevenue - currentRevenue;

  return (
    <Card className="w-full max-w-lg mx-auto border-blue-100 shadow-xl bg-white">
      <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6">
        <div className="flex items-center gap-3 mb-2">
           <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
             <Calculator className="w-5 h-5" />
           </div>
           <CardTitle className="text-xl font-bold text-slate-900">{t.roi?.title || "ROI Calculator"}</CardTitle>
        </div>
        <p className="text-sm text-slate-500">
          {t.roi?.subtitle || "See how much revenue you're leaving on the table with a standard website."}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8 pt-6">
        {/* Visitors Input */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="visitors" className="font-semibold text-slate-700 text-base">{t.roi?.visitors || "Monthly Visitors"}</Label>
            <div className="relative w-32">
                <Input 
                    type="number" 
                    value={visitors} 
                    onChange={(e) => setVisitors(Number(e.target.value))}
                    className="h-9 text-right pr-2 font-bold text-blue-600 border-blue-100 focus-visible:ring-blue-500"
                />
            </div>
          </div>
          <div className="space-y-2">
            <Slider 
                id="visitors"
                min={100} 
                max={50000} 
                step={100} 
                value={[visitors]} 
                onValueChange={(val) => setVisitors(val[0])}
                className="py-2 cursor-pointer"
            />
            <p className="text-xs text-slate-400 text-center italic">Drag slider to adjust</p>
          </div>
        </div>

        {/* Conversion Rate Input */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="conversion" className="font-semibold text-slate-700 text-base">{t.roi?.conversion || "Current Conversion Rate (%)"}</Label>
            <div className="relative w-24">
                <Input 
                    type="number" 
                    value={conversionRate} 
                    onChange={(e) => setConversionRate(Number(e.target.value))}
                    className="h-9 text-right pr-6 font-bold text-blue-600 border-blue-100 focus-visible:ring-blue-500"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-2">
            <Slider 
                id="conversion"
                min={0.1} 
                max={10} 
                step={0.1} 
                value={[conversionRate]} 
                onValueChange={(val) => setConversionRate(val[0])}
                className="py-2 cursor-pointer"
            />
            <p className="text-xs text-slate-400 text-center italic">Drag slider to adjust</p>
          </div>
        </div>

        {/* Avg Value Input */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
             <Label htmlFor="value" className="font-semibold text-slate-700 text-base">{t.roi?.value || "Avg. Client Value (€)"}</Label>
             <div className="relative w-32">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">€</span>
                <Input 
                id="value" 
                type="number" 
                value={avgValue} 
                onChange={(e) => setAvgValue(Number(e.target.value))}
                className="pl-7 text-right font-bold text-blue-600 border-blue-100 focus-visible:ring-blue-500" 
                />
             </div>
          </div>
        </div>

        {/* Results Box */}
        <div className="bg-slate-900 rounded-xl p-6 text-white mt-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">{t.roi?.resultTitle || "Potential Extra Revenue"}</p>
            <p className="text-4xl font-bold text-green-400 mb-1">
              +€{extraRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
            <p className="text-xs text-slate-500">{t.roi?.resultSubtitle || "per month with a Kazi-optimized site"}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-6">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-full shadow-lg shadow-blue-500/20">
          {t.roi?.cta || "Get My Growth Plan"} <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}