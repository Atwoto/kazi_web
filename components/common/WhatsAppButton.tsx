import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function WhatsAppButton() {
  const whatsappNumber = "34669171216"; // Kazi WhatsApp business number
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button asChild className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg bg-green-500 hover:bg-green-600 transition-colors">
        <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <Image src="/whatsapp-icon.svg" alt="WhatsApp" width={28} height={28} />
        </Link>
      </Button>
    </div>
  );
}
