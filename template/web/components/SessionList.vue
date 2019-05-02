<template>
  <ul class="sessionList">
    <SessionItem
      v-for="(scheduleItem, index) in program.schedule"
      :key="scheduleItem._key"
      :index="index"
      :schedule-item="scheduleItem"
    />
  </ul>
</template>
<script>
import SessionItem from '~/components/SessionItem'
export default {
  components: {
    SessionItem
  },
  props: {
    info: {
      type: Object,
      default: () => {},
      from: {
        type: Date,
        default: () => new Date()
      }
    },
    program: {
      type: Object,
      default: () => {},
      schedule: {
        type: Array,
        default: () => []
      }
    }
  }
}
</script>

<style scoped>
@import '../styles/custom-properties.css';

.sessionList {
  margin: 0;
  padding: 0;
}
</style>
