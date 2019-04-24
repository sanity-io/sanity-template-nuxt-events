<template>
  <nuxt-link to="/">
    <b>{{ eventName }}</b>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      default: () => {
        return { name: 'This event' }
      }
    }
  },
  computed: {
    eventName: props => {
      return props.event.name
    }
  }
}
</script>
