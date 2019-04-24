<template>
  <div>
    <Navbar
      :title="$store.state.eventInformation.name"
      :ticket-link="$store.state.eventInformation.ticket"
    />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer
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
  padding: 1rem;
}

.title {
  font-size: 12vw;
  margin-bottom: 0.1em;
  padding-bottom: 0;
}

.title + p {
  font-size: 1.2em;
  margin-top: 0;
  font-weight: 300;
  margin-bottom: 3rem;
}

@media screen and (min-width: 768px) {
  .title {
    font-size: 5rem;
  }
  .title + p {
    font-size: 1.5rem;
  }
}
</style>
