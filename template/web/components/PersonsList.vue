<template>
  <ul v-if="persons" class="persons">
    <li v-for="personRef in persons" :key="personRef.person._id" class="person">
      <nuxt-link :to="{ path: `/speakers/${personRef.person.slug.current}` }">
        <SanityImage
          :image="personRef.person.image"
          :alt="personRef.person.image.alt"
          :width="128"
          :height="128"
          fit="crop"
          class="personImage"
        />
        {{ personRef.person.name }}
      </nuxt-link>
    </li>
  </ul>
</template>
<script>
import SanityImage from '~/components/SanityImage'

export default {
  components: {
    SanityImage
  },
  props: {
    persons: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style scoped>
.session .persons {
  color: #666;
  display: flex;
  margin: 0;
  padding: 0;
  font-size: 0.8em;
}

.session .persons .person {
  display: flex;
  margin: 0;
  padding: 0;
  margin-right: 2em;
  margin-top: 2em;
  align-items: center;
}

.session .persons .person a {
  display: contents;
  color: inherit;
  text-decoration: inherit;
}

.personImage {
  height: 2em;
  margin-right: 0.5em;
  border-radius: 50%;
}
</style>
