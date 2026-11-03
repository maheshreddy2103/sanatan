// ============================================================================
// VEDIC PANCHANGA & ASTRONOMICAL COMPUTATION UTILITIES
// ============================================================================

// 1. Holy Pilgrimage Cities with exact Coordinates for Accurate Muhurtas
export const HOLY_CITIES = [
  { id: 'varanasi', name: 'Varanasi (Kashi)', state: 'Uttar Pradesh', lat: 25.3176, lng: 82.9739, default: true },
  { id: 'ayodhya', name: 'Ayodhya', state: 'Uttar Pradesh', lat: 26.7922, lng: 82.1998 },
  { id: 'ujjain', name: 'Ujjain (Mahakal)', state: 'Madhya Pradesh', lat: 23.1765, lng: 75.7885 },
  { id: 'haridwar', name: 'Haridwar (Ganga)', state: 'Uttarakhand', lat: 29.9457, lng: 78.1642 },
  { id: 'tirupati', name: 'Tirupati (Balaji)', state: 'Andhra Pradesh', lat: 13.6288, lng: 79.4192 },
  { id: 'mathura', name: 'Mathura (Braj)', state: 'Uttar Pradesh', lat: 27.4924, lng: 77.6737 },
  { id: 'delhi', name: 'New Delhi (Indraprastha)', state: 'Delhi NCR', lat: 28.6139, lng: 77.2090 },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639 },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 }
];

// 2. The 30 Tithis (15 Shukla + 15 Krishna)
export const TITHI_DATA = [
  { num: 1, name: 'Pratipada', devanagari: 'प्रतिपदा', deity: 'Agni (Fire)', significance: 'Good for inaugurations, fasting, and spiritual initiation.' },
  { num: 2, name: 'Dwitiya', devanagari: 'द्वितीया', deity: 'Brahma (Creator)', significance: 'Auspicious for ceremonies, learning, and entering new ventures.' },
  { num: 3, name: 'Tritiya', devanagari: 'तृतीया', deity: 'Gauri (Parvati)', significance: 'Highly auspicious for marriage, virtue, and arts. Associated with Akshaya Tritiya.' },
  { num: 4, name: 'Chaturthi', devanagari: 'चतुर्थी', deity: 'Ganesha', significance: 'Sacred to Lord Ganesha. Overcomes obstacles; Sankashti & Vinayaka Chaturthi.' },
  { num: 5, name: 'Panchami', devanagari: 'पञ्चमी', deity: 'Nagas & Saraswati', significance: 'Favorable for knowledge, music, Naga worship, and Vasant Panchami.' },
  { num: 6, name: 'Shasthi', devanagari: 'षष्ठी', deity: 'Kartikeya (Murugan)', significance: 'Favors valor, discipline, victory over enemies, and Skanda Shasthi.' },
  { num: 7, name: 'Saptami', devanagari: 'सप्तमी', deity: 'Surya (Sun God)', significance: 'Dedicated to the Sun God Surya. Brings vitality, health, and radiant energy.' },
  { num: 8, name: 'Ashtami', devanagari: 'अष्टमी', deity: 'Durga & Rudra', significance: 'Powerful Shakti day. Ideal for spiritual austerity, Durga Ashtami, and Krishna Janmashtami.' },
  { num: 9, name: 'Navami', devanagari: 'नवमी', deity: 'Durga & Sri Rama', significance: 'Celebrates Rama Navami and Goddess Siddhidatri. Auspicious for spiritual victory.' },
  { num: 10, name: 'Dashami', devanagari: 'दशमी', deity: 'Yama & Digpalas', significance: 'Day of righteous conduct and celebration of Vijayadashami / Dussehra.' },
  { num: 11, name: 'Ekadashi', devanagari: 'एकादशी', deity: 'Lord Vishnu', significance: 'Supreme fasting day in Sanatan Dharma. Purifies mind, body, and burns accumulated karma.' },
  { num: 12, name: 'Dwadashi', devanagari: 'द्वादशी', deity: 'Vishnu (Damodara)', significance: 'Parana (fast-breaking) after Ekadashi, Tulasi Vivah, and sacred charity (Daan).' },
  { num: 13, name: 'Trayodashi', devanagari: 'त्रयोदशी', deity: 'Shiva & Kamadeva', significance: 'Sacred Pradosham day. Highly auspicious for evening Shiva Puja and destroying karma.' },
  { num: 14, name: 'Chaturdashi', devanagari: 'चतुर्दशी', deity: 'Shiva (Rudra)', significance: 'Sacred to Lord Shiva (Maha Shivaratri & Masik Shivaratri). Deep spiritual focus.' },
  { num: 15, name: 'Purnima', devanagari: 'पूर्णिमा', deity: 'Chandra & Satyanarayan', significance: 'Full Moon day. Divine illumination, Satyanarayan Puja, and spiritual enlightenment.' },
  // Krishna Paksha 15th:
  { num: 30, name: 'Amavasya', devanagari: 'अमावास्या', deity: 'Pitrus (Ancestors)', significance: 'New Moon day. Sacred for Pitru Tarpan (ancestral offerings) and inner contemplation.' }
];

