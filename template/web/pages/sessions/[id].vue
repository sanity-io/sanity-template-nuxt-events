<script setup lang="ts">
import groq from 'groq'
import type { Session } from '~/types/schema'

const route = useRoute()
const query = groq`
  *[_type == "session" && _id == $id] {
    _id,
    image,
    sessionType,
    title,
    summary,
    description[] {
      ...,
      children[] {
        ...,
        person->
      }
    },
  }[0]
`
const sanity = useSanity()
const { data } = await useAsyncData(`/sessions/${route.params.id}`, () =>
  sanity.fetch<Session>(query, { id: route.params.id })
)

const pageTitle = useState('pageTitle')
pageTitle.value = data.value?.title
</script>

<template>
  <main v-if="data?._id">
    <img
      v-if="data?.image"
      :src="$urlFor(data.image).size(1920, 1080).url()"
      :alt="data.image.alt || ''"
      height="1080"
      width="1920"
      loading="lazy"
      class="w-full align-top"
    >
    <div class="mx-auto max-w-2xl p-6 pb-12">
      <p class="m-0 mb-12 block text-xs uppercase tracking-[.5px] sm:text-sm">
        {{ data?.sessionType }}
      </p>
      <h1 class="mb-2 text-2xl font-semibold sm:text-5xl">
        {{ data?.title }}
      </h1>
      <p class="mx-0 mt-2 mb-8 text-lg">
        {{ data?.summary }}
      </p>
      <PortableText
        v-if="data?.description"
        :blocks="(data.description as any)"
      />
    </div>
  </main>
  <PageHeading v-else>
    404 Not Found
  </PageHeading>
</template>
