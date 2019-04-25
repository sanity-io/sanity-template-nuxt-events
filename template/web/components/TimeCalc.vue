<template>
  <span>{{ fromTime | dateFilter('h.mma') }}</span>
</template>

<script>
import { dateFilter } from 'vue-date-fns'
export default {
  filters: {
    dateFilter
  },
  props: {
    fromTime: {
      type: Date,
      default: () => new Date()
    },
    duration: {
      type: Number,
      default: 0
    }
  }
}
</script>
