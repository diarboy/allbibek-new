<template>
  <div class="cards-container">
    <transition-group name="fade" tag="div" class="cards">
      <div
        v-for="(item, index) in filteredData"
        :key="item.kode"
        class="card"
        :class="{ 'active-card': item.showDetails }"
        @click="toggleDetails(index)"
      >
        <div class="card-header">
          <h3 class="card-title">{{ item.mataKuliah }}</h3>
          <div class="divider"></div>
          <p class="card-info">{{ item.hari }}, {{ item.waktu }}</p>
        </div>
        <transition name="slide">
          <div v-if="item.showDetails" class="card-details">
            <p><strong>Dosen:<br> </strong> <span v-html="splitValues(item.dosen)"></span></p>
            <p><strong>Sipen:<br> </strong> <span v-html="splitValues(item.sipen)"></span></p>
            <p><strong>Ruang:<br> </strong> {{ item.ruangan || 'TBA' }}</p>
            <p><strong>Keterangan: </strong> {{ item.keterangan || '-' }}</p>
          </div>
        </transition>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')

const data = ref([
  {
    hari: 'Senin',
    waktu: '08:00 – 09:30',
    kode: '',
    mataKuliah: 'Pemasaran Digital',
    dosen: 'Ade Sutriyono, MM.SI.; Hendri Rosmawan, M.Kom.',
    sipen: '(1) Muhammad Rizki; (2) Sabili Muhammad Azka',
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
    sipen: '(1) Fasya Mahesa; (2) Muhamad Septian Ardiansyah Yudhono',
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
    dosen: 'Ade Sutriyono, S.Kom., MM.SI; Ahmad Ngiliyun, M.Kom.',
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
    sipen: '(1) Indah Rizkika; (2) Dimas Dwi Rianto',
    keterangan: 'Kelas reguler',
    ruang: 'Lab 3',
    showDetails: false
  },
  {
    hari: 'Kamis',
    waktu: '13:00 - 15:30',
    kode: '',
    mataKuliah: 'Rekayasa Perangkat Lunak',
    dosen: 'Syaiful Ramadhan, M.Kom; Ahmad Ngiliyun, M.Kom.',
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

const splitValues = (value) => {
  if (!value) return '-';
  return value.replace(/;\s*/g, '<br>');
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
  data.value.forEach((item, i) => {
    item.showDetails = i === index ? !item.showDetails : false;
  });
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
  border: 1px solid var(--vp-c-gray-1);
  box-shadow: 0 2px 8px rgba(153, 159, 159, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  overflow: hidden;
}
.card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.card.active-card {
  background-color: var(--vp-c-success-3);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.card-header {
  padding: 1rem;
}
.card-title {
  margin: 0;
  font-size: 1.5rem;
}

.card.active-card .card-title, .card.active-card .card-info {
  color: var(--vp-c-white)
}

.card-info {
  margin: 0.5rem 0 0;
  color: var(--vp-c-text-1);
}
.card-details {
  padding: 1rem;
  border-top: 1px solid var(--vp-c-gutter);
  background: var(--vp-c-bg-soft);
}

/* Transition efek */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Animasi saat card-details muncul dan menghilang */
.slide-enter-active, .slide-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.slide-enter, .slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-enter-to, .slide-leave {
  max-height: auto;
  opacity: 1;
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
  
  .card-header {
    text-align: center;
  }

  .card-title {
    font-size: 1.2rem;
  }

  .divider {
    margin: 5px auto;
    width: 200px;
    height: 1px;
    background-color: var(--vp-c-divider);
  }
}
</style>
