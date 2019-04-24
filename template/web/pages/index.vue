<template>
  <section>
    <div class="container top">
      <h1 class="title">{{ info.name }}</h1>
      <p class="subtitle">{{ info.description }}</p>
      <div class="dates">
        {{ new Date(info.schedule.from) | dateFilter('DD MMMM') }}
        -
        {{ new Date(info.schedule.to) | dateFilter('DD MMMM YYYY') }}
      </div>
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
      <ul class="sessions">
        <li
          v-for="scheduleItem in program.schedule"
          :key="scheduleItem._key"
          class="session"
        >
          <div class="meta">
            {{ scheduleItem.session.sessionType }}
            <div class="time">{{ scheduleItem.duration }}min</div>
          </div>
          <div>
            <h3>
              <nuxt-link
                :to="{ path: `/sessions/${scheduleItem.session._id}` }"
                >{{
                  scheduleItem.session.title || 'Undefined title'
                }}</nuxt-link
              >
            </h3>
            <p>
              {{ scheduleItem.session.summary }}
            </p>

            <ul v-if="scheduleItem.session.persons" class="persons">
              <li
                v-for="personRef in scheduleItem.session.persons"
                :key="personRef.person._id"
                class="person"
              >
                <nuxt-link
                  :to="{ path: `/speakers/${personRef.person.slug.current}` }"
                >
                  <SanityImage
                    :image="personRef.person.image"
                    :alt="personRef.person.image.alt"
                    :width="128"
                    :height="128"
                    fit="crop"
                    class="personImage"
                  />
                  {{ personRef.person.name }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { dateFilter } from 'vue-date-fns'

import sanityClient from '../sanityClient'
import SanityImage from '~/components/SanityImage'

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
    SanityImage
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

.title + p + .dates {
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
    flex-basis: 10rem;
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
