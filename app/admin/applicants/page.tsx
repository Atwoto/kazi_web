import { supabase } from "@/lib/supabase";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, ExternalLink, Phone, Users } from "lucide-react";
import { StatusToggle } from "@/components/admin/StatusToggle";

export default async function ApplicantsPage() {
  const { data: applicants } = await supabase
    .from('applicants')
    .select('*')
    .order('created_at', { ascending: false });

  const statusOptions = ['Applied', 'Screening', 'Vetted', 'Rejected'];

  return (
    <div className="p-8">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Talent Pool</h1>
          <p className="text-slate-500 mt-1">Review and manage freelancer applications.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 font-semibold text-slate-600">
          {applicants?.length || 0} Total Applicants
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100">
                <TableHead className="font-bold text-slate-700 py-4">Applicant</TableHead>
                <TableHead className="font-bold text-slate-700">Primary Skill</TableHead>
                <TableHead className="font-bold text-slate-700">Experience</TableHead>
                <TableHead className="font-bold text-slate-700">Location</TableHead>
                <TableHead className="font-bold text-slate-700">Status</TableHead>
                <TableHead className="text-right font-bold text-slate-700 pr-8">Portfolio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants?.map((person) => (
                <TableRow key={person.id} className="hover:bg-slate-50/50 transition-colors border-slate-50">
                  <TableCell className="py-5">
                    <div className="font-bold text-slate-900">{person.full_name}</div>
                    <div className="text-sm text-slate-500 flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {person.email}</span>
                      {person.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {person.phone}</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-none px-3 py-1 font-medium text-xs">
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
                    {person.portfolio_link && (
                      <a 
                        href={person.portfolio_link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-bold text-sm bg-blue-50/50 px-3 py-1.5 rounded-lg border border-transparent hover:border-blue-100 transition-all"
                      >
                        Portfolio <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {(!applicants || applicants.length === 0) && (
                <TableRow>
                  <TableCell colSpan={6} className="h-48 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="w-8 h-8 opacity-20" />
                      <p className="italic">No applicants yet. Recruit some talent!</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
