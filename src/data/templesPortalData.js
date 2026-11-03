// ============================================================================
// TEMPLES OF INDIA DATASET: 6.48 LAKH+ ATTRIBUTED & DOCUMENTED TEMPLES
// Calibrated across all 36 Indian States and Union Territories
// ============================================================================

export const TOTAL_MAPPED_TEMPLES = 648907;

export const STATE_TEMPLE_STATS = [
  {
    id: 'tamil-nadu',
    code: 'TN',
    name: 'Tamil Nadu',
    templeCount: 79154,
    populationLakhs: 768,
    templesPerLakh: 103.1,
    densityTier: 5, // 1 to 5 (highest heat tint)
    topPick: 'Meenakshi Amman, Madurai',
    center: { x: 370, y: 830 },
    viewBox: '280 720 220 220',
    iconicTemples: [
      {
        id: 'meenakshi-amman',
        name: 'Arulmigu Meenakshi Sundareswarar Temple',
        city: 'Madurai',
        state: 'Tamil Nadu',
        deity: 'Goddess Meenakshi (Parvati) & Sundareswarar (Shiva)',
        era: 'Pandya & Nayakar Dynasties',
        established: '6th Century CE / Rebuilt 16th Century',
        architecturalStyle: 'Dravidian (14 Towering Gopurams)',
        description: 'Spanning 14 acres with 14 magnificent gopurams reaching up to 170 feet, adorned with over 33,000 multi-colored sculpted celestial figures. Houses the famous Hall of a Thousand Pillars.',
        coords: { x: 350, y: 840 }
      },
      {
        id: 'brihadisvara',
        name: 'Brihadisvara Temple (Peruvudaiyar Kovil)',
        city: 'Thanjavur',
        state: 'Tamil Nadu',
        deity: 'Lord Shiva (Peruvudaiyar)',
        era: 'Imperial Chola Dynasty (Raja Raja Chola I)',
        established: '1010 CE (Over 1000 Years Old)',
        architecturalStyle: 'Chola Dravidian Architecture (UNESCO World Heritage)',
        description: 'An architectural marvel constructed entirely of granite. The massive 216-foot central Vimana tower is crowned by an 80-tonne monolithic granite Kumbam carved from a single boulder.',
        coords: { x: 390, y: 810 }
      },
      {
        id: 'srirangam-temple',
        name: 'Sri Ranganathaswamy Temple',
        city: 'Srirangam, Tiruchirappalli',
        state: 'Tamil Nadu',
        deity: 'Ranganatha Swamy (Reclining Vishnu)',
        era: 'Chola, Pandya, Hoysala, Vijayanagara',
        established: 'Antiquity / 9th Century CE',
        architecturalStyle: 'Dravidian (Largest functioning Hindu temple in the world)',
        description: 'Covering an immense 156 acres with 7 concentric rectangular enclosures (Prakarams) and 21 gopurams. The southern Rajagopuram towers at 239 feet.',
        coords: { x: 375, y: 795 }
      },
      {
        id: 'ramanathaswamy',
        name: 'Ramanathaswamy Temple',
        city: 'Rameswaram Island',
        state: 'Tamil Nadu',
        deity: 'Lord Shiva (Ramanathaswamy) & Parvathavarthini',
        era: 'Pandya & Jaffna Sethupathi Dynasties',
        established: 'Treta Yuga Lore / 12th Century CE Stone Expansion',
        architecturalStyle: 'Dravidian (Corridor of 1,212 Carved Pillars)',
        description: 'Southernmost Jyotirlinga and Char Dham shrine. Possesses the longest carved stone pillared corridor in the world, stretching over 1.2 kilometers.',
        coords: { x: 420, y: 870 }
      },
      {
        id: 'shore-temple',
        name: 'Shore Temple & Pancha Rathas',
        city: 'Mamallapuram (Mahabalipuram)',
        state: 'Tamil Nadu',
        deity: 'Lord Shiva & Reclining Vishnu',
        era: 'Pallava Dynasty (Narasimhavarman II)',
        established: '700–728 CE (UNESCO World Heritage)',
        architecturalStyle: 'Early Dravidian Rock-Cut & Structural Granite',
        description: 'Overlooking the Bay of Bengal, built to withstand tidal winds for over 13 centuries. Considered the architectural foundation for subsequent south Indian temple vimanas.',
        coords: { x: 440, y: 760 }
      },
      {
        id: 'annamalaiyar',
        name: 'Annamalaiyar Temple (Arunachaleswarar)',
        city: 'Tiruvannamalai',
        state: 'Tamil Nadu',
        deity: 'Lord Shiva (Agni / Fire Lingam)',
        era: 'Chola, Hoysala, Vijayanagara Dynasties',
        established: '9th Century CE',
        architecturalStyle: 'Dravidian (25-Acre Foot-of-the-Mountain Complex)',
        description: 'Represents the Fire element of the Pancha Bhoota Sthalas. Center of the famous Karthigai Deepam festival where an enormous ghee flame is lit atop Mount Arunachala.',
        coords: { x: 385, y: 760 }
      }
    ]
  },
  {
    id: 'maharashtra',
    code: 'MH',
    name: 'Maharashtra',
    templeCount: 77283,
    populationLakhs: 1260,
    templesPerLakh: 61.3,
    densityTier: 5,
    topPick: 'Shree Siddhivinayak, Mumbai',
    center: { x: 280, y: 550 },
    viewBox: '170 450 250 220',
    iconicTemples: [
      {
        id: 'siddhivinayak',
        name: 'Shree Siddhivinayak Ganapati Mandir',
        city: 'Prabhadevi, Mumbai',
        state: 'Maharashtra',
        deity: 'Ganesha (Siddhivinayak - Right-turned trunk)',
        era: 'Laxman Vithu & Deubai Patil',
        established: '1801 CE',
        architecturalStyle: 'Multi-tiered Gold Dome & Carved Marble Sanctum',
        description: 'One of the richest and most venerated shrines in India. The two-and-a-half-foot black stone idol features a rare right-turning trunk (Navasacha Ganapati).',
        coords: { x: 200, y: 560 }
      },
      {
        id: 'kailash-ellora',
        name: 'Kailash Temple (Cave 16)',
        city: 'Ellora, Chhatrapati Sambhaji Nagar',
        state: 'Maharashtra',
        deity: 'Lord Shiva',
        era: 'Rashtrakuta Dynasty (King Krishna I)',
        established: '756–774 CE (UNESCO World Heritage)',
        architecturalStyle: 'Monolithic Rock-Cut (Carved top-to-bottom from a single mountain)',
        description: 'An engineering feat unparalleled in human history: over 200,000 tonnes of basalt rock were chiseled away from the top downwards to carve a multi-storied temple complex.',
        coords: { x: 260, y: 520 }
      },
      {
        id: 'trimbakeshwar',
        name: 'Trimbakeshwar Shiva Temple',
        city: 'Nashik District',
        state: 'Maharashtra',
        deity: 'Lord Shiva (Trimbaka - Tri-faced Linga of Brahma, Vishnu, Rudra)',
        era: 'Maratha Peshwa Balaji Baji Rao',
        established: '1755–1786 CE',
        architecturalStyle: 'Hemadpanthi Basalt Stone Architecture',
        description: 'Nestled at the source of the Godavari River. One of the 12 Jyotirlingas, home to the sacred Kushavarta reservoir where the Kumbh Mela takes place.',
        coords: { x: 230, y: 530 }
      },
      {
        id: 'bhimashankar',
        name: 'Bhimashankar Jyotirlinga',
        city: 'Sahyadri Hills, Pune',
        state: 'Maharashtra',
        deity: 'Lord Shiva (Bhimashankara)',
        era: 'Ancient / Renovated by Nana Fadnavis',
        established: '18th Century CE Sabhamandap Expansion',
        architecturalStyle: 'Nagara & Hemadpanthi Architecture',
        description: 'Source of the River Bhima, perched inside a dense wildlife sanctuary in the Western Ghats. Renowned for its monolithic pillars and carved mythological friezes.',
        coords: { x: 220, y: 580 }
      },
      {
        id: 'tulja-bhavani',
        name: 'Tulja Bhavani Temple',
        city: 'Tuljapur, Osmanabad (Dharashiv)',
        state: 'Maharashtra',
        deity: 'Goddess Bhavani (Mahishasuramardini)',
        era: '12th Century CE / Patronized by Chhatrapati Shivaji Maharaj',
        established: 'Kadamba & Yadava Dynasties',
        architecturalStyle: 'Maratha Fortified Temple Complex',
        description: 'Kuladaivat (family deity) of Chhatrapati Shivaji Maharaj, who was gifted the legendary Bhavani Talwar (sword) here according to folklore.',
        coords: { x: 300, y: 600 }
      },
      {
        id: 'kolhapur-mahalakshmi',
        name: 'Mahalakshmi Temple (Amba Bai)',
        city: 'Kolhapur',
        state: 'Maharashtra',
        deity: 'Mahalakshmi (Amba Bai)',
        era: 'Chalukya & Silahara Dynasties',
        established: '7th Century CE',
        architecturalStyle: 'Hemadpanthi Architecture with Kiranotsav Alignment',
        description: 'Engineered so that twice a year during Kiranotsav, the setting sun’s rays travel straight through the stone portal to illuminate the idol’s feet, torso, and face.',
        coords: { x: 230, y: 630 }
      }
    ]
  },
  {
    id: 'karnataka',
    code: 'KA',
    name: 'Karnataka',
    templeCount: 61232,
    populationLakhs: 676,
    templesPerLakh: 90.6,
    densityTier: 5,
    topPick: 'Virupaksha, Hampi',
    center: { x: 290, y: 720 },
    viewBox: '200 640 200 230',
    iconicTemples: [
      {
        id: 'virupaksha-hampi',
        name: 'Virupaksha Temple',
        city: 'Hampi, Bellary',
        state: 'Karnataka',
        deity: 'Lord Shiva (Virupaksha) & Pampa Devi',
        era: 'Vijayanagara Empire (Krishnadevaraya)',
        established: '7th Century CE / Expanded 1509 CE (UNESCO)',
        architecturalStyle: 'Vijayanagara Dravidian Architecture',
        description: 'The spiritual heart of the Vijayanagara Empire on the banks of Tungabhadra River. Features a 160-foot eastern gateway tower and an inverted pinhole camera optic built into stone.',
        coords: { x: 290, y: 690 }
      },
      {
        id: 'chennakeshava-belur',
        name: 'Chennakeshava Temple',
        city: 'Belur, Hassan',
        state: 'Karnataka',
        deity: 'Lord Vishnu (Chennakeshava - The Handsome)',
        era: 'Hoysala Empire (King Vishnuvardhana)',
        established: '1117 CE (UNESCO World Heritage)',
        architecturalStyle: 'Hoysala Star-Shaped (Stellate) Chloritic Schist',
        description: 'Took 103 years to complete. Renowned for micro-carved soapstone filigree, bracket figures (Madanikas), and ceiling rosettes cut with jeweller-like precision.',
        coords: { x: 270, y: 750 }
      },
      {
        id: 'hoysaleswara-halebidu',
        name: 'Hoysaleswara Temple',
        city: 'Halebidu, Hassan',
        state: 'Karnataka',
        deity: 'Lord Shiva (Hoysaleswara & Shantaleswara)',
        era: 'Hoysala Empire (King Vishnuvardhana & Ketamalla)',
        established: '1121 CE (UNESCO World Heritage)',
        architecturalStyle: 'Dvikuta (Twin Temple) Hoysala Architecture',
        description: 'Features over 20,000 distinct outer wall relief sculptures depicting an unbroken frieze of charging elephants, lions, horses, makaras, and swans encircling the sanctum.',
        coords: { x: 280, y: 755 }
      },
      {
        id: 'udupi-sri-krishna',
        name: 'Udupi Sri Krishna Matha',
        city: 'Udupi',
        state: 'Karnataka',
        deity: 'Bala Krishna (Child Krishna with Churning Rod)',
        era: 'Founded by Jagadguru Madhvacharya (Dvaita Vedanta)',
        established: '13th Century CE',
        architecturalStyle: 'Coastal Karnataka Temple Matha Architecture',
        description: 'Darshan is performed through the sacred Kanakana Kindi (a silver-plated 9-holed window), commemorating the Lord turning around to bless low-born devotee Kanaka Dasa.',
        coords: { x: 240, y: 740 }
      },
      {
        id: 'murudeshwar',
        name: 'Murudeshwar Temple & Giant Shiva',
        city: 'Bhatkal, Uttara Kannada',
        state: 'Karnataka',
        deity: 'Lord Shiva & Atma Linga fragment',
        era: 'Puranic Gokarna Lore / Modern 2008 Expansion',
        established: 'Classical Antiquity',
        architecturalStyle: 'Coastal Cliff Dravidian (123-foot Statue & 20-Story Gopuram)',
        description: 'Surrounded on three sides by the Arabian Sea on Kanduka Hill. Houses the world’s second tallest statue of Lord Shiva (123 ft) and the 249-foot Raja Gopuram with observation lift.',
        coords: { x: 235, y: 710 }
      }
    ]
  },
  {
    id: 'west-bengal',
    code: 'WB',
    name: 'West Bengal',
    templeCount: 53658,
    populationLakhs: 996,
    templesPerLakh: 53.9,
    densityTier: 4,
    topPick: 'Dakshineswar Kali, Kolkata',
    center: { x: 670, y: 520 },
    viewBox: '600 420 180 220',
    iconicTemples: [
      {
        id: 'dakshineswar',
        name: 'Dakshineswar Kali Temple',
        city: 'Kolkata, Hooghly Riverbank',
        state: 'West Bengal',
        deity: 'Maa Bhavatarini (Kali) & 12 Shiva Shrines',
        era: 'Rani Rashmoni',
        established: '1855 CE',
        architecturalStyle: 'Navaratna (Nine-Spired) Bengal Chala Architecture',
        description: 'The spiritual laboratory of Sri Ramakrishna Paramahamsa. Built on the eastern bank of the Hooghly River, flanked by 12 identical terracotta Shiva shrines and Radha-Kanta temple.',
        coords: { x: 670, y: 530 }
      },
      {
        id: 'kalighat-temple',
        name: 'Kalighat Kali Temple',
        city: 'Kolkata',
        state: 'West Bengal',
        deity: 'Maa Kalika (Right Toes of Sati)',
        era: 'Ancient / Present structure 1809 CE',
        established: '15th Century Lore',
        architecturalStyle: 'Aat-Chala (Eight-Roofed) Traditional Bengal Terracotta',
        description: 'One of the foremost 51 Shakti Peethas. The black stone image features three radiant eyes, a prominent gold tongue, and hands holding a severed head and scimitar.',
        coords: { x: 675, y: 545 }
      },
      {
        id: 'bishnupur-terracotta',
        name: 'Bishnupur Terracotta Temples (Jor Bangla & Rasmancha)',
        city: 'Bishnupur, Bankura',
        state: 'West Bengal',
        deity: 'Radha-Krishna & Lord Vishnu',
        era: 'Malla Dynasty (King Raghunath Singha)',
        established: '16th–17th Century CE',
        architecturalStyle: 'Bengal Terracotta Tile Relief Architecture',
        description: 'Constructed from local alluvial clay baked into intricate reddish-brown terracotta tiles detailing scenes from the Ramayana, Mahabharata, and Krishna-leela.',
        coords: { x: 640, y: 510 }
      },
      {
        id: 'tarapith',
        name: 'Tarapith Temple',
        city: 'Rampurhat, Birbhum',
        state: 'West Bengal',
        deity: 'Maa Tara (Fierce Tantric Form of Shakti)',
        era: 'Sage Vashistha & Saint Bamakhepa',
        established: '1211 CE (Rebuilt 1818)',
        architecturalStyle: 'Bengal Dokhina Dalan Style with Cremation Grounds',
        description: 'Renowned Siddha Peetha associated with the saint Bamakhepa. Believed to be the site where Sati’s third eye or eyeball fell.',
        coords: { x: 630, y: 470 }
      }
    ]
  },
  {
    id: 'gujarat',
    code: 'GJ',
    name: 'Gujarat',
    templeCount: 49995,
    populationLakhs: 704,
    templesPerLakh: 71.0,
    densityTier: 4,
    topPick: 'Shree Somnath, Veraval',
    center: { x: 170, y: 500 },
    viewBox: '70 420 220 200',
    iconicTemples: [
      {
        id: 'somnath-shrine',
        name: 'Shree Somnath Jyotirlinga Temple',
        city: 'Prabhas Patan, Veraval',
        state: 'Gujarat',
        deity: 'Lord Shiva (Someshwara)',
        era: 'Solanki / Rebuilt 1951 by Sardar Patel',
        established: 'Antiquity / Consecrated May 1951',
        architecturalStyle: 'Kailash Mahameru Prasad (Solanki Architecture)',
        description: 'The first of the 12 sacred Jyotirlingas, overlooking the Arabian Sea. The famous Baṇastambha pillar marks an unbroken water route directly south to Antarctica.',
        coords: { x: 140, y: 560 }
      },
      {
        id: 'dwarkadhish-guj',
        name: 'Dwarkadhish Temple (Jagat Mandir)',
        city: 'Dwarka, Gomti Creek',
        state: 'Gujarat',
        deity: 'Lord Krishna (King of Dwarka)',
        era: 'Vajranabha (Krishna’s Great-Grandson) / 16th Century Expansion',
        established: '2,500+ Years Origin',
        architecturalStyle: 'Chalukya-Maru Gurjara Architecture (72 Pillars)',
        description: 'Western cardinal Char Dham sanctuary. A 78-meter high shikhara flies the sacred 52-yard triangular silk flag depicting the sun and moon, hoisted five times daily.',
        coords: { x: 100, y: 510 }
      },
      {
        id: 'modhera-sun',
        name: 'Sun Temple, Modhera',
        city: 'Modhera, Mehsana',
        state: 'Gujarat',
        deity: 'Surya (Sun God)',
        era: 'Solanki Dynasty (King Bhima I)',
        established: '1026–1027 CE (UNESCO World Heritage)',
        architecturalStyle: 'Maru-Gurjara (Kunda Stepwell & Sabha Mandapa)',
        description: 'Engineered so that on equinox mornings, the first ray of the rising sun pierced directly through the carved mandapa into the sanctum sanctorum.',
        coords: { x: 180, y: 460 }
      },
      {
        id: 'akshardham-gandhinagar',
        name: 'Swaminarayan Akshardham',
        city: 'Gandhinagar',
        state: 'Gujarat',
        deity: 'Bhagwan Swaminarayan',
        era: 'BAPS Swaminarayan Sanstha (Pramukh Swami Maharaj)',
        established: '1992 CE',
        architecturalStyle: 'Pink Bansipaharpur Sandstone with Zero Structural Steel',
        description: 'An architectural tribute built without a single piece of steel, featuring 97 carved pillars, 17 domes, and 264 sanctified stone figures.',
        coords: { x: 200, y: 470 }
      }
    ]
  },
  {
    id: 'andhra-pradesh',
    code: 'AP',
    name: 'Andhra Pradesh',
    templeCount: 47152,
    populationLakhs: 539,
    templesPerLakh: 87.5,
    densityTier: 4,
    topPick: 'Tirumala Venkateswara, Tirupati',
    center: { x: 370, y: 680 },
    viewBox: '280 600 220 220',
    iconicTemples: [
      {
        id: 'tirupati-venkateswara',
        name: 'Tirumala Sri Venkateswara Swamy Temple',
        city: 'Tirumala, Tirupati',
        state: 'Andhra Pradesh',
        deity: 'Lord Venkateswara (Balaji / Govinda)',
        era: 'Pallava, Chola, Vijayanagara (Krishnadevaraya)',
        established: 'Antiquity / Golden Vimana 1517 CE',
        architecturalStyle: 'Dravidian Architecture (Ananda Nilayam Golden Dome)',
        description: 'The world’s most frequented pilgrimage shrine. Sits atop the seven hills of Seshachalam. The self-manifested stone deity wears the massive diamond-studded gold crown.',
        coords: { x: 380, y: 740 }
      },
      {
        id: 'srisailam-mallikarjuna',
        name: 'Srisailam Mallikarjuna Swamy & Bhramaramba',
        city: 'Nallamala Hills, Kurnool District',
        state: 'Andhra Pradesh',
        deity: 'Mallikarjuna (Shiva) & Bhramaramba Devi (Shakti)',
        era: 'Satavahanas, Ikshvakus, Kakatiyas, Vijayanagara',
        established: 'Ancient Puranic Era / 14th Century Expansion',
        architecturalStyle: 'Fortified Dravidian Stone Courtyard Complex',
        description: 'Rare confluence of a Jyotirlinga and a Maha Shakti Peetha. Perched beside the Krishna River gorge, praised by Adi Shankaracharya in Sivananda Lahari.',
        coords: { x: 350, y: 670 }
      },
      {
        id: 'srikalahasti-temple',
        name: 'Srikalahasteeswara Temple',
        city: 'Srikalahasti, Chittoor',
        state: 'Andhra Pradesh',
        deity: 'Lord Shiva (Vayu / Air Lingam)',
        era: 'Pallava, Chola & Vijayanagara Dynasties',
        established: '5th Century CE',
        architecturalStyle: 'Dravidian Rock-Cut Hillside Architecture',
        description: 'Pancha Bhoota Sthala for Air (Vayu). A deep flame inside the airtight sanctum perpetually flickers from the invisible breath of the lingam.',
        coords: { x: 390, y: 730 }
      },
      {
        id: 'lepakshi-veerabhadra',
        name: 'Lepakshi Veerabhadra Temple',
        city: 'Lepakshi, Anantapur',
        state: 'Andhra Pradesh',
        deity: 'Veerabhadra (Fierce Shiva Avatar)',
        era: 'Vijayanagara Empire (Virupanna & Veeranna)',
        established: '1530 CE',
        architecturalStyle: 'Vijayanagara Stone Architecture with Hanging Pillar',
        description: 'World-famous for its Hanging Pillar that does not touch the ground, colossal monolithic Nandi bull, and 7-hooded granite Nagalinga.',
        coords: { x: 310, y: 730 }
      }
    ]
  },
  {
    id: 'rajasthan',
    code: 'RJ',
    name: 'Rajasthan',
    templeCount: 39392,
    populationLakhs: 810,
    templesPerLakh: 48.6,
    densityTier: 4,
    topPick: 'Dilwara Temples, Mount Abu',
    center: { x: 240, y: 380 },
    viewBox: '140 280 220 220',
    iconicTemples: [
      {
        id: 'dilwara-mount-abu',
        name: 'Dilwara Temples',
        city: 'Mount Abu, Sirohi',
        state: 'Rajasthan',
        deity: 'Jain Tirthankaras (Adinatha & Neminatha)',
        era: 'Chalukya Ministers (Vimal Shah & Vastupala)',
        established: '11th–13th Century CE',
        architecturalStyle: 'Maru-Gurjara Pure White Marble Carving',
        description: 'Renowned as the pinnacle of stone filigree craftsmanship. Ceilings, doorways, and pillars are carved so translucently that marble looks like polished ivory or butter.',
        coords: { x: 200, y: 420 }
      },
      {
        id: 'brahma-pushkar',
        name: 'Brahma Temple, Pushkar',
        city: 'Pushkar, Ajmer',
        state: 'Rajasthan',
        deity: 'Lord Brahma (Chaturmukha - Four-Faced)',
        era: 'Sage Vishwamitra / Rebuilt 14th Century CE',
        established: 'Antiquity',
        architecturalStyle: 'Rajasthani Nagara with Red Shikhara & Silver Coins Floor',
        description: 'One of the world’s very few active temples dedicated to Lord Brahma. Overlooks sacred Pushkar Lake where Brahma dropped a lotus petal.',
        coords: { x: 240, y: 370 }
      },
      {
        id: 'karni-mata',
        name: 'Karni Mata Temple (Temple of Rats)',
        city: 'Deshnoke, Bikaner',
        state: 'Rajasthan',
        deity: 'Karni Mata (Incarnation of Durga)',
        era: 'Maharaja Ganga Singh of Bikaner',
        established: 'Early 20th Century Marble Facade',
        architecturalStyle: 'Mughal-Rajput Marble Carving & Silver Doors',
        description: 'Home to over 25,000 revered black rats (Kabbas) that live unmolested inside the temple. Sighting a rare white rat is considered a supreme blessing.',
        coords: { x: 220, y: 320 }
      },
      {
        id: 'ranakpur-jain',
        name: 'Ranakpur Jain Temple (Chaturmukha Dharana Vihara)',
        city: 'Ranakpur, Pali District',
        state: 'Rajasthan',
        deity: 'Lord Adinatha',
        era: 'Rana Kumbha & Dharna Shah',
        established: '1439 CE',
        architecturalStyle: 'Maru-Gurjara Architecture with 1,444 Unique Pillars',
        description: 'Supported by 1,444 individually carved marble pillars, no two of which share the same motif. The light-refracting domes change tint throughout the day.',
        coords: { x: 210, y: 395 }
      }
    ]
  },
  {
    id: 'uttar-pradesh',
    code: 'UP',
    name: 'Uttar Pradesh',
    templeCount: 37518,
    populationLakhs: 2350,
    templesPerLakh: 16.0,
    densityTier: 3,
    topPick: 'Kashi Vishwanath, Varanasi',
    center: { x: 440, y: 360 },
    viewBox: '320 280 240 200',
    iconicTemples: [
      {
        id: 'kashi-vishwanath-up',
        name: 'Kashi Vishwanath Temple',
        city: 'Varanasi (Kashi)',
        state: 'Uttar Pradesh',
        deity: 'Lord Shiva (Vishveshwara - King of the Cosmos)',
        era: 'Maharani Ahilyabai Holkar / Gold Spire by Ranjit Singh',
        established: '1780 CE (Corridor Inaugurated 2021)',
        architecturalStyle: 'Nagara Temple Architecture with 1-Ton Gold Spire',
        description: 'Standing on the western bank of the holy Ganga in Varanasi, the eternal city of Shiva. Believed to confer instant Moksha (liberation from rebirth).',
        coords: { x: 500, y: 400 }
      },
      {
        id: 'ram-mandir-ayodhya',
        name: 'Shree Ram Janmabhoomi Mandir',
        city: 'Ayodhya',
        state: 'Uttar Pradesh',
        deity: 'Bhagwan Ram Lalla Sarkar',
        era: 'Shri Ram Janmabhoomi Teerth Kshetra',
        established: 'Consecrated January 2024',
        architecturalStyle: 'Gurjara-Nagara Style using Pink Bansi Paharpur Stone',
        description: 'Built over the historical birthplace of Bhagwan Sri Rama without using iron or steel. Stands 161 feet tall with 392 stone pillars and 44 teakwood doors.',
        coords: { x: 470, y: 360 }
      },
      {
        id: 'banke-bihari',
        name: 'Shri Banke Bihari Mandir',
        city: 'Vrindavan, Mathura',
        state: 'Uttar Pradesh',
        deity: 'Lord Krishna in Tribhanga Posture',
        era: 'Swami Haridas (Guru of Tansen)',
        established: '1864 CE',
        architecturalStyle: 'Rajasthani-Braj Architecture with Arched Pavilions',
        description: 'The idol was manifested by celestial music sung by saint Swami Haridas. Darshan is given behind drawn curtains every few minutes to prevent intense trance.',
        coords: { x: 380, y: 340 }
      },
      {
        id: 'krishna-janmasthan',
        name: 'Shri Krishna Janmabhoomi Complex',
        city: 'Mathura',
        state: 'Uttar Pradesh',
        deity: 'Lord Krishna (Keshavadeva)',
        era: 'Ancient / Reconstructed multiple centuries',
        established: 'Dvapara Yuga Lore / 20th Century Renovation',
        architecturalStyle: 'Nagara Red Sandstone Complex',
        description: 'Marks the exact subterranean prison cell (Garbha Griha) where Lord Krishna was born to Devaki and Vasudeva on a stormy midnight.',
        coords: { x: 370, y: 350 }
      }
    ]
  },
  {
    id: 'odisha',
    code: 'OR',
    name: 'Odisha',
    templeCount: 30877,
    populationLakhs: 462,
    templesPerLakh: 66.8,
    densityTier: 4,
    topPick: 'Jagannath Temple, Puri',
    center: { x: 560, y: 560 },
    viewBox: '480 480 180 180',
    iconicTemples: [
      {
        id: 'puri-jagannath-or',
        name: 'Shree Jagannath Temple',
        city: 'Puri (Sri Kshetra)',
        state: 'Odisha',
        deity: 'Lord Jagannath, Balabhadra, Subhadra & Sudarshana',
        era: 'Eastern Ganga Dynasty (King Anantavarman Chodaganga)',
        established: '1161 CE',
        architecturalStyle: 'Kalinga Architecture (Bada Deula & Jagamohana)',
        description: 'Eastern cardinal Char Dham. Home to the world-famous Ratha Yatra. The 214-foot main tower is crowned by the Nilachakra discus and the wind-defying Patitapavana flag.',
        coords: { x: 580, y: 570 }
      },
      {
        id: 'konark-sun',
        name: 'Sun Temple, Konark (Black Pagoda)',
        city: 'Konark, Puri Coast',
        state: 'Odisha',
        deity: 'Surya (Sun God)',
        era: 'Eastern Ganga Dynasty (King Narasimhadeva I)',
        established: '1250 CE (UNESCO World Heritage)',
        architecturalStyle: 'Kalinga Architecture (Chariot with 24 Sundial Wheels)',
        description: 'Conceived as an immense stone chariot drawn by 7 horses. The 24 carved stone wheels function as accurate sundials measuring time to the exact minute.',
        coords: { x: 590, y: 560 }
      },
      {
        id: 'lingaraj-temple',
        name: 'Lingaraj Temple',
        city: 'Bhubaneswar (Ekamra Kshetra)',
        state: 'Odisha',
        deity: 'Harihara (Combined Form of Shiva & Vishnu)',
        era: 'Somavamshi Dynasty (King Jajati Keshari)',
        established: '11th Century CE',
        architecturalStyle: 'Mature Kalinga Architecture (180-Foot Deula)',
        description: 'The largest temple in Bhubaneswar, city of temples. Surrounded by 150 smaller shrines and the sacred Bindusagar lake.',
        coords: { x: 570, y: 545 }
      }
    ]
  },
  {
    id: 'bihar',
    code: 'BR',
    name: 'Bihar',
    templeCount: 29748,
    populationLakhs: 1240,
    templesPerLakh: 24.0,
    densityTier: 3,
    topPick: 'Mahabodhi Temple, Bodh Gaya',
    center: { x: 560, y: 400 },
    viewBox: '480 340 180 160',
    iconicTemples: [
      {
        id: 'mahabodhi-temple',
        name: 'Mahabodhi Mahavihara',
        city: 'Bodh Gaya',
        state: 'Bihar',
        deity: 'Lord Buddha (Enlightened One)',
        era: 'Emperor Ashoka (3rd Century BCE) / Gupta 5th Century',
        established: '250 BCE Origin (UNESCO World Heritage)',
        architecturalStyle: 'Grand Brick Temple Architecture (55-Meter Shikhara)',
        description: 'Marks the exact spot under the sacred Bodhi Tree where Siddhartha Gautama attained enlightenment. One of the oldest surviving brick temples in India.',
        coords: { x: 560, y: 410 }
      },
      {
        id: 'mundeshwari-temple',
        name: 'Maa Mundeshwari Temple',
        city: 'Ramgarh, Kaimur District',
        state: 'Bihar',
        deity: 'Lord Shiva & Devi Mundeshwari',
        era: 'Gupta Dynasty Inscription (625 CE)',
        established: 'Pre-625 CE (Oldest Functional Temple in India)',
        architecturalStyle: 'Rare Octagonal (Ashtakona) Stone Temple Plan',
        description: 'Archaeologically verified as the oldest functional temple in India where uninterrupted daily worship has continued for over 1,400 years.',
        coords: { x: 510, y: 410 }
      },
      {
        id: 'vishnupad-gaya',
        name: 'Vishnupad Temple',
        city: 'Gaya, Falgu Riverbank',
        state: 'Bihar',
        deity: 'Lord Vishnu Footprint (Dharmasila)',
        era: 'Queen Ahilyabai Holkar of Indore',
        established: '1787 CE',
        architecturalStyle: 'Grey Granite Shikara with 40-cm Footprint of Vishnu',
        description: 'Houses the 40-centimeter footprint of Lord Vishnu stamped into solid basalt rock. Foremost pilgrimage destination in India for performing Pind Daan rituals.',
        coords: { x: 545, y: 415 }
      }
    ]
  },
  {
    id: 'madhya-pradesh',
    code: 'MP',
    name: 'Madhya Pradesh',
    templeCount: 27947,
    populationLakhs: 853,
    templesPerLakh: 32.8,
    densityTier: 3,
    topPick: 'Kandariya Mahadeva, Khajuraho',
    center: { x: 380, y: 460 },
    viewBox: '260 380 240 180',
    iconicTemples: [
      {
        id: 'kandariya-mahadeva',
        name: 'Kandariya Mahadeva Temple',
        city: 'Khajuraho, Chhatarpur',
        state: 'Madhya Pradesh',
        deity: 'Lord Shiva (Kandariya - Lord of the Cave)',
        era: 'Chandela Dynasty (King Vidyadhara)',
        established: '1030 CE (UNESCO World Heritage)',
        architecturalStyle: 'Nagara Architecture with 84 Miniature Urushringas',
        description: 'The crown jewel of Khajuraho. Its 102-foot tower resembles Mount Kailash, decorated with over 800 detailed stone statues of deities, apsaras, and celestial musicians.',
        coords: { x: 420, y: 420 }
      },
      {
        id: 'mahakaleshwar-mp',
        name: 'Mahakaleshwar Jyotirlinga',
        city: 'Ujjain (Avantika), Shipra River',
        state: 'Madhya Pradesh',
        deity: 'Lord Shiva (Mahakala - Dakshinabhimukhi)',
        era: 'Paramaras / Renovated by Scindias & Holkars',
        established: 'Puranic Antiquity (Mahakal Lok 2022)',
        architecturalStyle: 'Three-Tiered Temple with Brass Bhasma Mandap',
        description: 'The only south-facing (Dakshinabhimukhi) Jyotirlinga. Celebrated worldwide for its pre-dawn Bhasma Aarti and as the master of time and mortality.',
        coords: { x: 310, y: 470 }
      },
      {
        id: 'omkareshwar-mp',
        name: 'Omkareshwar & Mamleshwar Jyotirlinga',
        city: 'Mandhata Island, Narmada River',
        state: 'Madhya Pradesh',
        deity: 'Lord Shiva (Omkareshwara)',
        era: 'Paramara Dynasty',
        established: 'Ancient Ikshvaku Lore',
        architecturalStyle: 'Nagara Island Temple on Natural ॐ-Shaped Hill',
        description: 'Located on an island in the Narmada River shaped like the sacred symbol ॐ. The Jyotirlinga is uniquely divided between Omkareshwar on the island and Mamleshwar on the mainland.',
        coords: { x: 310, y: 500 }
      }
    ]
  },
  {
    id: 'kerala',
    code: 'KL',
    name: 'Kerala',
    templeCount: 22931,
    populationLakhs: 356,
    templesPerLakh: 64.4,
    densityTier: 4,
    topPick: 'Sree Padmanabhaswamy, Thiruvananthapuram',
    center: { x: 320, y: 860 },
    viewBox: '280 800 120 180',
    iconicTemples: [
      {
        id: 'padmanabhaswamy',
        name: 'Sree Padmanabhaswamy Temple',
        city: 'Thiruvananthapuram',
        state: 'Kerala',
        deity: 'Lord Padmanabha (Vishnu reclining on Anantha)',
        era: 'Travancore Royal Dynasty (Marthanda Varma)',
        established: '8th Century CE Sangam Lore / Expanded 1750 CE',
        architecturalStyle: 'Chera-Dravidian Fusion (100-foot Gopuram & Granite Corridors)',
        description: 'The wealthiest religious institution in recorded human history. The 18-foot deity is viewed through three separate doors and crafted from 12,008 Saligrama stones.',
        coords: { x: 330, y: 920 }
      },
      {
        id: 'guruvayur-temple',
        name: 'Guruvayur Sri Krishna Temple',
        city: 'Guruvayur, Thrissur',
        state: 'Kerala',
        deity: 'Lord Guruvayurappan (Unnikrishnan / Child Krishna)',
        era: 'Consecrated by Brihaspati (Guru) & Vayu',
        established: 'Antiquity / 1638 CE Reconstruction',
        architecturalStyle: 'Traditional Kerala Wooden & Copper Roofed Sreekovil',
        description: 'Known as "Bhuloka Vaikuntha" (Heaven on Earth). Holds the divine four-armed Vishnu idol originally worshipped by Vasudeva and Devaki in Dwarka.',
        coords: { x: 300, y: 840 }
      },
      {
        id: 'sabarimala',
        name: 'Sabarimala Sree Dharma Sastha Temple',
        city: 'Periyar Tiger Reserve, Pathanamthitta',
        state: 'Kerala',
        deity: 'Lord Ayyappa (Hariharasutha - Son of Shiva & Mohini)',
        era: 'Sage Parashurama & Pandalam Royal Family',
        established: 'Puranic Era',
        architecturalStyle: 'Himalayan-Western Ghats Hilltop Shrine (18 Gold Steps)',
        description: 'Devotees observe a strict 41-day Vratam of celibacy and austerity before climbing the sacred 18 gold steps (Pathinettampadi) to witness the celestial Makaravilakku light.',
        coords: { x: 330, y: 880 }
      }
    ]
  },
  {
    id: 'telangana',
    code: 'TG',
    name: 'Telangana',
    templeCount: 22810,
    populationLakhs: 382,
    templesPerLakh: 59.7,
    densityTier: 4,
    topPick: 'Ramappa Temple, Mulugu',
    center: { x: 360, y: 610 },
    viewBox: '300 550 160 160',
    iconicTemples: [
      {
        id: 'ramappa-temple',
        name: 'Ramappa Temple (Rudreshwara)',
        city: 'Palampet, Mulugu District',
        state: 'Telangana',
        deity: 'Lord Shiva (Ramalingeswara)',
        era: 'Kakatiya Dynasty (General Recharla Rudra)',
        established: '1213 CE (UNESCO World Heritage)',
        architecturalStyle: 'Kakatiya Architecture using Floating Bricks & Sandbox Base',
        description: 'Named after its master sculptor Ramappa. Built using ultra-light floating sponge bricks that float on water, with a sandbox foundation that resisted earthquakes for 800 years.',
        coords: { x: 380, y: 600 }
      },
      {
        id: 'yadagirigutta',
        name: 'Yadadri Sri Lakshmi Narasimha Swamy Temple',
        city: 'Yadagirigutta, Yadadri Bhuvanagiri',
        state: 'Telangana',
        deity: 'Sri Lakshmi Narasimha Swamy (5 Avatars in Cave)',
        era: 'Sage Yadarishi Penance / Reconstructed 2022',
        established: 'Ancient Hill Cave / Expanded with 250,000 Tonnes of Black Granite',
        architecturalStyle: 'Dravidian-Kakatiya Monumental Black Granite Architecture',
        description: 'Carved out of solid black granite (Krushna Shila) without using a single kilogram of cement, inspired by the grand classical architectural shastras.',
        coords: { x: 360, y: 620 }
      },
      {
        id: 'thousand-pillar',
        name: 'Thousand Pillar Temple (Rudreswara)',
        city: 'Hanamkonda, Warangal',
        state: 'Telangana',
        deity: 'Trikuta (Shiva, Vishnu, Surya)',
        era: 'Kakatiya Dynasty (King Rudradeva)',
        established: '1163 CE',
        architecturalStyle: 'Kakatiya Star-Shaped Temple with Carved Black Basalt',
        description: 'Supported by a forest of tightly spaced pillars carved with such geometric precision that not a single pillar obstructs the view of the presiding deities.',
        coords: { x: 370, y: 610 }
      }
    ]
  },
  {
    id: 'assam',
    code: 'AS',
    name: 'Assam',
    templeCount: 14800,
    populationLakhs: 356,
    templesPerLakh: 41.6,
    densityTier: 3,
    topPick: 'Maa Kamakhya, Guwahati',
    center: { x: 810, y: 390 },
    viewBox: '740 330 180 140',
    iconicTemples: [
      {
        id: 'kamakhya-assam',
        name: 'Maa Kamakhya Devalaya',
        city: 'Nilachal Hills, Guwahati',
        state: 'Assam',
        deity: 'Maa Kamakhya (Yoni Peetha of Sati)',
        era: 'Koch Dynasty (King Nara Narayana)',
        established: 'Ancient Antiquity / Rebuilt 1565 CE',
        architecturalStyle: 'Nilachal Style (Beehive Dome on Terraced Plinth)',
        description: 'The supreme seat of Tantric Shaktism. Enshrines the subterranean spring-fed cleft representing the divine feminine generative matrix. Celebrated during Ambubachi Mela.',
        coords: { x: 800, y: 400 }
      },
      {
        id: 'umananda-temple',
        name: 'Umananda Temple (Peacock Island)',
        city: 'Guwahati, Brahmaputra River',
        state: 'Assam',
        deity: 'Lord Shiva (Umananda)',
        era: 'Ahom Dynasty (King Gadadhar Singha)',
        established: '1694 CE',
        architecturalStyle: 'Ahom Terracotta-Stone Island Architecture',
        description: 'Located on the world’s smallest inhabited river island in the mighty Brahmaputra river. Mythologically identified as Bhasmachal where Kamadeva was burnt by Shiva.',
        coords: { x: 805, y: 395 }
      }
    ]
  },
  {
    id: 'chhattisgarh',
    code: 'CT',
    name: 'Chhattisgarh',
    templeCount: 10800,
    populationLakhs: 300,
    templesPerLakh: 36.0,
    densityTier: 3,
    topPick: 'Bhoramdeo Temple, Kawardha',
    center: { x: 470, y: 520 },
    viewBox: '420 460 140 180',
    iconicTemples: [
      {
        id: 'bhoramdeo-temple',
        name: 'Bhoramdeo Temple ("Khajuraho of Chhattisgarh")',
        city: 'Chhapri, Kawardha',
        state: 'Chhattisgarh',
        deity: 'Lord Shiva',
        era: 'Nagavanshi Dynasty (King Ramchandra)',
        established: '11th Century CE (1089 CE)',
        architecturalStyle: 'Nagara-Narmada Stone Architecture on 5-Foot Plinth',
        description: 'Nestled amidst the Maikal mountain range. Decorated with intricate friezes of celestial dancers, musicians, and avatars, closely echoing the art of Khajuraho.',
        coords: { x: 460, y: 510 }
      },
      {
        id: 'danteshwari',
        name: 'Danteshwari Temple',
        city: 'Dantewada, Bastar',
        state: 'Chhattisgarh',
        deity: 'Maa Danteshwari (Tooth of Sati)',
        era: 'Chindaka Nagas & Kakatiya Kings',
        established: '14th Century CE',
        architecturalStyle: 'Bastar Tribal-Classical Wooden & Stone Architecture',
        description: 'One of the 51 Shakti Peethas. The spiritual center of Bastar Dussehra, a 75-day festival celebrated by thousands of indigenous tribal communities.',
        coords: { x: 465, y: 590 }
      }
    ]
  },
  {
    id: 'himachal-pradesh',
    code: 'HP',
    name: 'Himachal Pradesh',
    templeCount: 10329,
    populationLakhs: 74,
    templesPerLakh: 139.6,
    densityTier: 4,
    topPick: 'Jwalamukhi Temple, Kangra',
    center: { x: 310, y: 220 },
    viewBox: '260 160 120 120',
    iconicTemples: [
      {
        id: 'jwalamukhi-hp',
        name: 'Jwalamukhi Devi Temple',
        city: 'Kangra Valley',
        state: 'Himachal Pradesh',
        deity: 'Maa Jwalamukhi (Tongue of Sati)',
        era: 'Raja Bhumi Chand / Golden Dome by Maharaja Ranjit Singh',
        established: 'Puranic Antiquity',
        architecturalStyle: 'Hill Nagara Architecture with Golden Cupola',
        description: 'Features no stone idol; worship is offered to nine eternal, natural blue combustible flames emanating perpetually from natural rock crevices.',
        coords: { x: 300, y: 220 }
      },
      {
        id: 'hidimba-temple',
        name: 'Hidimba Devi Temple (Dhungari Temple)',
        city: 'Manali, Kullu Valley',
        state: 'Himachal Pradesh',
        deity: 'Hidimba Devi (Consort of Bhima)',
        era: 'Raja Bahadur Singh',
        established: '1553 CE',
        architecturalStyle: 'Four-Tiered Wooden Pagoda Architecture inside Deodar Forest',
        description: 'Carved out of cedar deodar wood with a 24-meter conical wooden roof. The sanctum holds a massive natural rock cave where Hidimba meditated.',
        coords: { x: 320, y: 200 }
      },
      {
        id: 'baijnath-hp',
        name: 'Baijnath Shiva Temple',
        city: 'Baijnath, Kangra',
        state: 'Himachal Pradesh',
        deity: 'Lord Shiva (Vaidyanatha)',
        era: 'Merchant Brothers Manyuka and Ahuka',
        established: '1204 CE',
        architecturalStyle: 'Early Classical Nagara Stone Shikhara',
        description: 'Overlooks the snow-crested Dhauladhar range. Believed to be the sacred spot where Ravana performed self-immolating penance to win the Atma Lingam.',
        coords: { x: 310, y: 210 }
      }
    ]
  },
  {
    id: 'jharkhand',
    code: 'JH',
    name: 'Jharkhand',
    templeCount: 9450,
    populationLakhs: 395,
    templesPerLakh: 23.9,
    densityTier: 3,
    topPick: 'Baidyanath Dham, Deoghar',
    center: { x: 600, y: 440 },
    viewBox: '530 380 140 140',
    iconicTemples: [
      {
        id: 'baidyanath-dham',
        name: 'Baidyanath (Baba Dham) Jyotirlinga',
        city: 'Deoghar',
        state: 'Jharkhand',
        deity: 'Lord Shiva (Vaidyanatha - Supreme Divine Doctor)',
        era: 'King Puran Mal / Ravana Penance Lore',
        established: '1596 CE Stone Rebuilding',
        architecturalStyle: 'Nagara Shikhara with Rare Panchashula (Five-Pronged Trident)',
        description: 'One of the 12 Jyotirlingas. Epicenter of the annual Shravani Mela, where over 5 million Kanwariyas walk 108 km carrying holy Ganga water from Sultanganj.',
        coords: { x: 610, y: 430 }
      },
      {
        id: 'parasnath-temple',
        name: 'Shikharji (Parasnath Temple)',
        city: 'Giridih District',
        state: 'Jharkhand',
        deity: 'Lord Parshvanatha & 20 Tirthankaras',
        era: 'Jain Antiquity',
        established: 'Ancient Antiquity',
        architecturalStyle: 'Cluster of 31 Hilltop White Marble Shrines',
        description: 'Standing on the highest mountain peak in Jharkhand (1,365 m). Sacred pilgrimage site where 20 of the 24 Jain Tirthankaras attained Nirvana.',
        coords: { x: 590, y: 450 }
      }
    ]
  },
  {
    id: 'haryana',
    code: 'HR',
    name: 'Haryana',
    templeCount: 7500,
    populationLakhs: 289,
    templesPerLakh: 25.9,
    densityTier: 2,
    topPick: 'Brahma Sarovar & Sthaneshwar, Kurukshetra',
    center: { x: 310, y: 290 },
    viewBox: '260 250 100 100',
    iconicTemples: [
      {
        id: 'sthaneshwar-mahadev',
        name: 'Sthaneshwar Mahadev Temple',
        city: 'Thanesar, Kurukshetra',
        state: 'Haryana',
        deity: 'Lord Shiva',
        era: 'King Harsha of Vardhana Dynasty',
        established: '7th Century CE / Rebuilt 18th Century',
        architecturalStyle: 'Domed Marble-Plaster Nagara Architecture',
        description: 'The historic shrine where the Pandavas worshipped Lord Shiva and received his blessings before marching onto the battlefield of Kurukshetra.',
        coords: { x: 310, y: 285 }
      },
      {
        id: 'sheetla-mata',
        name: 'Sheetla Mata Mandir',
        city: 'Gurugram',
        state: 'Haryana',
        deity: 'Mata Sheetla (Kripi, Consort of Guru Dronacharya)',
        era: 'Chaudhary Jawahar Singh of Bharatpur',
        established: '18th Century CE',
        architecturalStyle: 'North Indian Regional Temple Style',
        description: 'Draws over 1.5 million pilgrims during Chaitra Navaratri seeking blessings for health, vitality, and protection from illnesses.',
        coords: { x: 325, y: 320 }
      }
    ]
  },
  {
    id: 'punjab',
    code: 'PB',
    name: 'Punjab',
    templeCount: 6150,
    populationLakhs: 301,
    templesPerLakh: 20.4,
    densityTier: 2,
    topPick: 'Durgiana Temple, Amritsar',
    center: { x: 270, y: 240 },
    viewBox: '220 200 100 100',
    iconicTemples: [
      {
        id: 'durgiana-temple',
        name: 'Durgiana Temple (Lakshmi Narayan)',
        city: 'Amritsar',
        state: 'Punjab',
        deity: 'Goddess Durga & Lakshmi-Narayana',
        era: 'Guru Harsai Mal Kapoor / Madan Mohan Malaviya',
        established: '1921 CE',
        architecturalStyle: 'Gilded Marble Island Temple with Silver Doors',
        description: 'Rises from the center of a sacred lake in Amritsar. Known for its gilded dome, silver doors embossed with Durga, and the historic Bara Hanuman shrine.',
        coords: { x: 260, y: 235 }
      },
      {
        id: 'devi-talab-mandir',
        name: 'Devi Talab Mandir',
        city: 'Jalandhar',
        state: 'Punjab',
        deity: 'Maa Tripuramalini (51 Shakti Peethas - Right Breast)',
        era: 'Ancient / Renovated Modern Era',
        established: 'Over 200 Years Old',
        architecturalStyle: 'Sacred Water Tank Temple with Gilded Shikhara',
        description: 'Houses an ancient 51 Shakti Peetha temple and an exact model replica of the Amarnath cave temple alongside the holy water tank (Talab).',
        coords: { x: 275, y: 245 }
      }
    ]
  },
  {
    id: 'uttarakhand',
    code: 'UT',
    name: 'Uttarakhand',
    templeCount: 3695,
    populationLakhs: 112,
    templesPerLakh: 33.0,
    densityTier: 3,
    topPick: 'Kedarnath Temple, Rudraprayag',
    center: { x: 380, y: 260 },
    viewBox: '330 200 120 120',
    iconicTemples: [
      {
        id: 'kedarnath-temple-ut',
        name: 'Kedarnath Jyotirlinga Temple',
        city: 'Garhwal Himalayas (3,583m Altitude)',
        state: 'Uttarakhand',
        deity: 'Lord Shiva (Kedaranatha - Hump of the Bull)',
        era: 'Pandavas / Adi Shankaracharya',
        established: '8th Century CE Granite Construction',
        architecturalStyle: 'Immense Interlocking Grey Granite Slabs',
        description: 'The highest of the 12 Jyotirlingas, perched beneath the snowcapped Kedarnath and Kameshwar peaks near the Mandakini River.',
        coords: { x: 375, y: 245 }
      },
      {
        id: 'badrinath-temple-ut',
        name: 'Badrinath Temple (Badri Vishal)',
        city: 'Chamoli District, Alaknanda Bank',
        state: 'Uttarakhand',
        deity: 'Lord Badrinarayan (Meditating Vishnu)',
        era: 'Satya Yuga Lore / Consecrated by Adi Shankaracharya',
        established: '8th Century CE',
        architecturalStyle: 'Himalayan Pagoda Roof with Multicolored Façade',
        description: 'Northern jewel of the Char Dham. Sits at 3,133 meters between the Nar and Narayana mountain ranges, famous for the natural hot sulphur Tapt Kund.',
        coords: { x: 395, y: 240 }
      },
      {
        id: 'tungnath-temple',
        name: 'Tungnath Temple (Panch Kedar)',
        city: 'Chandrashila Peak, Rudraprayag',
        state: 'Uttarakhand',
        deity: 'Lord Shiva (Arms of the Bull)',
        era: 'Pandavas',
        established: 'Over 1000 Years Old',
        architecturalStyle: 'Highest Shiva Temple on Earth (3,680m / 12,073 ft)',
        description: 'The highest temple of Shiva anywhere on Earth. Perched amidst alpine meadows with panoramic views of Nanda Devi, Chaukhamba, and Trishul.',
        coords: { x: 380, y: 250 }
      }
    ]
  },
  {
    id: 'goa',
    code: 'GA',
    name: 'Goa',
    templeCount: 1420,
    populationLakhs: 16,
    templesPerLakh: 88.8,
    densityTier: 4,
    topPick: 'Shanta Durga Temple, Ponda',
    center: { x: 230, y: 670 },
    viewBox: '200 640 60 60',
    iconicTemples: [
      {
        id: 'shanta-durga',
        name: 'Shri Shanta Durga Temple',
        city: 'Kavlem, Ponda',
        state: 'Goa',
        deity: 'Shantadurga (Peacemaker between Shiva and Vishnu)',
        era: 'Maratha Ruler Shahu Maharaj / Sardar Naroram Mantri',
        established: '1738 CE',
        architecturalStyle: 'Indo-Portuguese Goan Temple with Deepastambha & Domes',
        description: 'Celebrated for its unique Goan temple architecture combining arched Roman glass windows, red terracotta tiles, and a multi-tiered white Deepastambha lamp tower.',
        coords: { x: 230, y: 670 }
      },
      {
        id: 'mangeshi-temple',
        name: 'Shri Mangesh Temple',
        city: 'Mangeshi, Priol, Ponda',
        state: 'Goa',
        deity: 'Lord Shiva (Mangesh - Incarnation to Parvati)',
        era: 'Peshwa Era Reconstruction',
        established: '1560 CE Relocated / 18th Century Structure',
        architecturalStyle: 'Seven-Story White Octagonal Deepastambha & Water Tank',
        description: 'The patron deity of Saraswat Brahmins, famous for its magnificent seven-tiered lamp tower that creates a spectacular golden spectacle when lit with oil lamps.',
        coords: { x: 235, y: 665 }
      }
    ]
  },
  {
    id: 'tripura',
    code: 'TR',
    name: 'Tripura',
    templeCount: 1100,
    populationLakhs: 41,
    templesPerLakh: 26.8,
    densityTier: 2,
    topPick: 'Tripura Sundari Temple, Udaipur',
    center: { x: 745, y: 490 },
    viewBox: '710 460 70 70',
    iconicTemples: [
      {
        id: 'tripura-sundari',
        name: 'Tripura Sundari Temple (Matabari)',
        city: 'Udaipur',
        state: 'Tripura',
        deity: 'Maa Kali (Shoroshi / Tripura Sundari)',
        era: 'Maharaja Dhanya Manikya',
        established: '1501 CE',
        architecturalStyle: 'Chala Style resembling a Tortoise (Kurma Peetha)',
        description: 'One of the 51 Shakti Peethas (where Sati\'s right foot fell). Built in the shape of a tortoise shell beside the sacred Kalyan Sagar lake.',
        coords: { x: 745, y: 490 }
      }
    ]
  },
  {
    id: 'delhi',
    code: 'DL',
    name: 'Delhi (NCT)',
    templeCount: 870,
    populationLakhs: 210,
    templesPerLakh: 4.1,
    densityTier: 1,
    topPick: 'Akshardham & Kalkaji Mandir',
    center: { x: 340, y: 310 },
    viewBox: '310 290 60 60',
    iconicTemples: [
      {
        id: 'delhi-akshardham',
        name: 'Swaminarayan Akshardham',
        city: 'New Delhi, Yamuna Bank',
        state: 'Delhi (NCT)',
        deity: 'Bhagwan Swaminarayan',
        era: 'Pramukh Swami Maharaj',
        established: '2005 CE',
        architecturalStyle: 'Pancharatra Shastra & Rajasthani Pink Sandstone',
        description: 'A colossal modern spiritual campus featuring 234 carved pillars, 9 ornate domes, 20 quadrangle shikhars, and the Gajendra Peeth stone elephant frieze.',
        coords: { x: 342, y: 312 }
      },
      {
        id: 'kalkaji-mandir',
        name: 'Kalkaji Mandir (Manokamna Siddha Peetha)',
        city: 'Kalkaji, South Delhi',
        state: 'Delhi (NCT)',
        deity: 'Maa Kali (Kalka Devi)',
        era: 'Mahabharata Antiquity / 18th Century Structure',
        established: '3,000+ Years Lore',
        architecturalStyle: '12-Sided Domed Marble Sanctum',
        description: 'One of the oldest surviving pilgrimage shrines in Delhi. Legend holds that the Pandavas and Krishna worshipped Kali here before the Kurukshetra War.',
        coords: { x: 338, y: 315 }
      }
    ]
  },
  {
    id: 'puducherry',
    code: 'PY',
    name: 'Puducherry',
    templeCount: 680,
    populationLakhs: 15,
    templesPerLakh: 45.3,
    densityTier: 3,
    topPick: 'Manakula Vinayagar Temple',
    center: { x: 420, y: 800 },
    viewBox: '400 780 40 40',
    iconicTemples: [
      {
        id: 'manakula-vinayagar',
        name: 'Arulmigu Manakula Vinayagar Temple',
        city: 'White Town, Puducherry',
        state: 'Puducherry',
        deity: 'Lord Ganesha (Manakula Vinayagar)',
        era: 'Pre-French colonial era (1666 CE)',
        established: '500+ Years Old',
        architecturalStyle: 'Gold-Plated Vimana with Dravidian Chariot Base',
        description: 'Existed prior to French colonization. The inner ceiling is lined with 24 colored murals illustrating the incarnations of Lord Ganesha.',
        coords: { x: 420, y: 800 }
      }
    ]
  },
  {
    id: 'jammu-kashmir',
    code: 'JK',
    name: 'Jammu & Kashmir',
    templeCount: 470,
    populationLakhs: 136,
    templesPerLakh: 3.5,
    densityTier: 1,
    topPick: 'Vaishno Devi, Katra',
    center: { x: 260, y: 150 },
    viewBox: '200 90 140 120',
    iconicTemples: [
      {
        id: 'vaishno-devi-jk',
        name: 'Shri Mata Vaishno Devi Shrine',
        city: 'Trikuta Mountains, Katra',
        state: 'Jammu & Kashmir',
        deity: 'Maha Kali, Maha Lakshmi & Maha Saraswati (Pindis)',
        era: 'Treta Yuga Lore',
        established: 'Natural Mountain Cavern',
        architecturalStyle: 'Sacred Himalayan Cave Temple at 5,200 Feet Altitude',
        description: 'Over 8 million pilgrims trek 13 km into the folds of Trikuta mountain annually to receive darshan of the three natural rock formations (Pindis).',
        coords: { x: 260, y: 160 }
      },
      {
        id: 'amarnath-cave',
        name: 'Amarnath Cave Temple',
        city: 'Anantnag District (3,888m Altitude)',
        state: 'Jammu & Kashmir',
        deity: 'Lord Shiva (Swayambhu Ice Lingam)',
        era: 'Rishi Bhrigu / Puranic Lore',
        established: 'Antiquity',
        architecturalStyle: 'Natural Glacial Cave (Ice Stalagmite Lingam)',
        description: 'The natural ice lingam waxes and wanes with the phases of the moon. Believed to be the secret cave where Shiva revealed the Amar Katha (secret of immortality) to Parvati.',
        coords: { x: 280, y: 140 }
      },
      {
        id: 'martand-sun',
        name: 'Martand Sun Temple Ruins',
        city: 'Anantnag, Kashmir Valley',
        state: 'Jammu & Kashmir',
        deity: 'Surya (Sun God)',
        era: 'Karkota Empire (Emperor Lalitaditya Muktapida)',
        established: '8th Century CE (725–756 CE)',
        architecturalStyle: 'Greco-Roman & Kashmiri Classical Stone Colonnade',
        description: 'A monument of supreme grandeur standing atop a plateau, built from massive square limestone blocks with 84 fluted Greek-style columns.',
        coords: { x: 275, y: 150 }
      }
    ]
  },
  {
    id: 'manipur',
    code: 'MN',
    name: 'Manipur',
    templeCount: 420,
    populationLakhs: 32,
    templesPerLakh: 13.1,
    densityTier: 1,
    topPick: 'Shri Govindajee, Imphal',
    center: { x: 800, y: 440 },
    viewBox: '760 410 70 70',
    iconicTemples: [
      {
        id: 'shri-govindajee',
        name: 'Shri Govindajee Temple',
        city: 'Imphal',
        state: 'Manipur',
        deity: 'Radha-Krishna (Govindajee) & Balarama',
        era: 'Maharaja Nara Singh',
        established: '1846 CE',
        architecturalStyle: 'Twin Golden Domes with Classical Meitei-Vaishnava Veranda',
        description: 'The spiritual epicenter of Manipuri Vaishnavism. Renowned for its world-famous classical Manipuri Raas Leela devotional dance performances.',
        coords: { x: 800, y: 440 }
      }
    ]
  },
  {
    id: 'sikkim',
    code: 'SK',
    name: 'Sikkim',
    templeCount: 320,
    populationLakhs: 7,
    templesPerLakh: 45.7,
    densityTier: 3,
    topPick: 'Kirateshwar Mahadev, Legship',
    center: { x: 670, y: 340 },
    viewBox: '640 310 60 60',
    iconicTemples: [
      {
        id: 'kirateshwar-mahadev',
        name: 'Kirateshwar Mahadev Mandir',
        city: 'Legship, West Sikkim',
        state: 'Sikkim',
        deity: 'Lord Shiva in Kirata (Hunter) Form',
        era: 'Mahabharata Antiquity',
        established: 'Ancient Antiquity',
        architecturalStyle: 'Himalayan Riverbank Stone Temple along River Rangeet',
        description: 'Believed to be the sacred spot where Arjuna performed penance to Lord Shiva, who tested him as a Kirata hunter before bestowing the celestial Pasupatastra weapon.',
        coords: { x: 670, y: 340 }
      }
    ]
  },
  {
    id: 'meghalaya',
    code: 'ML',
    name: 'Meghalaya',
    templeCount: 260,
    populationLakhs: 33,
    templesPerLakh: 7.9,
    densityTier: 1,
    topPick: 'Nartiang Durga Temple',
    center: { x: 760, y: 420 },
    viewBox: '720 390 80 60',
    iconicTemples: [
      {
        id: 'nartiang-durga',
        name: 'Nartiang Durga Temple',
        city: 'Nartiang, West Jaintia Hills',
        state: 'Meghalaya',
        deity: 'Maa Jayanti (51 Shakti Peethas - Left Thigh of Sati)',
        era: 'Jaintia Kings',
        established: 'Over 600 Years Old (15th Century)',
        architecturalStyle: 'Traditional Khasi-Jaintia Thatch-Inspired Structure with Monoliths',
        description: 'One of the 51 Shakti Peethas. Located next to the world’s largest collection of prehistoric megalithic stone monoliths.',
        coords: { x: 760, y: 420 }
      }
    ]
  },
  {
    id: 'arunachal-pradesh',
    code: 'AR',
    name: 'Arunachal Pradesh',
    templeCount: 220,
    populationLakhs: 16,
    templesPerLakh: 13.8,
    densityTier: 1,
    topPick: 'Malinithan Temple, Likabali',
    center: { x: 850, y: 330 },
    viewBox: '780 270 140 120',
    iconicTemples: [
      {
        id: 'malinithan-temple',
        name: 'Malinithan Archaeological Temple Site',
        city: 'Likabali, Lower Siang',
        state: 'Arunachal Pradesh',
        deity: 'Durga (Malini) & Lord Shiva',
        era: 'Chutiya Kingdom',
        established: '13th–14th Century CE Ruins',
        architecturalStyle: 'Classical Carved Basalt Sculptures in Foot of Himalayas',
        description: 'Legend says Sri Krishna and Rukmini stopped here after their marriage in Kundinapura and were welcomed with garlands by Shiva and Parvati (Malini).',
        coords: { x: 850, y: 330 }
      }
    ]
  },
  {
    id: 'ladakh',
    code: 'LA',
    name: 'Ladakh',
    templeCount: 180,
    populationLakhs: 3,
    templesPerLakh: 60.0,
    densityTier: 3,
    topPick: 'Shey Naropa & Alchi Temples',
    center: { x: 330, y: 110 },
    viewBox: '270 60 140 120',
    iconicTemples: [
      {
        id: 'shey-temple',
        name: 'Shey Palace & Shakyamuni Temple',
        city: 'Shey, Leh Valley',
        state: 'Ladakh',
        deity: 'Buddha Shakyamuni (39-foot Gilded Copper Statue)',
        era: 'King Deldan Namgyal of Ladakh',
        established: '1655 CE',
        architecturalStyle: 'Tibetan-Himalayan Fortress Architecture',
        description: 'Houses the 39-foot tall seated Shakyamuni Buddha cast in gilded copper, the second largest such statue in Ladakh, adorned with turquoise and pearls.',
        coords: { x: 330, y: 110 }
      }
    ]
  },
  {
    id: 'dadra-nagar-haveli',
    code: 'DH',
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    templeCount: 130,
    populationLakhs: 6,
    templesPerLakh: 21.7,
    densityTier: 1,
    topPick: 'Somnath Mahadev, Daman',
    center: { x: 195, y: 535 },
    viewBox: '175 515 40 40',
    iconicTemples: [
      {
        id: 'somnath-daman',
        name: 'Somnath Mahadev Temple',
        city: 'Dabhel, Daman',
        state: 'Dadra & Nagar Haveli and Daman & Diu',
        deity: 'Lord Shiva',
        era: '19th Century CE Reconstruction',
        established: '18th Century CE Origin',
        architecturalStyle: 'Coastal Gujarati Carved Marble Architecture',
        description: 'Venerated shrine famed for its ornate marble carvings, multi-tiered shikhara, and large annual Maha Shivaratri fair.',
        coords: { x: 195, y: 535 }
      }
    ]
  },
  {
    id: 'mizoram',
    code: 'MZ',
    name: 'Mizoram',
    templeCount: 120,
    populationLakhs: 13,
    templesPerLakh: 9.2,
    densityTier: 1,
    topPick: 'Om Temple, Aizawl',
    center: { x: 780, y: 490 },
    viewBox: '750 460 60 60',
    iconicTemples: [
      {
        id: 'om-temple-aizawl',
        name: 'Shree Krishna Temple / Om Mandir',
        city: 'Thuampui, Aizawl',
        state: 'Mizoram',
        deity: 'Lord Krishna & Lord Shiva',
        era: '20th Century CE',
        established: '1970s',
        architecturalStyle: 'Hilly Shikhara Architecture overlooking Lush Valleys',
        description: 'Serves as the central spiritual gathering sanctum for Hindu residents and visitors in the capital city of Aizawl.',
        coords: { x: 780, y: 490 }
      }
    ]
  },
  {
    id: 'nagaland',
    code: 'NL',
    name: 'Nagaland',
    templeCount: 110,
    populationLakhs: 22,
    templesPerLakh: 5.0,
    densityTier: 1,
    topPick: 'Dimapur Kalibari',
    center: { x: 840, y: 390 },
    viewBox: '800 360 60 60',
    iconicTemples: [
      {
        id: 'dimapur-kalibari',
        name: 'Dimapur Kalibari',
        city: 'Dimapur',
        state: 'Nagaland',
        deity: 'Maa Kali',
        era: 'Established 1956 CE',
        established: '1956 CE',
        architecturalStyle: 'Traditional Indian Mandir with Community Yajnashala',
        description: 'The oldest and most revered Hindu temple in Nagaland, celebrating Durga Puja and Kali Puja with great devotion across communities.',
        coords: { x: 840, y: 390 }
      }
    ]
  },
  {
    id: 'chandigarh',
    code: 'CH',
    name: 'Chandigarh',
    templeCount: 95,
    populationLakhs: 12,
    templesPerLakh: 7.9,
    densityTier: 1,
    topPick: 'Chandi Mandir (City Namesake)',
    center: { x: 300, y: 260 },
    viewBox: '280 240 40 40',
    iconicTemples: [
      {
        id: 'chandi-mandir',
        name: 'Historic Chandi Mandir',
        city: 'Chandigarh Border, Panchkula',
        state: 'Chandigarh',
        deity: 'Goddess Chandi (Power & War)',
        era: 'Ancient Lore / Associated with Pandavas',
        established: 'Over 500 Years Old',
        architecturalStyle: 'North Indian Hillside Shakti Shrine',
        description: 'The sacred temple from which the planned modern city of Chandigarh draws its immortal name ("Chandi-Garh" / Fort of Goddess Chandi).',
        coords: { x: 300, y: 260 }
      }
    ]
  },
  {
    id: 'andaman-nicobar',
    code: 'AN',
    name: 'Andaman & Nicobar Islands',
    templeCount: 71,
    populationLakhs: 4,
    templesPerLakh: 17.8,
    densityTier: 1,
    topPick: 'Sri Vetrimalai Murugan, Port Blair',
    center: { x: 830, y: 840 },
    viewBox: '800 800 60 80',
    iconicTemples: [
      {
        id: 'vetrimalai-murugan',
        name: 'Sri Vetrimalai Murugan Temple',
        city: 'Shadipur, Port Blair',
        state: 'Andaman & Nicobar Islands',
        deity: 'Lord Murugan (Lord of Victory)',
        era: 'Tamil Settlers & Freedom Fighters',
        established: '1926 CE',
        architecturalStyle: 'Dravidian Gopuram on Emerald Island Coast',
        description: 'The foremost Hindu pilgrimage temple of the Andaman Islands. Built in gratitude by early settlers and freed penal colony prisoners, celebrating Panguni Uthiram.',
        coords: { x: 830, y: 840 }
      }
    ]
  },
  {
    id: 'lakshadweep',
    code: 'LD',
    name: 'Lakshadweep',
    templeCount: 20,
    populationLakhs: 1,
    templesPerLakh: 20.0,
    densityTier: 1,
    topPick: 'Kavaratti Island Shrines',
    center: { x: 190, y: 830 },
    viewBox: '170 810 40 40',
    iconicTemples: [
      {
        id: 'kavaratti-shrine',
        name: 'Kavaratti Maritime Mandir',
        city: 'Kavaratti Island',
        state: 'Lakshadweep',
        deity: 'Lord Shiva & Sri Krishna',
        era: 'Naval & Coastal Administration',
        established: '20th Century CE',
        architecturalStyle: 'Coastal Coral Stone & Timber Shrine',
        description: 'Serves defence personnel, pilgrims, and seafarers crossing the deep Arabian Sea atolls.',
        coords: { x: 190, y: 830 }
      }
    ]
  }
];

// Helper to calculate total count
export function getSumOfAllTemples() {
  return STATE_TEMPLE_STATS.reduce((acc, curr) => acc + curr.templeCount, 0);
}

// Flat array of all iconic historical mega-temples across India with state context
export const ALL_ICONIC_TEMPLES = STATE_TEMPLE_STATS.flatMap(state =>
  (state.iconicTemples || []).map(temple => ({
    ...temple,
    stateId: state.id,
    stateCode: state.code,
    stateName: state.name,
    stateCount: state.templeCount,
    densityTier: state.densityTier
  }))
);

// Map of stateId to state object
export const STATE_BY_ID = STATE_TEMPLE_STATS.reduce((acc, state) => {
  acc[state.id] = state;
  return acc;
}, {});

