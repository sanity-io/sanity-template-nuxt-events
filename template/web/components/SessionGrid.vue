<template>
  <ul v-if="filteredSessions" class="sessionGrid">
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
@import '../styles/custom-properties.css';

.sessionGrid {
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  grid-gap: 3rem;
}

h2.sessionTitle {
  font-weight: 600;
  font-size: var(--font-title3-size);
  line-height: var(--font-title3-line-height);
  margin: 0;
  margin-top: 0.5rem;
}

.session {
  display: flex;
  flex-direction: column;

  @nest & p {
    margin: 0.5rem 0;
  }
}

.sessionGrid a {
  color: inherit;
  text-decoration: inherit;
}

.session .top {
  display: flex;
  justify-content: space-between;
}

.sessionGrid a > span {
  display: block;
}

.sessionGrid a span.type {
  font-size: var(--font-small-size);
  line-height: var(--font-small-line-height);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.session .time {
  font-size: var(--font-small-size);
  line-height: var(--font-small-line-height);
  margin-top: 0;
  color: var(--color-gray);
}
</style>
