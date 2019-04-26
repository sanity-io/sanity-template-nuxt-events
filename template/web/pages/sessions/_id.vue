<template>
  <div>
    <SanityImage v-if="image" :image="image" />
    <section class="container">
      <p class="sessionType">{{ sessionType }}</p>
      <h1>{{ title }}</h1>
      <p class="summary">{{ summary }}</p>
      <BlockContent
        :blocks="description"
        :v-if="description"
        :serializers="serializers"
      />
    </section>
  </div>
</template>

<script>
import BlockContent from 'sanity-blocks-vue-component'
import groq from 'groq'
import sanityClient from '~/sanityClient'
import SanityImage from '~/components/SanityImage'
import PersonBlock from '~/components/blockContent/PersonBlock'

const query = groq`
  *[_type == "session" && _id == $id] {
    ...,
    persons[] {
      person-> {
        ...,
        image {
          ...,
          asset->
        }
      }
    }
  }[0]
`

export default {
  components: {
    BlockContent,
    SanityImage
  },
  data() {
    return {
      serializers: {
        types: {
          personReference: PersonBlock
        }
      }
    }
  },
  async asyncData({ params }) {
    return await sanityClient.fetch(query, params)
  }
}
</script>

<style scoped>
.container {
  max-width: 40rem;
  margin: 0 auto;
}
.summary {
  font-size: 1.2em;
  line-height: 1.3em;
}

.sessionType {
  text-transform: uppercase;
  margin-top: 3rem;
}

img {
  width: 100%;
}
</style>
