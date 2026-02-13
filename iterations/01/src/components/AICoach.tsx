import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import { sendMessageToCoach } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AICoach: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm your AI Coach. Stuck on a concept? Ask me anything about tokens, temperature, or prompting!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setLoading(true);
    
    const newHistory = [...messages, { role: 'user' as const, text: userMsg }];
    setMessages(newHistory);

    const responseText = await sendMessageToCoach(messages, userMsg);
    
    setMessages([...newHistory, { role: 'model', text: responseText }]);
    setLoading(false);
  };

  return (
    <>
      {/* Trigger Button - Minimalist Floating */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 w-14 h-14 bg-brand-black text-white rounded-full shadow-2xl z-40 transition-all duration-500 hover:scale-110 flex items-center justify-center ${
          isOpen ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <Sparkles size={24} strokeWidth={1.5} />
      </button>

      {/* Sidebar Panel - Clean and Modern */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white shadow-[0_0_50px_rgba(0,0,0,0.2)] transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center">
                <Sparkles size={16} />
              </div>
              <div>
                <h2 className="font-bold text-brand-black text-sm">AI Coach</h2>
                <p className="text-xs text-gray-400">Powered by Gemini 1.5</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 text-gray-400 hover:text-brand-black hover:bg-gray-50 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-brand-black text-white rounded-tr-sm'
                      : 'bg-white text-gray-700 border border-gray-100 rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-2 px-1">
                  {msg.role === 'user' ? 'You' : 'Coach'}
                </span>
              </div>
            ))}
            {loading && (
              <div className="flex items-start">
                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-sm shadow-sm">
                  <Loader2 className="animate-spin text-gray-400" size={18} />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-gray-100">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about the lesson..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-12 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-black/5 focus:border-brand-black transition-all"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="absolute right-2 top-2 p-2 bg-brand-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:bg-gray-300 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};