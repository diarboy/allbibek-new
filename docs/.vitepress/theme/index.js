import DefaultTheme from 'vitepress/theme';
import PinterestEmbed from './components/PinterestEmbed.vue';
import GalleryMasonry from './components/GalleryMasonry.vue';
import GalleryCarousel from './components/GalleryCarousel.vue';
import pdfmake from './components/pdfmake.vue';
import FAQ from './components/FAQ.vue';
import Blog from './components/blog.vue';
import ArticleHead from './components/ArticleHead.vue'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from './Layout.vue';
import './custom.css'

export default {
  ...DefaultTheme, Layout,

  enhanceApp({ app }) {

    DefaultTheme.enhanceApp?.({ app });

    app.component('FAQ', FAQ);
    app.component('PinterestEmbed', PinterestEmbed);
    app.component('GalleryMasonry', GalleryMasonry);
    app.component('GalleryCarousel', GalleryCarousel);
    app.component('pdfmake', pdfmake);
    app.component('Blog', Blog);
    app.component('ArticleHead', ArticleHead);
    
    if (typeof window !== 'undefined') {
      AOS.init({
        delay: 200,
        duration: 1500,
        easing: 'ease-in-out',
        mirror: true,
        once: false,
      });
    }
  },
};
