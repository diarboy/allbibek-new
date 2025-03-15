import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'en-US',
  title: 'allbibek.',
  description: 'Pixel-perfect!',
  base: '/',

  head: [
    [
      'link',
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
    ],
    ['link', { rel: 'stylesheet', href: '/custom.css' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://api.fontshare.com/v2/css?f=manrope&display=swap',
      },
    ],
    ['meta', { name: 'theme-color', content: '#57d4ea', media: '(prefers-color-scheme: light)' }],
    ['meta', { name: 'theme-color', content: '#520178', media: '(prefers-color-scheme: dark)' }],
  ],

  themeConfig: {
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    logo: '/favicon.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide' },
      { text: 'Gallery', link: '/gallery' },
      {
        text: 'Resources',
        items: [
          {
            text: 'Internal Link',
            items: [
              { text: 'Blog', link: '/blog/introduction' },
              { text: 'Playground', link: '/blog/playground' },
              { text: 'Teams', link: '/team' },
              { text: 'Teammate', link: '/blog/teammate' },
              { text: '404', link: '/resources/internal/' },
            ],
          },
          {
            text: 'External Links',
            items: [
              { text: 'GitHub', link: 'https://github.com/diarboy' },
              { text: 'Framer', link: 'https://allbibek.framer.website/' },
              { text: 'Meta', link: 'https://facebook.com/ardibukan' },
            ],
          },
        ],
      },
      { text: 'Contact', link: '/contact' },
      // { text: 'Menu Baru', link: '/menu-baru' },
    ],

    sidebar: {
      '/': [
        {
          text: 'Guide',
          collapsed: true,
          items: [
            { text: 'Getting Started', link: '/guide' },
            { text: 'Web Dev Tutorials', link: '/blog/tutorials' },
            { text: 'Git Dev Workflows', link: '/blog/gitdev' },
            { text: 'Full-Stack Website', link: '/blog/full-stack' },
            { text: 'Dasar Regex', link: '/blog/regex' },
          ],
        },
        {
          text: 'Blog',
          collapsed: true,
          items: [
            { text: 'Introduction', link: '/blog/introduction' },
            { text: 'My First Post', link: '/blog/myfirstpost' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/diarboy' },
      { icon: 'atlassian', link: 'https://allbibek.framer.website' },
    ],

    footer: {
      message: '<span class="subtitle">Released under the <a href="https://github.com/diarboy/diarboy/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><span class="subtitle">MIT License</span></a></span>',
      copyright: '<span class="subtitle">Copyright © 2024-present<a href="https://github.com/diarboy" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><span class="title" style="font-family: Comfortaa, sans-serif; font-size: 14px;"> 🔗allbibek</span></a></span>'
    },
    outline: [2, 3],
  },
});
