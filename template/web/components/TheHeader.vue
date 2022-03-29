<script setup lang="ts">
import type { EventInformation } from '~/types/schema'

interface Props {
  data: Pick<EventInformation, 'name' | 'ticket'>;
}
const { data } = defineProps<Props>()
</script>

<template>
  <header
    class="mx-auto w-full max-w-5xl items-center justify-between p-6 sm:flex"
  >
    <NuxtLink
      class="focus:outline-none focus-visible:underline focus-visible:decoration-2"
      to="/"
    >
      <h1 class="text-lg font-semibold text-gray-600">
        {{ data.name }}
      </h1>
    </NuxtLink>
    <nav>
      <NuxtLink
        to="/sessions"
        class="block py-2 text-base text-gray-500 transition-colors hover:text-gray-900 focus:outline-none focus-visible:underline focus-visible:decoration-2 sm:inline-block sm:px-5"
        active-class="underline"
      >
        Sessions
      </NuxtLink>
      <NuxtLink
        to="/speakers"
        class="block py-2 text-base text-gray-500 transition-colors hover:text-gray-900 focus:outline-none focus-visible:underline focus-visible:decoration-2 sm:inline-block sm:px-5"
        active-class="underline"
      >
        Speakers
      </NuxtLink>
      <ExternalLink
        v-if="data.ticket"
        :href="data.ticket"
        class="block py-2 text-base text-gray-500 transition-colors hover:text-gray-900 focus:outline-none focus-visible:underline focus-visible:decoration-2 sm:inline-block sm:pl-5 sm:pr-0"
      >
        Tickets
      </ExternalLink>
    </nav>
  </header>
</template>
