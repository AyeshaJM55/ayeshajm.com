import { motionDuration, motionEase } from './constants'

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export const fadeLeft = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0 },
}

export const fadeRight = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0 },
}

export const mediaReveal = {
  hidden: { opacity: 0, scale: 0.965, y: 18 },
  visible: { opacity: 1, scale: 1, y: 0 },
}

export function staggerContainer(staggerChildren = 0.08, delayChildren = 0) {
  return {
    hidden: {},
    visible: {
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  }
}

export function revealTransition(duration = motionDuration.base, delay = 0) {
  return {
    delay,
    duration,
    ease: motionEase,
  }
}
