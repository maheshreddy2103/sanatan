# Sanatan Dharma — Modern React Portal

A modern, high-performance, and responsive React web application dedicated to the eternal wisdom, sacred texts, divine deities, revered spiritual masters, and ancient rishis of **Sanatan Dharma**.

Originally structured as static HTML files, the entire project has been transformed into a full-fledged **React 18 + Vite** application with zero loss of existing content, enhanced typography, interactive chanting tools, and instant global search.

---

## 🌟 Key Features

### 1. Complete Preservation of All Original Content
- **34+ Devi & Devatas**: Detailed lore, iconography, vahanas, cosmological roles, and divine incarnations.
  - Supports both **Rich Visual Card Grid** and **Classical Table View** (matching the original `Devi and Devatas.html` structure).
- **15 Revered Gurus**: Biographies, philosophical traditions (Advaita, Vishishtadvaita, Dvaita, Integral Yoga, etc.), major commentaries on Upanishads and the Gita, and ashrams.
- **48 Ancient Vedic Rishis**: Sages and seers with their divine quotes, lineage, contributions to Vedic literature, legends, and philosophical teachings. Includes an **A–Z Alphabet Index**.
- **7 Sacred Text Compendiums**:
  - The Vedas (Rig, Sama, Yajur, Atharva) & their fourfold divisions
  - The Six Vedangas
  - The 108 Upanishads
  - The Ramayana (Valmiki)
  - The Mahabharata (Vyasa)
  - The 18 Mahapuranas
  - The Bhagavad Gita (18 Chapters and 3 Yogas)
- **10 Core Practices**: 16 Samskaras, Puja & Aarti, Yoga, Scriptural Study, Dana, Tirtha Yatra, and Daily Sadhana.
- **10 Foundational Beliefs**: Dharma, Karma, Samsara, Moksha, Brahman, Atman, Ahimsa, Reverence for Nature, etc.
- **9 Major Festivals**: Diwali, Holi, Navaratri, Maha Shivaratri, Janmashtami, Rama Navami, Ganesh Chaturthi, Makar Sankranti, Kumbh Mela.

---

### 2. Interactive Spiritual Tools & Flagship Features
- **Interactive Sacred Geography Map (Tirtha Yatra)**:
  - Interactive Leaflet map pinning the **12 Jyotirlingas**, **Char Dham**, **51 Shakti Peethas**, **Pancha Bhoota Sthalas**, and celebrated **Divya Desams**.
  - Interactive details drawer with Sanskrit names, founding history, sacred legends, architecture, best time to visit, and direct Google Maps navigation.
- **Cosmic Genealogy & Lineage Tree (Vamshavali)**:
  - Visual hierarchical tree tracing **Cosmic Genesis & Saptarishis**, the **Suryavansha** (Solar Dynasty from Vivasvan and Ikshvaku to Bhagwan Rama, Lava, and Kusha), and the **Chandravansha** (Lunar Dynasty from Chandra to King Bharata, Yayati, the Yadavas / Sri Krishna, and the Pandavas & Kauravas).
  - Search any figure to trace their ancestry and inspect their Puranic deeds.
- **Sanatan Dharma Knowledge Quiz & Flashcards (Jnana Pariksha)**:
  - Multi-choice quiz challenges across 3 difficulty tiers: **Beginner (*Prathama*)**, **Intermediate (*Madhyama*)**, and **Scholar (*Acharya / Vidvan*)**.
  - Immediate audio feedback, scriptural explanations, and scoring.
  - **Honorary Sanskrit Certificate Generator** with customizable candidate name, spiritual titles (e.g., *Vedic Acharya*, *Dharmic Vidvan*), and print-ready layout.
  - 3D interactive **Wisdom Flashcards Deck** for memorizing Sanskrit terms, deity vahanas, and Rishi contributions.
- **Digital Japa Mala Chanting Studio**:
  - 108-bead interactive chanting counter with round tracking.
  - Authentic Web Audio API synthesized **Temple Bell Chime** (tuned to 432 Hz).
  - Ambient **136.1 Hz Sacred Om Drone** meditation audio.
- **Daily Vedic Wisdom**:
  - Rotating sacred shlokas from the Bhagavad Gita and Upanishads in Sanskrit, IAST Roman transliteration, and English translation with instant refresh.
- **Global Instant Search (`Cmd/Ctrl + K`)**:
  - Real-time search across all 150+ deities, gurus, rishis, scriptures, mantras, tirthas, lineages, and practices with category filtering pills.
- **Dual Theme Engine**:
  - **Vedic Light Mode**: Sandalwood parchment with gold, saffron, and crimson accents.
  - **Temple Dark Mode**: Deep meditative twilight with luminous gold highlights.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer recommended, verified on v24.20.0)
- npm (verified on 11.19.0)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized production bundle inside the `dist/` directory.

### 4. Preview the Production Build
```bash
npm run preview
```

---

## 📁 Project Architecture

```
sanatan/
├── dist/                      # Production build output
├── public/                    # Static images (all 47 portraits & banners)
│   ├── Devi and Devatas/      # Deity images
│   ├── gurus/                 # Guru images
│   ├── Rishis/                # Rishi images
│   └── Sanatan.jpg            # Hero banner image
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Navbar.jsx         # Sticky header with audio, search & theme toggle
│   │   ├── Footer.jsx         # Footer with shlokas & contact details
│   │   ├── GlobalSearchModal.jsx # Command palette instant search
│   │   ├── DailyWisdom.jsx    # Rotating Gita / Upanishad verses
│   │   └── JapaCounter.jsx    # 108 bead Mala counter with audio bell
│   ├── data/                  # Extracted and enriched JS data modules
│   │   ├── deitiesData.js     # 34 deities
│   │   ├── gurusData.js       # 15 gurus
│   │   ├── rishisData.js      # 48 rishis
│   │   ├── textsData.js       # 7 sacred scriptures
│   │   ├── practicesData.js   # 10 practices
│   │   ├── beliefsData.js     # 10 core beliefs
│   │   ├── mantrasData.js     # Sacred mantras collection
│   │   ├── festivalsData.js   # 9 festivals
│   │   └── searchData.js      # Search index
│   ├── pages/                 # Views & detail pages
│   │   ├── HomeView.jsx       # Landing page
│   │   ├── DeitiesView.jsx    # Deities grid & classical table
│   │   ├── DeityDetail.jsx    # Individual deity page
│   │   ├── GurusView.jsx      # Gurus directory
│   │   ├── GuruDetail.jsx     # Individual guru page
│   │   ├── RishisView.jsx     # Rishis A-Z directory
│   │   ├── RishiDetail.jsx    # Individual rishi page
│   │   ├── TextsView.jsx      # Sacred texts overview
│   │   ├── TextDetail.jsx     # Individual scripture breakdown
│   │   ├── PracticesView.jsx  # Daily rituals & living
│   │   ├── BeliefsView.jsx    # 10 foundational tenets
│   │   ├── MantrasView.jsx    # Mantras studio & Japa counter
│   │   └── FestivalsView.jsx  # Hindu festivals
│   ├── utils/
│   │   └── sound.js           # Web Audio API singing bowl & Om drone
│   ├── App.jsx                # Client-side hash router & state
│   ├── index.css              # Vedic theme design system
│   └── main.jsx               # React DOM entry point
├── legacy_html_backup/        # Safe archive of original HTML files
├── package.json
├── vite.config.js
└── index.html
```

---

## 🕉️ Preserved Contact Details
- **Email:** pallemaheshreddy@gmail.com
- **Phone:** +91 7672023472
- **Address:** 123 Dharma Street, City, India

