"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Search, Loader2 } from "lucide-react";

interface FreeAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FreeAuditModal({ isOpen, onClose }: FreeAuditModalProps) {
  const { t } = useLanguage();
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSuccess(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-none shadow-2xl">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <DialogTitle className="text-center text-2xl font-bold text-slate-900">
                {t.audit?.title || "Get a Free Website Audit"}
              </DialogTitle>
              <DialogDescription className="text-center text-slate-500">
                {t.audit?.subtitle || "See exactly why your competitors are ranking higher than you. No strings attached."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Input
                  placeholder={t.audit?.placeholderUrl || "https://yourwebsite.com"}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="h-12 border-slate-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder={t.audit?.placeholderEmail || "Where should we send the report?"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-slate-200"
                  required
                />
              </div>
              <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : (t.audit?.cta || "Scan My Website")}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 animate-in zoom-in">
              <span className="text-2xl">🎉</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t.audit?.successTitle || "Scanning in progress!"}</h3>
            <p className="text-slate-500">
              {t.audit?.successSubtitle || "We're analyzing your site now. Expect your detailed report in your inbox within 15 minutes."}
            </p>
            <Button onClick={onClose} variant="outline" className="mt-6">
              {t.audit?.close || "Close"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}