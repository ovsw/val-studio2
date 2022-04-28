// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// document schemas
import author from "./documents/author";
import category from "./documents/category";
import post from "./documents/post";
import page from "./documents/page";
import pageLocation from "./documents/page-location";
import redirects from "./documents/redirects";
import siteSettings from "./documents/siteSettings";
import vrSection from "./documents/vrSection";
import vrSubSection from "./documents/vrSubsection";
import vrVideo from "./documents/vrVideo";

// Object types
import authorReference from "./objects/authorReference";
import bioPortableText from "./objects/bioPortableText";
import bodyPortableText from "./objects/bodyPortableText";
import excerptPortableText from "./objects/excerptPortableText";
import iframeEmbed from "./objects/iframeEmbed";
import mainImage from "./objects/mainImage";
import mytable from "./objects/mytable";
import redirect from "./objects/redirect";
import simpleImage from "./objects/simpleImage";
import youtube from "./objects/youtube";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "blog",
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    // documents
    author,
    category,
    page,
    pageLocation,
    post,
    redirects,
    siteSettings,
    vrSection,
    vrSubSection,
    vrVideo,
    // objects
    authorReference,
    bioPortableText,
    bodyPortableText,
    excerptPortableText,
    iframeEmbed,
    mainImage,
    mytable,
    redirect,
    simpleImage,
    youtube,

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ]),
});
