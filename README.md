
# Known Bugs

We are using the canary version of Next JS to utilize the partial prerendering feature.
However, there is a bug with using canary Next with React 18 with the ref props. See this [issue](https://github.com/radix-ui/primitives/issues/2769)
It causes framer motion to not persist the animated state on an SPA navigation from our testing. The implication is that you should NEVER do a SPA navgiation to a page with a framer motion animated element that starts animation at component mount. We can solve this issue by downgrading the Next JS to stable releases but we loses the benefit of PPR. If we switch the runtime to edge, we run into another issue of not being able to use the cloudinary Node SDK. We will need to fallback to unsigned API endpoints fetching (the delete API requires manually generating signatures which painful to deal with).

Upgrading to React 19 should fix the compatibility issue with Next Canary but framer motion is not compatibile with React 18.

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
