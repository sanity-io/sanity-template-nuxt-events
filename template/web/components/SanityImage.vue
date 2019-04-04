<template>
  <img :src="imageUrl" :alt="alt" />
</template>

<script>
import sanityClient from '~/sanityClient'
import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(sanityClient)

export default {
  props: {
    image: {
      type: Object,
      required: true
    },
    alt: {
      type: String,
      default: 'Missing alternative text'
    },
    width: {
      default: 200,
      type: Number
    }
  },
  computed: {
    imageUrl: function() {
      return builder.image(this.image).width(this.width)
    }
  }
}
</script>
