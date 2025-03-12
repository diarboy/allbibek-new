<template>
  <div class="schedule-table">
    <!-- Input pencarian -->
    <input
      v-model="search"
      type="text"
      placeholder="Cari (Hari, Mata Kuliah, Dosen, Sipen)..."
      class="search-input mb-4"
    />

    <!-- Tabel Data (Vue3 Easy DataTable) -->
    <EasyDataTable
      :headers="headers"
      :items="filteredData"
      :rows-per-page="10"
      :hide-footer="true"
      :sortable="true"
      header-text-direction="center"
      body-text-direction="center"
      show-index
      alternating
      class="custom-table"
    >
      <!-- Slot custom untuk cell 'dosen' -->
      <template #cell-dosen="{ item }">
        <div v-html="splitValues(item.dosen)"></div>
      </template>

      <!-- Slot custom untuk cell 'sipen' -->
      <template #cell-sipen="{ item }">
        <div v-html="splitValues(item.sipen)"></div>
      </template>

      <!-- Slot custom untuk footer -->
      <template #footer>
        <div class="custom-footer">
          <span>© 2025 Jadwal Kuliah - All Rights Reserved</span>
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

// Input pencarian
const search = ref('')

// Header tabel (hilangkan "Class")
const headers = [
  { text: 'Hari', value: 'hari', sortable: true },
  { text: 'Waktu', value: 'waktu', width: 120 },
  { text: 'Mata Kuliah', value: 'mataKuliah' },
  { text: 'Kode', value: 'kode' },
  { text: 'Dosen', value: 'dosen', sortable: true },
  { text: 'Sipen', value: 'sipen' }
]

// Data mentah (hari dalam Bahasa Indonesia)
const data = ref([
  {
    hari: 'Senin',
    waktu: '08:00 – 09:30',
    kode: 'MK47',
    mataKuliah: 'Pemasaran Digital (2T)',
    dosen: 'Ade Sutriyono, MM.SI. dan Hendri Rosmawan, M.Kom.',
    sipen: '(1) Muhammad Rizki, (2) Sabili Muhammad Azka'
  },
  {
    hari: 'Selasa',
    waktu: '08:00 – 09:30',
    kode: 'MK45',
    mataKuliah: 'Manajemen Sistem Informasi Kesehatan (2T)',
    dosen: 'Fardhoni, ST., MM., M.Kom. dan Dr. Andinna Ananda Yusuff, MM.',
    sipen: '(1) Aurelia Septia Apriani, (2) Dimas Surya Putra'
  },
  {
    hari: 'Rabu',
    waktu: '10:30 – 13:00',
    kode: 'MK46',
    mataKuliah: 'Manajemen Sains dan Riset Operasional (2T1P)',
    dosen: 'Dr. Indra Surya Permana, M.M., M.Kom.',
    sipen: '(1) Fasya Mahesa, (2) MS. Ardi'
  },
  {
    hari: 'Rabu',
    waktu: '13:00 – 15:30',
    kode: 'MK28',
    mataKuliah: 'Pemrograman Mobile 1 (2T1P)',
    dosen: 'Moh Firdaus, M.Kom',
    sipen: 'Muhammad Labbiibul Muhsin'
  },
  {
    hari: 'Kamis',
    waktu: '08:00 – 10:30',
    kode: 'MK11',
    mataKuliah: 'Pembelajaran Mesin (2T1P)',
    dosen: 'Ade Sutriyono, MM.SI. & Ahmad Ngiliyun, M.Kom.',
    sipen: 'Jaisyi Bagir Rafsyahid'
  },
  {
    hari: 'Kamis',
    waktu: '10:30 – 13:00',
    kode: 'MK07',
    mataKuliah: 'Keamanan Data dan Informasi (2T1P)',
    dosen: 'Moh Firdaus, M.Kom',
    sipen: '(1) Indah Rizkika, (2) Dimas Dwi Rianto'
  },
  {
    hari: 'Kamis',
    waktu: '13:00 – 15:30',
    kode: 'MK08',
    mataKuliah: 'Rekayasa Perangkat Lunak (2T1P)',
    dosen: 'Syaeful Ramadhan, M.Kom. & Ahmad Ngiliyun, M.Kom.',
    sipen: 'Muhamad Fuad Aziz'
  },
  {
    hari: 'Sabtu',
    waktu: '08:00 – 10:30',
    kode: 'IF34PR',
    mataKuliah: 'Cloud Computing 2 (2T1P)',
    dosen: 'Yassep Azzery, M.T.',
    sipen: 'Ardi Syah'
  }
])

const splitValues = (value) => {
  if (!value) return ''
  return value.split(' dan ').join('<br>')
}

const filteredData = computed(() => {
  if (!search.value) return data.value
  return data.value.filter(item => {
    const searchLower = search.value.toLowerCase()
    return (
      item.hari.toLowerCase().includes(searchLower) ||
      item.mataKuliah.toLowerCase().includes(searchLower) ||
      item.dosen.toLowerCase().includes(searchLower) ||
      item.sipen.toLowerCase().includes(searchLower)
    )
  })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600&display=swap');

.schedule-table {
--easy-table-header-item-padding: 10px 15px;
  font-family: 'Manrope', sans-serif;
}

/* Custom style untuk input pencarian */
.search-input {
  width:300px;
  padding: 0.75rem;
  margin: 20px 0 20px 0;
  border: 1px solid var(--vp-c-border);
  border-radius: 0.5rem;
  box-shadow: var(--vp-shadow);
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.search-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
}

/* Custom style untuk tabel */
.custom-table {
  border: 1px solid var(--vp-c-border); 
  border-collapse: collapse;
  --easy-table-header-background-color: #2d3a4f;
  --easy-table-header-font-color: #fff;
}

.custom-table th,
.custom-table td {
  border: 1px solid var(--vp-c-border);
  padding: 2rem;
  font-size: 1rem;
}

.custom-table th {
  background: linear-gradient(90deg, #2563eb, #3b82f6);
  color: #fff;
  cursor: pointer;
}

.custom-table td:nth-child(2) {
  white-space: nowrap;
}


/* Custom footer */
.custom-footer {
  padding: 0.75rem;
  text-align: center;
  background-color: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-border);
  font-size: 0.8rem;
}

/* Responsif mobile */
@media (max-width: 768px) {
  .custom-table th,
  .custom-table td {
    padding: 0.5rem;
    font-size: 0.8rem;
  }
  .search-input {
    padding: 0.5rem;
  }
}

</style>
