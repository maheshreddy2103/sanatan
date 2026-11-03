import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  HeartHandshake, 
  Calendar, 
  Flower2, 
  Award, 
  Sun, 
  BookOpen, 
  Heart, 
  Compass, 
  Shield, 
  Users, 
  Globe, 
  Leaf, 
  Sparkles 
} from 'lucide-react';
import { practicesData } from '../data/practicesData';
import { beliefsData } from '../data/beliefsData';
import { festivalsData } from '../data/festivalsData';

export default function LivingDharmaView({ initialTab = 'practices', onNavigate }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'practices' | 'beliefs' | 'festivals'

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const practiceIcons = [Flower2, Award, Sun, Flame, BookOpen, Heart, Compass, Sun, Shield, Users];
  const beliefIcons = [Compass, Flame, Sun, Sparkles, Globe, HeartHandshake, Flame, Shield, Globe, Leaf];

  return (
    <div className="container animate-fade-in" style={{ padding: '36px 20px', maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 28px' }}>
        <span className="badge badge-saffron" style={{ marginBottom: '10px' }}>
          Living Tradition • सदाचारः सिद्धान्ताः उत्सवाश्च
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '12px', color: 'var(--text-primary)' }}>
          Living Dharma: Practices, Beliefs & Festivals
        </h1>
        <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Sanatan Dharma is an experiential, lived wisdom tradition. Explore the <strong>sacred daily practices & life rituals</strong>, 
          the <strong>timeless philosophical pillars</strong>, and the <strong>joyous seasonal festivals</strong> of Bharat.
        </p>
      </div>

      {/* 3-Tab Selector */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '36px'
      }}>
        <button
          onClick={() => setActiveTab('practices')}
          className={activeTab === 'practices' ? 'btn btn-primary' : 'btn btn-outline'}
          style={{ padding: '10px 24px', fontSize: '0.94rem', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Flame size={18} />
          <span>Daily Practices & Samskaras</span>
        </button>

        <button
          onClick={() => setActiveTab('beliefs')}
          className={activeTab === 'beliefs' ? 'btn btn-gold' : 'btn btn-outline'}
          style={{ padding: '10px 24px', fontSize: '0.94rem', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <HeartHandshake size={18} />
          <span>Core Beliefs & Philosophy</span>
        </button>

        <button
          onClick={() => setActiveTab('festivals')}
          className={activeTab === 'festivals' ? 'btn btn-primary' : 'btn btn-outline'}
          style={{ padding: '10px 24px', fontSize: '0.94rem', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Calendar size={18} />
          <span>Sacred Festivals</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: PRACTICES & SAMSKARAS */}
      {/* ======================================================== */}
      {activeTab === 'practices' && (
        <div>
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
      )}

      {/* ======================================================== */}
      {/* TAB 2: CORE BELIEFS */}
      {/* ======================================================== */}
      {activeTab === 'beliefs' && (
        <div>
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
      )}

      {/* ======================================================== */}
      {/* TAB 3: SACRED FESTIVALS */}
      {/* ======================================================== */}
      {activeTab === 'festivals' && (
        <div>
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
      )}
    </div>
  );
}

