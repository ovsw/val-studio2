import {format} from 'date-fns'

export default {
  name: 'post',
  type: 'document',
  title: 'Blog Post',
  fieldsets: [
    {title: 'SEO Info',
      name: 'seo',
      options: {collapsible: true, collapsed: false}
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
      title: 'Title',
      description: 'Titles should be catchy, descriptive, and not too long',
      validation: Rule =>
        Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the post',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule =>
        Rule.required()
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      description: 'This can be used to schedule post for publishing',
      validation: Rule =>
        Rule.required()
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Main image',
      validation: Rule =>
        Rule.required()
    },
    {
      name: 'excerpt',
      type: 'excerptPortableText',
      title: 'Excerpt',
      description:
        'This ends up on summary pages, on Google, when people share your post in social media.',
      validation: Rule =>
        Rule.required()
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      hidden: 'true',
      of: [
        {
          type: 'authorReference'
        }
      ]
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Category',
      of: [
        {
          type: 'reference',
          to: {
            type: 'category'
          }
        }
      ],
      validation: Rule =>
        [
          Rule.required().min(1).error('Category is required'),
          Rule.max(1).error("Post can't belong to more than one category!")
        ]
    },
    {
      name: 'body',
      type: 'bodyPortableText',
      title: 'Body'
    }
  ],
  orderings: [
    {
      name: 'publishingDateAsc',
      title: 'Publishing date new–>old',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    },
    {
      name: 'publishingDateDesc',
      title: 'Publishing date old->new',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      slug: 'slug',
      media: 'mainImage'
    },
    prepare ({title = 'No title', publishedAt, slug = {}, media}) {
      // const dateSegment = format(publishedAt, 'YYYY/MM')
      const displayDate = publishedAt
        ? format(new Date(publishedAt), "MMM do, y")
        : "Missing publishing date";
      // const path = `/${dateSegment}/${slug.current}/`
      const path = `/${slug.current}/`

      return {
        title,
        media,
        description: publishedAt ? path : 'Missing publishing date',
        subtitle: displayDate
      }
    },
  }
}
