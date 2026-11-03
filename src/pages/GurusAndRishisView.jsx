import React, { useState, useEffect } from 'react';
import { Users, Scroll, Search, ArrowRight, BookOpen, Quote } from 'lucide-react';
import { gurusData } from '../data/gurusData';
import { rishisData } from '../data/rishisData';

export default function GurusAndRishisView({ initialTab = 'rishis', onNavigate }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'rishis' | 'gurus'

  // Rishis filters
  const [rishiSearch, setRishiSearch] = useState('');
  const [activeLetter, setActiveLetter] = useState('ALL');

  // Gurus filters
  const [guruSearch, setGuruSearch] = useState('');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Letters for Rishis A-Z
  const letters = ['ALL', ...new Set(rishisData.map(r => r.name[0].toUpperCase()))].sort();

  const filteredRishis = rishisData.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(rishiSearch.toLowerCase()) ||
                          (r.subtitle && r.subtitle.toLowerCase().includes(rishiSearch.toLowerCase())) ||
                          (r.introduction && r.introduction.toLowerCase().includes(rishiSearch.toLowerCase()));
    if (!matchesSearch) return false;
    if (activeLetter !== 'ALL' && !r.name.toUpperCase().startsWith(activeLetter)) return false;
    return true;
  });

  const filteredGurus = gurusData.filter(g => 
    g.name.toLowerCase().includes(guruSearch.toLowerCase()) ||
    g.summary.toLowerCase().includes(guruSearch.toLowerCase()) ||
    (g.years && g.years.includes(guruSearch))
  );

  return (
    <div className="container animate-fade-in" style={{ padding: '36px 20px', maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 28px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '10px' }}>
          Seers & Spiritual Masters • आचार्याः महर्षयश्च
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '12px', color: 'var(--text-primary)' }}>
          Gurus & Rishis of Sanatan Dharma
        </h1>
        <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          From the ancient <strong>Vedic Rishis</strong> who perceived the cosmic hymns through deep tapasya, 
          to the revered <strong>Gurus & Acharyas</strong> who revived, commented upon, and preserved Vedic wisdom across the millennia.
        </p>
      </div>

      {/* Main Tab Switcher */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '32px'
      }}>
        <button
          onClick={() => setActiveTab('rishis')}
          className={activeTab === 'rishis' ? 'btn btn-primary' : 'btn btn-outline'}
          style={{ padding: '12px 28px', fontSize: '0.96rem', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Scroll size={18} />
          <span>Ancient Rishis ({rishisData.length} Sages)</span>
        </button>

        <button
          onClick={() => setActiveTab('gurus')}
          className={activeTab === 'gurus' ? 'btn btn-gold' : 'btn btn-outline'}
          style={{ padding: '12px 28px', fontSize: '0.96rem', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Users size={18} />
          <span>Revered Gurus ({gurusData.length} Acharyas)</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: ANCIENT RISHIS */}
      {/* ======================================================== */}
      {activeTab === 'rishis' && (
        <div>
          {/* Search & Alphabet Bar */}
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
                value={rishiSearch}
                onChange={(e) => setRishiSearch(e.target.value)}
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
            {filteredRishis.map((rishi) => (
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
      )}

      {/* ======================================================== */}
      {/* TAB 2: REVERED GURUS */}
      {/* ======================================================== */}
      {activeTab === 'gurus' && (
        <div>
          {/* Search Input */}
          <div style={{
            maxWidth: '540px',
            margin: '0 auto 36px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'var(--bg-card)',
            padding: '10px 16px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-strong)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Search size={18} color="var(--accent-gold)" />
            <input
              type="text"
              placeholder="Search by Guru name, era, or tradition..."
              value={guruSearch}
              onChange={(e) => setGuruSearch(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                width: '100%',
                fontFamily: 'var(--font-body)'
              }}
            />
          </div>

          {/* Gurus Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {filteredGurus.map((guru, idx) => (
              <div
                key={guru.id}
                onClick={() => onNavigate(`#/gurus/${guru.id}`)}
                className="sanatan-card"
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  {(guru.image || guru.onlineImage) ? (
                    <img
                      src={guru.image || guru.onlineImage}
                      alt={guru.name}
                      style={{
                        width: '74px',
                        height: '74px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid var(--accent-gold)',
                        boxShadow: 'var(--shadow-sm)',
                        flexShrink: 0
                      }}
                      onError={(e) => {
                        if (guru.onlineImage && e.currentTarget.src !== guru.onlineImage) {
                          e.currentTarget.src = guru.onlineImage;
                        }
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Users size={32} color="var(--accent-gold)" />
                    </div>
                  )}

                  <div>
                    <span className="badge badge-gold" style={{ fontSize: '0.72rem', marginBottom: '4px' }}>
                      #{idx + 1} Acharya
                    </span>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                      {guru.name}
                    </h3>
                    {guru.years && (
                      <span style={{ fontSize: '0.82rem', color: 'var(--accent-saffron)', fontWeight: 600 }}>
                        {guru.years}
                      </span>
                    )}
                  </div>
                </div>

                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  flex: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  marginBottom: '16px'
                }}>
                  {guru.summary}
                </p>

                <div style={{
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.85rem',
                  color: 'var(--accent-saffron)',
                  fontWeight: 700
                }}>
                  <span>Explore Teachings & Writings</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

