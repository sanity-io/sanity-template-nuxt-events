<script setup lang="ts">
import groq from 'groq'
import type { EventInformation } from '~/types/schema'
import type { DereferencedProgram } from '~/types/dereferences'

const query = groq`
  {
    "info": *[_id == "eventInformation"][0] {
      name,
      description,
      schedule { from, to },
      venue { name, city },
      image,
    },
    "schedule": *[_id == "program"][0].schedule[] {
      _key,
      duration,
      session-> {
        _id,
        sessionType,
        title,
        summary,
        persons[] {
          _key,
          person-> {
            slug,
            name,
            image
          }
        }
      }
    }
  }
`
interface QueryResult {
  info?: EventInformation;
  schedule?: DereferencedProgram['schedule'];
}

const sanity = useSanity()
const { data } = await useAsyncData('/', () =>
  sanity.fetch<QueryResult>(query)
)

const fromDate = computed(() =>
  data.value.info?.schedule?.from
    ? new Date(data.value.info.schedule.from)
    : undefined
)
const toDate = computed(() =>
  data.value.info?.schedule?.to
    ? new Date(data.value.info.schedule.to)
    : undefined
)
const fromTime = useFromTime(data.value.schedule, fromDate)

const pageTitle = useState('pageTitle')
pageTitle.value = data.value.info?.description
</script>

<template>
  <main class="py-4">
    <article class="px-6 text-center">
      <PageHeading>{{ data.info?.name }}</PageHeading>
      <p class="text-xl">
        {{ data.info?.description }}
      </p>
      <div class="pt-16 pb-20">
        <p v-if="fromDate && toDate" class="font-semibold">
          {{ $format(fromDate, 'dd MMMM ha') }}
          &ndash;
          {{ $format(toDate, 'ha') }}
        </p>
        <p class="text-sm">
          {{ data.info?.venue?.name }}, {{ data.info?.venue?.city }}
        </p>
      </div>
    </article>

    <figure v-if="data.info?.image?.asset" class="mb-12">
      <img
        :src="$urlFor(data.info.image).size(1800, 500).url()"
        :alt="data.info.image.alt"
        height="500"
        width="1800"
        loading="lazy"
        class="w-full align-top"
      >
      <figcaption class="px-6 py-1 text-sm">
        {{ data.info.image.caption }}
      </figcaption>
    </figure>

    <div v-if="data.schedule" class="mx-auto max-w-2xl px-6">
      <h2 class="mt-2 mb-12 text-center text-2xl font-semibold sm:text-5xl">
        Schedule
      </h2>
      <ScheduleItems
        v-if="data.schedule"
        :schedule-items="data.schedule"
        :from-time="fromTime"
      />
    </div>
  </main>
</template>
