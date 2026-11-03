import { deitiesData } from './deitiesData.js';
import { gurusData } from './gurusData.js';
import { rishisData } from './rishisData.js';
import { textsData } from './textsData.js';
import { practicesData } from './practicesData.js';
import { beliefsData } from './beliefsData.js';
import { mantrasData } from './mantrasData.js';
import { festivalsData } from './festivalsData.js';
import { tirthaData } from './tirthaData.js';
import { genealogyData } from './genealogyData.js';
import { ALL_ICONIC_TEMPLES, TOTAL_MAPPED_TEMPLES } from './templesPortalData.js';

export function getGlobalSearchIndex() {
  const items = [];

  deitiesData.forEach(d => {
    items.push({
      id: d.id,
      title: d.name,
      category: 'Deity',
      subtitle: `${d.knownFor} • Vahana: ${d.vahana}`,
      description: d.detail?.fullText?.substring(0, 160) || d.knownFor,
      route: `#/deities/${d.id}`,
      image: d.image
    });
  });

  gurusData.forEach(g => {
    items.push({
      id: g.id,
      title: g.name,
      category: 'Guru',
      subtitle: g.years ? `Lifespan: ${g.years}` : 'Spiritual Master',
      description: g.summary?.substring(0, 160) || '',
      route: `#/gurus/${g.id}`,
      image: g.image
    });
  });

  rishisData.forEach(r => {
    items.push({
      id: r.id,
      title: `${r.name} Maharshi`,
      category: 'Rishi',
      subtitle: r.subtitle || 'Vedic Sage and Seer',
      description: r.introduction || r.quote || '',
      route: `#/rishis/${r.id}`
    });
  });

  textsData.forEach(t => {
    items.push({
      id: t.id,
      title: t.title,
      category: 'Sacred Text',
      subtitle: `${t.category} • ${t.sanskrit || ''}`,
      description: t.overview,
      route: `#/texts/${t.id}`
    });
  });

  mantrasData.forEach(m => {
    items.push({
      id: m.id,
      title: m.name,
      category: 'Mantra',
      subtitle: `${m.deity} • ${m.sanskrit}`,
      description: m.meaning,
      route: `#/mantras`
    });
  });

  practicesData.forEach((p, idx) => {
    items.push({
      id: `practice-${idx}`,
      title: p.title,
      category: 'Practice',
      subtitle: 'Traditions & Rituals',
      description: p.description,
      route: `#/practices`
    });
  });

  beliefsData.forEach((b, idx) => {
    items.push({
      id: `belief-${idx}`,
      title: b.title,
      category: 'Belief',
      subtitle: 'Philosophical Pillar',
      description: b.description,
      route: `#/beliefs`
    });
  });

  festivalsData.forEach(f => {
    items.push({
      id: f.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: f.name,
      category: 'Festival',
      subtitle: `${f.subtitle} • ${f.season}`,
      description: f.significance,
      route: `#/festivals`
    });
  });

  tirthaData.forEach(t => {
    items.push({
      id: t.id,
      title: t.name,
      category: 'Tirtha',
      subtitle: `${t.category} • ${t.city}, ${t.state}`,
      description: t.legend?.substring(0, 160) || t.foundingHistory?.substring(0, 160) || '',
      route: `#/tirtha`
    });
  });

  ['suryavansha', 'chandravansha', 'genesis'].forEach(dynastyKey => {
    const dyn = genealogyData[dynastyKey];
    dyn.tree.forEach(p => {
      items.push({
        id: p.id,
        title: p.name,
        category: 'Genealogy',
        subtitle: `${dyn.title} • ${p.title || p.role || ''}`,
        description: p.deeds?.substring(0, 160) || p.description?.substring(0, 160) || '',
        route: `#/genealogy`
      });
    });
  });

  items.push({
    id: 'jnana-quiz',
    title: 'Sanatan Dharma Knowledge Quiz',
    category: 'Quiz',
    subtitle: 'Beginner to Scholar Levels • Certification',
    description: 'Test your wisdom across Vedic scriptures, deities, vahanas, and philosophical schools.',
    route: `#/quiz`
  });

  items.push({
    id: 'wisdom-flashcards',
    title: 'Wisdom Flashcards Deck',
    category: 'Quiz',
    subtitle: '30+ Interactive Sanskrit Concept Cards',
    description: 'Master key Sanskrit philosophical concepts, deity vahanas, and Rishi contributions.',
    route: `#/quiz`
  });

  items.push({
    id: 'vedic-panchang-live',
    title: 'Vedic Panchang & Festival Live Countdown',
    category: 'Panchang',
    subtitle: 'Daily Tithi, Nakshatra, Yoga, Karana, Brahma Muhurta & Rahu Kaal',
    description: 'Real-time astronomical Vedic calendar with live countdowns and authentic ritual guides to Maha Shivaratri, Holi, Navratri, and Diwali.',
    route: `#/panchang`
  });

  items.push({
    id: 'temples-of-india-portal',
    title: 'Temples of India Map Portal (6.5 Lakh+ Temples)',
    category: 'Interactive Map',
    subtitle: 'Interactive Choropleth GIS Database • 6,48,907 Temples across 36 States & UTs',
    description: 'Dynamic heat-map visualization of India’s temple ecosystem with macro and micro views of historic mega-temples.',
    route: `#/temple-map`
  });

  ALL_ICONIC_TEMPLES.forEach(t => {
    items.push({
      id: `temple-${t.id}`,
      title: t.name,
      category: 'Temple',
      subtitle: `${t.city}, ${t.stateName} • ${t.deity}`,
      description: `${t.era} • ${t.architecturalStyle}: ${t.description.substring(0, 120)}...`,
      route: `#/temple-map`
    });
  });

  return items;
}

