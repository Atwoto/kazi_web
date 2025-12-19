import { supabase } from "@/lib/supabase";
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
import { MoreVertical, Mail, MessageCircle, Eye } from "lucide-react";
import { StatusToggle } from "@/components/admin/StatusToggle";
import { DetailModal } from "@/components/admin/DetailModal";
import QuotesTable from "./quotes-table";

export default function QuotesPage() {
  return <QuotesTable />;
}
