<script lang="ts" setup>
import { useData } from 'vitepress'
import { ref, watchPostEffect } from 'vue'
import VPSwitch from './VPSwitch.vue'

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
  <VPSwitch
    :title="switchTitle"
    class="VPSwitchAppearance"
    :aria-checked="isDark"
    @click="toggleAppearance"
  >
    <span class="vpi-sun sun" />
    <span class="vpi-moon moon" />
  </VPSwitch>
</template>

<style scoped>
.sun {
  opacity: 1;
}
.moon {
  opacity: 0;
}
.dark .sun {
  opacity: 0;
}
.dark .moon {
  opacity: 1;
}
.dark .VPSwitchAppearance :deep(.check) {
  transform: translateX(18px);
}

/* Sembunyikan tombol di desktop */
@media (min-width: 768px) {
  .VPSwitchAppearance {
    display: none;
  }
}

</style>
