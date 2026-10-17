/**
 * Royal Indian Wedding Audio Synthesizer
 * Generates auspicious Shehnai, Bansuri flute melody, and Tanpura drone harmonies
 * using the Web Audio API for 100% reliable, zero-latency playback across all browsers.
 */

class WeddingAudioManager {
  private audioCtx: AudioContext | null = null;
  private isPlayingState: boolean = false;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private melodyInterval: number | null = null;
  private volume: number = 0.55;

  private initContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
      // High bell fundamental and harmonics
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

  // Auspicious Raga wedding melody sequence (Bhairavi / Yaman auspicious wedding notes: D, E, F#, G, A, B, C#)
  private playWeddingRagaNote(freq: number, duration: number, delay: number) {
    if (!this.audioCtx || !this.masterGain || !this.isPlayingState) return;

    const startTime = this.audioCtx.currentTime + delay;
    const osc = this.audioCtx.createOscillator();
    const oscHarmonic = this.audioCtx.createOscillator();
    const noteGain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    // Warm shehnai/bansuri timbre with harmonics & subtle vibrato
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, startTime);

    // Subtle pitch vibrato (meend / gamak characteristic of shehnai)
    const vibrato = this.audioCtx.createOscillator();
    const vibratoGain = this.audioCtx.createGain();
    vibrato.frequency.setValueAtTime(5.5, startTime); // 5.5 Hz vibrato
    vibratoGain.gain.setValueAtTime(freq * 0.015, startTime); // slight bend
    vibrato.connect(osc.frequency);
    vibrato.start(startTime);
    vibrato.stop(startTime + duration);

    oscHarmonic.type = 'sine';
    oscHarmonic.frequency.setValueAtTime(freq * 2, startTime);

    // Bandpass filter to shape the warm reedy shehnai tone
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 2.2, startTime);
    filter.Q.setValueAtTime(2.5, startTime);

    // Attack, Decay, Sustain, Release (soft breath entrance like shehnai)
    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(0.12 * this.volume, startTime + 0.12);
    noteGain.gain.setValueAtTime(0.1 * this.volume, startTime + duration - 0.2);
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

  public startMusic(): boolean {
    try {
      this.initContext();
      if (!this.audioCtx || !this.masterGain) return false;

      if (this.isPlayingState) return true;
      this.isPlayingState = true;

      const now = this.audioCtx.currentTime;

      // 1. Tanpura Drone (Sa - Pa - Sa' fundamental harmony: D3 = 146.83Hz, A3 = 220Hz)
      const droneGain = this.audioCtx.createGain();
      droneGain.gain.setValueAtTime(0.06 * this.volume, now);
      droneGain.connect(this.masterGain);

      this.droneOsc1 = this.audioCtx.createOscillator();
      this.droneOsc1.type = 'triangle';
      this.droneOsc1.frequency.setValueAtTime(146.83, now); // D3 (Sa)
      this.droneOsc1.connect(droneGain);
      this.droneOsc1.start(now);

      this.droneOsc2 = this.audioCtx.createOscillator();
      this.droneOsc2.type = 'sine';
      this.droneOsc2.frequency.setValueAtTime(220.0, now); // A3 (Pa)
      this.droneOsc2.connect(droneGain);
      this.droneOsc2.start(now);

      // 2. Auspicious melodic phrases (Raga Yaman / auspicious wedding motif)
      // Notes: D4 (293.66), E4 (329.63), F#4 (369.99), G4 (392.00), A4 (440.00), B4 (493.88), C#5 (554.37), D5 (587.33)
      const melodySequence = [
        { freq: 293.66, dur: 1.2 }, // D4 (Sa)
        { freq: 369.99, dur: 0.9 }, // F#4 (Ga)
        { freq: 440.00, dur: 1.5 }, // A4 (Pa)
        { freq: 493.88, dur: 0.8 }, // B4 (Dha)
        { freq: 440.00, dur: 1.2 }, // A4 (Pa)
        { freq: 392.00, dur: 0.7 }, // G4 (Ma)
        { freq: 369.99, dur: 1.4 }, // F#4 (Ga)
        { freq: 329.63, dur: 0.9 }, // E4 (Re)
        { freq: 293.66, dur: 2.2 }, // D4 (Sa)
        // Upper flourish
        { freq: 369.99, dur: 0.8 }, // F#4
        { freq: 440.00, dur: 0.8 }, // A4
        { freq: 554.37, dur: 1.2 }, // C#5 (Ni)
        { freq: 587.33, dur: 2.0 }, // D5 (Sa')
        { freq: 554.37, dur: 0.8 }, // C#5
        { freq: 493.88, dur: 0.8 }, // B4
        { freq: 440.00, dur: 1.8 }, // A4
        { freq: 369.99, dur: 1.0 }, // F#4
        { freq: 329.63, dur: 1.2 }, // E4
        { freq: 293.66, dur: 2.5 }, // D4
      ];

      const playPhrase = () => {
        if (!this.isPlayingState) return;
        let cumulativeDelay = 0.2;
        melodySequence.forEach((step) => {
          this.playWeddingRagaNote(step.freq, step.dur, cumulativeDelay);
          cumulativeDelay += step.dur + 0.15;
        });
      };

      // Play initial phrase and schedule looping
      playPhrase();
      const totalPhraseTimeMs = melodySequence.reduce((acc, s) => acc + (s.dur + 0.15) * 1000, 500);
      this.melodyInterval = window.setInterval(() => {
        if (this.isPlayingState) {
          playPhrase();
        }
      }, totalPhraseTimeMs);

      return true;
    } catch (e) {
      console.warn('Could not start wedding music:', e);
      return false;
    }
  }

  public stopMusic() {
    this.isPlayingState = false;
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
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
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }
}

export const weddingAudio = new WeddingAudioManager();
