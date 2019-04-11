<template>
  <section class="container">
    <SanityImage
      :v-if="image.asset"
      :image="image"
      class="image"
      :height="1200"
      :width="1200"
    />
    <h1>{{ name }}</h1>
    <div :v-if="bio">
      <BlockContent :v-if="bio" :blocks="bio" />
    </div>
    <div v-if="sessions" class="sessions">
      <h2>Sessions</h2>
      <SessionList :sessions="sessions" />
    </div>
  </section>
</template>

<script>
import sanityClient from '~/sanityClient'
import SanityImage from '~/components/SanityImage'
import SessionList from '~/components/SessionList'
import BlockContent from 'sanity-blocks-vue-component'
import blocksToText from '~/lib/blocksToText'

const query = `
  *[_type == "person" && slug.current == $slug][0] {
    ...,
    "sessions": *[_type == "session" && references(^._id)]
  }
`

export default {
  components: {
    SanityImage,
    BlockContent,
    SessionList
  },
  async asyncData({ params }) {
    return await sanityClient.fetch(query, params)
  },
  head() {
    const { name } = this.$store.getters.eventInformation
    const plainTextBio = blocksToText(this.bio)
    return {
      title: `Sessions | ${name}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: plainTextBio
        }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  text-align: center;
}

.sessions {
  text-align: left;
  max-width: 30rem;
  margin: 0 auto;
}

.sessions h2 {
  text-align: center;
}

.image {
  border-radius: 50%;
  margin: 2rem;
  max-width: 20rem;
  width: 50vw;
}

h2 {
  margin-top: 2em;
}
</style>
