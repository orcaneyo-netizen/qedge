"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { streamAIResponse } from "@/lib/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function CopilotChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your QuantEdge AI Copilot. Describe a strategy you want to backtest, or ask for a risk report." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setStreamingText("");

    try {
      const history = [...messages, userMessage].map(m => ({
         role: m.role,
         content: m.content
      }));

      await streamAIResponse(history, (chunk) => {
         try {
             // SSE parsing assuming standard format `data: {"type": "text", "content": "..."}`
             if (chunk.startsWith("data: ")) {
                 const data = JSON.parse(chunk.replace("data: ", ""));
                 if (data.type === "text") {
                      setStreamingText(prev => prev + data.content);
                 } else if (data.type === "tool_result") {
                      setStreamingText(prev => prev + `\n\n**Tool Executed: ${data.tool}**\n\`\`\`json\n${JSON.stringify(data.result, null, 2)}\n\`\`\``);
                 }
             }
         } catch(e) {
             // raw fallback if not JSON parseable
             if (!chunk.includes("[DONE]")) {
                  setStreamingText(prev => prev + chunk);
             }
         }
      });

      // Stream finalized
      setMessages(prev => [...prev, { role: "assistant", content: streamingText }]);
      setStreamingText("");

    } catch (error) {
         setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please check your API key." }]);
    } finally {
         setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface border border-rim rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-rim bg-ink/30 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-lime" />
        <h3 className="font-display font-bold text-sm">AI Copilot Chat</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-body text-sm">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-lime/10 flex items-center justify-center text-lime border border-lime/30">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[75%] p-3 rounded-xl ${
                  msg.role === "user"
                    ? "bg-lime text-ink font-semibold"
                    : "bg-ink2 border border-rim text-text-secondary whitespace-pre-wrap"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center text-text-muted border border-rim">
                  <User className="w-4 h-4" />
                </div>
              )}
            </motion.div>
          ))}
          
          {streamingText && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-lime/10 flex items-center justify-center text-lime border border-lime/30">
                <Bot className="w-4 h-4" />
              </div>
              <div className="max-w-[75%] p-3 rounded-xl bg-ink2 border border-rim text-text-secondary whitespace-pre-wrap">
                {streamingText}
                <span className="inline-block w-2 h-4 bg-lime animate-pulse ml-1 align-middle" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-rim bg-surface flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., 'Buy AAPL when RSI under 30'"
          disabled={loading}
          className="flex-1 bg-ink2 border border-rim rounded-xl px-4 py-2 text-sm text-text-primary outline-none focus:border-lime/50 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-2.5 rounded-xl bg-lime text-ink font-bold hover:bg-lime/90 transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
