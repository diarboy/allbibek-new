<script setup>
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>

<template>
  <div v-if="frontmatter.banner" class="post-banner-wrapper">
    <img :src="frontmatter.banner" alt="Banner" class="post-banner" />
    <div class="banner-gradient-overlay" />
  </div>

  <h1 class="post-title">
    <span class="title-text">{{ frontmatter.title }}</span>
    <span class="title-badges">
      <Badge
        v-for="tag in frontmatter.tags"
        :key="tag"
        type="warning"
        :text="tag"
      />
    </span>
  </h1>
</template>

<style scoped>

.post-banner-wrapper {
    position: relative;
    width: 100vw;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    margin-top: -20vh;
    overflow: hidden;
    max-height: 30vh;
}

.post-banner {
    width: 100%;
    max-height: 250px;
    object-fit: cover;
    /* border-radius: 12px; */    
}

.dark .post-banner {
    filter: brightness(0.8);
}

.banner-gradient-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 200px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), var(--vp-c-bg));
  pointer-events: none;
}

.dark .banner-gradient-overlay {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), var(--vp-c-bg));
}


.post-title {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: 0.75rem;
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: 900;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-family: 'Manrope', sans-serif;
}

.post-title .title-text {
    flex-shrink: 1;
    min-width: 0;
}

.post-title .title-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    flex-shrink: 0;
}

@media (max-width: 600px) {
  .post-title {
    font-size: 2rem;
    flex-wrap: wrap;
    line-height: 1.2;
  }

.post-banner-wrapper {
      max-height: 25vh;
}

  .banner-gradient-overlay {
    height: 200px;
  }
}
</style>