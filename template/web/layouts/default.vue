<template>
  <div>
    <Navbar :title="$store.state.eventInformation.name" />
    <nuxt />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style>
html {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 18px;
  max-width: 100vw;
  overflow-x: hidden;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

section {
  margin: 1rem;
}

.container {
  padding: 0 1rem;
}
</style>
