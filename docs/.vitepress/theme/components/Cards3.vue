<template>
    <div class="cards-container">
      <div v-for="(item, index) in filteredData" :key="index" class="card">
        <button 
          class="card-header" 
          @click="toggleDetails(index)"
          :class="{ 'active': item.showDetails }"
        >
          <div>
            <h3 class="card-title">{{ item.mataKuliah }}</h3>
            <p class="card-info">{{ item.hari }}, {{ item.waktu }}</p>
          </div>
          <span class="icon">{{ item.showDetails ? '−' : '+' }}</span>
        </button>
        
        <div class="card-details" :class="{ 'open': item.showDetails }">
          <p><strong>Dosen:<br></strong> <span v-html="splitValues(item.dosen)"></span></p>
          <p><strong>Sipen:<br></strong> <span v-html="splitValues(item.sipen)"></span></p>
          <p><strong>Ruang:</strong> {{ item.ruangan || 'TBA' }}</p>
          <p><strong>Keterangan:</strong> {{ item.keterangan || '-' }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const search = ref('');
  
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
    return value ? value.replace(/;\s*/g, '<br>') : '-';
  };
  
  const filteredData = computed(() => {
    if (!search.value) return data.value;
    const searchLower = search.value.toLowerCase();
    return data.value.filter(item =>
      Object.values(item).some(val => String(val).toLowerCase().includes(searchLower))
    );
  });

  const toggleDetails = (index) => {
  data.value.forEach((item, i) => {
    item.showDetails = i === index ? !item.showDetails : false;
  });
};

  </script>
  
  <style scoped>

  .card-header .card-title {
    margin: 20px 0 0;
  }

  .cards-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }
  
  .card {
    margin-bottom: 1rem;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    width: 100%;
    padding: 0.5rem 1.5rem;
    background: var(--vp-c-brand-soft);
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
  
  .card-header:hover {
    background: var(--vp-c-gray-1);
  }
  
  .card-header.active {
    background: var(--vp-c-success-3);
    color: white;
  }
  
  html.dark .card-header {
    background: var(--vp-c-brand-2);
  }

  html.dark .card-header.active {
    background: var(--hero-text-gradient-light);
  } 

  html.dark .card-header:hover {
    background: var(--hero-text-gradient-light);
  } 

  html.dark .card-details.open {
    background: var(--card-text-bg-soft);
  } 

  .icon {
    font-size: 1.5rem;
    line-height: 1;
  }
  
  .card-details {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
    background: var(--vp-c-bg);
    padding: 0 1rem;
  }
  
  .card-details.open {
    max-height: 400px;
    padding: 1rem;
  }

@media (max-width: 768px) {
  .card-title {
    font-size: 1.1rem;
  }
  .card-header {
    font-size: 1rem;
  }

  .card-header p {
    margin: 5px 0 16px 0;
  }
}

</style>
  