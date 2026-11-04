import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Volume2, 
  BookOpen, 
  Sparkles, 
  Users, 
  Flame, 
  Compass, 
  ChevronDown,
  MapPin,
  GitFork,
  Award,
  Layers,
  Landmark,
  Calendar,
  Download
} from 'lucide-react';
import { playOmDrone } from '../utils/sound';

export default function Navbar({ currentRoute, onNavigate, theme, onToggleTheme, onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [navDeferredPrompt, setNavDeferredPrompt] = useState(null);
  const dropdownRef = useRef(null);

  // Check PWA install capability
  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (isStandalone) return;

    const handlePrompt = (e) => {
      e.preventDefault();
      setNavDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handlePrompt);
    window.addEventListener('appinstalled', () => setCanInstall(false));

    return () => {
      window.removeEventListener('beforeinstallprompt', handlePrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (navDeferredPrompt) {
      navDeferredPrompt.prompt();
      const choice = await navDeferredPrompt.userChoice;
      if (choice.outcome === 'accepted') setCanInstall(false);
      setNavDeferredPrompt(null);
    } else {
      alert('To install Sanatan: Tap your browser menu (⋮) and select "Install app" or "Add to Home screen".');
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { label: 'Home', route: '#/', icon: Compass },
    { label: 'Devi & Devatas', route: '#/deities', icon: Sparkles },
    { label: 'Gurus & Rishis', route: '#/sages', icon: Users, matches: ['#/sages', '#/gurus', '#/rishis'] },
    { label: 'Sacred Texts', route: '#/texts', icon: BookOpen },
    { 
      label: 'Interactive Tools', 
      isDropdown: true,
      icon: Layers,
      matches: ['#/panchang', '#/temple-map', '#/tirtha', '#/genealogy', '#/quiz'],
      items: [
        { label: 'Vedic Panchang & Festivals', route: '#/panchang', icon: Calendar, desc: 'Daily Tithi, Nakshatra, Muhurtas & Festival Countdowns' },
        { label: 'Temples of India (6.5L+)', route: '#/temple-map', icon: Landmark, desc: '6.48 Lakh+ temples across 36 States/UTs' },
        { label: 'Tirtha Yatra (Sacred Map)', route: '#/tirtha', icon: MapPin, desc: '12 Jyotirlingas, Char Dham & Shakti Peethas' },
        { label: 'Vamshavali (Lineage Tree)', route: '#/genealogy', icon: GitFork, desc: 'Surya & Chandra Dynasties of Rama & Krishna' },
        { label: 'Jnana Quiz & Flashcards', route: '#/quiz', icon: Award, desc: '3 Difficulty Tiers & Sanskrit Certificates' }
      ]
    },
    { label: 'Living Dharma', route: '#/traditions', icon: Flame, matches: ['#/traditions', '#/practices', '#/beliefs', '#/festivals'] },
    { label: 'Mantras', route: '#/mantras', icon: Volume2 }
  ];

  const handleNavClick = (route) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  };

  const isCurrent = (item) => {
    if (item.matches) {
      return item.matches.some(m => currentRoute.startsWith(m));
    }
    if (item.route === '#/' && (currentRoute === '#/' || currentRoute === '' || currentRoute === '#home')) return true;
    return currentRoute.startsWith(item.route);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-light)',
      backdropFilter: 'blur(10px)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '74px',
        gap: '16px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('#/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            userSelect: 'none',
            flexShrink: 0
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #d9531e 0%, #c69214 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: 'var(--font-sanskrit)',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(217, 83, 30, 0.35)',
            border: '2px solid rgba(255, 255, 255, 0.4)'
          }}>
            ॐ
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              background: 'linear-gradient(90deg, var(--accent-saffron), var(--accent-gold))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              SANATAN
            </div>
            <div style={{
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              fontWeight: 600
            }}>
              Dharma & Tradition
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links (Now a clean 7 items max!) */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '6px'
        }} className="desktop-nav">
          {navItems.map((item) => {
            const active = isCurrent(item);

            if (item.isDropdown) {
              return (
                <div 
                  key={item.label}
                  ref={dropdownRef}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setToolsDropdownOpen(true)}
                  onMouseLeave={() => setToolsDropdownOpen(false)}
                >
                  <button
                    onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                    style={{
                      background: active ? 'var(--bg-surface)' : 'transparent',
                      color: active ? 'var(--accent-saffron)' : 'var(--text-secondary)',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.88rem',
                      fontWeight: active ? 700 : 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease',
                      borderBottom: active ? '2px solid var(--accent-saffron)' : '2px solid transparent'
                    }}
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={14} style={{
                      transform: toolsDropdownOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease'
                    }} />
                  </button>

                  {/* Dropdown Menu */}
                  {toolsDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'var(--bg-card)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-lg)',
                      border: '1px solid var(--border-strong)',
                      padding: '8px',
                      minWidth: '290px',
                      zIndex: 1100,
                      animation: 'fadeIn 0.2s ease-out',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      {item.items.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = currentRoute.startsWith(subItem.route);
                        return (
                          <div
                            key={subItem.route}
                            onClick={() => handleNavClick(subItem.route)}
                            style={{
                              padding: '10px 14px',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: isSubActive ? 'var(--bg-surface)' : 'transparent',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '12px',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-surface)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = isSubActive ? 'var(--bg-surface)' : 'transparent'; }}
                          >
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '6px',
                              backgroundColor: 'var(--bg-secondary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              <SubIcon size={16} color="var(--accent-saffron)" />
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                                {subItem.label}
                              </div>
                              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                                {subItem.desc}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                style={{
                  background: active ? 'var(--bg-surface)' : 'transparent',
                  color: active ? 'var(--accent-saffron)' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem',
                  fontWeight: active ? 700 : 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  borderBottom: active ? '2px solid var(--accent-saffron)' : '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--accent-saffron)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="btn btn-outline"
            style={{
              padding: '8px 14px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              borderRadius: 'var(--radius-full)'
            }}
            title="Search entire site (Ctrl+K)"
          >
            <Search size={16} />
            <span style={{ display: 'none' }} className="search-label">Search</span>
            <kbd style={{
              fontSize: '0.7rem',
              background: 'var(--bg-surface)',
              padding: '2px 6px',
              borderRadius: '4px',
              border: '1px solid var(--border-light)',
              color: 'var(--text-muted)'
            }}>⌘K</kbd>
          </button>

          {/* Om Meditation Bell */}
          <button
            onClick={playOmDrone}
            className="btn btn-outline"
            style={{
              width: '38px',
              height: '38px',
              padding: 0,
              borderRadius: '50%',
              color: 'var(--accent-gold)'
            }}
            title="Chant Sacred Om"
          >
            <Volume2 size={18} />
          </button>

          {/* PWA Install Button */}
          {canInstall && (
            <button
              onClick={handleInstallClick}
              className="btn btn-outline"
              style={{
                padding: '6px 12px',
                fontSize: '0.82rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: 'var(--radius-full)',
                color: 'var(--accent-saffron)',
                borderColor: 'var(--accent-saffron)',
                backgroundColor: 'rgba(217, 83, 30, 0.08)'
              }}
              title="Install Sanatan as Native App"
            >
              <Download size={15} />
              <span className="install-label" style={{ display: 'none' }}>Install App</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="btn btn-outline"
            style={{
              width: '38px',
              height: '38px',
              padding: 0,
              borderRadius: '50%'
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={18} color="#e5b32e" /> : <Moon size={18} />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-outline mobile-menu-btn"
            style={{
              width: '38px',
              height: '38px',
              padding: 0,
              display: 'none'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-strong)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          {navItems.map((item) => {
            if (item.isDropdown) {
              return (
                <div key={item.label} style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, padding: '4px 12px' }}>
                    {item.label}
                  </div>
                  {item.items.map(sub => {
                    const SubIcon = sub.icon;
                    const isSubActive = currentRoute.startsWith(sub.route);
                    return (
                      <button
                        key={sub.route}
                        onClick={() => handleNavClick(sub.route)}
                        style={{
                          width: '100%',
                          background: isSubActive ? 'var(--bg-surface)' : 'transparent',
                          color: isSubActive ? 'var(--accent-saffron)' : 'var(--text-primary)',
                          border: 'none',
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.92rem',
                          fontWeight: isSubActive ? 700 : 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          textAlign: 'left',
                          cursor: 'pointer'
                        }}
                      >
                        <SubIcon size={16} color="var(--accent-gold)" />
                        {sub.label}
                      </button>
                    );
                  })}
                </div>
              );
            }

            const Icon = item.icon;
            const active = isCurrent(item);
            return (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                style={{
                  background: active ? 'var(--bg-surface)' : 'transparent',
                  color: active ? 'var(--accent-saffron)' : 'var(--text-primary)',
                  border: 'none',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.98rem',
                  fontWeight: active ? 700 : 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <Icon size={18} color="var(--accent-gold)" />
                {item.label}
              </button>
            );
          })}

          {canInstall && (
            <button
              onClick={handleInstallClick}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #d9531e 0%, #c69214 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.95rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                marginTop: '10px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Download size={18} />
              <span>Install Sanatan App</span>
            </button>
          )}
        </div>
      )}

      {/* Desktop Responsive CSS */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          .search-label { display: inline !important; }
          .install-label { display: inline !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 991px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
