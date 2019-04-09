<template>
  <div class="header">
    <nuxt-link to="/" class="home">{{ title }}</nuxt-link>
    <nav>
      <nuxt-link to="/sessions">Sessions</nuxt-link>
      <nuxt-link to="/code-of-conduct">Code of conduct</nuxt-link>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'No title set'
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  padding: 1rem;
  justify-content: space-between;
}

nav {
  display: flex;
  justify-content: flex-end;
}

nav a {
  margin-left: 2rem;
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
