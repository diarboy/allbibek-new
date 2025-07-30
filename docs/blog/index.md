---
layout: home
title: "Welcome to Blog!"
description: An immersive visual experience showcasing my creative works.
hero:
  name: 
  text: WHAT A BLOGS? 
  tagline: An immersive visual experience showcasing my creative works.
  image:
    src: /img/hero3.png
    alt: allbibek.
  actions:
    - theme: brand
      text: Back Home
      link: /index
    - theme: alt
      text: Contact
      link: /contact
---

<BlogList />

<script setup lang="ts">
import BlogList from './../.vitepress/theme/components/BlogList.vue'
</script>
