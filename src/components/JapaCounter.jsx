import React, { useState } from 'react';
import { Volume2, VolumeX, RotateCcw, Award } from 'lucide-react';
import { playTempleBell } from '../utils/sound';

export default function JapaCounter({ mantraName = 'Universal Mantra' }) {
  const [count, setCount] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleChant = () => {
    if (soundEnabled) {
      // Bell pitch varies slightly towards 108
      const freq = 432 + (count % 108) * 0.8;
      playTempleBell(freq);
    }

    if (count + 1 === 108) {
      setCount(0);
      setRounds(r => r + 1);
    } else {
      setCount(c => c + 1);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleFullReset = () => {
    setCount(0);
    setRounds(0);
  };

  const progressPercent = Math.round((count / 108) * 100);

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      boxShadow: 'var(--shadow-md)',
      maxWidth: '440px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <span className="badge badge-gold">
          Japa Mala • 108 Beads
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="btn btn-outline"
            style={{ width: '32px', height: '32px', padding: 0, borderRadius: '50%' }}
            title={soundEnabled ? 'Mute Chime' : 'Enable Chime'}
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
          <button
            onClick={handleReset}
            className="btn btn-outline"
            style={{ width: '32px', height: '32px', padding: 0, borderRadius: '50%' }}
            title="Reset Current Mala"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.2rem',
        marginBottom: '6px',
        color: 'var(--accent-saffron)'
      }}>
        {mantraName}
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
        Click bead button or press to count each repetition
      </p>

      {/* Main Counter Bead Button */}
      <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 20px' }}>
        {/* SVG Progress Circle */}
        <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="90"
            cy="90"
            r="80"
            stroke="var(--bg-surface)"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="90"
            cy="90"
            r="80"
            stroke="var(--accent-gold)"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 80}
            strokeDashoffset={2 * Math.PI * 80 * (1 - count / 108)}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.15s ease' }}
          />
        </svg>

        {/* Interactive Center Button */}
        <button
          onClick={handleChant}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #d9531e 0%, #b3390c 100%)',
            border: '4px solid var(--accent-gold)',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(217, 83, 30, 0.4)',
            transition: 'transform 0.1s ease',
            outline: 'none'
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.94)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          onTouchStart={(e) => { e.currentTarget.style.transform = 'scale(0.94)'; }}
          onTouchEnd={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <span style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, fontFamily: 'var(--font-heading)' }}>
            {count}
          </span>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', opacity: 0.9, textTransform: 'uppercase' }}>
            / 108
          </span>
        </button>
      </div>

      {/* Progress & Rounds summary */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '12px 16px',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.9rem'
      }}>
        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>Progress</span>
          <strong style={{ color: 'var(--text-primary)' }}>{progressPercent}%</strong>
        </div>
        <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border-light)' }}></div>
        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>Completed Malas</span>
          <strong style={{ color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
            <Award size={15} />
            {rounds} Rounds
          </strong>
        </div>
      </div>

      {rounds > 0 && (
        <button
          onClick={handleFullReset}
          style={{
            marginTop: '12px',
            background: 'none',
            border: 'none',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Clear all rounds
        </button>
      )}
    </div>
  );
}

