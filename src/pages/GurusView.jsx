import React, { useState } from 'react';
import { Users, Search, ArrowRight, Sparkles } from 'lucide-react';
import { gurusData } from '../data/gurusData';

export default function GurusView({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGurus = gurusData.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (g.years && g.years.includes(searchQuery))
  );

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '10px' }}>
          Spiritual Masters & Philosophers
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '14px', color: 'var(--text-primary)' }}>
          Notable Gurus in Sanatan Dharma
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          A Guru is an enlightened spiritual teacher and guide who dispels darkness (Gu) and reveals the luminous light of Truth (Ru). Explore the lives, philosophies, and monumental works of 15 revered Acharyas.
        </p>
      </div>

      {/* Search Input */}
      <div style={{
        maxWidth: '540px',
        margin: '0 auto 40px',
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
  );
}

