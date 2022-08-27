import type { RouterOptions } from '@nuxt/schema'

// https://router.vuejs.org/api/#routeroptions
export default <RouterOptions>{
  scrollBehavior: (_to, _from, savedPosition) => savedPosition || { top: 0 }
}
