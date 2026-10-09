import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  Calendar,
  Compass,
  ArrowRight,
  ShieldCheck,
  Loader2,
  MapPin,
  ExternalLink,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  source?: string;
  provider?: string;
  timestamp: string;
}

export const AIAssistantPage: React.FC = () => {
  const { navigateTo, showToast } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Hello! I am your **Swastik Travels AI Assistant**. 
      
I can help you plan holy temple pilgrimages, waterfalls expeditions, calculate realistic budgets in Indian Rupees (₹), recommend South Indian culinary delights, and find verified hotels.

**How can I help you explore today?**`,
      provider: 'Swastik Tourism AI (Gemini 2.5 Flash Enabled)',
      timestamp: 'Just now',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const suggestedChips = [
    'Plan a 3-day trip to Tirupati.',
    'Best places near Hyderabad?',
    'Plan a family trip under ₹20,000.',
    'What waterfalls can I visit in Andhra Pradesh?',
    'Find attractions near Tirupati.',
    'Create a honeymoon itinerary in Munnar.',
  ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          travelContext: { app: 'Swastik Travels', region: 'India / Tirupati' },
        }),
      });

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'assistant',
        text: data.reply || 'Here is the requested travel plan for your journey.',
        source: data.source,
        provider: data.provider || 'Google Gemini 2.5 Flash',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('AI assistant fetch failed:', err);
      const fallbackMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'assistant',
        text: `### 🌟 Swastik Guide Recommendation\n\nThank you for reaching out! Tirupati, Talakona Waterfalls, and Munnar are ideal destinations for ${textToSend}.\n\nVisit our **Trip Planner** tab to generate day-by-day itineraries and book verified hotels directly!`,
        source: 'local_engine',
        provider: 'Swastik Fallback Engine',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Plan copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>LLM Powered Travel Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
          AI Travel Assistant
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Ask custom queries on holy temple visits, budget estimation in ₹, best seasons, food suggestions, and waterfall treks.
        </p>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {suggestedChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip)}
            className="px-3.5 py-1.5 bg-white hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-xs font-medium rounded-full border border-slate-200/80 shadow-2xs transition-colors cursor-pointer"
          >
            "{chip}"
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[600px]">
        {/* Chat Header Status */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Swastik AI Travel Companion</h3>
              <p className="text-[11px] text-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Connected to Secure Server LLM (Gemini 2.5 Flash)</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setMessages([messages[0]]);
              showToast('Conversation reset', 'info');
            }}
            className="p-1.5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1"
            title="Reset Chat"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-700 text-white shadow-md rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200/80 shadow-2xs rounded-tl-xs space-y-3'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

                {msg.sender === 'assistant' && (
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="italic">{msg.provider || 'Swastik AI'}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        className="hover:text-emerald-700 flex items-center gap-1"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => navigateTo('trip-planner')}
                        className="hover:text-emerald-700 flex items-center gap-1 font-semibold"
                      >
                        <span>Open Planner</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs text-xs text-slate-500 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                <span>Formulating personalized travel recommendation & budget...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything (e.g. Plan a 3-day budget trip to Tirupati for family of 4)..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="p-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl shadow-md transition-colors disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
