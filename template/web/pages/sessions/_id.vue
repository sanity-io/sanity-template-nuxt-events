<template>
  <section class="container">
    <SanityImage v-if="image" :image="image" />
    <div class="content">
      <p class="sessionType">{{ sessionType }}</p>
      <h1 class="sessionTitle">{{ title }}</h1>
      <p class="summary">{{ summary }}</p>
      <div class="sessionContent">
        <BlockContent
          :blocks="description"
          :v-if="description"
          :serializers="serializers"
        />
      </div>
    </div>
  </section>
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
@import '../../styles/custom-media.css';
@import '../../styles/custom-properties.css';

.container {
  min-height: calc(100% - 72px - 216px);
}

.content {
  max-width: var(--width-small);
  margin: 0 auto;
  padding: 1.5rem;
  box-sizing: border-box;

  @media (--media-min-medium) {
    padding: 1.5rem 1.5rem 3rem;
  }
}

.sessionType {
  text-transform: uppercase;
  margin: 0 0 3rem;
  font-size: var(--font-micro-size);
  line-height: var(--font-micro-line-height);
  letter-spacing: 0.5px;

  @media (--media-min-medium) {
    font-size: var(--font-small-size);
    line-height: var(--font-small-line-height);
  }
}

.sessionTitle {
  font-size: var(--font-title2-size);
  line-height: var(--font-title2-line-height);
  font-weight: 600;
  margin: 0 0 0.5rem;

  @media (--media-min-medium) {
    font-size: var(--font-title1-size);
    line-height: var(--font-title1-line-height);
  }
}

.summary {
  font-size: var(--font-large-size);
  line-height: var(--font-large-line-height);
  margin: 0.5rem 0 2rem;
}

.sessionContent {
  @nest & p {
    margin: 1rem 0;
  }
}

img {
  width: 100%;
  vertical-align: top;
}
</style>
