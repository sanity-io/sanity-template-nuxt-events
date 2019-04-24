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
    }[0],
    "program": *[_id == "program"][0] {
      ...,
      schedule[] {
        ...,
        session-> {
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
        }
      }
    }
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

.title {
  font-size: 12vw;
  margin-bottom: 0.1em;
  padding-bottom: 0;
}

.title + p {
  font-size: 1.2em;
  margin-top: 0;
  font-weight: 300;
  margin-bottom: 3rem;
}

@media screen and (min-width: 768px) {
  .title {
    font-size: 5rem;
  }
  .title + p {
    font-size: 1.5rem;
  }
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
</style>
