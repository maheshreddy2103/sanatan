import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Send, Sparkles, Key, 
  Trash2, ExternalLink, ShieldCheck,
  BookOpen, Calendar, MapPin, Compass
} from 'lucide-react';
import { queryLocalVedicBrain, queryGeminiAI, queryUniversalVedicAI } from '../utils/vedicChatbotBrain';

const STARTER_PROMPTS = [
  { label: "Today's Panchang & Rahu Kaal", icon: Calendar, text: "What is today's Panchang and Rahu Kaal?" },
  { label: "Why Bhishma chose bed of arrows?", icon: Sparkles, text: "Why did Bhishma choose the bed of arrows?" },
  { label: "6.5L+ Temples in India", icon: MapPin, text: "Tell me about the Temples of India map portal" },
  { label: "Maha Mrityunjaya Mantra", icon: Compass, text: "Explain Maha Mrityunjaya Mantra and its meaning" },
  { label: "Overcoming Anxiety (Gita)", icon: BookOpen, text: "What does Bhagavad Gita teach about overcoming anxiety and overthinking?" },
  { label: "Who is Adi Shankaracharya?", icon: Sparkles, text: "Who was Adi Shankaracharya and what is Advaita?" },
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
        text: `ॐ नमो नारायणाय! Pranam! I am **Sanatan Mitr (सनातन मित्र)**, your Universal Vedic Spiritual Companion.\n\nAsk me **ANY PRASHNA (प्रश्न)** on Sanatan Dharma, life dilemmas, scriptures, rituals, or meditation!\n\nI can also instantly provide **Today's Panchang & Rahu Kaal**, details on **6.5 Lakh+ Temples**, and sacred **Mantras**. How may I guide you today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('vedic_ai_key') || 
      localStorage.getItem('gemini_api_key') || 
      (typeof import.meta !== 'undefined' && (import.meta.env?.VITE_AI_API_KEY || import.meta.env?.VITE_OPENROUTER_API_KEY || import.meta.env?.VITE_GEMINI_API_KEY)) || 
      '';
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState('');
  const [isHovered, setIsHovered] = useState(false);
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
      localStorage.setItem('vedic_ai_key', trimmed);
      localStorage.setItem('gemini_api_key', trimmed);
    } else {
      localStorage.removeItem('vedic_ai_key');
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
      // Step 1: Query Local High-Precision Catalog (Panchang, Temples, Mantras, Festivals)
      const localResult = queryLocalVedicBrain(query);

      if (localResult) {
        const botMsg = {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: localResult.text,
          action: localResult.action,
          source: 'local',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        // Step 2: Open-ended Prashna - Universal Multi-tier Vedic AI (OpenRouter, Gemini, or Free AI)
        const aiResponse = await queryUniversalVedicAI(query, apiKey, messages);
        const botMsg = {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: aiResponse.text,
          source: aiResponse.source, // 'openrouter' | 'gemini' | 'free_ai' | 'offline_wisdom'
          needsKey: aiResponse.needsKey,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      }
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: 'bot-err-' + Date.now(),
          sender: 'bot',
          text: `Namaste. I am meditating upon your prashna. Please rephrase or ask about scriptures, temples, mantras, or panchang.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

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
      <div 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '9999px',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: 'var(--font-heading)',
              border: '1px solid var(--border-strong)',
              boxShadow: 'var(--shadow-md)',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'inline-block'
            }}></span>
            <span>सनातन मित्र • Ask Anything</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Open Vedic AI Spiritual Guide"
          style={{
            position: 'relative',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #d9531e 0%, #c69214 100%)',
            color: '#ffffff',
            boxShadow: isHovered 
              ? '0 12px 30px rgba(217, 83, 30, 0.55)' 
              : '0 8px 24px rgba(217, 83, 30, 0.4)',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(255, 230, 160, 0.85)',
            cursor: 'pointer',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            outline: 'none',
            fontSize: '26px'
          }}
        >
          {isOpen ? (
            <X style={{ width: '26px', height: '26px', strokeWidth: 2.5 }} />
          ) : (
            <span>🕉️</span>
          )}
        </button>
      </div>

      {/* Main Chat Drawer / Window */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            bottom: '96px',
            right: '24px',
            zIndex: 9999,
            width: 'min(460px, calc(100vw - 32px))',
            height: 'min(620px, calc(100vh - 120px))',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            borderRadius: '20px',
            border: '1px solid var(--border-strong)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'var(--font-body)'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '14px 18px',
            background: 'linear-gradient(135deg, #801818 0%, #2b1d15 100%)',
            color: '#fef9e7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(212, 175, 55, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                backgroundColor: 'rgba(212, 175, 55, 0.2)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                🕉️
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '700',
                    fontSize: '15px',
                    color: '#fef9e7',
                    margin: 0
                  }}>
                    Sanatan Mitr <span style={{ color: '#e5b32e', fontSize: '12px', fontWeight: 'normal' }}>सनातन मित्र</span>
                  </h3>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '600',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(16, 185, 129, 0.25)',
                    color: '#6ee7b7',
                    border: '1px solid rgba(16, 185, 129, 0.4)'
                  }}>
                    Hybrid
                  </span>
                </div>
                <p style={{
                  fontSize: '11px',
                  color: 'rgba(254, 249, 231, 0.75)',
                  margin: '2px 0 0 0'
                }}>
                  {apiKey 
                    ? (apiKey.startsWith('sk-') ? '✨ OpenRouter AI Connected (DeepSeek)' : '✨ Gemini AI Connected') 
                    : '🕉️ Universal Vedic AI Active'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={() => {
                  setTempKey(apiKey);
                  setShowKeyModal(true);
                }}
                title={apiKey ? "AI API Key Configured" : "Configure AI API Key"}
                style={{
                  padding: '7px',
                  borderRadius: '8px',
                  backgroundColor: apiKey ? 'rgba(212, 175, 55, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                  color: apiKey ? '#e5b32e' : '#fef9e7',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Key style={{ width: '15px', height: '15px' }} />
              </button>

              <button
                onClick={handleClearHistory}
                title="Clear conversation"
                style={{
                  padding: '7px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#fef9e7',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Trash2 style={{ width: '15px', height: '15px' }} />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                style={{
                  padding: '7px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#fef9e7',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X style={{ width: '15px', height: '15px' }} />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backgroundColor: 'var(--bg-primary)'
          }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '88%',
                    borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                    padding: '12px 16px',
                    fontSize: '13.5px',
                    lineHeight: '1.6',
                    background: msg.sender === 'user'
                      ? 'linear-gradient(135deg, #d9531e 0%, #b84314 100%)'
                      : 'var(--bg-card)',
                    color: msg.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
                    border: msg.sender === 'user' ? 'none' : '1px solid var(--border-light)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {/* Message formatted content */}
                  <div style={{ whiteSpace: 'pre-wrap' }}>
                    {formatMessageContent(msg.text)}
                  </div>

                  {/* Optional Action Button */}
                  {msg.action && (
                    <div style={{
                      marginTop: '10px',
                      paddingTop: '8px',
                      borderTop: '1px solid var(--border-light)',
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}>
                      <button
                        onClick={() => {
                          if (onNavigate) {
                            onNavigate(msg.action.route);
                          } else {
                            window.location.hash = msg.action.route;
                          }
                          setIsOpen(false);
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          backgroundColor: 'var(--accent-saffron)',
                          color: '#ffffff',
                          fontSize: '12px',
                          fontWeight: '600',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        <span>{msg.action.label}</span>
                        <ExternalLink style={{ width: '13px', height: '13px' }} />
                      </button>
                    </div>
                  )}

                  {/* Connect API Key banner */}
                  {msg.needsKey && !apiKey && (
                    <div style={{
                      marginTop: '10px',
                      paddingTop: '8px',
                      borderTop: '1px solid var(--border-light)'
                    }}>
                      <button
                        onClick={() => {
                          setTempKey(apiKey);
                          setShowKeyModal(true);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '8px 12px',
                          borderRadius: '10px',
                          backgroundColor: 'var(--accent-gold-light)',
                          border: '1px solid var(--border-strong)',
                          fontSize: '11px',
                          color: 'var(--text-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                          <Key style={{ width: '14px', height: '14px', color: 'var(--accent-saffron)' }} />
                          <span>Connect Free Google Gemini AI Key</span>
                        </span>
                        <span style={{ color: 'var(--accent-saffron)', fontWeight: '700' }}>Setup →</span>
                      </button>
                    </div>
                  )}
                </div>

                <span style={{
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                  marginTop: '4px',
                  padding: '0 4px'
                }}>
                  {msg.timestamp} {msg.source === 'openrouter' ? '• Vedic AI (DeepSeek)' : msg.source === 'gemini' ? '• Gemini AI' : msg.source === 'free_ai' ? '• Vedic AI' : msg.source === 'local' ? '• Local Catalog' : ''}
                </span>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-muted)',
                fontSize: '12px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                borderRadius: '12px',
                padding: '8px 14px',
                width: 'fit-content',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <span style={{ fontSize: '15px' }}>🕉️</span>
                <span style={{ fontStyle: 'italic' }}>Sanatan Mitr is contemplating wisdom...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Prompts Chips */}
          {messages.length <= 3 && (
            <div style={{
              padding: '8px 12px',
              backgroundColor: 'var(--bg-secondary)',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              overflowX: 'auto',
              whiteSpace: 'nowrap'
            }}>
              {STARTER_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt.text)}
                  style={{
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '5px 12px',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-light)',
                    fontSize: '11px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <prompt.icon style={{ width: '12px', height: '12px', color: 'var(--accent-saffron)' }} />
                  <span>{prompt.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div style={{
            padding: '12px 16px',
            backgroundColor: 'var(--bg-card)',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask about Panchang, Temples, Mantras, Gita..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-primary)',
                fontSize: '13.5px',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              style={{
                padding: '10px 16px',
                borderRadius: '12px',
                background: (!input.trim() || isLoading)
                  ? 'var(--text-muted)'
                  : 'linear-gradient(135deg, #d9531e 0%, #c69214 100%)',
                color: '#ffffff',
                border: 'none',
                cursor: (!input.trim() || isLoading) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Send style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </div>
      )}

      {/* Google Gemini API Key Modal */}
      {showKeyModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            maxWidth: '460px',
            width: '100%',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            borderRadius: '20px',
            border: '1px solid var(--border-strong)',
            padding: '24px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            fontFamily: 'var(--font-body)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border-light)',
              paddingBottom: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '22px' }}>✨</span>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '700',
                  fontSize: '17px',
                  margin: 0
                }}>
                  Connect Vedic AI (OpenRouter / Gemini)
                </h3>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            <p style={{ fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
              Sanatan Mitr is already configured with AI to answer any question! You can also connect your own **OpenRouter Key** (supports DeepSeek / Claude) or **Google Gemini API Key** for private rate limits.
            </p>

            <div style={{
              padding: '14px',
              borderRadius: '12px',
              backgroundColor: 'var(--accent-gold-light)',
              border: '1px solid var(--border-strong)',
              fontSize: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-saffron)' }}>
                <ShieldCheck style={{ width: '16px', height: '16px', color: '#10b981' }} />
                <span>Private & Secure Local Storage</span>
              </div>
              <p style={{ margin: 0, lineHeight: '1.5', color: 'var(--text-secondary)' }}>
                • Supports <strong>OpenRouter API Keys</strong> (<code>sk-or-v1-...</code>) or <strong>Google Gemini API Keys</strong> (<code>AIzaSy...</code>).<br />
                • Your key is saved strictly in your own browser's local storage and never shared.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600' }}>
                OpenRouter or Gemini API Key
              </label>
              <input
                type="password"
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                placeholder="sk-or-v1-... or AIzaSy..."
                style={{
                  width: '100%',
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-strong)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '8px',
              paddingTop: '8px',
              borderTop: '1px solid var(--border-light)'
            }}>
              {apiKey && (
                <button
                  onClick={() => {
                    setTempKey('');
                    setApiKey('');
                    localStorage.removeItem('vedic_ai_key');
                    localStorage.removeItem('gemini_api_key');
                    setShowKeyModal(false);
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#dc2626',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    cursor: 'pointer'
                  }}
                >
                  Remove Key
                </button>
              )}
              <button
                onClick={() => setShowKeyModal(false)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-light)',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveKey}
                style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#ffffff',
                  background: 'linear-gradient(135deg, #d9531e 0%, #c69214 100%)',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)'
                }}
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
        <blockquote key={idx} style={{
          borderLeft: '3px solid var(--accent-gold)',
          paddingLeft: '10px',
          fontStyle: 'italic',
          margin: '6px 0',
          backgroundColor: 'var(--accent-gold-light)',
          padding: '4px 10px',
          borderRadius: '0 8px 8px 0'
        }}>
          {renderFormattedInline(line.replace(/^>\s*/, ''))}
        </blockquote>
      );
    }

    // Bullet lines
    if (line.startsWith('•') || line.startsWith('-')) {
      return (
        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', margin: '3px 0' }}>
          <span style={{ color: 'var(--accent-saffron)', fontWeight: 'bold' }}>•</span>
          <span style={{ flex: 1 }}>{renderFormattedInline(line.replace(/^[•-]\s*/, ''))}</span>
        </div>
      );
    }

    // Regular line
    return (
      <p key={idx} style={{ margin: '3px 0', minHeight: '1em' }}>
        {renderFormattedInline(line)}
      </p>
    );
  });
}

function renderFormattedInline(str) {
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ fontWeight: '700', color: 'var(--accent-saffron)' }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
