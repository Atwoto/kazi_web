"use client";

import { useState, useEffect } from "react";
import { X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if we've already shown the popup this session
    const hasShown = sessionStorage.getItem("kazi-exit-intent-shown");
    if (hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse leaves the top of the viewport
      if (e.clientY <= 0) {
        setIsOpen(true);
        sessionStorage.setItem("kazi-exit-intent-shown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate API call
    console.log("Exit intent email captured:", email);
    setIsSubmitted(true);
    setTimeout(() => {
        setIsOpen(false);
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
        <div className="bg-blue-600 p-6 text-center text-white relative">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Gift className="w-8 h-8 text-white animate-pulse" />
          </div>
          <DialogTitle className="text-2xl font-heading font-bold mb-2">
            Wait! Don't miss this.
          </DialogTitle>
          <p className="text-blue-100">
            Get <span className="font-bold text-white">5% OFF</span> your first project when you book a consultation today.
          </p>
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 bg-white">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-gray-500 text-sm">
                  Enter your email to receive your discount code and a free project scope assessment.
                </p>
              </div>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-gray-50 border-gray-200"
                required
              />
              <Button type="submit" className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-lg font-bold shadow-lg">
                Claim My Discount
              </Button>
              <p className="text-xs text-center text-gray-400 mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            <div className="text-center py-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Discount Unlocked! 🎉</h3>
              <p className="text-gray-600">
                Check your inbox. We've sent your 5% discount code to <strong>{email}</strong>.
              </p>
              <Button 
                onClick={() => setIsOpen(false)}
                className="mt-6 rounded-full" 
                variant="outline"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}