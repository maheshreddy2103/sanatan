import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, X, Send, Sparkles, Key, 
  Trash2, ExternalLink, ShieldCheck, ChevronDown, 
  BookOpen, Calendar, MapPin, Compass
} from 'lucide-react';
import { queryLocalVedicBrain, queryGeminiAI } from '../utils/vedicChatbotBrain';

const STARTER_PROMPTS = [
  { label: "Today's Panchang & Rahu Kaal", icon: Calendar, text: "What is today's Panchang and Rahu Kaal?" },
  { label: "6.5L+ Temples in India", icon: MapPin, text: "Tell me about the Temples of India map portal" },
  { label: "Maha Mrityunjaya Mantra", icon: Compass, text: "Explain Maha Mrityunjaya Mantra and its meaning" },
  { label: "Ekadashi Vrat Rules", icon: BookOpen, text: "What are the fasting rules for Ekadashi?" },
  { label: "Who is Adi Shankaracharya?", icon: Sparkles, text: "Who was Adi Shankaracharya and what is Advaita?" },
  { label: "How to find inner peace?", icon: Sparkles, text: "What does Sanatan Dharma teach about finding inner peace and handling stress?" },
];

export default function SanatanMitrChatbot({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem('sanatan_mitr_msgs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'welcome',
        sender: 'bot',
        text: `ॐ नमो नारायणाय! Pranam! I am **Sanatan Mitr (सनातन मित्र)**, your Vedic Spiritual Companion.\n\nI can instantly answer questions about **6.5 Lakh+ Temples**, **Today's Panchang & Rahu Kaal**, **Mantras**, **Deities**, **Gurus & Rishis**, and **Sacred Scriptures**.\n\nYou can also connect your free **Google Gemini API** for deep open-ended philosophical guidance. How may I serve your spiritual journey today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState('');
  const messagesEndRef = useRef(null);

  // Sync session messages
  useEffect(() => {
    sessionStorage.setItem('sanatan_mitr_msgs', JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSaveKey = () => {
    const trimmed = tempKey.trim();
    setApiKey(trimmed);
    if (trimmed) {
      localStorage.setItem('gemini_api_key', trimmed);
    } else {
      localStorage.removeItem('gemini_api_key');
    }
    setShowKeyModal(false);
  };

  const handleClearHistory = () => {
    const reset = [
      {
        id: 'welcome-' + Date.now(),
        sender: 'bot',
        text: `ॐ Shanti! Conversation cleared. How may I assist your spiritual inquiry today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setMessages(reset);
    sessionStorage.removeItem('sanatan_mitr_msgs');
  };

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setInput('');

    const userMsg = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Step 1: Query Local Brain (Layer 1)
      const localResult = queryLocalVedicBrain(query);

      if (localResult) {
        // Instant local response found!
        const botMsg = {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: localResult.text,
          action: localResult.action,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        // Step 2: Open-ended question - Check Gemini API (Layer 2)
        if (apiKey) {
          try {
            const aiReply = await queryGeminiAI(query, apiKey, messages);
            const botMsg = {
              id: 'bot-' + Date.now(),
              sender: 'bot',
              text: aiReply,
              source: 'gemini',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMsg]);
          } catch (apiErr) {
            console.error('Gemini API Error:', apiErr);
            const errorMsg = {
              id: 'bot-' + Date.now(),
              sender: 'bot',
              text: `⚠️ **Notice from Gemini API:** ${apiErr.message}\n\nPlease verify your Google Gemini API key or continue with our built-in Vedic knowledge base for Temples, Panchang, Mantras, and Scriptures.`,
              needsKey: true,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errorMsg]);
          }
        } else {
          // No API key configured: provide thoughtful spiritual answer + offer Gemini connection
          const generalWisdom = getGeneralVedicWisdom(query);
          const botMsg = {
            id: 'bot-' + Date.now(),
            sender: 'bot',
            text: generalWisdom,
            needsKey: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, botMsg]);
        }
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: 'bot-err-' + Date.now(),
          sender: 'bot',
          text: `Namaste. An unexpected error occurred. Please try asking in another way, or ask about Panchang, Temples, Mantras, or Gurus.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // General Vedic wisdom fallback when no API key is set
  const getGeneralVedicWisdom = (q) => {
    return `🙏 **Wisdom of Sanatan Dharma**\n\n` +
           `"यतो धर्मस्ततो जयः" (*Where there is Dharma, there is Victory.*)\n\n` +
           `Sanatan Dharma teaches that every human experience is an opportunity to cultivate four pillars: **Dharma** (Righteous Living), **Artha** (Honest Prosperity), **Kama** (Righteous Fulfillment), and **Moksha** (Inner Freedom).\n\n` +
           `Whenever facing uncertainty or seeking spiritual clarity:\n` +
           `• Ground yourself in selfless duty (*Karma Yoga*) without attachment to fruits.\n` +
           `• Practice regular Japa or Dhyana during Brahma Muhurta.\n` +
           `• Contemplate the eternal nature of the Self (*Atman*) which transcends temporary changes.\n\n` +
           `💡 *Tip: For personalized, multi-turn AI spiritual counseling on any specific life situation, you can connect your free Google Gemini API key anytime.*`;
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-900/90 text-amber-100 text-xs font-serif border border-amber-500/40 shadow-lg backdrop-blur-md animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>सनातन मित्र • Ask Anything</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Vedic AI Spiritual Guide"
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-amber-700 via-amber-600 to-orange-500 text-amber-50 shadow-2xl shadow-amber-900/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-amber-300/80 group"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-200 group-hover:rotate-90" />
          ) : (
            <>
              <span className="text-2xl font-serif select-none">🕉️</span>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border border-amber-200"></span>
              </span>
            </>
          )}
        </button>
      </div>

      {/* Main Chat Drawer / Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] h-[580px] max-h-[82vh] bg-[#FFFDF8] rounded-2xl shadow-2xl border border-amber-300/80 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 font-sans"
          style={{ boxShadow: '0 20px 50px rgba(120, 53, 15, 0.25)' }}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 text-amber-100 px-4 py-3.5 border-b border-amber-600/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl shadow-inner">
                🕉️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-amber-200 text-sm tracking-wide">
                    Sanatan Mitr <span className="text-amber-400 text-xs font-normal">सनातन मित्र</span>
                  </h3>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                    Hybrid AI
                  </span>
                </div>
                <p className="text-[11px] text-amber-300/80">
                  {apiKey ? '✨ Google Gemini AI Connected' : '⚡ Local Vedic Knowledge Active'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setTempKey(apiKey);
                  setShowKeyModal(true);
                }}
                title={apiKey ? "Gemini API Key Configured" : "Add Free Gemini API Key"}
                className={`p-1.5 rounded-lg text-xs transition-colors border ${
                  apiKey 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30' 
                    : 'bg-stone-800/80 text-amber-200/70 border-stone-700 hover:text-amber-200'
                }`}
              >
                <Key className="w-4 h-4" />
              </button>

              <button
                onClick={handleClearHistory}
                title="Clear conversation"
                className="p-1.5 rounded-lg bg-stone-800/80 text-amber-200/70 border border-stone-700 hover:text-amber-200 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg bg-stone-800/80 text-amber-200/70 border border-stone-700 hover:text-amber-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gradient-to-b from-amber-50/40 via-stone-50/20 to-amber-50/50 scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-amber-700 to-amber-800 text-white rounded-br-none'
                      : 'bg-white text-stone-800 border border-amber-200/90 rounded-bl-none shadow-amber-900/5'
                  }`}
                >
                  {/* Message formatted content */}
                  <div className="whitespace-pre-wrap space-y-1">
                    {formatMessageContent(msg.text)}
                  </div>

                  {/* Optional Action Button */}
                  {msg.action && (
                    <div className="mt-2.5 pt-2 border-t border-amber-100 flex justify-end">
                      <button
                        onClick={() => {
                          if (onNavigate) {
                            onNavigate(msg.action.route);
                          } else {
                            window.location.hash = msg.action.route;
                          }
                          setIsOpen(false);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-medium hover:bg-amber-700 transition-all shadow-sm active:scale-95"
                      >
                        <span>{msg.action.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Connect API Key banner */}
                  {msg.needsKey && !apiKey && (
                    <div className="mt-2.5 pt-2 border-t border-amber-200/60">
                      <button
                        onClick={() => {
                          setTempKey(apiKey);
                          setShowKeyModal(true);
                        }}
                        className="w-full text-left p-2 rounded-lg bg-amber-50 border border-amber-300 text-[11px] text-amber-900 flex items-center justify-between hover:bg-amber-100/80 transition-colors"
                      >
                        <span className="flex items-center gap-1.5 font-medium">
                          <Key className="w-3.5 h-3.5 text-amber-700" />
                          <span>Connect Free Google Gemini AI Key</span>
                        </span>
                        <span className="text-[10px] text-amber-700 underline font-semibold">Setup →</span>
                      </button>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-stone-400 mt-1 px-1">
                  {msg.timestamp} {msg.source === 'gemini' && '• Gemini AI'}
                </span>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-stone-500 text-xs bg-white border border-amber-200 rounded-xl px-3 py-2 w-fit shadow-sm">
                <span className="text-sm animate-spin">🕉️</span>
                <span className="italic text-stone-600">Sanatan Mitr is contemplating wisdom...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Prompts Chips */}
          {messages.length <= 3 && (
            <div className="px-3 py-2 bg-amber-50/80 border-t border-amber-200/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {STARTER_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt.text)}
                  className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-stone-700 hover:text-amber-900 border border-amber-300/80 text-[11px] hover:bg-amber-100/60 hover:border-amber-400 transition-all shadow-xs"
                >
                  <prompt.icon className="w-3 h-3 text-amber-700" />
                  <span>{prompt.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-amber-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask about Panchang, Temples, Mantras, Gita..."
              className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-stone-50 border border-amber-300/80 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Google Gemini API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in font-sans">
          <div className="bg-[#FFFDF8] max-w-md w-full rounded-2xl shadow-2xl border border-amber-300 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <h3 className="font-serif font-bold text-amber-950 text-base">
                  Connect Google Gemini AI
                </h3>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              To unlock full conversational AI with **Sanatan Mitr** for deep spiritual questions, connect a free API key from **Google AI Studio**.
            </p>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 space-y-1.5 text-xs text-amber-950">
              <div className="font-semibold flex items-center gap-1.5 text-amber-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Free & Private</span>
              </div>
              <p className="text-[11px] text-stone-600">
                • Google provides a free API key with no credit card required.<br />
                • Your key is saved locally in your own browser's storage and is never sent to our servers.
              </p>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 hover:underline pt-1"
              >
                Get your free API key from Google AI Studio →
              </a>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-700">
                Gemini API Key
              </label>
              <input
                type="password"
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full text-xs font-mono px-3 py-2.5 rounded-xl border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-200">
              {apiKey && (
                <button
                  onClick={() => {
                    setTempKey('');
                    setApiKey('');
                    localStorage.removeItem('gemini_api_key');
                    setShowKeyModal(false);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                >
                  Remove Key
                </button>
              )}
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveKey}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all"
              >
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Simple helper to format basic markdown-style text (bold, quotes)
function formatMessageContent(text) {
  if (!text) return null;
  const lines = text.split('\n');

  return lines.map((line, idx) => {
    // Quote lines
    if (line.startsWith('>')) {
      return (
        <blockquote key={idx} className="border-l-2 border-amber-500 pl-2 italic text-stone-700 my-1 bg-amber-50/40 py-0.5 rounded-r">
          {renderFormattedInline(line.replace(/^>\s*/, ''))}
        </blockquote>
      );
    }

    // Bullet lines
    if (line.startsWith('•') || line.startsWith('-')) {
      return (
        <div key={idx} className="flex items-start gap-1.5 pl-1 my-0.5">
          <span className="text-amber-600 font-bold">•</span>
          <span className="flex-1">{renderFormattedInline(line.replace(/^[•-]\s*/, ''))}</span>
        </div>
      );
    }

    // Regular line
    return (
      <p key={idx} className="my-0.5 min-h-[1em]">
        {renderFormattedInline(line)}
      </p>
    );
  });
}

function renderFormattedInline(str) {
  // Bold matches: **text**
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-amber-950">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
