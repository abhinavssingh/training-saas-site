'use server';

import { getClient } from '@optimizely/cms-sdk';
import { withAppContext } from '@optimizely/cms-sdk/react/server';
import Header from '@/components/blocks/header/Header';
import { HEADER_QUERY } from '@/lib/graphql/queries';
import { transformHeaderData } from '@/lib/types/transformHeaderData';

/**
 * CMS-driven Header wrapper component
 * Fetches Header content from CMS using GraphQL query and renders it
 * Falls back to rendering nothing if content not found
 *
 * This component is used in the root layout to display
 * the global Header from the CMS instead of a static component
 *
 * The Header is fetched via GraphQL query which provides
 * direct access to Header items with all nested properties
 *
 * Ensure the Header content item in CMS has type 'Header' and is published
 */
export async function HeaderCMS() {
  try {
    const client = getClient();

    // Fetch Header content using GraphQL query
    const data = await client.request(HEADER_QUERY, {});

    // Extract Header from query response
    let header = data?.Header?.items?.[0];

    if (!header) {
      console.warn(
        'Header content not found in CMS. ' +
          'Ensure a Header content item exists and is published.',
      );
      return null;
    }

    // Transform the response data to match header component expectations
    header = transformHeaderData(header);

    // Render header component directly with the fetched content
    // This bypasses OptimizelyComponent and directly renders header
    return <Header content={header} />;
  } catch (error: any) {
    console.error('Error fetching header from CMS:', error);

    // Log detailed GraphQL errors if available
    if (error?.errors) {
      console.error('GraphQL Errors:', JSON.stringify(error.errors, null, 2));
    }

    // Log the error message
    if (error?.message) {
      console.error('Error Message:', error.message);
    }

    return null;
  }
}

export default withAppContext(HeaderCMS);
