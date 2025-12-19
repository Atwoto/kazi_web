"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Mail, MapPin, ExternalLink, Phone, Users, Eye, Search, Filter, X } from "lucide-react";
import { StatusToggle } from "@/components/admin/StatusToggle";
import { DetailModal } from "@/components/admin/DetailModal";
import { ExportButtons } from "@/components/admin/ExportButtons";
import { supabase } from "@/lib/supabase";

export default function ApplicantsTable() {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [filteredApplicants, setFilteredApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("all");
  const [sortField, setSortField] = useState("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const openModal = (applicant: any) => {
    setSelectedApplicant(applicant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedApplicant(null), 200);
  };

  // Fetch applicants
  useEffect(() => {
    async function fetchApplicants() {
      setLoading(true);
      const { data } = await supabase
        .from("applicants")
        .select("*")
        .order("created_at", { ascending: false });
      setApplicants(data || []);
      setLoading(false);
    }
    fetchApplicants();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...applicants];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (applicant) =>
          applicant.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          applicant.primary_skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
          applicant.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((applicant) => applicant.status === statusFilter);
    }

    // Skill filter
    if (skillFilter !== "all") {
      filtered = filtered.filter((applicant) => applicant.primary_skill === skillFilter);
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

    setFilteredApplicants(filtered);
    setCurrentPage(1);
  }, [applicants, searchTerm, statusFilter, skillFilter, sortField, sortDirection]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplicants = filteredApplicants.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const statusOptions = ["Applied", "Screening", "Vetted", "Rejected"];
  const uniqueSkills = [...new Set(applicants.map((a) => a.primary_skill))];

  return (
    <>
      <div className="p-8">
        <div className="mb-10">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Talent Pool
              </h1>
              <p className="text-slate-500 mt-1">
                Review and manage freelancer applications.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 font-semibold text-slate-600">
                {filteredApplicants.length} of {applicants.length} Applicants
              </div>
              <ExportButtons data={filteredApplicants} type="applicants" />
            </div>
          </div>

          {/* Search and Filter Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search by name, email, skill, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
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
                <Select value={skillFilter} onValueChange={setSkillFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by skill" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    {uniqueSkills.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {(searchTerm || statusFilter !== "all" || skillFilter !== "all") && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setSkillFilter("all");
                    }}
                    className="text-slate-600"
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
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100">
                  <TableHead
                    className="font-bold text-slate-700 py-4 cursor-pointer hover:bg-slate-100/50 transition-colors"
                    onClick={() => handleSort("full_name")}
                  >
                    Applicant {sortField === "full_name" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="font-bold text-slate-700 cursor-pointer hover:bg-slate-100/50 transition-colors"
                    onClick={() => handleSort("primary_skill")}
                  >
                    Primary Skill {sortField === "primary_skill" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="font-bold text-slate-700 cursor-pointer hover:bg-slate-100/50 transition-colors"
                    onClick={() => handleSort("years_experience")}
                  >
                    Experience {sortField === "years_experience" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="font-bold text-slate-700 cursor-pointer hover:bg-slate-100/50 transition-colors"
                    onClick={() => handleSort("city")}
                  >
                    Location {sortField === "city" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
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
                {paginatedApplicants.map((person) => (
                  <TableRow
                    key={person.id}
                    className="hover:bg-slate-50/50 transition-colors border-slate-50"
                  >
                    <TableCell className="py-5">
                      <div className="font-bold text-slate-900">{person.full_name}</div>
                      <div className="text-sm text-slate-500 flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" /> {person.email}
                        </span>
                        {person.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" /> {person.phone}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-purple-50 text-purple-700 border-none px-3 py-1 font-medium text-xs"
                      >
                        {person.primary_skill}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600 font-medium">
                      {person.years_experience}
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {person.city}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusToggle
                        id={person.id}
                        initialStatus={person.status}
                        table="applicants"
                        options={statusOptions}
                      />
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openModal(person)}
                          className="hover:bg-purple-50 text-purple-600"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {person.portfolio_link && (
                          <a
                            href={person.portfolio_link}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors border border-transparent hover:border-blue-100 shadow-sm"
                            title="View Portfolio"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedApplicants.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-48 text-center text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="w-8 h-8 opacity-20" />
                        <p className="italic">
                          {applicants.length === 0
                            ? "No applicants yet. Recruit some talent!"
                            : "No applicants match your filters."}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-slate-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredApplicants.length)} of{" "}
              {filteredApplicants.length} entries
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-10"
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
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {selectedApplicant && (
        <DetailModal
          type="applicant"
          data={selectedApplicant}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
}
