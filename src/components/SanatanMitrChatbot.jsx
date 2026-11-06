import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Send, Sparkles, Key, 
  Trash2, ExternalLink, ShieldCheck,
  BookOpen, Calendar, MapPin, Compass,
  PanelLeft, PanelLeftClose, MessageSquare, 
  Plus, Clock, ChevronLeft
} from 'lucide-react';
import { queryLocalVedicBrain, queryGeminiAI, queryUniversalVedicAI, getDeepOfflineVedicAnswer, DEFAULT_AI_KEY } from '../utils/vedicChatbotBrain';

const STARTER_PROMPTS = [
  { label: "Today's Panchang & Rahu Kaal", icon: Calendar, text: "What is today's Panchang and Rahu Kaal?" },
  { label: "Why Bhishma chose bed of arrows?", icon: Sparkles, text: "Why did Bhishma choose the bed of arrows?" },
  { label: "6.5L+ Temples in India", icon: MapPin, text: "Tell me about the Temples of India map portal" },
  { label: "Maha Mrityunjaya Mantra", icon: Compass, text: "Explain Maha Mrityunjaya Mantra and its meaning" },
  { label: "Overcoming Anxiety (Gita)", icon: BookOpen, text: "What does Bhagavad Gita teach about overcoming anxiety and overthinking?" },
  { label: "Essential items for Durga Mala", icon: Sparkles, text: "What are essential things for durga mala?" },
];

const DEFAULT_WELCOME_TEXT = `ॐ नमो नारायणाय! Pranam! I am **Sanatan Mitr (सनातन मित्र)**, your Universal Vedic Spiritual Companion.\n\nAsk me **ANY PRASHNA (प्रश्न)** on Sanatan Dharma, life dilemmas, scriptures, rituals, or meditation!\n\nI can also instantly provide **Today's Panchang & Rahu Kaal**, details on **6.5 Lakh+ Temples**, and sacred **Mantras**. How may I guide you today?`;

function createNewSession(customTitle) {
  return {
    id: 'chat-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    title: customTitle || 'New Spiritual Inquiry',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    messages: [
      {
        id: 'welcome-' + Date.now(),
        sender: 'bot',
        text: DEFAULT_WELCOME_TEXT,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]
  };
}

