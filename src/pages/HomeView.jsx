import React from 'react';
import { 
  Sparkles, 
  Users, 
  Scroll, 
  BookOpen, 
  Flame, 
  Volume2, 
  ArrowRight, 
  Compass, 
  ShieldCheck, 
  Sun, 
  HeartHandshake, 
  Mail, 
  Phone, 
  MapPin,
  GitFork,
  Award,
  Landmark,
  Calendar
} from 'lucide-react';
import DailyWisdom from '../components/DailyWisdom';
import { deitiesData } from '../data/deitiesData';
import { gurusData } from '../data/gurusData';
import { rishisData } from '../data/rishisData';
import { textsData } from '../data/textsData';

export default function HomeView({ onNavigate }) {
  const featuredDeities = deitiesData.slice(0, 6);
  const featuredGurus = gurusData.slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero Banner Section */}
      <section style={{
        position: 'relative',
        minHeight: '520px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(rgba(20, 14, 10, 0.72), rgba(20, 14, 10, 0.85)), url("/Sanatan.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        textAlign: 'center',
        padding: '60px 20px',
        borderBottom: '4px solid var(--accent-gold)'
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(212, 175, 55, 0.2)',
            border: '1px solid var(--accent-gold)',
            padding: '6px 18px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '20px',
            color: '#fef2d0'
          }}>
            <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-sanskrit)' }}>ॐ</span>
            Sanātana Dharma — The Eternal Way
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '20px',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
            color: '#ffffff'
          }}>
            A Journey Through <span style={{ color: 'var(--accent-gold)' }}>Spirituality</span>, Wisdom & <span style={{ color: 'var(--accent-saffron)' }}>Tradition</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 1.7,
            maxWidth: '720px',
            margin: '0 auto 32px',
            color: '#f0e6d6',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)'
          }}>
            Explore the timeless wisdom, sacred texts, divine deities, enlightened masters, and ancient rishis of the world's most enduring spiritual tradition.
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => onNavigate('#/panchang')}
              className="btn btn-gold"
              style={{ padding: '12px 26px', fontSize: '1rem', border: '1px solid #FFD700', boxShadow: '0 0 15px rgba(229, 169, 60, 0.4)' }}
            >
              <Calendar size={18} />
              Vedic Panchang & Festivals
            </button>
            <button
              onClick={() => onNavigate('#/temple-map')}
              className="btn btn-primary"
              style={{ padding: '12px 26px', fontSize: '1rem' }}
            >
              <Landmark size={18} />
              Temples of India (6.5L+)
            </button>
            <button
              onClick={() => onNavigate('#/tirtha')}
              className="btn btn-primary"
              style={{ padding: '12px 26px', fontSize: '1rem' }}
            >
              <MapPin size={18} />
              Sacred Tirtha
            </button>
            <button
              onClick={() => onNavigate('#/genealogy')}
              className="btn btn-gold"
              style={{ padding: '12px 26px', fontSize: '1rem' }}
            >
              <GitFork size={18} />
              Lineage Tree
            </button>
            <button
              onClick={() => onNavigate('#/quiz')}
              className="btn btn-primary"
              style={{ padding: '12px 26px', fontSize: '1rem' }}
            >
              <Award size={18} />
              Knowledge Quiz
            </button>
            <button
              onClick={() => onNavigate('#/deities')}
              className="btn btn-outline"
              style={{
                padding: '12px 26px',
                fontSize: '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.35)'
              }}
            >
              <Sparkles size={18} />
              Explore Deities
            </button>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Quick Highlights Counter Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginTop: '-35px',
          position: 'relative',
          zIndex: 10
        }}>
          {[
            { count: '34+', label: 'Devi & Devatas', sub: 'Divine Aspects', icon: Sparkles, route: '#/deities' },
            { count: '15', label: 'Revered Gurus', sub: 'Spiritual Masters', icon: Users, route: '#/gurus' },
            { count: '48+', label: 'Ancient Rishis', sub: 'Vedic Sages', icon: Scroll, route: '#/rishis' },
            { count: '7+', label: 'Sacred Texts', sub: 'Vedas, Gita & Epics', icon: BookOpen, route: '#/texts' },
            { count: '16', label: 'Samskaras', sub: 'Life Stage Rituals', icon: Flame, route: '#/practices' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigate(stat.route)}
                className="sanatan-card"
                style={{
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Icon size={24} color="var(--accent-saffron)" style={{ marginBottom: '8px' }} />
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: 'var(--accent-gold)',
                  lineHeight: 1.1
                }}>
                  {stat.count}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Flagship Interactive Explorations Showcase */}
        <section style={{ margin: '48px 0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '8px' }}>Interactive Discovery</span>
            <h2 style={{ fontSize: '1.9rem', color: 'var(--text-primary)' }}>Sacred Tools & Living Heritage</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem' }}>
              Engage with sacred geography, cosmic ancestral trees, and assess your knowledge with certificates.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '24px'
          }}>
            {/* Card 1: Tirtha Yatra */}
            <div
              onClick={() => onNavigate('#/tirtha')}
              className="sanatan-card"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: '4px solid #d9531e'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--accent-saffron-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={22} color="var(--accent-saffron)" />
                  </div>
                  <div>
                    <span className="badge badge-saffron" style={{ fontSize: '0.7rem' }}>Interactive Map</span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Tirtha Yatra</h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Explore India's sacred geography: 12 Jyotirlingas, Char Dham, Pancha Bhoota Sthalas, and Shakti Peethas with legends, architectures, and travel routes.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--accent-saffron)', fontWeight: 700 }}>
                <span>Launch Interactive Map</span>
                <ArrowRight size={16} />
              </div>
            </div>

            {/* Card 2: Vamshavali */}
            <div
              onClick={() => onNavigate('#/genealogy')}
              className="sanatan-card"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: '4px solid #c69214'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <GitFork size={22} color="var(--accent-gold)" />
                  </div>
                  <div>
                    <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>Lineage Trees</span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Vamshavali</h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Trace cosmic lineages: Brahma & Saptarishis, the Solar Dynasty (Ikshvaku to Sri Rama), and the Lunar Dynasty (Krishna, Pandavas, and Bharata).
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
                <span>Explore Dynastic Trees</span>
                <ArrowRight size={16} />
              </div>
            </div>

            {/* Card 3: Jnana Quiz */}
            <div
              onClick={() => onNavigate('#/quiz')}
              className="sanatan-card"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: '4px solid #27ae60'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(46, 204, 113, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award size={22} color="#27ae60" />
                  </div>
                  <div>
                    <span className="badge badge-gold" style={{ fontSize: '0.7rem', color: '#27ae60', borderColor: '#27ae60' }}>Quiz & Cards</span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Jnana Pariksha</h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Test your knowledge across 3 difficulty tiers (Beginner to Scholar), study 3D flipping flashcards, and earn a personalized printable Sanskrit certificate!
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', color: '#27ae60', fontWeight: 700 }}>
                <span>Take Quiz & Flashcards</span>
                <ArrowRight size={16} />
              </div>
            </div>

            {/* Card 4: Vedic Panchang & Festivals */}
            <div
              onClick={() => onNavigate('#/panchang')}
              className="sanatan-card"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: '4px solid #D97706'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calendar size={22} color="#D97706" />
                  </div>
                  <div>
                    <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>Live Astronomical</span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Vedic Panchang</h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Real-time daily Tithi, Nakshatra, Yoga, Karana, Brahma Muhurta, Rahu Kaal, and live countdowns to Maha Shivaratri, Holi, Navratri & Diwali with authentic puja vidhi.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', color: '#D97706', fontWeight: 700 }}>
                <span>Open Panchang & Festivals</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </section>

        {/* Daily Vedic Wisdom */}
        <DailyWisdom />

        {/* About Sanatan Section */}
        <section style={{ margin: '60px 0' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}>
            <div>
              <span className="badge badge-saffron" style={{ marginBottom: '12px' }}>
                Eternal Foundations
              </span>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '18px', color: 'var(--text-primary)' }}>
                About Sanatan Dharma
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Sanatan Dharma, often recognized globally as Hinduism, is one of the world's most ancient living spiritual systems, with roots reaching deep into timeless antiquity. Literally meaning <em>"The Eternal Law or Order"</em>, it guides humanity on righteous living, inner realization, and cosmic harmony.
              </p>
              <p style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Unlike dogmatic religions with a single prophet or rigid authority, Sanatan Dharma is a vast, inclusive, and pluralistic spiritual river that embraces multifaceted philosophical schools, deep meditative paths, and diverse traditions of devotion.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button onClick={() => onNavigate('#/beliefs')} className="btn btn-outline">
                  <HeartHandshake size={16} />
                  Learn Core Beliefs
                </button>
                <button onClick={() => onNavigate('#/practices')} className="btn btn-outline">
                  <Flame size={16} />
                  Explore Practices
                </button>
              </div>
            </div>

            {/* The Four Purusharthas Pillar Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px'
            }}>
              {[
                { title: 'Dharma', desc: 'Righteous duty, ethics, universal truth, and moral cosmic balance.', color: '#c69214' },
                { title: 'Artha', desc: 'Honest prosperity, material well-being, and righteous livelihood.', color: '#1a6b63' },
                { title: 'Kama', desc: 'Harmonious enjoyment of life, love, beauty, aesthetics, and arts.', color: '#d9531e' },
                { title: 'Moksha', desc: 'Ultimate spiritual liberation, self-realization, and union with Brahman.', color: '#801818' }
              ].map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '20px',
                    boxShadow: 'var(--shadow-sm)',
                    borderTop: `4px solid ${p.color}`
                  }}
                >
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '6px', color: p.color }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Devi & Devatas */}
        <section style={{ margin: '70px 0' }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
                Divine Manifestations
              </span>
              <h2 style={{ fontSize: '2.1rem', color: 'var(--text-primary)' }}>
                Devi & Devatas
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
                Each deity embodies a sacred attribute of the infinite, formless Supreme Reality (Brahman).
              </p>
            </div>
            <button
              onClick={() => onNavigate('#/deities')}
              className="btn btn-outline"
            >
              View All 34 Deities <ArrowRight size={16} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {featuredDeities.map((deity) => (
              <div
                key={deity.id}
                onClick={() => onNavigate(`#/deities/${deity.id}`)}
                className="sanatan-card"
                style={{ cursor: 'pointer', padding: 0 }}
              >
                <div style={{
                  height: '220px',
                  backgroundColor: 'var(--bg-surface)',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  {deity.image ? (
                    <img
                      src={deity.image}
                      alt={deity.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div style={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-sanskrit)',
                      fontSize: '4rem',
                      color: 'var(--accent-gold)'
                    }}>
                      ॐ
                    </div>
                  )}
                  <span
                    className="badge badge-saffron"
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}
                  >
                    Vahana: {deity.vahana}
                  </span>
                </div>

                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', color: 'var(--text-primary)' }}>
                    {deity.name}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--accent-saffron)', fontWeight: 600, marginBottom: '10px' }}>
                    {deity.knownFor}
                  </p>
                  <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {deity.detail?.fullText || `Divine aspect in Sanatan Dharma, revered for ${deity.knownFor}.`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Gurus & Rishis Grid */}
        <section style={{ margin: '70px 0' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {/* Gurus Box */}
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              padding: '30px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}>
                <div>
                  <span className="badge badge-gold">Spiritual Masters</span>
                  <h3 style={{ fontSize: '1.5rem', marginTop: '6px' }}>Revered Gurus</h3>
                </div>
                <button onClick={() => onNavigate('#/gurus')} className="btn btn-outline" style={{ padding: '6px 14px' }}>
                  All 15 <ArrowRight size={14} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {featuredGurus.map(guru => (
                  <div
                    key={guru.id}
                    onClick={() => onNavigate(`#/gurus/${guru.id}`)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-surface)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'; }}
                  >
                    {guru.image ? (
                      <img
                        src={guru.image}
                        alt={guru.name}
                        style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Users size={20} color="var(--accent-gold)" />
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>{guru.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{guru.years || 'Spiritual Acharya'}</div>
                    </div>
                    <ArrowRight size={16} color="var(--accent-saffron)" />
                  </div>
                ))}
              </div>
            </div>

            {/* Rishis Box */}
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              padding: '30px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}>
                <div>
                  <span className="badge badge-saffron">Ancient Seers</span>
                  <h3 style={{ fontSize: '1.5rem', marginTop: '6px' }}>Vedic Rishis</h3>
                </div>
                <button onClick={() => onNavigate('#/rishis')} className="btn btn-outline" style={{ padding: '6px 14px' }}>
                  All 48 <ArrowRight size={14} />
                </button>
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
                The Sages (Rishis) heard and revealed the mantras of the Vedas through profound yogic meditation (Tapasya). They formulated astronomy, mathematics, philosophy, literature, and medicine for human elevation.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {rishisData.slice(0, 14).map(rishi => (
                  <button
                    key={rishi.id}
                    onClick={() => onNavigate(`#/rishis/${rishi.id}`)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border-strong)',
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--accent-saffron)';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                  >
                    {rishi.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sacred Texts Showcase */}
        <section style={{
          margin: '70px 0',
          padding: '40px',
          background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-strong)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '8px' }}>Shruti & Smriti</span>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>Sacred Scriptures & Literature</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              From the primordial verses of the Rigveda to the transcendental dialog of the Bhagavad Gita and monumental epics.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}>
            {textsData.map(text => (
              <div
                key={text.id}
                onClick={() => onNavigate(`#/texts/${text.id}`)}
                className="sanatan-card"
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
                    {text.category}
                  </span>
                  <span style={{ fontFamily: 'var(--font-sanskrit)', fontSize: '1.1rem', color: 'var(--accent-saffron)' }}>
                    {text.sanskrit}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{text.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {text.overview}
                </p>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-saffron)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Read Scripture &rarr;
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section style={{
          margin: '70px 0',
          padding: '40px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}>
            <div>
              <span className="badge badge-saffron" style={{ marginBottom: '8px' }}>Get In Touch</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '14px' }}>Connect with Us</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '24px' }}>
                Have questions about rituals, Vedic texts, philosophical traditions, or contributing to the portal? We welcome every spiritual seeker.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--accent-saffron-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={18} color="var(--accent-saffron)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Address</div>
                    <strong>pallemaheshreddy@gmail.com</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--accent-saffron-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={18} color="var(--accent-saffron)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phone Number</div>
                    <strong>+91 7672023472</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--accent-saffron-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={18} color="var(--accent-saffron)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Location</div>
                    <strong>123 Dharma Street, City, India</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for reaching out! May your spiritual journey be blessed.'); }} style={{
              backgroundColor: 'var(--bg-secondary)',
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)'
            }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Send a Message</h3>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arjuna"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-strong)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)'
                  }}
                />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-strong)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)'
                  }}
                />
              </div>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Message or Inquiry</label>
                <textarea
                  rows="3"
                  required
                  placeholder="How can we assist you with Sanatan Dharma?"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-strong)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    resize: 'vertical'
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

