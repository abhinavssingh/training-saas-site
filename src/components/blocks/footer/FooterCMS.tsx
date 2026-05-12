'use server';

import { getClient } from '@optimizely/cms-sdk';
import { withAppContext } from '@optimizely/cms-sdk/react/server';
import Footer from '@/components/blocks/footer/Footer';
import { FOOTER_QUERY } from '@/lib/graphql/queries';
import { transformFooterData } from '@/lib/types/transformFooterData';

/**
 * CMS-driven Footer wrapper component
 * Fetches Footer content from CMS using GraphQL query and renders it
 * Falls back to rendering nothing if content not found
 *
 * This component is used in the root layout to display
 * the global Footer from the CMS instead of a static component
 *
 * The Footer is fetched via GraphQL query which provides
 * direct access to Footer items with all nested properties
 *
 * Ensure the Footer content item in CMS has type 'Footer' and is published
 */
export async function FooterCMS() {
  try {
    const client = getClient();

    // Fetch footer content using GraphQL query
    const data = await client.request(FOOTER_QUERY, {});

    // Extract footer from query response
    let footer = data?.Footer?.items?.[0];

    if (!footer) {
      console.warn(
        'Footer content not found in CMS. ' +
          'Ensure a Footer content item exists and is published.',
      );
      return null;
    }

    // Transform the response data to match footer component expectations
    footer = transformFooterData(footer);

    // Render Footer component directly with the fetched content
    // This bypasses OptimizelyComponent and directly renders Footer
    return <Footer content={footer} />;
  } catch (error: any) {
    console.error('Error fetching Footer from CMS:', error);

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

export default withAppContext(FooterCMS);
