<template>
  <section class="container">
    <h1 class="title">Sessions</h1>
    <div class="sessionGridContainer">
      <SessionGrid
        v-if="sessionsWithoutBreak"
        :sessions="sessionsWithoutBreak"
      />
    </div>
  </section>
</template>

<script>
import SessionGrid from '~/components/SessionGrid'

export default {
  components: { SessionGrid },
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
@import '../../styles/custom-properties.css';

.container {
  padding: 1.5rem 0;
  box-sizing: border-box;
  min-height: calc(100% - 72px - 216px);
}

.title {
  text-align: center;
  margin-bottom: 4rem;
}

.sessionGridContainer {
  max-width: var(--width-medium);
  padding: 0 1.5rem;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
