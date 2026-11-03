import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen, Heart, Flame } from 'lucide-react';
import { mantrasData } from '../data/mantrasData';
import JapaCounter from '../components/JapaCounter';
import { playOmDrone } from '../utils/sound';

export default function MantrasView() {
  const [activeMantra, setActiveMantra] = useState(mantrasData[1]); // Default to Gayatri Mantra

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
        <span className="badge badge-saffron" style={{ marginBottom: '10px' }}>
          Divine Cosmic Vibrations
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '14px', color: 'var(--text-primary)' }}>
          Sacred Mantras & Chanting Studio
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Mantras are sacred sound formulas revealed to the Rishis. Chanting them harmonizes the nervous system, purifies the mind, and connects individual consciousness with the divine.
        </p>
      </div>

      {/* Top Interactive Japa Mala Counter Studio */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-lg)',
        padding: '36px',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '50px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '36px',
          alignItems: 'center'
        }}>
          {/* Active Mantra Presentation */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span className="badge badge-gold">Active Chanting Practice</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-saffron)', fontWeight: 600 }}>
                {activeMantra.deity}
              </span>
            </div>

            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '16px' }}>
              {activeMantra.name}
            </h2>

            <div style={{
              fontFamily: 'var(--font-sanskrit)',
              fontSize: '1.35rem',
              color: 'var(--accent-saffron)',
              lineHeight: 1.9,
              marginBottom: '14px',
              fontWeight: 600,
              backgroundColor: 'var(--bg-card)',
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)'
            }}>
              {activeMantra.sanskrit}
            </div>

            <p style={{
              fontSize: '0.92rem',
              fontStyle: 'italic',
              color: 'var(--accent-gold)',
              lineHeight: 1.6,
              marginBottom: '14px'
            }}>
              {activeMantra.transliteration}
            </p>

            <div style={{
              fontSize: '0.98rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              borderLeft: '4px solid var(--accent-gold)',
              paddingLeft: '14px',
              marginBottom: '16px'
            }}>
              "{activeMantra.meaning}"
            </div>

            <button
              onClick={playOmDrone}
              className="btn btn-outline"
              style={{ fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Volume2 size={16} /> Play Cosmic Om Drone
            </button>
          </div>

          {/* Japa Mala 108 Beads Counter */}
          <div>
            <JapaCounter mantraName={activeMantra.name} />
          </div>
        </div>
      </div>

      {/* Complete Collection of Sacred Mantras */}
      <h2 style={{
        fontSize: '1.8rem',
        marginBottom: '24px',
        color: 'var(--text-primary)',
        textAlign: 'center'
      }}>
        Explore All Sacred Mantras
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {mantrasData.map((m) => (
          <div
            key={m.id}
            className="sanatan-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderTop: activeMantra.id === m.id ? '4px solid var(--accent-saffron)' : '1px solid var(--border-light)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                  {m.deity}
                </span>
                <Sparkles size={16} color="var(--accent-gold)" />
              </div>

              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                {m.name}
              </h3>

              <div style={{
                fontFamily: 'var(--font-sanskrit)',
                fontSize: '1.1rem',
                color: 'var(--accent-saffron)',
                lineHeight: 1.8,
                marginBottom: '10px',
                fontWeight: 600
              }}>
                {m.sanskrit}
              </div>

              <p style={{
                fontSize: '0.85rem',
                fontStyle: 'italic',
                color: 'var(--accent-gold)',
                marginBottom: '10px'
              }}>
                {m.transliteration}
              </p>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>
                {m.meaning}
              </p>

              <p style={{
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-secondary)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)'
              }}>
                <strong>Significance:</strong> {m.significance}
              </p>
            </div>

            <div style={{ marginTop: '18px', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
              <button
                onClick={() => {
                  setActiveMantra(m);
                  window.scrollTo({ top: 150, behavior: 'smooth' });
                }}
                className={activeMantra.id === m.id ? 'btn btn-primary' : 'btn btn-outline'}
                style={{ width: '100%', fontSize: '0.88rem' }}
              >
                {activeMantra.id === m.id ? 'Currently Practicing' : 'Chant with Japa Counter'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

