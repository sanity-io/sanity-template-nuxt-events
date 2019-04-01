export default {
  name: 'session',
  type: 'document',
  title: 'Session',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'person',
      type: 'reference',
      title: 'Person',
      description: 'Who is responsible for this session?',
      to: [{ type: 'person'}]
    },
    {
      name: 'sessionType',
      type: 'string',
      title: 'Session type',
      options: {
        list: [
          { value: 'keynote', title: 'Keynote' },
          { value: 'talk', title: 'Talk' },
          { value: 'break', title: 'Break' },
          { value: 'firesideChat', title: 'Fireside Chat' },
          { value: 'panel', title: 'Panel' }
        ]
      }
    },
    {
      name: 'summary',
      type: 'text',
      title: 'Short summary',
      description: 'For previews, social media etc.'
    },
    {
      name: 'description',
      type: 'bodyPortableText',
      title: 'Description'
    },
  ],
  preview: {
    select: {
      title: 'title',
      sessionType: 'sessionType',
      person: 'person.name',
      media: 'person.image'
    },
    prepare ({title, media, sessionType, person}) {
      return {
      title,
      media,
      subtitle: `${sessionType} ${person ? `- ${person}` : ''}`
    }
  }
  },

}
