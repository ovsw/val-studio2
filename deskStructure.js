import S from '@sanity/desk-tool/structure-builder'
import {MdSettings, MdPerson, MdFolder, MdBook, MdList} from 'react-icons/md'

const hiddenDocTypes = listItem =>
  !['category', 'author', 'post', 'siteSettings'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Website Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      S.listItem()
        .icon(MdBook)
        .title('Blog posts')
        .schemaType('post')
        .child(S.documentTypeList('post').title('Blog posts')),
      S.listItem()
        .icon(MdList)
        .title('Blog Posts by Category')
        .child(
          S.documentList()
            .title('Categories')
            .menuItems(S.documentTypeList('category').getMenuItems())
            .filter('_type == $type')
            .params({type: 'category'})
            .child(categoryId =>
              S.documentList()
                .title('Posts')
                .menuItems(S.documentTypeList('post').getMenuItems())
                .filter('_type == $type && $categoryId in categories[]._ref')
                .params({type: 'post', categoryId})
            )
        ),
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.documentListItem()
                .id('mystory')
                .title('My Story')
                .schemaType('page'),
              S.documentListItem()
                .id('vaHomeLoans')
                .title('VA Home Loans')
                .schemaType('page'),
              S.listItem()
                .title('VA Home Loans Sub-Pages')
                .id('vaHomeLoansPages')
                .child(S.documentList()
                  .id('loanInfoPages')
                  .title('Loan info Sub-Pages')
                  .menuItems(S.documentTypeList('page').getMenuItems())
                  .filter('_type == $type && references($parentId)')
                  .params({type: 'page', parentId: 'vaHomeLoans'})
                  .defaultOrdering([{field: '_createdAt', direction: 'asc'}])
                )
                .icon(MdFolder),
              S.documentListItem()
                .id('apply')
                .title('Apply')
                .schemaType('page'),
              S.documentListItem()
                .id('media')
                .title('Media')
                .schemaType('page'),
              S.documentListItem()
                .id('loanInfo')
                .title('Loan Information')
                .schemaType('page'),
              S.listItem()
                .title('Loan Info Sub-Pages')
                .child(S.documentList()
                  .id('loanInfoPages')
                  .title('Loan info Sub-Pages')
                  .menuItems(S.documentTypeList('page').getMenuItems())
                  .filter('_type == $type && references($parentId)')
                  .params({type: 'page', parentId: 'loanInfo'})
                  .defaultOrdering([{field: '_createdAt', direction: 'asc'}])
                )
                .icon(MdFolder),
              S.documentListItem()
                .id('vacoe')
                .title('VA COE')
                .schemaType('page'),
              S.documentListItem()
                .id('contactMe')
                .title('Contact')
                .schemaType('page'),
              S.documentListItem()
                .id('vietnamVetsEvent')
                .title('Annual Vietnam Vets Celebration')
                .schemaType('page'),
              S.documentListItem()
                .id('spring2021BuyersGuide')
                .title('Spring 2021 Buyer\'s Guide')
                .schemaType('page')
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Authors')
        .icon(MdPerson)
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories'))
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      // ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
