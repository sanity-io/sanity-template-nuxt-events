<template>
  <section class="container">
    <h1>Speakers</h1>
    <ul>
      <li v-for="speaker in speakers" :key="speaker._id">
        <nuxt-link :to="{ path: `/speakers/${speaker.slug.current}` }">
          <h2>{{ speaker.name || 'Secret speaker' }}</h2>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import groq from 'groq'
import sanityClient from '~/sanityClient'

const query = groq`
  {
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
