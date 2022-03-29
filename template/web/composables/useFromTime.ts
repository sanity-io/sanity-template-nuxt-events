import { addMinutes } from 'date-fns'
import { unref, computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { SanityKeyed, ScheduleItem } from '~/types/schema'

type ScheduleItems = Array<SanityKeyed<Pick<ScheduleItem, 'duration'>>>;
export function useFromTime (
  scheduleItemsRef: ScheduleItems | ComputedRef<ScheduleItems> = [],
  fromDateRef?: Date | ComputedRef<Date | undefined> | undefined
) {
  return computed(() => {
    const scheduleItems = unref(scheduleItemsRef)
    const fromDate = unref(fromDateRef)

    const map = new Map<string, Date>()
    if (!fromDate) {
      return map
    }

    let fromTime = fromDate
    for (const scheduleItem of scheduleItems) {
      if (scheduleItem.duration && scheduleItem.duration > 0) {
        map.set(scheduleItem._key, fromTime)
        fromTime = addMinutes(fromTime, scheduleItem.duration)
      }
    }

    return map
  })
}
