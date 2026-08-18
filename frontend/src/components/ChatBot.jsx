import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { X, Send, Bot, Sparkles, Utensils, Zap } from 'lucide-react';

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hey foodie! 👋 Looking for something delicious today? Ask me for recommendations or quick bites!'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Quick chips for faster UX
  const quickPrompts = [
    '🍔 Best Burgers',
    '🍕 Spicy Pizzas',
    '💳 Payment Methods',
    '🚀 Track Order'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const executeSend = async (userText) => {
    if (!userText.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: userText
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const response = await axios.post(`${backendUrl}/api/chat/message`, {
        message: userText,
        chatHistory: messages.slice(-5)
      });

      if (response.data?.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: response.data.reply
          }
        ]);
      } else {
        throw new Error(response.data?.message || 'Failed response');
      }
    } catch (error) {
      console.error('Chat API Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: "Oops! Couldn't reach the food server. Please verify backend connectivity! 🍔⚡"
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    executeSend(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans antialiased">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 px-5 py-3.5 bg-neutral-900 hover:bg-orange-500 text-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-105 active:scale-95 border border-white/10"
          aria-label="Open AI Concierge"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-orange-400 group-hover:text-white transition-colors" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
          </div>
          <span className="text-xs font-semibold tracking-wide uppercase">AI Assistant</span>
        </button>
      )}

      {/* Main Chat Drawer / Window */}
      {isOpen && (
        <div className="w-[370px] sm:w-[400px] h-[540px] bg-white/95 backdrop-blur-xl rounded-[28px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border border-neutral-200/80 flex flex-col overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200">
          
          {/* Top Bar */}
          <div className="px-5 py-4 bg-white/80 backdrop-blur-md border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100/60 shadow-sm">
                <Utensils className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 text-sm tracking-tight flex items-center gap-1.5">
                  UrbanEats Concierge
                  <Zap className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                </h3>
                <p className="text-[11px] text-neutral-500 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100"></span>
                  Llama-3 Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Conversation Feed */}
          <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3.5 bg-neutral-50/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mb-0.5 border border-orange-200/50">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed tracking-tight ${
                    msg.sender === 'user'
                      ? 'bg-orange-500 text-white rounded-br-xs shadow-sm font-medium'
                      : 'bg-white border border-neutral-200/70 text-neutral-800 rounded-bl-xs shadow-[0_2px_8px_rgba(0,0,0,0.02)]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Pulsing AI Typing Bubble */}
            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white border border-neutral-200/70 px-3.5 py-3 rounded-2xl w-16 shadow-sm">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="px-4 py-2 bg-white/60 backdrop-blur-xs border-t border-neutral-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => executeSend(chip)}
                disabled={isTyping}
                className="text-[11px] whitespace-nowrap font-medium px-3 py-1 bg-neutral-100 hover:bg-orange-50 hover:text-orange-600 text-neutral-600 rounded-full border border-neutral-200/60 transition-all cursor-pointer shrink-0 disabled:opacity-50"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3.5 bg-white border-t border-neutral-100 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about dishes, deals, delivery..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-[13px] bg-neutral-100/70 border border-neutral-200/60 rounded-xl text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-9 h-9 flex items-center justify-center bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-200 text-white rounded-xl shadow-md transition-all cursor-pointer shrink-0 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};