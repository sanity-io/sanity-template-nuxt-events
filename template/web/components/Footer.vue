<template>
  <footer class="footer">
    <nav>
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/sessions">Sessions</nuxt-link>
      <nuxt-link to="/speakers">Speakers</nuxt-link>
      <nuxt-link to="/code-of-conduct">Code of conduct</nuxt-link>
      <a v-if="eventInformation.venue" :href="eventInformation.ticket"
        >Tickets
      </a>
    </nav>
    <address v-if="eventInformation.venue" class="venue">
      <div>{{ eventInformation.venue.name }}</div>
      <div>
        {{ eventInformation.venue.postCode }} {{ eventInformation.venue.city }}
      </div>
      <div>{{ eventInformation.venue.country }}</div>
    </address>
    <div class="power">
      Powered by <a href="https://nuxtjs.org">Nuxt.js</a> and
      <a href="https://www.sanity.io">Sanity.io</a> {{ year }}
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'No title set'
    }
  },
  data: data => {
    if (!data.$store.state) {
      return
    }
    return {
      year: new Date().getFullYear(),
      eventInformation: data.$store.state.eventInformation
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: #eee;
  margin-top: 1rem;
  padding: 2rem;
  padding-top: 4rem;
  padding-bottom: 3rem;
  text-align: center;
  font-size: 0.8em;
}

.footer a {
  color: inherit;
  text-decoration: inherit;
  padding: 1em;
}

address.venue {
  margin: 1em;
  margin-top: 3em;
  font-style: normal;
}

.power a {
  display: inline;
  padding: 0;
  text-decoration: underline;
}
</style>
