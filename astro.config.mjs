import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/functions';
import svelte from '@astrojs/svelte'
import mdx from '@astrojs/mdx'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import rehypeExternalLinks from 'rehype-external-links'

// https://astro.build/config
export default defineConfig({
  //the next two lines is so that astro website can be build in github pages
  site: 'https://gsgr789.github.io',
  base: '/blog',

  //adapter: netlify(),
  //site: 'https://astro-blog-template.netlify.app',
  integrations: [mdx(), svelte()],
  markdown: {
    shikiConfig: {
      theme: 'nord',
    },
    remarkPlugins: [remarkGfm, remarkSmartypants],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
        },
      ],
    ],
  },
})
