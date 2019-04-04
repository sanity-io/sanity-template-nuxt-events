<template>
  <section class="container">
    <h1>{{ name }}</h1>
    <SanityImage :image="image" :v-if="image.asset" />
  </section>
</template>

<script>
import sanityClient from '~/sanityClient'
import SanityImage from '~/components/SanityImage'

const query = `
  *[_type == "person" && slug.current == $slug][0]
`

export default {
  components: {
    SanityImage
  },
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