// 3. The 27 Nakshatras
export const NAKSHATRA_DATA = [
  { id: 1, name: 'Ashwini', devanagari: 'अश्विनी', deity: 'Ashvini Kumaras', symbol: 'Horse head', lord: 'Ketu', nature: 'Swift, healing, dynamic' },
  { id: 2, name: 'Bharani', devanagari: 'भरणी', deity: 'Yama', symbol: 'Yoni', lord: 'Venus', nature: 'Restrained, transformative' },
  { id: 3, name: 'Krittika', devanagari: 'कृत्तिका', deity: 'Agni', symbol: 'Flame / Razor', lord: 'Sun', nature: 'Fiery, purifying, sharp' },
  { id: 4, name: 'Rohini', devanagari: 'रोहिणी', deity: 'Brahma / Prajapati', symbol: 'Chariot', lord: 'Moon', nature: 'Auspicious, fertile, beauty' },
  { id: 5, name: 'Mrigashira', devanagari: 'मृगशीर्षा', deity: 'Soma (Chandra)', symbol: 'Deer head', lord: 'Mars', nature: 'Gentle, searching, curious' },
  { id: 6, name: 'Ardra', devanagari: 'आर्द्रा', deity: 'Rudra (Shiva)', symbol: 'Teardrop', lord: 'Rahu', nature: 'Deep transformation, storm' },
  { id: 7, name: 'Punarvasu', devanagari: 'पुनर्वसु', deity: 'Aditi (Cosmic Mother)', symbol: 'Bow & Quiver', lord: 'Jupiter', nature: 'Nourishing, renewal, virtue' },
  { id: 8, name: 'Pushya', devanagari: 'पुष्य', deity: 'Brihaspati', symbol: 'Lotus / Cow udder', lord: 'Saturn', nature: 'Most auspicious star for all deeds' },
  { id: 9, name: 'Ashlesha', devanagari: 'आश्लेषा', deity: 'Sarpas (Nagas)', symbol: 'Coiled serpent', lord: 'Mercury', nature: 'Mystic, kundalini energy' },
  { id: 10, name: 'Magha', devanagari: 'मघा', deity: 'Pitrus (Ancestors)', symbol: 'Royal Throne', lord: 'Ketu', nature: 'Noble, royal, ancestral legacy' },
  { id: 11, name: 'Purva Phalguni', devanagari: 'पूर्वाफाल्गुनी', deity: 'Bhaga (Fortune)', symbol: 'Hammock', lord: 'Venus', nature: 'Joy, affection, relaxation' },
  { id: 12, name: 'Uttara Phalguni', devanagari: 'उत्तराफाल्गुनी', deity: 'Aryaman (Friendship)', symbol: 'Bed legs', lord: 'Sun', nature: 'Generous, patronage, duty' },
  { id: 13, name: 'Hasta', devanagari: 'हस्त', deity: 'Savitr (Sun)', symbol: 'Open Hand', lord: 'Moon', nature: 'Craftsmanship, skill, healing' },
  { id: 14, name: 'Chitra', devanagari: 'चित्रा', deity: 'Vishwakarma (Divine Architect)', symbol: 'Bright Jewel', lord: 'Mars', nature: 'Brilliant, creative, aesthetic' },
  { id: 15, name: 'Swati', devanagari: 'स्वाती', deity: 'Vayu (Wind)', symbol: 'Coral / Young shoot', lord: 'Rahu', nature: 'Independent, gentle, flexible' },
  { id: 16, name: 'Vishakha', devanagari: 'विशाखा', deity: 'Indragni', symbol: 'Triumphal Arch', lord: 'Jupiter', nature: 'Goal-oriented, triumphant' },
  { id: 17, name: 'Anuradha', devanagari: 'अनुराधा', deity: 'Mitra (Divine Friend)', symbol: 'Lotus flower', lord: 'Saturn', nature: 'Devotional, harmonious, friendship' },
  { id: 18, name: 'Jyeshtha', devanagari: 'ज्येष्ठा', deity: 'Indra', symbol: 'Circular Amulet', lord: 'Mercury', nature: 'Elder, protective, authoritative' },
  { id: 19, name: 'Mula', devanagari: 'मूल', deity: 'Nirriti', symbol: 'Tied roots', lord: 'Ketu', nature: 'Root-seeking, philosophical' },
  { id: 20, name: 'Purva Ashadha', devanagari: 'पूर्वाषाढा', deity: 'Apas (Waters)', symbol: 'Fan / Sieve', lord: 'Venus', nature: 'Invincible, purification' },
  { id: 21, name: 'Uttara Ashadha', devanagari: 'उत्तराषाढा', deity: 'Vishvadevas (Universal Gods)', symbol: 'Elephant Tusk', lord: 'Sun', nature: 'Permanent victory, steadfast' },
  { id: 22, name: 'Shravana', devanagari: 'श्रवण', deity: 'Vishnu', symbol: 'Three footprints / Ear', lord: 'Moon', nature: 'Learning, listening, sacred knowledge' },
  { id: 23, name: 'Dhanishta', devanagari: 'धनिष्ठा', deity: 'Ashta Vasus', symbol: 'Flute / Drum (Mridanga)', lord: 'Mars', nature: 'Musical, prosperous, rhythm' },
  { id: 24, name: 'Shatabhisha', devanagari: 'शतभिषा', deity: 'Varuna (Cosmic Ocean)', symbol: 'Empty Circle / 100 Physicians', lord: 'Rahu', nature: 'Healing, mystery, cosmic vision' },
  { id: 25, name: 'Purva Bhadrapada', devanagari: 'पूर्वभाद्रपदा', deity: 'Aja Ekapada', symbol: 'Front of funeral cot', lord: 'Jupiter', nature: 'Ascetic, spiritual awakening' },
  { id: 26, name: 'Uttara Bhadrapada', devanagari: 'उत्तरभाद्रपदा', deity: 'Ahirbudhnya (Deep Serpent)', symbol: 'Back of cot / Twin fish', lord: 'Saturn', nature: 'Wisdom, profound peace, samadhi' },
  { id: 27, name: 'Revati', devanagari: 'रेवती', deity: 'Pushan (Nourisher)', symbol: 'Fish swimming', lord: 'Mercury', nature: 'Gentle, safe journey, liberation' }
];

