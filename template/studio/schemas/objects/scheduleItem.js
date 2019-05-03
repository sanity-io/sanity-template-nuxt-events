export default {
  name: 'scheduleItem',
  type: 'object',
  title: 'Schedule item',
  fields: [
    {
      name: 'session',
      type: 'reference',
      title: 'Session',
      to: [
        {
          type: 'session'
        }
      ]
    },
    {
      name: 'duration',
      type: 'number',
      title: 'Duration',
      description: 'Duration (in minutes)'
    }
  ],
  preview: {
    select: {
      session: 'session.title',
      sessionType: 'session.sessionType',
      duration: 'duration'
    },
    prepare ({session, sessionType, duration}) {
      return {
        title: session,
        subtitle: `${sessionType} - ${duration} ${duration.length > 1 ? 'mins' : 'min'}`
      }
    }
  }
}
