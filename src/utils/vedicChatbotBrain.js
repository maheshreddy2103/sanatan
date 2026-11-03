/**
 * Vedic Chatbot Brain (सनातन मित्र Engine)
 * Layer 1: Zero-API Instant Local Knowledge Retrieval
 * Layer 2: Google Gemini Generative AI Spiritual Guide
 */

import { getPanchanga } from './panchang';
import { MAJOR_FESTIVALS_DATA } from '../data/festivalCountdownsData';
import { deitiesData } from '../data/deitiesData';
import { gurusData } from '../data/gurusData';
import { rishisData } from '../data/rishisData';
import { textsData } from '../data/textsData';
import { mantrasData } from '../data/mantrasData';
import { practicesData } from '../data/practicesData';
import { beliefsData } from '../data/beliefsData';
import { STATE_TEMPLE_STATS, TOTAL_MAPPED_TEMPLES } from '../data/templesPortalData';

// System prompt for Gemini AI
const VEDIC_SYSTEM_INSTRUCTION = `You are "Sanatan Mitr" (सनातन मित्र), a compassionate, wise, and deeply enlightened Vedic scholar and spiritual guide rooted in authentic Sanatan Dharma.
- Address seekers with warmth and respect (e.g. "Namaste", "Dear Seeker", "Pranam").
- Ground your answers in authentic scriptures: the Vedas, Upanishads, Bhagavad Gita, Ramayana, Mahabharata, and Puranas.
- When answering philosophical questions, cite relevant Sanskrit verses or shlokas when helpful, followed by clear translation and life application.
- Emphasize Dharma (righteous living), Satya (truth), Ahimsa (non-violence), Karma Yoga (selfless duty), and Moksha (spiritual liberation).
- Maintain an elevating, dignified, calm, and peaceful tone. Format responses with clean paragraphs and readable bullet points.`;

/**
 * Layer 1: Query Local Datasets without API
 */
