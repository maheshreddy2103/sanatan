import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, Sparkles, Heart, Bell, Droplets, 
  Flower2, Share2, Download, Check, RefreshCw, 
  Volume2, VolumeX, Shield, Award, ChevronRight
} from 'lucide-react';
import { 
  playTempleBell, 
  playOmDrone, 
  playShankha, 
  playFlowerChime, 
  startAartiRhythm 
} from '../utils/sound';

const PUJA_DEITIES = [
  {
    id: 'ganesha',
    name: 'Lord Ganesha',
    devanagari: 'श्री गणेश जी',
    title: 'Vighnaharta & Prathama Pujya',
    image: './Devi and Devatas/ganapati.jpg',
    dhyanaMantra: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
    mantraTranslation: 'O Lord with the curved trunk and immense cosmic form, possessing the radiance of millions of suns, please make all my endeavors free from obstacles at all times.',
    aartiName: 'Jai Ganesh Deva (जय गणेश देवा)',
    aartiLines: [
      { sanskrit: 'जय गणेश जय गणेश जय गणेश देवा।', eng: 'Jai Ganesh, Jai Ganesh, Jai Ganesh Deva!' },
      { sanskrit: 'माता जाकी पार्वती पिता महादेवा॥', eng: 'Whose mother is Parvati, whose father is Mahadeva.' },
      { sanskrit: 'एक दन्त दयावन्त चार भुजा धारी।', eng: 'Single-tusked, compassionate, bearing four arms.' },
      { sanskrit: 'माथे सिन्दूर सोहे मूसे की सवारी॥', eng: 'With vermilion on the brow, riding the humble mouse.' },
      { sanskrit: 'पान चढ़े फूल चढ़े और चढ़े मेवा।', eng: 'We offer betel leaves, fresh flowers, and sacred sweets.' },
      { sanskrit: 'लड्डुअन का भोग लगे सन्त करें सेवा॥', eng: 'Devotees offer golden laddus and surrender in devotion.' }
    ],
    favoriteFlower: 'Red Hibiscus & Marigold (जवाकुसुम व गेंदा)',
    prasad: 'Modak & Motichoor Laddu (मोदक व लाडू)'
  },
  {
    id: 'shiva',
    name: 'Lord Shiva',
    devanagari: 'भगवान शिव (महादेव)',
    title: 'Devadhideva Mahadeva & Neelakantha',
    image: './Devi and Devatas/shiva.jpg',
    dhyanaMantra: 'कर्पूरगौरं करुणावतारं संसारसारं भुजगेन्द्रहारम्।\nसदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि॥',
    mantraTranslation: 'Pure white as camphor, embodiment of boundless compassion, essence of worldly existence, adorned with the serpent king, forever residing in the lotus of the heart, I bow to Shiva together with Bhavani.',
    aartiName: 'Om Jai Shiv Omkara (ॐ जय शिव ओंकारा)',
    aartiLines: [
      { sanskrit: 'ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा।', eng: 'Om Jai Shiv Omkara, Swami Jai Shiv Omkara!' },
      { sanskrit: 'ब्रह्मा विष्णु सदाशिव अर्द्धाङ्गी धारा॥', eng: 'Embodying Brahma, Vishnu, and Sadashiva in sacred unity.' },
      { sanskrit: 'एकानन चतुरानन पञ्चानन राजे।', eng: 'Revealing the single, fourfold, and fivefold cosmic faces.' },
      { sanskrit: 'हंसासन गरुड़ासन वृषवाहन साजे॥', eng: 'Lord of the swan, the eagle, and the sacred bull Nandi.' },
      { sanskrit: 'अक्षमाला वनमाला मुण्डमाला धारी।', eng: 'Adorned with Rudraksha mala, forest garland, and crescent moon.' },
      { sanskrit: 'त्रिपुरारी कंसारी करमाला धारी॥', eng: 'Destroyer of ignorance, bestower of supreme liberation.' }
    ],
    favoriteFlower: 'Bilva Patra & Dhatura (बिल्वपत्र व धतूरा)',
    prasad: 'Bhasma, Panchamrit & Bel Fruits (पञ्चामृत)'
  },
  {
    id: 'durga',
    name: 'Maa Durga',
    devanagari: 'माँ दुर्गा (भवानी)',
    title: 'Mahashakti, Jagadamba & Mahishasuramardini',
    image: './Devi and Devatas/parvati.jpg',
    dhyanaMantra: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥',
    mantraTranslation: 'Auspicious of all that is auspicious, the good, the accomplisher of all objectives, the source of refuge, the three-eyed Gauri, Narayani, salutations unto You.',
    aartiName: 'Jai Ambe Gauri (जय अम्बे गौरी)',
    aartiLines: [
      { sanskrit: 'जय अम्बे गौरी, मैया जय श्यामा गौरी।', eng: 'Hail Mother Amba, hail Mother Gauri!' },
      { sanskrit: 'तुमको निशदिन ध्यावत हरि ब्रह्मा शिवरी॥', eng: 'Whom Vishnu, Brahma, and Shiva contemplate day and night.' },
      { sanskrit: 'मांग सिन्दूर विराजत टीको मृगमद को।', eng: 'Vermilion adorning the crown, with fragrant musk tilak.' },
      { sanskrit: 'उज्ज्वल से दोउ नैना चन्द्रवदन नीको॥', eng: 'Two luminous eyes on a radiant moon-like face.' },
      { sanskrit: 'कनक समान कलेवर रक्ताम्बर राजै।', eng: 'Golden effulgence draped in regal crimson attire.' },
      { sanskrit: 'रक्तपुष्प गल माला कण्ठन पर साजै॥', eng: 'Adorned with garlands of deep red lotus and hibiscus.' }
    ],
    favoriteFlower: 'Red Lotus & Hibiscus (रक्तकमल व जवाकुसुम)',
    prasad: 'Halwa, Chana, Kheer & Pomegranate (खीर व मिष्टान्न)'
  },
  {
    id: 'krishna',
    name: 'Sri Krishna',
    devanagari: 'भगवान श्री कृष्ण',
    title: 'Muralidhara & Jagadguru',
    image: './Devi and Devatas/vishnu.webp',
    dhyanaMantra: 'वसुदेवसुतं देवं कंसचाणूरमर्दनम्।\nदेवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम्॥',
    mantraTranslation: 'I salute Lord Krishna, son of Vasudeva, destroyer of Kamsa and Chanura, the supreme bliss of mother Devaki, and the Guru of the entire universe.',
    aartiName: 'Aarti Kunj Bihari Ki (आरती कुञ्ज बिहारी की)',
    aartiLines: [
      { sanskrit: 'आरती कुञ्ज बिहारी की, श्री गिरिधर कृष्ण मुरारी की॥', eng: 'Aarti unto Kunj Bihari, the divine lifter of Govardhan hill.' },
      { sanskrit: 'गले में बैजन्ती माला, बजावै मुरली मधुर बाला।', eng: 'Adorned with the forest garland, playing the divine nectar flute.' },
      { sanskrit: 'श्रवण में कुण्डल झलकाला, मुकुट पर मोरपंख साजा॥', eng: 'Gleaming earrings, crowned with the vibrant peacock feather.' },
      { sanskrit: 'जहाँ से प्रगटी गङ्गा, कलुष कलिहारिणी श्रीगङ्गा।', eng: 'From whose holy feet the purifying Ganga descends.' }
    ],
    favoriteFlower: 'Tulsi Manjari & Kadamba (तुलसी मञ्जरी व कदम्ब)',
    prasad: 'Makhan Mishri, Peda & Panchamrit (माखन मिश्री)'
  },
  {
    id: 'hanuman',
    name: 'Lord Hanuman',
    devanagari: 'श्री हनुमान जी',
    title: 'Sankat Mochan, Pavanputra & Ramaduta',
    image: './Devi and Devatas/hanuman.jpg',
    dhyanaMantra: 'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्।\nवातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥',
    mantraTranslation: 'Swift as the mind, fast as the wind, master of all senses, foremost among the wise, son of the wind god, leader of the monkey troop, emissary of Sri Rama, I surrender unto you.',
    aartiName: 'Aarti Keeje Hanuman Lala Ki (आरती कीजै हनुमान लला की)',
    aartiLines: [
      { sanskrit: 'आरती कीजै हनुमान लला की, दुष्ट दलन रघुनाथ कला की॥', eng: 'Perform the sacred aarti of beloved Hanuman, queller of evil.' },
      { sanskrit: 'जाके बल से गिरिवर कांपै, रोग दोष जाके निकट न झांपै॥', eng: 'By whose might mountains tremble, and all afflictions vanish.' },
      { sanskrit: 'अंजनि पुत्र महा बलदाई, सन्तन के प्रभु सदा सहाई॥', eng: 'Son of Anjana, endowed with immense strength, friend of seekers.' },
      { sanskrit: 'दे बीरा रघुनाथ पठाये, लंका जारि सीय सुधि लाये॥', eng: 'Emissary of Raghunatha, crossing the ocean to restore Janaki.' }
    ],
    favoriteFlower: 'Sindoor, Akanda & Jasmine (चमेली व मन्दार)',
    prasad: 'Besan Laddu, Boondi & Bananas (बेसन के लड्डू व फल)'
  },
  {
    id: 'lakshmi',
    name: 'Maa Lakshmi',
    devanagari: 'माँ लक्ष्मी',
    title: 'Goddess of Prosperity, Light & Auspiciousness',
    image: './Devi and Devatas/lakshmi.jpg',
    dhyanaMantra: 'नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते।\nशङ्खचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते॥',
    mantraTranslation: 'Salutations to the Supreme Illusion, seated on the divine throne, worshipped by the gods, holding conch, discus, and mace, salutations unto You, O Mahalakshmi.',
    aartiName: 'Om Jai Lakshmi Mata (ॐ जय लक्ष्मी माता)',
    aartiLines: [
      { sanskrit: 'ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता।', eng: 'Hail Mother Lakshmi, goddess of grace and auspiciousness!' },
      { sanskrit: 'तुमको निशदिन सेवत हर विष्णु विधाता॥', eng: 'Whom Shiva, Vishnu, and Brahma revere eternally.' },
      { sanskrit: 'उमा रमा ब्रह्माणी तुम ही जग माता।', eng: 'Embodying Uma, Rama, and Brahmani as cosmic Mother.' },
      { sanskrit: 'सूर्य चन्द्रमा ध्यावत नारद ऋषि गाता॥', eng: 'Sun and moon radiate your light, Rishi Narada sings your glory.' }
    ],
    favoriteFlower: 'Pink Lotus & Rose (कमल व गुलाब)',
    prasad: 'Kheer, Sweets & Puffed Rice (खीर व बताशे)'
  },
  {
    id: 'ayyappa',
    name: 'Lord Ayyappa',
    devanagari: 'स्वामी अय्यप्पा',
    title: 'Manikanta, Dharma Sastha & Lord of Sabarimala',
    image: './Devi and Devatas/ayyappa.jpg',
    dhyanaMantra: 'भूतनाथ सदानन्द सर्वभूतदयापर।\nविधेहि मे महाभाग शरणं त्वं प्रपद्ये॥',
    mantraTranslation: 'O Lord of all beings, embodiment of eternal joy, full of compassion for all creatures, grant me divine grace; I surrender myself unto you.',
    aartiName: 'Harivarasanam (हरिवरासनम्)',
    aartiLines: [
      { sanskrit: 'हरिवरासनं विश्वमोहनम्, हरिदधीश्वरम् आराध्यपादुकम्।', eng: 'The sacred seat of Hari, enchanting the universe, supreme Lord.' },
      { sanskrit: 'अरिविमर्दनं नित्यनर्तनम्, शरणकीर्तनं भक्तरञ्जनम्॥', eng: 'Queller of inner foes, eternal cosmic dance, protector of devotees.' },
      { sanskrit: 'शरणमटविये स्वामिये, शरणमटविये स्वामिये॥', eng: 'Swamiye Saranam Ayyappa, I surrender unto Lord Ayyappa!' }
    ],
    favoriteFlower: 'Tulsi, Marigold & Blue Lotus (तुलसी व नीलोत्पल)',
    prasad: 'Aravana Payasam & Ghee Coconut (अप्पम व नेय्यप्पम)'
  }
];

