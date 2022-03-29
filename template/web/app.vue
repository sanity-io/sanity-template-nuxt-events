<script setup lang="ts">
import groq from 'groq'
import type { EventInformation } from '~/types/schema'

const query = groq`*[_id == "eventInformation"][0]{
  name,
  venue { city, country, name, postCode },
  ticket,
  favicon,
  keywords
}`
const sanity = useSanity()
const { data } = await useAsyncData('app', () =>
  sanity.fetch<EventInformation>(query)
)
const pageTitle = useState('pageTitle')
useMeta({
  title: computed(() => `${data.value.name} - ${pageTitle.value}`)
})
</script>

<template>
  <div class="flex min-h-screen flex-col text-gray-800 antialiased">
    <Html lang="en">
      <Head>
        <Meta
          v-if="data.description"
          name="description"
          :content="data.description"
        />
        <Meta
          v-if="data.keywords?.length"
          name="keywords"
          :content="data.keywords.join(',')"
        />
        <Link
          v-if="data.favicon"
          rel="shortcut icon"
          :href="$urlFor(data.favicon as any).size(32, 32).url()"
        />
      </Head>
    </Html>
    <TheHeader :data="data" />
    <NuxtPage />
    <TheFooter :data="data" />
  </div>
</template>
