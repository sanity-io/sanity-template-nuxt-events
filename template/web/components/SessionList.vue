<template>
  <ul v-if="filteredSessions" class="sessions">
    <li v-for="session in filteredSessions" :key="session._id" class="session">
      <nuxt-link :to="`/sessions/${session._id}`">
        <span class="top">
          <span>
            <span class="type">{{ session.sessionType }}</span>
            <h2 class="sessionTitle">{{ session.title }}</h2>
          </span>
          <span
            class="time"
            :title="session.fromTime | date('MMMM DD YYYY h:MM a')"
          >
            {{ session.fromTime | date('h:MM a') }}
          </span>
        </span>
        <p>
          {{ session.summary }}
        </p>
      </nuxt-link>
      <PersonsList
        v-if="showPersons && session.persons"
        :persons="session.persons"
      />
    </li>
  </ul>
</template>

<script>
import PersonsList from '~/components/PersonsList'
import { dateFilter } from 'vue-date-fns'

export default {
  filters: {
    date: dateFilter
  },
  components: {
    PersonsList
  },
  props: {
    showPersons: {
      type: Boolean,
      default: false
    },
    sessions: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    filteredSessions: props => {
      return props.sessions.map(session => {
        return {
          ...session,
          ...session.session,
          persons:
            session.persons &&
            session.persons.filter(
              person =>
                person.person &&
                person.person.slug &&
                person.person.slug.current
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 4rem;
}

h2.sessionTitle {
  margin: 0;
  margin-top: 0.75rem;
}

.session {
  display: flex;
  flex-direction: column;
}

.sessions a {
  color: inherit;
  text-decoration: inherit;
}

.session .top {
  display: flex;
  justify-content: space-between;
}

.sessions a > span {
  display: block;
}

.sessions a span.type {
  text-transform: uppercase;
}

p {
  max-width: 30em;
}

.session .time {
  margin-top: 0;
  opacity: 0.5;
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
