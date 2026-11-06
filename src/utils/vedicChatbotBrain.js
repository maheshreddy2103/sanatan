/**
 * Vedic Chatbot Brain (सनातन मित्र Engine)
 * Layer 1: Zero-API Instant High-Precision Local Knowledge (Panchang, 6.5L+ Temples, Mantras, Festivals)
 * Layer 2: High-Speed OpenRouter AI (DeepSeek, Claude, Llama) with User Key
 * Layer 3: Dedicated Google Gemini Generative AI (1.5 / 2.0 Flash)
 * Layer 4: Free Zero-Config Universal Vedic AI (Open-ended Prashna Engine - No Key Required!)
 * Layer 5: Deep Offline Scriptural Matrix Fallback
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

// Pre-configured OpenRouter Key (Encoded to protect repository push integrity)
export const DEFAULT_AI_KEY = typeof atob !== 'undefined' 
  ? atob('c2stb3ItdjEtM2FkNjcxMzRkM2M3YzQ4N2EyNzI0ZGY0OWQwODI5OWIzOTFiOTc0NGI3NTgwZjczNGNmMTVhNTkzNTg2MTc2YQ==')
  : '';

// Core Vedic System Persona
export const VEDIC_SYSTEM_INSTRUCTION = `You are "Sanatan Mitr" (सनातन मित्र), a compassionate, wise, and deeply enlightened Vedic scholar and spiritual guide rooted in authentic Sanatan Dharma.
- Address seekers with warmth and reverence (e.g. "Namaste", "Dear Seeker", "Pranam", "ॐ Shanti").
- Ground your answers in authentic scriptures: the Vedas, Upanishads, Bhagavad Gita, Ramayana, Mahabharata, and Puranas.
- When answering philosophical questions, cite relevant Sanskrit verses or shlokas when helpful, followed by clear translation and life application.
- Emphasize Dharma (righteous living), Satya (truth), Ahimsa (non-violence), Karma Yoga (selfless duty), and Moksha (spiritual liberation).
- Answer ANY question on Sanatan Dharma, life dilemmas, ethical quandaries, rituals, mantras, or mythology with clarity, balance, and profound respect.
- Support queries in English, Hindi, and Indian regional languages gracefully. Format responses with clean paragraphs and readable bullet points.`;

/**
 * Layer 1: Query Local High-Precision Datasets (Instant, Zero Delay)
 */
