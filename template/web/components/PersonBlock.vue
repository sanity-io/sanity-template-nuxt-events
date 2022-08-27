<script setup>
// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['person'])

const personName = props.person?.name || 'Unknown'
const currentSlug = props.person?.slug?.current
const to = `/speakers/${currentSlug}`
</script>

<template>
  <span class="font-bold">
    <NuxtLink
      v-if="currentSlug"
      class="font-bold text-gray-600 transition-colors hover:text-gray-900 focus:outline-none focus-visible:underline focus-visible:decoration-2"
      :to="to"
    >
      {{ personName }}
    </NuxtLink>
    <span v-if="!currentSlug" class="font-medium">{{ personName }}</span>
  </span>
</template>
