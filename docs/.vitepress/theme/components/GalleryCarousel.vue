<template>
  <div>
    <h2 class="gallery-title">Explore More &darr;</h2>
    <div class="carousel">
      <!-- Tombol Prev -->
      <button @click="prev" class="carousel-btn prev">❮</button>

      <!-- Swiper Carousel -->
      <swiper
        ref="swiperRef"
        @swiper="onSwiper"
        :slides-per-view="'auto'"
        :centeredSlides="true"
        :space-between="20"
        :pagination="{ clickable: true }"
        class="carousel-container"
      >
      <swiper-slide
        v-for="(image, index) in images"
        :key="index"
        class="slide"
      >
        <img :src="image.src" :alt="image.alt" @click="showLightbox(index)" />
      </swiper-slide>
    </swiper>

      <!-- Tombol Next -->
      <button @click="next" class="carousel-btn next">❯</button>
    </div>

    <!-- Lightbox -->
    <vue-easy-lightbox 
      :visible="visible"
      :imgs="images.map(img => img.src)"
      :index="lightboxIndex"
      @hide="closeLightbox"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import VueEasyLightbox from "vue-easy-lightbox";

const images = ref([
  { src: "https://framerusercontent.com/images/67h2DVc4IdYXb81Q7E8JaRwp7A.jpg?scale-down-to=512", alt: "Project 1" },
  { src: "https://framerusercontent.com/images/zFN6pFb5EpznGaqPUCHYW7GkngU.jpg?scale-down-to=512", alt: "Project 2" },
  { src: "https://framerusercontent.com/images/G3XVWhCFlN7SvjG805tkppyWQLI.jpg?scale-down-to=512", alt: "Project 3" },
  { src: "https://framerusercontent.com/images/YQLg2i8xIXqc8LwebCyY92SUdo.jpg?scale-down-to=512", alt: "Project 4" }
]);

const swiperInstance = ref(null);
const visible = ref(false);
const lightboxIndex = ref(0);
const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

const next = () => {
  if (swiperInstance.value) swiperInstance.value.slideNext();
};

const prev = () => {
  if (swiperInstance.value) swiperInstance.value.slidePrev();
};


const showLightbox = (index) => {
  lightboxIndex.value = index;
  visible.value = true;
};

const closeLightbox = () => {
  visible.value = false;

  // Tunggu sedikit sebelum memperbaiki Swiper
  setTimeout(() => {
    if (swiperInstance.value) {
      swiperInstance.value.update();
      swiperInstance.value.slideTo(lightboxIndex.value); // Pastikan swiper kembali ke slide yang benar
    }
  }, 200);
};
</script>

<style scoped>
.gallery-title {
  text-align: center;
  margin: 2rem 0;
}

.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: fit-content;
  max-width: 1200px;
  margin: auto;
}

.carousel-container {
  width: 700px;
  max-width: 90vw;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.slide {
  width: 512px; /* Ukuran default 300px*/
  overflow: hidden;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.swiper-slide-active {
  transform: scale(1);
  opacity: 1;
}

.swiper-slide-prev,
.swiper-slide-next {
  transform: scale(0.9);
  opacity: 0.5;
}

.carousel-container img {
  width: 100%;
  height: auto;
  cursor: pointer;
  object-fit: contain;
  transition: transform 0.3s ease-in-out;
  border-radius: 20px;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.3s ease;
  z-index: 10;
}

.carousel-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

@media (max-width: 768px) {
  .carousel {
    max-width: 90vw;
  }

  .carousel-container {
    width: 100%;
    max-width: 90vw;
    aspect-ratio: 16 / 9;
  }

  .carousel-container img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  .slide {
    width: 330px;
  }
  
  .carousel-btn {
    width: 32px;
    height: 32px;
    padding: 0px;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .prev {
    left: 40px;
  }

  .next {
    right: 40px;
  }
}

</style>