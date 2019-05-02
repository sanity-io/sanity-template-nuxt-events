<template>
  <section class="container">
    <SanityImage
      :v-if="image.asset"
      :image="image"
      :height="1200"
      :width="1200"
      class="image"
    />
    <h1 class="title">{{ name }}</h1>
    <div class="bio" :v-if="bio.length > 0">
      <BlockContent v-if="bio" :blocks="bio" />
    </div>
    <div v-if="scheduleItems" class="sessions">
      <h2>Sessions</h2>
      <SessionItem
        v-for="scheduleItem in scheduleItems"
        :key="scheduleItem._key"
        :schedule-item="scheduleItem"
      />
    </div>
  </section>
</template>

<script>
import groq from 'groq'
import sanityClient from '~/sanityClient'
import SanityImage from '~/components/SanityImage'
import SessionItem from '~/components/SessionItem'
import BlockContent from 'sanity-blocks-vue-component'
import blocksToText from '~/lib/blocksToText'

const query = groq`
  *[_type == "person" && slug.current == $slug][0] {..., "id": _id}
`

export default {
  components: {
    SanityImage,
    BlockContent,
    SessionItem
  },
  data() {
    return {
      name: undefined,
      bio: [],
      program: this.$store.getters.getProgram,
      plainTextBio: blocksToText(this.bio)
    }
  },
  computed: {
    scheduleItems: data => {
      return data.program.schedule.filter(item => {
        return (
          item.session &&
          item.session.persons &&
          item.session.persons.filter(person => person.person._id === data.id)
            .length > 0
        )
      })
    }
  },
  async asyncData({ params }) {
    return await sanityClient.fetch(query, params)
  },
  head() {
    const { name } = this.$store.getters.eventInformation
    return {
      title: `Sessions | ${name}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.plainTextBio
        }
      ]
    }
  }
}
</script>

<style scoped>
@import '../../styles/custom-media.css';
@import '../../styles/custom-properties.css';

.container {
  text-align: center;
  padding: 3rem 1.5rem;
  box-sizing: border-box;
  min-height: calc(100% - 72px - 216px);
}

.bio {
  font-size: var(--font-large-size);
  line-height: var(--font-large-line-height);

  @nest & p {
    margin: 0.25rem 0 0.5rem;
  }

  @media (--media-min-medium) {
    font-size: var(--font-title3-size);
    line-height: var(--font-title3-line-height);
  }
}

.sessions {
  text-align: left;
  max-width: 40rem;
  margin: 0 auto;
  margin-top: 5rem;
}

.sessions h2 {
  text-align: center;
  margin: 4rem 0 2rem;
  font-weight: 600;
  font-size: var(--font-title2-size);
  line-height: var(--font-title2-line-height);
}

.image {
  border-radius: 50%;
  max-width: 20rem;
  width: 50vw;
}
</style>
