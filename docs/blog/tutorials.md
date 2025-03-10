# 🌐 Web Development Tutorials  

Welcome to our comprehensive web development tutorials! Here you'll find practical guides and best practices for modern web development.  

## 📜 JavaScript Fundamentals  

### ⏳ Asynchronous Programming  

Learn how to handle asynchronous operations effectively in JavaScript.  

```javascript
// Using async/await for cleaner asynchronous code
async function fetchUserData() {
  try {
    const response = await fetch('https://api.example.com/user');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}
```  

### 🚀 Modern JavaScript Features  

::: tip 💡  
ES6+ features have revolutionized how we write JavaScript. Here are some key features you should know.  
:::  

#### 🔗 Optional Chaining  

```javascript
const user = {
  address: {
    street: '123 Main St'
  }
};

// Safe property access
const zipCode = user?.address?.zipCode; // undefined instead of error
```  

## ⚛️ React Best Practices  

### 🔄 Custom Hooks  

Create reusable logic with custom hooks:  

```javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```  

## 🖼️ Vue.js Tips and Tricks  

### 🎛️ Composition API  

Learn how to use Vue 3's Composition API effectively:  

```vue
<script setup>
import { ref, onMounted } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

function increment() {
  count.value++
}

onMounted(() => {
  console.log('Component mounted!')
})
</script>

<template>
  <button @click="increment">Count: {{ count }}</button>
  <p>Double: {{ doubleCount }}</p>
</template>
```  

## ⚡ Performance Optimization  

### 📦 Code Splitting  

Learn how to implement code splitting in your applications:  

```javascript
// Dynamic imports for better performance
const AdminDashboard = () => import('./components/AdminDashboard.vue')

export default {
  components: {
    AdminDashboard
  }
}
```  

### 🖼️ Image Optimization  

::: tip ✅ Best Practices  
1. Use modern image formats (WebP)  
2. Implement lazy loading  
3. Provide responsive images  
4. Optimize image quality  
:::  

```html
<img 
  src="image.webp"
  loading="lazy"
  srcset="image-300w.webp 300w,
          image-600w.webp 600w"
  sizes="(max-width: 600px) 300px,
         600px"
  alt="Optimized image"
>
```  

## 🔐 Security Best Practices  

### ⚠️ XSS Prevention  

::: warning ❗  
Always sanitize user input and use proper content security policies.  
:::  

```javascript
// Use DOMPurify to sanitize HTML
import DOMPurify from 'dompurify';

const userInput = '<script>alert("xss")</script>Hello';
const sanitized = DOMPurify.sanitize(userInput);
```  

### 🛡️ CSRF Protection  

Implement CSRF tokens in your forms:  

```html
<form action="/api/data" method="POST">
  <input type="hidden" name="_csrf" value="{{ csrfToken }}">
  <!-- form fields -->
</form>
```  

## 📢 Stay Updated  

- 📡 Follow our [RSS feed](#) for the latest tutorials  
- 💬 Join our [Discord community](#) for discussions  
- 📧 Subscribe to our [newsletter](#) for weekly updates  
