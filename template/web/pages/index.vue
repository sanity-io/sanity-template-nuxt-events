<template>
  <section>
    <div class="container top">
      <h1 class="title">{{ info.name }}</h1>
      <p class="subtitle">{{ info.description }}</p>
      <div class="dates">
        {{ new Date(info.schedule.from) | dateFilter('DD MMMM ha') }}
        -
        {{ new Date(info.schedule.to) | dateFilter('ha') }}
      </div>
      <div class="venue">{{ info.venue.name }}, {{ info.venue.city }}</div>
    </div>

    <figure :v-if="info.image">
      <SanityImage
        :image="info.image"
        :width="1800"
        :height="500"
        class="mainImage"
      />
      <figcaption>{{ info.image.caption }}</figcaption>
    </figure>

    <div class="container">
      <h2 class="sessions-title">Schedule</h2>
      <Sessions :program="program" :info="info" />
    </div>
  </section>
</template>

<script>
import { dateFilter } from 'vue-date-fns'

import sanityClient from '../sanityClient'
import SanityImage from '~/components/SanityImage'
import Sessions from '~/components/Sessions'

const query = `
  {
    "info": *[_id == "eventInformation"] {
      ..., image { ..., asset->}
    }[0]
  }
`

export default {
  components: {
    SanityImage,
    Sessions
  },
  filters: {
    dateFilter
  },
  data() {
    return {
      program: this.$store.getters.getProgram
    }
  },
  async asyncData() {
    return await sanityClient.fetch(query)
  },
  head() {
    if (!this || !this.info) {
      return
    }
    return {
      title: this.info.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.info.description
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.info.keywords.join(',')
        }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 45rem;
  margin: 0 auto;
}

.top {
  text-align: center;
}

.title + p + .dates {
  margin-bottom: 1rem;
}

.title + p + .dates + .venue {
  margin-bottom: 5rem;
}

figure {
  margin: 0;
  margin-bottom: 3rem;
}

figcaption {
  font-size: 0.8em;
}

.mainImage {
  width: 100vw;
  margin-left: -1rem;
}

.sessions-title {
  text-align: center;
  margin-bottom: 3em;
}

ul.sessions {
  margin: 0;
  padding: 0;
}

li.session {
  display: block;
  margin-bottom: 5rem;
}

@media screen and (min-width: 768px) {
  li.session {
    display: flex;
    align-items: baseline;
  }
}

li.session .meta {
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
  font-size: 0.8em;
}

@media screen and (min-width: 768px) {
  li.session .meta {
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    min-width: 7rem;
    overflow: hidden;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    margin-right: 1rem;
    padding-right: 1rem;
    text-align: right;
    font-size: 1.2em;
    opacity: 0.5;
  }
}

@media screen and (min-width: 768px) {
  li.session .meta .time {
    font-size: 0.7em;
    margin-top: 1.27rem;
  }
}

li.session h3 {
  margin-top: 0;
}

li.session h3 a {
  color: inherit;
  text-decoration: inherit;
}

li.session h3 + p {
  margin: 0;
}

.session .persons {
  color: #666;
  display: flex;
  margin: 0;
  padding: 0;
  font-size: 0.8em;
}

.session .persons .person {
  display: flex;
  margin: 0;
  padding: 0;
  margin-right: 2em;
  margin-top: 2em;
  align-items: center;
}

.session .persons .person a {
  display: contents;
  color: inherit;
  text-decoration: inherit;
}

.personImage {
  height: 2em;
  margin-right: 0.5em;
  border-radius: 50%;
}
</style>
