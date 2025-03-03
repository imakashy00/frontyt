"use client";
import axios from "axios";
import { Bot, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface YtAiProps {
  videoId?: string;
}

const YtAi = ({ videoId }: YtAiProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || !videoId) return;

    const question = input.trim();
    setInput("");

    // Add user question to messages
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/note/ask`,
        {
          video_id: videoId,
          question: question,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // Add AI response to messages
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.answer },
      ]);
    } catch (error) {
      console.error("Error asking question:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't get an answer. Please try again or make sure you have notes for this video.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full border border-[#5d3fd3] rounded-md">
      <div className="flex-1 p-4 overflow-auto">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-400">
            <div className="text-center">
              <Bot size={40} className="mx-auto mb-3" />
              <p>Ask questions about this video to get AI-powered answers</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] p-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-[#b29eff69] text-right"
                      : "bg-gray-100"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-1">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            videoId
              ? "Ask a question about this video..."
              : "Select a video to ask questions"
          }
          disabled={!videoId || isLoading}
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5d3fd3]"
        />
        <button
          type="submit"
          disabled={!videoId || !input.trim() || isLoading}
          className={`py-2 px-3 rounded-md ${
            !videoId || !input.trim() || isLoading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#5d3fd3] hover:bg-[#5d3fd3] text-white"
          }`}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default YtAi;