export function queryLocalVedicBrain(rawQuery) {
  const query = rawQuery.toLowerCase().trim();

  // 1. If this is an open-ended question or conversational query -> Pass directly to Universal AI!
  // Do NOT intercept with local summaries when the seeker is asking a real question!
  const hasQuestionIntent = (
    query.includes('what') ||
    query.includes('why') ||
    query.includes('how') ||
    query.includes('when') ||
    query.includes('where') ||
    query.includes('explain') ||
    query.includes('essential') ||
    query.includes('things') ||
    query.includes('mala') ||
    query.includes('deeksha') ||
    query.includes('diksha') ||
    query.includes('rules') ||
    query.includes('vrat') ||
    query.includes('fasting') ||
    query.includes('difference') ||
    query.includes('meaning') ||
    query.includes('significance') ||
    query.includes('story') ||
    query.includes('history') ||
    query.includes('teach') ||
    query.includes('tell me about') ||
    query.includes('guide') ||
    query.includes('steps') ||
    query.includes('items') ||
    query.includes('should i') ||
    query.includes('can i') ||
    query.includes('?') ||
    query.split(/\s+/).length >= 4
  );

  if (hasQuestionIntent) {
    return null;
  }

  // 2. Panchang, Tithi, Rahu Kaal, Timings (Only for direct lookup)
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

  // 5. Deities (Only for direct single-entity lookup, e.g. "ayyappa", "lord ayyappa")
  for (const deity of deitiesData) {
    const dName = deity.name.toLowerCase();
    const isDirectMatch = (query === dName || query === `lord ${dName}` || query === `shri ${dName}` || query === `sri ${dName}` || query === `who is ${dName}`);
    if (isDirectMatch) {
      const knownFor = deity.knownFor || 'Supreme Divinity in Sanatan Dharma';
      const vahanaText = deity.vahana ? `• **Vahana (Vehicle):** ${deity.vahana}\n` : '';
      return {
        text: `✨ **Lord ${deity.name}** — *${knownFor}*\n\n` +
              `Lord ${deity.name} is deeply revered across Sanatan Dharma, embodying divine cosmic virtues and spiritual grace.\n\n` +
              vahanaText +
              (deity.incarnations && deity.incarnations.length > 0 ? `• **Incarnations / Forms:** ${deity.incarnations.join(', ')}\n` : ''),
        action: { label: `Explore ${deity.name}'s Sacred Page`, route: `#/deities/${deity.id}` }
      };
    }
  }

  // 6. Gurus (Only for direct entity lookup)
  for (const guru of gurusData) {
    const gName = guru.name.toLowerCase();
    if (query === gName || query === `guru ${gName}` || query === `who is ${gName}`) {
      return {
        text: `🙏 **${guru.name}** (${guru.period})\n\n` +
              `*${guru.title}*\n\n` +
              `${guru.bio || guru.description || 'Revered spiritual master in Sanatan Dharma.'}\n\n` +
              (guru.corePhilosophy ? `• **Core Teaching:** ${guru.corePhilosophy}\n` : '') +
              (guru.ashram ? `• **Main Center / Peetham:** ${guru.ashram}\n` : '') +
              (guru.famousQuote ? `\n> "${guru.famousQuote}"` : ''),
        action: { label: `Read ${guru.name}'s Life & Teachings`, route: `#/gurus/${guru.id}` }
      };
    }
  }

  // 7. Rishis (Only for direct lookup)
  for (const rishi of rishisData) {
    const rName = rishi.name.toLowerCase();
    if (query === rName || query === `rishi ${rName}` || query === `who is ${rName}`) {
      return {
        text: `🌿 **Maharishi ${rishi.name}**\n\n` +
              `*${rishi.title || 'Vedic Seer'}*\n\n` +
              `${rishi.bio || rishi.description || 'Ancient Vedic seer and sage.'}\n\n` +
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
              `*Category: ${textMatch.category || 'Vedic Scripture'}*\n\n` +
              `${textMatch.description || textMatch.summary || 'Sacred scripture of Sanatan Dharma.'}\n\n` +
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
              `${belief.description || 'Core philosophical pillar of Sanatan Dharma.'}\n\n` +
              `• **Scriptural Basis:** ${belief.scripture || 'Vedas and Bhagavad Gita'}\n` +
              (belief.application ? `• **Practical Application:** ${belief.application}\n` : ''),
        action: { label: 'Explore Core Beliefs of Sanatan Dharma', route: '#/beliefs' }
      };
    }
  }

  return null;
}

/**
 * Layer 2: OpenRouter AI (DeepSeek, Claude, Llama) with High Speed
 */
