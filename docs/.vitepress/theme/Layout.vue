<script setup>
import DefaultTheme from "vitepress/theme";
import VPSwitch from "./components/VPSwitchAppearance.vue";
import ThemeToggle from "./components/ThemeToggle.vue";
import ArticleHead from './components/ArticleHead.vue'

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #nav-bar-content-before>
        <VPSwitch />
        <ThemeToggle />
    </template>

        <template #doc-before>
      <ArticleHead />
    </template>
  </Layout>
</template>
