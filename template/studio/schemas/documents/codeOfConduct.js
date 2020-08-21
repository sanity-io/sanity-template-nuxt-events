export default {
  name: 'codeOfConduct',
  type: 'document',
  title: 'Code of Conduct',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'body',
      description:
        'A code of conduct is one of several things that helps you to make sure that all participants will have a great time!',
      type: 'bodyPortableText',
      title: 'Code of Conduct'
    }
  ],
  preview: {
    select: {
      body: 'body'
    },
    prepare ({body = []}) {
      const block = body.find(block => block._type === 'block')
      return {
        title: block
          ? block.children
            .filter(child => child._type === 'span')
            .map(span => span.text)
            .join('')
          : 'No title'
      }
    }
  }
}
