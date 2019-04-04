<template>
  <section class="container">
    <div>
      <h1 class="title">
        {{ info.name }}
      </h1>
      <h2 class="subtitle">
        {{ info.description }}
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green"
          >Documentation</a
        >
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
          >GitHub</a
        >
      </div>
      <ul>
        <li v-for="session in sessions" :key="session._id">
          <h2>{{ session.title || 'Undefined title' }}</h2>
          <p>{{ session.sessionType }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import sanityClient from '../sanityClient'

const query = `
  {
    "info": *[_id == "eventInformation"] {
      ..., logo { ..., asset->}
    }[0],
    "program": *[_id == "program"][0],
    "sessions": *[_type == "session"] {
      ..., speaker->
    },
    "speakers": *[_type == "person"]
  }
`

export default {
  components: {},
  async asyncData() {
    return await sanityClient.fetch(query)
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
