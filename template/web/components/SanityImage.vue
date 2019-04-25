<template>
  <img :src="imageUrl" :alt="altFromImage || alt" />
</template>

<script>
/* eslint-disable vue/require-default-prop */
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
    width: Number,
    height: Number,
    auto: {
      default: 'format',
      type: String
    },
    fit: {
      default: 'max',
      type: String
    }
  },
  computed: {
    altFromImage: function() {
      return this.image.alt
    },
    imageUrl: function() {
      return builder
        .image(this.image)
        .size(this.width, this.height)
        .auto(this.auto)
        .fit(this.fit)
    }
  }
}
</script>
