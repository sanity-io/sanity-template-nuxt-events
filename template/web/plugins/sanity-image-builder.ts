import imageUrlBuilder from '@sanity/image-url'
import type { MainImage } from '~/types/schema'

// This helper is needed when you want hotspot/crop processing to be applied, otherwise just use SanityImage
// https://github.com/sanity-io/image-url#imagesource

export default defineNuxtPlugin(() => {
  const builder = imageUrlBuilder(
    // @ts-expect-error it is what it is for now
    useSanity().config
  )
  function urlFor (source: MainImage) {
    return builder.image(source).auto('format').fit('max')
  }
  return {
    provide: { urlFor }
  }
})
