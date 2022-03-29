<script setup lang="ts">
import type { DereferencedProgram } from '~/types/dereferences'
interface Props {
  scheduleItems: DereferencedProgram['schedule'];
  fromTime: Map<string, Date>;
}

const { scheduleItems, fromTime } = defineProps<Props>()
</script>

<template>
  <ul
    class="m-0 grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-12 p-0"
  >
    <li
      v-for="scheduleItem in scheduleItems"
      :key="scheduleItem._key"
      class="flex flex-col"
    >
      <NuxtLink
        v-if="scheduleItem.session"
        :to="`/sessions/${scheduleItem.session._id}`"
      >
        <span class="flex justify-between">
          <span>
            <span class="block text-sm uppercase tracking-[.5px]">{{
              scheduleItem.session.sessionType
            }}</span>
            <h2 class="mt-2 text-xl font-semibold">
              {{ scheduleItem.session.title }}
            </h2>
          </span>
          <time
            v-if="fromTime.has(scheduleItem._key)"
            class="text-sm text-[#697a90]"
            :title="$format(fromTime.get(scheduleItem._key) as Date, 'MMMM dd yyyy h:mm a')"
          >
            {{ $format(fromTime.get(scheduleItem._key) as Date, "h:mm a") }}
          </time>
        </span>
        <p class="my-2">
          {{ scheduleItem.session.summary }}
        </p>
      </NuxtLink>
    </li>
  </ul>
</template>
