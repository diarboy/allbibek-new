<script setup>
import { useData } from 'vitepress'
import { ref, watchPostEffect } from 'vue'

const { isDark, theme } = useData()

const toggleAppearance = () => {
  isDark.value = !isDark.value
  localStorage.setItem('vitepress-theme-appearance', isDark.value ? 'dark' : 'light')
}

const switchTitle = ref('')

watchPostEffect(() => {
  switchTitle.value = isDark.value
    ? theme.value.lightModeSwitchTitle || 'Switch to light theme'
    : theme.value.darkModeSwitchTitle || 'Switch to dark theme'
})
</script>

<template>
  <button
    class="ThemeIconToggle"
    :title="switchTitle"
    :aria-label="switchTitle"
    @click="toggleAppearance"
  >
    <span class="vpi-sun sun" />
    <span class="vpi-moon moon" />
  </button>
</template>

<style scoped>
.ThemeIconToggle {
  position: relative;
  margin-right: -15px;
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

/* Efek hover */
.ThemeIconToggle:hover {
  transform: scale(1.2);
}

/* Sun dan Moon */
.sun, .moon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
  -webkit-mask-size: contain;
  mask-size: contain;
}

/* Sun (mode terang) */
.sun {
  background: var(--hero-text-gradient-light);
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

/* Moon (mode gelap) */
.moon {
  background: var(--hero-text-gradient-dark);
  opacity: 0;
  transform: scale(0.8) rotate(-20deg);
}

/* Saat Mode Gelap */
.dark .sun {
  opacity: 0;
  transform: scale(0.8) rotate(20deg);
}

.dark .moon {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

/* Responsive: Sembunyikan di layar besar */
@media (min-width: 768px) {
  .ThemeIconToggle {
    margin-left: 5px;
    display: none;
  }
}
</style>