export default function VirtualPujaView({ onNavigate }) {
  const [selectedDeity, setSelectedDeity] = useState(PUJA_DEITIES[0]);
  
  // Ritual Offering States
  const [hasJal, setHasJal] = useState(false);
  const [hasTilak, setHasTilak] = useState(false);
  const [hasFlowers, setHasFlowers] = useState(false);
  const [hasDhoop, setHasDhoop] = useState(false);
  const [hasDiya, setHasDiya] = useState(false);
  const [hasPrasad, setHasPrasad] = useState(false);

  // Aarti Ceremony
  const [isAartiActive, setIsAartiActive] = useState(false);
  const [aartiLineIndex, setAartiLineIndex] = useState(0);
  const [hasReceivedBlessings, setHasReceivedBlessings] = useState(false);
  
  // Overhead Bells Animation
  const [ringingBellLeft, setRingingBellLeft] = useState(false);
  const [ringingBellRight, setRingingBellRight] = useState(false);

  // Floating flower petals particles
  const [flowerParticles, setFlowerParticles] = useState([]);
  
  // Water droplets animation
  const [waterRipples, setWaterRipples] = useState(false);

  // Sankalpa Form & Ashirwad Card
  const [seekerName, setSeekerName] = useState('');
  const [seekerGotra, setSeekerGotra] = useState('');
  const [seekerPrayer, setSeekerPrayer] = useState('');
  const [showAshirwadCard, setShowAshirwadCard] = useState(false);

  // Audio helper refs
  const aartiStopRef = useRef(null);

  // Clean state when changing deity
  const handleSelectDeity = (deity) => {
    if (isAartiActive) handleStopAarti();
    setSelectedDeity(deity);
    setHasJal(false);
    setHasTilak(false);
    setHasFlowers(false);
    setHasDhoop(false);
    setHasDiya(false);
    setHasPrasad(false);
    setFlowerParticles([]);
    setHasReceivedBlessings(false);
    setShowAshirwadCard(false);
    playOmDrone();
  };

  // Ring Left Bell
  const handleRingLeftBell = () => {
    setRingingBellLeft(true);
    playTempleBell(740);
    setTimeout(() => setRingingBellLeft(false), 800);
  };

  // Ring Right Bell
  const handleRingRightBell = () => {
    setRingingBellRight(true);
    playTempleBell(880);
    setTimeout(() => setRingingBellRight(false), 800);
  };

  // 1. Jal / Abhishekam
  const handleOfferJal = () => {
    setWaterRipples(true);
    setHasJal(true);
    playFlowerChime();
    setTimeout(() => setWaterRipples(false), 2400);
  };

  // 2. Tilak & Kumkum
  const handleOfferTilak = () => {
    setHasTilak(true);
    playTempleBell(580);
  };

  // 3. Pushpanjali (Flower shower)
  const handleOfferFlowers = () => {
    setHasFlowers(true);
    playFlowerChime();

    // Create 24 falling flower petals
    const petals = [];
    const colors = ['#e11d48', '#f59e0b', '#fbbf24', '#ffffff', '#ec4899'];
    for (let i = 0; i < 24; i++) {
      petals.push({
        id: 'petal-' + Date.now() + '-' + i,
        left: 20 + Math.random() * 60, // 20% to 80% horizontal spread
        size: 14 + Math.random() * 16,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.4,
        duration: 1.8 + Math.random() * 1.2
      });
    }
    setFlowerParticles(petals);

    setTimeout(() => {
      setFlowerParticles([]);
    }, 3200);
  };

  // 4. Dhoop (Incense)
  const handleOfferDhoop = () => {
    setHasDhoop(!hasDhoop);
    playTempleBell(520);
  };

  // 5. Deepam (Holy Diya)
  const handleOfferDiya = () => {
    setHasDiya(!hasDiya);
    playTempleBell(620);
  };

  // 6. Naivedyam (Prasad)
  const handleOfferPrasad = () => {
    setHasPrasad(true);
    playTempleBell(700);
  };

  // Blow Holy Shankha
  const handleBlowShankha = () => {
    playShankha();
  };

  // Start Maha Aarti
  const handleStartAarti = () => {
    setIsAartiActive(true);
    setHasDiya(true); // Automatically light lamp
    setHasDhoop(true);
    setHasReceivedBlessings(false);

    // Play shankha followed by rhythmic bells
    playShankha();
    setTimeout(() => {
      aartiStopRef.current = startAartiRhythm();
    }, 800);

    // Cycle aarti verses
    setAartiLineIndex(0);
  };

  const handleStopAarti = () => {
    setIsAartiActive(false);
    if (aartiStopRef.current) {
      aartiStopRef.current();
      aartiStopRef.current = null;
    }
  };

  // Cycle Aarti verses every 4 seconds when active
  useEffect(() => {
    let timer = null;
    if (isAartiActive && selectedDeity.aartiLines.length > 0) {
      timer = setInterval(() => {
        setAartiLineIndex(prev => (prev + 1) % selectedDeity.aartiLines.length);
      }, 4200);
    }
    return () => clearInterval(timer);
  }, [isAartiActive, selectedDeity]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (aartiStopRef.current) {
        aartiStopRef.current();
      }
    };
  }, []);

  // Take Aarti Blessings (आरती ग्रहण)
  const handleReceiveBlessings = () => {
    setHasReceivedBlessings(true);
    playOmDrone();
  };

  // Reset Puja
  const handleResetPuja = () => {
    if (isAartiActive) handleStopAarti();
    setHasJal(false);
    setHasTilak(false);
    setHasFlowers(false);
    setHasDhoop(false);
    setHasDiya(false);
    setHasPrasad(false);
    setFlowerParticles([]);
    setHasReceivedBlessings(false);
    setShowAshirwadCard(false);
  };

  // Calculate completed rituals count
  const completedCount = [hasJal, hasTilak, hasFlowers, hasDhoop, hasDiya, hasPrasad].filter(Boolean).length;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#170c08',
      backgroundImage: 'radial-gradient(ellipse at 50% 20%, #3d1410 0%, #170c08 70%)',
      color: '#fef9e7',
      paddingBottom: '80px',
      fontFamily: 'var(--font-body)',
      overflowX: 'hidden'
    }}>
      {/* Top Banner & Header */}
      <div style={{
        textAlign: 'center',
        padding: '36px 20px 20px',
        maxWidth: '920px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(217, 83, 30, 0.2)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          color: '#e5b32e',
          fontSize: '12.5px',
          fontWeight: 600,
          marginBottom: '12px'
        }}>
          <Sparkles size={14} />
          <span>दिव्य मन्दिर पूजा व महा आरती • Virtual Darshan & Sanctum</span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 800,
          margin: '0 0 10px 0',
          background: 'linear-gradient(90deg, #ffe27a 0%, #f3b23e 50%, #d9531e 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '0.02em'
        }}>
          Sacred Altar & Virtual Puja
        </h1>

        <p style={{
          color: 'rgba(254, 249, 231, 0.8)',
          fontSize: '14.5px',
          maxWidth: '640px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Perform sacred <strong>Pancha Upachara Puja</strong>, offer holy flowers and chandan, ring temple bells, and participate in the sanctified <strong>Maha Aarti</strong> ceremony.
        </p>

        {/* Deity Selector Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          marginTop: '22px'
        }}>
          {PUJA_DEITIES.map(deity => {
            const isSelected = deity.id === selectedDeity.id;
            return (
              <button
                key={deity.id}
                onClick={() => handleSelectDeity(deity)}
                style={{
                  padding: '7px 15px',
                  borderRadius: '9999px',
                  backgroundColor: isSelected ? 'var(--accent-saffron)' : 'rgba(255, 255, 255, 0.08)',
                  color: isSelected ? '#ffffff' : '#fef9e7',
                  border: isSelected ? '1px solid #ffd166' : '1px solid rgba(255, 255, 255, 0.15)',
                  fontSize: '12.5px',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 14px rgba(217, 83, 30, 0.4)' : 'none'
                }}
              >
                <span>{deity.devanagari.split(' ')[0]}</span>
                <span>{deity.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Temple Sanctum Area */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '28px',
        alignItems: 'start'
      }}>
        {/* ======================================================== */}
        {/* LEFT COLUMN: The Consecrated Garbhagriha & Altar          */}
        {/* ======================================================== */}
        <div style={{
          backgroundColor: '#241008',
          border: '2px solid rgba(212, 175, 55, 0.5)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.65), inset 0 0 40px rgba(217, 83, 30, 0.2)',
          padding: '24px 20px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* Temple Arch Header */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '18px',
            background: 'linear-gradient(90deg, #93670c, #ffe27a, #d9531e, #ffe27a, #93670c)'
          }}></div>

          {/* Hanging Temple Brass Bells (Left & Right) */}
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 16px',
            marginBottom: '10px'
          }}>
            {/* Left Hanging Bell */}
            <div 
              onClick={handleRingLeftBell}
              title="Click to ring temple bell"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                userSelect: 'none',
                transformOrigin: 'top center',
                transform: ringingBellLeft ? 'rotate(-18deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease-in-out'
              }}
            >
              <div style={{ width: '2px', height: '36px', backgroundColor: '#d4af37' }}></div>
              <div style={{
                width: '32px',
                height: '28px',
                background: 'radial-gradient(circle at 35% 35%, #ffe27a 0%, #c69214 70%, #684807 100%)',
                borderRadius: '50% 50% 15% 15%',
                border: '1.5px solid #ffe27a',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px'
              }}>
                🔔
              </div>
              <span style={{ fontSize: '9px', color: '#ffe27a', marginTop: '4px', fontWeight: 600 }}>Ring</span>
            </div>

            {/* Central Temple Shikhara Emblem */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '4px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.2)',
                border: '1.5px solid #ffe27a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                boxShadow: '0 0 15px rgba(229, 179, 46, 0.4)'
              }}>
                🕉️
              </div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '11px',
                color: '#ffe27a',
                fontWeight: 700,
                letterSpacing: '0.08em',
                marginTop: '4px'
              }}>
                GARBHAGRIHA
              </span>
            </div>

            {/* Right Hanging Bell */}
            <div 
              onClick={handleRingRightBell}
              title="Click to ring temple bell"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                userSelect: 'none',
                transformOrigin: 'top center',
                transform: ringingBellRight ? 'rotate(18deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease-in-out'
              }}
            >
              <div style={{ width: '2px', height: '36px', backgroundColor: '#d4af37' }}></div>
              <div style={{
                width: '32px',
                height: '28px',
                background: 'radial-gradient(circle at 35% 35%, #ffe27a 0%, #c69214 70%, #684807 100%)',
                borderRadius: '50% 50% 15% 15%',
                border: '1.5px solid #ffe27a',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px'
              }}>
                🔔
              </div>
              <span style={{ fontSize: '9px', color: '#ffe27a', marginTop: '4px', fontWeight: 600 }}>Ring</span>
            </div>
          </div>

          {/* Sanctum Frame for the Deity Image */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '380px',
            height: '380px',
            borderRadius: '20px',
            border: '4px solid #c69214',
            boxShadow: isAartiActive
              ? '0 0 45px rgba(243, 178, 62, 0.8), 0 0 80px rgba(217, 83, 30, 0.5)'
              : '0 12px 35px rgba(0, 0, 0, 0.7)',
            overflow: 'hidden',
            backgroundColor: '#130805',
            transition: 'box-shadow 0.3s ease'
          }}>
            {/* Divine Aura Glow behind Deity */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: isAartiActive
                ? 'radial-gradient(circle at 50% 40%, rgba(255, 230, 140, 0.45) 0%, rgba(217, 83, 30, 0.3) 60%, transparent 85%)'
                : 'radial-gradient(circle at 50% 40%, rgba(243, 178, 62, 0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 1,
              transition: 'background 0.4s ease'
            }}></div>

            {/* Deity Consecrated Image */}
            <img 
              src={selectedDeity.image} 
              alt={selectedDeity.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                transform: isAartiActive ? 'scale(1.03)' : 'scale(1)',
                transition: 'transform 0.8s ease'
              }}
            />

            {/* Auspicious Tilak & Chandan Overlay */}
            {hasTilak && (
              <div style={{
                position: 'absolute',
                top: '28%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                animation: 'fadeIn 0.4s ease-out'
              }}>
                <div style={{
                  width: '6px',
                  height: '16px',
                  backgroundColor: '#dc2626',
                  borderRadius: '3px',
                  border: '1px solid #ffd166',
                  boxShadow: '0 0 8px rgba(220, 38, 38, 0.8)'
                }}></div>
                <div style={{
                  width: '14px',
                  height: '3px',
                  backgroundColor: '#ffe27a',
                  borderRadius: '2px',
                  marginTop: '1px'
                }}></div>
              </div>
            )}

            {/* Sacred Flower Garland Overlay */}
            {hasFlowers && (
              <div style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '180px',
                height: '130px',
                border: '3px dashed #f59e0b',
                borderRadius: '50% 50% 60% 60%',
                boxShadow: '0 0 12px rgba(245, 158, 11, 0.6)',
                zIndex: 4,
                pointerEvents: 'none',
                animation: 'fadeIn 0.5s ease-out'
              }}>
                <span style={{ position: 'absolute', top: '-6px', left: '10px', fontSize: '15px' }}>🌸</span>
                <span style={{ position: 'absolute', top: '-6px', right: '10px', fontSize: '15px' }}>🌺</span>
                <span style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', fontSize: '17px' }}>🌼</span>
              </div>
            )}

            {/* Water Abhishekam Ripple Overlay */}
            {waterRipples && (
              <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 3,
                background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.35) 0%, transparent 80%)',
                animation: 'pulse 1.2s infinite ease-in-out',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px'
              }}>
                💧
              </div>
            )}

            {/* Showering Flower Petals Particles */}
            {flowerParticles.map(p => (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  top: '-20px',
                  left: `${p.left}%`,
                  fontSize: `${p.size}px`,
                  color: p.color,
                  zIndex: 5,
                  animation: `fallDown ${p.duration}s ease-in forwards`,
                  animationDelay: `${p.delay}s`,
                  pointerEvents: 'none'
                }}
              >
                🌺
              </div>
            ))}

            {/* Rising Fragrant Dhoop Smoke */}
            {hasDhoop && (
              <div style={{
                position: 'absolute',
                bottom: '15px',
                left: '25px',
                zIndex: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div style={{
                  fontSize: '24px',
                  animation: 'floatUp 2.5s infinite linear',
                  opacity: 0.75,
                  filter: 'blur(1px)'
                }}>
                  💨
                </div>
                <div style={{
                  width: '6px',
                  height: '18px',
                  backgroundColor: '#78350f',
                  borderRadius: '2px',
                  boxShadow: '0 0 6px #ef4444'
                }}></div>
              </div>
            )}

            {/* Holy Consecrated Diya / Deepam */}
            {hasDiya && (
              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '25px',
                zIndex: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                {/* Flickering Flame */}
                <div style={{
                  width: '14px',
                  height: '20px',
                  background: 'radial-gradient(ellipse at 50% 80%, #ffffff 0%, #fef08a 25%, #f97316 75%, transparent 100%)',
                  borderRadius: '50% 50% 20% 20%',
                  boxShadow: '0 0 18px #f97316, 0 0 35px #facc15',
                  animation: 'flicker 0.15s infinite alternate ease-in-out'
                }}></div>
                {/* Brass Diya Base */}
                <div style={{
                  width: '32px',
                  height: '14px',
                  background: 'linear-gradient(135deg, #ffe27a 0%, #b45309 100%)',
                  borderRadius: '0 0 16px 16px',
                  border: '1px solid #ffe27a'
                }}></div>
              </div>
            )}

            {/* Sacred Prasada Plate Overlay */}
            {hasPrasad && (
              <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 4,
                backgroundColor: 'rgba(36, 16, 8, 0.85)',
                border: '1.5px solid #ffe27a',
                borderRadius: '9999px',
                padding: '3px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '15px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
                animation: 'fadeInUp 0.3s ease-out'
              }}>
                <span>🥥</span>
                <span>🍎</span>
                <span>🍯</span>
                <span style={{ fontSize: '10.5px', color: '#ffe27a', fontWeight: 600 }}>प्रसाद</span>
              </div>
            )}

            {/* Animated Rotating Aarti Thali during Maha Aarti */}
            {isAartiActive && (
              <div style={{
                position: 'absolute',
                width: '74px',
                height: '74px',
                zIndex: 6,
                top: '50%',
                left: '50%',
                margin: '-37px 0 0 -37px',
                animation: 'aartiCircle 3.6s infinite linear',
                pointerEvents: 'none'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #ffe27a 0%, #c69214 70%, #78350f 100%)',
                  border: '2px solid #ffffff',
                  boxShadow: '0 0 25px #facc15, 0 0 45px #f97316',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  {/* Central Camphor Flame */}
                  <div style={{
                    width: '12px',
                    height: '16px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50% 50% 20% 20%',
                    boxShadow: '0 0 14px #ffffff, 0 0 25px #f97316'
                  }}></div>
                  {/* 4 Outer Diyas on Thali */}
                  <span style={{ position: 'absolute', top: '3px', fontSize: '10px' }}>🔥</span>
                  <span style={{ position: 'absolute', bottom: '3px', fontSize: '10px' }}>🔥</span>
                  <span style={{ position: 'absolute', left: '3px', fontSize: '10px' }}>🔥</span>
                  <span style={{ position: 'absolute', right: '3px', fontSize: '10px' }}>🔥</span>
                </div>
              </div>
            )}
          </div>

          {/* Deity Identity & Status Badges */}
          <div style={{
            textAlign: 'center',
            marginTop: '16px',
            width: '100%'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '20px',
              fontWeight: 800,
              color: '#ffe27a',
              margin: '0 0 4px 0'
            }}>
              {selectedDeity.name} <span style={{ fontSize: '15px', color: '#f3b23e' }}>({selectedDeity.devanagari})</span>
            </h2>
            <p style={{
              fontSize: '12.5px',
              color: 'rgba(254, 249, 231, 0.7)',
              margin: 0
            }}>
              {selectedDeity.title}
            </p>

            {/* Puja Progress Indicator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '12px',
              fontSize: '11.5px',
              color: '#ffe27a'
            }}>
              <span>Upacharas Completed:</span>
              <div style={{
                display: 'inline-flex',
                gap: '4px'
              }}>
                {[1, 2, 3, 4, 5, 6].map(step => (
                  <span 
                    key={step}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: step <= completedCount ? '#10b981' : 'rgba(255, 255, 255, 0.15)',
                      border: '1px solid rgba(212, 175, 55, 0.3)'
                    }}
                  />
                ))}
              </div>
              <span style={{ fontWeight: 700 }}>({completedCount}/6)</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Interactive Rituals, Aarti & Sankalpa      */}
        {/* ======================================================== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 1. Pancha Upachara Ritual Offerings Grid */}
          <div style={{
            backgroundColor: 'rgba(36, 16, 8, 0.75)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            borderRadius: '18px',
            padding: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px',
              borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
              paddingBottom: '8px'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '15px',
                fontWeight: 700,
                color: '#ffe27a',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>🪔</span>
                <span>Pancha Upachara Offerings (पञ्चोपचार पूजा)</span>
              </h3>
              <button
                onClick={handleResetPuja}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(254, 249, 231, 0.6)',
                  cursor: 'pointer',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <RefreshCw size={12} />
                <span>Reset</span>
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px'
            }}>
              {/* 1. Jal / Abhishekam */}
              <button
                onClick={handleOfferJal}
                style={{
                  padding: '12px 8px',
                  borderRadius: '12px',
                  backgroundColor: hasJal ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  border: hasJal ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '20px' }}>💧</span>
                <span style={{ fontSize: '11.5px', fontWeight: 600 }}>Ganga Jal</span>
                <span style={{ fontSize: '9.5px', color: hasJal ? '#7dd3fc' : 'rgba(255, 255, 255, 0.5)' }}>
                  {hasJal ? 'Offered ✓' : 'जल अभिषेक'}
                </span>
              </button>

              {/* 2. Chandan & Kumkum */}
              <button
                onClick={handleOfferTilak}
                style={{
                  padding: '12px 8px',
                  borderRadius: '12px',
                  backgroundColor: hasTilak ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  border: hasTilak ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '20px' }}>🔴</span>
                <span style={{ fontSize: '11.5px', fontWeight: 600 }}>Chandan Tilak</span>
                <span style={{ fontSize: '9.5px', color: hasTilak ? '#fca5a5' : 'rgba(255, 255, 255, 0.5)' }}>
                  {hasTilak ? 'Adorned ✓' : 'गन्ध-तिलक'}
                </span>
              </button>

              {/* 3. Pushpanjali */}
              <button
                onClick={handleOfferFlowers}
                style={{
                  padding: '12px 8px',
                  borderRadius: '12px',
                  backgroundColor: hasFlowers ? 'rgba(236, 72, 153, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  border: hasFlowers ? '1px solid #ec4899' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '20px' }}>🌺</span>
                <span style={{ fontSize: '11.5px', fontWeight: 600 }}>Pushpanjali</span>
                <span style={{ fontSize: '9.5px', color: hasFlowers ? '#f472b6' : 'rgba(255, 255, 255, 0.5)' }}>
                  {hasFlowers ? 'Showered ✓' : 'पुष्प अर्पण'}
                </span>
              </button>

              {/* 4. Dhoop */}
              <button
                onClick={handleOfferDhoop}
                style={{
                  padding: '12px 8px',
                  borderRadius: '12px',
                  backgroundColor: hasDhoop ? 'rgba(217, 119, 6, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  border: hasDhoop ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '20px' }}>💨</span>
                <span style={{ fontSize: '11.5px', fontWeight: 600 }}>Dhoop Incense</span>
                <span style={{ fontSize: '9.5px', color: hasDhoop ? '#fcd34d' : 'rgba(255, 255, 255, 0.5)' }}>
                  {hasDhoop ? 'Fragrant ✓' : 'धूप दीप'}
                </span>
              </button>

              {/* 5. Deepam */}
              <button
                onClick={handleOfferDiya}
                style={{
                  padding: '12px 8px',
                  borderRadius: '12px',
                  backgroundColor: hasDiya ? 'rgba(234, 179, 8, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  border: hasDiya ? '1px solid #eab308' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '20px' }}>🔥</span>
                <span style={{ fontSize: '11.5px', fontWeight: 600 }}>Ghee Diya</span>
                <span style={{ fontSize: '9.5px', color: hasDiya ? '#fef08a' : 'rgba(255, 255, 255, 0.5)' }}>
                  {hasDiya ? 'Lighted ✓' : 'दीप ज्योति'}
                </span>
              </button>

              {/* 6. Naivedyam */}
              <button
                onClick={handleOfferPrasad}
                style={{
                  padding: '12px 8px',
                  borderRadius: '12px',
                  backgroundColor: hasPrasad ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  border: hasPrasad ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '20px' }}>🥥</span>
                <span style={{ fontSize: '11.5px', fontWeight: 600 }}>Naivedyam</span>
                <span style={{ fontSize: '9.5px', color: hasPrasad ? '#6ee7b7' : 'rgba(255, 255, 255, 0.5)' }}>
                  {hasPrasad ? 'Offered ✓' : 'भोग प्रसाद'}
                </span>
              </button>
            </div>

            {/* Quick Shankha Action */}
            <div style={{
              marginTop: '14px',
              paddingTop: '12px',
              borderTop: '1px solid rgba(212, 175, 55, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '12px', color: 'rgba(254, 249, 231, 0.7)' }}>
                Favored flower: <strong>{selectedDeity.favoriteFlower}</strong>
              </span>
              <button
                onClick={handleBlowShankha}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(217, 83, 30, 0.25)',
                  color: '#ffe27a',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <span>🐚</span>
                <span>Blow Shankha (शङ्खनाद)</span>
              </button>
            </div>
          </div>

          {/* 2. Maha Aarti Ceremony Section */}
          <div style={{
            backgroundColor: 'rgba(36, 16, 8, 0.75)',
            border: isAartiActive ? '2px solid #facc15' : '1px solid rgba(212, 175, 55, 0.35)',
            borderRadius: '18px',
            padding: '20px',
            boxShadow: isAartiActive ? '0 0 30px rgba(245, 158, 11, 0.4)' : '0 10px 30px rgba(0, 0, 0, 0.35)',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#ffe27a',
                  margin: '0 0 2px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>🔥</span>
                  <span>Maha Aarti: {selectedDeity.aartiName}</span>
                </h3>
                <span style={{ fontSize: '11px', color: 'rgba(254, 249, 231, 0.6)' }}>
                  Auspicious clockwise circular circumambulation with consecrated bells
                </span>
              </div>

              {!isAartiActive ? (
                <button
                  onClick={handleStartAarti}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #d9531e 0%, #c69214 100%)',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '12.5px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(217, 83, 30, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Flame size={15} />
                  <span>Begin Aarti</span>
                </button>
              ) : (
                <button
                  onClick={handleStopAarti}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(220, 38, 38, 0.25)',
                    color: '#f87171',
                    border: '1px solid rgba(220, 38, 38, 0.4)',
                    fontWeight: 600,
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Stop Aarti
                </button>
              )}
            </div>

            {/* Live Aarti Lyrics Carousel */}
            {isAartiActive && (
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '12px',
                padding: '14px 16px',
                textAlign: 'center',
                animation: 'fadeIn 0.3s ease-out'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#fef08a',
                  marginBottom: '4px',
                  fontFamily: "'Noto Serif Devanagari', serif"
                }}>
                  {selectedDeity.aartiLines[aartiLineIndex]?.sanskrit}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(254, 249, 231, 0.8)',
                  fontStyle: 'italic'
                }}>
                  {selectedDeity.aartiLines[aartiLineIndex]?.eng}
                </div>
              </div>
            )}

            {/* Aarti Blessing (आरती ग्रहण) */}
            {isAartiActive && (
              <div style={{
                marginTop: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {!hasReceivedBlessings ? (
                  <button
                    onClick={handleReceiveBlessings}
                    style={{
                      padding: '9px 20px',
                      borderRadius: '9999px',
                      background: 'radial-gradient(ellipse at 50% 50%, #facc15 0%, #ea580c 100%)',
                      color: '#ffffff',
                      border: '1.5px solid #ffe27a',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer',
                      boxShadow: '0 0 20px rgba(250, 204, 21, 0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>🙌</span>
                    <span>आरती ग्रहण करें (Receive Holy Flame Blessings)</span>
                  </button>
                ) : (
                  <div style={{
                    padding: '8px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    color: '#6ee7b7',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Check size={16} />
                    <span>Divine Aarti Blessings Received! ॐ Shanti</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3. Dhyana Shloka & Sacred Meaning */}
          <div style={{
            backgroundColor: 'rgba(36, 16, 8, 0.65)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: '16px',
            padding: '18px 20px'
          }}>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '13.5px',
              fontWeight: 700,
              color: '#ffe27a',
              margin: '0 0 8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>📖</span>
              <span>Dhyana Shloka (ध्यान मन्त्र)</span>
            </h4>
            <div style={{
              fontFamily: "'Noto Serif Devanagari', serif",
              fontSize: '14.5px',
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap',
              marginBottom: '6px'
            }}>
              {selectedDeity.dhyanaMantra}
            </div>
            <p style={{
              fontSize: '12px',
              color: 'rgba(254, 249, 231, 0.75)',
              margin: 0,
              lineHeight: '1.5'
            }}>
              {selectedDeity.mantraTranslation}
            </p>
          </div>

          {/* 4. Sankalpa (Personal Devotional Vow) & Ashirwad Card */}
          <div style={{
            backgroundColor: 'rgba(36, 16, 8, 0.75)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            borderRadius: '18px',
            padding: '20px'
          }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '15px',
              fontWeight: 700,
              color: '#ffe27a',
              margin: '0 0 10px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>📜</span>
              <span>Offer Sankalpa & Receive Prasada (संकल्प व प्रसाद)</span>
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginBottom: '10px'
            }}>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(254, 249, 231, 0.7)', display: 'block', marginBottom: '4px' }}>
                  Devotee Name (नाम)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Sharma"
                  value={seekerName}
                  onChange={(e) => setSeekerName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.35)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#fef9e7',
                    fontSize: '12.5px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: 'rgba(254, 249, 231, 0.7)', display: 'block', marginBottom: '4px' }}>
                  Gotra / Family (गोत्र / कुल)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kashyapa / Vashishta"
                  value={seekerGotra}
                  onChange={(e) => setSeekerGotra(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.35)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#fef9e7',
                    fontSize: '12.5px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '11px', color: 'rgba(254, 249, 231, 0.7)', display: 'block', marginBottom: '4px' }}>
                Sacred Prayer / Wish (प्रार्थना / मनोकामना)
              </label>
              <input
                type="text"
                placeholder="e.g. Peace, health, prosperity and spiritual liberation"
                value={seekerPrayer}
                onChange={(e) => setSeekerPrayer(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  color: '#fef9e7',
                  fontSize: '12.5px',
                  outline: 'none'
                }}
              />
            </div>

            <button
              onClick={() => {
                setShowAshirwadCard(true);
                playOmDrone();
              }}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #d9531e 0%, #c69214 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Award size={16} />
              <span>Generate Consecrated Ashirwad Card (आशीर्वाद पत्र)</span>
            </button>

            {/* Generated Ashirwad Card Modal / Display */}
            {showAshirwadCard && (
              <div style={{
                marginTop: '16px',
                padding: '16px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #2b1d15 0%, #4a1d10 100%)',
                border: '2px solid #ffe27a',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                textAlign: 'center',
                animation: 'fadeInUp 0.3s ease-out'
              }}>
                <div style={{ fontSize: '26px', marginBottom: '6px' }}>🕉️</div>
                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  color: '#ffe27a',
                  margin: '0 0 6px 0',
                  fontSize: '16px',
                  fontWeight: 800
                }}>
                  {selectedDeity.name} Prasada & Ashirwad
                </h4>
                <p style={{
                  fontSize: '12.5px',
                  color: '#fef9e7',
                  margin: '0 0 10px 0',
                  lineHeight: '1.5'
                }}>
                  Consecrated on behalf of devotee <strong>{seekerName || 'Devotee of Sanatan Dharma'}</strong>
                  {seekerGotra ? ` (${seekerGotra} Gotra)` : ''} with sacred blessings of {selectedDeity.devanagari}.
                </p>

                {seekerPrayer && (
                  <p style={{
                    fontSize: '12px',
                    fontStyle: 'italic',
                    color: '#fef08a',
                    margin: '0 0 10px 0',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    padding: '6px 10px',
                    borderRadius: '8px'
                  }}>
                    "{seekerPrayer}"
                  </p>
                )}

                <div style={{
                  fontSize: '11px',
                  color: 'rgba(254, 249, 231, 0.7)',
                  borderTop: '1px dashed rgba(212, 175, 55, 0.4)',
                  paddingTop: '8px',
                  marginTop: '8px'
                }}>
                  ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः। • Date: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '12px'
                }}>
                  <button
                    onClick={() => {
                      const shareText = `🕉️ Received divine blessings of ${selectedDeity.name} (${selectedDeity.devanagari}) on Sanatan World! May Lord bless all with peace and health. Explore: https://maheshreddy2103.github.io/sanatan/#/puja`;
                      if (navigator.share) {
                        navigator.share({ title: 'Sanatan Divine Ashirwad', text: shareText, url: window.location.href });
                      } else {
                        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
                      }
                    }}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '8px',
                      backgroundColor: '#25D366',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Share2 size={13} />
                    <span>Share on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => setShowAshirwadCard(false)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#fef9e7',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      fontSize: '11.5px',
                      cursor: 'pointer'
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS Keyframe Animations for Altar Interactivity */}
      <style>{`
        @keyframes aartiCircle {
          0% {
            transform: rotate(0deg) translate(-110px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translate(-110px) rotate(-360deg);
          }
        }

        @keyframes flicker {
          0% {
            transform: scale(0.95, 1.05) rotate(-1deg);
            opacity: 0.9;
          }
          100% {
            transform: scale(1.05, 0.95) rotate(1deg);
            opacity: 1;
          }
        }

        @keyframes fallDown {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(340px) rotate(360deg);
            opacity: 0.85;
          }
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-40px) scale(1.4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
