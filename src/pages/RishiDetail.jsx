import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Scroll, Quote, BookOpen, Star, Compass, Award } from 'lucide-react';
import { rishisData } from '../data/rishisData';

export default function RishiDetail({ id, onNavigate }) {
  const currentIndex = rishisData.findIndex(r => r.id === id);
  const rishi = rishisData[currentIndex] || rishisData[0];

  const prevRishi = currentIndex > 0 ? rishisData[currentIndex - 1] : rishisData[rishisData.length - 1];
  const nextRishi = currentIndex < rishisData.length - 1 ? rishisData[currentIndex + 1] : rishisData[0];

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
          onClick={() => onNavigate('#/rishis')}
          className="btn btn-outline"
          style={{ padding: '8px 16px', fontSize: '0.88rem' }}
        >
          <ArrowLeft size={16} /> All 48 Rishis
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onNavigate(`#/rishis/${prevRishi.id}`)}
            className="btn btn-outline"
            style={{ padding: '8px 12px', fontSize: '0.82rem' }}
            title={`Previous: ${prevRishi.name}`}
          >
            <ChevronLeft size={16} /> {prevRishi.name}
          </button>
          <button
            onClick={() => onNavigate(`#/rishis/${nextRishi.id}`)}
            className="btn btn-outline"
            style={{ padding: '8px 12px', fontSize: '0.82rem' }}
            title={`Next: ${nextRishi.name}`}
          >
            {nextRishi.name} <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Rishi Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-lg)',
        padding: '36px',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '32px',
        textAlign: 'center'
      }}>
        {/* Sacred Sage Portrait */}
        {(rishi.onlineImage || rishi.image) && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <img
              src={rishi.onlineImage || rishi.image}
              alt={rishi.name}
              style={{
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--accent-gold)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.18)'
              }}
              onError={(e) => {
                if (rishi.image && e.currentTarget.src !== window.location.origin + rishi.image) {
                  e.currentTarget.src = rishi.image;
                }
              }}
            />
          </div>
        )}

        <span className="badge badge-saffron" style={{ marginBottom: '12px' }}>
          Vedic Sage & Seer
        </span>
        <h1 style={{
          fontSize: 'clamp(2.2rem, 4vw, 3rem)',
          color: 'var(--accent-maroon)',
          marginBottom: '8px'
        }}>
          {rishi.name} Maharshi
        </h1>
        {rishi.subtitle && (
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--accent-gold)',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            {rishi.subtitle}
          </p>
        )}

        {rishi.quote && (
          <div style={{
            maxWidth: '720px',
            margin: '20px auto 0',
            padding: '18px 24px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            borderLeft: '4px solid var(--accent-gold)',
            fontStyle: 'italic',
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Quote size={20} color="var(--accent-gold)" style={{ display: 'inline', marginRight: '6px' }} />
            {rishi.quote}
          </div>
        )}
      </div>

      {/* Introduction */}
      {rishi.introduction && (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '28px',
          marginBottom: '24px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 style={{
            fontSize: '1.35rem',
            color: 'var(--accent-maroon)',
            marginBottom: '12px',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '6px'
          }}>
            Introduction
          </h2>
          <p style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-primary)' }}>
            {rishi.introduction}
          </p>
        </div>
      )}

      {/* Lineage & Origins */}
      {rishi.lineage && rishi.lineage.length > 0 && (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '28px',
          marginBottom: '24px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 style={{
            fontSize: '1.35rem',
            color: 'var(--accent-maroon)',
            marginBottom: '14px',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Compass size={18} color="var(--accent-gold)" />
            Lineage and Origins
          </h2>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {rishi.lineage.map((item, idx) => (
              <li key={idx} style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                {item.title && <strong style={{ color: 'var(--accent-saffron)' }}>{item.title}: </strong>}
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Contributions to Vedic Literature */}
      {rishi.contributions && rishi.contributions.length > 0 && (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '28px',
          marginBottom: '24px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 style={{
            fontSize: '1.35rem',
            color: 'var(--accent-maroon)',
            marginBottom: '14px',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <BookOpen size={18} color="var(--accent-gold)" />
            Contributions to Vedic Literature
          </h2>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {rishi.contributions.map((item, idx) => (
              <li key={idx} style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                {item.title && <strong style={{ color: 'var(--accent-saffron)' }}>{item.title}: </strong>}
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Legends and Spiritual Significance */}
      {rishi.legends && rishi.legends.length > 0 && (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '28px',
          marginBottom: '24px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 style={{
            fontSize: '1.35rem',
            color: 'var(--accent-maroon)',
            marginBottom: '14px',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Star size={18} color="var(--accent-gold)" />
            Legends and Spiritual Significance
          </h2>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {rishi.legends.map((item, idx) => (
              <li key={idx} style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                {item.title && <strong style={{ color: 'var(--accent-saffron)' }}>{item.title}: </strong>}
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Teachings and Philosophy */}
      {rishi.teachings && rishi.teachings.length > 0 && (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '28px',
          marginBottom: '24px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 style={{
            fontSize: '1.35rem',
            color: 'var(--accent-maroon)',
            marginBottom: '14px',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Award size={18} color="var(--accent-gold)" />
            Teachings and Philosophy
          </h2>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {rishi.teachings.map((item, idx) => (
              <li key={idx} style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                {item.title && <strong style={{ color: 'var(--accent-saffron)' }}>{item.title}: </strong>}
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Conclusion */}
      {rishi.conclusion && (
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-md)',
          padding: '28px',
          marginBottom: '32px'
        }}>
          <h2 style={{
            fontSize: '1.3rem',
            color: 'var(--accent-maroon)',
            marginBottom: '10px'
          }}>
            Legacy & Modern Relevance
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-primary)' }}>
            {rishi.conclusion}
          </p>
        </div>
      )}

      {/* Bottom Back Button */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button
          onClick={() => onNavigate('#/rishis')}
          className="btn btn-primary"
          style={{ padding: '12px 32px' }}
        >
          <ArrowLeft size={18} /> Back to All Rishis
        </button>
      </div>
    </div>
  );
}

