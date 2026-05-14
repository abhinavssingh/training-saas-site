# Header CMS Integration Guide

## Overview

The Header has been converted from a **static implementation** to a **CMS-driven component** powered by Optimizely SaaS CMS.

This allows dynamic management of:

- Navigation menus
- Mega menus
- Top bar content
- Search configuration
- AI Assistant (if enabled)

> ⚠️ Breadcrumb-related components are **intentionally excluded** from this integration.

---

## What Changed

### 1. Layout Integration ✅

- **File**: `src/app/layout.tsx`
- **Change**: Replaced static `Header` with `HeaderCMS`
- **Impact**: Header content is now fetched from CMS dynamically

### 2. Header Wrapper Component ✅

- **File**: `src/components/HeaderCMS.tsx`
- **Type**: Server Component
- **Purpose**: Fetch Header content from CMS and render it via resolver

### Fetch Strategy

Attempts the following paths in order:

- `/header/` ✅ recommended
- `/global/header/`
- `/settings/header/`

---

### 3. Component Registration ✅

- **File**: `src/optimizely.ts`
- **Requirement**: Register `Header` component in resolver map

---

### 4. Component Structure ✅

```
src/components/header/
 ├── Ai Assistant/
 ├── DesktopNav.tsx
 ├── MobileNav.tsx
 ├── MegaMenu.tsx
 ├── Header.tsx
 ├── HeaderCMS.tsx
 ├── HeaderTopBar.tsx
 ├── MenuItemDesktop.tsx
 ├── MenuItemMobile.tsx
 ├── SearchButton.tsx
 ├── index.ts
```

---

## Content Type Definitions

Located in:

```
src/content-types/blocks/header/
```

### Required Types

- `HeaderCT`
- `MenuItemCT`
- `MegaMenuCT`
- `SubMenuItemCT`
- `TopBarCT`
- `SearchCT`
- `AiAssistantCT`

---

## Required CMS Setup

### Step 1: Push Config

```bash
npm run cms:push-config
```

---

### Step 2: Create Header Content

Path:

```
/header/
```

---

### Step 3: Publish Content

- Publish Header
- Publish all nested items

---

## Rendering Flow

```
layout.tsx
   ↓
<HeaderCMS />
   ↓
getContentByPath('/header/')
   ↓
<OptimizelyComponent />
   ↓
Header.tsx
```

---

## Troubleshooting

### Header Not Rendering

- Ensure content exists
- Ensure content is published
- Check correct path

### "_Component" Error

- Ensure CMS type is `Header`
- Re-run config push

---

## Environment Variables

```
OPTIMIZELY_GRAPH_SINGLE_KEY=your-api-key
OPTIMIZELY_CMS_URL=https://your-instance.optimizely.com
OPTIMIZELY_GRAPH_GATEWAY=https://cg.optimizely.com
```

---

## Next Steps

1. Run config push
2. Create header in CMS
3. Publish content
4. Restart app
5. Validate UI
