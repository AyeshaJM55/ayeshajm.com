export const motionEase = [0.22, 1, 0.36, 1]

export const motionDuration = {
  fast: 0.3,
  base: 0.65,
  slow: 0.9,
}

export const motionViewport = {
  amount: 0.2,
  margin: '0px 0px -8% 0px',
  once: true,
}

export const motionEnabled = import.meta.env.MODE !== 'test'
