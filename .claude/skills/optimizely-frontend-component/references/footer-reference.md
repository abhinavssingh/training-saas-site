# Footer CMS Integration Guide

## Overview

The Footer has been successfully converted from a static component to a CMS-driven component that fetches content from Optimizely SaaS CMS.

## What Changed

### 1. **Layout Integration** ✅

- **File**: `src/app/layout.tsx`
- **Change**: Replaced static `Footer` import from `@/components/layout` with `FooterCMS` wrapper
- **Impact**: Footer now fetches content from CMS instead of being hardcoded

### 2. **Footer Wrapper Component** ✅

- **File**: `src/components/FooterCMS.tsx` (NEW)
- **Purpose**: Server component that fetches Footer content from CMS
- **Fetches from**: `/footer/`, `/global/footer/`, or `/settings/footer/` paths
- **Returns**: Renders Footer via `OptimizelyComponent` for proper type resolution

### 3. **Component Registration** ✅

- **File**: `src/optimizely.ts`
- **Status**: Footer is properly registered in resolver map
- **Component Path**: `src/components/blocks/footer/Footer.tsx`
- **Exports**: All Footer-related components are exported from `src/components/index.ts`

### 4. **Content Type Definitions** ✅

All defined in `src/content-types/blocks/footer/`:

- `FooterCT` - Main Footer component
- `FooterSectionCT` - Section containers (e.g., "Products", "Company")
- `FooterLinkCT` - Individual links
- `EmirateCardCT` - Emirates grid cards
- `SocialLinkCT` - Social media links

### 5. **Removed Duplicate** ✅

- **File**: `src/components/layout/index.ts`
- **Change**: Removed static Footer export to avoid confusion

## Required CMS Setup

### Step 1: Push Content Type Definitions

Run the following command to sync the Footer content types to your CMS:

```bash
npm run cms:push-config
```

This will register the following content types in CMS:

- `Footer`
- `FooterSection`
- `FooterLink`
- `EmirateCard`
- `SocialLink`

### Step 2: Create Footer Content in CMS

1. **Navigate to Asset Panel** in Optimizely CMS
2. **Create new content item** with type `Footer`
3. **Set path to one of**:
   - `/footer/` (recommended)
   - `/global/footer/`
   - `/settings/footer/`
4. **Fill in required properties**:
   - `sections` - Array of FooterSection items
   - `emirates` - Array of EmirateCard items
   - `socialLinks` - Array of SocialLink items
   - `copyrightText` - Copyright text (e.g., "Ministry of Investment")
   - `lastUpdated` - DateTime field (e.g., current date)

### Step 3: Create Supporting Content Items

#### Add Footer Sections

Each section (e.g., "Products", "Company") should have:

- `title` - Section heading
- `links` - Array of FooterLink items

#### Add Footer Links

Each link needs:

- `label` - Display text
- `href` - URL

#### Add Emirates Cards

Each emirate card needs:

- `name` - Emirate name (e.g., "Dubai")
- `subtitle` - Additional text
- `href` - Optional link

#### Add Social Links

Each social link needs:

- `label` - Accessible label (screen reader text)
- `href` - Social media URL
- `iconPath` - SVG path data (24x24)

### Step 4: Publish All Content

1. Save the Footer and all related content
2. **Publish** the Footer content item
3. Publish all FooterSection and FooterLink items

## How It Works

### Rendering Flow

```
layout.tsx
  ↓
<FooterCMS />
  ↓
getClient().getContentByPath('/footer/')
  ↓
<OptimizelyComponent content={footer} />
  ↓
Footer.tsx component (resolved by optimizely.ts)
  ↓
Renders with CMS content
```

### Error Handling

The FooterCMS component includes fallback behavior:

1. **Tries primary path**: `/footer/`
2. **Tries alternative paths**: `/global/footer/`, `/settings/footer/`
3. **If not found**: Returns `null` (no footer rendered)
4. **Logs warnings**: Check console for diagnostic messages

## Troubleshooting

### Issue: "No component found for content type \_Component"

**Cause**: Footer content type key mismatch

**Solution**:

1. Verify Footer content in CMS has type `Footer` (not `_Component`)
2. Check that content is published
3. Ensure `npm run cms:push-config` was executed
4. Check browser console for content type name

### Issue: Footer not appearing on public site

**Checklist**:

- [ ] Footer content created in CMS
- [ ] Footer is published (not draft)
- [ ] Content path is `/footer/` (or alternative path matching FooterCMS.tsx)
- [ ] Content type is `Footer`
- [ ] `npm run cms:push-config` was executed
- [ ] App rebuilt after CMS changes
- [ ] No errors in server console (check terminal logs)

### Issue: Footer visible in Asset Panel but not on site

**Likely cause**: Content not published or wrong path

**Steps**:

1. Verify Footer content is marked as **Published**
2. Check Footer content path matches fetching logic
3. Verify all nested content (sections, links) is also published
4. Clear Next.js cache: `npm run dev` (will rebuild)

## Environment Variables

Ensure your `.env` file has:

```env
OPTIMIZELY_GRAPH_SINGLE_KEY=your-api-key
OPTIMIZELY_CMS_URL=https://your-cms-instance.optimizely.com
OPTIMIZELY_GRAPH_GATEWAY=https://cg.optimizely.com
```

## TypeScript Types

The Footer component uses proper TypeScript typing:

```typescript
import { ContentProps } from '@optimizely/cms-sdk';
import { FooterCT } from '@/content-types/blocks/footer/Footer';

type Props = {
  content: ContentProps<typeof FooterCT>;
};

export default async function Footer({ content }: Props) {
  // Use content.sections, content.emirates, etc.
}
```

## Next Steps

1. **Run config push**: `npm run cms:push-config`
2. **Create Footer content** in Optimizely CMS Asset Panel
3. **Publish all content** items
4. **Rebuild app**: `npm run dev`
5. **Test** on public site

## Need Help?

- Check the Footer component: [src/components/blocks/footer/Footer.tsx](../src/components/blocks/footer/Footer.tsx)
- Review content types: [src/content-types/blocks/footer/](../src/content-types/blocks/footer/)
- Check wrapper: [src/components/FooterCMS.tsx](../src/components/FooterCMS.tsx)
- Review Optimizely setup: [CLAUDE.md](../../CLAUDE.md)
