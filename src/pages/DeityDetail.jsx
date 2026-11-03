import React from 'react';
import { ArrowLeft, Sparkles, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { deitiesData } from '../data/deitiesData';

export default function DeityDetail({ id, onNavigate }) {
  const currentIndex = deitiesData.findIndex(d => d.id === id);
  const deity = deitiesData[currentIndex] || deitiesData[0];

  const prevDeity = currentIndex > 0 ? deitiesData[currentIndex - 1] : deitiesData[deitiesData.length - 1];
  const nextDeity = currentIndex < deitiesData.length - 1 ? deitiesData[currentIndex + 1] : deitiesData[0];

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px', maxWidth: '960px' }}>
      {/* Navigation Top Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '28px'
      }}>
        <button
          onClick={() => onNavigate('#/deities')}
          className="btn btn-outline"
          style={{ padding: '8px 16px', fontSize: '0.88rem' }}
        >
          <ArrowLeft size={16} /> All Devi & Devatas
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onNavigate(`#/deities/${prevDeity.id}`)}
            className="btn btn-outline"
            style={{ padding: '8px 12px', fontSize: '0.82rem' }}
            title={`Previous: ${prevDeity.name}`}
          >
            <ChevronLeft size={16} /> {prevDeity.name}
          </button>
          <button
            onClick={() => onNavigate(`#/deities/${nextDeity.id}`)}
            className="btn btn-outline"
            style={{ padding: '8px 12px', fontSize: '0.82rem' }}
            title={`Next: ${nextDeity.name}`}
          >
            {nextDeity.name} <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Deity Header Card */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-lg)',
        padding: '36px',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '40px',
        display: 'grid',
        gridTemplateColumns: (deity.image || deity.onlineImage) ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr',
        gap: '32px',
        alignItems: 'center'
      }}>
        {(deity.image || deity.onlineImage) && (
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '3px solid var(--accent-gold)',
            boxShadow: 'var(--shadow-md)',
            maxHeight: '380px'
          }}>
            <img
              src={deity.image || deity.onlineImage}
              alt={deity.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                if (deity.onlineImage && e.currentTarget.src !== deity.onlineImage) {
                  e.currentTarget.src = deity.onlineImage;
                }
              }}
            />
          </div>
        )}

        <div>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
            Sanatan Pantheon
          </span>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3rem)',
            color: 'var(--accent-saffron)',
            marginBottom: '10px'
          }}>
            {deity.name}
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            {deity.knownFor}
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-light)',
            fontSize: '0.92rem',
            fontWeight: 600
          }}>
            <Sparkles size={16} color="var(--accent-gold)" />
            <span>Vahana (Divine Mount): <strong>{deity.vahana}</strong></span>
          </div>
        </div>
      </div>

      {/* Incarnations / Manifestations (if any) */}
      {deity.incarnations && deity.incarnations.length > 0 && (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '28px',
          marginBottom: '36px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            color: 'var(--accent-maroon)',
            marginBottom: '16px',
            borderBottom: '2px solid var(--accent-gold)',
            paddingBottom: '8px',
            display: 'inline-block'
          }}>
            Incarnations & Divine Manifestations ({deity.incarnations.length})
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '12px',
            marginTop: '12px'
          }}>
            {deity.incarnations.map((inc, idx) => (
              <div
                key={idx}
                style={{
                  padding: '10px 14px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{inc.name}</span>
                {inc.link && (
                  <a
                    href={inc.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--accent-gold)' }}
                    title="External Wikipedia Reference"
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Content / Sections */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '36px',
        boxShadow: 'var(--shadow-sm)',
        lineHeight: 1.8
      }}>
        {deity.detail?.sections && deity.detail.sections.length > 0 ? (
          deity.detail.sections.map((sec, idx) => (
            <div key={idx} style={{ marginBottom: '32px' }}>
              {sec.title && (
                <h2 style={{
                  fontSize: '1.45rem',
                  color: 'var(--accent-maroon)',
                  marginBottom: '12px',
                  borderBottom: '1px solid var(--border-light)',
                  paddingBottom: '6px'
                }}>
                  {sec.title}
                </h2>
              )}
              <div style={{
                fontSize: '1.02rem',
                color: 'var(--text-primary)',
                whiteSpace: 'pre-line'
              }}>
                {sec.content}
              </div>
            </div>
          ))
        ) : (
          <div style={{
            fontSize: '1.05rem',
            color: 'var(--text-primary)',
            whiteSpace: 'pre-line'
          }}>
            {deity.detail?.fullText || deity.knownFor}
          </div>
        )}
      </div>

      {/* Bottom Back Button */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button
          onClick={() => onNavigate('#/deities')}
          className="btn btn-primary"
          style={{ padding: '12px 32px' }}
        >
          <ArrowLeft size={18} /> Back to All Devi & Devatas
        </button>
      </div>
    </div>
  );
}

