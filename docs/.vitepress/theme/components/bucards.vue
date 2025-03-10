<template>
  <div class="cards-container">
    <transition-group name="fade" tag="div" class="cards">
      <div
        v-for="(item, index) in filteredData"
        :key="item.kode"
        class="card"
        @click="toggleDetails(index)"
      >
        <div class="card-header">
          <h3 class="card-title">{{ item.mataKuliah }}</h3>
          <p class="card-info">{{ item.hari }}, {{ item.waktu }}</p>
        </div>
        <transition name="slide">
          <div v-if="item.showDetails" class="card-details">
            <p><strong>Dosen:</strong> <span v-html="splitValues(item.dosen)"></span></p>
            <p><strong>Keterangan:</strong> {{ item.keterangan || '-' }}</p>
            <p><strong>Sipen:</strong> {{ item.sipen || '-' }}</p>
            <p><strong>Ruangan:</strong> {{ item.ruangan || 'TBA' }}</p>
          </div>
        </transition>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
// Data jadwal, tambahkan properti showDetails untuk kontrol tampilan detail
const data = ref([
  {
    hari: 'Senin',
    waktu: '08:00 – 09:30',
    kode: 'MK47',
    mataKuliah: 'Pemasaran Digital (2T)',
    dosen: 'Ade Sutriyono, MM.SI. dan Hendri Rosmawan, M.Kom.',
    sipen: '(1) Muhammad Rizki, (2) Sabili Muhammad Azka',
    keterangan: 'Kelas reguler',
    ruangan: 'Lab 3',
    showDetails: false
  },
  // Data lainnya...
])

// Contoh fungsi pembagi dosen
const splitValues = (value) => {
  if (!value) return ''
  return value.split(' dan ').join('<br>')
}

// Filter data berdasarkan input search
const filteredData = computed(() => {
  if (!search.value) return data.value
  const searchLower = search.value.toLowerCase()
  return data.value.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchLower)
    )
  )
})

// Toggle detail pada card
const toggleDetails = (index) => {
  data.value[index].showDetails = !data.value[index].showDetails
}
</script>

<style scoped>
.cards-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}
.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  overflow: hidden;
}
.card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.card-header {
  padding: 1rem;
}
.card-title {
  margin: 0;
  font-size: 1.2rem;
}
.card-info {
  margin: 0.5rem 0 0;
  color: #555;
}
.card-details {
  padding: 1rem;
  border-top: 1px solid #eee;
  background: #f9f9f9;
}

/* Transition efek */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.slide-enter-active, .slide-leave-active {
  transition: max-height 0.5s ease;
}
.slide-enter-from, .slide-leave-to {
  max-height: 0;
  overflow: hidden;
}
</style>
