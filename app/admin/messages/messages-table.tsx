"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Calendar, Reply, Search, Filter, X, MessageSquare } from "lucide-react";
import { ExportButtons } from "@/components/admin/ExportButtons";
import { ResponsiveTable, TableHeader, TableBody, TableRow, TableCell } from "@/components/admin/ResponsiveTable";
import { TableHead } from "@/components/ui/table";
import { supabase } from "@/lib/supabase";

export default function MessagesTable() {
  const [messages, setMessages] = useState<any[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch messages
  useEffect(() => {
    async function fetchMessages() {
      setLoading(true);
      const { data } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });
      setMessages(data || []);
      setLoading(false);
    }
    fetchMessages();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...messages];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (message) =>
          message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "created_at") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredMessages(filtered);
    setCurrentPage(1);
  }, [messages, searchTerm, sortField, sortDirection]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMessages = filteredMessages.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-8">
      <div className="mb-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              General Messages
            </h1>
            <p className="text-slate-500 mt-1">Direct inquiries from the contact page.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 font-semibold text-slate-600">
              {filteredMessages.length} of {messages.length} Messages
            </div>
            <ExportButtons data={filteredMessages} type="messages" />
          </div>
        </div>

        {/* Search Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search by name, email, subject, or message..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              {searchTerm && (
                <Button
                  variant="ghost"
                  onClick={() => setSearchTerm("")}
                  className="text-slate-600 w-fit"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <CardContent className="p-0">
          <ResponsiveTable
            headers={[
              { label: "From", key: "name" },
              { label: "Subject", key: "subject" },
              { label: "Message", key: "message" },
              { label: "Date", key: "created_at" },
              { label: "Actions", key: "actions" },
            ]}
          >
            <TableHeader>
              <TableRow>
                <TableHead
                  className="font-bold text-slate-700 py-4 cursor-pointer hover:bg-slate-100/50 transition-colors"
                  onClick={() => handleSort("name")}
                >
                  From {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  className="font-bold text-slate-700 cursor-pointer hover:bg-slate-100/50 transition-colors"
                  onClick={() => handleSort("subject")}
                >
                  Subject {sortField === "subject" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="font-bold text-slate-700">Message</TableHead>
                <TableHead
                  className="font-bold text-slate-700 cursor-pointer hover:bg-slate-100/50 transition-colors"
                  onClick={() => handleSort("created_at")}
                >
                  Date {sortField === "created_at" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-right font-bold text-slate-700 pr-8">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell className="p-0">
                    <div className="flex items-center justify-center h-48">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedMessages.map((msg) => (
                  <TableRow key={msg.id}>
                    <TableCell label="From" className="py-5">
                      <div className="font-bold text-slate-900">{msg.name}</div>
                      <div className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3 text-slate-400" /> {msg.email}
                      </div>
                    </TableCell>
                    <TableCell label="Subject" className="font-semibold text-slate-700">
                      {msg.subject || "No Subject"}
                    </TableCell>
                    <TableCell label="Message" className="max-w-md">
                      <p className="text-slate-600 leading-relaxed line-clamp-3">
                        {msg.message}
                      </p>
                    </TableCell>
                    <TableCell label="Date" className="text-slate-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(msg.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell label="Actions" className="text-right">
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="gap-2 text-blue-600 hover:text-blue-700 border-blue-200 hover:bg-blue-50"
                      >
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${msg.subject || "Your inquiry to Kazi"}`}
                        >
                          <Reply className="w-4 h-4" /> Reply
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
              {paginatedMessages.length === 0 && !loading && (
                <TableRow>
                  <TableCell>
                    <div className="flex flex-col items-center gap-2 h-48">
                      <MessageSquare className="w-8 h-8 opacity-20" />
                      <p className="italic text-slate-400">
                        {messages.length === 0
                          ? "Inbox is empty."
                          : "No messages match your search."}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </ResponsiveTable>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div className="text-sm text-slate-600 text-center sm:text-left">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredMessages.length)} of{" "}
            {filteredMessages.length} entries
          </div>
          <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 sm:pb-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex-shrink-0"
            >
              Prev
            </Button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-10 flex-shrink-0"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex-shrink-0"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
