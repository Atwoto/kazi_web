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
import { MoreVertical, Mail, MessageCircle } from "lucide-react";
import { StatusToggle } from "@/components/admin/StatusToggle";

export default async function QuotesPage() {
  const { data: quotes } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false });

  const statusOptions = ['New', 'Contacted', 'In Progress', 'Won', 'Lost', 'Archived'];

  return (
    <div className="p-8">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Project Inquiries</h1>
          <p className="text-slate-500 mt-1">Manage and respond to project requests.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 font-semibold text-slate-600">
          {quotes?.length || 0} Total Requests
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100">
                <TableHead className="font-bold text-slate-700 py-4">Client</TableHead>
                <TableHead className="font-bold text-slate-700">Service</TableHead>
                <TableHead className="font-bold text-slate-700">Budget</TableHead>
                <TableHead className="font-bold text-slate-700">Deadline</TableHead>
                <TableHead className="font-bold text-slate-700">Status</TableHead>
                <TableHead className="text-right font-bold text-slate-700 pr-8">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes?.map((quote) => (
                <TableRow key={quote.id} className="hover:bg-slate-50/50 transition-colors border-slate-50">
                  <TableCell className="py-5">
                    <div className="font-bold text-slate-900">{quote.name}</div>
                    <div className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3 text-slate-400" /> {quote.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none px-3 py-1 font-medium">
                      {quote.service_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-slate-700">
                    {quote.budget_range}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {quote.deadline}
                  </TableCell>
                  <TableCell>
                    <StatusToggle 
                      id={quote.id} 
                      initialStatus={quote.status} 
                      table="quotes" 
                      options={statusOptions} 
                    />
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      {quote.whatsapp && (
                        <a 
                          href={`https://wa.me/${quote.whatsapp.replace(/[^0-9]/g, '')}`} 
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
              ))}
              {(!quotes || quotes.length === 0) && (
                <TableRow>
                  <TableCell colSpan={6} className="h-48 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <Mail className="w-8 h-8 opacity-20" />
                      <p className="italic">No inquiries found. Check back later!</p>
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
