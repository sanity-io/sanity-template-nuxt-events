<template>
  <header class="header">
    <nuxt-link to="/" class="home">{{ title }}</nuxt-link>
    <nav>
      <nuxt-link to="/sessions">Sessions</nuxt-link>
      <nuxt-link to="/speakers">Speakers</nuxt-link>
      <a v-if="ticketLink" :href="ticketLink">Tickets</a>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'No title set'
    },
    ticketLink: {
      type: String,
      default: undefined
    }
  }
}
</script>

<style scoped>
.header {
  padding: 1rem;
}

@media screen and (min-width: 520px) {
  .header {
    display: flex;
    justify-content: space-between;
  }
}

@media screen and (min-width: 520px) {
  nav {
    display: flex;
    justify-content: flex-end;
  }
  nav a {
    margin-left: 2rem;
  }
}

.header a {
  display: block;
  color: inherit;
  text-decoration: inherit;
}

.home {
  font-weight: 800;
  text-transform: uppercase;
}
</style>
