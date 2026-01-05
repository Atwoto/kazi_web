"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { X, Bot, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

// Simple markdown formatter
const formatMessage = (text: string) => {
  const lines = text.split('\n');
  let inList = false;
  let html = '';

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    
    // Headers
    if (trimmed.startsWith('###')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<h3 class="font-bold text-base mt-2 mb-1">${trimmed.replace(/^###\s*/, '')}</h3>`;
    }
    // Bullet points
    else if (trimmed.match(/^[•\-\*]\s/)) {
      if (!inList) { html += '<ul class="list-disc pl-4 space-y-1">'; inList = true; }
      html += `<li>${trimmed.replace(/^[•\-\*]\s*/, '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</li>`;
    }
    // Numbered lists
    else if (trimmed.match(/^\d+\.\s/)) {
      if (inList && html.includes('<ul')) { html += '</ul>'; inList = false; }
      if (!inList) { html += '<ol class="list-decimal pl-4 space-y-1">'; inList = true; }
      html += `<li>${trimmed.replace(/^\d+\.\s*/, '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</li>`;
    }
    // Regular text
    else if (trimmed) {
      if (inList) { html += inList && html.includes('<ul') ? '</ul>' : '</ol>'; inList = false; }
      html += `<p class="mb-2">${trimmed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</p>`;
    }
    // Empty line
    else {
      if (inList) { html += inList && html.includes('<ul') ? '</ul>' : '</ol>'; inList = false; }
    }
  });

  if (inList) html += html.includes('<ul') ? '</ul>' : '</ol>';
  return html;
};

export default function WhatsAppButton() {
  const { t } = useLanguage();
  const phoneNumber = t.contact.phoneNumber;
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interacted = localStorage.getItem("kazi_wa_interacted");
    if (interacted) {
      setHasInteracted(true);
    }
  }, []);

  useEffect(() => {
    if (hasInteracted) return;

    const handleScroll = () => {
      if (hasInteracted || showTooltip) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      if (scrollPercent >= 0.5 && scrollPercent <= 0.6) {
        setShowTooltip(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasInteracted, showTooltip]);

  const handleInteraction = () => {
    setHasInteracted(true);
    setShowTooltip(false);
    localStorage.setItem("kazi_wa_interacted", "true");
  };

  const handleCloseTooltip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleInteraction();
  };

  const handleOpenChat = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsChatOpen(true);
    handleInteraction();
  };

  // Chat logic
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    };
    if (isChatOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isLoading, isChatOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("Failed");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let content = "";
      const assistantId = (Date.now() + 1).toString();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value, { stream: true });
          content += text;

          setMessages((prev) => {
            const existing = prev.find((m) => m.id === assistantId);
            if (existing) {
              return prev.map((m) =>
                m.id === assistantId ? { ...m, content } : m
              );
            }
            return [...prev, { id: assistantId, role: "assistant", content }];
          });
        }
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "Sorry, error occurred. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-3 fixed-floating-button">
        {/* Tooltip bubble - appears ABOVE the button */}
        {showTooltip && (
          <div 
            className="bg-white text-slate-900 text-[13px] font-bold px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-100 animate-in fade-in zoom-in slide-in-from-bottom-2 duration-500 flex items-center gap-3 cursor-pointer whitespace-nowrap hover:bg-slate-50 transition-colors"
            onClick={handleOpenChat}
          >
            <span>{t.chatbot.tooltip || "Questions? Chat with us."}</span>
            <button 
              onClick={handleCloseTooltip}
              className="p-1 hover:bg-slate-200 rounded-full transition-colors"
              aria-label="Close tooltip"
            >
              <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />
            </button>
          </div>
        )}

        {/* WhatsApp Icon Button */}
        <a
          href={`https://wa.me/${phoneNumber.replace(/\s/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 cursor-pointer group"
          aria-label="Chat on WhatsApp"
        >
          <svg
            className="w-6 h-6 text-white transition-transform"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
          </svg>
        </a>
      </div>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent
          className="sm:max-w-[400px] h-[600px] flex flex-col p-0 gap-0 overflow-hidden rounded-2xl border-slate-800"
          aria-describedby="chatbot-description"
        >
          <DialogHeader className="bg-slate-900 p-4 text-white shrink-0">
            <DialogTitle className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">Kazi Agency Assistant</span>
              </div>
            </DialogTitle>
            <p id="chatbot-description" className="sr-only">
              Chat with our AI assistant
            </p>
          </DialogHeader>

          <ScrollArea className="flex-1 p-4 bg-slate-50 max-h-[450px] overflow-y-auto">
            <div className="flex flex-col gap-4">
              {messages.length === 0 && (
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[85%] self-start">
                  <p className="text-sm text-slate-700">
                    {t.chatbot.greeting}
                  </p>
                </div>
              )}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 text-sm rounded-2xl shadow-sm ${
                      m.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-white text-slate-700 border border-slate-100 rounded-tl-none [&_p]:mb-1 [&_ul]:my-1 [&_ol]:my-1"
                    }`}
                    dangerouslySetInnerHTML={{ __html: formatMessage(m.content) }}
                  />
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          <div className="p-4 bg-white border-t border-slate-100 shrink-0">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isLoading ? t.chatbot.waiting : t.chatbot.placeholder}
                disabled={isLoading}
                className="flex-1 bg-slate-50 border-slate-200 focus-visible:ring-blue-600 disabled:opacity-50"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-blue-600 hover:bg-blue-700 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
