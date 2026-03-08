"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, Sparkles, ArrowLeft } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const THINKING_STEPS = [
  "Analyzing style context...",
  "Searching curated collection...",
  "Evaluating garment silhouettes...",
  "Formulating recommendation...",
];

export const ChatDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Nykaa Luxury Assistant, powered by advanced AI. Ask me about styles, sizing, fabrics, or styling tips. How can I elevate your wardrobe today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [reasoningStep, setReasoningStep] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<{ role: string; content: string }[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isThinking) return;

    const userText = inputValue.trim();
    const newMessage: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsThinking(true);

    // Animate thinking steps
    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < THINKING_STEPS.length) {
        setReasoningStep(THINKING_STEPS[stepIdx]);
        stepIdx++;
      } else {
        clearInterval(interval);
      }
    }, 600);

    // Add to history for context
    historyRef.current = [
      ...historyRef.current,
      { role: "user", content: userText },
    ];

    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: `You are an expert luxury fashion AI concierge for Nykaa Fashion — an Indian premium fashion boutique. You help customers with style advice, outfit pairings, size guidance, fabric care, and trend insights. Be warm, elegant, and concise (2-4 sentences). Always maintain a luxury brand tone. Reference Indian fashion sensibilities when relevant.`,
          messages: historyRef.current,
        }),
      });
      clearInterval(interval);
      setReasoningStep(null);
      setIsThinking(false);

      const data = await res.json();
      const aiText = data.text || "I apologize, I couldn't process that. Please try again.";

      historyRef.current = [...historyRef.current, { role: "assistant", content: aiText }];

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: aiText,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } catch {
      clearInterval(interval);
      setReasoningStep(null);
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "I'm having trouble connecting. Please try again in a moment.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[1000] pointer-events-none">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto animate-fadeIn" onClick={onClose} />
      <div className="absolute inset-0 bg-white pointer-events-auto flex flex-col animate-slideUp">
        {/* Header */}
        <div className="p-6 border-b border-muted flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="lg:hidden p-1 -ml-1">
              <ArrowLeft size={20} />
            </button>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-brand font-bold text-lg leading-tight uppercase tracking-tight">
                Luxury <span className="text-primary">Assistant</span>
              </h3>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <p className="text-[10px] text-luxury-stone font-bold uppercase tracking-widest">Powered by Groq AI</p>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-luxury-stone hover:text-primary transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Conversation Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-[#FAFAFA]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] p-4 rounded-lg shadow-sm ${msg.sender === "user"
                ? "bg-primary text-white"
                : "bg-white text-foreground border border-muted/50"
                }`}>
                <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                <p className={`text-[9px] mt-2 font-bold uppercase tracking-tighter opacity-70 ${msg.sender === "user" ? "text-white/80" : "text-luxury-stone"}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex justify-start animate-fadeIn">
              <div className="max-w-[85%] p-4 rounded-lg bg-white border border-primary/20 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                  </div>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest animate-pulse">
                    {reasoningStep}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-muted bg-white">
          <div className="flex items-center gap-2 bg-muted/30 rounded-full p-2 pl-4 border border-muted/50 focus-within:border-primary/50 transition-colors">
            <input
              type="text"
              placeholder="Ask about styles, sizes, fabrics..."
              className="flex-1 bg-transparent border-none outline-none text-sm font-medium py-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isThinking}
            />
            <button
              onClick={handleSendMessage}
              disabled={isThinking || !inputValue.trim()}
              className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors active:scale-90 disabled:opacity-50"
            >
              <Send size={18} className="translate-x-0.5" />
            </button>
          </div>
          <p className="text-[8px] text-center text-luxury-stone mt-3 uppercase tracking-widest font-bold opacity-50">
            Groq AI · Llama 3.3 70B
          </p>
        </div>
      </div>
    </div>
  );
};
