import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'en-US',
  title: 'allbibek.',
  description: 'Pixel-perfect!',
  base: '/',
  
  markdown: {
    math: true
  },

  head: [
      // ['script', { src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js', async: true }],
      // ['script', {}, `
      //   window.MathJax = {
      //     tex: {
      //       inlineMath: [['$', '$'], ['\\(', '\\)']],
      //       displayMath: [['$$', '$$'], ['\\[', '\\]']],
      //       processEscapes: true,
      //       processEnvironments: true
      //     },
      //     options: {
      //       skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
      //       ignoreHtmlClass: 'tex2jax_ignore'
      //     }
      //   };
      // `],
    [
      'link',
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
    ],
    // ['link', { rel: 'stylesheet', href: '/custom.css' }],
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
    appearance: 'auto',
    lastUpdated: {
      text: 'Updated on',
      formatOptions: {
        dateStyle: 'long', /* full / long / medium / short */
        timeStyle: 'short'
        // hourCycle: 'h23'
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
              { text: 'Blog', link: '/blog' },
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
            { text: 'Web Dev Tutorials', link: '/blog/post/web-dev' },
            { text: 'Git Dev Workflows', link: '/blog/post/git-dev' },
            { text: 'Full-Stack Website', link: '/blog/post/full-stack' },
            { text: 'Dasar Regex', link: '/blog/post/regex' },
            { text: 'Deploy a Django', link: '/blog/post/deploy-django' },
            { text: 'Docker-Based Dev', link: '/blog/post/docker-dev' },
          ],
        },
        {
          text: 'Blog',
          collapsed: true,
          items: [
            { text: 'Introduction', link: '/blog/introduction' },
            { text: 'Intonesia', link: '/blog/post/intonesia' },
            { text: 'Nostalgia Trap', link: '/blog/post/nostalgia-trap' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/diarboy' },
      { icon: 'atlassian', link: 'https://allbibek.framer.website' },
    ],

    footer: {
      message: '<span class="title-alt">Released under the <a href="https://github.com/diarboy/diarboy/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><span class="title">MIT License</span></a></span>',
      copyright: '<span class="title-alt">Copyright © 2024-present<a href="https://github.com/diarboy" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><span class="title" style="font-family: Comfortaa, sans-serif; font-size: 14px;"> 🔗allbibek</span></a></span>'
    },
    outline: [2, 3],
  },
});
