---
layout: home
title: "Gallery"
description: An immersive visual experience showcasing my creative works.
hero:
  name: 
  text: Discover My Visual Journey 
  tagline: A collection of my best works, from photography to digital creations. 
  image:
    src: /img/hero2.png
    alt: gallery
  actions:
    - theme: brand
      text: What a Blog
      link: /blog/introduction
    - theme: sponsor
      text: Hire Me
      link: /contact
features:
  - icon: 🖼️
    title: High-Quality Images
    details: Curated selection of high-resolution images.
  - icon: 🌎
    title: Global Inspirations
    details: Works inspired by diverse cultures and landscapes.
  - icon: 📱
    title: Optimized for Mobile
    details: Seamlessly browse on any device.
---

<section>

<div class="gallery-content">
<div>
  <h2>Welcome to My Gallery</h2>
  <p> Enjoy a collection of my best works. </p>
</div>
</div>

<div> 
<HeroParallax>
  <span style="font-size: 2.5rem;">📷</span>
  <h1>Love Capture.</h1>
  <p>Each image I capture is a story waiting to be told, a moment frozen in time, and an emotion expressed through light and shadow.</p>
</HeroParallax>
</div>
</section>

<section class="gallery-content">
  <div>
    <h2>Explore the Collection</h2>
  </div>
 
  <ClientOnly>
    <GalleryMasonry />
    <GalleryCarousel />
  </ClientOnly>
</section>

<script setup>

import HeroParallax from './.vitepress/theme/components/HeroParallax.vue';

</script>

<style>

  .gallery-content h2 {
    font-family: 'Manrope', sans-serif;
    font-size: 2.5rem;
    font-weight: normal;
    letter-spacing: -0.05em;
    line-height: 1.3;
    color: transparent;
    background: var(--hero-text-gradient-light);
    -webkit-background-clip: text;
    background-clip: text;
    text-align: center;
  }

  html.dark .gallery-content h2 {
    background: var(--hero-text-gradient-dark);
    -webkit-background-clip: text;
    background-clip: text;
  }
  
  .gallery-content p {
    text-align: center;
  }

@media (max-width: 768px) {
  .gallery-hero { height: 40vh; }
  .gallery-hero h1 { font-size: 2rem; }
  .gallery-content h2 { font-size: 2rem; }
  .gallery-hero p { font-size: 1rem; }
  .features-container { grid-template-columns: 1fr; }
  .feature-item { max-width: 90%; margin: 0 auto; }
}
</style>
