---
title: Frontmatter Date 🚀
author: Ardi Syah
---

<script setup>
import ReadingTime from '../.vitepress/theme/components/ReadingTime.vue';
</script>

# {{ $frontmatter.title }} <Badge type="info" text="guide" />

<ReadingTime />

## Buat Test Frontmatter Date

# Soal Linear Programming

Sebuah perusahaan logistik ingin mengirim barang menggunakan dua jenis moda transportasi: **truk** dan **kapal**. Perusahaan ingin menentukan jumlah optimal truk dan kapal yang digunakan agar biaya pengiriman **seminimal mungkin**, sambil memenuhi beberapa kendala operasional.

1. **Biaya Pengiriman**:
   - Biaya penggunaan satu truk adalah **Rp 3.000.000**.
   - Biaya penggunaan satu kapal adalah **Rp 2.000.000**.

2. **Kendala Waktu**:
   - Setiap truk membutuhkan waktu **5 jam** perjalanan.
   - Setiap kapal membutuhkan waktu **8 jam** perjalanan.
   - Total waktu yang tersedia untuk pengiriman adalah **60 jam per hari**.

3. **Kendala Jumlah Kontainer**:
   - Perusahaan harus mengirim minimal **10 kontainer barang per hari**.
   - Diasumsikan setiap truk dan kapal hanya dapat membawa **1 kontainer per kendaraan**.

4. **Kendala Non-Negatif**:
   - Jumlah truk dan kapal tidak boleh negatif.

## Pertanyaan

Formulasikan model Linear Programming (LP) untuk masalah ini dan tentukan:

- Jumlah truk ($x$) dan kapal ($y$) yang harus digunakan agar biaya pengiriman **minimum**.
- Berapa total biaya minimum?

Jawaban yang saya berikan sebelumnya **belum sepenuhnya menyelesaikan soal**, karena hanya merumuskan model Linear Programming (LP) secara matematis. Untuk benar-benar menyelesaikan soal, kita perlu mencari solusi optimal dari model LP tersebut, yaitu nilai $x$ (jumlah truk) dan $y$ (jumlah kapal) yang meminimalkan biaya total sambil memenuhi semua kendala.

Berikut adalah langkah-langkah untuk menyelesaikan model LP ini secara lengkap menggunakan **metode grafik**:

---

### 1. Fungsi Tujuan
Kita ingin meminimalkan:
$$
Z = 3.000.000x + 2.000.000y
$$

---

### 2. Kendala
Kendala yang diberikan adalah:
1. $5x + 8y \leq 60$ (kendala waktu)
2. $x + y \geq 10$ (kendala jumlah kontainer)
3. $x \geq 0$, $y \geq 0$ (kendala non-negatif)

---

### 3. Gambar Grafik
Untuk menyelesaikan menggunakan metode grafik, kita perlu menggambarkan garis-garis kendala pada bidang koordinat $x$-$y$.

#### a. Kendala $5x + 8y \leq 60$:
Ubah ke bentuk persamaan:
$$
5x + 8y = 60
$$
Cari titik potong dengan sumbu $x$ dan $y$:
- Jika $x = 0$, maka $8y = 60 \Rightarrow y = 7.5$.
- Jika $y = 0$, maka $5x = 60 \Rightarrow x = 12$.

Jadi, garis ini melalui titik $(12, 0)$ dan $(0, 7.5)$. Daerah yang memenuhi adalah di bawah garis ini.

#### b. Kendala $x + y \geq 10$:
Ubah ke bentuk persamaan:
$$
x + y = 10
$$
Cari titik potong dengan sumbu $x$ dan $y$:
- Jika $x = 0$, maka $y = 10$.
- Jika $y = 0$, maka $x = 10$.

Jadi, garis ini melalui titik $(10, 0)$ dan $(0, 10)$. Daerah yang memenuhi adalah di atas garis ini.

#### c. Kendala Non-Negatif:
- $x \geq 0$: Hanya daerah di sebelah kanan sumbu $y$.
- $y \geq 0$: Hanya daerah di atas sumbu $x$.

---

### 4. Daerah Feasible
Daerah feasible adalah irisan dari semua kendala. Dengan menggambarkan garis-garis di atas, kita dapat menentukan daerah feasible. Titik-titik sudut daerah feasible adalah calon solusi optimal.

---

### 5. Titik Sudut Daerah Feasible
Setelah menggambar grafik, kita temukan titik-titik sudut daerah feasible:
1. Titik potong antara $5x + 8y = 60$ dan $x + y = 10$:
   - Substitusi $y = 10 - x$ ke $5x + 8y = 60$:
     $$
     5x + 8(10 - x) = 60
     $$
     $$
     5x + 80 - 8x = 60
     $$
     $$
     -3x = -20 \Rightarrow x = \frac{20}{3} \approx 6.67
     $$
     $$
     y = 10 - x = 10 - \frac{20}{3} = \frac{10}{3} \approx 3.33
     $$
   Jadi, titik potong ini adalah $\left( \frac{20}{3}, \frac{10}{3} \right)$.

2. Titik potong $x + y = 10$ dengan sumbu $x$: $(10, 0)$.
3. Titik potong $5x + 8y = 60$ dengan sumbu $y$: $(0, 7.5)$.

---

### 6. Evaluasi Fungsi Tujuan
Hitung nilai $Z$ di setiap titik sudut:
1. Di $\left( \frac{20}{3}, \frac{10}{3} \right)$:
   $$
   Z = 3.000.000 \cdot \frac{20}{3} + 2.000.000 \cdot \frac{10}{3}
   $$
   $$
   Z = 20.000.000 + 6.666.666.67 = 26.666.666.67
   $$

2. Di $(10, 0)$:
   $$
   Z = 3.000.000 \cdot 10 + 2.000.000 \cdot 0 = 30.000.000
   $$

3. Di $(0, 7.5)$:
   $$
   Z = 3.000.000 \cdot 0 + 2.000.000 \cdot 7.5 = 15.000.000
   $$

---

### 7. Solusi Optimal
Nilai $Z$ terkecil adalah **15.000.000**, yang terjadi di titik $(0, 7.5)$. Namun, karena jumlah kapal harus bilangan bulat, kita perlu membulatkan $y = 7.5$ menjadi $y = 8$ (menggunakan pembulatan ke atas agar memenuhi kendala).

Jadi, solusi optimal adalah:
$$
\boxed{x = 0, y = 8}
$$

Artinya, perusahaan sebaiknya menggunakan **0 truk** dan **8 kapal** untuk meminimalkan biaya pengiriman. Biaya total minimum adalah:
$$
Z = 3.000.000 \cdot 0 + 2.000.000 \cdot 8 = 16.000.000
$$