// 4. The 27 Yogas
export const YOGA_DATA = [
  'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti',
  'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi',
  'Vyatipata', 'Variyan', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla',
  'Brahma', 'Indra', 'Vaidhriti'
];

// 5. The 11 Karanas
export const KARANA_DATA = [
  { name: 'Bava', deity: 'Indra', nature: 'Char (Movable) • Auspicious' },
  { name: 'Balava', deity: 'Brahma', nature: 'Char (Movable) • Auspicious' },
  { name: 'Kaulava', deity: 'Mitra', nature: 'Char (Movable) • Auspicious' },
  { name: 'Taitila', deity: 'Aryaman', nature: 'Char (Movable) • Auspicious' },
  { name: 'Garija', deity: 'Bhumi Devi', nature: 'Char (Movable) • Auspicious' },
  { name: 'Vanija', deity: 'Shri Lakshmi', nature: 'Char (Movable) • Trade & Wealth' },
  { name: 'Vishti (Bhadra)', deity: 'Yama', nature: 'Char (Movable) • Inauspicious for auspicious starts, good for war/defense' },
  { name: 'Shakuni', deity: 'Kali', nature: 'Sthir (Fixed) • Caution' },
  { name: 'Chatushpada', deity: 'Vrishabha', nature: 'Sthir (Fixed) • Ancestral rites' },
  { name: 'Naga', deity: 'Sarpa', nature: 'Sthir (Fixed) • Spiritual tapas' },
  { name: 'Kintughna', deity: 'Gandharva', nature: 'Sthir (Fixed) • Moderately Auspicious' }
];

