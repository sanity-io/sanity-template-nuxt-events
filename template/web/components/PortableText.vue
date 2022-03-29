<script setup lang="ts">
import type { PortableTextBlock } from '@portabletext/types'
import imageUrlBuilder from '@sanity/image-url'
import { defineComponent } from 'vue'
import EventBlock from '~/components/EventBlock.vue'
import PersonBlock from '~/components/PersonBlock.vue'
import ExternalLink from '~/components/ExternalLink.vue'

const builder = imageUrlBuilder(
  // @ts-expect-error it is what it is for now
  useSanity().config
)
const serializers = {
  types: {
    image: defineComponent({
      // eslint-disable-next-line vue/require-prop-types
      props: ['asset'],
      setup (props) {
        return () =>
          h('img', {
            src: builder.image(props.asset).auto('format').url(),
            class: 'my-3'
          })
      }
    }),
    eventReference: EventBlock,
    personReference: PersonBlock,
    link: ExternalLink
  }
}

// eslint-disable-next-line vue/require-prop-types
interface Props {
  blocks: PortableTextBlock[];
}
const { blocks = [] } = defineProps<Props>()
</script>

<template>
  <div class="portable-text">
    <SanityContent :blocks="blocks" :serializers="serializers" />
  </div>
</template>

<style scoped>
.portable-text {
  :deep(a:not([class])) {
    @apply text-gray-500 underline hover:text-gray-900 focus:outline-none focus-visible:decoration-2;
  }
  :deep(h1) {
    @apply pt-8 pb-5 text-4xl font-bold;
  }
  :deep(h2) {
    @apply py-5 text-3xl font-bold;
  }
  :deep(h3) {
    @apply pt-5 pb-3 text-2xl font-bold;
  }
  :deep(h4) {
    @apply pt-5 pb-3 text-xl font-bold;
  }
  :deep(blockquote) {
    @apply relative pt-2 pb-3 pl-3 before:absolute before:top-2 before:bottom-3 before:left-0 before:my-0.5 before:block before:w-[3px] before:bg-gray-300 before:content-[''];
  }
  :deep(ul),
  :deep(ol) {
    @apply mt-2 py-2 pl-8;
  }
  :deep(ul) {
    @apply list-disc;
  }
  :deep(ol) {
    @apply list-decimal;
  }
  :deep(p:empty) {
    @apply mt-12 block;
  }
  :deep(p) {
    @apply mx-0 mb-4 block;
  }
}
</style>
