import { useReducedMotion as useFramerReducedMotion } from 'framer-motion'

function useReducedMotion() {
  const reducedMotion = useFramerReducedMotion()
  return import.meta.env.MODE === 'test' || Boolean(reducedMotion)
}

export default useReducedMotion
