/**
 * Royal Indian Wedding Audio Synthesizer & Player
 * Delivers the auspicious "Din Shagna Da" Shehnai & Flute wedding soundtrack
 * with dual playback:
 * 1. Custom uploaded MP3/Audio file (persisted in localStorage)
 * 2. High-fidelity Web Audio synthesis of "Din Shagna Da" (Shehnai, Bansuri flute, Sitar, Tanpura drone)
 */

const AUDIO_STORAGE_KEY = 'durgesh_wedding_custom_audio_v1';

class WeddingAudioManager {
  private audioCtx: AudioContext | null = null;
  private isPlayingState: boolean = false;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private melodyTimeout: number | null = null;
  private volume: number = 0.65;

  // Custom Audio element for uploaded user audio
  private customAudioEl: HTMLAudioElement | null = null;
  private customAudioUrl: string | null = null;

  constructor() {
    try {
      const saved = localStorage.getItem(AUDIO_STORAGE_KEY);
      if (saved) {
        this.customAudioUrl = saved;
      }
    } catch {
      // storage fallback
    }
  }

  private initContext() {
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Play auspicious temple bell chime upon opening envelope
  public playCeremonialChime() {
    try {
      this.initContext();
      if (!this.audioCtx || !this.masterGain) return;

      const now = this.audioCtx.currentTime;
      const frequencies = [880, 1320, 1760, 2640];
      frequencies.forEach((freq, idx) => {
        if (!this.audioCtx || !this.masterGain) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const initialGain = 0.15 / (idx + 1);
        gain.gain.setValueAtTime(initialGain, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 3.0);
      });
    } catch (e) {
      console.warn('Audio chime notice:', e);
    }
  }

  // Flute / Shehnai Note with smooth breath attack, vibrato, and meend
  private playShehnaiFluteNote(freq: number, duration: number, delay: number, instrument: 'flute' | 'shehnai' = 'shehnai') {
    if (!this.audioCtx || !this.masterGain || !this.isPlayingState) return;

    const startTime = this.audioCtx.currentTime + delay;
    const osc = this.audioCtx.createOscillator();
    const oscHarmonic = this.audioCtx.createOscillator();
    const noteGain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    if (instrument === 'flute') {
      osc.type = 'sine';
      oscHarmonic.type = 'triangle';
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 3.5, startTime);
    } else {
      // Shehnai: rich reedy harmonics
      osc.type = 'sawtooth';
      oscHarmonic.type = 'sine';
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 2.2, startTime);
      filter.Q.setValueAtTime(3.0, startTime);
    }

    osc.frequency.setValueAtTime(freq, startTime);
    oscHarmonic.frequency.setValueAtTime(freq * 2, startTime);

    // Expressive Gamak/Meend vibrato
    const vibrato = this.audioCtx.createOscillator();
    const vibratoGain = this.audioCtx.createGain();
    vibrato.frequency.setValueAtTime(5.8, startTime);
    vibratoGain.gain.setValueAtTime(freq * 0.018, startTime);
    vibrato.connect(osc.frequency);
    vibrato.start(startTime);
    vibrato.stop(startTime + duration);

