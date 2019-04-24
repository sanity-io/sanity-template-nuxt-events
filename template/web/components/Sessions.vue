<template>
  <ul class="sessions">
    <SessionItem
      v-for="(scheduleItem, index) in schedule"
      :key="scheduleItem._key"
      :index="index"
      :schedule-item="scheduleItem"
    />
  </ul>
</template>
<script>
import { addMinutes } from 'date-fns'
import SessionItem from '~/components/SessionItem'
export default {
  components: {
    SessionItem
  },
  props: {
    info: {
      from: {
        type: Date,
        default: () => new Date()
      }
    },
    program: {
      schedule: {
        type: Array,
        default: () => []
      }
    }
  },
  data: function() {
    const {
      schedule: { from }
    } = this.$store.getters.eventInformation
    return {
      /**
       * Calculates session time slot by looping trough all sessions
       * adding their duration to their start time.
       */
      schedule: this.program.schedule.reduce((allSessions, session, index) => {
        const prevSession = allSessions[index - 1]
        const fromTime = prevSession
          ? addMinutes(prevSession.fromTime, prevSession.duration)
          : from
        return allSessions.concat([{ ...session, fromTime }])
      }, [])
    }
  }
}
</script>

<style scoped>
ul.sessions {
  margin: 0;
  padding: 0;
}
</style>
