<script setup>
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>

<template>
  <div v-if="frontmatter.banner" class="post-banner-wrapper">
    <img :src="frontmatter.banner" alt="Banner" class="post-banner" />
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
    margin-bottom: 5vh;
    overflow: hidden;
    max-height: 30vh;
}

.post-banner {
    width: 100%;
    max-height: 250px;
    object-fit: cover;
    /* border-radius: 12px; */
    margin-bottom: 1.5rem;
}

.dark .post-banner {
    filter: brightness(0.8);
}

.post-title {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: 0.75rem;
    font-size: 2.5rem;
    font-weight: 900;
    margin-top: 2rem;
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
}
</style>