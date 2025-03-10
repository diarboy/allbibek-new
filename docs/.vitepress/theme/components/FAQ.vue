<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    question: 'What are Allbibek?',
    answer: 'Allbibek is a modern frontend build tool that offers a faster and leaner development experience.',
    isOpen: false
  },
  {
    question: 'Why use Allbibek?',
    answer: 'Allbibek provides instant server start, lightning-fast HMR (Hot Module Replacement), and optimized builds.',
    isOpen: false
  },
  {
    question: 'Is Allbibek difficult to learn?',
    answer: 'No, Allbibek is designed to be intuitive and developer-friendly. It works out of the box with many templates and frameworks.',
    isOpen: false
  }
])

const toggleFAQ = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}
</script>

<template>
  <div class="faq-container">
    <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
      <button 
        class="faq-question" 
        @click="toggleFAQ(index)"
        :class="{ 'active': faq.isOpen }"
      >
        {{ faq.question }}
        <span class="icon">{{ faq.isOpen ? '−' : '+' }}</span>
      </button>
      <div 
        class="faq-answer"
        :class="{ 'open': faq.isOpen }"
      >
        {{ faq.answer }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.faq-item {
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.faq-question {
  width: 100%;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: none;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;
}

.faq-question:hover {
  background: var(--vp-c-bg-mute);
}

.faq-question.active {
  background: var(--vp-c-brand);
  color: white;
}

.icon {
  font-size: 1.5rem;
  line-height: 1;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  background: var(--vp-c-bg);
  padding: 0 1rem;
}

.faq-answer.open {
  max-height: 200px;
  padding: 1rem;
}
</style>