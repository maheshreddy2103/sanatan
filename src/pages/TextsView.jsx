import React from 'react';
import { BookOpen, Scroll, ExternalLink, ArrowRight } from 'lucide-react';
import { textsData } from '../data/textsData';

export default function TextsView({ onNavigate }) {
  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 40px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '10px' }}>
          Eternal Foundations of Wisdom
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '14px', color: 'var(--text-primary)' }}>
          Sacred Texts of Sanatan Dharma
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Hindu literature is divided into <strong>Śruti</strong> (that which was heard and directly revealed—the Vedas and Upanishads) and <strong>Smṛti</strong> (that which is remembered and recorded—the Vedangas, Epics, Puranas, and ethical codes).
        </p>
      </div>

      {/* Grid of Sacred Scriptures */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {textsData.map((text, idx) => (
          <div
            key={text.id}
            onClick={() => onNavigate(`#/texts/${text.id}`)}
            className="sanatan-card"
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
                  {text.category}
                </span>
                <span style={{
                  fontFamily: 'var(--font-sanskrit)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'var(--accent-saffron)'
                }}>
                  {text.sanskrit}
                </span>
              </div>

              <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '10px' }}>
                {text.title}
              </h2>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
                {text.overview}
              </p>
            </div>

            <div>
              <div style={{
                paddingTop: '12px',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.88rem',
                color: 'var(--accent-saffron)',
                fontWeight: 700
              }}>
                <span>Explore Full Scripture</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gita Press & Sacred Literature Link */}
      <div style={{
        marginTop: '50px',
        padding: '30px',
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-md)',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: 'var(--accent-maroon)' }}>
          Reading Sacred Physical Copies
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 16px' }}>
          Authentic translations of the Vedas, Ramayana, Mahabharata, Upanishads, and Bhagavad Gita in Sanskrit, Hindi, English, and regional Indian languages can be acquired from Gita Press Gorakhpur.
        </p>
        <a
          href="https://gitapress.org/buy-book-online"
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <ExternalLink size={16} />
          Visit Gita Press Book Portal
        </a>
      </div>
    </div>
  );
}

