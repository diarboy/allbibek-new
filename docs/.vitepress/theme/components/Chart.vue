<script setup>
import { ref, onMounted } from "vue";
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const chartRef = ref(null);

onMounted(() => {
  const ctx = chartRef.value.getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Media Sosial", "Pencarian Organik", "Iklan Berbayar", "Langsung", "Referral"],
      datasets: [
        {
          data: [45, 25, 15, 10, 5], // Persentase trafik
          backgroundColor: ["#4CAF50", "#FF9800", "#F44336", "#2196F3", "#9C27B0"],
          hoverOffset: 8
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom"
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const sources = ["Facebook/Instagram", "Google", "Google Ads", "Direct Traffic", "Backlinks"];
              return `${sources[tooltipItem.dataIndex]}: ${tooltipItem.raw}%`;
            }
          }
        }
      }
    }
  });
});
</script>

<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 400px;
  margin: auto;
}
</style>
