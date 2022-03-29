<script setup lang="ts">
import type { DereferencedSession } from '~/types/dereferences'
interface Props {
  persons: DereferencedSession['persons'];
}
const { persons } = defineProps<Props>()
</script>

<template>
  <ul v-if="persons" class="mt-4 p-0 text-sm">
    <li
      v-for="personRef in persons"
      :key="personRef._key"
      class="mt-2 flex items-center p-0"
    >
      <NuxtLink
        v-if="personRef.person?.slug?.current"
        :to="{ path: `/speakers/${personRef.person.slug.current}` }"
        class="contents text-inherit decoration-inherit"
      >
        <SanityImage
          v-if="personRef.person.image?.asset?._ref"
          :asset-id="personRef.person.image.asset._ref"
          :alt="personRef.person.image.alt || ''"
          w="56"
          h="56"
          fit="crop"
          auto="format"
          class="mr-2 h-7 rounded-full"
        />
        {{ personRef.person.name || 'Untitled' }}
      </NuxtLink>
    </li>
  </ul>
</template>
