<template>
  <div class="cards-container">
    <transition-group name="fade" tag="div" class="cards">
      <div v-for="(item, index) in schedule" :key="item.kode" class="card" @click="toggleDetails(index)">
        <div class="card-header">
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-info">{{ item.waktu }}</p>
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
import { ref } from 'vue';

const schedule = ref([
  {
    title: 'Pemasaran Digital (2T)',
    waktu: 'Senin, 08:00 – 09:30',
    kode: 'MK47',
    dosen: 'Ade Sutriyono, MM.SI. & Hendri Rosmawan, M.Kom.',
    sipen: '(1) Muhammad Rizki, (2) Sabili Muhammad Azka',
    keterangan: 'Kelas reguler',
    ruangan: '🏢 Lab 3',
    showDetails: false
  },
  {
    title: 'Manajemen Sistem Informasi Kesehatan (2T)',
    waktu: 'Selasa, 08:00 – 09:30',
    kode: 'MK45',
    dosen: 'Fardhoni, ST., MM., M.Kom. & Dr. Andinna Ananda Yusuff, MM.',
    sipen: '(1) Aurelia Septia Apriani, (2) Dimas Surya Putra',
    keterangan: 'Kelas bilingual',
    ruangan: '🏢 Ruang 405',
    showDetails: false
  },
  {
    title: 'Manajemen Sains dan Riset Ops (2T1P)',
    waktu: 'Rabu, 10:30 – 13:00',
    kode: 'MK46',
    dosen: 'Dr. Indra Surya Permana, M.M., M.Kom.',
    sipen: '(1) Fasya Mahesa, (2) MS. Ardi',
    keterangan: 'Kelas advance',
    ruangan: '🏢 Lab 2',
    showDetails: false
  },
  {
    title: 'Pemrograman Mobile 1 (2T1P)',
    waktu: 'Rabu, 13:00 – 15:30',
    kode: 'MK28',
    dosen: 'Moh Firdaus, M.Kom',
    sipen: 'Muhammad Labbiibul Muhsin',
    keterangan: 'Kelas proyek',
    ruangan: '🏢 Studio 3',
    showDetails: false
  },
  {
    title: 'Pembelajaran Mesin (2T1P)',
    waktu: 'Kamis, 08:00 – 10:30',
    kode: 'MK11',
    dosen: 'Ade Sutriyono, MM.SI. & Ahmad Ngiliyun, M.Kom.',
    sipen: 'Jaisyi Bagir Rafsyahid',
    keterangan: 'Kelas intensif',
    ruangan: '🏢 Lab AI',
    showDetails: false
  },
  {
    title: 'Keamanan Data dan Informasi (2T1P)',
    waktu: 'Kamis, 10:30 – 13:00',
    kode: 'MK07',
    dosen: 'Moh Firdaus, M.Kom',
    sipen: '(1) Indah Rizkika, (2) Dimas Dwi Rianto',
    keterangan: 'Kelas khusus',
    ruangan: '🏢 Ruang Cyber',
    showDetails: false
  },
  {
    title: 'Rekayasa Perangkat Lunak (2T1P)',
    waktu: 'Kamis, 13:00 – 15:30',
    kode: 'MK08',
    dosen: 'Syaeful Ramadhan, M.Kom. & Ahmad Ngiliyun, M.Kom.',
    sipen: 'Muhamad Fuad Aziz',
    keterangan: 'Kelas industri',
    ruangan: '🏢 Lab DevOps',
    showDetails: false
  },
  {
    title: 'Cloud Computing 2 (2T1P)',
    waktu: 'Sabtu, 08:00 – 10:30',
    kode: 'IF34PR',
    dosen: 'Yassep Azzery, M.T.',
    sipen: 'Ardi Syah',
    keterangan: 'Kelas weekend',
    ruangan: '🏢 Cloud Lab',
    showDetails: false
  }
]);

const splitValues = (value) => {
  if (!value) return '';
  return value.split(' & ').join('<br>');
};

const toggleDetails = () => {
  const isAnyClosed = schedule.value.some(item => !item.showDetails);
  
  schedule.value.forEach(item => {
    item.showDetails = isAnyClosed;
  });
};

</script>

<style scoped>
.cards-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 1rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 1rem;
} 

/* biar menurun
.cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
*/

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
  font-size: 0.95rem;
}
.card-info {
  margin: 0.5rem 0 0;
  color: var(--vp-c-text-2);
}
.card-details {
  padding: 1rem;
  border-top: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
}

@media (max-width: 600px) {
  .cards {
    display: flex;
    flex-direction: column;
  }
}
</style>
