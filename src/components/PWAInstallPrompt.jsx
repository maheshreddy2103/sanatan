import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Share, PlusSquare, X, Check, Sparkles } from 'lucide-react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    return typeof sessionStorage !== 'undefined' && sessionStorage.getItem('sanatan_pwa_dismissed') === 'true';
  });
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Check if already running in standalone mode (installed app)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         window.navigator.standalone === true;
    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // 2. Check if iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // 3. Listen for Android / Chrome / Edge beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show prompt banner after brief delay
      if (!isDismissed) {
        setTimeout(() => setIsVisible(true), 3500);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 4. Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // If on iOS and not dismissed, show prompt after delay
    if (isIosDevice && !isDismissed && !isStandalone) {
      setTimeout(() => setIsVisible(true), 5000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isDismissed]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // Fallback: show instructions or prompt
      alert('To install Sanatan: Tap your browser menu (⋮) and select "Install app" or "Add to Home screen".');
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('sanatan_pwa_dismissed', 'true');
    }
  };

  if (isInstalled) {
    return null;
  }

  return (
    <>
      {/* Floating Bottom-Left Install Card */}
      {isVisible && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 9990,
          maxWidth: '380px',
          width: 'calc(100vw - 48px)',
          backgroundColor: 'var(--bg-card)',
          color: 'var(--text-primary)',
          borderRadius: '16px',
          border: '1px solid var(--border-strong)',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.35)',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          animation: 'fadeInUp 0.3s ease-out',
          backdropFilter: 'blur(8px)',
          fontFamily: 'var(--font-body)'
        }}>
          {/* App Icon */}
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #801818 0%, #2b1d15 100%)',
            border: '1.5px solid var(--accent-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            flexShrink: 0,
            boxShadow: 'var(--shadow-sm)'
          }}>
            🕉️
          </div>

          {/* Text Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h4 style={{
                margin: 0,
                fontSize: '13.5px',
                fontWeight: '700',
                fontFamily: 'var(--font-heading)',
                color: 'var(--text-primary)'
              }}>
                Install Sanatan App
              </h4>
              <span style={{
                fontSize: '9px',
                fontWeight: '700',
                padding: '1px 5px',
                borderRadius: '4px',
                backgroundColor: 'rgba(217, 83, 30, 0.15)',
                color: 'var(--accent-saffron)',
                border: '1px solid rgba(217, 83, 30, 0.3)'
              }}>
                Offline
              </span>
            </div>
            <p style={{
              margin: '2px 0 0 0',
              fontSize: '11px',
              color: 'var(--text-muted)',
              lineHeight: '1.4'
            }}>
              Instant offline access to Panchang, Mantras, and Vedic AI from your home screen.
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={handleInstallClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '7px 13px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #d9531e 0%, #c69214 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: '600',
                fontSize: '11.5px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                whiteSpace: 'nowrap'
              }}
            >
              <Download style={{ width: '13px', height: '13px' }} />
              <span>Install</span>
            </button>

            <button
              onClick={handleDismiss}
              title="Dismiss"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%'
              }}
            >
              <X style={{ width: '15px', height: '15px' }} />
            </button>
          </div>
        </div>
      )}

      {/* iOS "Add to Home Screen" Instruction Modal */}
      {showIOSModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10001,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            maxWidth: '380px',
            width: '100%',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            borderRadius: '20px',
            border: '1px solid var(--border-strong)',
            padding: '24px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            fontFamily: 'var(--font-body)',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowIOSModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #801818 0%, #2b1d15 100%)',
                border: '1px solid var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px'
              }}>
                🕉️
              </div>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: '700',
                  color: 'var(--text-primary)'
                }}>
                  Install on iPhone / iPad
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Safari Browser Guide
                </span>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '12.5px', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
              Follow these simple steps in Safari to add the Sanatan App to your home screen:
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              backgroundColor: 'var(--bg-secondary)',
              padding: '14px',
              borderRadius: '12px',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12.5px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-saffron)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  flexShrink: 0
                }}>
                  1
                </div>
                <span>
                  Tap the <strong>Share</strong> button <Share style={{ width: '13px', height: '13px', display: 'inline', verticalAlign: 'middle', margin: '0 2px' }} /> at the bottom of Safari.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12.5px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-saffron)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  flexShrink: 0
                }}>
                  2
                </div>
                <span>
                  Scroll down and tap <strong>"Add to Home Screen"</strong> <PlusSquare style={{ width: '13px', height: '13px', display: 'inline', verticalAlign: 'middle', margin: '0 2px' }} />.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12.5px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-saffron)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  flexShrink: 0
                }}>
                  3
                </div>
                <span>
                  Tap <strong>"Add"</strong> in the top-right corner.
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #d9531e 0%, #c69214 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Got it, Pranam!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
