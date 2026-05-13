import { getClient } from '@optimizely/cms-sdk';
import { NextResponse } from 'next/server';
import '@/lib/config';

const SEARCH_QUERY = `
query SearchContent($query: String!) {
 _Content(
    where: { _fulltext: { match: $query } }
    orderBy: { _ranking: RELEVANCE }
    limit: 10
  ) {
    items {
      __typename
      _id
      _metadata {
        displayName
        variation
        locale
        url {
          default
          internal
          graph
          base
          type
        }
      }
    }
  }
}
`;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';

    if (!query) {
      return NextResponse.json({ items: [] });
    }

    const client = getClient();

    const data = await client.request(SEARCH_QUERY, { query });

    return NextResponse.json({
      items: (data?._Content?.items || []).map((item: any) => ({
        id: item._id,
        name: item._metadata?.displayName,
        url: item._metadata?.url?.default,
      })),
    });
  } catch (error) {
    console.error('API ERROR 👉', error); // ✅ important
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
