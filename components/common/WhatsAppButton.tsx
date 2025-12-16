import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppButton() {
  const whatsappNumber = "34669171216"; // Kazi WhatsApp business number
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button asChild className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg bg-green-500 hover:bg-green-600 transition-all duration-300 hover:scale-110 animate-bounce hover:animate-none group">
        <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="h-7 w-7 text-white group-hover:scale-110 transition-transform duration-300" />
        </Link>
      </Button>
    </div>
  );
}
