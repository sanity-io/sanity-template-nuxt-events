<script setup lang="ts">
import groq from 'groq'
import type { DereferencedProgram } from '~/types/dereferences'

const query = groq`{
  "scheduleFrom": *[_type == "eventInformation"][0].schedule.from,
  "scheduleItems": *[_id == "program"][0].schedule['break' != session->sessionType] {
    _key,
    session-> {
      _id,
      sessionType,
      title,
      summary,
    }
  },
  "scheduleDurations": *[_id == "program"][0].schedule[] { _key, duration }
}`
const sanity = useSanity()
interface QueryResult {
  scheduleFrom?: string;
  scheduleItems?: DereferencedProgram['schedule'];
  scheduleDurations?: { _key: string; duration: number }[];
}
const { data } = await useAsyncData('/sessions', () =>
  sanity.fetch<QueryResult>(query)
)

const fromDate = computed(() =>
  data.value.scheduleFrom ? new Date(data.value.scheduleFrom) : undefined
)
const fromTime = useFromTime(data.value.scheduleDurations, fromDate)

const pageTitle = useState('pageTitle')
pageTitle.value = 'Sessions'
</script>

<template>
  <Container>
    <main>
      <PageHeading>{{ pageTitle }}</PageHeading>
      <div class="mx-auto mt-16 max-w-5xl px-2">
        <SessionGrid
          v-if="data.scheduleItems"
          :schedule-items="data.scheduleItems"
          :from-time="fromTime"
        />
      </div>
    </main>
  </Container>
</template>
