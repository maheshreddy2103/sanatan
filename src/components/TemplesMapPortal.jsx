import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Search, 
  MapPin, 
  Compass, 
  Sparkles, 
  Layers, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Info, 
  X, 
  ChevronRight, 
  SlidersHorizontal,
  Landmark,
  Eye,
  ArrowUpRight,
  Filter,
  Navigation,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { 
  TOTAL_MAPPED_TEMPLES, 
  STATE_TEMPLE_STATS, 
  ALL_ICONIC_TEMPLES, 
  STATE_BY_ID 
} from '../data/templesPortalData';
import { getTempleCoordinates } from '../data/templeCoordinates';
import indiaStatesGeo from '../data/indiaStatesGeo.json';
import { playTempleBell } from '../utils/sound';

// ---------------------------------------------------------------------------
// TRADITIONAL SANATAN TEMPLE DENSITY TIER PALETTE
// ---------------------------------------------------------------------------
const TIER_CONFIG = {
  5: {
    color: '#D97706',      // Suvarna Temple Gold
    fillColor: '#F59E0B',
    fillOpacity: 0.35,
    border: '#B45309',
    label: 'Tier 5 (60k+ Temples)',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    textColor: '#B45309'
  },
  4: {
    color: '#EA580C',      // Sacred Kesariya Saffron
    fillColor: '#EA580C',
    fillOpacity: 0.28,
    border: '#9A3412',
    label: 'Tier 4 (25k–60k Temples)',
    badgeBg: 'rgba(234, 88, 12, 0.15)',
    textColor: '#9A3412'
  },
  3: {
    color: '#D97706',      // Auspicious Haldi / Turmeric
    fillColor: '#FBBF24',
    fillOpacity: 0.22,
    border: '#B45309',
    label: 'Tier 3 (10k–25k Temples)',
    badgeBg: 'rgba(217, 119, 6, 0.15)',
    textColor: '#78350F'
  },
  2: {
    color: '#B45309',      // Sacred Sandalwood / Chandan Amber
    fillColor: '#E29342',
    fillOpacity: 0.16,
    border: '#A16207',
    label: 'Tier 2 (2k–10k Temples)',
    badgeBg: 'rgba(180, 83, 9, 0.15)',
    textColor: '#451A03'
  },
  1: {
    color: '#854D0E',      // Sacred Terracotta / Clay
    fillColor: '#E07A5F',
    fillOpacity: 0.12,
    border: '#993B26',
    label: 'Tier 1 (< 2k Temples)',
    badgeBg: 'rgba(133, 77, 14, 0.15)',
    textColor: '#7C2D12'
  }
};

// Custom Temple Pin configuration by deity
export function getTemplePinConfig(temple) {
  const d = ((temple.deity || '') + ' ' + (temple.name || '')).toLowerCase();
  if (d.includes('shiva') || d.includes('mahadev') || d.includes('linga') || d.includes('kedar') || d.includes('somnath') || d.includes('sundareswarar') || d.includes('trimbak') || d.includes('omkareshwar') || d.includes('mallikarjuna') || d.includes('baidyanath') || d.includes('kashi') || d.includes('mahakal')) {
    return { bg: '#d9531e', border: '#f39c12', symbol: '🔱', category: 'Shiva' }; // Shiva Trishula
  }
  if (d.includes('vishnu') || d.includes('krishna') || d.includes('rama') || d.includes('venkateswara') || d.includes('ranganatha') || d.includes('jagannath') || d.includes('padmanabha') || d.includes('dwarkadhish') || d.includes('badri') || d.includes('govind') || d.includes('banke')) {
    return { bg: '#1e3a8a', border: '#60a5fa', symbol: '🪷', category: 'Vishnu' }; // Vishnu Lotus / Sacred Shankha
  }
  if (d.includes('devi') || d.includes('shakti') || d.includes('parvati') || d.includes('durga') || d.includes('kali') || d.includes('meenakshi') || d.includes('kamakhya') || d.includes('vaishno') || d.includes('mahalakshmi') || d.includes('bhavani') || d.includes('ambaji') || d.includes('tarapith')) {
    return { bg: '#801818', border: '#f87171', symbol: '🌸', category: 'Shakti' }; // Devi / Shakti
  }
  if (d.includes('surya') || d.includes('sun') || d.includes('brahma') || d.includes('char dham') || d.includes('tirtha')) {
    return { bg: '#c69214', border: '#fde047', symbol: '🚩', category: 'Surya / Dham' }; // Sacred Flag
  }
  if (d.includes('ganesha') || d.includes('ganapati') || d.includes('vinayak') || d.includes('murugan') || d.includes('kartikeya') || d.includes('subrahmanya')) {
    return { bg: '#ea580c', border: '#f59e0b', symbol: '🪔', category: 'Ganapati / Murugan' }; // Sacred Diya
  }
  return { bg: '#b45309', border: '#fde047', symbol: '🪔', category: 'Sanctum' };
}

