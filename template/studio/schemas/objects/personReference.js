export default {
  name: 'personReference',
  type: 'object',
  title: 'Person reference',
  fields: [
    {
      type: 'reference',
      name: 'person',
      to: [
        {
          type: 'person'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'person.name',
      media: 'person.image.asset'
    }
  }
}
