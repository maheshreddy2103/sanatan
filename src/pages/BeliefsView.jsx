import React from 'react';
import { HeartHandshake, Compass, Flame, Shield, Sparkles, Sun, Leaf, Globe } from 'lucide-react';
import { beliefsData } from '../data/beliefsData';

export default function BeliefsView({ onNavigate }) {
  const beliefIcons = [
    Compass,        // Dharma
    Flame,          // Karma
    Sun,            // Samsara
    Sparkles,       // Moksha
    Globe,          // Brahman
    HeartHandshake, // Atman
    Flame,          // Yoga
    Shield,         // Ahimsa
    Globe,          // Diversity
    Leaf            // Nature
  ];

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '10px' }}>
          Philosophical Pillars
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '14px', color: 'var(--text-primary)' }}>
          Core Beliefs of Sanatan Dharma
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Sanatan Dharma is centered upon timeless cosmic principles that accommodate diverse perspectives while anchoring the soul in righteousness, spiritual awakening, and reverence for all creation.
        </p>
      </div>

      {/* Grid of Beliefs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {beliefsData.map((belief, idx) => {
          const Icon = beliefIcons[idx % beliefIcons.length];
          return (
            <div
              key={belief.id || idx}
              className="sanatan-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: '4px solid var(--accent-saffron)'
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
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-gold-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(198, 146, 20, 0.3)'
                  }}>
                    <Icon size={20} color="var(--accent-gold)" />
                  </div>
                  <div>
                    <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
                      Principle #{idx + 1}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                      {belief.title}
                    </h3>
                  </div>
                </div>

                <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                  {belief.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

