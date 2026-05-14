# Search Functionality Integration Guide

## Overview

This document explains the end-to-end search flow implemented in the application, starting from the header search icon to displaying search results on a dedicated page.

---

## Search Flow Summary

1. User clicks search icon in Header
2. Search modal opens
3. User enters search term
4. API call is triggered via `/api/search/route.ts`
5. Results are returned and shown as dropdown suggestions
6. User can:
   - Click a suggestion → navigate directly
   - Click search button → navigate to search page
7. Search page renders results based on query
8. User can search again from search page

---

## Components Involved

### 1. Header Integration

- File: `src/components/header/SearchButton.tsx`
- Action: Opens `SearchModal`

---

### 2. Search Modal

- File: `src/components/search/SearchModal.tsx`
- Includes:
  - Search input box
  - Search button
  - Dropdown results

#### Responsibilities:

- Capture user input
- Call search API
- Display suggestions

---

### 3. Search Box

- File: `src/components/search/SearchBox.tsx`

Handles:

- Input field
- Trigger search API on typing
- Emits selected result or submit action

---

### 4. API Route

- File: `src/app/api/search/route.ts`

#### Responsibilities:

- Accept query parameter
- Fetch results from backend / CMS / search service
- Return JSON response

#### Example:

```ts
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
```

```ts
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
```

---

### 5. Search Page

- File: `src/app/search/page.tsx`

#### Responsibilities:

- Read query from URL (`?q=`)
- Fetch results
- Display full search result list
- Provide search box for further queries

---

## Data Flow

```
Header Search Icon
   ↓
SearchModal opens
   ↓
User types query
   ↓
API call (/api/search)
   ↓
Dropdown results shown
   ↓
User action:
   → Click item → Navigate
   → Click button → /search?q=value
   ↓
Search Page
   ↓
Display results
```

---

## User Interactions

### A. Typing in Search

- Triggers API call (debounced recommended)
- Shows dropdown suggestions

### B. Selecting Dropdown Item

- Redirects to selected page

### C. Clicking Search Button

- Navigates to:

```
/search?q=search-term
```

---

## Best Practices

- ✅ Debounce API calls (300ms recommended)
- ✅ Handle empty queries
- ✅ Show loading state
- ✅ Handle API errors gracefully
- ✅ Cache results if possible

---

## Troubleshooting

### Issue: No results in dropdown

- Check API route
- Verify query param is passed

### Issue: Search page not updating

- Ensure query is read correctly from URL
- Check server/client rendering logic

### Issue: Modal not opening

- Verify search button click handler

---

## File Structure Reference

```
src/
 ├── app/
 │   ├── api/search/route.ts
 │   └── search/page.tsx
 │
 ├── components/
 │   ├── header/
 │   │   └── SearchButton.tsx
 │   └── search/
 │       ├── SearchBox.tsx
 │       └── SearchModal.tsx
```

---

## Next Steps

1. Optimize API performance
2. Add analytics tracking
3. Improve UI/UX for mobile
4. Add recent searches or suggestions

---

## Summary

This implementation provides a seamless search experience:

- Instant suggestions via dropdown
- Full results page for deeper exploration
- Centralized API handling
