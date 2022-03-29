<script setup lang="ts">
import type { EventInformation } from '~/types/schema'

interface Props {
  data: Pick<EventInformation, 'venue' | 'ticket'>;
}
const { data } = defineProps<Props>()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
    <nav class="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
      <NuxtLink
        to="/"
        class="inline-block px-2 py-2 text-sm text-gray-500 hover:text-gray-900 focus:outline-none focus-visible:underline focus-visible:decoration-2 sm:px-5 sm:text-base"
      >
        Home
      </NuxtLink>
      <NuxtLink
        to="/sessions"
        class="inline-block px-2 py-2 text-sm text-gray-500 hover:text-gray-900 focus:outline-none focus-visible:underline focus-visible:decoration-2 sm:px-5 sm:text-base"
      >
        Sessions
      </NuxtLink>
      <NuxtLink
        to="/speakers"
        class="inline-block px-2 py-2 text-sm text-gray-500 hover:text-gray-900 focus:outline-none focus-visible:underline focus-visible:decoration-2 sm:px-5 sm:text-base"
      >
        Speakers
      </NuxtLink>
      <NuxtLink
        to="/code-of-conduct"
        class="inline-block px-2 py-2 text-sm text-gray-500 hover:text-gray-900 focus:outline-none focus-visible:underline focus-visible:decoration-2 sm:px-5 sm:text-base"
      >
        Code of conduct
      </NuxtLink>
      <NuxtLink
        v-if="data?.ticket"
        :to="data.ticket"
        class="inline-block px-2 py-2 text-sm text-gray-500 hover:text-gray-900 focus:outline-none focus-visible:underline focus-visible:decoration-2 sm:px-5 sm:text-base"
      >
        Tickets
      </NuxtLink>
    </nav>
    <p v-if="data?.venue" class="mt-8 grid justify-center">
      <span class="text-lg font-medium text-gray-900">{{
        data.venue.name
      }}</span>
      <span class="text-gray-500">{{ data.venue.postCode }} {{ data.venue.city }}</span>
      <span class="text-gray-500">{{ data.venue.country }}</span>
    </p>
    <p class="mt-8 text-center text-sm text-gray-400 sm:text-base">
      Powered by
      <ExternalLink
        class="group px-1 transition-colors hover:text-gray-500 focus:outline-none focus-visible:text-gray-900 active:text-gray-900"
        href="https://v3.nuxtjs.org"
      >
        <NuxtLogo
          class="h-6 -translate-y-0.5 grayscale transition group-hover:grayscale-0 group-focus:grayscale-0"
        />
        Nuxt3
      </ExternalLink>
      and
      <ExternalLink
        class="group px-1 transition-colors hover:text-gray-500 focus:outline-none focus-visible:text-gray-900 active:text-gray-900"
        href="https://www.sanity.io/"
      >
        <SanityLogo
          class="h-5 -translate-y-[1.5px] opacity-75 grayscale transition group-hover:opacity-100 group-hover:grayscale-0 group-focus:grayscale-0"
        />
        Sanity
      </ExternalLink>
      &copy; {{ year }}
    </p>
  </footer>
</template>
