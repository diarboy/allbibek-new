<script setup>
import { ref, onMounted } from "vue";
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";

// Registrasi komponen yang diperlukan
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const chartRef = ref(null);

onMounted(() => {
  const ctx = chartRef.value.getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Start", "Process A", "Process B", "Decision", "End"],
      datasets: [
        {
          data: [1, 2, 2, 1, 1], // Representasi jumlah langkah
          backgroundColor: ["#28a745", "#007bff", "#17a2b8", "#ffc107", "#dc3545"],
          hoverOffset: 10, // Efek saat hover
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const labels = [
                "Mulai Proses",
                "Eksekusi A",
                "Eksekusi B",
                "Pengambilan Keputusan",
                "Akhir",
              ];
              return labels[tooltipItem.dataIndex];
            },
          },
        },
      },
    },
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
