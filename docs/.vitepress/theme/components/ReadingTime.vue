<script setup>
import { ref, computed, onMounted } from 'vue';
import { useData } from 'vitepress'

const { frontmatter, page } = useData()

const wordsPerMinute = 200;
const wordCount = ref(0);
const readingTime = ref("0 menit 0 detik");

const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', day: '2-digit', year: 'numeric' 
  }).format(date);
};

const formattedDate = computed(() => {
  return formatDate(frontmatter.value.date) || formatDate(page.value.lastUpdated) || "No date available";
});

onMounted(() => {
  setTimeout(() => {
    // Ambil semua teks dari halaman artikel
    const content = document.querySelector('.VPDoc')?.innerText || "";

    console.log("Konten halaman (dari DOM):", content); // Debugging log

    if (content) {
      const words = content.trim().split(/\s+/).length;
      wordCount.value = words;
      const totalSeconds = (words / wordsPerMinute) * 60;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = Math.round(totalSeconds % 60);
      readingTime.value = `${minutes} min ${seconds} sec`;
    }
  }, 500); // Tunggu 500ms agar DOM selesai dimuat
});
</script>

<template>
 
 <!--  <p>⏳ {{ readingTime }} read</p> // normal buat backup --> 

  <div class="meta">
  <span>✍️ {{ frontmatter.author }}</span> |
  <span>📅 {{ formattedDate }}</span> <br>
  <span>🕛 {{ readingTime }} read</span> | ⏳ {{ wordCount }} words </br>

</div>
</template>

<style scoped>
.meta {
  font-size: 14px;
  color: gray;
}
</style>