    // Envelope
    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(0.14 * this.volume, startTime + 0.14);
    noteGain.gain.setValueAtTime(0.12 * this.volume, startTime + duration - 0.15);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    oscHarmonic.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(startTime);
    oscHarmonic.start(startTime);
    osc.stop(startTime + duration);
    oscHarmonic.stop(startTime + duration);
  }

  // Sitar/Harp gentle pluck for acoustic backdrop
  private playPluck(freq: number, delay: number) {
    if (!this.audioCtx || !this.masterGain || !this.isPlayingState) return;

    const startTime = this.audioCtx.currentTime + delay;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.06 * this.volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + 1.3);
  }

  public setCustomAudio(urlOrDataUrl: string) {
    this.customAudioUrl = urlOrDataUrl;
    try {
      localStorage.setItem(AUDIO_STORAGE_KEY, urlOrDataUrl);
    } catch {
      // storage
    }
    if (this.isPlayingState) {
      this.stopMusic();
      this.startMusic();
    }
  }

  public getCustomAudio(): string | null {
    return this.customAudioUrl;
  }

  public resetCustomAudio() {
    this.customAudioUrl = null;
    try {
      localStorage.removeItem(AUDIO_STORAGE_KEY);
    } catch {
      // storage
    }
    if (this.isPlayingState) {
      this.stopMusic();
      this.startMusic();
    }
  }

  public startMusic(): boolean {
    if (this.isPlayingState) return true;
    this.isPlayingState = true;

    // 1. If custom audio track exists, play via HTMLAudioElement
    if (this.customAudioUrl) {
      try {
        if (!this.customAudioEl) {
          this.customAudioEl = new Audio(this.customAudioUrl);
          this.customAudioEl.loop = true;
        } else {
          this.customAudioEl.src = this.customAudioUrl;
        }
        this.customAudioEl.volume = this.volume;
        this.customAudioEl.play().catch((err) => {
          console.warn('Custom audio playback notice:', err);
          this.playSynthesizedDinShagnaDa();
        });
        return true;
      } catch (e) {
        console.warn('Fallback to synthesized music:', e);
      }
    }

    // 2. Play synthesized "Din Shagna Da" Auspicious Wedding Shehnai & Flute
    return this.playSynthesizedDinShagnaDa();
  }

  private playSynthesizedDinShagnaDa(): boolean {
    try {
      this.initContext();
      if (!this.audioCtx || !this.masterGain) return false;

      const now = this.audioCtx.currentTime;

      // Tanpura Drone in Key of E (E3 = 164.81Hz, B3 = 246.94Hz)
      const droneGain = this.audioCtx.createGain();
      droneGain.gain.setValueAtTime(0.07 * this.volume, now);
      droneGain.connect(this.masterGain);

      this.droneOsc1 = this.audioCtx.createOscillator();
      this.droneOsc1.type = 'triangle';
      this.droneOsc1.frequency.setValueAtTime(164.81, now);
      this.droneOsc1.connect(droneGain);
      this.droneOsc1.start(now);

      this.droneOsc2 = this.audioCtx.createOscillator();
      this.droneOsc2.type = 'sine';
      this.droneOsc2.frequency.setValueAtTime(246.94, now);
      this.droneOsc2.connect(droneGain);
      this.droneOsc2.start(now);

      // "Din Shagna Da" Melody Notes in Key of E:
      // E4=329.63, F#4=369.99, G#4=415.30, A4=440.00, B4=493.88, C#5=554.37, D#5=622.25, E5=659.25
      const E4 = 329.63;
      const Fs4 = 369.99;
      const Gs4 = 415.30;
      const A4 = 440.00;
      const B4 = 493.88;
      const Cs5 = 554.37;
      const Ds5 = 622.25;
      const E5 = 659.25;

      const loopSequence = () => {
        if (!this.isPlayingState) return;

        // Intro Plucks (Sitar/Harp)
        this.playPluck(E4, 0.2);
        this.playPluck(Gs4, 0.6);
        this.playPluck(B4, 1.0);
        this.playPluck(E5, 1.4);

        // Phrase 1: "Din shagna da chadheya..." (Soft Bansuri Flute)
        let t = 2.0;
        this.playShehnaiFluteNote(E4, 1.0, t, 'flute'); t += 1.0;
        this.playShehnaiFluteNote(Gs4, 0.8, t, 'flute'); t += 0.8;
        this.playShehnaiFluteNote(A4, 0.6, t, 'flute'); t += 0.6;
        this.playShehnaiFluteNote(Gs4, 1.2, t, 'flute'); t += 1.2;
        this.playShehnaiFluteNote(Fs4, 0.8, t, 'flute'); t += 0.8;
        this.playShehnaiFluteNote(E4, 1.8, t, 'flute'); t += 1.8;

        // Phrase 2: "Aao sakhiyo ni vehre sajeya..."
        this.playShehnaiFluteNote(Gs4, 0.7, t, 'flute'); t += 0.7;
        this.playShehnaiFluteNote(B4, 0.9, t, 'flute'); t += 0.9;
        this.playShehnaiFluteNote(Cs5, 1.2, t, 'flute'); t += 1.2;
        this.playShehnaiFluteNote(B4, 0.8, t, 'flute'); t += 0.8;
        this.playShehnaiFluteNote(A4, 0.8, t, 'flute'); t += 0.8;
        this.playShehnaiFluteNote(Gs4, 1.2, t, 'flute'); t += 1.2;
        this.playShehnaiFluteNote(Fs4, 1.0, t, 'flute'); t += 1.0;
        this.playShehnaiFluteNote(E4, 2.2, t, 'flute'); t += 2.2;

        // Phrase 3: "Mera sajna mileya..." (Glorious Shehnai Swell)
        this.playShehnaiFluteNote(Gs4, 0.8, t, 'shehnai'); t += 0.8;
        this.playShehnaiFluteNote(B4, 0.8, t, 'shehnai'); t += 0.8;
        this.playShehnaiFluteNote(Cs5, 1.0, t, 'shehnai'); t += 1.0;
        this.playShehnaiFluteNote(Ds5, 1.0, t, 'shehnai'); t += 1.0;
        this.playShehnaiFluteNote(E5, 2.0, t, 'shehnai'); t += 2.0;
        this.playShehnaiFluteNote(Ds5, 0.8, t, 'shehnai'); t += 0.8;
        this.playShehnaiFluteNote(Cs5, 1.0, t, 'shehnai'); t += 1.0;
        this.playShehnaiFluteNote(B4, 1.8, t, 'shehnai'); t += 1.8;

        // Phrase 4: "Sajna mileya... shagna da geet..."
        this.playShehnaiFluteNote(Cs5, 0.8, t, 'shehnai'); t += 0.8;
        this.playShehnaiFluteNote(B4, 0.8, t, 'shehnai'); t += 0.8;
        this.playShehnaiFluteNote(A4, 0.8, t, 'shehnai'); t += 0.8;
        this.playShehnaiFluteNote(Gs4, 1.2, t, 'shehnai'); t += 1.2;
        this.playShehnaiFluteNote(Fs4, 1.2, t, 'shehnai'); t += 1.2;
        this.playShehnaiFluteNote(E4, 2.8, t, 'shehnai'); t += 2.8;

        // Schedule next loop iteration (~28 seconds per cycle)
        if (this.isPlayingState) {
          this.melodyTimeout = window.setTimeout(loopSequence, (t + 0.5) * 1000);
        }
      };

      loopSequence();
      return true;
    } catch (e) {
      console.warn('Synthesized music notice:', e);
      return false;
    }
  }

  public stopMusic() {
    this.isPlayingState = false;

    if (this.customAudioEl) {
      try {
        this.customAudioEl.pause();
        this.customAudioEl.currentTime = 0;
      } catch {
        // ignore
      }
    }

    if (this.melodyTimeout) {
      clearTimeout(this.melodyTimeout);
      this.melodyTimeout = null;
    }

    if (this.droneOsc1) {
      try {
        this.droneOsc1.stop();
        this.droneOsc1.disconnect();
      } catch {
        // ignore
      }
      this.droneOsc1 = null;
    }

    if (this.droneOsc2) {
      try {
        this.droneOsc2.stop();
        this.droneOsc2.disconnect();
      } catch {
        // ignore
      }
      this.droneOsc2 = null;
    }
  }

  public toggleMusic(): boolean {
    if (this.isPlayingState) {
      this.stopMusic();
      return false;
    } else {
      return this.startMusic();
    }
  }

  public isPlaying(): boolean {
    return this.isPlayingState;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.customAudioEl) {
      this.customAudioEl.volume = this.volume;
    }
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }
}

export const weddingAudio = new WeddingAudioManager();
