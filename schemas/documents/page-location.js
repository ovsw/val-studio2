// import {format} from 'date-fns'
import { FiFile } from "react-icons/fi";

export default {
  name: "pageLocation",
  title: "Location Page",
  type: "document",
  icon: FiFile,
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
      initialValue: "false",
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
        "the front-end requires a slug. Locaiton pages will appear on the website at www.valoansforvets.com/location/<this-slug>",
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
      title: "Custom Header Image",
      type: "simpleImage",
      description:
        "This is an optional image which, if added, will be displayed in the header of the page on the website, instead of the default one.",
    },
  ],
  orderings: [
    {
      name: "createdAt",
      title: "Created older->newer",
      by: [
        {
          field: "_createdAt",
          direction: "asc",
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
      const path = `/location/${slug.current}/`;
      return {
        title,
        subtitle: path,
      };
    },
  },
};
