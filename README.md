This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Table of Contents
- [How to configure the JavaScript SDK](#how-to-configure-the-javascript-sdk)
  - [Install and use the CLI](#install-and-use-the-cli)
  - [Install the SDK](#install-the-sdk)
  - [Verify the connection](#verify-the-connection)
  - [Sync content types to the CMS](#sync-content-types-to-the-cms)
- [Getting Started](#getting-started)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)

## How to configure the JavaScript SDK
Install the [`Optimizely JavaScript SDK`](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/install-javascript-sdk) and CLI to model content and synchronize it with Optimizely CMS. Read this [document](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/model-content-types) to create a model and how to render. Here, I have documented important CLI commands.

### Install and use the CLI

You can run the CLI command without installing the SDK globally.

## How to configure the JavaScript SDK
Install the [`Optimizely JavaScript SDK`](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/install-javascript-sdk) and CLI to model content and synchronize it with Optimizely CMS. Read this [document](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/model-content-types) to create a model and how to render. Here, I have documented important CLI commands.

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
### Sync content types to the CMS
After defining your content types, push them to the CMS using the CLI.
```
npx @optimizely/cms-cli@latest config push optimizely.config.mjs
```
## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
