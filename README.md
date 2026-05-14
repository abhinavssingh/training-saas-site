This is a [Next.js](https://nextjs.org) project using the [Optimizely Content JS SDK](https://github.com/episerver/content-js-sdk), running locally and deployable to the [Optimizely Frontend Hosting](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/host-a-front-end-with-optimizely).

## Getting Started

1. Copy the `.env.template` file to `.env` and add the necessary values from the CMS and optionally your frontend hosting (PaaS Portal).

2. Push types

```bash
npm run cms:push-config
```

### Install and use the CLI

You can run the CLI command without installing the SDK globally.

```
npx @optimizely/cms-cli@latest
```

### Install the SDK

Install the Optimizely JavaScript SDK in your project.

```
npm install @optimizely/cms-sdk
```

### Verify the connection

Verify that the CLI can connect to your CMS instance.

```
npx @optimizely/cms-cli@latest login
```

### Folder Structure

```
├── optimizely.ts                # Optimizely CMS SDK configuration
├── app                          # Next.js App Router
│   ├── favicon.ico              # Site favicon
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout wrapper
│   ├── not-found.tsx            # Custom 404 page
│   ├── page.tsx                 # Homepage (/)
│   │
│   ├── api                      # API routes
│   │   └── search
│   │       └── route.ts         # Search API endpoint
│   │
│   ├── debug
│   │   └── route.ts             # Debug endpoint for CMS data
│   │
│   ├── preview
│   │   └── page.tsx             # CMS preview mode page
│   │
│   ├── search
│   │   └── page.tsx             # Search results page
│   │
│   └── [...slug]
│       └── page.tsx             # Dynamic CMS-driven routing
│
├── components                  # Reusable UI components
│   ├── index.ts                 # Barrel exports
│   │
│   ├── blocks                  # CMS Blocks
│   │   ├── CardBlock.tsx       # Card block UI
│   │   ├── footer
│   │   │   └── Footer.tsx      # Footer component
│   │   ├── header
│   │   │   ├── Breadcrumb.tsx  # Breadcrumb navigation
│   │   │   └── Header.tsx      # Header component
│   │   └── search
│   │       ├── SearchBox.tsx   # Search input UI
│   │       └── SearchModal.tsx # Search modal UI
│   │
│   ├── elements
│   │   └── BannerElement.tsx   # Banner UI element
│   │
│   ├── experiences
│   │   └── BlankExperience.tsx # Base experience layout
│   │
│   ├── layout
│   │   ├── CommunicationInjector.tsx # Inject scripts/personalization
│   │   ├── index.ts                  # Layout exports
│   │   ├── Logo.tsx                  # Logo component
│   │   └── PreviewError.tsx          # Preview error handler
│   │
│   ├── pages
│   │   ├── ArticlePage.tsx    # Article page template
│   │   └── PersonPage.tsx     # Person page template
│   │
│   └── sections
│       └── ContentContainerSection.tsx # Layout container section
│
├── content-types              # CMS data models (TypeScript types)
│   ├── index.ts                # Type exports
│   │
│   ├── blocks
│   │   ├── CardBlock.ts       # Card block schema
│   │   ├── SeoBlock.ts        # SEO schema
│   │   ├── footer
│   │   │   └── Footer.ts      # Footer schema
│   │   └── header
│   │       └── Header.ts      # Header schema
│   │
│   ├── elements
│   │   └── BannerElement.ts   # Banner schema
│   │
│   ├── experiences
│   │   └── LandingPageExperience.ts # Experience schema
│   │
│   ├── page
│   │   └── ArticlePage.ts     # Article page schema
│   │
│   └── sections
│       └── ContentContainerSection.ts # Section schema
│
├── display-templates         # Rendering templates
│   ├── ColumnDisplayTemplate.ts     # Column layout template
│   ├── index.ts                     # Template exports
│   │
│   ├── elements
│   │   └── BannerElementDisplayTemplate.ts # Banner renderer
│   │
│   ├── experience
│   │   └── BlankSectionDisplayTemplate.ts  # Default experience renderer
│   │
│   └── sections
│       └── ContentContainerSectionDisplayTemplate.ts # Section renderer
│
└── lib                        # Utilities & helpers
    ├── cn.ts                  # Classname utility
    ├── config.ts              # App configuration
    ├── constants.ts           # Static constants
    ├── seo.ts                 # SEO utilities
    │
    ├── graphql               # GraphQL integration
    │   ├── index.ts          # Client setup
    │   └── queries
    │       ├── footerQuery.ts # Footer query
    │       ├── headerQuery.ts # Header query
    │       └── index.ts       # Query exports
    │
    └── types
        ├── transformFooterData.ts # Footer data transformer
        └── transformHeaderData.ts # Header data transformer
```

### Sync content types to the CMS

After defining your content types, push them to the CMS using the CLI.

```
npx @optimizely/cms-cli@latest config push optimizely.config.mjs
```

3. Do a full Graph Indexing in Settings in the CMS

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

5. Add a new application in Settings > Applications

Add localhost:3000 as the host, use all for languages. You should now have a working start page (a Blank Experience)

## Learn More

To learn more about Optimizely Content JS SDK:

- [Documentation](https://github.com/episerver/content-js-sdk)
- [Sample projects](https://github.com/episerver/content-js-sdk/tree/main/samples)
- [Sample Astro project](https://github.com/kunalshetye/opti-astro)
- [Mosey Bank demo](https://github.com/episerver/cms-saas-vercel-demo/)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy to Optimizely Frontend Hosting

The easiest way to deploy is using the `deploy.ps1` PowerShell script in the root of the project. It will package up the necessary files and deploy using the Optimizely Deployment API.

Make sure all the environment variables are set.
