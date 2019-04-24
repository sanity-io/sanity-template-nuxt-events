<template>
  <ul v-if="filteredSessions" class="sessions">
    <li v-for="session in filteredSessions" :key="session._id" class="session">
      <nuxt-link :to="`/sessions/${session._id}`">
        <span>{{ session.sessionType }}</span>
        <h3>{{ session.title }}</h3>
        <p>
          {{ session.summary }}
        </p>
      </nuxt-link>
      <ul v-if="session.persons" class="persons">
        <li
          v-for="personRef in session.persons"
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
    </li>
  </ul>
</template>

<script>
import SanityImage from '~/components/SanityImage'

export default {
  components: {
    SanityImage
  },
  props: {
    sessions: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    filteredSessions: data => {
      console.log('filtered', data.sessions)
      return data.sessions.map(session => {
        return {
          ...session,
          persons: session.persons.filter(
            person =>
              person.person && person.person.slug && person.person.slug.current
          )
        }
      })
    }
  }
}
</script>

<style scoped>
.sessions {
  margin: 0;
  padding: 0;
}

h3 {
  margin: 0;
}

.session {
  display: block;
  margin-bottom: 4rem;
}

.sessions a {
  display: flex;
  color: inherit;
  text-decoration: inherit;
  flex-direction: column;
}

.sessions a span {
  text-transform: uppercase;
  font-size: 0.5em;
}

p {
  max-width: 30em;
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
  margin-top: 1em;
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
