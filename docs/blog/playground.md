---
layout: home
title: "Playground"

hero:
  name: "Playground"
  text: "A space to explore, test, and refine your code."
  tagline: Experiment, create, and refine interactive functions effortlessly. Explore coding, creativity, and problem-solving in a hands-on environment designed for learning and innovation.
  image:
    src: /img/hero3.png
    alt: allbibek.
  actions:
    - theme: brand
      text: Back Home
      link: /index
    - theme: alt
      text: Contact
      link: /contact

---

<script setup>
import NotFound from '../.vitepress/theme/components/NotFound.vue';
import TabsComponent from '../.vitepress/theme/components/Tabs.vue';
import Chart from '../.vitepress/theme/components/Chart.vue';
</script>

<NotFound />

<div class="play-title" data-aos="fade-up">
  <h1>This Playground is still<br>a Work in Progress</h1>
  <p> But feel free to give it a try! </p>

  <ClientOnly>
    <TabsComponent />
  </ClientOnly>

  <ClientOnly>
    <Chart />
  </ClientOnly>

  <div data-aos="fade-right" data-aos-delay="300">
    <h2 style= "text-align: center">Slide dari kiri dengan durasi 1 detik dan delay 300ms</h2>
  </div>

  <div data-aos="zoom-in" data-aos-offset="300" data-aos-delay="600">
    <p>Zoom-in setelah di-scroll lebih jauh</p>
  </div>

  <div data-aos="fade-up" data-aos-delay="600">
    <p>Fade-in dari bawah dengan efek easing smooth</p>
  </div>
</div>

## 📌 Custom Block Testing

### ✅ Tip Block
::: tip
Ini adalah contoh **Tip Block**. Biasanya digunakan untuk memberikan saran atau informasi penting yang membantu pembaca.
:::

### ℹ️ Info Block
::: info
Ini adalah contoh **Info Block**. Biasanya digunakan untuk memberikan informasi tambahan atau latar belakang suatu topik.
:::

### ⚠️ Warning Block
::: warning
Ini adalah contoh **Warning Block**. Digunakan untuk peringatan atau informasi yang harus diperhatikan dengan serius.
:::

### ❌ Danger Block
::: danger
Ini adalah contoh **Danger Block**. Biasanya digunakan untuk memperingatkan bahaya atau kesalahan yang harus dihindari.
:::

### 📖 Details Block
::: details Detail Tambahan
Klik untuk melihat isi dari **Details Block**. Cocok untuk informasi yang tidak harus selalu ditampilkan.
:::

<pdfmake />

<style scoped>

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