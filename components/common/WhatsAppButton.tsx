import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppButton() {
  const whatsappNumber = "34669171216"; // Kazi WhatsApp business number
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-green-500 rounded-full opacity-75 group-hover:opacity-100 animate-ping duration-[2000ms]" />
        <Button asChild className="relative rounded-full w-14 h-14 flex items-center justify-center shadow-xl bg-[#25D366] hover:bg-[#20b85a] transition-all duration-300 hover:scale-110">
          <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Image src="/whatsapp-icon.svg" alt="WhatsApp" width={32} height={32} />
          </Link>
        </Button>
      </div>
    </div>
  );
}
