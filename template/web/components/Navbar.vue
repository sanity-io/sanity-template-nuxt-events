<template>
  <div class="header">
    <nuxt-link to="/">{{ title }}</nuxt-link>
    <nav>
      <nuxt-link to="/sessions">Sessions</nuxt-link>
      <nuxt-link to="/speakers">Speakers</nuxt-link>
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
  background-color: #000;
  color: #fff;
  padding: 1rem;
  justify-content: space-between;
}
</style>
