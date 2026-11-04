import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GlobalSearchModal from './components/GlobalSearchModal';
import SanatanMitrChatbot from './components/SanatanMitrChatbot';
import PWAInstallPrompt from './components/PWAInstallPrompt';

// Pages
import HomeView from './pages/HomeView';
import DeitiesView from './pages/DeitiesView';
import DeityDetail from './pages/DeityDetail';
import GurusView from './pages/GurusView';
import GuruDetail from './pages/GuruDetail';
import RishisView from './pages/RishisView';
import RishiDetail from './pages/RishiDetail';
import GurusAndRishisView from './pages/GurusAndRishisView';
import TextsView from './pages/TextsView';
import TextDetail from './pages/TextDetail';
import PracticesView from './pages/PracticesView';
import BeliefsView from './pages/BeliefsView';
import MantrasView from './pages/MantrasView';
import FestivalsView from './pages/FestivalsView';
import LivingDharmaView from './pages/LivingDharmaView';
import TirthaYatraView from './pages/TirthaYatraView';
import TemplesPortalView from './pages/TemplesPortalView';
import GenealogyView from './pages/GenealogyView';
import QuizView from './pages/QuizView';
import PanchangView from './pages/PanchangView';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#/');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sanatan_theme') || 'light';
  });

  // Sync theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sanatan_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Hash-based routing listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      setCurrentRoute(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (route) => {
    window.location.hash = route;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render appropriate view based on route
  const renderCurrentView = () => {
    const hash = currentRoute.replace(/^#/, '');

    // Deities detail: /deities/:id
    if (hash.startsWith('/deities/')) {
      const id = hash.replace('/deities/', '');
      return <DeityDetail id={id} onNavigate={navigateTo} />;
    }
    // Deities listing
    if (hash === '/deities' || hash === 'deities') {
      return <DeitiesView onNavigate={navigateTo} />;
    }

    // Gurus detail: /gurus/:id
    if (hash.startsWith('/gurus/')) {
      const id = hash.replace('/gurus/', '');
      return <GuruDetail id={id} onNavigate={navigateTo} />;
    }

    // Rishis detail: /rishis/:id
    if (hash.startsWith('/rishis/')) {
      const id = hash.replace('/rishis/', '');
      return <RishiDetail id={id} onNavigate={navigateTo} />;
    }

    // Gurus & Rishis unified view (supports #/sages, #/gurus, #/rishis)
    if (hash === '/sages' || hash === 'sages' || hash === '/gurus-rishis') {
      return <GurusAndRishisView initialTab="rishis" onNavigate={navigateTo} />;
    }
    if (hash === '/gurus' || hash === 'gurus') {
      return <GurusAndRishisView initialTab="gurus" onNavigate={navigateTo} />;
    }
    if (hash === '/rishis' || hash === 'rishis') {
      return <GurusAndRishisView initialTab="rishis" onNavigate={navigateTo} />;
    }

    // Texts detail: /texts/:id
    if (hash.startsWith('/texts/')) {
      const id = hash.replace('/texts/', '');
      return <TextDetail id={id} onNavigate={navigateTo} />;
    }
    // Texts listing
    if (hash === '/texts' || hash === 'texts') {
      return <TextsView onNavigate={navigateTo} />;
    }

    // Living Dharma unified view (Practices, Beliefs, Festivals)
    if (hash === '/traditions' || hash === 'traditions') {
      return <LivingDharmaView initialTab="practices" onNavigate={navigateTo} />;
    }
    if (hash === '/practices' || hash === 'practices') {
      return <LivingDharmaView initialTab="practices" onNavigate={navigateTo} />;
    }
    if (hash === '/beliefs' || hash === 'beliefs') {
      return <LivingDharmaView initialTab="beliefs" onNavigate={navigateTo} />;
    }
    if (hash === '/festivals' || hash === 'festivals') {
      return <LivingDharmaView initialTab="festivals" onNavigate={navigateTo} />;
    }

    // Vedic Panchang & Hindu Festival Live Countdown
    if (hash === '/panchang' || hash === 'panchang' || hash === '/calendar' || hash === 'calendar' || hash === '/panchanga') {
      return <PanchangView onNavigate={navigateTo} />;
    }

    // Temples of India Map Portal (6.5 Lakh+ Temples GIS)
    if (hash === '/temple-map' || hash === 'temple-map' || hash === '/temples' || hash === '/temples-portal') {
      return <TemplesPortalView onNavigate={navigateTo} />;
    }

    // Tirtha Yatra (Sacred Geography Map)
    if (hash === '/tirtha' || hash === 'tirtha') {
      return <TirthaYatraView onNavigate={navigateTo} />;
    }

    // Vamshavali (Cosmic Genealogy & Lineage Tree)
    if (hash === '/genealogy' || hash === 'genealogy') {
      return <GenealogyView onNavigate={navigateTo} />;
    }

    // Jnana Pariksha (Quiz & Flashcards)
    if (hash === '/quiz' || hash === 'quiz') {
      return <QuizView onNavigate={navigateTo} />;
    }

    // Default to Home
    return <HomeView onNavigate={navigateTo} />;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main style={{ flex: 1 }}>
        {renderCurrentView()}
      </main>

      <Footer onNavigate={navigateTo} />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigateTo}
      />

      {/* Floating Vedic AI Spiritual Guide (सनातन मित्र) */}
      <SanatanMitrChatbot onNavigate={navigateTo} />

      {/* Progressive Web App (PWA) Offline & Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
}

