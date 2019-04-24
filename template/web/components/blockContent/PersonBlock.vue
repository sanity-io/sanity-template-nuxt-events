<template>
  <span>
    <nuxt-link v-if="currentSlug" :to="{ path: `/speakers/${currentSlug}` }">
      <b>{{ personName }} </b>
    </nuxt-link>
    <b v-if="!currentSlug">{{ personName }} </b>
  </span>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      default: () => {
        return { name: 'Unknown' }
      }
    }
  },
  computed: {
    personName: props => {
      console.log(props.person)
      return props.person.name
    },
    currentSlug: ({ person }) => {
      const { slug } = person
      console.log('slug', slug)
      if (slug && slug.current) {
        return slug.current
      }
    }
  }
}
</script>
