<script setup lang="ts">
import groq from 'groq'
import type { Person } from '~/types/schema'

const query = groq`*[_type == "person"]{ _id, name, slug, image }`
const sanity = useSanity()
const { data } = await useAsyncData('/speakers', () =>
  sanity.fetch<Person[]>(query)
)

const pageTitle = useState('pageTitle')
pageTitle.value = 'Speakers'
</script>

<template>
  <Container>
    <main>
      <PageHeading>{{ pageTitle }}</PageHeading>
      <ul
        class="mx-auto mt-24 space-y-16 text-center sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:max-w-5xl lg:grid-cols-3"
      >
        <li v-for="person in data" :key="person._id">
          <NuxtLink
            v-if="person.slug"
            class="space-y-6"
            :to="{ path: `/speakers/${person.slug.current}` }"
          >
            <SanityImage
              v-if="person.image?.asset?._ref"
              class="mx-auto aspect-square h-40 w-40 rounded-full xl:h-56 xl:w-56"
              :asset-id="person.image.asset._ref"
              :alt="person.image.alt || ''"
              fit="crop"
              h="220"
              w="220"
              auto="format"
            />
            <div class="space-y-2">
              <div class="space-y-1 text-lg font-medium leading-6">
                <h3>{{ person.name || 'Untitled' }}</h3>
              </div>
            </div>
          </NuxtLink>
          <a v-else>{{ person.name || 'Untitled' }}</a>
        </li>
      </ul>
    </main>
  </Container>
</template>
