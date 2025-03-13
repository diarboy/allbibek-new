<script setup>
import { ref } from "vue";
import { useParallax, useElementVisibility } from "@vueuse/core";

const target = ref(null);
const { tilt, roll } = useParallax(target);
const isVisible = useElementVisibility(target);
</script>

<template>
  <div ref="target" class="hero">
    <div
      class="hero-bg"
      :style="{
        transform: `translateY(${tilt * 10}px) translateX(${roll * 5}px)`
      }"
    ></div>
    <div class="hero-content">
      <slot>
        <h1>🌍 Selamat Datang di VitePress</h1>
        <p>Dokumentasi yang cepat, ringan, dan modern!</p>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  color: white;
  opacity: v-bind(isVisible ? 1 : 0);
  transform: v-bind(isVisible ? "translateY(0)" : "translateY(50px)");
  transition: opacity 1s ease-out, transform 1s ease-out;
  border-radius: 30px;
  margin: 20px auto;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://framerusercontent.com/images/RoHrmhTbdYJgHCLAtYVIPACylNw.png') no-repeat center;
  background-size: cover;
  transition: transform 0.1s ease-out;
  z-index: -1;
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 20px;
}

::v-deep(.hero-content h1) {
    font-family: 'Manrope', sans-serif;
    font-size: 2.5rem;
    font-weight: normal;
    letter-spacing: -0.05em;
    line-height: 1.3;
    color: transparent;
    background: var(--hero-text-gradient-dark);
    -webkit-background-clip: text;
    background-clip: text;
    text-align: center;
  }

@media (max-width: 768px) {
   ::v-deep(.hero-content h1) { font-size: 2rem; }
}

.hero {
  position: relative;
  height: 330px;
  margin: 20px 20px 0 20px;
}
</style>
