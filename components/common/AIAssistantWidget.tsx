"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
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

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Floating Label */}
      <div className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md mb-1 animate-bounce cursor-pointer" onClick={() => setIsOpen(true)}>
        AI Assistant
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="w-14 h-14 rounded-2xl shadow-xl bg-slate-800 hover:bg-slate-700 transition-all duration-300 flex items-center justify-center border-2 border-slate-700"
            aria-label="Open AI Assistant"
          >
            <MessageSquare className="h-7 w-7 text-white" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px] h-[600px] flex flex-col p-0 gap-0 overflow-hidden rounded-2xl border-slate-800">
          <DialogHeader className="bg-slate-900 p-4 text-white shrink-0">
            <DialogTitle className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">Kazi Assistant</span>
                <span className="text-[10px] text-slate-400 font-normal">Powered by Qwen AI</span>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="flex-1 p-4 bg-slate-50">
            <div className="flex flex-col gap-4" ref={scrollRef}>
              {messages.length === 0 && (
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[85%] self-start">
                  <p className="text-sm text-slate-700">
                    Hi! I'm Kazi's AI assistant. Ask me anything about our services, pricing, or how to get started!
                  </p>
                </div>
              )}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 text-sm rounded-2xl shadow-sm ${
                      m.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                    }`}
                  >
                    {m.content}
                  </div>
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
            </div>
          </ScrollArea>

          <div className="p-4 bg-white border-t border-slate-100 shrink-0">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your question..."
                className="flex-1 bg-slate-50 border-slate-200 focus-visible:ring-blue-600"
              />
              <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700 shrink-0" disabled={isLoading || !input?.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}