// 6. The 12 Lunar Months (Chaitra to Phalguna)
export const LUNAR_MONTHS = [
  { name: 'Chaitra', devanagari: 'चैत्र', season: 'Vasanta (Spring)' },
  { name: 'Vaishakha', devanagari: 'वैशाख', season: 'Vasanta (Spring)' },
  { name: 'Jyeshtha', devanagari: 'ज्येष्ठ', season: 'Grishma (Summer)' },
  { name: 'Ashadha', devanagari: 'आषाढ', season: 'Grishma (Summer)' },
  { name: 'Shravana', devanagari: 'श्रावण', season: 'Varsha (Monsoon)' },
  { name: 'Bhadrapada', devanagari: 'भाद्रपद', season: 'Varsha (Monsoon)' },
  { name: 'Ashwina', devanagari: 'आश्विन', season: 'Sharad (Autumn)' },
  { name: 'Kartika', devanagari: 'कार्तिक', season: 'Sharad (Autumn)' },
  { name: 'Margashirsha', devanagari: 'मार्गशीर्ष', season: 'Hemanta (Pre-Winter)' },
  { name: 'Pausha', devanagari: 'पौष', season: 'Hemanta (Pre-Winter)' },
  { name: 'Magha', devanagari: 'माघ', season: 'Shishira (Winter)' },
  { name: 'Phalguna', devanagari: 'फाल्गुन', season: 'Shishira (Winter)' }
];

// 7. Weekdays (Vara)
export const VARA_DATA = [
  { name: 'Ravivara', english: 'Sunday', devanagari: 'रविवार', deity: 'Surya Bhagwan', planet: 'Sun', color: '#EA580C' },
  { name: 'Somavara', english: 'Monday', devanagari: 'सोमवार', deity: 'Lord Shiva & Chandra', planet: 'Moon', color: '#38BDF8' },
  { name: 'Mangalavara', english: 'Tuesday', devanagari: 'मंगलवार', deity: 'Hanuman & Kartikeya', planet: 'Mars', color: '#E11D48' },
  { name: 'Budhavara', english: 'Wednesday', devanagari: 'बुधवार', deity: 'Lord Ganesha & Vishnu', planet: 'Mercury', color: '#10B981' },
  { name: 'Guruvara', english: 'Thursday', devanagari: 'गुरुवार', deity: 'Brihaspati & Dattatreya', planet: 'Jupiter', color: '#F59E0B' },
  { name: 'Shukravara', english: 'Friday', devanagari: 'शुक्रवार', deity: 'Maa Lakshmi & Durga', planet: 'Venus', color: '#EC4899' },
  { name: 'Shanivara', english: 'Saturday', devanagari: 'शनिवार', deity: 'Shani Dev & Hanuman', planet: 'Saturn', color: '#6366F1' }
];

// ---------------------------------------------------------------------------
// ASTRONOMICAL COMPUTATIONS
// ---------------------------------------------------------------------------

// Calculate Julian Day Number from Gregorian Date
function getJulianDay(date) {
  const time = date.getTime();
  return (time / 86400000) + 2440587.5;
}

// Approximate Sun and Moon Longitude
function getLuniSolarPositions(date) {
  const jd = getJulianDay(date);
  const d = jd - 2451545.0; // days since J2000.0

  // Mean anomaly of the Sun
  const g = (357.529 + 0.98560028 * d) % 360;
  // Mean longitude of the Sun
  const q = (280.459 + 0.98564736 * d) % 360;
  // Ecliptic longitude of the Sun
  const sunLng = (q + 1.915 * Math.sin(g * Math.PI / 180) + 0.020 * Math.sin(2 * g * Math.PI / 180)) % 360;

  // Moon mean longitude
  const l0 = (218.316 + 13.176396 * d) % 360;
  // Moon mean anomaly
  const m = (134.963 + 13.064993 * d) % 360;
  // Moon ecliptic longitude
  const moonLng = (l0 + 6.289 * Math.sin(m * Math.PI / 180)) % 360;

  const normalizedSun = (sunLng + 360) % 360;
  const normalizedMoon = (moonLng + 360) % 360;

  return { sunLng: normalizedSun, moonLng: normalizedMoon };
}

