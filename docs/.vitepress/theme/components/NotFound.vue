<script setup lang="ts">
import { withBase, useData } from 'vitepress'

const { theme } = useData() // Tetap gunakan useData() dari VitePress

</script>

<template>
  <div class="NotFound">
    <div data-aos="zoom-in-right">  
      <img :src="withBase('/img/hero3.png')" alt="Hero 1" class="hero hero-left" />
    </div>
  <div class="container-code">
    <p class="code code-small" data-aos="zoom-in-up" data-aos-delay="200">{{ theme.notFound?.code ?? 'Ooops!' }}</p>
    <p class="code code-large" data-aos="zoom-in-up" data-aos-delay="400">{{ theme.notFound?.code ?? "Sorry" }}</p>
    <p class="code code-small" data-aos="zoom-in-up" data-aos-delay="600">{{ theme.notFound?.code ?? "We're" }}</p>
    <h1 class="title" data-aos="zoom-in-up" data-aos-delay="800">{{ theme.notFound?.title ?? 'UNDER DEVELOPMENT' }}</h1>
  
    <div class="divider" data-aos="zoom-in-up" data-aos-delay="800"></div>
    <blockquote class="quote" data-aos="zoom-in-up" data-aos-delay="800">
      {{
        theme.notFound?.quote ??
        "But if you don't change your direction, and if you keep looking, you may end up where you are heading."
      }}
    </blockquote>

    <div class="action" data-aos="zoom-in-up" data-aos-delay="900" data-aos-offset="300">
      <a
        class="link"
        :href="withBase('/')"
        :aria-label="theme.notFound?.linkLabel ?? 'Go to home'"
      >
        {{ theme.notFound?.linkText ?? 'Take me home' }}
      </a>
      </div>
    </div>
    <div data-aos="zoom-in-left" data-aos-offset="300">
    <img :src="withBase('/img/hero2.png')" alt="Hero 2" class="hero hero-right" />
  </div>
  </div>
</template>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease !important;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.NotFound {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 20px 24px;
  text-align: center;
}

.hero {
  width: 400px;
  height: auto;
}

@media (min-width: 768px) {
  .NotFound {
    flex-direction: row;
  }

  .hero-left {
    order: -1;
  }

  .hero-right {
    order: 1; 
  }
}

/* Tata letak untuk layar kecil (mobile) */
@media (max-width: 767px) {
  .NotFound {
    flex-direction: column;
    align-items: center;
  }

  .hero {
    width: 330px; 
  }

  .hero-left {
    margin: -50px 0 -50px 0;
  }

  .hero-right {
    order: 2; 
    margin: 10px 0 -40px 0;
  }
}

@media (min-width: 768px) {
  .NotFound {
    padding: 20px 32px 90px;
  }
}

.code {
  line-height: 64px;
  font-size: 64px;
  font-weight: 600;
}

.code-large {
    font-size: 64px;
    line-height: 44px;
}

.code-small {
    font-size: 32px;
    line-height: 20px;
    letter-spacing: 2px;
    color: var(--vp-c-text-1);
}

.title {
  padding-top: 12px;
  letter-spacing: 2px;
  line-height: 20px;
  font-size: 20px;
  font-weight: 700;
}

.divider {
  margin: 24px auto 18px;
  width: 128px;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.quote {
  margin: 0 auto;
  max-width: 256px;
  font-size: 14px;
  border-left: 1px solid var(--vp-c-divider);
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.action {
  padding-top: 20px;
}

.link {
  display: inline-block;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 16px;
  padding: 3px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition:
    border-color 0.25s,
    color 0.25s;
}

.link:hover {
  border-color: var(--vp-c-sponsor);
  color: var(--vp-c-sponsor);
}

</style>
