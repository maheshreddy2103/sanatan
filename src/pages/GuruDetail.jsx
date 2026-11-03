import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Users, BookOpen, Quote } from 'lucide-react';
import { gurusData } from '../data/gurusData';

export default function GuruDetail({ id, onNavigate }) {
  const currentIndex = gurusData.findIndex(g => g.id === id);
  const guru = gurusData[currentIndex] || gurusData[0];

  const prevGuru = currentIndex > 0 ? gurusData[currentIndex - 1] : gurusData[gurusData.length - 1];
  const nextGuru = currentIndex < gurusData.length - 1 ? gurusData[currentIndex + 1] : gurusData[0];

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
          onClick={() => onNavigate('#/gurus')}
          className="btn btn-outline"
          style={{ padding: '8px 16px', fontSize: '0.88rem' }}
        >
          <ArrowLeft size={16} /> All Revered Gurus
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onNavigate(`#/gurus/${prevGuru.id}`)}
            className="btn btn-outline"
            style={{ padding: '8px 12px', fontSize: '0.82rem' }}
            title={`Previous: ${prevGuru.name}`}
          >
            <ChevronLeft size={16} /> {prevGuru.name}
          </button>
          <button
            onClick={() => onNavigate(`#/gurus/${nextGuru.id}`)}
            className="btn btn-outline"
            style={{ padding: '8px 12px', fontSize: '0.82rem' }}
            title={`Next: ${nextGuru.name}`}
          >
            {nextGuru.name} <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Guru Profile Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-lg)',
        padding: '36px',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '36px',
        display: 'grid',
        gridTemplateColumns: (guru.image || guru.onlineImage) ? 'repeat(auto-fit, minmax(260px, 1fr))' : '1fr',
        gap: '32px',
        alignItems: 'center'
      }}>
        {(guru.image || guru.onlineImage) && (
          <div style={{
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '3px solid var(--accent-gold)',
            boxShadow: 'var(--shadow-md)',
            maxHeight: '340px'
          }}>
            <img
              src={guru.image || guru.onlineImage}
              alt={guru.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                if (guru.onlineImage && e.currentTarget.src !== guru.onlineImage) {
                  e.currentTarget.src = guru.onlineImage;
                }
              }}
            />
          </div>
        )}

        <div>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
            Spiritual Acharya
          </span>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 2.7rem)',
            color: 'var(--accent-saffron)',
            marginBottom: '8px'
          }}>
            {guru.name}
          </h1>
          {guru.years && (
            <div style={{
              fontSize: '1.1rem',
              color: 'var(--accent-gold)',
              fontWeight: 700,
              marginBottom: '18px'
            }}>
              Era: {guru.years}
            </div>
          )}

          <div style={{
            fontSize: '1rem',
            lineHeight: 1.75,
            color: 'var(--text-secondary)',
            backgroundColor: 'var(--bg-secondary)',
            padding: '18px',
            borderRadius: 'var(--radius-sm)',
            borderLeft: '4px solid var(--accent-saffron)'
          }}>
            {guru.summary}
          </div>
        </div>
      </div>

      {/* Structured Sections / Teachings / Commentaries */}
      {guru.sections && guru.sections.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {guru.sections.map((sec, idx) => (
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
                fontSize: '1.35rem',
                color: 'var(--accent-maroon)',
                marginBottom: '14px',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <BookOpen size={18} color="var(--accent-gold)" />
                {sec.title}
              </h2>
              <div style={{
                fontSize: '1rem',
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
          {guru.fullText || guru.summary}
        </div>
      )}

      {/* Bottom Back Button */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button
          onClick={() => onNavigate('#/gurus')}
          className="btn btn-primary"
          style={{ padding: '12px 32px' }}
        >
          <ArrowLeft size={18} /> Back to All Gurus
        </button>
      </div>
    </div>
  );
}

