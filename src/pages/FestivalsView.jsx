import React from 'react';
import { Calendar, Sparkles, Sun, Flame } from 'lucide-react';
import { festivalsData } from '../data/festivalsData';

export default function FestivalsView() {
  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '10px' }}>
          Joyous Spiritual Celebrations
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '14px', color: 'var(--text-primary)' }}>
          Festivals of Sanatan Dharma
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Festivals in Sanatan Dharma connect cosmic astronomical rhythms with inner spiritual renewal, family warmth, charity, and joyful adoration of the divine.
        </p>
      </div>

      {/* Grid of Festivals */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '24px'
      }}>
        {festivalsData.map((festival, idx) => (
          <div
            key={idx}
            className="sanatan-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderTop: '3px solid var(--accent-saffron)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
                  {festival.season}
                </span>
                <Calendar size={18} color="var(--accent-gold)" />
              </div>

              <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                {festival.name}
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--accent-saffron)', fontWeight: 600, marginBottom: '14px' }}>
                {festival.subtitle}
              </p>

              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Spiritual Significance
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {festival.significance}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Sacred Rituals & Traditions
                </h4>
                <p style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  lineHeight: 1.6
                }}>
                  {festival.rituals}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