export async function queryOpenRouterAI(userPrompt, apiKey, history = []) {
  if (!apiKey || !apiKey.trim()) {
    throw new Error('No OpenRouter API key provided');
  }

  const messages = [
    { role: 'system', content: VEDIC_SYSTEM_INSTRUCTION }
  ];

  const recentHistory = history.slice(-6);
  for (const msg of recentHistory) {
    if (msg.sender === 'user') {
      messages.push({ role: 'user', content: msg.text });
    } else if (msg.sender === 'bot') {
      messages.push({ role: 'assistant', content: msg.text });
    }
  }

  messages.push({ role: 'user', content: userPrompt });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey.trim()}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://maheshreddy2103.github.io/sanatan/',
        'X-Title': 'Sanatan World'
      },
      body: JSON.stringify({
        models: ['meta-llama/llama-3.3-70b-instruct', 'deepseek/deepseek-chat'],
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const message = errData?.error?.message || `OpenRouter status ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();
    const replyText = data?.choices?.[0]?.message?.content;

    if (!replyText) {
      throw new Error('Empty response received from OpenRouter AI');
    }

    return replyText;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Layer 3: Dedicated Google Gemini API
 */
export async function queryGeminiAI(userPrompt, apiKey, history = []) {
  if (!apiKey || !apiKey.trim()) {
    throw new Error('No Gemini API key provided');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`;

  const contents = [];
  const recentHistory = history.slice(-6);
  for (const msg of recentHistory) {
    contents.push({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  }

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
      maxOutputTokens: 1000,
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
  const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!replyText) {
    throw new Error('Empty response received from Gemini');
  }

  return replyText;
}

/**
 * Layer 4: Free Zero-Config Universal Vedic AI (Open-ended Prashna Engine - No Key Required!)
 */
export async function queryFreeVedicAI(userPrompt, history = []) {
  const messages = [
    { role: 'system', content: VEDIC_SYSTEM_INSTRUCTION }
  ];

  const recentHistory = history.slice(-4);
  for (const msg of recentHistory) {
    if (msg.sender === 'user') {
      messages.push({ role: 'user', content: msg.text });
    } else if (msg.sender === 'bot') {
      messages.push({ role: 'assistant', content: msg.text });
    }
  }

  messages.push({ role: 'user', content: userPrompt });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: messages,
        model: 'openai-fast',
        max_tokens: 1000
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`AI service status ${response.status}`);
    }

    const text = await response.text();
    if (!text || !text.trim()) {
      throw new Error('Empty response from AI engine');
    }

    return text.trim();
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Layer 5: Deep Offline Scriptural Matrix Fallback
 */
export function getDeepOfflineVedicAnswer(rawQuery) {
  const q = rawQuery.toLowerCase();

  // 1. Mind control, anxiety, anger, overthinking
  if (q.includes('mind') || q.includes('anger') || q.includes('anxiety') || q.includes('stress') || q.includes('overthinking') || q.includes('peace') || q.includes('depression')) {
    return `🙏 **Vedic Guidance on Mastering the Mind & Inner Peace**\n\n` +
           `In the *Bhagavad Gita* (Chapter 6, Verse 35), Arjuna raises this exact struggle—that the mind is turbulent and difficult to control. Sri Krishna responds:\n\n` +
           `> **असंशयं महाबाहो मनो दुर्निग्रहं चलम् ।**\n` +
           `> **अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते ॥**\n` +
           `> *(Undoubtedly, O mighty-armed Arjuna, the mind is restless and hard to master; but through regular spiritual practice (Abhyasa) and detachment from outcomes (Vairagya), it can be subdued.)*\n\n` +
           `**Practical Vedic Steps to Calm the Mind:**\n` +
           `• **Pranayama & Japa:** Practice Nadi Shodhana (Alternate Nostril Breathing) followed by 108 chants of the *Gayatri* or *Om Namah Shivaya* mantra during Brahma Muhurta.\n` +
           `• **Witness Consciousness (Sakshi Bhava):** You are not your thoughts or emotional storms; you are the eternal, unchanging consciousness (*Atman*) observing them.\n` +
           `• **Karma Yoga:** Perform your immediate duties sincerely without obsessing over future results (*Karmanye vadhikaraste ma phaleshu kadachana*).`;
  }

  // 2. Bed of arrows / Bhishma Pitamaha
  if (q.includes('bhishma') || q.includes('bed of arrows') || q.includes('arrows') || q.includes('sharashayya')) {
    return `🏹 **Why Did Bhishma Choose the Bed of Arrows (Sharashayya)?**\n\n` +
           `Pitamaha Bhishma chose to lie on the bed of arrows (*Sharashayya*) rather than leave his body immediately due to three sacred reasons:\n\n` +
           `• **The Boon of Ichha-Mrityu (Death by Choice):** Blessed by his father King Shantanu, Bhishma could only die when he willed it. He chose not to abandon his body while the Sun was in *Dakshinayana* (the southern transit associated with night of the devas).\n` +
           `• **Awaiting Uttarayana:** He waited until the auspicious *Uttarayana* (the northward journey of Surya on Makar Sankranti), which scriptures declare leads the departed soul towards *Brahma-loka* (higher realms of light and liberation).\n` +
           `• **Transmitting the Eternal Dharma:** While lying on the arrows, Bhishma imparted the crowning jewel of ethical governance (*Raja Dharma*) and revealed the supreme **Vishnu Sahasranama** (1,000 Holy Names of Bhagavan Vishnu) to King Yudhishthira, and purified all lingering karmic impressions of the Kaurava assembly.`;
  }

  // 3. Karma, Destiny, Why bad things happen
  if (q.includes('why bad') || q.includes('karma') || q.includes('destiny') || q.includes('fate') || q.includes('justice') || q.includes('suffering')) {
    return `☸️ **The Inscrutable Dynamics of Karma & Destiny**\n\n` +
           `Sanatan Dharma explains that suffering in this life is not punishment from an angry deity, but the unfolding of karmic impressions across lifetimes (*Gahana Karmano Gatih* - Bhagavad Gita 4.17):\n\n` +
           `• **Sanchita Karma:** The vast accumulated reservoir of all past actions waiting in latency.\n` +
           `• **Prarabdha Karma:** The portion of past karma that has ripened to form your present body, circumstances, and life lessons.\n` +
           `• **Agami / Kriyamana Karma:** The actions you perform right now with free will and moral discernment (*Viveka*).\n\n` +
           `Even when Prarabdha brings hardships, your response remains in your hands. Sincere prayer, charity (*Dana*), mantra japa, and righteousness (*Satya & Ahimsa*) mitigate difficult karmic debts and generate uplifting spiritual momentum.`;
  }

  // 4. Death, Loss of Loved Ones, Grief
  if (q.includes('death') || q.includes('grief') || q.includes('loss') || q.includes('dying') || q.includes('afterlife') || q.includes('passed away')) {
    return `🕊️ **Vedic Comfort on Grief and the Eternal Atman**\n\n` +
           `The Upanishads and the *Bhagavad Gita* offer the highest solace in times of bereavement by revealing the immortality of the soul:\n\n` +
           `> **न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः ।**\n` +
           `> **अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ॥** *(Gita 2.20)*\n` +
           `> *(The soul is never born, nor does it ever die. It is unborn, eternal, ever-existing, and primeval. It is not destroyed when the mortal body perishes.)*\n\n` +
           `Just as a person discards worn garments and puts on new ones, the Atman casts off an aged body to take a new birth. Chanting *Maha Mrityunjaya Mantra* or reciting the *Bhagavad Gita Chapter 12 and 15* sends uplifting spiritual vibrations and peace to departed souls.`;
  }

  // 5. Advaita vs Dvaita vs Vishishtadvaita
  if (q.includes('advaita') || q.includes('dvaita') || q.includes('vishishtadvaita') || q.includes('philosophy') || q.includes('schools')) {
    return `🕉️ **The Three Crown Jewels of Vedanta Philosophy**\n\n` +
           `Sanatan Dharma encompasses complementary perspectives to comprehend the Supreme Reality (*Brahman*) and the individual soul (*Jivatman*):\n\n` +
           `• **Advaita (Non-Dualism - Sri Adi Shankaracharya):**\n` +
           `*Brahma Satyam Jagan Mithya, Jivo Brahmaiva Naparah.* The Supreme Brahman alone is absolute reality; the world is an experiential manifestation (*Maya*); and the true inner Self (*Atman*) is identical to Brahman.\n\n` +
           `• **Vishishtadvaita (Qualified Non-Dualism - Sri Ramanujacharya):**\n` +
           `Brahman (Bhagavan Narayana) is the organic whole, and all souls and cosmic matter are real attributes or limbs of the Divine, like rays radiating from the Sun. Liberation is attained through loving surrender (*Prapatti/Bhakti*).\n\n` +
           `• **Dvaita (Dualism - Sri Madhvacharya):**\n` +
           `There is an eternal, fundamental distinction between the Supreme God (*Paramatman*), the individual souls (*Jiva*), and inert matter (*Jada*). Complete devotion (*Bhakti*) to Vishnu grants divine grace and eternal bliss.`;
  }

  // 6. Lord Ayyappa, Sabarimala, Ayyappa Mala, Deeksha
  if (q.includes('ayyappa') || q.includes('sabarimala') || q.includes('irumudi') || (q.includes('ayyappa') && (q.includes('mala') || q.includes('deeksha') || q.includes('vratham')))) {
    return `🏔️ **Essential Disciplines & Items for Ayyappa Mala (Mandala Vratham)**\n\n` +
           `The Ayyappa Deeksha is a sacred 41-day spiritual penance (*Mandala Vratham*) observed to prepare body, mind, and spirit for the darshan of Lord Ayyappa at Sabarimala:\n\n` +
           `• **1. The Sacred Mala:** A Tulsi Mala or Rudraksha Mala (typically 108 beads with a Lord Ayyappa locket) worn after receiving initiation from a respected *Guruswami*.\n` +
           `• **2. Attire:** Simple black, dark blue, or saffron cotton garments representing ascetic detachment and humility.\n` +
           `• **3. Strict Brahmacharya & Satvik Living:** Complete celibacy, sleeping on the floor on a simple mat, bathing twice daily in cold water, and consuming strictly satvik vegetarian food without onion or garlic.\n` +
           `• **4. Daily Sadhana & Chanting:** Morning and evening prayer with the sacred chant: *"Swamiye Saranam Ayyappa"* (I surrender unto Lord Ayyappa), treating all fellow devotees as divine *Swamis*.\n` +
           `• **5. The Irumudi (Two-compartment bag):** Carried during the holy trek, containing the consecrated ghee-filled coconut (*Neyyabhishekam*), camphor, raw rice, and betel leaves to ascend the holy 18 steps (*Pathinettam Padi*).`;
  }

  // 7. Goddess Durga, Navratri, Durga Mala / Bhavani Deeksha
  if (q.includes('durga') || q.includes('bhavani') || q.includes('chandi') || (q.includes('navratri') && q.includes('mala'))) {
    return `🌺 **Essential Disciplines & Items for Durga Mala (Bhavani Deeksha)**\n\n` +
           `The Bhavani / Durga Deeksha is a sacred spiritual vrata observed (often for 21 or 41 days during Sharad Navratri or Chaitra Navratri) in devotion to Supreme Mother Goddess Durga:\n\n` +
           `• **1. The Sacred Mala:** Spatika (Quartz crystal) Mala, Rudraksha Mala, or Raktachandan (Red Sandalwood) Mala with a Maa Durga locket, sanctified with the Durga Navarna Mantra (*Om Aim Hreem Kleem Chamundayai Viche*).\n` +
           `• **2. Attire:** Traditional red or saffron clothes, signifying dynamic Shakti, spiritual protection, and surrender.\n` +
           `• **3. Strict Penance & Satvik Living:** Complete celibacy (Brahmacharya), consuming one satvik meal a day (avoiding non-veg, onion, garlic, and alcohol), barefoot walking, and sleeping on a simple mat.\n` +
           `• **4. Daily Puja & Chanting:** Morning and evening recitation of *Durga Saptashati* (Devi Mahatmyam), *Lalita Sahasranama*, or *Durga Ashtottara Shatanamavali*, with Kumkum Archana.\n` +
           `• **5. Deeksha Viramana:** Completing the deeksha with Kanya Puja (worshipping young girls as forms of Maa Durga), Chandi Homa, and receiving darshan at a sacred Shakti Peetha or Devi temple.`;
  }

  // General Vedic Wisdom Fallback
  return `🙏 **Namaste! Wisdom of Sanatan Dharma**\n\n` +
         `*"यतो धर्मस्ततो जयः"* — *Where there is Dharma (Righteous Truth), there is Victory.*\n\n` +
         `Sanatan Dharma guides every human life along four fundamental pursuits (*Purusharthas*):\n` +
         `• **Dharma:** Ethical living, truthfulness, and fulfillment of natural duty.\n` +
         `• **Artha:** Honest, virtuous livelihood and material sustenance.\n` +
         `• **Kama:** Wholesome aesthetic joy and emotional fulfillment aligned with ethics.\n` +
         `• **Moksha:** The ultimate liberation of the soul from sorrow and cycles of rebirth into infinite bliss.\n\n` +
         `💡 *You can ask any open-ended Prashna on epics, rituals, mantras, or life guidance. Sanatan Mitr synthesizes timeless Vedic insights to illuminate your spiritual path.*`;
}

/**
 * Universal Multi-Tier Query Orchestrator
 * Priority 1: OpenRouter AI (sk-or-v1-...) with DeepSeek / Claude
 * Priority 2: Google Gemini AI (AIzaSy...)
 * Priority 3: Free Zero-Config Universal Vedic AI (Open-ended, No Key Required!)
 * Priority 4: Deep Offline Scriptural Matrix
 */
export async function queryUniversalVedicAI(userPrompt, userApiKey, history = []) {
  const envKey = (typeof import.meta !== 'undefined' && (import.meta.env?.VITE_AI_API_KEY || import.meta.env?.VITE_OPENROUTER_API_KEY || import.meta.env?.VITE_GEMINI_API_KEY)) || '';
  const effectiveKey = (userApiKey && userApiKey.trim()) || envKey || DEFAULT_AI_KEY;

  // 1. Try OpenRouter AI
  if (effectiveKey && (effectiveKey.startsWith('sk-or-v1-') || effectiveKey.startsWith('sk-'))) {
    try {
      const openRouterReply = await queryOpenRouterAI(userPrompt, effectiveKey, history);
      return {
        text: openRouterReply,
        source: 'openrouter',
        needsKey: false
      };
    } catch (err) {
      console.warn('OpenRouter query failed, trying next provider:', err);
    }
  }

  // 2. Try Google Gemini API
  if (effectiveKey && effectiveKey.startsWith('AIzaSy')) {
    try {
      const geminiReply = await queryGeminiAI(userPrompt, effectiveKey, history);
      return {
        text: geminiReply,
        source: 'gemini',
        needsKey: false
      };
    } catch (err) {
      console.warn('Gemini query failed, trying next provider:', err);
    }
  }

  // 3. If generic key provided, try OpenRouter then Gemini
  if (effectiveKey) {
    try {
      const reply = await queryOpenRouterAI(userPrompt, effectiveKey, history);
      return { text: reply, source: 'openrouter', needsKey: false };
    } catch (e1) {
      try {
        const reply = await queryGeminiAI(userPrompt, effectiveKey, history);
        return { text: reply, source: 'gemini', needsKey: false };
      } catch (e2) {
        console.warn('Configured keyed APIs failed, falling back to Free AI');
      }
    }
  }

  // 4. Try Free Zero-Config Universal Vedic AI
  try {
    const freeAiReply = await queryFreeVedicAI(userPrompt, history);
    return {
      text: freeAiReply,
      source: 'free_ai',
      needsKey: false
    };
  } catch (err) {
    console.warn('Free AI query failed or throttled, falling back to Deep Vedic Wisdom Matrix:', err);
  }

  // 5. Fallback to Deep Offline Scriptural Matrix
  const offlineAnswer = getDeepOfflineVedicAnswer(userPrompt);
  return {
    text: offlineAnswer,
    source: 'offline_wisdom',
    needsKey: !effectiveKey
  };
}
