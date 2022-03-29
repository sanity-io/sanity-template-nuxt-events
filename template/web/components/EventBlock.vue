<script setup>
// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['event'])
</script>

<template>
  <NuxtLink
    class="font-bold text-gray-600 transition-colors hover:text-gray-900 focus:outline-none focus-visible:underline focus-visible:decoration-2"
    to="/"
  >
    {{ props.event?.name || 'This event' }}
  </NuxtLink>
</template>
