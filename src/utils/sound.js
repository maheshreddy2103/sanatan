// Web Audio API synthesized sacred chime and bowl sound
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playTempleBell(freq = 432) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Fundamental
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Harmonic overtone
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.76, now); // Metallic bell chime overtone

    // Higher shimmer
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 5.4, now);

    // Envelope
    gain1.gain.setValueAtTime(0.35, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    gain2.gain.setValueAtTime(0.12, now);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

    gain3.gain.setValueAtTime(0.04, now);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    osc1.connect(gain1);
    osc2.connect(gain2);
    osc3.connect(gain3);

    gain1.connect(ctx.destination);
    gain2.connect(ctx.destination);
    gain3.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + 2.3);
    osc2.stop(now + 1.5);
    osc3.stop(now + 0.9);
  } catch (e) {
    console.error('Audio playback error:', e);
  }
}

export function playOmDrone() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const baseFreq = 136.1; // 136.1 Hz is the sacred Om frequency in classical Indian music

    [baseFreq, baseFreq * 1.5, baseFreq * 2].forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.15 / (idx + 1), now + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 4.6);
    });
  } catch (e) {
    console.error('Om drone audio error:', e);
  }
}

