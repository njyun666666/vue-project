import { useBreakpoints, useTitle } from '@vueuse/core'

export const breakpoints = useBreakpoints({
  default: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
})

export const webTitle = useTitle(null, { titleTemplate: '%s | Vue-Project' })
