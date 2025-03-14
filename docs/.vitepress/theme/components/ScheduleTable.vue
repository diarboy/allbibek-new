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
            <p><strong>Ruang: </strong>{{ item.ruangan || 'TBA' }}</p>
          
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
    ruangan: 'A2'
  },
  {
    hari: 'Selasa',
    waktu: '08:00 – 09:30',
    kode: 'MK45',
    mataKuliah: 'Manajemen Sistem Informasi Kesehatan (2T)',
    dosen: 'Dr. Andinna Ananda Yusuff, MM.',
    sipen: '(1) Aurelia Septia Apriani, (2) Dimas Surya Putra',
    keterangan: 'Kelas Reguler',
    ruangan: 'A2'
  },
  {
    hari: 'Rabu',
    waktu: '10:30 – 13:00',
    kode: 'MK46',
    mataKuliah: 'Manajemen Sains dan Riset Operasional (2T1P)',
    dosen: 'Dr. Indra Surya Permana, M.M., M.Kom.',
    sipen: '(1) Fasya Mahesa, (2) MS. Ardi',
    keterangan: 'Kelas Reguler',
    ruangan: 'A2'
  },
  {
    hari: 'Rabu',
    waktu: '13:00 – 15:30',
    kode: 'MK28',
    mataKuliah: 'Pemrograman Mobile 1 (2T1P)',
    dosen: 'Moh Firdaus, M.Kom',
    sipen: 'Muhammad Labbiibul Muhsin',
    keterangan: 'Kelas Reguler',
    ruangan: 'Labkom'
  },
  {
    hari: 'Kamis',
    waktu: '08:00 – 10:30',
    kode: 'MK11',
    mataKuliah: 'Pembelajaran Mesin (2T1P)',
    dosen: 'Ahmad Ngiliyun, M.Kom.',
    sipen: 'Jaisyi Bagir Rafsyahid',
    keterangan: 'Kelas Reguler',
    ruangan: 'Labkom'
  },
  {
    hari: 'Kamis',
    waktu: '10:30 – 13:00',
    kode: 'MK07',
    mataKuliah: 'Keamanan Data dan Informasi (2T1P)',
    dosen: 'Moh Firdaus, M.Kom',
    sipen: '(1) Indah Rizkika, (2) Dimas Dwi Rianto',
    keterangan: 'Kelas Reguler',
    ruangan: 'Labkom'
  },
  {
    hari: 'Kamis',
    waktu: '13:00 – 15:30',
    kode: 'MK08',
    mataKuliah: 'Rekayasa Perangkat Lunak (2T1P)',
    dosen: 'Ahmad Ngiliyun, M.Kom.',
    sipen: 'Muhamad Fuad Aziz',
    keterangan: 'Kelas Reguler',
    ruangan: 'Labkom'
  },
  {
    hari: 'Sabtu',
    waktu: '08:00 – 10:30',
    kode: 'IF34PR',
    mataKuliah: 'Cloud Computing 2 (2T1P)',
    dosen: 'Yassep Azzery, M.T.',
    sipen: 'Ardi Syah',
    keterangan: 'Kelas Reguler',
    ruangan: 'A2'
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
  /* Warna Header */
  --easy-table-header-background-color: var(--vp-c-gray-2);
  --easy-table-header-font-color: var(--vp-c-text-1);

  /* Body */
  --easy-table-body-row-background-color: var(--vp-c-bg); /* Warna dasar */
  --easy-table-body-row-font-color: var(--vp-c-text-1); /* Warna teks */
  --easy-table-body-row-even-background-color: var(--vp-c-bg-soft); /* Warna even row */
  --easy-table-body-row-hover-background-color: var(--vp-c-bg-mute); /* Hover */
  --easy-table-body-row-hover-font-color: var(--vp-c-text-1); /* Teks tetap terbaca */
  --easy-table-row-border: 1px solid var(--vp-c-gray-3);
  
  /* Warna Footer */
  --easy-table-footer-background-color: var(--vp-c-bg-soft);
  --easy-table-footer-font-color: var(--vp-c-text-1);

  /* Warna Hover */
  --easy-table-body-row-hover-background-color: var(--vp-c-bg-mute);
}

.custom-table {
  border: 1px solid var(--vp-c-border);
  border-collapse: collapse;
  font-family: 'Manrope', sans-serif;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

/* Styling Header */
.custom-table thead {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

/* Styling Body */
.custom-table tbody tr:nth-child(even) {
  background: var(--vp-c-bg-soft);
}

/* Hover Effect */
.custom-table tbody tr:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

/* Footer */
.custom-table tfoot {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

/* Pagination */
.custom-pagination {
  margin: 1rem 0;
  display: flex;
  gap: 0.5rem;
}

.custom-pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s;
}

.custom-pagination button.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

/* Expand Content */
.expand-content {
  padding: 15px;
  border-top: 1px solid var(--vp-c-border);
}

.expand-content p {
  margin: 5px;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

/* Custom style untuk input pencarian */
.search-input {
  width: 300px;
  padding: 10px 10px 10px 15px;
  margin: 10px 0 10px 0;
  font-family: 'Manrope', sans-serif;
  font-size: 0.9rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 0.5rem;
  box-shadow: var(--vp-shadow);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.search-input:focus {
  border-color: var(--vp-c-success-3);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
}

.search-input:focus::placeholder {
  color: var(--vp-c-success-1);
}

/* Responsiveness */
@media (max-width: 768px) {
  .custom-table th,
  .custom-table td {
    text-align: left !important;
    padding: 0.5rem;
    font-size: 0.8rem;
  }
  .search-input {
    width: 80%;
    font-size: 0.8rem;
  }
}
</style>

