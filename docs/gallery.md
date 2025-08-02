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
      link: /blog/post/introduction
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

