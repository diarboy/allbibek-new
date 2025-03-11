<script setup>
import { ref, onMounted } from 'vue';

const isVisible = ref(false);

onMounted(() => {
    const observer = new IntersectionObserver(([entry]) => {
    setTimeout(() => {
        isVisible.value = entry.isIntersecting;
    }, 300);
  }, { threshold: 0.4 });

  observer.observe(document.querySelector('.play-title'));
});
</script>

<template>
  <Transition name="fade">
    <div v-if="isVisible" class="play-title">
        <h1>This Playground is still<br>a Work in Progress</h1>
        <p>But feel free to give it a try!</p>
    </div>
  </Transition>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s ease !important;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.play-title h1 {
    font-family: 'Manrope', sans-serif;
    font-size: 2.5rem;
    font-weight: 900;
    letter-spacing: -0.05em;
    line-height: 1.3;
    color: transparent;
    background: var(--hero-text-gradient-light);
    -webkit-background-clip: text;
    background-clip: text;
    text-align: center;
  }

  html.dark .play-title h1 {
    background: var(--hero-text-gradient-dark);
    -webkit-background-clip: text;
    background-clip: text;
  }

  .play-title p {
    text-align: center;
    font-size: 1.3rem;
  }

@media (max-width: 768px) {
  .play-title h1 { font-size: 2rem; }
  .play-title h2 { font-size: 2rem; }
  .play-title p { font-size: 1rem; }
}

</style>