// Calculate Sunrise and Sunset for a City
export function getSunTimes(date, lat, lng) {
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  
  // Approximate solar declination
  const declination = 23.45 * Math.sin((360 / 365) * (dayOfYear - 81) * (Math.PI / 180));
  
  // Hour angle
  const latRad = lat * (Math.PI / 180);
  const decRad = declination * (Math.PI / 180);
  const cosHourAngle = -Math.tan(latRad) * Math.tan(decRad);
  const clampedCos = Math.max(-1, Math.min(1, cosHourAngle));
  const hourAngle = (Math.acos(clampedCos) * 180) / Math.PI;

  // Local solar noon in minutes from midnight (IST timezone UTC+5.5 = 82.5°E)
  const timeOffset = (82.5 - lng) * 4; // minutes
  const solarNoonMin = 12 * 60 + timeOffset;

  const sunriseMin = Math.round(solarNoonMin - (hourAngle * 4));
  const sunsetMin = Math.round(solarNoonMin + (hourAngle * 4));

  const formatMin = (m) => {
    const hrs = Math.floor(m / 60);
    const mins = Math.floor(m % 60);
    const period = hrs >= 12 ? 'PM' : 'AM';
    const displayHrs = hrs > 12 ? hrs - 12 : (hrs === 0 ? 12 : hrs);
    return `${String(displayHrs).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${period}`;
  };

  // Brahma Muhurta: 96 minutes to 48 minutes before sunrise
  const brahmaStartMin = sunriseMin - 96;
  const brahmaEndMin = sunriseMin - 48;

  // Abhijit Muhurta: 24 minutes before solar noon to 24 minutes after
  const abhijitStartMin = solarNoonMin - 24;
  const abhijitEndMin = solarNoonMin + 24;

  return {
    sunrise: formatMin(sunriseMin),
    sunset: formatMin(sunsetMin),
    sunriseRawMinutes: sunriseMin,
    sunsetRawMinutes: sunsetMin,
    solarNoon: formatMin(solarNoonMin),
    brahmaMuhurta: `${formatMin(brahmaStartMin)} – ${formatMin(brahmaEndMin)}`,
    abhijitMuhurta: `${formatMin(abhijitStartMin)} – ${formatMin(abhijitEndMin)}`
  };
}

// Calculate Rahu Kaalam, Yamaganda, Gulika based on Day of Week
export function getMuhurtaWindows(date, sunriseMin = 360, sunsetMin = 1080) {
  const day = date.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const dayLengthMin = sunsetMin - sunriseMin;
  const partLength = dayLengthMin / 8; // 8 parts of daytime

  // Rahu Kaal part index (1 to 8): Sun: 8, Mon: 2, Tue: 7, Wed: 5, Thu: 6, Fri: 4, Sat: 3
  const rahuParts = [8, 2, 7, 5, 6, 4, 3];
  // Yamaganda part index: Sun: 5, Mon: 4, Tue: 3, Wed: 2, Thu: 1, Fri: 7, Sat: 6
  const yamaParts = [5, 4, 3, 2, 1, 7, 6];
  // Gulika part index: Sun: 7, Mon: 6, Tue: 5, Wed: 4, Thu: 3, Fri: 2, Sat: 1
  const gulikaParts = [7, 6, 5, 4, 3, 2, 1];

  const formatWindow = (partIndex) => {
    const startM = sunriseMin + (partIndex - 1) * partLength;
    const endM = startM + partLength;

    const formatTime = (m) => {
      const hrs = Math.floor(m / 60);
      const mins = Math.floor(m % 60);
      const period = hrs >= 12 ? 'PM' : 'AM';
      const displayHrs = hrs > 12 ? hrs - 12 : (hrs === 0 ? 12 : hrs);
      return `${String(displayHrs).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${period}`;
    };

    return `${formatTime(startM)} – ${formatTime(endM)}`;
  };

  return {
    rahuKaal: formatWindow(rahuParts[day]),
    yamaganda: formatWindow(yamaParts[day]),
    gulikaKaal: formatWindow(gulikaParts[day])
  };
}

