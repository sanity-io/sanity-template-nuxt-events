<template>
  <section class="container">
    <h1 class="title">Sessions</h1>
    <div class="sessions">
      <SessionList
        v-if="sessionsWithoutBreak"
        :sessions="sessionsWithoutBreak"
      />
    </div>
  </section>
</template>

<script>
import SessionList from '~/components/SessionList'

export default {
  components: { SessionList },
  data() {
    return {
      program: this.$store.getters.getProgram
    }
  },
  computed: {
    sessionsWithoutBreak: data => {
      if (data.program && data.program.schedule) {
        return data.program.schedule.filter(s => s.sessionType !== 'break')
      }
    }
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 5rem;
  margin-bottom: 4rem;
  padding-bottom: 0;
}

.sessions {
  margin: 0 auto;
  max-width: 30rem;
}
</style>
