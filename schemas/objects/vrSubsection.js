import { FaBookmark, FaVideo } from "react-icons/fa";

export default {
  name: "vrSubSection",
  title: "Sub-Section",
  icon: FaBookmark,
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      icon: FaVideo,
      type: "string",
      validation: (Rule) => Rule.required(),
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
  ],
};
