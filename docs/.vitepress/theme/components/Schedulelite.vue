<template>
    <div>
      <input
        v-model="search"
        type="text"
        placeholder="Cari mata kuliah atau dosen..."
        class="search-input"
      />
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th v-for="(header, index) in headers" :key="index" @click="sortBy(header.key)">
                {{ header.label }}
                <span v-if="sortKey === header.key">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in filteredData" :key="index">
              <!-- <td v-for="(header, idx) in headers" :key="idx">
                {{ row[header.key] }}
              </td> // Iterasi --> 
              <td :style="{ textAlign: 'center' }">{{ row.hari }}</td>
              <td :style="{ textAlign: 'center' }">{{ row.waktu }}</td>
              <td :style="{ textAlign: 'left' }">{{ row.mataKuliah }}</td>
              <td :style="{ textAlign: 'center' }">{{ row.sks }}</td>
              <td :style="{ textAlign: 'left' }">
                <span v-for="(dosen, i) in row.dosen" :key="i">
                  {{ dosen }}<br>
                </span>
              </td>

              <td :style="{ textAlign: 'left' }">
                <span v-for="(sipen, i) in row.sipen" :key="i">
                  {{ sipen }}<br>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const search = ref('');
  const sortKey = ref('');
  const sortOrder = ref('asc');
  
  const headers = [
    { label: 'Hari', key: 'hari' },
    { label: 'Waktu', key: 'waktu' },
    { label: 'Mata Kuliah', key: 'mataKuliah' },
    { label: 'SKS', key: 'sks' },
    { label: 'Dosen', key: 'dosen' },
    { label: 'SIPEN', key: 'sipen' }
  ];
  
  const data = ref([
    {
      index: 1,
      hari: 'Senin',
      waktu: '08:00 - 09:30',
      mataKuliah: 'PEMASARAN DIGITAL',
      sks: 2,
      dosen: ["Ade Sutriyono, S.Kom., MM.SI", "Hendri Rosmawan, M.Kom."],
      sipen: ["Muhammad Rizki", "Sabili Muhammad Azka"]
    },
    {
      index: 2,
      hari: 'Selasa',
      waktu: '08:00 - 09:30',
      mataKuliah: 'MANAJEMEN SISTEM INFORMASI KESEHATAN',
      sks: 2,
      dosen: ["Fardhoni, A.Md.Kes., ST., MM", "Dr. Andinna Ananda Yusuff, MM."],
      sipen: ["Aurelia Septia Apriani", "Dimas Surya Putra"]
    },
    { 
    index: 3, 
    hari: 'Rabu', 
    waktu: '10:30 - 13:00', 
    mataKuliah: 'MANAJEMEN SAINS DAN RISET OPERASIONAL', 
    sks: 3, 
    dosen: ['Dr. Indra Surya Permana, M.M.'], 
    sipen: ['Fasya Mahesa', 'Muhamad Septian Ardiansyah Yudhono'] 
  },
  { 
    index: 4, 
    hari: 'Rabu', 
    waktu: '13:00 - 15:30', 
    mataKuliah: 'PEMROGRAMAN MOBILE 1', 
    sks: 3, 
    dosen: ['Mohamad Firdaus, M.Kom'], 
    sipen: ['Muhammad Labbiibul Muhsin'] 
  },
  { 
    index: 5, 
    hari: 'Kamis', 
    waktu: '08:00 - 10:30', 
    mataKuliah: 'PEMBELAJARAN MESIN', 
    sks: 3, 
    dosen: ['Ade Sutriyono, S.Kom., MM.SI', 'Ahmad Ngiliyun, M.Kom.'], 
    sipen: ['Jaisyi Bagir Rafsyahid'] 
  },
  { 
    index: 6, 
    hari: 'Kamis', 
    waktu: '10:30 - 13:00', 
    mataKuliah: 'KEAMANAN DATA DAN INFORMASI', 
    sks: 3, 
    dosen: ['Mohamad Firdaus, M.Kom'], 
    sipen: ['Indah Rizkika', 'Dimas Dwi Rianto'] 
  },
  { 
    index: 7, 
    hari: 'Kamis', 
    waktu: '13:00 - 15:30', 
    mataKuliah: 'REKAYASA PERANGKAT LUNAK', 
    sks: 3, 
    dosen: ['Syaiful Ramadhan, M.Kom', 'Ahmad Ngiliyun, M.Kom.'], 
    sipen: ['Muhamad Fuad Aziz'] 
  },
  { 
    index: 8, 
    hari: 'Sabtu', 
    waktu: '08:00 - 10:30', 
    mataKuliah: 'CLOUD COMPUTING 2', 
    sks: 3, 
    dosen: ['Yassep Azzeri, M.T'], 
    sipen: ['Ardiyansyah'] 
  }
  ]);
  
  const filteredData = computed(() => {
    let result = [...data.value];
    if (search.value) {
      result = result.filter(row =>
        Object.values(row).some(val =>
          String(val).toLowerCase().includes(search.value.toLowerCase())
        )
      );
    }
    if (sortKey.value) {
      result.sort((a, b) => {
        let modifier = sortOrder.value === 'asc' ? 1 : -1;
        if (sortKey.value === "hari") {
        return (a.index - b.index) * modifier;
        }
        return a[sortKey.value] > b[sortKey.value] ? modifier : -modifier;
      });
    }
    return result;
  });
  
  const sortBy = (key) => {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey.value = key;
      sortOrder.value = 'asc';
    }
  };
  </script>
  
  <style scoped>
  .search-input {
    width:300px;
    padding: 10px 10px 10px 15px;
    margin-top: 10px;
    font-family: 'Manrope', sans-serif;
    font-size: 0.9rem;
    border: 1px solid var(--vp-c-border);
    border-radius: 0.5rem;
    box-shadow: var(--vp-shadow);
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
  
  .table-wrapper {
    width: 100%;
    overflow-x: auto;
  }

  table {
    min-width: 600px; /* tambahan */
    width: 100%;
    max-width: fit-content;
    margin-bottom: 70px;
    border-collapse: collapse;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    background: var(--vp-c-bg);
    color: var(--vp-c-text-1);
  }
  
  thead tr {
    background: linear-gradient(to right, #2563eb, #3b82f6);
    color: white;
  }
  
  th, td {
    padding: 12px;
    text-align: center;
  }
  
  tbody tr:nth-child(even) {
    background: var(--vp-c-bg-soft);
  }
  
  tbody tr:hover {
    background: rgba(59, 130, 246, 0.2);
    transition: background 0.3s;
  }
  
  html.dark table {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  }

  html.dark thead tr {
    background: linear-gradient(to right, #1e3a8a, #3b82f6);
  }
  html.dark tbody tr:nth-child(even) {
    background: var(--vp-c-bg-mute);
  }
  html.dark tbody tr:hover {
    background: rgba(37, 99, 235, 0.1);
  }

  @media (max-width: 768px) {
    th, td {
      padding: 8px;
      font-size: 13px;
    }
    table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
    }
    .search-input {
    width: 250px;
    max-width: 100%;
    font-size: 0.8rem;
  }
  }
  </style>