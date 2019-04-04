<template>
  <section class="container">
    <h1>{{ title }}</h1>
    <h2>
      By
      <nuxt-link :to="`/speakers/${person.slug.current}`">
        {{ person.name }}
      </nuxt-link>
    </h2>
  </section>
</template>

<script>
import sanityClient from '~/sanityClient'

const query = `
  *[_type == "session" && _id == $id] {
    ..., person->
  }[0]
`

export default {
  components: {},
  async asyncData({ params }) {
    return await sanityClient.fetch(query, params)
  }
}
</script>

<style>
.container {
  border: 1px solid red;
}
</style>
