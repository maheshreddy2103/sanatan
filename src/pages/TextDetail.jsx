import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen, ExternalLink, Bookmark } from 'lucide-react';
import { textsData } from '../data/textsData';

export default function TextDetail({ id, onNavigate }) {
  const currentIndex = textsData.findIndex(t => t.id === id);
  const text = textsData[currentIndex] || textsData[0];

  const prevText = currentIndex > 0 ? textsData[currentIndex - 1] : textsData[textsData.length - 1];
  const nextText = currentIndex < textsData.length - 1 ? textsData[currentIndex + 1] : textsData[0];

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px', maxWidth: '960px' }}>
      {/* Top Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '28px'
      }}>
        <button
          onClick={() => onNavigate('#/texts')}
          className="btn btn-outline"
          style={{ padding: '8px 16px', fontSize: '0.88rem' }}
        >
          <ArrowLeft size={16} /> All Sacred Texts
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onNavigate(`#/texts/${prevText.id}`)}
            className="btn btn-outline"
            style={{ padding: '8px 12px', fontSize: '0.82rem' }}
            title={`Previous: ${prevText.title}`}
          >
            <ChevronLeft size={16} /> {prevText.title}
          </button>
          <button
            onClick={() => onNavigate(`#/texts/${nextText.id}`)}
            className="btn btn-outline"
            style={{ padding: '8px 12px', fontSize: '0.82rem' }}
            title={`Next: ${nextText.title}`}
          >
            {nextText.title} <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Scripture Header Card */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-lg)',
        padding: '36px',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '36px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span className="badge badge-gold">{text.category}</span>
          <span style={{
            fontFamily: 'var(--font-sanskrit)',
            fontSize: '1.4rem',
            color: 'var(--accent-saffron)',
            fontWeight: 700
          }}>
            {text.sanskrit}
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 4vw, 3rem)',
          color: 'var(--text-primary)',
          marginBottom: '14px'
        }}>
          {text.title}
        </h1>

        <p style={{
          fontSize: '1.15rem',
          lineHeight: 1.8,
          color: 'var(--text-secondary)',
          borderLeft: '4px solid var(--accent-gold)',
          paddingLeft: '16px'
        }}>
          {text.overview}
        </p>
      </div>

      {/* Structured Sections */}
      {text.sections && text.sections.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {text.sections.map((sec, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '28px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <h2 style={{
                fontSize: '1.4rem',
                color: 'var(--accent-maroon)',
                marginBottom: '14px',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '8px'
              }}>
                {sec.title}
              </h2>
              <div style={{
                fontSize: '1.02rem',
                lineHeight: 1.8,
                color: 'var(--text-primary)',
                whiteSpace: 'pre-line'
              }}>
                {sec.content}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '32px',
          boxShadow: 'var(--shadow-sm)',
          fontSize: '1.02rem',
          lineHeight: 1.8,
          color: 'var(--text-primary)',
          whiteSpace: 'pre-line'
        }}>
          {text.fullText || text.overview}
        </div>
      )}

      {/* Gita Press Buy Reference */}
      <div style={{
        marginTop: '36px',
        padding: '24px',
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
            Looking for authentic printed editions?
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Gita Press offers authorized Sanskrit original and multifold translations.
          </p>
        </div>
        <a
          href="https://gitapress.org/buy-book-online"
          target="_blank"
          rel="noreferrer"
          className="btn btn-gold"
          style={{ padding: '8px 18px', fontSize: '0.88rem' }}
        >
          <ExternalLink size={15} /> Buy Online at Gita Press
        </a>
      </div>

      {/* Bottom Back Button */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button
          onClick={() => onNavigate('#/texts')}
          className="btn btn-primary"
          style={{ padding: '12px 32px' }}
        >
          <ArrowLeft size={18} /> Back to All Sacred Texts
        </button>
      </div>
    </div>
  );
}

