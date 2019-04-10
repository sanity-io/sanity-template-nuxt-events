<template>
  <section class="container">
    <h1>Code of conduct</h1>
    <BlockContent v-if="body" :blocks="body" :serializers="serializers" />
  </section>
</template>

<script>
import sanityClient from '~/sanityClient'
import BlockContent from 'sanity-blocks-vue-component'

const query = `
  *[_id == "codeOfConduct"][0] {
    body[] {
      ...,
      children[] {
        ...,
        event->
      }
    }
  }
`
const serializers = {
  types: {
    eventReference: props => {
      console.log('eventReference', props)
      return `"${props.node.event.name}"`
    },
    personReference: () => {
      return 'personReference'
    }
  }
}

export default {
  components: {
    BlockContent
  },
  data: () => {
    return {
      serializers: serializers
    }
  },
  async asyncData() {
    return await sanityClient.fetch(query)
  }
}
</script>

<style scoped>
.container {
  max-width: 40rem;
}
</style>
