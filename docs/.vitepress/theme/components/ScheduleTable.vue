<template>
  <div class="schedule-table">
    <!-- Input pencarian -->
    <input
      v-model="search"
      type="text"
      placeholder="Cari: (Hari, Mata Kuliah, Dosen, Sipen)"
      class="search-input"
    />

    <!-- Tabel Data (Vue3 Easy DataTable) -->
    <EasyDataTable
      :headers="headers"
      :items="filteredData"
      :rows-per-page="10"
      :pagination="true"
      :expand-on-row-click="true"
      header-text-direction="center"
      body-text-direction="center"
      show-index
      alternating

      class="custom-table"
    >
      <!-- Slot custom untuk cell 'dosen' -->
      <template #cell-dosen="{ item }">
        <div class="dosen-cell" v-html="splitValues(item.dosen)" ></div>
      </template>

      <!-- Slot expandable row -->
      <template #expand="item">
        <div class="expand-content">
            <p><strong>Sipen:</strong></p>
            <p><span v-html="splitValues(item.sipen)"></span></p>
            <p>{{ item.keterangan || '-' }}</p>
            <p><strong>Ruangan:</strong>{{ item.ruangan || 'TBA' }}</p>
          
        </div>
      </template>

      <!-- Custom pagination -->
      <template #pagination="props">
        <div class="custom-pagination">
          <button 
            v-for="page in props.totalPages" 
            :key="page" 
            @click="props.setPage(page)"
            :class="{ active: props.currentPage === page }"
          >
            {{ page }}
          </button>
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

// Header tabel dengan alignment
const headers = [
  { text: 'Hari', value: 'hari', sortable: true },
  { text: 'Waktu', value: 'waktu', width: 120 },
  { text: 'Mata Kuliah', value: 'mataKuliah', width: 330 },
  { text: 'Kode', value: 'kode' },
  { text: 'Dosen', value: 'dosen', sortable: true, width: 280 },
]

// Data dengan tambahan field untuk expand
const data = ref([
  {
    hari: 'Senin',
    waktu: '08:00 – 09:30',
    kode: 'MK47',
    mataKuliah: 'Pemasaran Digital (2T)',
    dosen: 'Hendri Rosmawan, M.Kom.',
    sipen: '(1) Muhammad Rizki, (2) Sabili Muhammad Azka',
    keterangan: 'Kelas Reguler',
    ruangan: 'Lab 3'
  },
  {
    hari: 'Selasa',
    waktu: '08:00 – 09:30',
    kode: 'MK45',
    mataKuliah: 'Manajemen Sistem Informasi Kesehatan (2T)',
    dosen: 'Dr. Andinna Ananda Yusuff, MM.',
    sipen: '(1) Aurelia Septia Apriani, (2) Dimas Surya Putra',
    keterangan: 'Kelas Reguler',
    ruangan: 'Ruang 405'
  },
  {
    hari: 'Rabu',
    waktu: '10:30 – 13:00',
    kode: 'MK46',
    mataKuliah: 'Manajemen Sains dan Riset Operasional (2T1P)',
    dosen: 'Dr. Indra Surya Permana, M.M., M.Kom.',
    sipen: '(1) Fasya Mahesa, (2) MS. Ardi',
    keterangan: 'Kelas Reguler',
    ruangan: 'Lab 2'
  },
  {
    hari: 'Rabu',
    waktu: '13:00 – 15:30',
    kode: 'MK28',
    mataKuliah: 'Pemrograman Mobile 1 (2T1P)',
    dosen: 'Moh Firdaus, M.Kom',
    sipen: 'Muhammad Labbiibul Muhsin',
    keterangan: 'Kelas Reguler',
    ruangan: 'Studio 3'
  },
  {
    hari: 'Kamis',
    waktu: '08:00 – 10:30',
    kode: 'MK11',
    mataKuliah: 'Pembelajaran Mesin (2T1P)',
    dosen: 'Ahmad Ngiliyun, M.Kom.',
    sipen: 'Jaisyi Bagir Rafsyahid',
    keterangan: 'Kelas Reguler',
    ruangan: 'Lab AI'
  },
  {
    hari: 'Kamis',
    waktu: '10:30 – 13:00',
    kode: 'MK07',
    mataKuliah: 'Keamanan Data dan Informasi (2T1P)',
    dosen: 'Moh Firdaus, M.Kom',
    sipen: '(1) Indah Rizkika, (2) Dimas Dwi Rianto',
    keterangan: 'Kelas Reguler',
    ruangan: 'Ruang Cyber'
  },
  {
    hari: 'Kamis',
    waktu: '13:00 – 15:30',
    kode: 'MK08',
    mataKuliah: 'Rekayasa Perangkat Lunak (2T1P)',
    dosen: 'Ahmad Ngiliyun, M.Kom.',
    sipen: 'Muhamad Fuad Aziz',
    keterangan: 'Kelas Reguler',
    ruangan: 'Lab DevOps'
  },
  {
    hari: 'Sabtu',
    waktu: '08:00 – 10:30',
    kode: 'IF34PR',
    mataKuliah: 'Cloud Computing 2 (2T1P)',
    dosen: 'Yassep Azzery, M.T.',
    sipen: 'Ardi Syah',
    keterangan: 'Kelas Reguler',
    ruangan: 'Cloud Lab'
  }
])

const splitValues = (value) => {
  if (!value) return ''
  return value.split(',').map(val => val.trim()).join('<br>')
}

const filteredData = computed(() => {
  if (!search.value) return data.value
  const searchLower = search.value.toLowerCase()
  return data.value.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchLower)
    )
  )
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600&display=swap');

.schedule-table {
  --easy-table-header-background-color: #2d3a4f;
  --easy-table-header-font-color: #fff;
  --easy-table-body-row-text-align: right;
  --easy-table-body-row-index-text-align: right;
  --easy-table-body-row-cell-dosen-text-align: right;
  --easy-table-body-row-cell-sipen-text-align: right;
  --easy-table-footer-background-color: #f5f5f5;
  --easy-table-footer-font-color: #666;
}

.custom-table {
  border: 1px solid var(--vp-c-border);
  border-collapse: collapse;
  font-family: 'Manrope', sans-serif;
}

/* Custom alignment */
::v-deep(.custom-table .easy-table__header__item--index),
::v-deep(.custom-table .easy-table__body__row__cell--index) {
  text-align: right !important;
}

::v-deep(.custom-table .easy-table__header__item--hari),
::v-deep(.custom-table .easy-table__body__row__cell--hari) {
  text-align: right !important;
}

::v-deep(.custom-table .easy-table__header__item--waktu),
::v-deep(.custom-table .easy-table__body__row__cell--waktu) {
  text-align: right !important;
}

::v-deep(.custom-table .easy-table__header__item--mataKuliah),
::v-deep(.custom-table .easy-table__body__row__cell--mataKuliah) {
  text-align: right !important;
}

::v-deep(.custom-table .easy-table__header__item--kode),
::v-deep(.custom-table .easy-table__body__row__cell--kode) {
  text-align: right !important;
}

.custom-pagination {
  margin: 1rem 0;
  display: flex;
  gap: 0.5rem;
}

.custom-pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.custom-pagination button.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

/* Expand content styling */
.expand-content {
  padding: 15px;
  border-top: 1px solid #eee;
}

.expand-content p {
  margin: 5px; 
  font-size: 0.95rem; 
  line-height: 1.5; 
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
@media (max-width: 768px) {
  .custom-table th,
  .custom-table td {
    text-align: left !important;
    padding: 0.5rem;
    font-size: 0.8rem;
  }
}
</style>
