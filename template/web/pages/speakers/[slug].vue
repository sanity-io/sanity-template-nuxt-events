<script setup lang="ts">
import groq from 'groq'
import type { Person } from '~/types/schema'
import type { DereferencedProgram } from '~/types/dereferences'

const route = useRoute()
const query = groq`{
  "speaker": *[_type == "person" && slug.current == $slug][0]{ name, image, bio },
  "scheduleFrom": *[_type == "eventInformation"][0].schedule.from,
  "schedule": *[_id == "program"][0].schedule[$slug in session->persons[].person->slug.current] {
    _key,
    duration,
    session-> {
      _id,
      sessionType,
      title,
      summary,
      persons[^.sessionType == 'panel'] {
        _key,
        person-> {
          slug,
          name,
          image
        }
      }
    }
  },
  "scheduleDurations": *[_id == "program"][0].schedule[] { _key, duration }
}`
const sanity = useSanity()
interface QueryResult {
  speaker?: Person;
  scheduleFrom?: string;
  schedule?: DereferencedProgram['schedule'];
  scheduleDurations?: { _key: string; duration: number }[];
}
const { data } = await useAsyncData(`/speakers/${route.params.slug}`, () =>
  sanity.fetch<QueryResult>(query, { slug: route.params.slug })
)

const fromDate = computed(() =>
  data.value.scheduleFrom ? new Date(data.value.scheduleFrom) : undefined
)
const fromTime = useFromTime(data.value.scheduleDurations, fromDate)

const pageTitle = useState('pageTitle')
pageTitle.value = data.value.speaker?.name
</script>

<template>
  <Container>
    <main v-if="data?.speaker" class="px-2">
      <SanityImage
        v-if="data.speaker.image?.asset?._ref"
        class="mx-auto mb-5 aspect-square w-[50vw] max-w-xs rounded-full"
        :asset-id="data.speaker.image.asset._ref"
        :alt="data.speaker.image.alt || ''"
        h="320"
        fit="crop"
        w="320"
        auto="format"
      />
      <PageHeading>{{ data.speaker?.name || 'Untitled' }}</PageHeading>
      <article class="mt-2 text-center text-lg">
        <PortableText
          v-if="data.speaker?.bio"
          :blocks="(data.speaker.bio as any)"
        />
      </article>
      <div class="pt-8">
        <h2 class="my-6 text-center text-2xl font-semibold">
          Sessions
        </h2>
        <ScheduleItems
          v-if="data.schedule"
          :schedule-items="data.schedule"
          :from-time="fromTime"
        />
      </div>
    </main>
    <PageHeading v-else>
      404 Not Found
    </PageHeading>
  </Container>
</template>
