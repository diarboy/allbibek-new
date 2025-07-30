// .vitepress/theme/BlogList.vue
<template>
  <div class="blog-list">
    <small>From newest to oldest ↓</small>
    <noscript>
      <small>To use the filter you need JavaScript to be enabled.</small>
    </noscript>
    <div class="filter-tags">
      <button @click="filterPosts('')" id="all-tags">All</button>
      <button v-for="tag in uniqueTags" :key="tag" @click="filterPosts(tag)">
        {{ tag }}
      </button>
    </div>
    <div class="post-container">
      <article
        v-for="post in filteredPosts"
        :key="post.title"
        class="post-card"
        :style="post.banner ? `background-image: url(${post.banner})` : ''"
      >
        <h3>
          <a :href="post.url">
            {{ post.title }} →
          </a>
        </h3>
        <p v-if="post.description">{{ post.description }}</p>
        <div class="tags" v-if="post.tags">
          <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
        </div>
        <p class="date">
          {{ post.date }}
          <span v-if="post.author">
            &middot; {{ Array.isArray(post.author) ? post.author.join(', ') : post.author }}
          </span>
        </p>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { data as posts } from './blog.data'
import { computed, ref } from 'vue'

const selectedTag = ref(null)

const allTags = computed(() => {
  return posts.reduce((tags, post) => {
    return tags.concat(Array.isArray(post.tags) ? post.tags : [post.tags])
  }, [])
})

const uniqueTags = computed(() => {
  const tags = [...new Set(allTags.value)]
  return tags.filter(tag => tag !== '')
})

const filteredPosts = computed(() => {
  return selectedTag.value === null
    ? posts
    : posts.filter(post =>
        Array.isArray(post.tags)
          ? post.tags.includes(selectedTag.value)
          : post.tags === selectedTag.value
      )
})

function filterPosts(tag: string) {
  selectedTag.value = tag === '' ? null : tag
}
</script>

<style scoped>
.blog-list {
  padding: 1rem 2rem;
}

.filter-tags {
  margin-bottom: 1.5rem;
}

.filter-tags button {
  margin-right: 0.5rem;
  padding: 0.25rem 0.75rem;
  border: none;
  background-color: #e0e0e0;
  cursor: pointer;
  border-radius: 12px;
  font-size: 0.875rem;
}

.post-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.post-card {
  background-color: #f9f9f9;
  background-size: cover;
  background-position: center;
  border-radius: 1rem;
  padding: 2rem;
  color: #000;
  position: relative;
  min-height: 250px;
}

.post-card h3 a {
  color: #fff;
  font-size: 2.5rem;
  text-decoration: none;
  font-family: 'Manrope', sans-serif;
  font-weight: 900;
  }

.post-card p {
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
  font-family: 'Lora', sans-serif;
  font-weight: 300;
  }

.post-card .tags {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.post-card .tags span {
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
}

.post-card .date {
  font-size: 0.875rem;
  font-weight: 500;
  color: #eee;
  position: absolute;
  bottom: 1rem;
  right: 2rem;
}
</style>