export function queryLocalVedicBrain(rawQuery) {
  const query = rawQuery.toLowerCase().trim();

  // 1. Panchang, Tithi, Rahu Kaal, Timings
  if (
    query.includes('panchang') ||
    query.includes('tithi') ||
    query.includes('rahu kaal') ||
    query.includes('brahma muhurta') ||
    query.includes('nakshatra') ||
    query.includes('today') ||
    query.includes('muhurat') ||
    query.includes('sunrise') ||
    query.includes('sunset')
  ) {
    const todayPanchang = getPanchanga(new Date(), 'varanasi');
    const { tithi, nakshatra, yoga, karana, vara, masa, samvat, timings } = todayPanchang;

    return {
      text: `🕉️ **Today's Vedic Panchang (${todayPanchang.dateFormatted} - Kashi/Varanasi)**\n\n` +
            `• **Tithi (तिथि):** ${tithi.name} (${tithi.paksha}) — *Deity: ${tithi.deity}*\n` +
            `• **Nakshatra (नक्षत्र):** ${nakshatra.name} (Pada ${nakshatra.pada}) — *Lord: ${nakshatra.lord || 'Surya'}*\n` +
            `• **Yoga (योग):** ${yoga.name}\n` +
            `• **Karana (करण):** ${karana.name}\n` +
            `• **Day (वासर):** ${vara.name} (${vara.planet})\n` +
            `• **Vikram Samvat:** ${samvat.vikram} (${masa.name} Masa)\n\n` +
            `⏳ **Sacred Timings for Today:**\n` +
            `• **Brahma Muhurta:** ${timings?.brahmaMuhurta?.start || '04:30 AM'} – ${timings?.brahmaMuhurta?.end || '05:18 AM'} (Best for meditation)\n` +
            `• **Sunrise / Sunset:** ${timings?.sunrise || '06:06 AM'} / ${timings?.sunset || '05:32 PM'}\n` +
            `• **Rahu Kaal (Avoid starting new tasks):** ${timings?.rahuKaal?.start || '04:30 PM'} – ${timings?.rahuKaal?.end || '06:00 PM'}`,
      action: {
        label: 'Open Full Live Panchang Portal',
        route: '#/panchang'
      }
    };
  }

  // 2. Temples of India
  if (
    query.includes('temple') ||
    query.includes('mandir') ||
    query.includes('jyotirlinga') ||
    query.includes('shakti peeth') ||
    query.includes('kashi') ||
    query.includes('tirupati') ||
    query.includes('meenakshi') ||
    query.includes('kedarnath') ||
    query.includes('somnath') ||
    query.includes('jagannath') ||
    query.includes('ayodhya')
  ) {
    // Check if specific state mentioned
    for (const stateData of STATE_TEMPLE_STATS) {
      if (query.includes(stateData.name.toLowerCase()) || query.includes(stateData.id.replace(/-/g, ' '))) {
        const topTemples = stateData.iconicTemples || [];
        return {
          text: `🛕 **Temples in ${stateData.name}**\n\n` +
                `• **Total Mapped Temples:** ${stateData.templeCount.toLocaleString('en-IN')}+\n` +
                `• **Top Historical Pick:** ${stateData.topPick}\n\n` +
                (topTemples.length > 0 
                  ? `**Prominent Sacred Sites:**\n` + topTemples.slice(0, 4).map(t => `• **${t.name}** (${t.city}) — Dedicated to ${t.deity}`).join('\n')
                  : `Explore all sacred shrines and architectural marvels across ${stateData.name} in our interactive map portal.`),
          action: {
            label: `Explore ${stateData.name} on Temples Map`,
            route: '#/temples'
          }
        };
      }
    }

    return {
      text: `🛕 **Temples of India Ecosystem (6.5 Lakh+ Sacred Shrines)**\n\n` +
            `India is home to over 6,48,000 documented temples embodying millennia of sacred architecture, consecrated deities, and spiritual energy:\n\n` +
            `• **Tamil Nadu:** 79,154 temples (Meenakshi Amman, Brihadisvara, Rameswaram)\n` +
            `• **Maharashtra:** 77,283 temples (Siddhivinayak, Trimbakeshwar, Bhimashankar)\n` +
            `• **Karnataka:** 61,232 temples (Virupaksha, Murudeshwar, Belur)\n` +
            `• **Gujarat:** 49,995 temples (Somnath, Dwarkadhish)\n` +
            `• **Uttar Pradesh:** 37,518 temples (Kashi Vishwanath, Ram Janmabhoomi)\n\n` +
            `You can interactively explore temple densities, GIS coordinates, and architectural eras across every state.`,
      action: {
        label: 'Open Temples of India Map Portal',
        route: '#/temples'
      }
    };
  }

  // 3. Mantras
  if (
    query.includes('mantra') ||
    query.includes('gayatri') ||
    query.includes('mrityunjaya') ||
    query.includes('shanti') ||
    query.includes('chant') ||
    query.includes('japa')
  ) {
    if (query.includes('gayatri')) {
      const gm = mantrasData.find(m => m.id === 'gayatri') || mantrasData[0];
      return {
        text: `📿 **${gm.name} (${gm.sanskrit})**\n\n` +
              `> *${gm.transliteration}*\n\n` +
              `• **Meaning:** ${gm.meaning}\n` +
              `• **Deity:** Savitur (Divine Sun / Source of Divine Intellect)\n` +
              `• **Spiritual Benefit:** Awakens the inner light of spiritual wisdom, clarity of intellect, and dissolves negativity. Best chanted during Brahma Muhurta or Sandhya Kaal (dawn/dusk).`,
        action: { label: 'Explore All Sacred Mantras', route: '#/mantras' }
      };
    }

    if (query.includes('mrityunjaya') || query.includes('shiva')) {
      const mm = mantrasData.find(m => m.id === 'mahamrityunjaya') || mantrasData[1];
      return {
        text: `📿 **${mm.name} (${mm.sanskrit})**\n\n` +
              `> *${mm.transliteration}*\n\n` +
              `• **Meaning:** ${mm.meaning}\n` +
              `• **Deity:** Tryambaka (The Three-Eyed Bhagavan Shiva)\n` +
              `• **Spiritual Benefit:** The Great Death-Conquering Mantra grants physical vitality, relieves chronic fears, heals afflictions, and bestows liberation from the cycle of rebirth.`,
        action: { label: 'Explore All Sacred Mantras', route: '#/mantras' }
      };
    }

    return {
      text: `📿 **Sacred Mantras of Sanatan Dharma**\n\n` +
            `Mantras are primordial sound frequencies (Nada Brahma) formulated by the Rishis to attune human consciousness to divine cosmic vibrations:\n\n` +
            `• **Gayatri Mantra:** Divine illumination of intellect (*Om Bhur Bhuva Svaha...*)\n` +
            `• **Maha Mrityunjaya Mantra:** Healing, fearlessness, liberation (*Om Tryambakam Yajamahe...*)\n` +
            `• **Om Namah Shivaya:** Five-element inner balance & surrender to consciousness\n` +
            `• **Hare Krishna Maha-Mantra:** Divine love and devotion (*Bhakti*)\n\n` +
            `Visit our Mantras treasury for Sanskrit shlokas, audios, and word-by-word meanings.`,
      action: { label: 'Open Mantras Treasury', route: '#/mantras' }
    };
  }

  // 4. Festivals & Vrats
  if (
    query.includes('festival') ||
    query.includes('diwali') ||
    query.includes('deepavali') ||
    query.includes('shivaratri') ||
    query.includes('holi') ||
    query.includes('navratri') ||
    query.includes('janmashtami') ||
    query.includes('ganesh chaturthi') ||
    query.includes('vrat') ||
    query.includes('fasting') ||
    query.includes('ekadashi')
  ) {
    if (query.includes('ekadashi')) {
      return {
        text: `🌿 **Ekadashi Vrat (एकादशी व्रत) Protocol**\n\n` +
              `Ekadashi occurs on the 11th lunar day of every Shukla and Krishna Paksha (24 times a year). It is dedicated to Bhagavan Sri Vishnu:\n\n` +
              `• **Fasting Rules:** Avoid all food grains (wheat, rice, pulses, corn). Fresh fruits, milk, water, sabudana, and nuts are permitted (Phalahar).\n` +
              `• **Spiritual Practice:** Keep mind absorbed in Vishnu Sahasranama, Bhagavad Gita reading, and Japa meditation.\n` +
              `• **Parana (Breaking Fast):** Fast is broken the next morning (Dwadashi) within Harivasara and specified Muhurta.`,
        action: { label: 'Check Today\'s Tithi on Panchang', route: '#/panchang' }
      };
    }

    // Match any specific festival from MAJOR_FESTIVALS_DATA
    for (const fest of MAJOR_FESTIVALS_DATA) {
      if (query.includes(fest.id.replace(/-/g, ' ')) || query.includes(fest.name.toLowerCase().split(' ')[0])) {
        return {
          text: `🪔 **${fest.name} (${fest.devanagari})**\n\n` +
                `• **Lunar Timing:** ${fest.lunarTiming}\n` +
                `• **Tagline:** ${fest.tagline}\n\n` +
                `**Significance:**\n${fest.pujaVidhi?.[0]?.instruction || 'Auspicious festival honoring divinity and spiritual celebration.'}\n\n` +
                (fest.pujaVidhi ? `**Puja Highlights:**\n` + fest.pujaVidhi.slice(0, 3).map(p => `• **Step ${p.step}:** ${p.title} — ${p.instruction}`).join('\n') : '') +
                (fest.vratRules ? `\n\n• **Vrat Rules:** ${fest.vratRules.permitted || 'Fasting observed with satvik fruits and prayers.'}` : ''),
          action: { label: 'View Live Countdown & Full Ritual Guide', route: '#/panchang' }
        };
      }
    }

    return {
      text: `🎉 **Hindu Festivals & Auspicious Observances**\n\n` +
            `Sanatan Dharma celebrates life through cyclical celestial festivals aligned with planetary movements and seasons:\n\n` +
            `• **Maha Shivaratri:** The sacred night of Shiva's Lingodbhava and meditation.\n` +
            `• **Holi & Holika Dahan:** The triumph of devotion (Prahlada) and arrival of Vasant.\n` +
            `• **Chaitra & Sharad Navratri:** 9 nights of Goddess Durga in her multifaceted aspects.\n` +
            `• **Krishna Janmashtami:** The midnight divine avatara of Sri Krishna.\n` +
            `• **Diwali & Dhanteras:** Deepavali — light overcoming darkness, Lakshmi-Kubera puja.`,
      action: { label: 'View Festival Countdowns & Ritual Guides', route: '#/panchang' }
    };
  }

  // 5. Deities
  for (const deity of deitiesData) {
    const nameMatch = query.includes(deity.name.toLowerCase());
    const sanskritMatch = deity.sanskrit && query.includes(deity.sanskrit.toLowerCase());
    if (nameMatch || sanskritMatch) {
      return {
        text: `✨ **${deity.name} (${deity.sanskrit || ''})** — *${deity.title || 'Supreme Divinity'}*\n\n` +
              `${deity.description}\n\n` +
              (deity.attributes ? `• **Attributes:** ${deity.attributes.join(', ')}\n` : '') +
              (deity.vehicle ? `• **Vahana (Vehicle):** ${deity.vehicle}\n` : '') +
              (deity.consort ? `• **Consort:** ${deity.consort}\n` : '') +
              (deity.festivals ? `• **Major Festivals:** ${deity.festivals.join(', ')}\n` : '') +
              (deity.mantra ? `\n> *Mantra:* "${deity.mantra}"` : ''),
        action: { label: `Explore ${deity.name}'s Sacred Page`, route: `#/deities/${deity.id}` }
      };
    }
  }

  // 6. Gurus
  for (const guru of gurusData) {
    if (query.includes(guru.name.toLowerCase()) || (guru.title && query.includes(guru.title.toLowerCase()))) {
      return {
        text: `🙏 **${guru.name}** (${guru.period})\n\n` +
              `*${guru.title}*\n\n` +
              `${guru.bio || guru.description}\n\n` +
              (guru.corePhilosophy ? `• **Core Teaching:** ${guru.corePhilosophy}\n` : '') +
              (guru.ashram ? `• **Main Center / Peetham:** ${guru.ashram}\n` : '') +
              (guru.famousQuote ? `\n> "${guru.famousQuote}"` : ''),
        action: { label: `Read ${guru.name}'s Life & Teachings`, route: `#/gurus/${guru.id}` }
      };
    }
  }

  // 7. Rishis
  for (const rishi of rishisData) {
    if (query.includes(rishi.name.toLowerCase())) {
      return {
        text: `🌿 **Maharishi ${rishi.name}**\n\n` +
              `*${rishi.title || 'Vedic Seer'}*\n\n` +
              `${rishi.bio || rishi.description}\n\n` +
              (rishi.contributions ? `• **Scriptural Contributions:** ${rishi.contributions.join(', ')}\n` : '') +
              (rishi.gotra ? `• **Gotra Lineage:** ${rishi.gotra}\n` : ''),
        action: { label: `Learn more about Maharishi ${rishi.name}`, route: `#/rishis/${rishi.id}` }
      };
    }
  }

  // 8. Sacred Texts (Gita, Vedas, Upanishads)
  if (
    query.includes('gita') ||
    query.includes('bhagavad') ||
    query.includes('upanishad') ||
    query.includes('veda') ||
    query.includes('purana') ||
    query.includes('ramayana') ||
    query.includes('mahabharata')
  ) {
    const textMatch = textsData.find(t => query.includes(t.id) || query.includes(t.name.toLowerCase()));
    if (textMatch) {
      return {
        text: `📖 **${textMatch.name} (${textMatch.sanskrit || ''})**\n\n` +
              `*Category: ${textMatch.category}*\n\n` +
              `${textMatch.description}\n\n` +
              (textMatch.significance ? `• **Significance:** ${textMatch.significance}\n` : '') +
              (textMatch.structure ? `• **Structure:** ${textMatch.structure}\n` : ''),
        action: { label: `Read Sacred Chapters of ${textMatch.name}`, route: `#/texts/${textMatch.id}` }
      };
    }
  }

  // 9. Core Beliefs (Karma, Dharma, Moksha, Samsara)
  if (
    query.includes('karma') ||
    query.includes('dharma') ||
    query.includes('moksha') ||
    query.includes('reincarnation') ||
    query.includes('samsara') ||
    query.includes('atman') ||
    query.includes('brahman')
  ) {
    const belief = beliefsData.find(b => query.includes(b.id) || query.includes(b.name.toLowerCase()));
    if (belief) {
      return {
        text: `☸️ **${belief.name} (${belief.sanskrit || ''})**\n\n` +
              `${belief.description}\n\n` +
              `• **Scriptural Basis:** ${belief.scripture || 'Vedas and Bhagavad Gita'}\n` +
              (belief.application ? `• **Practical Application:** ${belief.application}\n` : ''),
        action: { label: 'Explore Core Beliefs of Sanatan Dharma', route: '#/beliefs' }
      };
    }
  }

  // Fallback: If not matched in local catalog, return null to delegate to Gemini or general guide
  return null;
}

/**
 * Layer 2: Call Google Gemini API
 */
export async function queryGeminiAI(userPrompt, apiKey, history = []) {
  if (!apiKey || !apiKey.trim()) {
    throw new Error('No API key provided');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`;

  // Format conversation history for Gemini
  const contents = [];

  // Add previous turns (up to last 6 messages to keep context lean)
  const recentHistory = history.slice(-6);
  for (const msg of recentHistory) {
    contents.push({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  }

  // Add the current user prompt
  contents.push({
    role: 'user',
    parts: [{ text: userPrompt }]
  });

  const requestBody = {
    contents: contents,
    systemInstruction: {
      parts: [{ text: VEDIC_SYSTEM_INSTRUCTION }]
    },
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 800,
      topP: 0.95
    }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const message = errData?.error?.message || `Gemini API error (Status ${response.status})`;
    throw new Error(message);
  }

  const data = await response.json();
  const candidate = data?.candidates?.[0];
  const replyText = candidate?.content?.parts?.[0]?.text;

  if (!replyText) {
    throw new Error('Empty response received from Gemini');
  }

  return replyText;
}
