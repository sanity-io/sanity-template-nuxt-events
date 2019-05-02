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
@import '../styles/custom-properties.css';

.session .persons {
  margin: 1rem 0 0;
  padding: 0;
  font-size: var(--font-small-size);
  line-height: var(--font-small-line-height);
}

.session .persons .person {
  display: flex;
  margin: 0.5rem 0 0;
  padding: 0;
  align-items: center;
}

.session .persons .person a {
  display: contents;
  color: inherit;
  text-decoration: inherit;
  line-height: 1.75;
}

.personImage {
  height: 1.75rem;
  margin-right: 0.5rem;
  border-radius: 50%;
}
</style>
