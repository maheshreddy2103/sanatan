import React, { useState } from 'react';
import { Sparkles, RefreshCw, Quote } from 'lucide-react';

const SHLOKAS = [
  {
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
    transliteration: 'karmaṇy-evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo \'stvakarmaṇi ||',
    translation: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, nor be attached to inaction.',
    source: 'Bhagavad Gita 2.47'
  },
  {
    sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥',
    transliteration: 'yadā yadā hi dharmasya glānir bhavati bhārata |\nabhyutthānam adharmasya tadātmānaṃ sṛjāmy aham ||',
    translation: 'Whenever and wherever there is a decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion—at that time I descend Myself.',
    source: 'Bhagavad Gita 4.7'
  },
  {
    sanskrit: 'एकं सद्विप्रा बहुधा वदन्ति ।',
    transliteration: 'ekaṃ sad viprā bahudhā vadanti |',
    translation: 'Truth is One, the wise call It by many names.',
    source: 'Rigveda 1.164.46'
  },
  {
    sanskrit: 'वसुधैव कुटुम्बकम् ।',
    transliteration: 'vasudhaiva kuṭumbakam |',
    translation: 'The whole world is one single divine family.',
    source: 'Maha Upanishad 6.71'
  },
  {
    sanskrit: 'आत्मवत् सर्वभूतेषु यः पश्यति स पश्यति ।',
    transliteration: 'ātmavat sarva-bhūteṣu yaḥ paśyati sa paśyati |',
    translation: 'He who sees all beings in himself and himself in all beings, truly sees.',
    source: 'Isha Upanishad 6'
  },
  {
    sanskrit: 'सत्यमेव जयते नानृतम् ।',
    transliteration: 'satyameva jayate nānṛtam |',
    translation: 'Truth alone triumphs, never untruth.',
    source: 'Mundaka Upanishad 3.1.6'
  }
];

export default function DailyWisdom() {
  const [index, setIndex] = useState(0);

  const nextShloka = () => {
    setIndex((prev) => (prev + 1) % SHLOKAS.length);
  };

  const current = SHLOKAS[index];

  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      padding: '24px 28px',
      boxShadow: 'var(--shadow-sm)',
      position: 'relative',
      margin: '30px 0'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="var(--accent-gold)" />
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.9rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--accent-saffron)'
          }}>
            Eternal Vedic Wisdom
          </span>
        </div>
        <button
          onClick={nextShloka}
          className="btn btn-outline"
          style={{
            padding: '6px 12px',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          title="Next Shloka"
        >
          <RefreshCw size={14} />
          <span>New Verse</span>
        </button>
      </div>

      <div style={{
        fontFamily: 'var(--font-sanskrit)',
        fontSize: '1.25rem',
        color: 'var(--text-primary)',
        lineHeight: 1.8,
        whiteSpace: 'pre-line',
        marginBottom: '10px',
        fontWeight: 600
      }}>
        {current.sanskrit}
      </div>

      <div style={{
        fontSize: '0.88rem',
        color: 'var(--accent-gold)',
        fontStyle: 'italic',
        marginBottom: '12px',
        whiteSpace: 'pre-line'
      }}>
        {current.transliteration}
      </div>

      <div style={{
        fontSize: '1rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
        marginBottom: '12px',
        borderLeft: '3px solid var(--accent-saffron)',
        paddingLeft: '14px'
      }}>
        "{current.translation}"
      </div>

      <div style={{
        textAlign: 'right',
        fontSize: '0.82rem',
        fontWeight: 700,
        color: 'var(--accent-saffron)'
      }}>
        — {current.source}
      </div>
    </div>
  );
}

