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
        return data.program.schedule.filter(
          i => i.session.sessionType !== 'break'
        )
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 50rem;
  margin: 0 auto;
}

.title {
  text-align: center;
  margin-bottom: 4rem;
}
</style>
