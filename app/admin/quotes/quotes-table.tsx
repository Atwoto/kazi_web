"use client";

import { useState, useEffect } from "react";
import { TableHead } from "@/components/ui/table";
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
import { MoreVertical, Mail, MessageCircle, Eye, Search, Filter, X } from "lucide-react";
import { StatusToggle } from "@/components/admin/StatusToggle";
import { DetailModal } from "@/components/admin/DetailModal";
import { TableSkeleton } from "@/components/admin/LoadingSkeleton";
import { ExportButtons } from "@/components/admin/ExportButtons";
import { ResponsiveTable, TableHeader, TableBody, TableRow, TableCell } from "@/components/admin/ResponsiveTable";
import { supabase } from "@/lib/supabase";

export default function QuotesTable() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [sortField, setSortField] = useState("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const openModal = (quote: any) => {
    setSelectedQuote(quote);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedQuote(null), 200);
  };

  // Fetch quotes
  useEffect(() => {
    async function fetchQuotes() {
      setLoading(true);
      const { data } = await supabase
        .from("quotes")
        .select("*")
        .order("created_at", { ascending: false });
      setQuotes(data || []);
      setLoading(false);
    }
    fetchQuotes();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...quotes];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (quote) =>
          quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quote.service_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quote.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((quote) => quote.status === statusFilter);
    }

    // Service filter
    if (serviceFilter !== "all") {
      filtered = filtered.filter((quote) => quote.service_type === serviceFilter);
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

    setFilteredQuotes(filtered);
    setCurrentPage(1);
  }, [quotes, searchTerm, statusFilter, serviceFilter, sortField, sortDirection]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const totalPages = Math.ceil(filteredQuotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuotes = filteredQuotes.slice(startIndex, startIndex + itemsPerPage);

  const statusOptions = ["New", "Contacted", "In Progress", "Won", "Lost", "Archived"];
  const uniqueServices = [...new Set(quotes.map((q) => q.service_type))];

  return (
    <>
      <div className="p-8">
        <div className="mb-10">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Project Inquiries
              </h1>
              <p className="text-slate-500 mt-1">Manage and respond to project requests.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 font-semibold text-slate-600">
                {filteredQuotes.length} of {quotes.length} Requests
              </div>
              <ExportButtons data={filteredQuotes} type="quotes" />
            </div>
          </div>

          {/* Search and Filter Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search by name, email, service, or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={serviceFilter} onValueChange={setServiceFilter}>
                    <SelectTrigger>
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Services</SelectItem>
                      {uniqueServices.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {(searchTerm || statusFilter !== "all" || serviceFilter !== "all") && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
                        setServiceFilter("all");
                      }}
                      className="text-slate-600"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-sm overflow-hidden bg-white">
          <CardContent className="p-0">
            <ResponsiveTable
              headers={[
                { label: "Client", key: "name" },
                { label: "Service", key: "service_type" },
                { label: "Budget", key: "budget_range" },
                { label: "Deadline", key: "deadline" },
                { label: "Status", key: "status" },
                { label: "Actions", key: "actions" },
              ]}
            >
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="font-bold text-slate-700 py-4 cursor-pointer hover:bg-slate-100/50 transition-colors"
                    onClick={() => handleSort("name")}
                  >
                    Client {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="font-bold text-slate-700 cursor-pointer hover:bg-slate-100/50 transition-colors"
                    onClick={() => handleSort("service_type")}
                  >
                    Service {sortField === "service_type" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="font-bold text-slate-700 cursor-pointer hover:bg-slate-100/50 transition-colors"
                    onClick={() => handleSort("budget_range")}
                  >
                    Budget {sortField === "budget_range" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="font-bold text-slate-700">Deadline</TableHead>
                  <TableHead
                    className="font-bold text-slate-700 cursor-pointer hover:bg-slate-100/50 transition-colors"
                    onClick={() => handleSort("status")}
                  >
                    Status {sortField === "status" && (sortDirection === "asc" ? "↑" : "↓")}
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
                      <TableSkeleton />
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedQuotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell label="Client" className="py-5">
                        <div className="font-bold text-slate-900">{quote.name}</div>
                        <div className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3 text-slate-400" /> {quote.email}
                        </div>
                      </TableCell>
                      <TableCell label="Service">
                        <Badge
                          variant="secondary"
                          className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none px-3 py-1 font-medium"
                        >
                          {quote.service_type}
                        </Badge>
                      </TableCell>
                      <TableCell label="Budget" className="font-semibold text-slate-700">
                        {quote.budget_range}
                      </TableCell>
                      <TableCell label="Deadline" className="text-slate-600">
                        {quote.deadline}
                      </TableCell>
                      <TableCell label="Status">
                        <StatusToggle
                          id={quote.id}
                          initialStatus={quote.status}
                          table="quotes"
                          options={statusOptions}
                        />
                      </TableCell>
                      <TableCell label="Actions" className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openModal(quote)}
                            className="hover:bg-blue-50 text-blue-600"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {quote.whatsapp && (
                            <a
                              href={`https://wa.me/${quote.whatsapp.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors border border-transparent hover:border-green-100 shadow-sm"
                              title="WhatsApp Client"
                            >
                              <MessageCircle className="w-5 h-5" />
                            </a>
                          )}
                          <button className="p-2 hover:bg-slate-100 text-slate-400 rounded-lg transition-colors border border-transparent hover:border-slate-200">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
                {paginatedQuotes.length === 0 && !loading && (
                  <TableRow>
                    <TableCell>
                      <div className="flex flex-col items-center gap-2 h-48">
                        <Mail className="w-8 h-8 opacity-20" />
                        <p className="italic text-slate-400">
                          {quotes.length === 0
                            ? "No inquiries found. Check back later!"
                            : "No quotes match your filters."}
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
              {Math.min(startIndex + itemsPerPage, filteredQuotes.length)} of{" "}
              {filteredQuotes.length} entries
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

      {selectedQuote && (
        <DetailModal
          type="quote"
          data={selectedQuote}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
}
