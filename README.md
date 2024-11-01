## Key decisions

### Next 14 and React 18, instead of Next 15 and React 19 RC

Next has marked Next 15 as stable, but it depends on React 19 which is still marked as a release candidate (not officially considered stable enough for production).

Next 15 is primarily intended to work with React 19 so using Next 15 with React 18 is likely to be a bit unstable.

As such, downgrading to next@14 and react@18, with the intention that the project would be upgraded once React 19 is out of RC.

### Include zod

Judging that the extra robustness justifies breaking the preference for few dependencies

### Forms

Given the simplicity of the form and preference for few dependencies, I'm skipping using a form library such as conform or react-hook-form and corresponding schema defined with zod.

### "Register" / "Registration Data"

Don't love this naming; in practice it's probably going to be a clearer cut case of sign-up/sign-in and profile

### Scope cuts (not enough time)

#### Dark mode

Skipping doing it properly to reduce scope; it's dark only and not using chakra and tailwind's darkmode functionality

#### Testing

Skipping to reduce scope and given there aren't any complex logic functions.  Generally would aim for near full coverage of logic and components, using vitest (or jest) and react-testing-library.  Would also add a small number of cypress e2e tests for sanity checking of key flows.

#### Chakra imports vs snippets

Looks like Chakra is moving toward components living in your codebase like shadcn-ui's approach; agree with this but mostly just using direct imports for now to reduce scope.  Snippets added as a demonstation; skipping refactoring to customise and use consistently.

#### Loading feedback

It's mostly all SSR so generally no client side loading states required.
But there should be feedback on the buttons you click (button content change to spinner) and a global loader (bar along the top).
Then tweak further as necessary, using Suspense and skeletons.

#### Speed up the initial page loading times

Idk why it's so slow; need to investigate

#### Improve desktop design

List on left; detail on right.  So can click through the list.  Wouldn't strictly meet the modal req though.

Even if keep the current design the list shouldn't go full width on desktop, and make better use of the space.  Maybe bigger pics.  Maybe multi column grid of cards, but lack of linearity can make navigating them annoying, esp if detail on right.  Easier to visually search when names lined up too.

## Next.js Intro

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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
