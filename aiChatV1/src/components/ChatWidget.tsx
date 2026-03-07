import { useState, useRef, useEffect } from "react";
import {MessageCircleMore} from 'lucide-react';
import { v4 as uuid } from "uuid"

interface ChatWidgetProps {
  botName?: string;
  brandColor?: string;
  welcomeMessage?: string;
}

type Message = { id: string; role: "bot" | "user"; text: string };

export default function ChatWidget({
  botName = "AI Assistant",
  brandColor = "#2563eb",
  welcomeMessage = "Hello! How can I help you today?"
}: ChatWidgetProps) {

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: uuid(), role: "bot", text: welcomeMessage }
  ]);
  const [input, setInput] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage:Message = { id: uuid(), role: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Placeholder bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: uuid(), role: "bot", text: "This will connect to AI soon v." }
      ]);
    }, 500);
  };

  return (
    <div ref={widgetRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">

      {/* Chat Window */}
      {open && (
        <div className="w-[calc(100vw-2rem)] sm:w-[350px] h-[500px] max-h-[calc(100vh-10rem)] bg-white shadow-xl rounded-xl flex flex-col overflow-hidden mb-4 border">

          {/* Header */}
          <div
            className="text-white px-4 py-3 font-semibold"
            style={{ backgroundColor: brandColor }}
          >
            {botName}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}

            <div ref={bottomRef}></div>
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              className="flex-1 border rounded-md px-3 py-2 text-sm outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              className="text-white px-4 py-2 rounded-md text-sm"
              style={{ backgroundColor: brandColor }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full text-white shadow-lg flex items-center justify-center text-xl"
        style={{ backgroundColor: brandColor }}
      >
        <MessageCircleMore />
      </button>
    </div>
  );
}