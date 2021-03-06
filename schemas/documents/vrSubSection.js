import { FaBookmark, FaVideo } from "react-icons/fa";

// import {format} from 'date-fns'

export default {
  name: "vrSubSection",
  title: "Sub-Section",
  type: "document",
  icon: FaBookmark,
  liveEdit: false,
  __experimental_actions: [
    "create",
    "update",
    "publish",
    "delete",
  ] /* 'create', 'delete' */,
  fieldsets: [
    {
      title: "SEO Info",
      name: "seo",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      fieldset: "seo",
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      fieldset: "seo",
    },
    {
      name: "seoNoIndex",
      title: "NoIndex & Hide from Sitemap",
      type: "boolean",
      fieldset: "seo",
      options: {
        layout: "checkbox",
      },
      initialValue: false,
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      validation: (Rule) =>
        Rule.error("You have to fill out the slug of the page.").required(),
      description:
        "Some frontends will require a slug to be set to be able to show the post",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "description",
      title: "Description",
      description:
        "this description appears on the section page sub-section listings, along with the title and image",
      type: "text",
      validation: (Rule) => Rule.error("Missing description").required(),
    },
    {
      name: "videoRefs",
      title: "Video Resources",
      icon: FaVideo,
      type: "array",
      of: [
        {
          type: "reference",
          title: "Video Resource Reference",
          to: [{ type: "vrVideo" }],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    // {
    //   name: 'body',
    //   title: 'Body',
    //   type: 'bodyPortableText'
    // },
    {
      name: "image",
      title: "Custom Header Image",
      type: "simpleImage",
      description:
        "This is an optional image which, if added, will be displayed in the header of the page on the website, instead of the default one.",
    },
  ],
  orderings: [
    {
      name: "createdAtOlderFirst",
      title: "Created older->newer",
      by: [
        {
          field: "_createdAt",
          direction: "asc",
        },
      ],
    },
    {
      name: "createdAtNewerFirst",
      title: "Created newer->older",
      by: [
        {
          field: "_createdAt",
          direction: "desc",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug",
    },
    prepare({ title = "No title", slug = {} }) {
      const path = `/video/${slug.current}/`;
      return {
        title,
        subtitle: path,
      };
    },
  },
};
