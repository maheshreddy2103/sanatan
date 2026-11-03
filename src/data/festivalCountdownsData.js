// ============================================================================
// HINDU FESTIVALS, LIVE COUNTDOWNS & AUTHENTIC RITUAL GUIDES
// ============================================================================

export const MAJOR_FESTIVALS_DATA = [
  {
    id: 'maha-shivaratri',
    name: 'Maha Shivaratri',
    devanagari: 'महाशिवरात्रि',
    tagline: 'The Great Auspicious Night of Supreme Lord Shiva',
    deity: 'Lord Shiva & Maa Parvati',
    symbol: '🔱',
    category: 'Mahotsava',
    lunarTiming: 'Phalguna / Magha Krishna Paksha Chaturdashi',
    season: 'Shishira / Vasanta',
    // Dynamic next occurrence resolver helper
    baseMonth: 2, // March (0-indexed: 2)
    baseDay: 8,
    muhurta: {
      title: 'Nishita Kaal Puja Muhurta',
      time: '12:07 AM to 12:56 AM (Midnight Prahar)',
      duration: '49 Minutes',
      prahars: [
        '1st Prahar (Evening 6:25 PM - 9:30 PM): Milk Abhishekam (Dugdha Snana)',
        '2nd Prahar (Night 9:30 PM - 12:35 AM): Curd / Yogurt Abhishekam (Dadhi Snana)',
        '3rd Prahar (Midnight 12:35 AM - 3:40 AM): Ghee Abhishekam (Ghrita Snana)',
        '4th Prahar (Dawn 3:40 AM - 6:45 AM): Honey Abhishekam (Madhu Snana)'
      ]
    },
    pujaVidhi: [
      { step: 1, title: 'Sankalpa & Morning Snana', desc: 'Rise during Brahma Muhurta, take a sacred bath with black sesame seeds (Til) or Ganga Jal, wear clean traditional unstitched attire, and take a solemn vow (Sankalpa) of fasting and vigil (Jagaran).' },
      { step: 2, title: 'Shivalinga Sthapana & Panchamrit Abhisheka', desc: 'Bathe the Shivalinga in sacred order: Ganga water, raw milk, fresh yogurt, pure desi ghee, organic honey, and cane sugar (Panchamrita), followed by pure water chanting Om Namah Shivaya.' },
      { step: 3, title: 'Offering of Sacred Trifoliate Bilva Patra', desc: 'Offer unbroken 3-leaf Bilva Patras with the smooth green side facing the Lingam while chanting the Bilvashtakam: "Tridalam Trigunakaram Trinetram cha Triyayudham..."' },
      { step: 4, title: 'Bhasma, Dhatura & Chandan Arpan', desc: 'Adorn Mahadeva with sacred Vibhuti (Bhasma), white sandalwood paste (Chandan), Dhatura fruit, Akanda (crown flower), and fragrant Bel fruit.' },
      { step: 5, title: 'Four Prahars Night Vigil (Ratri Jagaran)', desc: 'Remain awake throughout the four quarters of the night singing Bhajans, chanting the Shiva Tandava Stotram and Maha Mrityunjaya Mantra.' }
    ],
    fastingRules: {
      type: 'Nirjala (Waterless) or Phalahar (Fruit-based)',
      allowed: ['Fresh fruits', 'Raw milk', 'Singhara (water chestnut) flour', 'Kuttu (buckwheat) flour', 'Sabudana', 'Rock salt (Sendha Namak)', 'Almonds & cashew nuts'],
      prohibited: ['Grains (wheat, rice, barley)', 'Lentils & pulses', 'Onion & garlic', 'Common iodized table salt', 'Alcohol & intoxicants', 'Sleep during the night (Nidra)'],
      paranaTime: 'Next morning after sunrise during Chaturdashi tithi end window.'
    },
    sacredLegends: [
      {
        title: 'Samudra Manthan & Halahala Poison',
        story: 'During the churning of the cosmic ocean (Samudra Manthan), a deadly poison named Halahala emerged, threatening to annihilate all three worlds. Lord Shiva drank the poison out of supreme compassion, holding it in his throat. The gods performed an all-night vigil with cold water and Bilva leaves to soothe his burning throat, giving him the name Neelakantha.'
      },
      {
        title: 'Divine Wedding of Shiva and Parvati',
        story: 'Maha Shivaratri marks the sacred heavenly union of Lord Shiva (Purusha / Supreme Consciousness) and Maa Parvati (Prakriti / Primordial Energy). Their cosmic marriage restores harmony and creative equilibrium to the cosmos.'
      },
      {
        title: 'The Infinite Pillar of Light (Lingodbhava)',
        story: 'Brahma and Vishnu once argued over who was superior. To shatter their ego, Lord Shiva appeared as a boundless, fiery cosmic pillar of light (Jyotirlinga) with no beginning and no end, revealing the infinite nature of the Supreme Reality.'
      }
    ],
    mantras: [
      { sanskrit: 'ॐ नमः शिवाय', meaning: 'I bow to the Auspicious One, the Supreme Lord Shiva.' },
      { sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्यgroupोर्मुक्षीय मामृतात्॥', meaning: 'Maha Mrityunjaya Mantra: We worship the Three-Eyed Lord who nourishes all beings; may He liberate us from death to immortality.' }
    ]
  },
  {
    id: 'holi',
    name: 'Holi & Holika Dahan',
    devanagari: 'होली एवं होलिका दहन',
    tagline: 'The Festival of Colors & Victory of Divine Bhakti over Tyranny',
    deity: 'Lord Narasimha, Bhagwan Vishnu & Sri Krishna',
    symbol: '🔥',
    category: 'Mahotsava',
    lunarTiming: 'Phalguna Purnima',
    season: 'Vasanta (Spring)',
    baseMonth: 2, // March
    baseDay: 25,
    muhurta: {
      title: 'Holika Dahan Pradosh Muhurta',
      time: '6:35 PM to 8:52 PM (Phalguna Purnima)',
      duration: '2 Hours 17 Minutes',
      prahars: ['Bhadra Mukha must be avoided; Bonfire lit during Pradosh Kaal after Purnima begins.']
    },
    pujaVidhi: [
      { step: 1, title: 'Gathering of Holika Wood & Upla', desc: 'Arrange logs, branches, dry leaves, and dried cow-dung cakes (Upale / Badkula) around a central wooden branch representing Bhakt Prahlad.' },
      { step: 2, title: 'Purification & Kalasha Puja', desc: 'Sprinkle Ganga water, apply turmeric and kumkum on the Holika pyre, and place garlands made of cow-dung sweets.' },
      { step: 3, title: 'Arghya & Parikrama (Circumambulation)', desc: 'Light the sacred fire while chanting mantras. Circle the bonfire 3, 5, or 7 times, pouring water from a lota and offering ears of roasted green wheat and gram (Hola).' },
      { step: 4, title: 'Taking the Auspicious Ashes (Bhasma)', desc: 'The following morning, devotees apply the sacred cool ashes of the Holika fire to their foreheads as protection against evil forces.' },
      { step: 5, title: 'Rangotsav (Playing with Natural Colors)', desc: 'Celebrate Dhulandi by offering Abeer and Gulal first to the feet of deities (especially Radha-Krishna) before joyfully celebrating with elders, family, and neighbors.' }
    ],
    fastingRules: {
      type: 'Partial Day Fast until Holika Dahan',
      allowed: ['Phalahar', 'Gujiya', 'Thandai (prepared with saffron, almonds, fennel)', 'Poori and kheer after Holika arghya'],
      prohibited: ['Non-vegetarian food', 'Alcohol', 'Negative speech', 'Quarrels on the holy day of forgiveness'],
      paranaTime: 'Immediately after performing Holika Dahan arghya in the evening.'
    },
    sacredLegends: [
      {
        title: 'Bhakta Prahlad and Holika',
        story: 'The arrogant demon king Hiranyakashipu ordered his sister Holika, who possessed a divine boon of being immune to fire, to sit in a blazing bonfire with his devout son Prahlad on her lap. Prahlad continually chanted the sacred name of Narayana. By divine grace, the fire consumed Holika while Prahlad emerged untouched, demonstrating that faith triumphs over arrogance.'
      },
      {
        title: 'Lord Krishna & Radha Rani in Braj',
        story: 'In Vrindavan and Barsana, Lord Krishna playfully smeared colors on Sri Radha’s face to celebrate the blossoming beauty of springtime. This blossomed into the famous Lathmar Holi of Barsana and the divine Phoolon ki Holi.'
      }
    ],
    mantras: [
      { sanskrit: 'ॐ नमो भगवते वासुदेवाय', meaning: 'I bow to Lord Vasudeva, the Supreme Preserver.' },
      { sanskrit: 'ॐ उग्रं वीरं महाविष्णुं ज्वलन्तं सर्वतोमुखम्। नृसिंहं भीषणं भद्रं मृत्युमृत्युं नमाम्यहम्॥', meaning: 'Narasimha Maha Mantra: Salutations to the ferocious and heroic Mahavishnu who protects his devotees.' }
    ]
  },
  {
    id: 'chaitra-navratri',
    name: 'Chaitra Navratri & Gudi Padwa / Ugadi',
    devanagari: 'चैत्र नवरात्रि एवं नवसंवत्सर',
    tagline: 'Nine Sacred Nights of Divine Mother & Vedic New Year',
    deity: 'Maa Durga (Navadurga) & Lord Brahma',
    symbol: '🌸',
    category: 'Navaratri',
    lunarTiming: 'Chaitra Shukla Pratipada to Navami',
    season: 'Vasanta (Spring)',
    baseMonth: 3, // April
    baseDay: 9,
    muhurta: {
      title: 'Ghatasthapana (Kalash Sthapana) Muhurta',
      time: '6:11 AM to 10:14 AM (Pratipada Morning)',
      duration: '4 Hours 3 Minutes',
      prahars: ['Abhijit Muhurta Ghatasthapana: 11:57 AM to 12:48 PM']
    },
    pujaVidhi: [
      { step: 1, title: 'Kalash Sthapana (Ghatasthapana)', desc: 'Fill a sacred copper or earthen pot with Ganga water, coin, betel nut, and mango leaves. Place a coconut wrapped in red moli on top over a bed of barley (Jau) seeds in clean soil.' },
      { step: 2, title: 'Akhanda Jyoti Sthapana', desc: 'Light an uninterrupted ghee or sesame oil lamp to burn continuously for the 9 days and nights of Navratri.' },
      { step: 3, title: 'Daily Worship of 9 Forms of Durga', desc: 'Day 1: Shailaputri, Day 2: Brahmacharini, Day 3: Chandraghanta, Day 4: Kushmanda, Day 5: Skandamata, Day 6: Katyayani, Day 7: Kalaratri, Day 8: Mahagauri, Day 9: Siddhidatri.' },
      { step: 4, title: 'Durga Saptashati Path', desc: 'Recite the 13 chapters of Devi Mahatmya (Durga Saptashati) with Kavacham, Argala Stotram, and Kilakam.' },
      { step: 5, title: 'Kanya Pujan (Kumari Puja)', desc: 'On Ashtami or Navami, invite 9 young girls (representing the nine Durgas), wash their feet, offer halwa-chana-poori, gifts, and seek their divine blessings.' }
    ],
    fastingRules: {
      type: 'Phalahar / Satvik Navratri Vrat',
      allowed: ['Buckwheat (Kuttu)', 'Water chestnut (Singhara)', 'Foxnut (Makhana)', 'Milk & curd', 'Fruits & nuts', 'Sendha Namak (rock salt)'],
      prohibited: ['Wheat, rice, lentils', 'Garlic, onion', 'Non-vegetarian foods', 'Mustard oil', 'Shaving or cutting hair during the 9 days'],
      paranaTime: 'After Kanya Pujan and Havana on Navami morning.'
    },
    sacredLegends: [
      {
        title: 'Creation of Universe by Lord Brahma',
        story: 'According to the Brahma Purana, Lord Brahma commenced the creation of the cosmos on Chaitra Shukla Pratipada, establishing the cosmic order, time cycles (Yugas), and the solar calendar.'
      },
      {
        title: 'Lord Rama Invoking the Goddess',
        story: 'Before confronting the demon king Ravana, Bhagwan Rama observed intense worship of the Mother Goddess for 9 days to gain invincible spiritual armor and divine weapons.'
      }
    ],
    mantras: [
      { sanskrit: 'ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे॥', meaning: 'Navarna Mantra: The supreme mantra synthesizing Saraswati (Aim), Lakshmi (Hreem), and Kali (Kleem).' },
      { sanskrit: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥', meaning: 'O Auspicious Mother of all auspiciousness, fulfiller of all desires, salutations to You.' }
    ]
  },
  {
    id: 'rama-navami',
    name: 'Rama Navami',
    devanagari: 'रामनवमी',
    tagline: 'Divine Advent of Maryada Purushottama Bhagwan Sri Rama',
    deity: 'Bhagwan Sri Rama, Sita Mata, Lakshmana & Hanuman',
    symbol: '🏹',
    category: 'Mahotsava',
    lunarTiming: 'Chaitra Shukla Navami',
    season: 'Vasanta (Spring)',
    baseMonth: 3, // April
    baseDay: 17,
    muhurta: {
      title: 'Sri Rama Janmotsav Madhyahna Muhurta',
      time: '11:03 AM to 1:36 PM (Midday Avatara Moment: 12:00 PM)',
      duration: '2 Hours 33 Minutes',
      prahars: ['Peak Janma Muhurta at exactly 12:00 Noon during Abhijit Muhurta and Punarvasu Nakshatra.']
    },
    pujaVidhi: [
      { step: 1, title: 'Prabhat Pheri & Ramayana Path', desc: 'Commence the morning with chanting Sri Rama Jaya Rama Jaya Jaya Rama and concluding the 24-hour Akhanda Ramacharitmanas recitation.' },
      { step: 2, title: 'Noon Shishuroopa Abhishekam', desc: 'At exactly 12:00 PM, unveil the baby infant form of Sri Rama (Ram Lalla). Bathe the deity with Panchamrita, fragrant saffron water, and rose water.' },
      { step: 3, title: 'Swinging the Cradle (Jhula Arpan)', desc: 'Place baby Rama in an ornate flower-decorated cradle (Palna) and rock it gently while singing traditional Janmotsav sohar bhajans: "Bhae Pragat Kripala, Deendayala..."' },
      { step: 4, title: 'Naivedya & Panjiri Bhog Offering', desc: 'Offer sweet Dhaniya Panjiri, Panchamrita, cucumber, and seasonal fruits to Sri Rama.' },
      { step: 5, title: 'Maha Arati & Prasad Distribution', desc: 'Perform the grand Deepa Arati with camphor and distribute consecrated Panchamrita and Panjiri to devotees.' }
    ],
    fastingRules: {
      type: 'Upavasa until Midday or Sunset',
      allowed: ['Fruits, milk, curd', 'Sabudana kheer', 'Singhara flour dishes', 'Water'],
      prohibited: ['Grains, pulses, rice, wheat', 'Tamasi spices', 'Heavy oily foods'],
      paranaTime: 'After the 12:00 Noon Janmotsav puja and offering of Panjiri Bhog.'
    },
    sacredLegends: [
      {
        title: 'Incarnation of Sri Rama in Ayodhya',
        story: 'King Dasharatha performed the Putrakameshti Yajna under the guidance of Sage Rishyasringa. Agni Dev appeared with divine Payasam (Kheer). On Chaitra Navami, Queen Kaushalya gave birth to Sri Rama, the seventh avatar of Vishnu, born under Punarvasu Nakshatra with five planets exalted to destroy adharma and establish Ramrajya.'
      }
    ],
    mantras: [
      { sanskrit: 'श्री राम जय राम जय जय राम', meaning: 'Victory to Lord Rama, glory to the Supreme Divine Spirit.' },
      { sanskrit: 'रामाय रामभद्राय रामचन्द्राय वेधसे। रघुनाथाय नाथाय सीतायाः पतये नमः॥', meaning: 'Salutations to Rama, the auspicious protector, the descendant of Raghu, the Lord of Mother Sita.' }
    ]
  },
  {
    id: 'krishna-janmashtami',
    name: 'Krishna Janmashtami',
    devanagari: 'कृष्ण जन्माष्टमी',
    tagline: 'Divine Midnight Advent of Yogeshwara Bhagwan Sri Krishna',
    deity: 'Lord Sri Krishna & Radha Rani',
    symbol: '🪷',
    category: 'Mahotsava',
    lunarTiming: 'Bhadrapada Krishna Ashtami',
    season: 'Varsha (Monsoon)',
    baseMonth: 7, // August
    baseDay: 26,
    muhurta: {
      title: 'Midnight Nishita Kaal Janmotsav Muhurta',
      time: '12:01 AM to 12:45 AM (Midnight of Ashtami)',
      duration: '44 Minutes',
      prahars: ['Peak Avatara moment during Rohini Nakshatra at Midnight.']
    },
    pujaVidhi: [
      { step: 1, title: 'All-Day Fasting & Bhajan Kirtan', desc: 'Fast throughout the day while listening to Krishna Leela stories from the Srimad Bhagavatam.' },
      { step: 2, title: 'Decoration of the Jhula (Swing)', desc: 'Decorate an ornate swing with kadamba flowers, peacock feathers, and fragrant garlands for Laddu Gopal.' },
      { step: 3, title: 'Midnight Conch Blow & Abhishekam', desc: 'At 12:00 midnight, blow the Shankha (conch), ring bells, and bathe Laddu Gopal in a conch shell using raw cow milk, honey, ghee, curd, and Gangajal.' },
      { step: 4, title: 'Chhapan Bhog & Makhan Mishri', desc: 'Offer fresh churned white butter (Makhan) with rock sugar (Mishri), Tulasi leaves, and the traditional 56-course Chhapan Bhog feast.' },
      { step: 5, title: 'Dahi Handi Utsav', desc: 'On the following day, celebrate the daring bravery of young Krishna with human pyramids breaking earthen pots filled with curd and butter.' }
    ],
    fastingRules: {
      type: 'Nirjala or Phalahar until Midnight',
      allowed: ['Fruits, milk, makhana', 'Panchamrit', 'Singhara or buckwheat flour dishes after midnight'],
      prohibited: ['Grains, rice, pulses', 'Non-vegetarian food, onions, garlic'],
      paranaTime: 'After midnight puja and offering arghya to the rising Moon.'
    },
    sacredLegends: [
      {
        title: 'Midnight Birth in Mathura Prison',
        story: 'Surrounded by chained doors and sleeping demonic guards, Lord Krishna manifested in the dark dungeon of Mathura to Devaki and Vasudeva. As heavy rain poured and the Yamuna swelled, Vasudeva carried the divine child across the river under the serpent Sheshnaga’s protective hood to Gokul.'
      }
    ],
    mantras: [
      { sanskrit: 'ॐ क्लीं कृष्णाय गोविंदाय गोपीजनवल्लभाय स्वाहा', meaning: 'Salutations to Lord Krishna, the protector of the cows and the beloved of the Gopis.' },
      { sanskrit: 'वसुदेवसुतं देवं कंसचाणूरमर्दनम्। देवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम्॥', meaning: 'I salute Lord Krishna, son of Vasudeva, destroyer of Kamsa and Chanura, the supreme teacher of the universe.' }
    ]
  },
  {
    id: 'ganesh-chaturthi',
    name: 'Ganesh Chaturthi (Vinayaka Chavithi)',
    devanagari: 'गणेश चतुर्थी',
    tagline: 'Welcoming Vighnaharta Lord Ganesha into Homes & Hearts',
    deity: 'Lord Ganesha & Riddhi-Siddhi',
    symbol: '🪔',
    category: 'Mahotsava',
    lunarTiming: 'Bhadrapada Shukla Chaturthi',
    season: 'Varsha (Monsoon)',
    baseMonth: 8, // September
    baseDay: 7,
    muhurta: {
      title: 'Madhyahna Ganesha Sthapana Muhurta',
      time: '11:03 AM to 1:34 PM (Chaturthi Midday)',
      duration: '2 Hours 31 Minutes',
      prahars: ['Lord Ganesha was born during Madhyahna (midday) Kaal; sthapana is ideal during this window.']
    },
    pujaVidhi: [
      { step: 1, title: 'Clay Ganesha Sthapana & Asana', desc: 'Place an eco-friendly clay idol (Murtikara) facing East on a wooden platform covered with a clean red or yellow silk cloth.' },
      { step: 2, title: 'Prana Pratishtha Ritual', desc: 'Invoke the living presence of Lord Ganesha into the idol with sacred Vedic mantras, dharba grass, and the touch of a betel leaf.' },
      { step: 3, title: 'Offering of 21 Durva Grass Blades', desc: 'Offer 21 pairs of fresh green three-pronged Durva grass blades dipped in holy water to his feet, chanting the 21 sacred names of Ganesha.' },
      { step: 4, title: '21 Modak & Ladoo Naivedya', desc: 'Present steamed ukadiche modaks filled with coconut and jaggery, red hibiscus (Gudhal) flowers, and motichoor ladoos.' },
      { step: 5, title: 'Morning & Evening Arati', desc: 'Sing traditional aratis like "Sukhakarta Dukhaharta" with family, offering fragrant camphor and burning dhoop.' }
    ],
    fastingRules: {
      type: 'Sankalp fast on Chaturthi day',
      allowed: ['Modaks, satvik sweets', 'Fruits, milk, sabudana', 'Nuts and coconut water'],
      prohibited: ['Sight of the Moon on Bhadrapada Shukla Chaturthi (to prevent false accusations/Mithya Dosha)'],
      paranaTime: 'After performing the Madhyahna Puja and offering Naivedyam.'
    },
    sacredLegends: [
      {
        title: 'Creation by Goddess Parvati',
        story: 'Maa Parvati created Ganesha from the divine turmeric paste of her body to guard her private chambers. When Lord Shiva arrived, Ganesha dutifully stopped him, leading to a cosmic battle. Shiva later replaced his head with that of an elephant, granting him the boon of being the first worshipped (Prathama Pujya) across the universe.'
      }
    ],
    mantras: [
      { sanskrit: 'ॐ गं गणपतये नमः', meaning: 'I bow with reverence to Lord Ganapati, remover of all obstacles.' },
      { sanskrit: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥', meaning: 'O Lord with the curved trunk and immense form, whose brilliance rivals ten million suns, make all my endeavors free from hurdles.' }
    ]
  },
  {
    id: 'diwali',
    name: 'Diwali (Deepavali) & Dhanteras',
    devanagari: 'दीपावली एवं धनतेरस',
    tagline: 'The Supreme Festival of Lights, Prosperity & Return of Sri Rama',
    deity: 'Maa Lakshmi, Lord Ganesha, Lord Kubera & Bhagwan Rama',
    symbol: '🪔',
    category: 'Mahotsava',
    lunarTiming: 'Kartika Krishna Amavasya',
    season: 'Hemanta (Autumn/Winter)',
    baseMonth: 9, // October / November
    baseDay: 31,
    muhurta: {
      title: 'Pradosh Kaal Lakshmi Puja Muhurta',
      time: '5:36 PM to 7:32 PM (Amavasya Evening)',
      duration: '1 Hour 56 Minutes',
      prahars: ['Nishita Kaal Mahalakshmi Puja: 11:39 PM to 12:30 AM (for businessmen & seekers).']
    },
    pujaVidhi: [
      { step: 1, title: 'Home Cleansing & Rangoli Decoration', desc: 'Cleanse every corner of the dwelling. Draw colorful flour/flower rangolis and footsteps of Maa Lakshmi (Lakshmi Charan Paduka) leading inwards.' },
      { step: 2, title: 'Lighting of 14 Earthen Ghee Diyas', desc: 'Fill handmade clay diyas with mustard oil or pure cow ghee. Place the prime 4-wick Diya (Choumukhi) in the puja room and illuminate doorways.' },
      { step: 3, title: 'Lakshmi-Ganesha Shodashopachara Puja', desc: 'Place new idols of Lakshmi and Ganesha on a red cloth. Offer lotus flowers, puffed rice (Kheel), sugar candies (Batasha), silver coins, and dry fruits.' },
      { step: 4, title: 'Chopda Pujan (Accounts & Ledger Blessing)', desc: 'Business owners and scholars bless books, ledgers, computers, and tools by inscribing "Shubh Labh" and the sacred Swastika in vermilion.' },
      { step: 5, title: 'Deepa Danam & Exchange of Sweets', desc: 'Distribute sweets to family, workers, and neighbors, wishing harmony, abundance, and illumination of consciousness.' }
    ],
    fastingRules: {
      type: 'Day-long fast until Lakshmi Puja',
      allowed: ['Phalahar during the day', 'Kheel-batasha, satvik sweets after puja'],
      prohibited: ['Gambling, negative disputes', 'Leaving the house dark', 'Alcohol & tamasic food'],
      paranaTime: 'Immediately after the conclusion of Pradosh Kaal Lakshmi Puja.'
    },
    sacredLegends: [
      {
        title: 'Return of Sri Rama to Ayodhya',
        story: 'After defeating Ravana in Lanka and completing 14 years of forest exile, Lord Rama, Mata Sita, and Lakshmana returned to Ayodhya. The overjoyed citizens illuminated the entire kingdom with countless earthen lamps, turning a dark Amavasya night into a dazzling ocean of light.'
      },
      {
        title: 'Emergence of Goddess Lakshmi from the Sea',
        story: 'On Kartika Amavasya, Maa Lakshmi emerged from the churning of the milky ocean (Kshirasagara), holding a pink lotus and bestowing cosmic wealth, light, and prosperity upon all beings.'
      }
    ],
    mantras: [
      { sanskrit: 'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद ॐ श्रीं ह्रीं श्रीं महालक्ष्म्यै नमः॥', meaning: 'Mahalakshmi Bija Mantra: Salutations to Supreme Mother Lakshmi who resides upon the divine lotus.' },
      { sanskrit: 'असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्मा अमृतं गमय॥', meaning: 'Lead us from untruth to truth, from darkness to light, from death to immortality.' }
    ]
  }
];

// Helper to calculate target Date and Milliseconds remaining for any festival
export function getNextFestivalOccurrence(festival) {
  const now = new Date();
  const currentYear = now.getFullYear();

  // Create date for this year
  let target = new Date(currentYear, festival.baseMonth, festival.baseDay, 12, 0, 0);

  // If already passed this year, point to next year
  if (target.getTime() < now.getTime() - 86400000) {
    target = new Date(currentYear + 1, festival.baseMonth, festival.baseDay, 12, 0, 0);
  }

  const diffMs = target.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    targetDate: target,
    dateString: target.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    isToday: days === 0 && hours < 24 && now.getDate() === target.getDate()
  };
}

