export default {
  widgets: [
    // { name: "structure-menu" },
    {
      name: "gatsby",
      options: { sites: [{ siteUrl: "https://google.com/" }] },
    },
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
                  buildHookId: "5d564ded6c60475c5ab48f19",
                  title: "VaLoansForVets.com",
                  name: "valoansforvets2",
                  apiId: "6d1af887-72d0-488d-b257-57b3ee8fcd3d",
                },
              ],
            },
          },
        ],
        data: [
          {
            title: "Frontend",
            value: "https://www.valoansforvets.com",
            category: "apps",
          },
        ],
      },
    },
    { name: "project-users", layout: { height: "auto" } },
    {
      name: "gatsby-cloud-start-preview",
      options: {
        sites: [{ siteUrl: "https://preview-valoansforvets.gtsb.io/" }],
      },
      layout: "wide",
    },
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
