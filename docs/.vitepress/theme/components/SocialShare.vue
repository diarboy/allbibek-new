<template>
  <div class="social-share">
    <a
      :href="`https://twitter.com/intent/tweet?url=${encodedPageUrl}&text=${encodedPageTitle}`"
      target="_blank"
      rel="noopener noreferrer"
      class="share-btn"
    >
      <Icon icon="proicons:x-twitter" class="icon" />
    </a>
    <a
      :href="`https://www.facebook.com/sharer/sharer.php?u=${encodedPageUrl}`"
      target="_blank"
      rel="noopener noreferrer"
      class="share-btn"
    >
     <Icon icon="basil:facebook-outline" class="icon" />
    </a>
    <a
      :href="`mailto:?subject=${encodedPageTitle}&body=${encodedPageUrl}`"
      target="_blank"
      rel="noopener noreferrer"
      class="share-btn"
    >
      <Icon icon="fluent:mail-32-regular" class="icon" />
    </a>
    <a
      :href="`https://wa.me/?text=${encodedPageTitle}%20${encodedPageUrl}`"
      target="_blank"
      rel="noopener noreferrer"
      class="share-btn"
    >
      <Icon icon="fa7-brands:whatsapp" class="icon" />
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { Icon } from '@iconify/vue'

const { page, frontmatter } = useData()

const pageUrl = computed(() => {
  const baseUrl = 'https://allbibek.ardisyh.site/'
  return `${baseUrl}${page.value.relativePath.replace(/(\/index)?\.md$/, '.html')}`
})

const pageTitle = computed(() => frontmatter.value.title || page.value.title)

const encodedPageUrl = computed(() => encodeURIComponent(pageUrl.value))
const encodedPageTitle = computed(() => encodeURIComponent(pageTitle.value))
</script>

<style scoped>
.social-share {
  margin-top: 10px;
  padding: 2px 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.share-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 6px;
  text-decoration: none;
  color: #333;
  transition: background-color 0.2s ease;
}

.share-btn:hover {
  background-color: var(--vp-custom-block-info-bg);
  border-radius: 40px;
}

.icon {
  width: 1.2rem;
  height: 1.2rem;
  color: var(--vp-c-text-1);
}
</style>
