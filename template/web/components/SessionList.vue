<template>
  <ul v-if="sessions" class="sessions">
    <li v-for="session in sessions" :key="session._id" class="session">
      <nuxt-link :to="`/sessions/${session._id}`">
        <span>{{ session.sessionType }}</span>
        <h3>{{ session.title }}</h3>
        <p>
          {{ session.summary }}
        </p>
      </nuxt-link>
      <PersonsList :persons="session.persons" v-if="showPersons" />
    </li>
  </ul>
</template>

<script>
import PersonsList from '~/components/PersonsList'

export default {
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
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
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
</style>
