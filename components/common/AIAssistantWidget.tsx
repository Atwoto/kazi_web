"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, MessageSquare, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/context/LanguageContext";

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

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    // Scroll to bottom when messages change
    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    };
    
    // Use setTimeout to ensure DOM has updated
    setTimeout(scrollToBottom, 100);
  }, [messages, isLoading]);

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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 fixed-floating-button transition-all duration-300">
      {!isOpen && (
        <div
          className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-colors animate-bounce"
          onClick={() => setIsOpen(true)}
        >
          {t.chatbot.needHelp}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="w-14 h-14 rounded-full shadow-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center hover:scale-105"
            aria-label="Open AI Assistant"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <MessageSquare className="h-6 w-6 text-white" />
            )}
          </Button>
        </DialogTrigger>
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
    </div>
  );
}
