<template>
  <div class="social-share">
    Bagikan Artikel Ini:
    <a :href="`https://twitter.com/intent/tweet?url=${encodedPageUrl}&text=${encodedPageTitle}`" target="_blank" rel="noopener noreferrer">Twitter</a>
    <a :href="`https://www.facebook.com/sharer/sharer.php?u=${encodedPageUrl}`" target="_blank" rel="noopener noreferrer">Facebook</a>
    <a :href="`https://www.linkedin.com/shareArticle?mini=true&url=${encodedPageUrl}&title=${encodedPageTitle}`" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';

const { page, frontmatter } = useData();

const pageUrl = computed(() => {

  const baseUrl = 'https://allbibek.ardisyh.site/';
  return `${baseUrl}${page.value.relativePath.replace(/(\/index)?\.md$/, '.html')}`;
});

const pageTitle = computed(() => frontmatter.value.title || page.value.title);

const encodedPageUrl = computed(() => encodeURIComponent(pageUrl.value));
const encodedPageTitle = computed(() => encodeURIComponent(pageTitle.value));
</script>

<style scoped>
.social-share {
  margin-top: 20px;
  padding: 10px;
  border-top: 1px solid #eee;
}
.social-share a {
  display: inline-block;
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  text-decoration: none;
  color: #333;
}
.social-share a:hover {
  background-color: #e0e0e0;
}
</style>