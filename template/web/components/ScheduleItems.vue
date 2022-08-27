<script setup lang="ts">
import type { DereferencedProgram } from '~/types/dereferences'
interface Props {
  scheduleItems: DereferencedProgram['schedule'];
  fromTime: Map<string, Date>;
}
const { scheduleItems = [], fromTime } = defineProps<Props>()
</script>

<template>
  <div class="contents">
    <article
      v-for="scheduleItem in scheduleItems"
      :key="scheduleItem._key"
      class="mb-16 sm:flex sm:items-baseline"
    >
      <div
        class="mb-2 flex min-w-[10rem] justify-between overflow-hidden text-right capitalize text-[#697a90] sm:mr-4 sm:mb-0 sm:w-40 sm:flex-col sm:pr-4"
      >
        <div
          v-if="fromTime.has(scheduleItem._key)"
          class="text-sm sm:mb-2 sm:text-xl"
        >
          {{ $format(fromTime.get(scheduleItem._key) as Date, 'h.mma') }}
        </div>
        <div class="text-right text-sm sm:text-base">
          {{ scheduleItem.session?.sessionType }} &middot;
          {{ scheduleItem.duration }}min
        </div>
      </div>
      <div class="sm:flex-grow">
        <h3 class="mb-2 text-xl font-semibold">
          <NuxtLink
            v-if="scheduleItem.session?._id"
            class="text-inherit"
            :to="{ path: `/sessions/${scheduleItem.session._id}` }"
          >
            {{ scheduleItem.session.title || 'Untitled' }}
          </NuxtLink>
          <a v-else>Untitled</a>
        </h3>
        <p class="m-0">
          {{ scheduleItem.session?.summary }}
        </p>
        <PersonsList
          v-if="scheduleItem.session?.persons"
          :persons="scheduleItem.session.persons"
        />
      </div>
    </article>
  </div>
</template>
