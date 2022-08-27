# sanity-template-nuxt-events

_Data-driven conference website in Vue.js. Speakers, sessions, and scheduling._

This template repo is used by [Sanity.io](https://www.sanity.io) to easily create deployed and configured projects through a web interface. You can test it by [creating this project](https://www.sanity.io/create/?template=sanity-io%2Fsanity-template-nuxt-events).

The template contains both a Sanity.io Sanity Studio and a front-end in [Nuxt](https://nuxtjs.org). Both are deployed on [Netlify](https://netlify.com).

Want to make a template for Sanity and your favourite front-end framework? We’re still maturing [sanity.io/create](https://sanity.io/create) and our APIs, but do tell us about it on [slack.sanity.io](https://slack.sanity.io).

![The Sanity and Nuxt.js powered events website](https://github.com/sanity-io/sanity-template-nuxt-events/blob/main/assets/frontend.jpg?raw=true)

## Local development

You develop the templates in `/template`, and review your changes in `/build`.

1. **Install dependencies with `npm install` in the root folder.** This will install the template development tool that watches changes in the `/template` folder and output the template to `/build`.

2. **Run `npm run dev` in root folder.** This will build the template files to `/build`. This is how the code will look for those who install the project later.

3. **Run `npm install` in `./build/web` and `sanity install` in `/build/studio`** This will install the necessary dependencies for the Nuxt.js frontend and the Studio.

4. **Run `npm run dev` in `./build/web` and `sanity start` in `/build/studio`**. This will start the development servers for the Nuxt.js frontend and Sanity Studio.

## Notes

When developing ProjectId and dataset name can be changed in `template-values-development.json`
