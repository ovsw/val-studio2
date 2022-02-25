// import {format} from 'date-fns'
import { FaVideo } from "react-icons/fa";

export default {
  name: "vrVideo",
  title: "Video Resource",
  type: "document",
  icon: FaVideo,
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
      name: "description",
      title: "Description",
      description:
        "this description appears on video listings, along with the title and image",
      type: "text",
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
      name: "body",
      title: "Body",
      type: "bodyPortableText",
    },
    {
      name: "image",
      title: "Video thumbnail",
      type: "simpleImage",
      description: "This is the image that appears on the video listing page.",
      validation: (Rule) => Rule.error("Missing thumbnail image.").required(),
    },
    // {
    //   name: "image",
    //   title: "Custom Header Image",
    //   type: "simpleImage",
    //   description:
    //     "This is an optional image which, if added, will be displayed in the header of the page on the website, instead of the default one.",
    // },
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
      const path = `/video/<sub-section-slug>/${slug.current}/`;
      return {
        title,
        subtitle: path,
      };
    },
  },
};
