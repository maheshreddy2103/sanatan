import React, { useState } from 'react';
import { Sparkles, LayoutGrid, Table, Search, ArrowRight } from 'lucide-react';
import { deitiesData } from '../data/deitiesData';

export default function DeitiesView({ onNavigate }) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredDeities = deitiesData.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.knownFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.vahana.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Trimurti & Tridevi') {
      return ['brahma', 'vishnu', 'shiva', 'saraswati', 'lakshmi', 'parvati'].includes(d.id);
    }
    if (selectedFilter === 'Navagrahas') {
      return ['surya', 'chandra', 'mangala', 'budha', 'brihaspati', 'shukra', 'shani', 'rahu', 'ketu'].includes(d.id);
    }
    if (selectedFilter === 'Vedic & Elements') {
      return ['agni', 'vayu', 'indra', 'yama', 'prithvi', 'ganga'].includes(d.id);
    }
    return true;
  });

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
        <span className="badge badge-saffron" style={{ marginBottom: '10px' }}>
          Divine Pantheon of Sanatan Dharma
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '14px', color: 'var(--text-primary)' }}>
          Devi & Devatas
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          In Sanatan Dharma, the countless deities reflect the endless attributes, energies, and compassion of the single, all-pervading Supreme Reality (Brahman).
        </p>
      </div>

      {/* Controls Bar: Search, Filters, and View Switcher */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        backgroundColor: 'var(--bg-card)',
        padding: '16px 20px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        marginBottom: '32px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: 'var(--bg-secondary)',
          padding: '8px 14px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-light)',
          flex: '1 1 260px'
        }}>
          <Search size={18} color="var(--accent-gold)" />
          <input
            type="text"
            placeholder="Search deities by name, vahana, or attribute..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '0.92rem',
              color: 'var(--text-primary)',
              width: '100%',
              fontFamily: 'var(--font-body)'
            }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['All', 'Trimurti & Tridevi', 'Navagrahas', 'Vedic & Elements'].map(f => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid',
                borderColor: selectedFilter === f ? 'var(--accent-saffron)' : 'var(--border-light)',
                backgroundColor: selectedFilter === f ? 'var(--accent-saffron)' : 'var(--bg-card)',
                color: selectedFilter === f ? '#fff' : 'var(--text-secondary)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div style={{ display: 'flex', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              padding: '8px 12px',
              border: 'none',
              backgroundColor: viewMode === 'grid' ? 'var(--accent-gold)' : 'var(--bg-card)',
              color: viewMode === 'grid' ? '#120e0c' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              fontWeight: 600
            }}
            title="Card Grid View"
          >
            <LayoutGrid size={16} /> Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            style={{
              padding: '8px 12px',
              border: 'none',
              borderLeft: '1px solid var(--border-strong)',
              backgroundColor: viewMode === 'table' ? 'var(--accent-gold)' : 'var(--bg-card)',
              color: viewMode === 'table' ? '#120e0c' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              fontWeight: 600
            }}
            title="Classical Table View"
          >
            <Table size={16} /> Table
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {filteredDeities.map((deity) => (
            <div
              key={deity.id}
              onClick={() => onNavigate(`#/deities/${deity.id}`)}
              className="sanatan-card"
              style={{ cursor: 'pointer', padding: 0 }}
            >
              <div style={{
                height: '240px',
                backgroundColor: 'var(--bg-surface)',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {(deity.image || deity.onlineImage) ? (
                  <img
                    src={deity.image || deity.onlineImage}
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
                      if (deity.onlineImage && e.currentTarget.src !== deity.onlineImage) {
                        e.currentTarget.src = deity.onlineImage;
                      }
                    }}
                  />
                ) : (
                  <div style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-sanskrit)',
                    fontSize: '4.5rem',
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
                <h3 style={{ fontSize: '1.3rem', marginBottom: '6px', color: 'var(--text-primary)' }}>
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
                  {deity.detail?.fullText || `Revered deity in Sanatan Dharma representing ${deity.knownFor}.`}
                </p>

                <div style={{
                  marginTop: '16px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.82rem',
                  color: 'var(--accent-gold)',
                  fontWeight: 700
                }}>
                  <span>Read Complete Sacred Lore</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Classical Table View */
        <div style={{ overflowX: 'auto' }}>
          <table className="classical-table">
            <thead>
              <tr>
                <th style={{ width: '30%' }}>God / Goddess Name</th>
                <th style={{ width: '25%' }}>Vahana (Mount)</th>
                <th style={{ width: '35%' }}>Known For / Domain</th>
                <th style={{ width: '10%', textAlign: 'center' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeities.map((deity) => (
                <tr
                  key={deity.id}
                  onClick={() => onNavigate(`#/deities/${deity.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {deity.image && (
                        <img
                          src={deity.image}
                          alt={deity.name}
                          style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      )}
                      <strong>{deity.name}</strong>
                    </div>
                  </td>
                  <td>{deity.vahana}</td>
                  <td>{deity.knownFor}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ color: 'var(--accent-saffron)', fontWeight: 700, fontSize: '0.9rem' }}>
                      Explore &rarr;
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

