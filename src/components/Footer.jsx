import React from 'react';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-strong)',
      marginTop: '80px',
      padding: '60px 0 30px',
      color: 'var(--text-secondary)'
    }}>
      <div className="container">
        {/* Shloka Banner */}
        <div style={{
          textAlign: 'center',
          padding: '24px',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          marginBottom: '50px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <p style={{
            fontFamily: 'var(--font-sanskrit)',
            fontSize: '1.25rem',
            color: 'var(--accent-saffron)',
            fontWeight: 600,
            marginBottom: '6px'
          }}>
            ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥
          </p>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            May all beings everywhere be happy and free from disease; may all perceive what is auspicious; may no one suffer.
          </p>
        </div>

        {/* Footer 4 Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Col 1: About Sanatan */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '16px'
            }}>
              <span style={{
                fontFamily: 'var(--font-sanskrit)',
                fontSize: '1.6rem',
                color: 'var(--accent-gold)'
              }}>ॐ</span>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Sanatan Dharma</h3>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              An eternal journey through spirituality, timeless philosophies, revered sages, and divine traditions of one of the world's most ancient paths of wisdom.
            </p>
          </div>

          {/* Col 2: Spiritual Explorations */}
          <div>
            <h4 style={{
              fontSize: '1rem',
              color: 'var(--text-primary)',
              marginBottom: '16px',
              borderBottom: '2px solid var(--accent-gold)',
              paddingBottom: '6px',
              display: 'inline-block'
            }}>
              Sacred Portals
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><a href="#/deities" onClick={(e) => { e.preventDefault(); onNavigate('#/deities'); }}>Devi & Devatas (34 Deities)</a></li>
              <li><a href="#/sages" onClick={(e) => { e.preventDefault(); onNavigate('#/sages'); }}>Gurus & Rishis (63 Masters)</a></li>
              <li><a href="#/texts" onClick={(e) => { e.preventDefault(); onNavigate('#/texts'); }}>Sacred Texts & Vedas</a></li>
              <li><a href="#/traditions" onClick={(e) => { e.preventDefault(); onNavigate('#/traditions'); }}>Living Dharma (Practices & Festivals)</a></li>
              <li><a href="#/mantras" onClick={(e) => { e.preventDefault(); onNavigate('#/mantras'); }}>Mantras & Japa Studio</a></li>
            </ul>
          </div>

          {/* Col 3: Interactive Tools */}
          <div>
            <h4 style={{
              fontSize: '1rem',
              color: 'var(--text-primary)',
              marginBottom: '16px',
              borderBottom: '2px solid var(--accent-gold)',
              paddingBottom: '6px',
              display: 'inline-block'
            }}>
              Interactive Hub
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><a href="#/tirtha" onClick={(e) => { e.preventDefault(); onNavigate('#/tirtha'); }}>Tirtha Yatra (Sacred Map)</a></li>
              <li><a href="#/genealogy" onClick={(e) => { e.preventDefault(); onNavigate('#/genealogy'); }}>Vamshavali (Lineage Tree)</a></li>
              <li><a href="#/quiz" onClick={(e) => { e.preventDefault(); onNavigate('#/quiz'); }}>Jnana Quiz & Flashcards</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Inquiries */}
          <div>
            <h4 style={{
              fontSize: '1rem',
              color: 'var(--text-primary)',
              marginBottom: '16px',
              borderBottom: '2px solid var(--accent-gold)',
              paddingBottom: '6px',
              display: 'inline-block'
            }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="var(--accent-saffron)" />
                <a href="mailto:pallemaheshreddy@gmail.com" style={{ color: 'var(--text-secondary)' }}>
                  pallemaheshreddy@gmail.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="var(--accent-saffron)" />
                <span>+91 7672023472</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} color="var(--accent-saffron)" />
                <span>123 Dharma Street, City, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '24px',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div>
            &copy; {new Date().getFullYear()} Sanatan Dharma Portal. Preserving and sharing timeless heritage.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Crafted with devotion & React</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

