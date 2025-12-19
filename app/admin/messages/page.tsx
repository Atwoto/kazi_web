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
import { Mail, Calendar } from "lucide-react";

export default async function MessagesPage() {
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="p-8">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">General Messages</h1>
          <p className="text-slate-500 mt-1">Direct inquiries from the contact page.</p>
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-bold text-slate-700">From</TableHead>
                <TableHead className="font-bold text-slate-700">Subject</TableHead>
                <TableHead className="font-bold text-slate-700">Message</TableHead>
                <TableHead className="font-bold text-slate-700 text-right whitespace-nowrap">Date Received</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages?.map((msg) => (
                <TableRow key={msg.id} className="hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="py-6 align-top">
                    <div className="font-bold text-slate-900">{msg.name}</div>
                    <div className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                      <Mail className="w-3 h-3" /> {msg.email}
                    </div>
                  </TableCell>
                  <TableCell className="align-top font-semibold text-slate-700">
                    {msg.subject || "No Subject"}
                  </TableCell>
                  <TableCell className="max-w-md align-top">
                    <p className="text-slate-600 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                      {msg.message}
                    </p>
                  </TableCell>
                  <TableCell className="text-right align-top whitespace-nowrap text-slate-400 text-sm">
                    <div className="flex items-center justify-end gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(msg.created_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {(!messages || messages.length === 0) && (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-slate-400 italic">
                    Inbox is empty.
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
