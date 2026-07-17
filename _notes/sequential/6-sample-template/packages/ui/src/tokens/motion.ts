/** Motion tokens — durations + easings. */

export interface MotionTokens {
  fast: string;
  base: string;
  slow: string;
  easeStandard: string;
  easeEntrance: string;
  easeExit: string;
}

export const defaultMotion: MotionTokens = {
  fast: "150ms",
  base: "250ms",
  slow: "500ms",
  easeStandard: "cubic-bezier(0.2, 0, 0, 1)",
  easeEntrance: "cubic-bezier(0.16, 1, 0.3, 1)",
  easeExit: "cubic-bezier(0.4, 0, 1, 1)",
};
