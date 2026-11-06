// Web Audio API synthesized sacred chime, conch (shankha), temple bells, and bowl sounds
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

// Auspicious Shankha (Conch Shell) blast synthesis
export function playShankha() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 3.6;

    // Dual horn oscillator with natural vibrato
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sine';

    // Conch base frequency glides gracefully like breath pressure
    osc1.frequency.setValueAtTime(215, now);
    osc1.frequency.exponentialRampToValueAtTime(255, now + 0.6);
    osc1.frequency.linearRampToValueAtTime(248, now + 2.4);
    osc1.frequency.exponentialRampToValueAtTime(190, now + duration);

    osc2.frequency.setValueAtTime(215, now);
    osc2.frequency.exponentialRampToValueAtTime(255, now + 0.6);
    osc2.frequency.linearRampToValueAtTime(248, now + 2.4);
    osc2.frequency.exponentialRampToValueAtTime(190, now + duration);

    // Warm resonant acoustic filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(550, now);
    filter.frequency.linearRampToValueAtTime(850, now + 0.8);
    filter.frequency.linearRampToValueAtTime(450, now + duration);

    // Dynamic breath envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.5);
    gain.gain.linearRampToValueAtTime(0.24, now + 2.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
  } catch (e) {
    console.error('Shankha sound error:', e);
  }
}

// Sparkling Flower Drop Chime (Pushpanjali)
export function playFlowerChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [528, 660, 792, 1056, 1320]; // 528Hz Solfeggio / Love frequency scale

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.85);
    });
  } catch (e) {
    console.error('Flower chime error:', e);
  }
}

// Rhythmic Aarti Bell Cycle
export function startAartiRhythm() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return () => {};

    let isPlaying = true;
    let step = 0;

    const playRhythmHit = () => {
      if (!isPlaying) return;
      
      const pitch = (step % 2 === 0) ? 680 : 850;
      playTempleBell(pitch);

      step++;
      const nextDelay = (step % 4 === 0) ? 450 : 250;
      setTimeout(playRhythmHit, nextDelay);
    };

    playRhythmHit();

    return () => {
      isPlaying = false;
    };
  } catch (e) {
    console.error('Aarti rhythm error:', e);
    return () => {};
  }
}
