import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  Search, 
  ExternalLink, 
  Navigation, 
  Calendar, 
  Info, 
  X, 
  ChevronRight,
  Shield,
  Layers
} from 'lucide-react';
import { tirthaData } from '../data/tirthaData';

// Custom Marker Colors based on category
function getCategoryColor(category) {
  switch (category) {
    case 'Jyotirlinga':
      return { bg: '#d9531e', border: '#f39c12', symbol: '🔱' }; // Shiva Trishula
    case 'Char Dham':
      return { bg: '#c69214', border: '#f1c40f', symbol: '🚩' }; // Sacred Flag
    case 'Pancha Bhoota Sthala':
      return { bg: '#1a6b63', border: '#2ecc71', symbol: '🌀' }; // Cosmic Element
    case 'Shakti Peetha':
      return { bg: '#801818', border: '#e74c3c', symbol: '🌸' }; // Sacred Lotus / Devi
    case 'Divya Desam':
      return { bg: '#5c2d91', border: '#9b59b6', symbol: '🪷' }; // Vishnu Shankha/Lotus
    default:
      return { bg: '#d9531e', border: '#f39c12', symbol: '🪔' };
  }
}

export default function TirthaYatraView({ onNavigate }) {
  const [selectedShrine, setSelectedShrine] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  const categories = [
    'All',
    'Jyotirlinga',
    'Char Dham',
    'Pancha Bhoota Sthala',
    'Shakti Peetha',
    'Divya Desam'
  ];

  const filteredShrines = tirthaData.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.presidingDeity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center on India (lat: 22.0, lng: 79.0)
      const map = L.map(mapContainerRef.current, {
        center: [21.8, 78.9],
        zoom: 5,
        minZoom: 4,
        maxZoom: 14,
        scrollWheelZoom: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => map.removeLayer(marker));
    markersRef.current = {};

    // Add filtered markers
    filteredShrines.forEach((shrine) => {
      const colors = getCategoryColor(shrine.category);

      const customIcon = L.divIcon({
        className: 'custom-temple-pin',
        html: `
          <div style="
            width: 34px;
            height: 34px;
            background: linear-gradient(135deg, ${colors.bg} 0%, #1a0f08 100%);
            border: 2px solid ${colors.border};
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            <span style="
              transform: rotate(45deg);
              font-size: 15px;
              line-height: 1;
              user-select: none;
            ">${colors.symbol}</span>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -32]
      });

      const marker = L.marker(shrine.coordinates, { icon: customIcon }).addTo(map);

      // Popup
      marker.bindPopup(`
        <div style="font-family: inherit; padding: 4px;">
          <strong style="color: #d9531e; font-size: 1.05rem; display: block; margin-bottom: 2px;">
            ${shrine.name}
          </strong>
          <span style="font-size: 0.8rem; color: #666; display: block; margin-bottom: 6px;">
            ${shrine.city}, ${shrine.state}
          </span>
          <span style="font-size: 0.78rem; background: #fff3ec; color: #d9531e; padding: 2px 8px; border-radius: 12px; font-weight: bold; border: 1px solid rgba(217, 83, 30, 0.2);">
            ${shrine.category}
          </span>
        </div>
      `);

      marker.on('click', () => {
        setSelectedShrine(shrine);
      });

      markersRef.current[shrine.id] = marker;
    });

    return () => {
      // Cleanup on component unmount
    };
  }, [filteredShrines]);

  // Zoom to shrine on selection
  const handleSelectShrine = (shrine) => {
    setSelectedShrine(shrine);
    if (mapInstanceRef.current && shrine.coordinates) {
      mapInstanceRef.current.flyTo(shrine.coordinates, 8, {
        animate: true,
        duration: 1.2
      });

      const marker = markersRef.current[shrine.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  const getGoogleMapsUrl = (shrine) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shrine.name + ' ' + shrine.city + ' ' + shrine.state)}`;
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '36px 20px', maxWidth: '1280px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 32px' }}>
        <span className="badge badge-saffron" style={{ marginBottom: '10px' }}>
          Tirtha Yatra • Sacred Geography of Bharatavarsha
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '12px', color: 'var(--text-primary)' }}>
          Interactive Sacred Geography Map
        </h1>
        <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Explore India's most venerated pilgrimage destinations: the <strong>12 Jyotirlingas</strong> of Shiva, 
          the <strong>Four Cardinal Dhams</strong>, the <strong>Pancha Bhoota Sthalas</strong> of the elements, 
          revered <strong>Shakti Peethas</strong>, and premier <strong>Divya Desams</strong>.
        </p>
      </div>

      {/* Control Bar: Categories & Search */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '14px',
        backgroundColor: 'var(--bg-card)',
        padding: '16px 20px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: 'var(--bg-secondary)',
          padding: '8px 14px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-light)',
          flex: '1 1 280px'
        }}>
          <Search size={18} color="var(--accent-gold)" />
          <input
            type="text"
            placeholder="Search by temple, deity, city, or state..."
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
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedShrine(null);
                }}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--accent-saffron)' : 'var(--border-light)',
                  backgroundColor: isSelected ? 'var(--accent-saffron)' : 'var(--bg-card)',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Map & Shrines Explorer Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedShrine ? '1fr 420px' : '1fr 340px',
        gap: '24px',
        minHeight: '620px'
      }} className="tirtha-layout">
        {/* Left: Interactive Map View */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid var(--border-strong)',
          boxShadow: 'var(--shadow-md)',
          position: 'relative',
          minHeight: '520px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Map Status Bar */}
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 1000,
            backgroundColor: 'var(--bg-card)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-strong)',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <MapPin size={14} color="var(--accent-saffron)" />
            Showing {filteredShrines.length} Sacred Shrines
          </div>

          {/* Leaflet DOM Node */}
          <div 
            ref={mapContainerRef} 
            style={{ 
              width: '100%', 
              height: '100%', 
              flex: 1, 
              minHeight: '520px',
              zIndex: 1
            }} 
          />

          {/* Legend Bar */}
          <div style={{
            padding: '10px 16px',
            backgroundColor: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '8px',
            fontSize: '0.76rem',
            color: 'var(--text-secondary)'
          }}>
            <span>🔱 Jyotirlinga</span>
            <span>🚩 Char Dham</span>
            <span>🌀 Pancha Bhoota</span>
            <span>🌸 Shakti Peetha</span>
            <span>🪷 Divya Desam</span>
          </div>
        </div>

        {/* Right: Shrine Detail Drawer OR Quick Shrines Sidebar */}
        {selectedShrine ? (
          <div style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-strong)',
            padding: '28px',
            boxShadow: 'var(--shadow-md)',
            overflowY: 'auto',
            maxHeight: '680px',
            animation: 'fadeIn 0.25s ease-out'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-gold" style={{ fontSize: '0.72rem', marginBottom: '6px' }}>
                  {selectedShrine.category}
                </span>
                <h2 style={{ fontSize: '1.45rem', color: 'var(--accent-saffron)', lineHeight: 1.2 }}>
                  {selectedShrine.name}
                </h2>
                <div style={{
                  fontFamily: 'var(--font-sanskrit)',
                  fontSize: '1.05rem',
                  color: 'var(--accent-gold)',
                  fontWeight: 600,
                  marginTop: '4px'
                }}>
                  {selectedShrine.sanskrit}
                </div>
              </div>
              <button
                onClick={() => setSelectedShrine(null)}
                className="btn btn-outline"
                style={{ width: '32px', height: '32px', padding: 0, borderRadius: '50%' }}
                title="Close Drawer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Presiding Deity & Location Info */}
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              padding: '14px',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '18px',
              fontSize: '0.88rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Presiding Deity: </strong>
                <span style={{ color: 'var(--text-secondary)' }}>{selectedShrine.presidingDeity}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Location: </strong>
                <span style={{ color: 'var(--text-secondary)' }}>{selectedShrine.city}, {selectedShrine.state}</span>
              </div>
              {selectedShrine.era && (
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Era & Antiquity: </strong>
                  <span style={{ color: 'var(--text-secondary)' }}>{selectedShrine.era}</span>
                </div>
              )}
            </div>

            {/* Legend & Puranic Story */}
            <div style={{ marginBottom: '18px' }}>
              <h3 style={{
                fontSize: '1.05rem',
                color: 'var(--accent-maroon)',
                marginBottom: '8px',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '4px'
              }}>
                Sacred Legend & Lore
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {selectedShrine.legend}
              </p>
            </div>

            {/* Founding History */}
            <div style={{ marginBottom: '18px' }}>
              <h3 style={{
                fontSize: '1.05rem',
                color: 'var(--accent-maroon)',
                marginBottom: '8px',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '4px'
              }}>
                Founding History
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {selectedShrine.foundingHistory}
              </p>
            </div>

            {/* Architecture */}
            <div style={{ marginBottom: '18px' }}>
              <h3 style={{
                fontSize: '1.05rem',
                color: 'var(--accent-maroon)',
                marginBottom: '8px',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '4px'
              }}>
                Architectural Highlights
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {selectedShrine.architecture}
              </p>
            </div>

            {/* Travel & Best Time */}
            <div style={{
              backgroundColor: 'var(--bg-surface)',
              padding: '14px',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '20px',
              fontSize: '0.86rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div>
                <strong style={{ color: 'var(--accent-saffron)' }}>Best Time to Visit: </strong>
                <span>{selectedShrine.bestTimeToVisit}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--accent-saffron)' }}>How to Reach: </strong>
                <span>{selectedShrine.howToReach}</span>
              </div>
            </div>

            {/* Navigation button */}
            <a
              href={getGoogleMapsUrl(selectedShrine)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', fontSize: '0.9rem' }}
            >
              <Navigation size={16} /> Open in Google Maps
            </a>
          </div>
        ) : (
          /* Shrines List Sidebar */
          <div style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            padding: '20px',
            boxShadow: 'var(--shadow-sm)',
            overflowY: 'auto',
            maxHeight: '680px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                Tirtha Directory ({filteredShrines.length})
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Click to locate</span>
            </div>

            {filteredShrines.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                No shrines match your criteria.
              </div>
            ) : (
              filteredShrines.map((shrine) => (
                <div
                  key={shrine.id}
                  onClick={() => handleSelectShrine(shrine)}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                    e.currentTarget.style.borderColor = 'var(--accent-gold)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span className="badge badge-gold" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                        {shrine.category}
                      </span>
                    </div>
                    <strong style={{ fontSize: '0.96rem', color: 'var(--text-primary)', display: 'block' }}>
                      {shrine.name}
                    </strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {shrine.city}, {shrine.state}
                    </span>
                  </div>
                  <ChevronRight size={18} color="var(--accent-saffron)" />
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .tirtha-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

