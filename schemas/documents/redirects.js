export default {
  name: 'redirects',
  title: 'Redirects',
  type: 'document',
  fields: [
    {
      name: 'list',
      type: 'array',
      of: [{ type: 'redirect' }]
    }
  ],
  preview: {

    prepare () {
      return { title: 'Redirects List' }
    }
  }
}