import React from "react";
import S from "@sanity/desk-tool/structure-builder";
import {
  MdSettings,
  MdPerson,
  MdFolder,
  MdBook,
  MdList,
  MdArrowForward,
  MdEdit,
  MdVisibility,
} from "react-icons/md";
import { FaBook } from "react-icons/fa";

const hiddenDocTypes = (listItem) =>
  !["category", "author", "post", "siteSettings"].includes(listItem.getId());

const url = "https://preview-valoansforvets.gtsb.io/";

const WebPreview = ({ document }) => {
  const { displayed } = document;
  const slug = displayed.slug?.current;

  if (!slug) {
    //  home page has no slug - special affordance
    if (displayed._type == "siteHome") {
      return (
        <iframe
          src={`https://preview-valoansforvets.gtsb.io/`}
          frameBorder={0}
          width="100%"
          height="100%"
        />
      );
    }
    // ask for a slug
    return <h1>Please set a slug to see a preview</h1>;
  }

  // get url path prefix for each content type
  const pathPrefixes = {
    page: "",
    post: "",
    pageSupport: "",
    pageSimple: "",
  };
  const pathPrefix = pathPrefixes[displayed._type];

  const targetURL = url + pathPrefix + slug;
  return <iframe src={targetURL} frameBorder={0} width="100%" height="100%" />;
};

export const getDefaultDocumentNode = ({ schemaType }) => {
  // Only show the iframe for documents for which a preview makes sense.
  if (
    schemaType === "page" ||
    schemaType === "siteHome" ||
    schemaType === "post"
  ) {
    return S.document().views([
      // default form
      S.view.form().icon(MdEdit),
      // custom preview component we built above
      S.view.component(WebPreview).title("Web Preview").icon(MdVisibility),
    ]);
  }
};

export default () =>
  S.list()
    .title("Website Content")
    .items([
      S.listItem()
        .title("Settings")
        .icon(MdSettings)
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      S.divider(),
      S.listItem()
        .icon(MdBook)
        .title("Blog posts")
        .schemaType("post")
        .child(S.documentTypeList("post").title("Blog posts")),
      S.listItem()
        .icon(MdList)
        .title("Blog Posts by Category")
        .child(
          S.documentList()
            .title("Categories")
            .menuItems(S.documentTypeList("category").getMenuItems())
            .filter("_type == $type")
            .params({ type: "category" })
            .child((categoryId) =>
              S.documentList()
                .title("Posts")
                .menuItems(S.documentTypeList("post").getMenuItems())
                .filter("_type == $type && $categoryId in categories[]._ref")
                .params({ type: "post", categoryId })
            )
        ),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.documentListItem()
                .id("mystory")
                .title("My Story")
                .schemaType("page"),
              S.documentListItem()
                .id("vaHomeLoans")
                .title("VA Home Loans")
                .schemaType("page"),
              S.listItem()
                .title("VA Home Loans Sub-Pages")
                .id("vaHomeLoansPages")
                .child(
                  S.documentList()
                    .id("loanInfoPages")
                    .title("Loan info Sub-Pages")
                    .menuItems(S.documentTypeList("page").getMenuItems())
                    .filter("_type == $type && references($parentId)")
                    .params({ type: "page", parentId: "vaHomeLoans" })
                    .defaultOrdering([
                      { field: "_createdAt", direction: "asc" },
                    ])
                )
                .icon(MdFolder),
              S.documentListItem()
                .id("apply")
                .title("Apply")
                .schemaType("page"),
              S.documentListItem()
                .id("media")
                .title("Media")
                .schemaType("page"),
              S.documentListItem()
                .id("loanInfo")
                .title("Loan Information")
                .schemaType("page"),
              S.listItem()
                .title("Loan Info Sub-Pages")
                .child(
                  S.documentList()
                    .id("loanInfoPages")
                    .title("Loan info Sub-Pages")
                    .menuItems(S.documentTypeList("page").getMenuItems())
                    .filter("_type == $type && references($parentId)")
                    .params({ type: "page", parentId: "loanInfo" })
                    .defaultOrdering([
                      { field: "_createdAt", direction: "asc" },
                    ])
                )
                .icon(MdFolder),
              S.documentListItem()
                .id("vacoe")
                .title("VA COE")
                .schemaType("page"),
              S.documentListItem()
                .id("contactMe")
                .title("Contact")
                .schemaType("page"),
              S.documentListItem()
                .id("vietnamVetsEvent")
                .title("Annual Vietnam Vets Celebration")
                .schemaType("page"),
              S.documentListItem()
                .id("spring2021BuyersGuide")
                .title("Spring 2021 Buyer's Guide")
                .schemaType("page"),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Authors")
        .icon(MdPerson)
        .schemaType("author")
        .child(S.documentTypeList("author").title("Authors")),
      S.listItem()
        .title("Categories")
        .schemaType("category")
        .child(S.documentTypeList("category").title("Categories")),
      S.documentListItem()
        .title("Redirects")
        .id("redirects")
        .icon(MdArrowForward)
        .schemaType("redirects"),
      S.divider(),
      S.listItem()
        .title("Resource Video Pages")
        .schemaType("vrVideo")
        .child(
          S.documentList()
            .title("Resource Video Pages")
            .filter('_type == "vrVideo"')
        ),
      S.listItem()
        .title("Glossary Resources")
        .icon(FaBook)
        .child(
          S.editor()
            .id("glossarySection")
            .schemaType("vrSection")
            .documentId("vrSectionGlossary")
        ),
      S.listItem()
        .title("Journey Resources")
        .icon(FaBook)
        .child(
          S.editor()
            .id("journeySection")
            .schemaType("vrSection")
            .documentId("vrSectionJourney")
        ),

      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      // ...S.documentTypeListItems().filter(hiddenDocTypes)
    ]);
