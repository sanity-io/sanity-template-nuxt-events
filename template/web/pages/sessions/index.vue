<template>
  <section class="container">
    <h1>Sessions</h1>
    <ul>
      <li v-for="session in sessions" :key="session._id">
        <h2>{{ session.title || 'Undefined title' }}</h2>
        <p>{{ session.sessionType }}</p>
        <nuxt-link :to="{ path: `/sessions/${session._id}` }">
          View
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import sanityClient from '~/sanityClient'

const query = `
  {
    "sessions": *[_type == "session"] {
      ..., speaker->
    }
  }
`

export default {
  components: {},
  async asyncData() {
    return await sanityClient.fetch(query)
  }
}
</script>

<style scoped>
.container {
  border: 1px solid red;
}
</style>
