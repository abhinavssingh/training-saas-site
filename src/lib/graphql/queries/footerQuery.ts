/**
 * GraphQL Query for fetching Footer content
 * Uses inline fragments to access type-specific fields
 */
export const FOOTER_QUERY = `
  query {
    Footer {
      items {
        _id
        __typename
        copyrightText
        lastUpdated
        sections {
          _id
          __typename
          ... on FooterSection {
            title
            links {
              _id
              __typename
              ... on FooterLink {
                label
                href {
                  default
                }
              }
            }
          }
        }
        emirates {
          _id
          __typename
          ... on EmirateCard {
            name
            subtitle
            href {
              default
            }
          }
        }
        socialLinks {
          _id
          __typename
          ... on SocialLink {
            label
            href {
              default
            }
            iconPath
          }
        }
      }
    }
  }
`;
