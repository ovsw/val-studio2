export default {
  widgets: [
    // { name: "structure-menu" },
    {
      name: "project-info",
      options: {
        __experimental_before: [
          {
            name: "netlify",
            options: {
              description:
                "NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.",
              sites: [
                {
                  buildHookId: "60d9de3e7985049c8ac39908",
                  title: "VaLoansForVets.com Development Copy",
                  name: "valoansforvets2",
                  apiId: "ca80c852-f673-413d-8a7d-3004d366fc61",
                },
              ],
            },
          },
        ],
        data: [
          {
            title: "Frontend",
            value: "https://valoansforvets2.netlify.com",
            category: "apps",
          },
        ],
      },
    },
    { name: "project-users", layout: { height: "auto" } },
    // {
    //   name: "document-list",
    //   options: {
    //     title: "Recent blog posts",
    //     order: "_createdAt desc",
    //     types: ["post"],
    //   },
    //   layout: { width: "medium" },
    // },
    // {
    //   name: "sanity-tutorials",
    //   options: {
    //     templateRepoId: "sanity-io/sanity-template-gatsby-blog",
    //   },
    // },
  ],
};
