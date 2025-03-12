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
            <p><strong>Dosen: </strong> <span v-html="splitValues(item.dosen)"></span></p>
            <p><strong>Keterangan: </strong> {{ item.keterangan || '-' }}</p>
            <p><strong>Sipen: </strong> {{ item.sipen || '-' }}</p>
            <p><strong>Ruang: </strong> {{ item.ruangan || 'TBA' }}</p>
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
    kode: '',
    mataKuliah: 'Pemasaran Digital',
    dosen: 'Ade Sutriyono, MM.SI. dan Hendri Rosmawan, M.Kom.',
    sipen: '(1) Muhammad Rizki, (2) Sabili Muhammad Azka',
    keterangan: 'Kelas reguler',
    ruang: 'Lab 3',
    showDetails: false
  },
  {
    hari: 'Rabu',
    waktu: '10:30 - 13:00',
    kode: '',
    mataKuliah: 'Sains dan Riset Ops',
    dosen: 'Dr. Indra Surya Permana, M.M.',
    sipen: '(1) Fasya Mahesa, (2) Muhamad Septian Ardiansyah Yudhono',
    keterangan: 'Kelas reguler',
    ruang: 'Lab 2',
    showDetails: false
  },
  {
    hari: 'Rabu',
    waktu: '13:00 - 15:30',
    kode: '',
    mataKuliah: 'Pemrograman Mobile 1',
    dosen: 'Mohamad Firdaus, M.Kom',
    sipen: '(1) Muhammad Labbiibul Muhsin',
    keterangan: 'Kelas reguler',
    ruang: 'Lab 1',
    showDetails: false
  },
  {
    hari: 'Kamis',
    waktu: '08:00 - 10:30',
    kode: '',
    mataKuliah: 'Pembelajaran Mesin',
    dosen: 'Ade Sutriyono, S.Kom., MM.SI, Ahmad Ngiliyun, M.Kom.',
    sipen: '(1) Jaisyi Bagir Rafsyahid',
    keterangan: 'Kelas reguler',
    ruang: 'Lab 4',
    showDetails: false
  },
  {
    hari: 'Kamis',
    waktu: '10:30 - 13:00',
    kode: '',
    mataKuliah: 'Keamanan Data dan Info',
    dosen: 'Mohamad Firdaus, M.Kom',
    sipen: '(1) Indah Rizkika, (2) Dimas Dwi Rianto',
    keterangan: 'Kelas reguler',
    ruang: 'Lab 3',
    showDetails: false
  },
  {
    hari: 'Kamis',
    waktu: '13:00 - 15:30',
    kode: '',
    mataKuliah: 'Rekayasa Perangkat Lunak',
    dosen: 'Syaiful Ramadhan, M.Kom, Ahmad Ngiliyun, M.Kom.',
    sipen: '(1) Muhamad Fuad Aziz',
    keterangan: 'Kelas reguler',
    ruang: 'Lab 2',
    showDetails: false
  },
  {
    hari: 'Sabtu',
    waktu: '08:00 - 10:30',
    kode: '',
    mataKuliah: 'Cloud Computing 2',
    dosen: 'Yassep Azzeri, M.T',
    sipen: '(1) Ardiyansyah',
    keterangan: 'Kelas reguler',
    ruang: 'Lab 5',
    showDetails: false
  }
]);


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
  display: flex;
  flex-direction: column;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}
.card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
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
  border-top: 1px solid var(--vp-c-gutter);
  background: var(--vp-c-bg);
}

/* Transition efek */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Responsiveness */
@media (max-width: 768px) {
  .cards {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .card {
    width: 100%;
    max-width: 320px;
  }
  
  .card-title {
    font-size: 1rem;
  }
}
</style>
