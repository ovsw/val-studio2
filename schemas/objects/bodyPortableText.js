import React from "react";
import { FaLink, FaExternalLinkAlt } from "react-icons/fa";

const internalLinkRender = (props) => <a>{props.children}</a>;

const buttonRender = (props) => (
  <button
    style={{
      backgroundColor: "lightgray",
      display: "inline-block",
      padding: "1rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    {props.children}
  </button>
);


export default {
  name: 'bodyPortableText',
  type: 'array',
  title: 'Post body',
  of: [
    {
      type: 'block',
      title: 'Block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'}
      ],
      lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Number', value: 'number'}],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [{title: 'Strong', value: 'strong'}, {title: 'Emphasis', value: 'em'}],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: "internalLink",
            type: "object",
            title: "Internal Link",
            blockEditor: {
              icon: FaLink,
              render: internalLinkRender,
            },
            fields: [
              {
                name: "reference",
                type: "reference",
                title: "Reference",
                to: [
                  { type: "page" },
                  { type: "post" },
                  // other types you may want to link to
                ],
                validation: Rule => Rule.required().error("internal link is missing a destination.")
              },
            ],
          },
          {
            name: 'link',
            type: 'object',
            title: 'External Link',
            icon: FaExternalLinkAlt,
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: Rule =>
                  Rule.required().uri({scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true})
              }
            ]
          },
          {
            name: "button",
            type: "object",
            title: "Button",
            blockEditor: {
              icon: () => "Btn",
              render: buttonRender,
            },
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) =>
                  Rule.required().uri({
                    scheme: ["http", "https", "mailto", "tel"],
                    allowRelative: true,
                  }),
              },
              {
                title: "Open in new window",
                name: "blank",
                type: "boolean",
              },
            ],
          },
        ]
      }
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: 'mainImage',
      options: {hotspot: true}
    },
    {
      type: 'youtube'
    },
    {
      type: 'mytable'
    },
    {
      type: 'iframeEmbed'
    }
  ]
}
