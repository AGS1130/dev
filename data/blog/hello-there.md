---
title: Hello There!
date: '2021-07-17'
tags: ['personal']
draft: false
summary: For my first blog post, let me provide a little background and explain my intentions for starting this blog.
images: []
layout: PostSimple
authors: ['default']
---

## Welcome to my blog!

In the past I have tried to start several blogs from scratch using [Gatsby](https://github.com/AGS1130/developer-blog-frontend) and [Svelte Kit](https://github.com/AGS1130/ags1130.dev). While I learned a lot about the tools and frameworks I used to build them, sadly I never launched them 😞. This was partly because I had many hesitations on launching these apps. These hesitations originated from the idea that **quality is more important than getting a product out**. This idea resonates me most only if you are presenting your product for the first time in what I believe are **first impressions**.

### What were your standards for quality?

It boiled down to these four points:

- Does the site journey make sense to users?
- How fast/performant are the web pages?
- Will users benefit from UX features?
- Is the design pleasing to look at?

These are my basic standards for a simple website or application. However, I would not limit it to just creating a website. This could be applied to many things people interact with, because our minds are subconsciously making judgments on products, services, people, and experiences.

I'll expand this more in another blog post, but to cover my standards of quality I'll quickly say that **I'm not a UI/UX designer**.

When it came to creating the blogs, it wasn't difficult for me to write the code. I'm a trained developer who is comfortable with diving into documentation and breaking code bases. I believe failure is a necessary experience for anyone learning something new so long as we provide a safe space to fail (don't let it blow up in production 🤯). However, when it comes to design, navigation, and interaction I was completely missing the mark. I don't know good design principles such as colors, spacing, and other things like that. In the past I have worked on user experience and interactions, but I didn't know how to prioritize features that would benefit a user for a blog.

- _Is the spacing between elements preventing the user from interacting with the page?_
- _What edge cases should I consider when a user tries to break the page?_
- _How do I distinguish featured posts from latest posts and older posts?_
- _What tags would be useful and how would the user reach them?_
- _Where do I place the navigation items and search bar?_
- _Is the design consistent throughout the website?_
- _Is the blog accessible in legacy browsers?_

There was a lot of back and forth with UI/UX, ultimately it was an effort that became self-defeating 😞. **I'm not a UI/UX designer**.

### Ok, but what about performance?

If you look back at my [standards for quality](#what-were-your-standards-for-quality) you probably saw that I answered 2½ questions that were mostly design oriented. For those front end devs who want to know which framework shined the most, between [Gatsby](https://www.gatsbyjs.com/) and [Svelte Kit](https://kit.svelte.dev/), and which one gets to have bragging rights for best front end framework, I'm happy to say that both frameworks performed terribly! 🎉

Dead serious. These were production builds.

For critical pages, with a lot of images, code snippets, etc., I was getting a **70** in the Performance score for Lighthouse, **at most**.

However, at the time that I was working with the frameworks, [Gatsby was in v2](https://www.gatsbyjs.com/docs/reference/release-notes/v3.0/) and Svelte Kit (at the time of writing) is still in beta. I won't dictate which is _superior_, but an experienced developer will know what to look for when selecting a framework best suited for a project.

### Let's wrap it up with intentions

Even though I never deployed the previous blogs, I am happy to have had the experience working with the latest and greatest technologies at the time 😃!

This blog uses the [Tailwind Blog Starter Template](https://github.com/timlrx/tailwind-nextjs-starter-blog) which is powered by [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/), with the production build using [Preact](https://preactjs.com/).

This template was provided by [Timothy Lin](https://www.timlrx.com/). Go check him out!

If you are a developer who is looking to get a blog out as quickly as possible, I highly recommend working with this template. It checks off all the standards for quality.

With that said, I intend to use this blog to talk about the latest tools, trends, and frameworks that are available for front end development. I'll also use this to store quick code snippets that could be used in a project.

Here's my first snippet:

```js
console.log('Hello There! 👋')
```
