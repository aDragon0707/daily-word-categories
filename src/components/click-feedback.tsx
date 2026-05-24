"use client";

import { useEffect, useRef } from "react";
import { SOUND_EVENT, type SoundKind } from "@/lib/sound-feedback";

type Pulse = {
  start: number;
  baseFreq: number;
  endFreq: number;
  gain: number;
  duration: number;
  pan: number;
};

type Preset = {
  pulses: Pulse[];
  noiseGain: number;
  toneType: OscillatorType;
  mixGain: number;
  highpass: number;
};

const PRESETS: Record<SoundKind, Preset> = {
  soft: {
    pulses: [
      { start: 0, baseFreq: 920, endFreq: 620, gain: 0.14, duration: 0.055, pan: -0.08 },
      { start: 0.042, baseFreq: 760, endFreq: 520, gain: 0.11, duration: 0.05, pan: 0.08 },
    ],
    noiseGain: 0.045,
    toneType: "triangle",
    mixGain: 0.38,
    highpass: 1800,
  },
  select: {
    pulses: [
      { start: 0, baseFreq: 1180, endFreq: 760, gain: 0.18, duration: 0.05, pan: -0.12 },
      { start: 0.034, baseFreq: 900, endFreq: 610, gain: 0.14, duration: 0.05, pan: 0.12 },
    ],
    noiseGain: 0.055,
    toneType: "triangle",
    mixGain: 0.48,
    highpass: 2200,
  },
  submit: {
    pulses: [
      { start: 0, baseFreq: 690, endFreq: 360, gain: 0.22, duration: 0.06, pan: -0.04 },
      { start: 0.05, baseFreq: 560, endFreq: 320, gain: 0.18, duration: 0.055, pan: 0.04 },
    ],
    noiseGain: 0.07,
    toneType: "sine",
    mixGain: 0.5,
    highpass: 1400,
  },
  success: {
    pulses: [
      { start: 0, baseFreq: 820, endFreq: 980, gain: 0.16, duration: 0.055, pan: -0.1 },
      { start: 0.056, baseFreq: 1040, endFreq: 1280, gain: 0.16, duration: 0.055, pan: 0.1 },
      { start: 0.112, baseFreq: 1320, endFreq: 1560, gain: 0.13, duration: 0.05, pan: 0 },
    ],
    noiseGain: 0.05,
    toneType: "sine",
    mixGain: 0.5,
    highpass: 1800,
  },
  error: {
    pulses: [
      { start: 0, baseFreq: 350, endFreq: 240, gain: 0.16, duration: 0.065, pan: -0.08 },
      { start: 0.055, baseFreq: 280, endFreq: 180, gain: 0.12, duration: 0.06, pan: 0.08 },
    ],
    noiseGain: 0.04,
    toneType: "sawtooth",
    mixGain: 0.34,
    highpass: 1200,
  },
};

function createNoiseBuffer(ctx: AudioContext) {
  const duration = 0.22;
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    data[i] = white * (1 - i / data.length);
  }
  return buffer;
}

function createContext() {
  const Ctor = window.AudioContext;
  return new Ctor();
}

function playPreset(ctx: AudioContext, noiseBuffer: AudioBuffer, kind: SoundKind) {
  const preset = PRESETS[kind];
  const start = ctx.currentTime + 0.005;

  const master = ctx.createGain();
  master.gain.value = preset.mixGain;

  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -22;
  compressor.knee.value = 18;
  compressor.ratio.value = 4.5;
  compressor.attack.value = 0.004;
  compressor.release.value = 0.09;
  compressor.connect(ctx.destination);
  master.connect(compressor);

  for (const pulse of preset.pulses) {
    const pulseStart = start + pulse.start;
    const osc = ctx.createOscillator();
    osc.type = preset.toneType;
    osc.frequency.setValueAtTime(pulse.baseFreq, pulseStart);
    osc.frequency.exponentialRampToValueAtTime(pulse.endFreq, pulseStart + pulse.duration);

    const toneGain = ctx.createGain();
    toneGain.gain.setValueAtTime(0.0001, pulseStart);
    toneGain.gain.exponentialRampToValueAtTime(pulse.gain, pulseStart + 0.01);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, pulseStart + pulse.duration);

    const pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    if (pan) pan.pan.value = pulse.pan;

    osc.connect(toneGain);
    if (pan) {
      toneGain.connect(pan).connect(master);
    } else {
      toneGain.connect(master);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = preset.highpass;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.0001, pulseStart);
    noiseGain.gain.exponentialRampToValueAtTime(preset.noiseGain, pulseStart + 0.008);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, pulseStart + pulse.duration);

    const noisePan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    if (noisePan) noisePan.pan.value = pulse.pan * 0.75;

    noise.connect(filter).connect(noiseGain);
    if (noisePan) {
      noiseGain.connect(noisePan).connect(master);
    } else {
      noiseGain.connect(master);
    }

    osc.start(pulseStart);
    osc.stop(pulseStart + pulse.duration + 0.02);
    noise.start(pulseStart);
    noise.stop(pulseStart + pulse.duration + 0.02);
  }
}

export function ClickFeedback() {
  const ctxRef = useRef<AudioContext | null>(null);
  const noiseRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    const ensureCtx = () => {
      if (!ctxRef.current) {
        ctxRef.current = createContext();
        noiseRef.current = createNoiseBuffer(ctxRef.current);
      }
      return ctxRef.current;
    };

    const play = (kind: SoundKind) => {
      const ctx = ensureCtx();
      if (!noiseRef.current) {
        noiseRef.current = createNoiseBuffer(ctx);
      }

      const run = () => {
        if (ctx.state === "suspended") {
          void ctx.resume().then(() => {
            if (noiseRef.current) playPreset(ctx, noiseRef.current, kind);
          });
          return;
        }

        if (noiseRef.current) {
          playPreset(ctx, noiseRef.current, kind);
        }
      };

      run();
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const button = target.closest("button");
      if (!button || button.disabled) return;
      if (event.button !== 0) return;

      const kind = (button.getAttribute("data-click-sound") as SoundKind | null) ?? "soft";
      play(kind);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const target = document.activeElement;
      if (!(target instanceof HTMLButtonElement) || target.disabled) return;
      const kind = (target.getAttribute("data-click-sound") as SoundKind | null) ?? "soft";
      play(kind);
    };

    const onCustomSound = (event: Event) => {
      const detail = (event as CustomEvent<{ kind?: SoundKind }>).detail;
      const kind = detail?.kind;
      if (!kind) return;
      play(kind);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown, true);
    window.addEventListener(SOUND_EVENT, onCustomSound);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener(SOUND_EVENT, onCustomSound);
    };
  }, []);

  return null;
}
