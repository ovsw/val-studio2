import { FaArrowAltCircleRight } from "react-icons/fa";

export default {
  title: "Redirect",
  name: "redirect",
  type: "object",
  icon: FaArrowAltCircleRight,
  hidden: true,
  fields: [
    {
      name: "fromPath",
      title: "From Path",
      description: "eg: /old-url/, /old-url/sub-page/",
      type: "string",
    },
    {
      name: "toPath",
      title: "To Path",
      description: "eg: /new-url/, /new-url/sub-page/",
      type: "string",
    },
    {
      name: "isTemporary",
      title: "Is temporary (302)",
      description:
        "by default all redirects are permanent (301). If you want to create a permanent redirect (302) then turn this on, otherwise leave it off.",
      type: "boolean",
      // validation: Rule => Rule.required().error('"is permanent?" switch not set (on or off)'),
      options: {
        layout: "checkbox",
      },
    },
  ],
  preview: {
    select: {
      from: "fromPath",
      to: "toPath",
      temporary: "isTemporary",
    },
    prepare({ from, to, temporary }) {
      return {
        title: `from: ${from}`,
        subtitle: `to: ${to} (${temporary ? "302" : "301"} redirect)`,
      };
    },
  },
};
