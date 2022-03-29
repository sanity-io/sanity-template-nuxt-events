import { format } from 'date-fns'

// @nuxtjs/date-fns isn't ready for nuxt3 yet

export default defineNuxtPlugin(() => {
  return {
    provide: { format }
  }
})