// Calculate Full Vedic Panchanga for a given Date and City
export function getPanchanga(date = new Date(), cityId = 'varanasi') {
  const city = HOLY_CITIES.find(c => c.id === cityId) || HOLY_CITIES[0];
  const { sunLng, moonLng } = getLuniSolarPositions(date);

  // 1. TITHI CALCULATION
  // Angular distance between Moon and Sun (0° to 360°)
  let diff = moonLng - sunLng;
  if (diff < 0) diff += 360;

  // Each Tithi spans 12 degrees
  const tithiIndex = Math.floor(diff / 12) + 1; // 1 to 30
  const isShukla = tithiIndex <= 15;
  const paksha = isShukla ? 'Shukla Paksha (शुक्ल पक्ष / Waxing Moon)' : 'Krishna Paksha (कृष्ण पक्ष / Waning Moon)';
  const tithiInPaksha = isShukla ? tithiIndex : tithiIndex - 15;

  let tithiItem = TITHI_DATA[tithiInPaksha - 1];
  if (!isShukla && tithiInPaksha === 15) {
    tithiItem = TITHI_DATA.find(t => t.num === 30) || TITHI_DATA[14];
  }

  // 2. NAKSHATRA CALCULATION
  // Each Nakshatra spans 360° / 27 = 13° 20' = 13.3333°
  const nakshatraIndex = Math.floor(moonLng / (360 / 27)); // 0 to 26
  const nakshatra = NAKSHATRA_DATA[nakshatraIndex] || NAKSHATRA_DATA[0];

  // Pada (Quarter) of Nakshatra (4 padas per nakshatra = 3° 20' each)
  const nakshatraProgress = moonLng % (360 / 27);
  const pada = Math.floor(nakshatraProgress / (360 / 27 / 4)) + 1;

  // 3. YOGA CALCULATION
  // Sum of Sun and Moon longitude
  const sumLng = (sunLng + moonLng) % 360;
  const yogaIndex = Math.floor(sumLng / (360 / 27)); // 0 to 26
  const yogaName = YOGA_DATA[yogaIndex] || YOGA_DATA[0];

  // 4. KARANA CALCULATION
  // Each Karana is half a tithi = 6 degrees
  const karanaIndex = Math.floor(diff / 6); // 0 to 59
  let karana;
  if (karanaIndex === 0) {
    karana = KARANA_DATA[10]; // Kintughna
  } else if (karanaIndex >= 57) {
    const fixedIndex = karanaIndex - 57; // 0: Shakuni, 1: Chatushpada, 2: Naga
    karana = KARANA_DATA[7 + fixedIndex];
  } else {
    // 7 movable karanas cycle
    const movableIndex = (karanaIndex - 1) % 7;
    karana = KARANA_DATA[movableIndex];
  }

  // 5. VARA (Day of Week)
  const dayOfWeek = date.getDay();
  const vara = VARA_DATA[dayOfWeek];

  // 6. LUNAR MONTH (Masa)
  // Sun sign (Sankranti) dictates the month
  const solarRashi = Math.floor(sunLng / 30); // 0 = Mesha (Aries) = Chaitra/Vaishakha
  const masa = LUNAR_MONTHS[(solarRashi + 11) % 12];

  // 7. SAMVAT (Era)
  const gregorianYear = date.getFullYear();
  const vikramSamvat = gregorianYear + 57; // Vikram Samvat
  const shakaSamvat = gregorianYear - 78;  // Shaka Samvat
  const kaliYugaYear = gregorianYear + 3101; // Kali Yuga epoch: 3102 BCE

  // 8. AYANA (Celestial Course)
  const isUttarayana = sunLng >= 270 || sunLng < 90;
  const ayana = isUttarayana ? 'Uttarayana (उत्तरायण • Divine Solar Ascendance)' : 'Dakshinayana (दक्षिणायन • Pitru Ancestral Course)';

  // 9. SUNRISE, SUNSET & TIMINGS
  const sunTimes = getSunTimes(date, city.lat, city.lng);
  const muhurtas = getMuhurtaWindows(date, sunTimes.sunriseRawMinutes, sunTimes.sunsetRawMinutes);

  return {
    city,
    date,
    dateFormatted: date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    tithi: {
      number: tithiIndex,
      name: tithiItem.name,
      devanagari: tithiItem.devanagari,
      paksha,
      isShukla,
      deity: tithiItem.deity,
      significance: tithiItem.significance,
      fullTitle: `${tithiItem.name} (${tithiItem.devanagari}) • ${isShukla ? 'Shukla Paksha' : 'Krishna Paksha'}`
    },
    nakshatra: {
      ...nakshatra,
      pada,
      fullTitle: `${nakshatra.name} (${nakshatra.devanagari}) • Pada ${pada}`
    },
    yoga: {
      name: yogaName,
      number: yogaIndex + 1
    },
    karana: {
      name: karana.name,
      deity: karana.deity,
      nature: karana.nature
    },
    vara,
    masa,
    samvat: {
      vikram: vikramSamvat,
      shaka: shakaSamvat,
      kaliYuga: kaliYugaYear
    },
    ayana,
    timings: {
      ...sunTimes,
      ...muhurtas
    }
  };
}

