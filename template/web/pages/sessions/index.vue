<template>
  <section class="container">
    <h1 class="title">Sessions</h1>
    <div class="sessions">
      <SessionList v-if="sessions" :sessions="sessions" />
    </div>
  </section>
</template>

<script>
import sanityClient from '~/sanityClient'
import SessionList from '~/components/SessionList'

const query = `
  {
    "sessions": *[_type == "session"] {
      ..., speaker->
    }
  }
`

export default {
  components: { SessionList },
  async asyncData() {
    return await sanityClient.fetch(query)
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 5rem;
  margin-bottom: 4rem;
  padding-bottom: 0;
}

.sessions {
  margin: 0 auto;
  max-width: 30rem;
}
</style>
