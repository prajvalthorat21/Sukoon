// Lazy-loaded Web Audio API Synthesizer Engine for Sleep Sounds, Chimes & Sukoon Moment Drone

class WebAudioEngine {
  constructor() {
    this.ctx = null;
    this.nodes = {};
    this.isInitialized = false;
    this.droneGain = null;
  }

  init() {
    if (!this.isInitialized) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.isInitialized = true;
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Create noise buffer (white, pink, brown)
  createNoiseBuffer(type = 'brown') {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      if (type === 'brown') {
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      } else if (type === 'pink') {
        output[i] = (white + lastOut) / 2;
        lastOut = white;
      } else {
        output[i] = white * 0.1;
      }
    }
    return buffer;
  }

  // Start ambient track sound generator (Rain, Ocean, Wind, Fireplace)
  startSound(soundId, volume = 0.5) {
    this.init();
    if (!this.ctx) return;

    if (this.nodes[soundId]) {
      this.setVolume(soundId, volume);
      return;
    }

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(volume * 0.4, this.ctx.currentTime);

    const noiseBuffer = this.createNoiseBuffer(soundId === 'rain' ? 'pink' : 'brown');
    if (!noiseBuffer) return;

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();

    if (soundId === 'rain') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, this.ctx.currentTime);
    } else if (soundId === 'ocean') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, this.ctx.currentTime);

      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.value = 0.12;
      lfoGain.gain.value = 250;
      lfo.connect(filter.frequency);
      lfo.start();
    } else if (soundId === 'wind') {
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(500, this.ctx.currentTime);
      filter.Q.value = 3.0;

      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.value = 0.2;
      lfoGain.gain.value = 200;
      lfo.connect(filter.frequency);
      lfo.start();
    } else if (soundId === 'fireplace') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    }

    noiseSource.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(this.ctx.destination);

    noiseSource.start();

    this.nodes[soundId] = {
      source: noiseSource,
      gain: masterGain,
      filter: filter
    };
  }

  setVolume(soundId, volume) {
    if (this.nodes[soundId] && this.ctx) {
      this.nodes[soundId].gain.gain.setTargetAtTime(volume * 0.4, this.ctx.currentTime, 0.1);
    }
  }

  stopSound(soundId) {
    const node = this.nodes[soundId];
    if (node) {
      delete this.nodes[soundId];
      try {
        if (node.source) {
          node.source.stop();
          node.source.disconnect();
        }
      } catch (e) {
        // Source already stopped
      }
    }
  }

  stopAll() {
    Object.keys(this.nodes).forEach((soundId) => {
      if (soundId === 'sukoon_drone') {
        this.stopSukoonDrone();
      } else {
        this.stopSound(soundId);
      }
    });
  }

  // Play gentle soothing bell chime for breathing transitions
  playChime(pitch = 440) {
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 2.5);
  }

  // Start Sukoon Moment Ambient Drone (Smooth Fade-In on explicit user click)
  startSukoonDrone() {
    this.init();
    if (!this.ctx) return;

    this.stopSukoonDrone();

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const masterGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(130.81, this.ctx.currentTime); // C3 chord tone

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(196.00, this.ctx.currentTime); // G3 chord tone

    // Start with 0 volume and fade in smoothly over 2 seconds
    masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 2.0);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, this.ctx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(this.ctx.destination);

    osc1.start();
    osc2.start();

    this.droneGain = masterGain;
    this.nodes['sukoon_drone'] = {
      source: osc1,
      source2: osc2,
      gain: masterGain
    };
  }

  stopSukoonDrone() {
    const drone = this.nodes['sukoon_drone'];
    if (drone) {
      delete this.nodes['sukoon_drone'];
      try {
        if (drone.source) {
          drone.source.stop();
          drone.source.disconnect();
        }
        if (drone.source2) {
          drone.source2.stop();
          drone.source2.disconnect();
        }
      } catch (e) {
        // Source already stopped
      }
    }
  }
}

export const audioEngine = new WebAudioEngine();
