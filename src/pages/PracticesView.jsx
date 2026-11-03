import React from 'react';
import { Flame, Heart, BookOpen, Compass, Sun, Users, Award, Shield, Flower2 } from 'lucide-react';
import { practicesData } from '../data/practicesData';

export default function PracticesView({ onNavigate }) {
  const practiceIcons = [
    Flower2, // Puja
    Award,   // Samskaras
    Sun,     // Festivals
    Flame,   // Yoga
    BookOpen,// Scriptural Study
    Heart,   // Charity (Dana)
    Compass, // Pilgrimage
    Sun,     // Daily Rituals
    Shield,  // Ethical Living
    Users    // Community
  ];

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
        <span className="badge badge-saffron" style={{ marginBottom: '10px' }}>
          Spiritual Living & Sadhana
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '14px', color: 'var(--text-primary)' }}>
          Practices in Sanatan Dharma
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Sanatan Dharma is not merely a theoretical philosophy but a lived, experiential reality. These sacred disciplines, rituals, and daily practices nurture the soul from birth to liberation.
        </p>
      </div>

      {/* Grid of Practices */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {practicesData.map((practice, idx) => {
          const Icon = practiceIcons[idx % practiceIcons.length];
          return (
            <div
              key={practice.id || idx}
              className="sanatan-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: '3px solid var(--accent-gold)'
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-saffron-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(217, 83, 30, 0.2)'
                  }}>
                    <Icon size={20} color="var(--accent-saffron)" />
                  </div>
                  <div>
                    <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
                      Practice #{idx + 1}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                      {practice.title}
                    </h3>
                  </div>
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                  {practice.description}
                </p>
              </div>

              {idx === 0 && (
                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
                  <button onClick={() => onNavigate('#/mantras')} className="btn btn-outline" style={{ width: '100%', fontSize: '0.85rem' }}>
                    Chant Puja Mantras &rarr;
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

