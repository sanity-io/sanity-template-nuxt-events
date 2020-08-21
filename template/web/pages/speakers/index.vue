<template>
  <section class="container">
    <h1 class="title">Speakers</h1>
    <ul class="speakers">
      <li v-for="speaker in speakers" :key="speaker._id" class="speaker">
        <nuxt-link :to="{ path: `/speakers/${speaker.slug.current}` }">
          <SanityImage
            :width="256"
            :height="256"
            :image="speaker.image"
            class="avatar"
          />
          <h2 class="name">{{ speaker.name || 'Secret speaker' }}</h2>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import groq from 'groq'
import sanityClient from '~/sanityClient'
import SanityImage from '~/components/SanityImage'

const query = groq`
  {
    "speakers": *[_type == "person"]
  }
`

export default {
  components: {
    SanityImage
  },
  async asyncData() {
    return await sanityClient.fetch(query)
  }
}
</script>

<style scoped>
@import '../../styles/custom-properties.css';

.container {
  text-align: center;
  padding: 1.5rem 0;
  box-sizing: border-box;
  min-height: calc(100% - 72px - 216px);
}

.title {
  margin-bottom: 4rem;
}

.speakers {
  display: grid;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  max-width: var(--width-medium);
  grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
}

.speaker {
  display: block;
  position: relative;
  margin-bottom: 4em;

  @nest & > a {
    display: block;
    padding: 1.5rem;
  }

  @nest & .name {
    font-weight: 600;
    font-size: var(--font-title3-size);
    line-height: var(--font-title3-line-height);
  }
}

.speaker a {
  color: inherit;
  text-decoration: inherit;
}

.avatar {
  border-radius: 50%;
  max-width: 100%;
}
</style>
