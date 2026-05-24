export const SOUND_EVENT = "dwc-sound";

export type SoundKind = "soft" | "select" | "submit" | "success" | "error";

export function emitSound(kind: SoundKind) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(SOUND_EVENT, { detail: { kind } }));
}
