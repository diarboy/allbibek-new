import DefaultTheme from 'vitepress/theme';
import PinterestEmbed from './components/PinterestEmbed.vue';
import GalleryMasonry from './components/GalleryMasonry.vue';
import GalleryCarousel from './components/GalleryCarousel.vue';
import pdfmake from './components/pdfmake.vue';
import FAQ from './components/FAQ.vue';
import Blog from './components/blog.vue';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {

    DefaultTheme.enhanceApp?.({ app });

    app.component('FAQ', FAQ);
    app.component('PinterestEmbed', PinterestEmbed);
    app.component('GalleryMasonry', GalleryMasonry);
    app.component('GalleryCarousel', GalleryCarousel);
    app.component('pdfmake', pdfmake);
    app.component('Blog', Blog);
  },
};
