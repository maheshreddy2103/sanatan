import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, Users, Scroll, BookOpen, Volume2, Flame, HeartHandshake, Calendar, MapPin, GitFork, Award } from 'lucide-react';
import { getGlobalSearchIndex } from '../data/searchData';

export default function GlobalSearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  const searchIndex = useRef(getGlobalSearchIndex()).current;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setCategoryFilter('All');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    let filtered = searchIndex;

    if (categoryFilter !== 'All') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }

    setResults(filtered.slice(0, 30));
  }, [query, categoryFilter, searchIndex]);

  if (!isOpen) return null;

  const categories = ['All', 'Tirtha', 'Genealogy', 'Quiz', 'Deity', 'Guru', 'Rishi', 'Sacred Text', 'Mantra', 'Practice', 'Belief', 'Festival'];

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Tirtha': return <MapPin size={14} color="#d9531e" />;
      case 'Genealogy': return <GitFork size={14} color="#c69214" />;
      case 'Quiz': return <Award size={14} color="#27ae60" />;
      case 'Deity': return <Sparkles size={14} color="var(--accent-saffron)" />;
      case 'Guru': return <Users size={14} color="var(--accent-gold)" />;
      case 'Rishi': return <Scroll size={14} color="#ad1457" />;
      case 'Sacred Text': return <BookOpen size={14} color="#1565c0" />;
      case 'Mantra': return <Volume2 size={14} color="#2e7d32" />;
      case 'Practice': return <Flame size={14} color="#d84315" />;
      case 'Belief': return <HeartHandshake size={14} color="#6a1b9a" />;
      case 'Festival': return <Calendar size={14} color="#c2185b" />;
      default: return null;
    }
  };

  const handleSelect = (route) => {
    onNavigate(route);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '60px 20px',
      zIndex: 2000
    }} onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-strong)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh',
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <Search size={20} color="var(--accent-gold)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search deities, gurus, rishis, texts, mantras, beliefs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '1.05rem',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)'
            }}
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <X size={18} />
            </button>
          )}
          <button 
            onClick={onClose}
            className="btn btn-outline"
            style={{ padding: '4px 10px', fontSize: '0.78rem' }}
          >
            ESC
          </button>
        </div>

        {/* Category Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '12px 20px',
          backgroundColor: 'var(--bg-secondary)',
          overflowX: 'auto',
          borderBottom: '1px solid var(--border-light)'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid',
                borderColor: categoryFilter === cat ? 'var(--accent-saffron)' : 'var(--border-light)',
                backgroundColor: categoryFilter === cat ? 'var(--accent-saffron)' : 'var(--bg-card)',
                color: categoryFilter === cat ? '#fff' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 20px'
        }}>
          {results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '6px' }}>No sacred entries found</p>
              <p style={{ fontSize: '0.85rem' }}>Try searching by name, deity, rishi, or sacred scripture</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {results.map((item, index) => (
                <div
                  key={`${item.category}-${item.id}-${index}`}
                  onClick={() => handleSelect(item.route)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-light)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                    e.currentTarget.style.borderColor = 'var(--accent-gold)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                  }}
                >
                  <div style={{ flex: 1, paddingRight: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className="badge badge-gold" style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {getCategoryIcon(item.category)}
                        {item.category}
                      </span>
                      <strong style={{ fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                        {item.title}
                      </strong>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {item.subtitle}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-saffron)', fontWeight: 600 }}>
                    View &rarr;
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div style={{
          padding: '10px 20px',
          backgroundColor: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-light)',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>Found {results.length} results</span>
          <span>Click entry or press Enter to navigate</span>
        </div>
      </div>
    </div>
  );
}

