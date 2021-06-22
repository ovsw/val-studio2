export default {
  name: 'category',
  type: 'document',
  title: 'Category',
  fieldsets: [
    {title: 'SEO Info',
      name: 'seo',
      options: {collapsible: true, collapsed: true}
    }
  ],
  fields: [
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      fieldset: 'seo'
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      fieldset: 'seo'
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'This defines the slug for this category page in the front-end.',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule =>
        Rule.required()
    }
  ]
}
