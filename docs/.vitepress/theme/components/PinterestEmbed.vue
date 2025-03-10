<script setup>
import { onMounted } from "vue";

const props = defineProps({
  pinUrl: String,
  pinSize: {
    type: String,
    default: "medium",
  },
});

onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://assets.pinterest.com/js/pinit.js";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
});
</script>

<template>
  <a data-pin-do="embedPin" :data-pin-width="pinSize" :href="pinUrl"></a>
</template>
