import React, { useState } from 'react';
import { Scroll, Search, ArrowRight, Quote } from 'lucide-react';
import { rishisData } from '../data/rishisData';

export default function RishisView({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLetter, setActiveLetter] = useState('ALL');

  // Available first letters
  const letters = ['ALL', ...new Set(rishisData.map(r => r.name[0].toUpperCase()))].sort();

  const filteredRishis = rishisData.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (r.subtitle && r.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (r.introduction && r.introduction.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;
    if (activeLetter !== 'ALL' && !r.name.toUpperCase().startsWith(activeLetter)) return false;
    return true;
  });

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
        <span className="badge badge-saffron" style={{ marginBottom: '10px' }}>
          Seers of the Eternal Mantras
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '14px', color: 'var(--text-primary)' }}>
          Ancient Rishis of Sanatan Dharma
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          The Rishis are the ancient sages who, through profound meditation and severe penance (Tapasya), perceived the eternal vibrations of the universe and revealed the hymns of the Vedas.
        </p>
      </div>

      {/* Search Input & Alphabet Bar */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        padding: '20px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        marginBottom: '32px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          maxWidth: '500px',
          margin: '0 auto 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: 'var(--bg-secondary)',
          padding: '8px 16px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-light)'
        }}>
          <Search size={18} color="var(--accent-gold)" />
          <input
            type="text"
            placeholder="Search across all 48 Rishis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '0.92rem',
              color: 'var(--text-primary)',
              width: '100%',
              fontFamily: 'var(--font-body)'
            }}
          />
        </div>

        {/* Alphabet Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '6px'
        }}>
          {letters.map(letter => (
            <button
              key={letter}
              onClick={() => setActiveLetter(letter)}
              style={{
                width: letter === 'ALL' ? '48px' : '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor: activeLetter === letter ? 'var(--accent-saffron)' : 'var(--border-light)',
                backgroundColor: activeLetter === letter ? 'var(--accent-saffron)' : 'var(--bg-card)',
                color: activeLetter === letter ? '#fff' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Rishis Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {filteredRishis.map((rishi, idx) => (
          <div
            key={rishi.id}
            onClick={() => onNavigate(`#/rishis/${rishi.id}`)}
            className="sanatan-card"
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <img
                  src={rishi.onlineImage || rishi.image}
                  alt={rishi.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--accent-gold)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    flexShrink: 0
                  }}
                  onError={(e) => {
                    if (rishi.image && e.currentTarget.src !== window.location.origin + rishi.image) {
                      e.currentTarget.src = rishi.image;
                    }
                  }}
                />
                <div>
                  <span className="badge badge-gold" style={{ fontSize: '0.68rem', marginBottom: '4px' }}>
                    Maharshi
                  </span>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>
                    {rishi.name}
                  </h3>
                  {rishi.subtitle && (
                    <p style={{ fontSize: '0.78rem', color: 'var(--accent-saffron)', fontWeight: 600, margin: '2px 0 0 0' }}>
                      {rishi.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {rishi.quote ? (
                <p style={{
                  fontSize: '0.85rem',
                  fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  marginBottom: '16px',
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: '3px solid var(--accent-gold)'
                }}>
                  {rishi.quote}
                </p>
              ) : (
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  marginBottom: '16px'
                }}>
                  {rishi.introduction || `Revered sage in Vedic lore and foundational figure in Sanatan traditions.`}
                </p>
              )}
            </div>

            <div style={{
              paddingTop: '10px',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.82rem',
              color: 'var(--accent-saffron)',
              fontWeight: 700
            }}>
              <span>Read Sacred Lore & Teachings</span>
              <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

