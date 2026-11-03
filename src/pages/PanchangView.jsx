import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  Sun, 
  Moon, 
  Sparkles, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  Compass, 
  Info, 
  CheckCircle, 
  AlertTriangle, 
  BookOpen, 
  X, 
  ExternalLink,
  RotateCcw,
  Volume2
} from 'lucide-react';
import { 
  getPanchanga, 
  HOLY_CITIES, 
  TITHI_DATA, 
  NAKSHATRA_DATA 
} from '../utils/panchang';
import { 
  MAJOR_FESTIVALS_DATA, 
  getNextFestivalOccurrence 
} from '../data/festivalCountdownsData';
import { playTempleBell } from '../utils/sound';

export default function PanchangView({ onNavigate }) {
  const [selectedCityId, setSelectedCityId] = useState('varanasi');
  const [activeDate, setActiveDate] = useState(() => new Date());
  const [activeTab, setActiveTab] = useState('panchang'); // 'panchang' | 'festivals' | 'muhurtas'
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Ticking clock for real-time live seconds updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute live Panchang for the active date and city
  const panchang = useMemo(() => {
    return getPanchanga(activeDate, selectedCityId);
  }, [activeDate, selectedCityId]);

  // Festivals enriched with dynamic live countdowns
  const festivalsWithCountdowns = useMemo(() => {
    return MAJOR_FESTIVALS_DATA.map(f => {
      const countdown = getNextFestivalOccurrence(f);
      return {
        ...f,
        countdown
      };
    }).sort((a, b) => a.countdown.totalSeconds - b.countdown.totalSeconds);
  }, [currentTime]);

  const nearestFestival = festivalsWithCountdowns[0];

  // Date Navigation handlers
  const handlePrevDay = () => {
    const prev = new Date(activeDate);
    prev.setDate(prev.getDate() - 1);
    setActiveDate(prev);
    try { playTempleBell(432); } catch(e) {}
  };

  const handleNextDay = () => {
    const next = new Date(activeDate);
    next.setDate(next.getDate() + 1);
    setActiveDate(next);
    try { playTempleBell(528); } catch(e) {}
  };

  const handleToday = () => {
    setActiveDate(new Date());
    try { playTempleBell(640); } catch(e) {}
  };

  const isToday = useMemo(() => {
    const now = new Date();
    return (
      activeDate.getDate() === now.getDate() &&
      activeDate.getMonth() === now.getMonth() &&
      activeDate.getFullYear() === now.getFullYear()
    );
  }, [activeDate]);

  return (
    <div className="container animate-fade-in" style={{ padding: '36px 20px', maxWidth: '1280px' }}>
      {/* ============================================================== */}
      {/* 1. TOP HEADER & ASTRONOMICAL STATUS BAR                        */}
      {/* ============================================================== */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: '16px',
        padding: '24px 28px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{
              background: 'linear-gradient(135deg, rgba(217, 83, 30, 0.15) 0%, rgba(198, 146, 20, 0.15) 100%)',
              color: 'var(--accent-saffron)',
              border: '1px solid rgba(217, 83, 30, 0.3)',
              borderRadius: '20px',
              padding: '4px 12px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              ॥ दैनिक पञ्चाङ्गम् ॥ Vedic Timekeeping & Cosmic Rhythms
            </span>
            <span style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
              borderRadius: '12px',
              padding: '3px 10px',
              fontSize: '11px',
              fontWeight: 600
            }}>
              Vikram Samvat {panchang.samvat.vikram}
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 3.4vw, 2.5rem)',
            fontWeight: 800,
            margin: '0 0 6px 0',
            fontFamily: "'Cinzel', Georgia, serif",
            color: 'var(--text-primary)',
            letterSpacing: '0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Calendar size={32} color="var(--accent-saffron)" />
            <span>Vedic Panchang & Festival Countdown</span>
          </h1>

          <p style={{
            margin: 0,
            color: 'var(--text-secondary)',
            fontSize: '14px',
            lineHeight: 1.5,
            maxWidth: '680px'
          }}>
            Real-time astronomical computation of the five cosmic limbs (Tithi, Nakshatra, Yoga, Karana, Vara), auspicious Brahma & Abhijit Muhurtas, and live festival countdowns with authentic puja vidhi.
          </p>
        </div>

        {/* Live Clock & Location Pill Card */}
        <div style={{
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%)',
          border: '1.5px solid var(--accent-gold)',
          borderRadius: '14px',
          padding: '16px 22px',
          textAlign: 'right',
          boxShadow: 'var(--shadow-md)',
          minWidth: '220px'
        }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--accent-saffron)',
            marginBottom: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '6px'
          }}>
            <Clock size={13} />
            <span>Current Real-Time</span>
          </div>

          <div style={{
            fontSize: 'clamp(1.6rem, 2.5vw, 2.1rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            color: 'var(--accent-gold)',
            fontFamily: "'Cinzel', Georgia, serif"
          }}>
            {currentTime.toLocaleTimeString('en-IN', { hour12: true })}
          </div>

          <div style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            marginTop: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '4px'
          }}>
            <MapPin size={11} color="var(--accent-saffron)" />
            <span>Calculated for {panchang.city.name}</span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. DATE NAVIGATOR & CITY PICKER BAR                            */}
      {/* ============================================================== */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: '12px',
        padding: '14px 20px',
        marginBottom: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Left: Previous, Today, Next Date Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={handlePrevDay}
            className="btn btn-outline"
            style={{ padding: '7px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
            title="Previous Day"
          >
            <ChevronLeft size={16} />
            <span>Prev Day</span>
          </button>

          <button
            onClick={handleToday}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              border: isToday ? '1.5px solid var(--accent-gold)' : '1px solid var(--border-light)',
              background: isToday ? 'var(--accent-saffron)' : 'var(--bg-secondary)',
              color: isToday ? '#FFFFFF' : 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <RotateCcw size={14} />
            <span>Today</span>
          </button>

          <button
            onClick={handleNextDay}
            className="btn btn-outline"
            style={{ padding: '7px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
            title="Next Day"
          >
            <span>Next Day</span>
            <ChevronRight size={16} />
          </button>

          {/* Date Picker Input */}
          <input
            type="date"
            value={activeDate.toISOString().split('T')[0]}
            onChange={(e) => {
              if (e.target.value) {
                const parts = e.target.value.split('-');
                setActiveDate(new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])));
              }
            }}
            style={{
              padding: '7px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border-strong)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Center: Current Viewing Date Display */}
        <div style={{
          textAlign: 'center',
          fontFamily: "'Cinzel', Georgia, serif",
          fontSize: '15px',
          fontWeight: 700,
          color: 'var(--accent-maroon)'
        }}>
          {panchang.dateFormatted}
        </div>

        {/* Right: City Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
            Holy City:
          </span>
          <select
            value={selectedCityId}
            onChange={(e) => setSelectedCityId(e.target.value)}
            style={{
              padding: '7px 12px',
              borderRadius: '8px',
              border: '1px solid var(--accent-gold)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              outline: 'none'
            }}
          >
            {HOLY_CITIES.map(c => (
              <option key={c.id} value={c.id}>
                📍 {c.name} ({c.state})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. MAIN TAB SWITCHER: PANCHANG vs FESTIVALS vs MUHURTAS        */}
      {/* ============================================================== */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '28px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveTab('panchang')}
          style={{
            padding: '10px 22px',
            borderRadius: '10px',
            border: activeTab === 'panchang' ? '1.5px solid var(--accent-gold)' : '1px solid var(--border-light)',
            background: activeTab === 'panchang' ? 'var(--accent-saffron)' : 'var(--bg-card)',
            color: activeTab === 'panchang' ? '#FFFFFF' : 'var(--text-primary)',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: activeTab === 'panchang' ? 'var(--shadow-sm)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <Sparkles size={16} />
          <span>Vedic Panchang (पञ्चाङ्ग)</span>
        </button>

        <button
          onClick={() => setActiveTab('festivals')}
          style={{
            padding: '10px 22px',
            borderRadius: '10px',
            border: activeTab === 'festivals' ? '1.5px solid var(--accent-gold)' : '1px solid var(--border-light)',
            background: activeTab === 'festivals' ? 'var(--accent-saffron)' : 'var(--bg-card)',
            color: activeTab === 'festivals' ? '#FFFFFF' : 'var(--text-primary)',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: activeTab === 'festivals' ? 'var(--shadow-sm)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <Flame size={16} />
          <span>Festival Live Countdowns ({festivalsWithCountdowns.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('muhurtas')}
          style={{
            padding: '10px 22px',
            borderRadius: '10px',
            border: activeTab === 'muhurtas' ? '1.5px solid var(--accent-gold)' : '1px solid var(--border-light)',
            background: activeTab === 'muhurtas' ? 'var(--accent-saffron)' : 'var(--bg-card)',
            color: activeTab === 'muhurtas' ? '#FFFFFF' : 'var(--text-primary)',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: activeTab === 'muhurtas' ? 'var(--shadow-sm)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <Sun size={16} />
          <span>Auspicious Timings & Muhurtas</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: DAILY VEDIC PANCHANG VIEW                               */}
      {/* ============================================================== */}
      {activeTab === 'panchang' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* A. GRAND ERA & COSMIC CYCLE BANNER */}
          <div style={{
            background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%)',
            border: '1px solid var(--border-strong)',
            borderRadius: '14px',
            padding: '20px 24px',
            boxShadow: 'var(--shadow-sm)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Lunar Month (मासः)
              </span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-maroon)', marginTop: '2px' }}>
                {panchang.masa.name} ({panchang.masa.devanagari})
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Ritu: {panchang.masa.season}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Paksha & Moon Phase
              </span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-saffron)', marginTop: '2px' }}>
                {panchang.tithi.isShukla ? 'शुक्ल पक्ष (Waxing)' : 'कृष्ण पक्ष (Waning)'}
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                {panchang.tithi.name} ({panchang.tithi.devanagari})
              </span>
            </div>

            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Samvat & Chronology
              </span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-gold)', marginTop: '2px' }}>
                Vikram {panchang.samvat.vikram}
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Shaka {panchang.samvat.shaka} • Kali Yuga {panchang.samvat.kaliYuga}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Solar Ayana
              </span>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                {panchang.ayana.split('(')[0]}
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Solar transit path
              </span>
            </div>
          </div>

          {/* B. THE 5 COSMIC LIMBS OF PANCHANG (पञ्चाङ्गम्) */}
          <div>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: "'Cinzel', Georgia, serif",
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>🕉️</span>
              <span>The Five Limbs of Panchang (पञ्च अङ्गानि)</span>
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '16px'
            }}>
              {/* 1. Tithi Card */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1.5px solid var(--accent-gold)',
                borderRadius: '12px',
                padding: '18px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      background: 'rgba(217, 83, 30, 0.12)',
                      color: 'var(--accent-saffron)',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      Limb 1 • Tithi (तिथि)
                    </span>
                    <span style={{ fontSize: '16px' }}>{panchang.tithi.isShukla ? '🌔' : '🌘'}</span>
                  </div>

                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>
                    {panchang.tithi.name}
                  </h3>
                  <div style={{ fontSize: '14px', color: 'var(--accent-saffron)', fontWeight: 700, marginBottom: '8px' }}>
                    {panchang.tithi.devanagari} • Tithi #{panchang.tithi.number}
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 10px 0' }}>
                    {panchang.tithi.significance}
                  </p>
                </div>

                <div style={{
                  paddingTop: '8px',
                  borderTop: '1px solid var(--border-light)',
                  fontSize: '11px',
                  color: 'var(--text-muted)'
                }}>
                  Ruling Deity: <strong style={{ color: 'var(--accent-gold)' }}>{panchang.tithi.deity}</strong>
                </div>
              </div>

              {/* 2. Nakshatra Card */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1.5px solid var(--accent-gold)',
                borderRadius: '12px',
                padding: '18px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      background: 'rgba(198, 146, 20, 0.15)',
                      color: 'var(--accent-gold)',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      Limb 2 • Nakshatra (नक्षत्र)
                    </span>
                    <span style={{ fontSize: '16px' }}>⭐</span>
                  </div>

                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>
                    {panchang.nakshatra.name}
                  </h3>
                  <div style={{ fontSize: '14px', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: '8px' }}>
                    {panchang.nakshatra.devanagari} • Pada {panchang.nakshatra.pada}
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 10px 0' }}>
                    Qualities: {panchang.nakshatra.nature}. Symbol: {panchang.nakshatra.symbol}.
                  </p>
                </div>

                <div style={{
                  paddingTop: '8px',
                  borderTop: '1px solid var(--border-light)',
                  fontSize: '11px',
                  color: 'var(--text-muted)'
                }}>
                  Lord: <strong style={{ color: 'var(--accent-saffron)' }}>{panchang.nakshatra.lord}</strong> • Deity: {panchang.nakshatra.deity}
                </div>
              </div>

              {/* 3. Yoga Card */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1.5px solid var(--border-strong)',
                borderRadius: '12px',
                padding: '18px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      background: 'rgba(26, 107, 99, 0.12)',
                      color: 'var(--accent-teal)',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      Limb 3 • Yoga (योग)
                    </span>
                    <span style={{ fontSize: '16px' }}>🧘</span>
                  </div>

                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>
                    {panchang.yoga.name}
                  </h3>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    Luni-Solar Angle #{panchang.yoga.number} of 27
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 10px 0' }}>
                    Auspicious alignment governing spiritual concentration, meditation, and mental fortitude.
                  </p>
                </div>

                <div style={{
                  paddingTop: '8px',
                  borderTop: '1px solid var(--border-light)',
                  fontSize: '11px',
                  color: 'var(--text-muted)'
                }}>
                  Type: <strong>Auspicious Astrological Combination</strong>
                </div>
              </div>

              {/* 4. Karana Card */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1.5px solid var(--border-strong)',
                borderRadius: '12px',
                padding: '18px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      background: 'rgba(128, 24, 24, 0.12)',
                      color: 'var(--accent-maroon)',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      Limb 4 • Karana (करण)
                    </span>
                    <span style={{ fontSize: '16px' }}>⚖️</span>
                  </div>

                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>
                    {panchang.karana.name}
                  </h3>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    Half-Tithi Duration (6° arc)
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 10px 0' }}>
                    {panchang.karana.nature}
                  </p>
                </div>

                <div style={{
                  paddingTop: '8px',
                  borderTop: '1px solid var(--border-light)',
                  fontSize: '11px',
                  color: 'var(--text-muted)'
                }}>
                  Deity: <strong style={{ color: 'var(--accent-maroon)' }}>{panchang.karana.deity}</strong>
                </div>
              </div>

              {/* 5. Vara Card */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1.5px solid var(--border-strong)',
                borderRadius: '12px',
                padding: '18px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      background: 'rgba(217, 83, 30, 0.15)',
                      color: panchang.vara.color,
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      Limb 5 • Vara (वार)
                    </span>
                    <span style={{ fontSize: '16px' }}>☀️</span>
                  </div>

                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>
                    {panchang.vara.name}
                  </h3>
                  <div style={{ fontSize: '14px', color: panchang.vara.color, fontWeight: 700, marginBottom: '8px' }}>
                    {panchang.vara.devanagari} ({panchang.vara.english})
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 10px 0' }}>
                    Presiding deity: {panchang.vara.deity}. Celestial ruler: {panchang.vara.planet}.
                  </p>
                </div>

                <div style={{
                  paddingTop: '8px',
                  borderTop: '1px solid var(--border-light)',
                  fontSize: '11px',
                  color: 'var(--text-muted)'
                }}>
                  Lord: <strong>{panchang.vara.planet}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* C. SACRED SOLAR TIMINGS & MUHURTA WINDOWS */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            borderRadius: '14px',
            padding: '22px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h2 style={{
              fontSize: '17px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: "'Cinzel', Georgia, serif",
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sun size={20} color="var(--accent-gold)" />
                <span>Solar Timings & Sacred Muhurta Windows for {panchang.city.name}</span>
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>
                Coordinates: {panchang.city.lat.toFixed(2)}°N, {panchang.city.lng.toFixed(2)}°E
              </span>
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px'
            }}>
              {/* Brahma Muhurta */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(198, 146, 20, 0.12) 0%, rgba(217, 83, 30, 0.08) 100%)',
                border: '1.5px solid var(--accent-gold)',
                borderRadius: '10px',
                padding: '12px 14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--accent-saffron)', marginBottom: '4px' }}>
                  <Sparkles size={13} />
                  <span>Brahma Muhurta (ब्रह्म मुहूर्त)</span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--accent-gold)' }}>
                  {panchang.timings.brahmaMuhurta}
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                  Prime hour for Dhyana & Mantra Japa
                </span>
              </div>

              {/* Sunrise */}
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: '10px',
                padding: '12px 14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#EA580C', marginBottom: '4px' }}>
                  <Sun size={13} />
                  <span>Suryodaya (सूर्योदय • Sunrise)</span>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {panchang.timings.sunrise}
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                  Gayatri Arghya & Surya Namaskar
                </span>
              </div>

              {/* Sunset */}
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: '10px',
                padding: '12px 14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#D97706', marginBottom: '4px' }}>
                  <Moon size={13} />
                  <span>Suryasta (सूर्यास्त • Sunset)</span>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {panchang.timings.sunset}
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                  Sandhya Vandana & Deepa Lighting
                </span>
              </div>

              {/* Abhijit Muhurta */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(26, 107, 99, 0.1) 0%, rgba(198, 146, 20, 0.08) 100%)',
                border: '1.5px solid var(--accent-teal)',
                borderRadius: '10px',
                padding: '12px 14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--accent-teal)', marginBottom: '4px' }}>
                  <CheckCircle size={13} />
                  <span>Abhijit Muhurta (अभिजित्)</span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--accent-teal)' }}>
                  {panchang.timings.abhijitMuhurta}
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                  Supreme Victory Window (Sarva Siddhi)
                </span>
              </div>

              {/* Rahu Kaal (Inauspicious Period) */}
              <div style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1.5px solid #EF4444',
                borderRadius: '10px',
                padding: '12px 14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#DC2626', marginBottom: '4px' }}>
                  <AlertTriangle size={13} />
                  <span>Rahu Kaalam (राहुकाल)</span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#DC2626' }}>
                  {panchang.timings.rahuKaal}
                </div>
                <span style={{ fontSize: '10px', color: '#991B1B', display: 'block', marginTop: '2px' }}>
                  Avoid starting new journeys / ventures
                </span>
              </div>

              {/* Yamaganda */}
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: '10px',
                padding: '12px 14px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Yamaganda (यमगण्ड)
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {panchang.timings.yamaganda}
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                  Inauspicious sub-period
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: FESTIVAL LIVE COUNTDOWNS & RITUAL GUIDES                */}
      {/* ============================================================== */}
      {activeTab === 'festivals' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* A. NEAREST UPCOMING FESTIVAL SHOWCASE CARD WITH LIVE COUNTDOWN */}
          {nearestFestival && (
            <div style={{
              background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%)',
              border: '2px solid var(--accent-gold)',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '20px'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{
                      background: 'var(--accent-saffron)',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '3px 10px',
                      borderRadius: '20px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase'
                    }}>
                      🌟 Next Major Hindu Festival
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--accent-gold)', fontWeight: 700 }}>
                      {nearestFestival.lunarTiming}
                    </span>
                  </div>

                  <h2 style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.7rem)',
                    fontWeight: 900,
                    color: 'var(--text-primary)',
                    fontFamily: "'Cinzel', Georgia, serif",
                    margin: '0 0 6px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <span>{nearestFestival.symbol}</span>
                    <span>{nearestFestival.name}</span>
                    <span style={{ fontSize: '1.3rem', color: 'var(--accent-saffron)', fontWeight: 600 }}>
                      ({nearestFestival.devanagari})
                    </span>
                  </h2>

                  <p style={{
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    margin: '0 0 16px 0',
                    maxWidth: '650px',
                    lineHeight: 1.5
                  }}>
                    {nearestFestival.tagline} • Presiding Deity: <strong>{nearestFestival.deity}</strong>
                  </p>

                  <button
                    onClick={() => setSelectedFestival(nearestFestival)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'linear-gradient(135deg, #d9531e 0%, #c69214 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '10px 22px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'transform 0.15s ease'
                    }}
                  >
                    <BookOpen size={16} />
                    <span>View Authentic Puja Vidhi & Fast Rules</span>
                  </button>
                </div>

                {/* 4-Block Live Countdown Clock */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center'
                }}>
                  <div style={{
                    background: 'var(--bg-secondary)',
                    border: '1.5px solid var(--accent-gold)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    textAlign: 'center',
                    minWidth: '76px',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{
                      fontSize: '32px',
                      fontWeight: 900,
                      color: 'var(--accent-saffron)',
                      fontFamily: "'Cinzel', Georgia, serif",
                      lineHeight: 1
                    }}>
                      {nearestFestival.countdown.days}
                    </div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                      Days
                    </span>
                  </div>

                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-gold)' }}>:</div>

                  <div style={{
                    background: 'var(--bg-secondary)',
                    border: '1.5px solid var(--accent-gold)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    textAlign: 'center',
                    minWidth: '76px',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{
                      fontSize: '32px',
                      fontWeight: 900,
                      color: 'var(--accent-saffron)',
                      fontFamily: "'Cinzel', Georgia, serif",
                      lineHeight: 1
                    }}>
                      {String(nearestFestival.countdown.hours).padStart(2, '0')}
                    </div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                      Hours
                    </span>
                  </div>

                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-gold)' }}>:</div>

                  <div style={{
                    background: 'var(--bg-secondary)',
                    border: '1.5px solid var(--accent-gold)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    textAlign: 'center',
                    minWidth: '76px',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{
                      fontSize: '32px',
                      fontWeight: 900,
                      color: 'var(--accent-saffron)',
                      fontFamily: "'Cinzel', Georgia, serif",
                      lineHeight: 1
                    }}>
                      {String(nearestFestival.countdown.minutes).padStart(2, '0')}
                    </div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                      Mins
                    </span>
                  </div>

                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-gold)' }}>:</div>

                  <div style={{
                    background: 'var(--bg-secondary)',
                    border: '1.5px solid var(--accent-gold)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    textAlign: 'center',
                    minWidth: '76px',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{
                      fontSize: '32px',
                      fontWeight: 900,
                      color: 'var(--accent-gold)',
                      fontFamily: "'Cinzel', Georgia, serif",
                      lineHeight: 1
                    }}>
                      {String(nearestFestival.countdown.seconds).padStart(2, '0')}
                    </div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                      Secs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* B. ALL MAJOR UPCOMING FESTIVALS GRID */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: "'Cinzel', Georgia, serif",
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>🪔</span>
              <span>All Major Sacred Hindu Mahotsavas</span>
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '20px'
            }}>
              {festivalsWithCountdowns.map((festival) => (
                <div
                  key={festival.id}
                  className="sanatan-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderTop: '3px solid var(--accent-saffron)'
                  }}
                >
                  <div>
                    {/* Header: Symbol, Title, Days Remaining */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '24px' }}>{festival.symbol}</span>
                        <div>
                          <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                            {festival.name}
                          </h4>
                          <span style={{ fontSize: '12px', color: 'var(--accent-saffron)', fontWeight: 700 }}>
                            {festival.devanagari}
                          </span>
                        </div>
                      </div>

                      <div style={{
                        background: 'rgba(217, 83, 30, 0.12)',
                        border: '1px solid rgba(217, 83, 30, 0.3)',
                        borderRadius: '8px',
                        padding: '4px 10px',
                        textAlign: 'right'
                      }}>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--accent-saffron)' }}>
                          in {festival.countdown.days} Days
                        </div>
                        <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          Countdown
                        </span>
                      </div>
                    </div>

                    <p style={{ fontSize: '12px', color: 'var(--accent-gold)', fontWeight: 600, margin: '0 0 8px 0' }}>
                      📍 {festival.lunarTiming} • Season: {festival.season}
                    </p>

                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 14px 0' }}>
                      {festival.tagline}
                    </p>

                    {/* Key Muhurta Highlight */}
                    <div style={{
                      background: 'var(--bg-secondary)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-light)',
                      marginBottom: '14px',
                      fontSize: '11px',
                      color: 'var(--text-secondary)'
                    }}>
                      <strong style={{ color: 'var(--accent-maroon)' }}>{festival.muhurta.title}: </strong>
                      <span>{festival.muhurta.time}</span>
                    </div>
                  </div>

                  {/* Action Button: Open Ritual Guide */}
                  <div style={{ paddingTop: '10px', borderTop: '1px solid var(--border-light)' }}>
                    <button
                      onClick={() => setSelectedFestival(festival)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid var(--accent-gold)',
                        background: 'var(--bg-card)',
                        color: 'var(--accent-saffron)',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <BookOpen size={14} />
                      <span>View Ritual Guide & Fasting Rules →</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: SACRED MUHURTAS & AUSPICIOUS TIMELINES                  */}
      {/* ============================================================== */}
      {activeTab === 'muhurtas' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            borderRadius: '14px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: "'Cinzel', Georgia, serif",
              marginBottom: '12px'
            }}>
              Understanding Vedic Muhurtas & Auspicious Timings
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
              In Sanatan Dharma, time is cyclical and charged with specific planetary and cosmic vibrations. Performing spiritual sadhana, mantra chanting, or major life ceremonies during auspicious Muhurtas harmonizes human intent with the macrocosm.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--accent-saffron)', margin: '0 0 6px 0' }}>
                  🌟 Brahma Muhurta (The Creator’s Hour)
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  Occurring exactly two Ghatikas (approx. 96 minutes) prior to sunrise. The atmosphere is saturated with pure Sattva Guna. The mind is naturally still, making this the supreme window for meditation, Pranayama, and studying sacred scriptures.
                </p>
              </div>

              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--accent-teal)', margin: '0 0 6px 0' }}>
                  ☀️ Abhijit Muhurta (The Hour of Victory)
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  Occurs daily during solar noon (8th Muhurta of the day). Blessed by Lord Vishnu, this 48-minute period neutralizes all minor astrological doshas and is ideal for commencing any auspicious deed without consulting further charts.
                </p>
              </div>

              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#DC2626', margin: '0 0 6px 0' }}>
                  ⚠️ Rahu Kaalam (Period of the Shadow Planet)
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  A daily 90-minute period ruled by the north lunar node Rahu. Classical texts advise avoiding the start of important travels, business agreements, or marriage rituals during this window. However, routine worship and daily prayers remain beneficial.
                </p>
              </div>

              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--accent-gold)', margin: '0 0 6px 0' }}>
                  🌙 Nishita Kaal (The Midnight Sanctum)
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  The midnight quarter, sacred to Lord Shiva (Maha Shivaratri), Lord Krishna (Janmashtami), and Maa Mahalakshmi (Diwali). Used for esoteric tantra, deep mantra sadhana, and inner realization.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. EXPANDABLE RITUAL GUIDE MODAL                               */}
      {/* ============================================================== */}
      {selectedFestival && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(26, 15, 8, 0.75)',
          backdropFilter: 'blur(6px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '2px solid var(--accent-gold)',
            borderRadius: '16px',
            maxWidth: '780px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '30px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedFestival(null)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)'
              }}
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '24px' }}>{selectedFestival.symbol}</span>
                <span style={{
                  background: 'rgba(217, 83, 30, 0.15)',
                  color: 'var(--accent-saffron)',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}>
                  {selectedFestival.category}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {selectedFestival.lunarTiming}
                </span>
              </div>

              <h2 style={{
                fontSize: '28px',
                fontWeight: 900,
                color: 'var(--text-primary)',
                fontFamily: "'Cinzel', Georgia, serif",
                margin: '0 0 4px 0'
              }}>
                {selectedFestival.name} ({selectedFestival.devanagari})
              </h2>
              <div style={{ fontSize: '14px', color: 'var(--accent-gold)', fontWeight: 600 }}>
                🔱 Presiding Deity: {selectedFestival.deity}
              </div>
            </div>

            {/* Muhurta Highlight Box */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(217, 83, 30, 0.1) 0%, rgba(198, 146, 20, 0.12) 100%)',
              border: '1.5px solid var(--accent-gold)',
              borderRadius: '10px',
              padding: '14px 18px',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--accent-saffron)', fontWeight: 700 }}>
                {selectedFestival.muhurta.title}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-maroon)', margin: '2px 0 4px 0' }}>
                {selectedFestival.muhurta.time}
              </div>
              {selectedFestival.muhurta.prahars && (
                <ul style={{ margin: '6px 0 0 16px', padding: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {selectedFestival.muhurta.prahars.map((p, idx) => (
                    <li key={idx} style={{ marginBottom: '2px' }}>{p}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Step-by-Step Puja Vidhi */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 800,
                color: 'var(--accent-maroon)',
                fontFamily: "'Cinzel', Georgia, serif",
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle size={18} color="var(--accent-gold)" />
                <span>Step-by-Step Authentic Puja Vidhi (पूजा विधि)</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedFestival.pujaVidhi.map(step => (
                  <div
                    key={step.step}
                    style={{
                      background: 'var(--bg-secondary)',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-light)'
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-saffron)', marginBottom: '3px' }}>
                      Step {step.step}: {step.title}
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fasting (Vrat) Rules */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 800,
                color: 'var(--accent-maroon)',
                fontFamily: "'Cinzel', Georgia, serif",
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Flame size={18} color="var(--accent-gold)" />
                <span>Vrat & Dietary Discipline (व्रत नियम)</span>
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '12px'
              }}>
                <div style={{
                  background: 'rgba(34, 197, 94, 0.08)',
                  border: '1px solid #22C55E',
                  borderRadius: '8px',
                  padding: '12px'
                }}>
                  <strong style={{ fontSize: '12px', color: '#15803D', display: 'block', marginBottom: '6px' }}>
                    ✓ Permitted Satvik Foods (Phalahar):
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#166534' }}>
                    {selectedFestival.fastingRules.allowed.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid #EF4444',
                  borderRadius: '8px',
                  padding: '12px'
                }}>
                  <strong style={{ fontSize: '12px', color: '#B91C1C', display: 'block', marginBottom: '6px' }}>
                    ✗ Strictly Prohibited:
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#991B1B' }}>
                    {selectedFestival.fastingRules.prohibited.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
                Parana (Fast Breaking): <strong>{selectedFestival.fastingRules.paranaTime}</strong>
              </div>
            </div>

            {/* Sacred Legends */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 800,
                color: 'var(--accent-maroon)',
                fontFamily: "'Cinzel', Georgia, serif",
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <BookOpen size={18} color="var(--accent-gold)" />
                <span>Puranic Legends & Spiritual Meaning (पौराणिक कथा)</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedFestival.sacredLegends.map((leg, idx) => (
                  <div
                    key={idx}
                    style={{
                      borderLeft: '3px solid var(--accent-gold)',
                      paddingLeft: '12px',
                      marginBottom: '8px'
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
                      {leg.title}
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      {leg.story}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Essential Mantras */}
            {selectedFestival.mantras && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  color: 'var(--accent-maroon)',
                  fontFamily: "'Cinzel', Georgia, serif",
                  marginBottom: '10px'
                }}>
                  🕉️ Sacred Mantras for Chanting
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedFestival.mantras.map((m, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'var(--bg-secondary)',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-light)'
                      }}
                    >
                      <div style={{
                        fontFamily: "'Noto Serif Devanagari', serif",
                        fontSize: '15px',
                        fontWeight: 700,
                        color: 'var(--accent-saffron)',
                        marginBottom: '2px'
                      }}>
                        {m.sanskrit}
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                        {m.meaning}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Close Button at Bottom */}
            <div style={{ textAlign: 'right', marginTop: '16px' }}>
              <button
                onClick={() => setSelectedFestival(null)}
                style={{
                  background: 'var(--accent-saffron)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Close Ritual Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

