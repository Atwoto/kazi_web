"use client";

import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

interface ExportButtonsProps {
  data: any[];
  type: "quotes" | "applicants" | "messages";
}

export function ExportButtons({ data, type }: ExportButtonsProps) {
  const exportToCSV = () => {
    if (!data || data.length === 0) return;

    let csvContent = "";
    let headers: string[] = [];
    let rows: string[][] = [];

    if (type === "quotes") {
      headers = [
        "ID",
        "Name",
        "Email",
        "WhatsApp",
        "Service Type",
        "Budget Range",
        "Deadline",
        "Status",
        "Created At",
        "Description",
      ];
      rows = data.map((quote) => [
        quote.id,
        quote.name,
        quote.email,
        quote.whatsapp || "",
        quote.service_type,
        quote.budget_range,
        quote.deadline,
        quote.status,
        new Date(quote.created_at).toLocaleDateString(),
        quote.description || "",
      ]);
    } else if (type === "applicants") {
      headers = [
        "ID",
        "Full Name",
        "Email",
        "Phone",
        "City",
        "Primary Skill",
        "Years Experience",
        "Status",
        "Created At",
        "Portfolio Link",
      ];
      rows = data.map((app) => [
        app.id,
        app.full_name,
        app.email,
        app.phone || "",
        app.city,
        app.primary_skill,
        app.years_experience,
        app.status,
        new Date(app.created_at).toLocaleDateString(),
        app.portfolio_link || "",
      ]);
    } else if (type === "messages") {
      headers = ["ID", "Name", "Email", "Subject", "Message", "Created At"];
      rows = data.map((msg) => [
        msg.id,
        msg.name,
        msg.email,
        msg.subject || "",
        msg.message,
        new Date(msg.created_at).toLocaleDateString(),
      ]);
    }

    csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${type}_export_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    if (!data || data.length === 0) return;

    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${type}_export_${new Date().toISOString().split("T")[0]}.json`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={exportToCSV}
        className="text-slate-700"
      >
        <Download className="w-4 h-4 mr-2" />
        Export CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={exportToJSON}
        className="text-slate-700"
      >
        <FileText className="w-4 h-4 mr-2" />
        Export JSON
      </Button>
    </div>
  );
}
