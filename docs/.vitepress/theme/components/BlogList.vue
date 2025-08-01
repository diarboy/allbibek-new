// .vitepress/theme/BlogList.vue
<template>
  <div class="blog-list">
    <small>From newest to oldest ↓</small>
    <noscript>
      <small>To use the filter you need JavaScript to be enabled.</small>
    </noscript>
    <div class="filter-tags">
      <button
        :class="{ active: selectedTag === null }"
        @click="filterPosts('')"
        id="all-tags"
      >
        All
      </button>

      <button
        v-for="tag in uniqueTags"
        :key="tag"
        :class="{ active: selectedTag === tag }"
        @click="filterPosts(tag)"
      >
        {{ tag }}
      </button>

    </div>
    <div class="post-container">
      <article
        v-for="post in paginatedPosts"
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
        <div class="date">
          {{ post.date }}
          <span v-if="post.author">
            &middot; {{ Array.isArray(post.author) ? `Authors: ${post.author.join(', ')}` : `${post.author}`
    }}
          </span>
        </div>
      </article>
    </div>
    
    <div class="pagination">
      <button
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        ← Prev
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: currentPage === page }"
      >
        {{ page }}
      </button>

      <button
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        Next →
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { data as posts } from './blog.data'
import { computed, ref } from 'vue'

const postsPerPage = 5
const currentPage = ref(1)

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / postsPerPage)
})

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

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
  padding: 1rem 0;
}

.blog-list small {
  font-family: 'Manrope', sans-serif;
  font-weight: 300;
  font-size: 1.3rem;
  color: var(--vp-c-text-2);
  letter-spacing: 0.03em;
  display: block;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}


.filter-tags {
  margin-bottom: 2rem;
}

.filter-tags button {
  margin-top: 0.8rem;
  margin-right: 0.5rem;
  padding: 0.25rem 0.75rem;
  border: none;
  background-color: var(--vp-custom-block-info-bg);
  cursor: pointer;
  border-radius: 12px;
  font-size: 0.875rem;
}

.filter-tags button.active {
  background-color: var(--vp-c-brand-2);
  color: white;
  font-weight: 600;
}

.dark .filter-tags button.active {
  background-color: var(--vp-c-sponsor);
  color: white;
}

.post-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.post-card {
  background-color: var(--vp-custom-block-info-bg);
  background-size: cover;
  background-position: center;
  border-radius: 1rem;
  padding: 2rem;
  color: #000;
  position: relative;
  min-height: 250px;
}

.post-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.2));
  border-radius: 1rem;
  background: rgba(0, 0, 0, 0.3);
  z-index: 0;
}

.post-card > * {
  position: relative;
  z-index: 1;
}

.post-card h3 a {
  color: #fff;
  font-size: 2.5rem;
  line-height: 1;
  text-decoration: none;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  }

.post-card p {
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  line-height: 1.3;
  letter-spacing: 0.09em;
  padding-right: 2rem;
  max-width: 60ch;
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
  background: var(--card-text-bg-soft);
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
}

.post-card .date {
  text-align: right;
  font-size: 1.2rem;
  font-weight: 500;
  font-family: 'Manrope', sans-serif;
  color: #eee;
  position: relative;
  letter-spacing: 0.09em;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.pagination button {
  background-color: var(--vp-custom-block-info-bg);
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background 0.2s;
}

.pagination button:hover:not(:disabled) {
  background-color: var(--vp-c-sponsor);
  color: white;
}

.pagination button.active {
  background-color: var(--vp-c-brand-2);
  color: white;
  font-weight: bold;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

</style>
