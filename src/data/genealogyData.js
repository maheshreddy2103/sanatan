export const genealogyData = {
  // ==========================================
  // TAB 1: COSMIC GENESIS & SAPTARISHIS
  // ==========================================
  genesis: {
    id: 'genesis',
    title: 'Cosmic Genesis & Saptarishis',
    sanskrit: 'सृष्टि क्रमः एवं महर्षयः',
    subtitle: 'From Unmanifest Brahman to Brahma and the Mind-Born Sages (Manasaputras)',
    description: 'In Vedic cosmology, creation begins when the formless Supreme Consciousness (Nirguna Brahman) vibrates as primordial sound (Nada / Om) and projects Brahma, the cosmic architect. Brahma creates the Saptarishis (Seven Sages) and Prajapatis through mental ideation (Manasa Putras) to populate the realms with wisdom, life forms, and divine law.',
    tree: [
      {
        id: 'brahman',
        name: 'Parabrahman (Supreme Reality)',
        sanskrit: 'परब्रह्म',
        role: 'Primordial Unmanifest Source (Sat-Chit-Ananda)',
        description: 'The eternal, infinite, formless ground of all existence from which the cosmic projection (Srishti) emerges and dissolves.',
        generation: 0,
        children: ['brahma', 'vishnu', 'shiva']
      },
      {
        id: 'brahma',
        name: 'Lord Brahma (The Creator)',
        sanskrit: 'ब्रह्मा',
        role: 'Cosmic Architect & Source of the Vedas',
        description: 'Manifested from the Hiranyagarbha (cosmic golden egg). He created the universe and fathered the cosmic progenitors from his mind and limbs.',
        generation: 1,
        parents: ['Parabrahman'],
        children: ['saptarishis', 'manu-svayambhuva', 'sanat-kumaras', 'narada']
      },
      {
        id: 'sanat-kumaras',
        name: 'The Four Kumaras (Sanaka, Sanandana, Sanatana, Sanatkumara)',
        sanskrit: 'सनकादि कुमाराः',
        role: 'Eternal Renunciate Youths',
        description: 'Brahma\'s first mind-born sons who chose perpetual celibacy and non-attachment to worldliness, remaining forever pure spiritual seekers.',
        generation: 2,
        parents: ['Lord Brahma'],
        children: []
      },
      {
        id: 'narada',
        name: 'Devarshi Narada',
        sanskrit: 'देवर्षि नारद',
        role: 'Divine Messenger & Master of Bhakti',
        description: 'Born from Brahma’s throat/mind. Wanders the three worlds with his Veena (Mahathi), chanting "Narayana Narayana" and orchestrating divine plans.',
        generation: 2,
        parents: ['Lord Brahma'],
        children: []
      },
      {
        id: 'manu-svayambhuva',
        name: 'Svayambhuva Manu & Shatarupa',
        sanskrit: 'स्वायम्भुव मनु एवं शतरूपा',
        role: 'First Progenitors of Humanity',
        description: 'Created by Brahma from his own form. Fathered Priyavrata and Uttanapada (father of Prince Dhruva), establishing the earliest cosmic dynasties.',
        generation: 2,
        parents: ['Lord Brahma'],
        children: ['priyavrata', 'uttanapada', 'akuti', 'devahuti', 'prasuti']
      },
      {
        id: 'saptarishis',
        name: 'The Saptarishis & Prajapatis',
        sanskrit: 'सप्तर्षयः प्रजापतयश्च',
        role: 'Cosmic Fathers & Seers of the Vedas',
        description: 'Marichi, Atri, Angiras, Pulaha, Pulastya, Kratu, Vashistha, Bhrigu, and Daksha Prajapati. They anchor cosmic dharma and populate the universe.',
        generation: 2,
        parents: ['Lord Brahma'],
        children: ['kashyapa', 'diti-aditi']
      },
      {
        id: 'kashyapa',
        name: 'Maharshi Kashyapa',
        sanskrit: 'कश्यप ऋषि',
        role: 'Father of All Living Beings',
        description: 'Son of Marichi. Married the daughters of Daksha (Aditi, Diti, Kadru, Vinata, Danu). Through Aditi, he fathered the 12 Adityas (including Surya and Vamana); through Diti, the Daityas/Asuras; through Kadru, the Nagas; through Vinata, Garuda.',
        generation: 3,
        parents: ['Marichi (Mind-born son of Brahma)'],
        children: ['adityas', 'vivasvan-surya', 'daityas', 'nagas', 'garuda']
      }
    ]
  },

  // ==========================================
  // TAB 2: SURYAVANSHA (THE SOLAR DYNASTY)
  // ==========================================
  suryavansha: {
    id: 'suryavansha',
    title: 'Suryavansha (The Solar Dynasty)',
    sanskrit: 'सूर्यवंशः (इक्ष्वाकु वंशः)',
    subtitle: 'From Surya and Manu to Harishchandra, Bhagiratha, Raghu & Sri Rama',
    description: 'The Solar Dynasty is the immortal royal lineage characterized by unyielding adherence to truth (Satya), righteousness (Dharma), and self-sacrifice for subjects. Founded by King Ikshvaku at Ayodhya, it culminated in the manifestation of Bhagwan Sri Rama, the Maryada Purushottama.',
    tree: [
      {
        id: 'surya-vivasvan',
        name: 'Surya / Vivasvan',
        sanskrit: 'सूर्य (विवस्वान्)',
        title: 'The Solar Deity & Cosmic Illuminator',
        generation: 1,
        era: 'Beginning of Solar Order',
        deeds: 'The primordial celestial light. Mentioned in the Bhagavad Gita (4.1) as the first recipient of the eternal yoga from Bhagwan Krishna.',
        children: ['Vaivasvata Manu', 'Yama (God of Death)', 'Yamuna', 'Ashwini Kumaras', 'Sugriva (spiritual son)']
      },
      {
        id: 'vaivasvata-manu',
        name: 'Vaivasvata Manu',
        sanskrit: 'वैवस्वत मनु',
        title: 'Seventh & Current Manu of our Kalpa',
        generation: 2,
        era: 'Beginning of Manvantara',
        deeds: 'Rescued the primordial Matsya (Fish) Avatar during the cosmic deluge. Codified ancient cosmic jurisprudence and established the foundations of civil society in Aryavarta.',
        children: ['Ikshvaku', 'Ila', 'Nabhaga', 'Dhrishta', 'Saryati', 'Narishyanta']
      },
      {
        id: 'ikshvaku',
        name: 'King Ikshvaku',
        sanskrit: 'राजा इक्ष्वाकु',
        title: 'Founder of the Ayodhya Realm',
        generation: 3,
        era: 'Early Treta Yuga',
        deeds: 'Established the sacred capital city of Ayodhya on the banks of River Sarayu. Renowned for just governance and upholding Vedic yajnas. The entire dynasty is named Ikshvaku Vamsha after him.',
        children: ['Vikukshi (Shashada)', 'Nimi (founded Videha / Janaka dynasty)', 'Danda']
      },
      {
        id: 'mandhata',
        name: 'Emperor Mandhata',
        sanskrit: 'सम्राट् मान्धाता',
        title: 'The Chakravarti Universal Sovereign',
        generation: 12,
        era: 'Treta Yuga',
        deeds: 'A legendary Chakravartin emperor who brought peace across the four oceans. Defeated celestial asuras and founded Omkareshwar Mandhata.',
        children: ['Muchukunda', 'Ambarisha', 'Trasadasyu']
      },
      {
        id: 'harishchandra',
        name: 'King Harishchandra',
        sanskrit: 'सत्यवादी राजा हरिश्चन्द्र',
        title: 'The Epitome of Absolute Truth (Satya)',
        generation: 20,
        era: 'Treta Yuga',
        deeds: 'Tested severely by Sage Vishwamitra. Sacrificed his empire, kingdom, wealth, wife, and only son Rohitashva without once speaking an untruth. Eventually elevated bodily to heaven with all his subjects by the gods.',
        children: ['Rohita']
      },
      {
        id: 'sagara',
        name: 'King Sagara',
        sanskrit: 'राजा सगर',
        title: 'Lord of the Oceans (Sagara)',
        generation: 28,
        era: 'Treta Yuga',
        deeds: 'Performed the Ashvamedha Yajna. When Indra stole the sacrificial horse and hid it near Sage Kapila’s hermitage, Sagara\'s 60,000 sons dug into the earth and insulted the meditating sage, being reduced to ashes by Kapila\'s fiery gaze.',
        children: ['Asamanja', '60,000 Sons (ancestors of Sagara ocean)']
      },
      {
        id: 'bhagiratha',
        name: 'King Bhagiratha',
        sanskrit: 'राजा भगीरथ',
        title: 'The Divine Descent of Mother Ganga',
        generation: 32,
        era: 'Treta Yuga',
        deeds: 'Undertook unprecedented, grueling penance (Bhagiratha Prayatna) to bring the celestial river Ganga down to Earth from heaven to wash over the ashes of his 60,000 ancestors and grant them liberation. Shiva cushioned Ganga’s mighty torrent in His matted hair.',
        children: ['Shruta']
      },
      {
        id: 'raghu',
        name: 'King Raghu',
        sanskrit: 'महाराज रघु',
        title: 'The World Conqueror & Giver of All Wealth',
        generation: 38,
        era: 'Treta Yuga (Raghuvamsha)',
        deeds: 'Subdued the four directions (Digvijaya) and performed the Vishvajit Yajna, donating away all imperial treasures until he drank water from an earthen bowl. Celebrated by poet Kalidasa in the epic *Raghuvamsham*.',
        children: ['Aja']
      },
      {
        id: 'aja',
        name: 'King Aja',
        sanskrit: 'राजा अज',
        title: 'The Chivalrous & Noble King',
        generation: 39,
        era: 'Treta Yuga',
        deeds: 'Won the hand of Princess Indumati at her Svayamvara through valor and virtue. Beloved father of Dasharatha.',
        children: ['Dasharatha']
      },
      {
        id: 'dasharatha',
        name: 'King Dasharatha',
        sanskrit: 'महाराज दशरथ',
        title: 'Ruler of the Ten Chariots',
        generation: 40,
        era: 'Treta Yuga',
        deeds: 'Master of warfare capable of steering his chariot in all ten directions simultaneously. Allied with devas against asuras. Performed the Putrakameshti Yajna under Sage Rishyashringa to beget four divine sons through queens Kausalya, Kaikeyi, and Sumitra.',
        children: ['Rama (by Kausalya)', 'Bharata (by Kaikeyi)', 'Lakshmana & Shatrughna (by Sumitra)', 'Shanta (daughter)']
      },
      {
        id: 'sri-rama',
        name: 'Bhagwan Sri Rama',
        sanskrit: 'भगवान् श्रीराम (मर्यादा पुरुषोत्तम)',
        title: 'Seventh Avatar of Lord Vishnu & Ideal King',
        generation: 41,
        era: 'Treta Yuga',
        deeds: 'Embodied perfection in every human duty: the ideal son, brother, husband, warrior, and king (Ramrajya). Vanquished the demon emperor Ravana, restored cosmic balance, and ruled Ayodhya with selfless devotion to righteousness.',
        children: ['Lava', 'Kusha']
      },
      {
        id: 'lava-kusha',
        name: 'Lava & Kusha',
        sanskrit: 'लव एवं कुश',
        title: 'Twin Princes & Sages of the Ramayana',
        generation: 42,
        era: 'End of Treta Yuga',
        deeds: 'Raised in the hermitage of Sage Valmiki. Mastered the Vedas, archery, and the singing of the Ramayana. Lava founded Lavapuri (modern Lahore) and Kusha ruled Kasur and southern Kosala.',
        children: ['Lineage continued into historical kings of Kosala']
      }
    ]
  },

  // ==========================================
  // TAB 3: CHANDRAVANSHA (THE LUNAR DYNASTY)
  // ==========================================
  chandravansha: {
    id: 'chandravansha',
    title: 'Chandravansha (The Lunar Dynasty)',
    sanskrit: 'चन्द्रवंशः (सोमवंशः)',
    subtitle: 'From Chandra, Yayati & King Bharata to Lord Krishna, the Pandavas & Kauravas',
    description: 'The Lunar Dynasty is the expansive lineage tracing from Chandra (the Moon God). It bifurcated at King Yayati into two world-shaping streams: the **Yadavas** (leading to Lord Krishna and Balarama) and the **Pauravas / Kurus** (leading to King Bharata, Shantanu, Bhishma, the Pandavas, and the Mahabharata epic).',
    tree: [
      {
        id: 'chandra-soma',
        name: 'Chandra / Soma (The Moon)',
        sanskrit: 'चन्द्र / सोम',
        title: 'Primordial Deity of the Mind and Nectar',
        generation: 1,
        branch: 'Root of Lunar Line',
        deeds: 'Born from the eyes of Maharshi Atri and Anasuya. Rules over waters, vegetation, medicinal herbs (Oshadhi), and the human mind.',
        children: ['Budha (Mercury)']
      },
      {
        id: 'budha',
        name: 'Budha (Mercury)',
        sanskrit: 'बुध',
        title: 'Deity of Intellect & Learning',
        generation: 2,
        branch: 'Root of Lunar Line',
        deeds: 'Married Ila (daughter of Vaivasvata Manu), uniting the cosmic Solar and Lunar genealogies.',
        children: ['Pururavas']
      },
      {
        id: 'pururavas',
        name: 'King Pururavas',
        sanskrit: 'राजा पुरूरवा',
        title: 'Founder of the Aila Dynasty',
        generation: 3,
        branch: 'Root of Lunar Line',
        deeds: 'Famous for his celebrated love and spiritual saga with the celestial Apsara Urvashi, recorded in the Rigveda, Shatapatha Brahmana, and Kalidasa\'s drama *Vikramorvashiyam*. Instituted the sacred three fires of Vedic yajna.',
        children: ['Ayu', 'Amavasu']
      },
      {
        id: 'nahusha',
        name: 'King Nahusha',
        sanskrit: 'राजा नहुष',
        title: 'Ruler of Heaven and Earth',
        generation: 5,
        branch: 'Root of Lunar Line',
        deeds: 'Elevated temporarily to the throne of Indra. Overcome by pride, he had the Saptarishis carry his palanquin and accidentally kicked Sage Agastya, who cursed him to fall to earth as a python until released by Yudhishthira\'s wisdom.',
        children: ['Yayati', 'Yati']
      },
      {
        id: 'yayati',
        name: 'Emperor Yayati',
        sanskrit: 'सम्राट् ययाति',
        title: 'The Great Divider of Dynasties',
        generation: 6,
        branch: 'Bifurcation Point',
        deeds: 'Married Devayani (daughter of Asura Guru Shukracharya) and Sharmishtha. Cursed with premature old age by Shukracharya, he asked his sons to exchange their youth. Only his youngest son Puru agreed. Yayati later renounced all desires and divided his vast empire among his sons, establishing the two supreme houses: Yadu (Yadavas) and Puru (Pauravas).',
        children: ['Yadu (Founder of Yadavas)', 'Turvasu', 'Druhyu', 'Anu', 'Puru (Founder of Pauravas)']
      },

      // --- YADAVA BRANCH ---
      {
        id: 'yadu',
        name: 'King Yadu',
        sanskrit: 'राजा यदु',
        title: 'Founder of the Yadava Clan',
        generation: 7,
        branch: 'Yadava Line',
        deeds: 'Eldest son of Yayati and Devayani. Given the southwest territories. His descendants produced pastoral and warrior clans including the Vrishnis, Andhakas, and Bhojas.',
        children: ['Kroshtu', 'Sahasrajit']
      },
      {
        id: 'shurasena',
        name: 'King Shurasena',
        sanskrit: 'राजा शूरसेन',
        title: 'Ruler of Mathura & Braj',
        generation: 15,
        branch: 'Yadava Line',
        deeds: 'Ruler of the Surasena kingdom at Mathura. Father of Vasudeva and Pritha (Kunti).',
        children: ['Vasudeva', 'Kunti (Pritha, mother of Pandavas)', 'Devabhaga']
      },
      {
        id: 'vasudeva',
        name: 'Vasudeva (Anakadundubhi)',
        sanskrit: 'वसुदेव',
        title: 'Noble Patriarch of the Vrishnis',
        generation: 16,
        branch: 'Yadava Line',
        deeds: 'Married Devaki (sister of Kamsa) and Rohini. Imprisoned in Mathura by tyrant Kamsa. Bore the divine incarnation Krishna, who was secretly carried across the flooded Yamuna on a rainy midnight to Gokul.',
        children: ['Balarama (by Rohini)', 'Sri Krishna (by Devaki)', 'Subhadra (by Rohini)']
      },
      {
        id: 'sri-krishna',
        name: 'Bhagwan Sri Krishna & Balarama',
        sanskrit: 'भगवान् श्रीकृष्ण एवं बलराम',
        title: 'Eighth Avatar of Vishnu & Supreme Purna Purusha',
        generation: 17,
        branch: 'Yadava Line',
        deeds: 'Vanquished Kamsa, built the coastal fortress city of Dwarka, stood as Arjuna’s divine charioteer in the Kurukshetra War, and delivered the immortal philosophy of the Bhagavad Gita.',
        children: ['Pradyumna', 'Samba', 'Charumati']
      },

      // --- PAURAVA / KURU BRANCH ---
      {
        id: 'puru',
        name: 'King Puru',
        sanskrit: 'राजा पुरु',
        title: 'Founder of the Paurava Line',
        generation: 7,
        branch: 'Paurava / Kuru Line',
        deeds: 'Youngest son of Yayati who selflessly gave his youth to his father. Inherited the prosperous central realm of the Gangetic plain.',
        children: ['Janamejaya I', 'Pravira']
      },
      {
        id: 'dushyanta-bharata',
        name: 'Emperor Bharata (Son of Dushyanta & Shakuntala)',
        sanskrit: 'चक्रवर्ती सम्राट् भरत',
        title: 'Namesake of Bharatavarsha (India)',
        generation: 14,
        branch: 'Paurava / Kuru Line',
        deeds: 'Son of King Dushyanta and Shakuntala (daughter of Sage Vishwamitra and Menaka). A celebrated Chakravarti conqueror of unmatched nobility from whom India derives its civilizational name **Bhārata (भारत)**.',
        children: ['Bhumanyu']
      },
      {
        id: 'kuru',
        name: 'King Kuru',
        sanskrit: 'राजा कुरु',
        title: 'Consecrator of Kurukshetra',
        generation: 20,
        branch: 'Paurava / Kuru Line',
        deeds: 'Plowed the fields of Kurukshetra with gold plows, dedicating the ground to eternal righteousness and penance. The entire clan thereafter was known as the Kurus (Kauravas).',
        children: ['Parikshit I', 'Jahnu', 'Sudhanvan']
      },
      {
        id: 'shantanu',
        name: 'King Shantanu',
        sanskrit: 'महाराज शान्तनु',
        title: 'Lord of Hastinapura',
        generation: 28,
        branch: 'Paurava / Kuru Line',
        deeds: 'Ruler of Hastinapura. Married Goddess Ganga (fathering Devavrata / Bhishma) and later Satyavati (fathering Chitrangada and Vichitravirya).',
        children: ['Bhishma (Devavrata)', 'Chitrangada', 'Vichitravirya']
      },
      {
        id: 'bhishma',
        name: 'Bhishma Pitamaha (Devavrata)',
        sanskrit: 'भीष्म पितामह',
        title: 'The Great Grandfather of the Kurus',
        generation: 29,
        branch: 'Paurava / Kuru Line',
        deeds: 'Took the terrifying vow of lifelong celibacy (Bhishma Pratigya) and renounced the throne so his father could marry Satyavati. Blessed with Iccha-Mrityu (death at will). Supreme warrior, statesman, and speaker of the Vishnu Sahasranama and Shanti Parva.',
        children: ['None (Lifelong Celibacy)']
      },
      {
        id: 'vyasa-heritage',
        name: 'Dhritarashtra, Pandu & Vidura',
        sanskrit: 'धृतराष्ट्र, पाण्डु एवं विदुर',
        title: 'Sons of Sage Vyasa through Niyoga',
        generation: 30,
        branch: 'Paurava / Kuru Line',
        deeds: 'Sage Veda Vyasa fathered blind Dhritarashtra (who fathered the 100 Kauravas with Gandhari), pale Pandu (who fathered the 5 Pandavas with Kunti and Madri), and the wise prime minister Vidura (incarnation of Dharma).',
        children: ['100 Kauravas (headed by Duryodhana)', '5 Pandavas (Yudhishthira, Bhima, Arjuna, Nakula, Sahadeva)']
      },
      {
        id: 'pandavas-kauravas',
        name: 'The Pandavas & The Kauravas',
        sanskrit: 'पाण्डवाः कौरवाश्च',
        title: 'Protagonists of the Mahabharata Epic',
        generation: 31,
        branch: 'Paurava / Kuru Line',
        deeds: 'The 18-day Kurukshetra War tested the bounds of cosmic dharma. Yudhishthira stood as the embodiment of truth; Arjuna, guided by Krishna, wielded Gandiva to vanquish adharma.',
        children: ['Abhimanyu (son of Arjuna & Subhadra)', 'Upapandavas', 'Ghatotkacha']
      },
      {
        id: 'abhimanyu-parikshit',
        name: 'Abhimanyu, Parikshit & Janamejaya',
        sanskrit: 'अभिमन्यु, परीक्षित् एवं जनमेजय',
        title: 'Preservers of the Royal Dynasty into Kali Yuga',
        generation: 32,
        branch: 'Paurava / Kuru Line',
        deeds: 'Abhimanyu breached the Chakravyuha with heroic valor. His son King Parikshit (rescued in the womb by Krishna) listened to the Srimad Bhagavatam from Sage Shuka before snake Takshaka bit him. Parikshit’s son Janamejaya conducted the Sarpa Satra yajna where the entire Mahabharata was first recited by Sage Vaishampayana.',
        children: ['Shatanika', 'Aswamedhadatta']
      }
    ]
  }
};