function normalizeName(name) {
  if (!name) return '';
  return name.toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\(nct\)/g, '')
    .replace(/islands/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const NORMALIZED_STATE_MAP = STATE_TEMPLE_STATS.reduce((acc, s) => {
  acc[normalizeName(s.name)] = s;
  return acc;
}, {});

function getStateForFeature(feature) {
  const rawName = feature?.properties?.ST_NM || feature?.properties?.NAME_1 || feature?.properties?.name;
  return NORMALIZED_STATE_MAP[normalizeName(rawName)] || null;
}

// Smooth animated count-up hook
function useAnimatedCount(targetNumber, duration = 900) {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let initialCount = displayCount;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(initialCount + (targetNumber - initialCount) * ease);
      
      setDisplayCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayCount(targetNumber);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetNumber, duration]);

  return displayCount;
}

// ---------------------------------------------------------------------------
// MAIN TEMPLES MAP PORTAL COMPONENT
// ---------------------------------------------------------------------------
export default function TemplesMapPortal({ onNavigate }) {
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [viewMode, setViewMode] = useState('macro'); // 'macro' (All India) | 'micro' (State zoom)
  const [showAllIndiaPins, setShowAllIndiaPins] = useState(false);
  const [hoveredStateId, setHoveredStateId] = useState(null);
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeityFilter, setSelectedDeityFilter] = useState('All');
  const [selectedEraFilter, setSelectedEraFilter] = useState('All');
  const [sidebarTab, setSidebarTab] = useState('analytics'); // 'analytics' | 'search'

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const geoJsonLayerRef = useRef(null);
  const markersGroupRef = useRef(null);
  const stateLayersMapRef = useRef({});
  const markerByTempleIdRef = useRef({});

  const activeState = useMemo(() => {
    return selectedStateId ? STATE_BY_ID[selectedStateId] : null;
  }, [selectedStateId]);

  const targetCount = activeState ? activeState.templeCount : TOTAL_MAPPED_TEMPLES;
  const animatedNumber = useAnimatedCount(targetCount, 800);

  const triggerBell = (freq = 528) => {
    if (soundEnabled) {
      try {
        playTempleBell(freq);
      } catch (e) {
        // audio safeguard
      }
    }
  };

  // Distinct Dynasties/Eras for filtering
  const distinctEras = useMemo(() => {
    const set = new Set();
    ALL_ICONIC_TEMPLES.forEach(t => {
      if (t.era) {
        const parts = t.era.split(/[,\/&()]/);
        parts.forEach(p => {
          const cleaned = p.trim();
          if (cleaned.length > 3 && !cleaned.toLowerCase().includes('century')) {
            set.add(cleaned);
          }
        });
      }
    });
    return Array.from(set).slice(0, 10);
  }, []);

  // Filtered iconic temples for search tab
  const filteredIconicTemples = useMemo(() => {
    return ALL_ICONIC_TEMPLES.filter(temple => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        temple.name.toLowerCase().includes(q) ||
        temple.city.toLowerCase().includes(q) ||
        temple.state.toLowerCase().includes(q) ||
        temple.deity.toLowerCase().includes(q) ||
        (temple.era && temple.era.toLowerCase().includes(q))
      );

      const matchesDeity = selectedDeityFilter === 'All' || (() => {
        const d = (temple.deity || '').toLowerCase();
        if (selectedDeityFilter === 'Shiva') return d.includes('shiva') || d.includes('mahadev') || d.includes('linga');
        if (selectedDeityFilter === 'Vishnu') return d.includes('vishnu') || d.includes('krishna') || d.includes('rama') || d.includes('venkateswara') || d.includes('ranganatha') || d.includes('jagannath');
        if (selectedDeityFilter === 'Shakti') return d.includes('devi') || d.includes('shakti') || d.includes('durga') || d.includes('kali') || d.includes('meenakshi');
        return true;
      })();

      const matchesEra = selectedEraFilter === 'All' || (temple.era && temple.era.includes(selectedEraFilter));

      return matchesSearch && matchesDeity && matchesEra;
    });
  }, [searchQuery, selectedDeityFilter, selectedEraFilter]);

  // National rank of active state
  const activeStateRank = useMemo(() => {
    if (!activeState) return null;
    const sorted = [...STATE_TEMPLE_STATS].sort((a, b) => b.templeCount - a.templeCount);
    const idx = sorted.findIndex(s => s.id === activeState.id);
    return idx >= 0 ? idx + 1 : null;
  }, [activeState]);

  // -------------------------------------------------------------------------
  // INITIALIZE LEAFLET MAP WITH OPENSTREETMAP & TRADITIONAL SACRED STYLING
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center of India: Lat 21.8, Lng 78.9
      const map = L.map(mapContainerRef.current, {
        center: [21.8, 78.9],
        zoom: 5,
        minZoom: 4,
        maxZoom: 14,
        scrollWheelZoom: true
      });

      // Standard OpenStreetMap Tiles (Crisp, authentic real geography of India)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors • Sacred Temples of Bharat'
      }).addTo(map);

      // Layer group for iconic temple teardrop pins
      const markersGroup = L.layerGroup().addTo(map);
      markersGroupRef.current = markersGroup;

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Remove existing GeoJSON layer if any
    if (geoJsonLayerRef.current) {
      map.removeLayer(geoJsonLayerRef.current);
    }
    stateLayersMapRef.current = {};

    // Render Real Geographic GeoJSON Layer (Soft Traditional Temple Density Wash)
    const geoLayer = L.geoJSON(indiaStatesGeo, {
      style: (feature) => {
        const state = getStateForFeature(feature);
        const tier = state?.densityTier || 1;
        const config = TIER_CONFIG[tier];
        const isSelected = selectedStateId === state?.id;

        return {
          fillColor: isSelected ? '#F59E0B' : config.fillColor,
          fillOpacity: isSelected ? 0.45 : (viewMode === 'micro' && selectedStateId ? 0.08 : config.fillOpacity),
          color: isSelected ? '#B45309' : config.border,
          weight: isSelected ? 2.5 : 1.2,
          className: 'india-state-polygon'
        };
      },
      onEachFeature: (feature, layer) => {
        const state = getStateForFeature(feature);
        if (!state) return;

        stateLayersMapRef.current[state.id] = layer;

        // Rich traditional tooltip on hover
        layer.bindTooltip(`
          <div style="
            font-family: 'Cinzel', Georgia, serif;
            padding: 4px 6px;
            color: #2B1D15;
            min-width: 140px;
          ">
            <div style="font-weight: 800; font-size: 13px; color: #801818; display: flex; align-items: center; justify-content: space-between;">
              <span>${state.name}</span>
              <span style="font-size: 10px; background: rgba(217, 83, 30, 0.12); color: #D9531E; padding: 1px 5px; border-radius: 4px;">Tier ${state.densityTier}</span>
            </div>
            <div style="font-size: 12px; margin-top: 3px; font-weight: 700; color: #D97706;">
              ${state.templeCount.toLocaleString('en-IN')} Temples
            </div>
            <div style="font-size: 10px; color: #634F43;">
              Avg: ${state.templesPerLakh.toFixed(1)} / 1 Lakh Pop
            </div>
            <div style="font-size: 10px; color: #B45309; margin-top: 2px;">
              🔱 Top: ${state.topPick}
            </div>
          </div>
        `, {
          sticky: true,
          direction: 'auto',
          className: 'sacred-state-tooltip'
        });

        layer.on({
          mouseover: (e) => {
            const l = e.target;
            l.setStyle({
              weight: 2.8,
              color: '#D4AF37',
              fillOpacity: 0.55
            });
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
              l.bringToFront();
            }
            setHoveredStateId(state.id);
          },
          mouseout: (e) => {
            const isSelected = selectedStateId === state.id;
            const tier = state.densityTier || 1;
            const config = TIER_CONFIG[tier];
            e.target.setStyle({
              fillColor: isSelected ? '#F59E0B' : config.fillColor,
              fillOpacity: isSelected ? 0.45 : (viewMode === 'micro' && selectedStateId ? 0.08 : config.fillOpacity),
              color: isSelected ? '#B45309' : config.border,
              weight: isSelected ? 2.5 : 1.2
            });
            setHoveredStateId(null);
          },
          click: (e) => {
            L.DomEvent.stopPropagation(e);
            handleSelectState(state.id);
            map.fitBounds(e.target.getBounds(), {
              padding: [35, 35],
              maxZoom: 8,
              animate: true,
              duration: 1
            });
          }
        });
      }
    }).addTo(map);

    geoJsonLayerRef.current = geoLayer;
  }, []);

  // Update GeoJSON layer styling when state selection changes
  useEffect(() => {
    if (!geoJsonLayerRef.current) return;

    geoJsonLayerRef.current.eachLayer((layer) => {
      const state = getStateForFeature(layer.feature);
      if (!state) return;

      const isSelected = selectedStateId === state.id;
      const tier = state.densityTier || 1;
      const config = TIER_CONFIG[tier];

      layer.setStyle({
        fillColor: isSelected ? '#F59E0B' : config.fillColor,
        fillOpacity: isSelected ? 0.45 : (viewMode === 'micro' && selectedStateId ? 0.08 : config.fillOpacity),
        color: isSelected ? '#B45309' : config.border,
        weight: isSelected ? 2.5 : 1.2
      });

      if (isSelected && !L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    });
  }, [selectedStateId, viewMode]);

  // -------------------------------------------------------------------------
  // RENDER ICONIC TEMPLE TEARDROP PINS (EXACTLY AS USER REQUESTED)
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!markersGroupRef.current) return;
    const markersGroup = markersGroupRef.current;
    markersGroup.clearLayers();
    markerByTempleIdRef.current = {};

    // Determine which temples to pin:
    // 1. If showAllIndiaPins is true: all 88 iconic temples across India
    // 2. If in Micro view with an active state: all iconic temples of that state
    // 3. If user searched in the search tab: pin filtered temples
    let templesToRender = [];
    if (showAllIndiaPins) {
      templesToRender = ALL_ICONIC_TEMPLES;
    } else if (viewMode === 'micro' && activeState) {
      templesToRender = activeState.iconicTemples.map(t => ({
        ...t,
        stateId: activeState.id,
        stateName: activeState.name
      }));
    } else if (searchQuery.trim().length > 1) {
      templesToRender = filteredIconicTemples.slice(0, 30);
    }

    templesToRender.forEach((temple) => {
      const coords = getTempleCoordinates(temple.id);
      if (!coords) return;

      const pinConfig = getTemplePinConfig(temple);
      const isTempleSelected = selectedTemple?.id === temple.id;

      // Authentic teardrop marker pin with deity icon (matching Tirtha Yatra map)
      const customIcon = L.divIcon({
        className: 'custom-sacred-temple-pin',
        html: `
          <div style="
            width: ${isTempleSelected ? '40px' : '34px'};
            height: ${isTempleSelected ? '40px' : '34px'};
            background: linear-gradient(135deg, ${pinConfig.bg} 0%, #1a0f08 100%);
            border: 2px solid ${isTempleSelected ? '#FFFFFF' : pinConfig.border};
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45)${isTempleSelected ? ', 0 0 16px ' + pinConfig.border : ''};
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            <span style="
              transform: rotate(45deg);
              font-size: ${isTempleSelected ? '17px' : '15px'};
              line-height: 1;
              user-select: none;
            ">${pinConfig.symbol}</span>
          </div>
        `,
        iconSize: isTempleSelected ? [40, 40] : [34, 34],
        iconAnchor: isTempleSelected ? [20, 40] : [17, 34],
        popupAnchor: [0, -32]
      });

      const marker = L.marker(coords, { icon: customIcon });

      // Rich popup
      marker.bindPopup(`
        <div style="font-family: inherit; padding: 4px; min-width: 180px;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
            <span style="font-size: 14px;">${pinConfig.symbol}</span>
            <strong style="color: #d9531e; font-size: 1.05rem; line-height: 1.2;">
              ${temple.name}
            </strong>
          </div>
          <span style="font-size: 0.8rem; color: #666; display: block; margin-bottom: 6px;">
            📍 ${temple.city}, ${temple.state || activeState?.name || ''}
          </span>
          <div style="font-size: 0.8rem; color: #2B1D15; margin-bottom: 6px; font-weight: 500;">
            🔱 <em>${temple.deity}</em>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
            <span style="font-size: 0.74rem; background: #fff3ec; color: #d9531e; padding: 2px 8px; border-radius: 12px; font-weight: bold; border: 1px solid rgba(217, 83, 30, 0.2);">
              ${temple.era ? temple.era.split(/[,\/]/)[0] : 'Historical Temple'}
            </span>
          </div>
        </div>
      `);

      marker.on('click', () => {
        handleSelectTemple(temple);
      });

      markersGroup.addLayer(marker);
      markerByTempleIdRef.current[temple.id] = marker;
    });
  }, [viewMode, activeState, showAllIndiaPins, searchQuery, selectedTemple, filteredIconicTemples]);

  // State selection handler
  const handleSelectState = (stateId) => {
    setSelectedStateId(stateId);
    setViewMode('micro');
    setShowAllIndiaPins(false);
    triggerBell(528);

    if (mapInstanceRef.current && stateLayersMapRef.current[stateId]) {
      const layer = stateLayersMapRef.current[stateId];
      mapInstanceRef.current.fitBounds(layer.getBounds(), {
        padding: [35, 35],
        maxZoom: 8,
        animate: true,
        duration: 1
      });
    }
  };

  // Reset to Macro View (All India)
  const handleResetToAllIndia = () => {
    setSelectedStateId(null);
    setViewMode('macro');
    setSelectedTemple(null);
    triggerBell(432);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([21.8, 78.9], 5, {
        animate: true,
        duration: 1.2
      });
    }
  };

  // Select temple handler
  const handleSelectTemple = (temple) => {
    setSelectedTemple(temple);
    triggerBell(640);

    const coords = getTempleCoordinates(temple.id);
    if (mapInstanceRef.current && coords) {
      mapInstanceRef.current.flyTo(coords, 9, {
        animate: true,
        duration: 1
      });

      const marker = markerByTempleIdRef.current[temple.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  const getGoogleMapsUrl = (temple) => {
    const q = `${temple.name} ${temple.city} ${temple.state || ''}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  };

  return (
    <div style={{
      maxWidth: '1360px',
      margin: '0 auto',
      padding: '24px 16px',
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      {/* ============================================================== */}
      {/* 1. TOP HEADER & SACRED BANNER                                 */}
      {/* ============================================================== */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: '16px',
        padding: '24px 28px',
        marginBottom: '20px',
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
              ॥ श्री मन्दिर दर्शनम् ॥ Sacred Temples of Bharat
            </span>
            <span style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
              borderRadius: '12px',
              padding: '3px 10px',
              fontSize: '11px',
              fontWeight: 600
            }}>
              36 States & Union Territories
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
            fontWeight: 800,
            margin: '0 0 6px 0',
            fontFamily: "'Cinzel', Georgia, serif",
            color: 'var(--text-primary)',
            letterSpacing: '0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Landmark size={30} color="var(--accent-saffron)" />
            <span>Temples of India Map Portal</span>
          </h1>

          <p style={{
            margin: 0,
            color: 'var(--text-secondary)',
            fontSize: '14px',
            lineHeight: 1.5,
            maxWidth: '650px'
          }}>
            Interactive sacred GIS cartography mapping <strong>6,48,907+</strong> consecrated temples across every state and union territory of Bharatavarsha.
          </p>
        </div>

        {/* Global Animated Counter Card */}
        <div style={{
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%)',
          border: '1.5px solid var(--accent-gold)',
          borderRadius: '14px',
          padding: '16px 24px',
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
            <span>🔱</span>
            <span>{activeState ? `Viewing ${activeState.name}` : 'Documented Nationwide'}</span>
          </div>

          <div style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
            fontWeight: 900,
            lineHeight: 1,
            color: 'var(--accent-gold)',
            fontFamily: "'Cinzel', Georgia, serif"
          }}>
            {animatedNumber.toLocaleString('en-IN')}
          </div>

          <div style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            marginTop: '4px'
          }}>
            {activeState ? `of 6,48,907 Total Mapped Temples` : `6.48 Lakh+ Sacred Shrines`}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. MAP CONTROLS & PIN TOGGLE BAR                               */}
      {/* ============================================================== */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: '12px',
        padding: '12px 18px',
        marginBottom: '16px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Left: View Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Reset to All India Button */}
          <button
            onClick={handleResetToAllIndia}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border-strong)',
              background: viewMode === 'macro' && !showAllIndiaPins ? 'var(--accent-saffron)' : 'var(--bg-secondary)',
              color: viewMode === 'macro' && !showAllIndiaPins ? '#FFFFFF' : 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Compass size={15} />
            <span>All India (Macro View)</span>
          </button>

          {/* Toggle All Bharat Iconic Temples */}
          <button
            onClick={() => {
              setShowAllIndiaPins(!showAllIndiaPins);
              triggerBell(480);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '8px',
              border: '1px solid var(--accent-gold)',
              background: showAllIndiaPins ? 'linear-gradient(135deg, #c69214 0%, #d9531e 100%)' : 'var(--bg-secondary)',
              color: showAllIndiaPins ? '#FFFFFF' : 'var(--accent-gold)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <MapPin size={15} />
            <span>📍 Pin All Bharat Mega-Temples ({ALL_ICONIC_TEMPLES.length})</span>
          </button>

          {/* Audio Bell Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? "Mute Temple Bells" : "Enable Temple Bells"}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-secondary)',
              color: soundEnabled ? 'var(--accent-gold)' : 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>

        {/* Right: Active State Indicator */}
        {activeState && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(217, 83, 30, 0.1)',
            padding: '4px 12px',
            borderRadius: '20px',
            border: '1px solid rgba(217, 83, 30, 0.25)'
          }}>
            <span style={{ fontSize: '13px', color: 'var(--accent-saffron)', fontWeight: 700 }}>
              Viewing {activeState.name} ({activeState.templeCount.toLocaleString('en-IN')} temples)
            </span>
            <button
              onClick={handleResetToAllIndia}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--accent-saffron)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 3. DUAL-PANE WORKSPACE: INTERACTIVE MAP + DISCOVERY SIDEBAR    */}
      {/* ============================================================== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.8fr) minmax(360px, 1.2fr)',
        gap: '20px',
        alignItems: 'start'
      }}>
        {/* ============================================================ */}
        {/* LEFT COLUMN: CRISP OPENSTREETMAP INTERFACE                  */}
        {/* ============================================================ */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {/* Map Container */}
          <div style={{
            position: 'relative',
            borderRadius: '14px',
            overflow: 'hidden',
            border: '1.5px solid var(--border-strong)',
            boxShadow: 'var(--shadow-md)',
            background: 'var(--bg-secondary)'
          }}>
            <div 
              ref={mapContainerRef}
              style={{
                width: '100%',
                height: '660px',
                minHeight: '520px',
                zIndex: 1
              }}
            />

            {/* Sacred Map Legend (Bottom-Left) */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              zIndex: 400,
              background: 'rgba(255, 253, 248, 0.95)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(198, 146, 20, 0.4)',
              borderRadius: '10px',
              padding: '10px 14px',
              boxShadow: '0 4px 18px rgba(0,0,0,0.18)',
              fontSize: '11px',
              color: '#2B1D15'
            }}>
              <div style={{
                fontFamily: "'Cinzel', Georgia, serif",
                fontWeight: 800,
                fontSize: '11px',
                color: '#801818',
                marginBottom: '6px',
                letterSpacing: '0.04em'
              }}>
                TEMPLE DENSITY HEATMAP
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {Object.entries(TIER_CONFIG).reverse().map(([tierKey, config]) => (
                  <div key={tierKey} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '3px',
                      backgroundColor: config.fillColor,
                      border: `1.5px solid ${config.border}`
                    }} />
                    <span style={{ fontSize: '11px', color: '#451A03', fontWeight: 600 }}>
                      {config.label}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                borderTop: '1px solid rgba(198, 146, 20, 0.25)',
                marginTop: '8px',
                paddingTop: '6px',
                display: 'flex',
                gap: '10px'
              }}>
                <span title="Shiva">🔱 Shiva</span>
                <span title="Vishnu">🪷 Vishnu</span>
                <span title="Shakti">🌸 Devi</span>
                <span title="Char Dham">🚩 Dham</span>
              </div>
            </div>

            {/* Micro View State Return Button (Top-Left of Map) */}
            {viewMode === 'micro' && (
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                zIndex: 400
              }}>
                <button
                  onClick={handleResetToAllIndia}
                  style={{
                    background: '#801818',
                    color: '#FFFFFF',
                    border: '1.5px solid #F59E0B',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.25)'
                  }}
                >
                  <Compass size={14} />
                  <span>← Back to All India Map</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: SEARCH, STATS & ICONIC TEMPLES DISCOVERY       */}
        {/* ============================================================ */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Tab Navigation: State Analytics vs Search & Filter */}
          <div style={{
            display: 'flex',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            borderRadius: '10px',
            padding: '4px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <button
              onClick={() => setSidebarTab('analytics')}
              style={{
                flex: 1,
                padding: '9px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                background: sidebarTab === 'analytics' ? 'var(--bg-secondary)' : 'transparent',
                color: sidebarTab === 'analytics' ? 'var(--accent-saffron)' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <SlidersHorizontal size={15} />
              <span>State Sanctums</span>
            </button>

            <button
              onClick={() => setSidebarTab('search')}
              style={{
                flex: 1,
                padding: '9px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                background: sidebarTab === 'search' ? 'var(--bg-secondary)' : 'transparent',
                color: sidebarTab === 'search' ? 'var(--accent-saffron)' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <Search size={15} />
              <span>Search & Filter ({filteredIconicTemples.length})</span>
            </button>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* TAB 1: STATE ANALYTICS & REGIONAL ICONIC TEMPLES           */}
          {/* ---------------------------------------------------------- */}
          {sidebarTab === 'analytics' && (
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: '14px',
              padding: '20px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {activeState ? (
                <div>
                  {/* Active State Header Card */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px',
                    paddingBottom: '14px',
                    borderBottom: '1px solid var(--border-light)'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          background: 'var(--accent-gold)',
                          color: '#FFFFFF',
                          fontWeight: 800,
                          fontSize: '12px',
                          padding: '2px 8px',
                          borderRadius: '4px'
                        }}>
                          {activeState.code}
                        </span>
                        <h2 style={{
                          fontSize: '22px',
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          margin: 0,
                          fontFamily: "'Cinzel', Georgia, serif"
                        }}>
                          {activeState.name}
                        </h2>
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                        National Density Rank: <strong style={{ color: 'var(--accent-saffron)' }}>#{activeStateRank}</strong> of 36
                      </span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: 900,
                        color: 'var(--accent-gold)',
                        fontFamily: "'Cinzel', Georgia, serif"
                      }}>
                        {activeState.templeCount.toLocaleString('en-IN')}
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Mapped Temples
                      </span>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px',
                    marginBottom: '18px'
                  }}>
                    <div style={{
                      background: 'var(--bg-secondary)',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-light)'
                    }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                        Temples / 1 Lakh Pop
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {activeState.templesPerLakh.toFixed(1)}
                      </div>
                    </div>

                    <div style={{
                      background: 'var(--bg-secondary)',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-light)'
                    }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                        State Population
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>
                        ~{activeState.populationLakhs.toLocaleString('en-IN')} Lakhs
                      </div>
                    </div>
                  </div>

                  {/* Top Pick Banner */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(217, 83, 30, 0.1) 0%, rgba(198, 146, 20, 0.12) 100%)',
                    border: '1px solid rgba(217, 83, 30, 0.25)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    marginBottom: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ fontSize: '18px' }}>🔱</span>
                    <div>
                      <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--accent-saffron)', fontWeight: 700 }}>
                        Crown Jewel Sanctum
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {activeState.topPick}
                      </div>
                    </div>
                  </div>

                  {/* Iconic Historical Temples List for Active State */}
                  <div>
                    <h3 style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Landmark size={15} color="var(--accent-gold)" />
                      <span>Iconic Mega-Temples ({activeState.iconicTemples?.length || 0})</span>
                    </h3>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      maxHeight: '340px',
                      overflowY: 'auto',
                      paddingRight: '4px'
                    }}>
                      {activeState.iconicTemples?.map(temple => {
                        const pinConfig = getTemplePinConfig(temple);
                        const isSelected = selectedTemple?.id === temple.id;

                        return (
                          <div
                            key={temple.id}
                            onClick={() => handleSelectTemple({
                              ...temple,
                              stateId: activeState.id,
                              stateName: activeState.name
                            })}
                            style={{
                              background: isSelected ? 'var(--bg-secondary)' : 'var(--bg-card)',
                              border: isSelected ? '1.5px solid var(--accent-gold)' : '1px solid var(--border-light)',
                              borderRadius: '8px',
                              padding: '10px 12px',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '14px' }}>{pinConfig.symbol}</span>
                                <strong style={{
                                  fontSize: '13px',
                                  color: isSelected ? 'var(--accent-saffron)' : 'var(--text-primary)'
                                }}>
                                  {temple.name}
                                </strong>
                              </div>
                              <span style={{
                                fontSize: '10px',
                                background: 'rgba(217, 83, 30, 0.1)',
                                color: 'var(--accent-saffron)',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                whiteSpace: 'nowrap',
                                fontWeight: 600
                              }}>
                                {temple.city}
                              </span>
                            </div>

                            <p style={{
                              fontSize: '11px',
                              color: 'var(--text-secondary)',
                              margin: '4px 0 6px 0',
                              lineHeight: 1.4
                            }}>
                              <em>{temple.deity}</em> • {temple.era}
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                                {temple.architecturalStyle ? temple.architecturalStyle.split('(')[0] : ''}
                              </span>
                              <span style={{ fontSize: '11px', color: 'var(--accent-gold)', fontWeight: 600 }}>
                                View Pin →
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                /* No State Selected - National Overview & Leaderboard */
                <div>
                  <div style={{
                    textAlign: 'center',
                    padding: '16px 10px',
                    borderBottom: '1px solid var(--border-light)',
                    marginBottom: '16px'
                  }}>
                    <span style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>🔱</span>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      margin: '0 0 6px 0',
                      fontFamily: "'Cinzel', Georgia, serif"
                    }}>
                      All-India Sacred Geography
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      Click any state on the map to zoom in, view its density breakdown, and explore its consecrated mega-temples.
                    </p>
                  </div>

                  {/* Top 5 States Leaderboard */}
                  <div>
                    <h4 style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--text-muted)',
                      marginBottom: '10px'
                    }}>
                      Top Temple Density States
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {STATE_TEMPLE_STATS.slice(0, 7).map((s, idx) => (
                        <div
                          key={s.id}
                          onClick={() => handleSelectState(s.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-light)',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              background: idx === 0 ? 'var(--accent-gold)' : 'rgba(217, 83, 30, 0.15)',
                              color: idx === 0 ? '#FFFFFF' : 'var(--accent-saffron)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '11px',
                              fontWeight: 700
                            }}>
                              {idx + 1}
                            </span>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                              {s.name}
                            </span>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <strong style={{ fontSize: '13px', color: 'var(--accent-saffron)' }}>
                              {s.templeCount.toLocaleString('en-IN')}
                            </strong>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>
                              {s.templesPerLakh.toFixed(0)}/Lakh
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ---------------------------------------------------------- */}
          {/* TAB 2: SEARCH & FILTER ALL 88 ICONIC MEGA-TEMPLES          */}
          {/* ---------------------------------------------------------- */}
          {sidebarTab === 'search' && (
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: '14px',
              padding: '18px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {/* Search Box */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                padding: '8px 12px',
                marginBottom: '12px'
              }}>
                <Search size={16} color="var(--accent-gold)" />
                <input
                  type="text"
                  placeholder="Search temple, deity, city, or era..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '13px',
                    color: 'var(--text-primary)',
                    width: '100%',
                    fontFamily: 'inherit'
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Deity Filter Chips */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {['All', 'Shiva', 'Vishnu', 'Shakti'].map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedDeityFilter(d)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '14px',
                      border: '1px solid var(--border-light)',
                      background: selectedDeityFilter === d ? 'var(--accent-saffron)' : 'var(--bg-secondary)',
                      color: selectedDeityFilter === d ? '#FFFFFF' : 'var(--text-secondary)',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {d === 'Shiva' ? '🔱 Shiva' : d === 'Vishnu' ? '🪷 Vishnu' : d === 'Shakti' ? '🌸 Shakti' : 'All Deities'}
                  </button>
                ))}
              </div>

              {/* Results List */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                maxHeight: '440px',
                overflowY: 'auto',
                paddingRight: '4px'
              }}>
                {filteredIconicTemples.map(temple => {
                  const pinConfig = getTemplePinConfig(temple);
                  const isSelected = selectedTemple?.id === temple.id;

                  return (
                    <div
                      key={temple.id}
                      onClick={() => handleSelectTemple(temple)}
                      style={{
                        background: isSelected ? 'var(--bg-secondary)' : 'var(--bg-card)',
                        border: isSelected ? '1.5px solid var(--accent-gold)' : '1px solid var(--border-light)',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '13px' }}>{pinConfig.symbol}</span>
                          <strong style={{
                            fontSize: '13px',
                            color: isSelected ? 'var(--accent-saffron)' : 'var(--text-primary)'
                          }}>
                            {temple.name}
                          </strong>
                        </div>
                        <span style={{
                          fontSize: '10px',
                          background: 'rgba(217, 83, 30, 0.1)',
                          color: 'var(--accent-saffron)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap'
                        }}>
                          {temple.state}
                        </span>
                      </div>

                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '3px' }}>
                        <em>{temple.deity}</em> • {temple.city}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. TEMPLE SACRED DOSSIER MODAL                                 */}
      {/* ============================================================== */}
      {selectedTemple && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(26, 15, 8, 0.7)',
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
            maxWidth: '680px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedTemple(null)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)'
              }}
            >
              <X size={16} />
            </button>

            {/* Dossier Header */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  background: 'rgba(217, 83, 30, 0.15)',
                  color: 'var(--accent-saffron)',
                  borderRadius: '12px',
                  padding: '3px 10px',
                  fontSize: '11px',
                  fontWeight: 700
                }}>
                  {selectedTemple.state || activeState?.name}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  📍 {selectedTemple.city}
                </span>
              </div>

              <h2 style={{
                fontSize: '24px',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: '0 0 6px 0',
                fontFamily: "'Cinzel', Georgia, serif"
              }}>
                {selectedTemple.name}
              </h2>

              <div style={{ fontSize: '14px', color: 'var(--accent-saffron)', fontWeight: 600 }}>
                🔱 {selectedTemple.deity}
              </div>
            </div>

            {/* Architectural & Historical Highlights */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div style={{
                background: 'var(--bg-secondary)',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                  Historical Era & Dynasty
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {selectedTemple.era || 'Antiquity'}
                </div>
                {selectedTemple.established && (
                  <div style={{ fontSize: '11px', color: 'var(--accent-gold)', marginTop: '2px' }}>
                    {selectedTemple.established}
                  </div>
                )}
              </div>

              <div style={{
                background: 'var(--bg-secondary)',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                  Architectural Style
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {selectedTemple.architecturalStyle || 'Traditional Hindu Temple Architecture'}
                </div>
              </div>
            </div>

            {/* Sacred Narrative Description */}
            <div style={{
              fontSize: '14px',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              marginBottom: '24px',
              borderLeft: '3px solid var(--accent-gold)',
              paddingLeft: '14px'
            }}>
              {selectedTemple.description}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={getGoogleMapsUrl(selectedTemple)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--accent-saffron)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <Navigation size={15} />
                <span>Open in Google Maps</span>
                <ExternalLink size={13} />
              </a>

              <button
                onClick={() => setSelectedTemple(null)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
