<template>
  <div class="masonry-grid">
    <div 
      v-for="(image, index) in displayedImages" 
      :key="index" 
      class="masonry-item"
      :class="{ 'large': isLargeColumn(index) }"
    >
      <img :src="image.src" :alt="image.alt" loading="lazy" @click="openLightbox(index)" />
    </div>
  </div>

  <button v-if="canLoadMore" class="load-more" @click="loadMore">
    Load More
  </button>

  <!-- Lightbox -->
  <ClientOnly>
  <vue-easy-lightbox 
    v-if="visible"
    :visible="visible" 
    :imgs="images.map(img => img.src)" 
    :index="lightboxIndex" 
    @hide="closeLightbox"
  />
  </ClientOnly>
</template>

<script setup>
import { ref, computed } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";

const images = ref([
  { src: "https://framerusercontent.com/images/RoHrmhTbdYJgHCLAtYVIPACylNw.png?scale-down-to=512", alt: "Project 1" },
  { src: "https://i.pinimg.com/736x/a3/67/89/a36789b269d3ddc150939a31b3a390dd.jpg", alt: "Project 2" },
  { src: "https://framerusercontent.com/images/67h2DVc4IdYXb81Q7E8JaRwp7A.jpg?scale-down-to=512", alt: "Project 3" },
  { src: "https://framerusercontent.com/images/zFN6pFb5EpznGaqPUCHYW7GkngU.jpg?scale-down-to=512", alt: "Project 4" },
  { src: "https://framerusercontent.com/images/G3XVWhCFlN7SvjG805tkppyWQLI.jpg?scale-down-to=512", alt: "Project 5" },
  { src: "https://framerusercontent.com/images/YQLg2i8xIXqc8LwebCyY92SUdo.jpg?scale-down-to=512", alt: "Project 6" },
  { src: "https://framerusercontent.com/images/2yOyHgSFXxalpvLcLJ8KuPRnwHw.jpg?scale-down-to=512", alt: "Project 7" },
  { src: "https://framerusercontent.com/images/6fcuj6p45ztF7fmviFiBoIOIZVg.jpg?scale-down-to=512", alt: "Project 8" },
  { src: "https://framerusercontent.com/images/cBwrxVoWFunDBgL7xAPfoGWpc0.jpg?scale-down-to=512", alt: "Project 9" },
  { src: "https://framerusercontent.com/images/zFN6pFb5EpznGaqPUCHYW7GkngU.jpg?scale-down-to=512", alt: "Project 10" },
  { src: "https://framerusercontent.com/images/67h2DVc4IdYXb81Q7E8JaRwp7A.jpg?scale-down-to=512", alt: "Project 11" },
  { src: "https://framerusercontent.com/images/RoHrmhTbdYJgHCLAtYVIPACylNw.png?scale-down-to=512", alt: "Project 12" },
  { src: "https://framerusercontent.com/images/RoHrmhTbdYJgHCLAtYVIPACylNw.png?scale-down-to=512", alt: "Project 13" },
  { src: "https://framerusercontent.com/images/G2Fe0jsb285MWUBlQEG3yP90t4.png", alt: "Project 14" },
  { src: "https://framerusercontent.com/images/67h2DVc4IdYXb81Q7E8JaRwp7A.jpg?scale-down-to=512", alt: "Project 15" },
  { src: "https://framerusercontent.com/images/zFN6pFb5EpznGaqPUCHYW7GkngU.jpg?scale-down-to=512", alt: "Project 16" },
  { src: "https://framerusercontent.com/images/G3XVWhCFlN7SvjG805tkppyWQLI.jpg?scale-down-to=512", alt: "Project 17" },
  { src: "https://framerusercontent.com/images/YQLg2i8xIXqc8LwebCyY92SUdo.jpg?scale-down-to=512", alt: "Project 18" },
  { src: "https://framerusercontent.com/images/cBwrxVoWFunDBgL7xAPfoGWpc0.jpg?scale-down-to=512", alt: "Project 19" },
  { src: "https://i.pinimg.com/736x/a3/67/89/a36789b269d3ddc150939a31b3a390dd.jpg", alt: "Project 20" },
  { src: "https://framerusercontent.com/images/67h2DVc4IdYXb81Q7E8JaRwp7A.jpg?scale-down-to=512", alt: "Project 21" },
  { src: "https://framerusercontent.com/images/zFN6pFb5EpznGaqPUCHYW7GkngU.jpg?scale-down-to=512", alt: "Project 22" },
  { src: "https://framerusercontent.com/images/G3XVWhCFlN7SvjG805tkppyWQLI.jpg?scale-down-to=512", alt: "Project 23" },
  { src: "https://framerusercontent.com/images/6fcuj6p45ztF7fmviFiBoIOIZVg.jpg?scale-down-to=512", alt: "Project 24" },
  { src: "https://i.pinimg.com/1200x/51/e6/c9/51e6c9c5d802478a2db1c645bac02e44.jpg", alt: "Project 25" },
]);


const visible = ref(false);
const lightboxIndex = ref(0);

const batchSize = 6;
const displayedCount = ref(batchSize);
const displayedImages = computed(() => images.value.slice(0, displayedCount.value));
const canLoadMore = computed(() => displayedCount.value < images.value.length);

const openLightbox = (index) => {
  lightboxIndex.value = index;
  visible.value = true;
};

const closeLightbox = () => {
  visible.value = false;
};

const loadMore = () => {
  displayedCount.value += batchSize;
};

const isLargeColumn = (index) => {
  return (index % 4 === 1 || index % 4 === 3);
};

</script>

<style scoped>
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 Kolom */
  grid-auto-rows: 150px; /* Dasar tinggi tiap baris */
  gap: 12px;
  padding: 10px;
  
}

.masonry-item {
  display: flex;
  overflow: hidden;
  border-radius: 10px;
}

.masonry-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  filter: brightness(0.95);
  transform-origin: center;
  cursor: pointer;

  will-change: transform, filter;

  transition: transform 1s cubic-bezier(0.3, 0, 0.2, 1), 
              filter 1s cubic-bezier(0.3, 0, 0.2, 1);

}

.masonry-item img:hover {
  transform: scale(1.03);
  filter: brightness(1);
}

.masonry-item.large {
  grid-row: span 2; /* Kolom ke-2 dan ke-4 lebih tinggi */
}

.load-more {
  display: block;
  width: auto;
  margin: 20px auto;
  padding: 10px 20px;
  border: none;
  background: var(--vp-button-brand-bg);
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 60px;
  transition: 0.3s;
}

.load-more:hover {
  background: #0056b3;
}

.masonry-item:nth-child(24) img {
  height: 150px !important; /* Paksa tinggi gambar Project 24 */
  object-fit: cover;
}

@media (max-width: 768px) {
  .masonry-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .masonry-item.large {
    grid-row: span 1;
  }
  
}
</style>
