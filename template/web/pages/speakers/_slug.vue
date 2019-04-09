<template>
  <section class="container">
    <SanityImage
      :image="image"
      :v-if="image.asset"
      class="image"
      height="1200"
      width="1200"
    />
    <h1>{{ name }}</h1>
    <BlockContent :blocks="bio" />
    <h2 v-if="sessions">Sessions</h2>
    <ul v-if="sessions" class="sessions">
      <li
        v-for="session in sessions"
        :key="session._id"
        class="session"
        :v-if="session"
      >
        {{ session.title }}
      </li>
    </ul>
  </section>
</template>

<script>
import sanityClient from '~/sanityClient'
import SanityImage from '~/components/SanityImage'
import BlockContent from 'sanity-blocks-vue-component'

const query = `
  *[_type == "person" && slug.current == $slug][0] {
    ...,
    "sessions": *[_type == "session" && references(^._id)]
  }
`

export default {
  components: {
    SanityImage,
    BlockContent
  },
  async asyncData({ params }) {
    return await sanityClient.fetch(query, params)
  }
}
</script>

<style scoped>
.container {
  text-align: center;
}
.image {
  border-radius: 50%;
  margin: 2rem;
  max-width: 20rem;
  width: 50vw;
}

.sessions {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

.session {
  display: flex;
  justify-content: center;
  margin: 1rem;
}
</style>
