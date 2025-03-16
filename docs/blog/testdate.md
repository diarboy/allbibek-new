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

# Penyelesaian Soal Linear Programming

Untuk menyelesaikan soal ini, kita akan merumuskan model Linear Programming (LP) dan mencari solusi optimal menggunakan metode grafik. Berikut adalah langkah-langkah penyelesaiannya:

---

## 1. Definisikan Variabel
Misalkan:
- $ x $: Jumlah truk yang digunakan.
- $ y $: Jumlah kapal yang digunakan.

---

## 2. Fungsi Tujuan
Kita ingin **meminimalkan biaya total pengiriman**. Biaya total dapat dirumuskan sebagai:
$$
Z = 3.000.000x + 2.000.000y
$$

Fungsi tujuan:
$$
\text{Minimalkan } Z = 3.000.000x + 2.000.000y
$$

---

## 3. Kendala
Kendala-kendala yang diberikan adalah:
1. **Kendala waktu perjalanan**:
   - Jalur darat membutuhkan 5 jam per truk.
   - Jalur laut membutuhkan 8 jam per kapal.
   - Total waktu tersedia adalah 60 jam per hari.
   $$
   5x + 8y \leq 60
   $$

2. **Kendala jumlah kontainer**:
   - Perusahaan harus mengirim minimal 10 kontainer barang per hari.
   $$
   x + y \geq 10
   $$

3. **Kendala non-negatif**:
   - Jumlah truk dan kapal tidak bisa negatif.
   $$
   x \geq 0, \quad y \geq 0
   $$

---

## 4. Gambar Grafik
Untuk menyelesaikan menggunakan metode grafik, kita gambarkan garis-garis kendala pada bidang koordinat $ x $-$ y $.

### a. Kendala $ 5x + 8y \leq 60 $
Ubah ke bentuk persamaan:
$$
5x + 8y = 60
$$
Cari titik potong dengan sumbu $ x $ dan $ y $:
- Jika $ x = 0 $, maka $ y = \frac{60}{8} = 7.5 $.
- Jika $ y = 0 $, maka $ x = \frac{60}{5} = 12 $.

Garis ini melalui titik $ (12, 0) $ dan $ (0, 7.5) $. Daerah yang memenuhi adalah di bawah garis ini.

### b. Kendala $ x + y \geq 10 $
Ubah ke bentuk persamaan:
$$
x + y = 10
$$
Cari titik potong dengan sumbu $ x $ dan $ y $:
- Jika $ x = 0 $, maka $ y = 10 $.
- Jika $ y = 0 $, maka $ x = 10 $.

Garis ini melalui titik $ (10, 0) $ dan $ (0, 10) $. Daerah yang memenuhi adalah di atas garis ini.

### c. Kendala Non-Negatif
Daerah feasible hanya mencakup kuadran pertama ($ x \geq 0 $, $ y \geq 0 $).

---

## 5. Daerah Feasible
Daerah feasible adalah irisan dari semua kendala. Titik-titik sudut daerah feasible adalah calon solusi optimal.

---

## 6. Titik Sudut Daerah Feasible
Setelah menggambar grafik, kita temukan titik-titik sudut daerah feasible:
1. **Titik potong antara $ 5x + 8y = 60 $ dan $ x + y = 10 $:**
   Substitusi $ y = 10 - x $ ke $ 5x + 8y = 60 $:
   $$
   5x + 8(10 - x) = 60
   $$
   $$
   5x + 80 - 8x = 60
   $$
   $$
   -3x = -20 \implies x = \frac{20}{3}, \quad y = 10 - \frac{20}{3} = \frac{10}{3}
   $$
   Jadi, titik potong ini adalah $ \left( \frac{20}{3}, \frac{10}{3} \right) $.

2. **Titik potong $ x + y = 10 $ dengan sumbu $ x $:** $ (10, 0) $.

3. **Titik potong $ 5x + 8y = 60 $ dengan sumbu $ y $:** $ (0, 7.5) $.

---

## 7. Evaluasi Fungsi Tujuan
Hitung nilai $ Z $ di setiap titik sudut:

1. Di $ \left( \frac{20}{3}, \frac{10}{3} \right) $:
   $$
   Z = 3.000.000 \cdot \frac{20}{3} + 2.000.000 \cdot \frac{10}{3}
   $$
   $$
   Z = 20.000.000 + 6.666.666.67 = 26.666.666.67
   $$

2. Di $ (10, 0) $:
   $$
   Z = 3.000.000 \cdot 10 + 2.000.000 \cdot 0 = 30.000.000
   $$

3. Di $ (0, 7.5) $:
   $$
   Z = 3.000.000 \cdot 0 + 2.000.000 \cdot 7.5 = 15.000.000
   $$

---

## 8. Solusi Optimal
Nilai $ Z $ terkecil adalah **15.000.000**, yang terjadi di titik $ (0, 7.5) $. Karena jumlah kapal harus bilangan bulat, kita bulatkan $ y = 7.5 $ menjadi $ y = 8 $.

Solusi optimal:
$$
\boxed{x = 0, y = 8}
$$

Artinya, perusahaan sebaiknya menggunakan **0 truk** dan **8 kapal** untuk meminimalkan biaya pengiriman. Biaya total minimum adalah:
$$
Z = 3.000.000 \cdot 0 + 2.000.000 \cdot 8 = 16.000.000
$$