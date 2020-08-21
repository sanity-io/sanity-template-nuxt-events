export default {
  name: 'program',
  type: 'document',
  title: 'Program',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'schedule',
      type: 'array',
      title: 'Schedule',
      of: [{type: 'scheduleItem'}]
    }
  ],
  preview: {
    select: {
      schedule: 'schedule'
    },
    prepare ({schedule}) {
      const sessionTotal = schedule.length
      return {
        title: `The program - ${sessionTotal} session${sessionTotal > 1 && 's'}`
      }
    }
  }
}
