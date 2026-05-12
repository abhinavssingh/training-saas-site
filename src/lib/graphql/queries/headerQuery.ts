/**
 * GraphQL Query for fetching Header content
 * Uses inline fragments to access type-specific fields
 */
export const HEADER_QUERY = ` query {
  Header {
    items {
      _id
      __typename
      menuItems {
        _id
        __typename
        ... on NavItem {
          label
          _itemMetadata {
            displayName
          }
          href {
            default
          }
          featured {
            _id
            __typename
            ... on NavPromoCard {
              cta
              description
              eyebrow
              title
              href {
                default
              }
            }
          }
          children {
            _id
            __typename
            ... on NavItem {
              label
              href {
                default
              }
              description
            }
          }
        }
      }
      showAiButton
    }
  }
}`;
