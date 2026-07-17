/** Stacking-order tokens. */

export const Z_KEYS = ["base", "dropdown", "sticky", "overlay", "modal", "toast"] as const;
export type ZKey = (typeof Z_KEYS)[number];
export type ZTokens = Record<ZKey, number>;

export const defaultZ: ZTokens = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  toast: 1400,
};
