import {isSameDay} from 'date-fns'

export default {
  name: 'schedule',
  type: 'object',
  title: 'Schedule',
  validation: Rule =>
    Rule.custom(schedule => {
      /**
       * Currently the frontend only supports one-day events.
       * Nothing keeps you from tweaking it though. You can then
       * refactor this validation to make sure that the from
       * date is before the to date and so on.
       */
      return isSameDay(schedule.from, schedule.to) || 'Only one-day events are supported'
    }),
  fields: [
    {
      name: 'from',
      type: 'datetime',
      title: 'From'
    },
    {
      name: 'to',
      type: 'datetime',
      title: 'To'
    }
  ]
}