function generateChatTitle(query) {
  const cleaned = query.replace(/[?.,!]/g, '').trim();
  if (!cleaned) return 'Spiritual Inquiry';
  if (cleaned.length <= 30) {
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  return cleaned.slice(0, 28).trim() + '...';
}

function formatSessionDate(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export default function SanatanMitrChatbot({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 680);

  // Load chat sessions from localStorage (with fallback migration from old sessionStorage)
  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem('sanatan_mitr_chat_sessions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      // Migrate from old single-session storage if present
      const oldSessionMsgs = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('sanatan_mitr_msgs');
      if (oldSessionMsgs) {
        const msgs = JSON.parse(oldSessionMsgs);
        if (Array.isArray(msgs) && msgs.length > 0) {
          const firstUserMsg = msgs.find(m => m.sender === 'user');
          const title = firstUserMsg ? generateChatTitle(firstUserMsg.text) : 'Previous Inquiry';
          return [{
            id: 'chat-migrated-' + Date.now(),
            title,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            messages: msgs
          }];
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved chat sessions:', e);
    }
    return [createNewSession()];
  });

  const [activeSessionId, setActiveSessionId] = useState(() => {
    const savedActive = localStorage.getItem('sanatan_mitr_active_session_id');
    return savedActive || (sessions[0]?.id ?? '');
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('vedic_ai_key') || 
      localStorage.getItem('gemini_api_key') || 
      (typeof import.meta !== 'undefined' && (import.meta.env?.VITE_AI_API_KEY || import.meta.env?.VITE_OPENROUTER_API_KEY || import.meta.env?.VITE_GEMINI_API_KEY)) || 
      DEFAULT_AI_KEY || 
      '';
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Resize listener for mobile/desktop layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 680);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Save sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sanatan_mitr_chat_sessions', JSON.stringify(sessions));
    } catch (e) {
      console.warn('Failed to save chat sessions:', e);
    }
  }, [sessions]);

  // Save active session ID to localStorage
  useEffect(() => {
    if (activeSessionId) {
      localStorage.setItem('sanatan_mitr_active_session_id', activeSessionId);
    }
  }, [activeSessionId]);

  // Ensure active session is valid
  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0] || null;
  const currentMessages = activeSession ? activeSession.messages : [];

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [currentMessages, isOpen, isLoading, activeSessionId]);

  const handleNewChat = () => {
    const fresh = createNewSession();
    setSessions(prev => [fresh, ...prev]);
    setActiveSessionId(fresh.id);
    setInput('');
    if (isMobile) {
      setIsSidebarOpen(false);
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  };

  const handleSelectSession = (sessionId) => {
    setActiveSessionId(sessionId);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleDeleteSession = (e, sessionId) => {
    e.stopPropagation();
    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== sessionId);
      if (filtered.length === 0) {
        const fresh = createNewSession();
        setActiveSessionId(fresh.id);
        return [fresh];
      }
      if (activeSessionId === sessionId) {
        setActiveSessionId(filtered[0].id);
      }
      return filtered;
    });
  };

  const handleClearAllHistory = () => {
    if (window.confirm('Clear all saved chat conversations? This cannot be undone.')) {
      const fresh = createNewSession();
      setSessions([fresh]);
      setActiveSessionId(fresh.id);
      localStorage.removeItem('sanatan_mitr_chat_sessions');
      if (isMobile) {
        setIsSidebarOpen(false);
      }
    }
  };

  const handleClearCurrentChat = () => {
    if (!activeSession) return;
    const resetMessage = {
      id: 'welcome-' + Date.now(),
      sender: 'bot',
      text: `ॐ Shanti! Conversation cleared. How may I assist your spiritual inquiry today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSessions(prev => prev.map(s => {
      if (s.id === activeSession.id) {
        return {
          ...s,
          title: 'New Spiritual Inquiry',
          updatedAt: Date.now(),
          messages: [resetMessage]
        };
      }
      return s;
    }));
  };

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

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading || !activeSession) return;

    const targetSessionId = activeSession.id;
    setInput('');

    const userMsg = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Check if we should update the session title from the first question
    const hadNoUserMessages = !activeSession.messages.some(m => m.sender === 'user');
    const updatedTitle = hadNoUserMessages ? generateChatTitle(query) : activeSession.title;

    // Immediately append user message
    setSessions(prev => prev.map(s => {
      if (s.id === targetSessionId) {
        return {
          ...s,
          title: updatedTitle,
          updatedAt: Date.now(),
          messages: [...s.messages, userMsg]
        };
      }
      return s;
    }));

    setIsLoading(true);

    try {
      // Step 1: Query Local High-Precision Catalog (Panchang, Temples, Mantras, Festivals)
      const localResult = queryLocalVedicBrain(query);

      if (localResult && localResult.text) {
        const botMsg = {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: localResult.text,
          action: localResult.action,
          source: 'local',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setSessions(prev => prev.map(s => {
          if (s.id === targetSessionId) {
            return {
              ...s,
              updatedAt: Date.now(),
              messages: [...s.messages, botMsg]
            };
          }
          return s;
        }));
      } else {
        // Step 2: Open-ended Prashna - Universal Multi-tier Vedic AI (OpenRouter, Gemini, or Free AI)
        const aiResponse = await queryUniversalVedicAI(query, apiKey, activeSession.messages);
        const botMsg = {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: (aiResponse && aiResponse.text) ? aiResponse.text : getDeepOfflineVedicAnswer(query),
          source: aiResponse?.source || 'offline_wisdom',
          needsKey: aiResponse?.needsKey || false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setSessions(prev => prev.map(s => {
          if (s.id === targetSessionId) {
            return {
              ...s,
              updatedAt: Date.now(),
              messages: [...s.messages, botMsg]
            };
          }
          return s;
        }));
      }
    } catch (err) {
      console.error('Chatbot error:', err);
      const errMsg = {
        id: 'bot-err-' + Date.now(),
        sender: 'bot',
        text: `Namaste. I am meditating upon your prashna. Please rephrase or ask about scriptures, temples, mantras, or panchang.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSessions(prev => prev.map(s => {
        if (s.id === targetSessionId) {
          return {
            ...s,
            updatedAt: Date.now(),
            messages: [...s.messages, errMsg]
          };
        }
        return s;
      }));
    } finally {
      setIsLoading(false);
    }
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

      {/* Main Chat Drawer / Window with Expandable Sidebar */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            bottom: isMobile ? '80px' : '96px',
            right: isMobile ? '10px' : '24px',
            zIndex: 9999,
            width: isSidebarOpen 
              ? (isMobile ? 'calc(100vw - 20px)' : 'min(860px, calc(100vw - 32px))')
              : (isMobile ? 'calc(100vw - 20px)' : 'min(480px, calc(100vw - 32px))'),
            height: isSidebarOpen 
              ? (isMobile ? 'calc(100vh - 100px)' : 'min(660px, calc(100vh - 110px))')
              : (isMobile ? 'calc(100vh - 100px)' : 'min(620px, calc(100vh - 120px))'),
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            borderRadius: '20px',
            border: '1px solid var(--border-strong)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
            fontFamily: 'var(--font-body)',
            transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* ======================================================== */}
          {/* SIDEBAR: Previous Chats & "+ New Chat" (Expandable Drawer) */}
          {/* ======================================================== */}
          {isSidebarOpen && (
            <div style={{
              width: isMobile ? '100%' : '270px',
              minWidth: isMobile ? '100%' : '270px',
              maxWidth: isMobile ? '100%' : '270px',
              backgroundColor: 'var(--bg-secondary)',
              borderRight: isMobile ? 'none' : '1px solid var(--border-light)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 30,
              position: isMobile ? 'absolute' : 'relative',
              inset: isMobile ? 0 : 'auto',
              height: '100%'
            }}>
              {/* Sidebar Header */}
              <div style={{
                padding: '14px 16px',
                borderBottom: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(0, 0, 0, 0.04)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock style={{ width: '16px', height: '16px', color: 'var(--accent-saffron)' }} />
                  <span style={{
                    fontWeight: '700',
                    fontSize: '13.5px',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--text-primary)'
                  }}>
                    Chat History
                  </span>
                  <span style={{
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--accent-gold-light)',
                    color: 'var(--accent-gold)',
                    fontWeight: 'bold',
                    border: '1px solid var(--border-light)'
                  }}>
                    {sessions.length}
                  </span>
                </div>

                <button
                  onClick={() => setIsSidebarOpen(false)}
                  title="Close sidebar"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px'
                  }}
                >
                  {isMobile ? (
                    <ChevronLeft style={{ width: '18px', height: '18px' }} />
                  ) : (
                    <PanelLeftClose style={{ width: '17px', height: '17px' }} />
                  )}
                </button>
              </div>

              {/* "+ New Chat" Button */}
              <div style={{ padding: '12px 14px' }}>
                <button
                  onClick={handleNewChat}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #d9531e 0%, #c69214 100%)',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'opacity 0.2s ease, transform 0.15s ease'
                  }}
                >
                  <Plus style={{ width: '17px', height: '17px', strokeWidth: 2.5 }} />
                  <span>+ New Prashna</span>
                </button>
              </div>

              {/* Sessions List */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '4px 10px 12px 10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                {sessions.map((sess) => {
                  const isActive = sess.id === activeSessionId;
                  return (
                    <div
                      key={sess.id}
                      onClick={() => handleSelectSession(sess.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '9px 12px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        backgroundColor: isActive ? 'var(--bg-card)' : 'transparent',
                        border: isActive ? '1px solid var(--accent-gold)' : '1px solid transparent',
                        boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                        transition: 'background 0.15s ease, border-color 0.15s ease'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        minWidth: 0,
                        flex: 1
                      }}>
                        <MessageSquare style={{
                          width: '15px',
                          height: '15px',
                          flexShrink: 0,
                          color: isActive ? 'var(--accent-saffron)' : 'var(--text-muted)'
                        }} />
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <p style={{
                            margin: 0,
                            fontSize: '12.5px',
                            fontWeight: isActive ? '600' : '400',
                            color: isActive ? 'var(--accent-saffron)' : 'var(--text-primary)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {sess.title}
                          </p>
                          <span style={{
                            fontSize: '10px',
                            color: 'var(--text-muted)'
                          }}>
                            {formatSessionDate(sess.updatedAt)} • {sess.messages.filter(m => m.sender === 'user').length} msgs
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleDeleteSession(e, sess.id)}
                        title="Delete this conversation"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          padding: '4px',
                          marginLeft: '6px',
                          opacity: isActive ? 0.9 : 0.4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '4px'
                        }}
                      >
                        <Trash2 style={{ width: '13px', height: '13px' }} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Sidebar Footer */}
              <div style={{
                padding: '10px 14px',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: 'var(--text-muted)'
              }}>
                <span>Persistent Storage</span>
                {sessions.length > 1 && (
                  <button
                    onClick={handleClearAllHistory}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#dc2626',
                      fontSize: '11px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      padding: '2px 6px'
                    }}
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* MAIN CHAT PANE: Active Conversation Window                */}
          {/* ======================================================== */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100%',
            backgroundColor: 'var(--bg-primary)'
          }}>
            {/* Header */}
            <div style={{
              padding: '12px 16px',
              background: 'linear-gradient(135deg, #801818 0%, #2b1d15 100%)',
              color: '#fef9e7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(212, 175, 55, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Sidebar Expand / Collapse Toggle Button */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  title={isSidebarOpen ? "Collapse Chat History" : "View Previous Chats / Expand Sidebar"}
                  style={{
                    padding: '7px',
                    borderRadius: '8px',
                    backgroundColor: isSidebarOpen ? 'rgba(212, 175, 55, 0.35)' : 'rgba(255, 255, 255, 0.12)',
                    color: isSidebarOpen ? '#e5b32e' : '#fef9e7',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  <PanelLeft style={{ width: '16px', height: '16px' }} />
                  {sessions.length > 1 && !isSidebarOpen && (
                    <span style={{
                      position: 'absolute',
                      top: '-3px',
                      right: '-3px',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-saffron)',
                      border: '1px solid #801818'
                    }}></span>
                  )}
                </button>

                {/* Quick New Chat Button in Header */}
                <button
                  onClick={handleNewChat}
                  title="Start New Chat"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    color: '#fef9e7',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}
                >
                  <Plus style={{ width: '13px', height: '13px' }} />
                  <span style={{ display: isMobile ? 'none' : 'inline' }}>New Chat</span>
                </button>

                {/* Bot Avatar & Info */}
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  🕉️
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: '700',
                      fontSize: '14.5px',
                      color: '#fef9e7',
                      margin: 0
                    }}>
                      Sanatan Mitr
                    </h3>
                    <span style={{
                      fontSize: '9.5px',
                      fontWeight: '600',
                      padding: '2px 5px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(16, 185, 129, 0.25)',
                      color: '#6ee7b7',
                      border: '1px solid rgba(16, 185, 129, 0.4)'
                    }}>
                      Vedic AI
                    </span>
                  </div>
                  <p style={{
                    fontSize: '10.5px',
                    color: 'rgba(254, 249, 231, 0.75)',
                    margin: '1px 0 0 0',
                    maxWidth: isMobile ? '120px' : '220px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {activeSession?.title || 'Universal Spiritual Guide'}
                  </p>
                </div>
              </div>

              {/* Header Right Actions */}
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
                  onClick={handleClearCurrentChat}
                  title="Clear this conversation"
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
                  title="Close chat window"
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
              {currentMessages.map((msg) => (
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
                  </div>

                  <span style={{
                    fontSize: '10px',
                    color: 'var(--text-muted)',
                    marginTop: '4px',
                    padding: '0 4px'
                  }}>
                    {msg.timestamp} {msg.source === 'openrouter' ? '• Vedic AI' : msg.source === 'gemini' ? '• Gemini AI' : msg.source === 'free_ai' ? '• Vedic AI' : msg.source === 'local' ? '• Local Catalog' : ''}
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
            {currentMessages.length <= 2 && (
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
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                placeholder="Ask any Prashna on scriptures, rituals, dilemmas..."
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
        </div>
      )}

      {/* API Key Modal */}
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
              Sanatan Mitr is pre-configured with high-speed Vedic AI to answer any question! You can also connect your own **OpenRouter Key** or **Google Gemini API Key** for personal usage limits.
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
