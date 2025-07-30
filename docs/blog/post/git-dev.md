---
title: Github Dev Workflow
description: Panduan lengkap untuk memahami alur kerja pengembangan dengan Git dan GitHub. Perintah-perintah dasar Git, praktik terbaik kolaborasi, dan langkah-langkah efisien dalam mengelola proyek melalui version control.
date: March 9, 2025
author: Ardi Syah
tags: [Tutorial]
banner: https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

<script setup>
import ReadingTime from '../../.vitepress/theme/components/ReadingTime.vue';
import SocialShare from '../../.vitepress/theme/components/SocialShare.vue';
</script>

<ReadingTime />
<SocialShare/>

## 1. Clone Repository & Branch Default 🔄

Saat kita meng-clone sebuah repository, hanya akan menampilkan **branch default** (biasanya `main` atau `master`) yang akan otomatis di-checkout. Namun, branch lainnya hanya tersedia di remote repository.

Jika kita menjalankan perintah berikut setelah cloning:

```bash
git checkout dev
```

Kemungkinan besar akan muncul error seperti ini:

```bash
error: pathspec 'dev' did not match any file(s) known to git
```

Ini terjadi karena branch `dev` belum tersedia secara lokal hanya dengan clone saja. Kita perlu mengambil daftar branch dari remote dengan:

```bash
git fetch origin

# Fetch branch terbaru dari remote jika tidak terdeteksi
git fetch --all
```

---

## 2. Membuat Branch Baru 💡

### 2.1. Membuat Branch Baru

1. **Perintah:**
   ```bash
   git branch nama-branch
   ```

### 2.2. Membuat Branch Baru dan Berpindah

1. **Perintah:**
   ```bash
   git checkout -b nama-branch
   git push -u origin nama-branch
   ```
   `-b` pada checkout berarti membuat dan berpindah ke branch baru.

### 2.3. Beralih ke Branch

1. **Perintah:**
   ```bash
   git checkout nama-branch
   ```
   Atau, untuk versi Git terbaru (>=2.23):

   ```bash
   git switch nama-branch
   ```

> **Catatan:** Jika `dev` sudah ada di remote, Git akan otomatis membuat branch lokal dan melacaknya dari remote.

Selain branch `main` atau `master` **tidak otomatis terbaca** setelah cloning, kita perlu menjalankan `git fetch` dan `git checkout` atau `git switch` untuk mulai bekerja di branch tersebut. 🚀

---

## 3. Remote di Git 🌐

**Remote** dalam Git adalah repositori yang tersimpan di server (misalnya di GitHub, GitLab, atau Bitbucket) yang digunakan untuk berbagi kode dengan tim atau menyimpan salinan repositori secara online.  

Ketika kamu melakukan `git push`, perubahan dikirim dari repositori lokal ke **remote repo**. Contoh umum remote adalah `origin`, yang secara default mengacu pada repo yang di-clone dari GitHub.

---

## 4. Menjalankan `git branch -r` 🔍

Kamu harus menjalankan perintah ini di terminal atau command prompt dalam direktori repositori lokal yang telah di-clone atau diinisialisasi dengan Git.

**Langkah-langkahnya:**
1. **Buka terminal (Command Prompt, Git Bash, atau terminal di VS Code atau IDE Editor lainnya).**
2. **Navigasi ke folder repositori** dengan perintah:
   ```bash
   cd path/to/repo
   ```
   Contoh:
   
   ```bash
   cd ~/Documents/test
   ```
3. **Jalankan perintah untuk melihat branch remote:**
   ```bash
   git branch -r 
   ```
   Jika branch `dev` sudah ada di remote, hasilnya mungkin seperti ini:
   ```
   origin/main
   origin/dev
   ```
   Jika hanya `origin/main` yang muncul, berarti branch `dev` belum di-push ke remote.

---

## 5. Branch `dev` Belum Ada di Remote ❗

Jika branch `dev` belum ada di remote, jalankan:
```bash
git push origin dev
```
Perintah ini akan mengunggah branch `dev` ke GitHub agar bisa diakses di komputer lain.

- `git push origin dev` hanya akan mendorong branch `dev` ke remote (origin).
- Tidak ada perubahan yang dikirim ke `main`, karena tidak ada perintah **merge** atau **rebase** ke `main`.
- `origin/main` tetap seperti sebelumnya, kecuali kamu melakukan **merge** atau **rebase** ke branch `main` secara eksplisit.

---

## 6. Push Perubahan Branch `dev` pada `main` 📤

Langkah terbaik untuk menerapkan perubahan dari `dev` ke `main` tergantung pada apakah kamu bekerja sendiri atau dalam tim.

### 6.1. Jika Bekerja Sendiri (git merge)

1. **Pindah ke branch `main`:**
   ```bash
   git checkout main
   ```
2. **Pastikan branch `main` terbaru:**
   ```bash
   git pull origin main
   ```
3. **Merge branch `dev` ke `main`:**
   ```bash
   git merge dev
   ```
   - Jika tidak ada konflik, perubahan akan langsung digabungkan.
   - Jika ada konflik, selesaikan konflik secara manual lalu:
     ```bash
     git commit -m "Resolve merge conflict"
     ```
4. **Push ke remote:**
   ```bash
   git push origin main
   ```
   Sekarang, `main` sudah diperbarui dengan perubahan dari `dev`.

### 6.2. Jika Bekerja dalam Tim (Pull Request di GitHub)

1. **Pastikan branch `dev` sudah di-push ke remote:**
   ```bash
   git push origin dev
   ```
2. **Buat Pull Request:**
   - Buka repo di GitHub.
   - Klik tombol **"Compare & pull request"**.
   - Pastikan base branch = `main` dan compare branch = `dev`.
   - Tambahkan deskripsi perubahan dan klik **"Create pull request"**.
3. **Review dan Merge:**
   - Diskusikan perubahan dengan tim jika perlu.
   - Setelah siap, klik **"Merge pull request"** di GitHub.
   - (Opsional) Hapus branch `dev` jika sudah tidak diperlukan.
4. **Sinkronisasi lokal dengan branch `main` terbaru:**
   ```bash
   git checkout main
   git pull origin main
   git merge dev
   git push origin main
   ```

---

## 7. Rollback Commit di Branch `dev` ⏪

### 7.1. Hard Reset (Menghapus Commit Secara Permanen)

```bash
git reset --hard <commit_id>
git push origin dev --force
```
**Catatan:** Menghapus commit sepenuhnya tanpa bisa dikembalikan.

### 7.2. Soft Reset (Hapus Commit Tapi Simpan Perubahan di Staging)

```bash
git reset --soft <commit_id>
```
**Catatan:** Commit dihapus, tapi perubahan tetap ada untuk diedit ulang.

### 7.3. Revert (Membatalkan Commit Tanpa Menghapus Riwayat)

```bash
git revert HEAD  # Membatalkan commit terakhir
git revert HEAD~1  # Membatalkan commit ke-2 terakhir
git push origin dev
```
**Catatan:** Cocok jika commit sudah di-push dan ingin menjaga riwayat commit tetap rapi.

---

## 8. Rollback di Branch `main` (Jika Terlanjur Merge `dev`) ⏪

### 8.1. Hard Reset (Menghapus Merge & Commit Setelahnya)

```bash
git reset --hard <commit_id>
git push origin main --force
```
**Catatan:** Menghapus perubahan secara permanen.

### 8.2. Revert Merge Tanpa Menghapus Riwayat

```bash
git revert -m 1 <commit_id_merge>
git push origin main
```
**Catatan:** Gunakan `git log --oneline` untuk mencari `<commit_id_merge>`.

> **Tabel Perbandingan:**

| Metode        | Efek                                             | Kapan Digunakan?                                    |
|---------------|--------------------------------------------------|-----------------------------------------------------|
| **Hard Reset**| Hapus commit 2 & 3 secara permanen               | Jika yakin tidak butuh commit 2 & 3 lagi            |
| **Soft Reset**| Commit 2 & 3 dihapus tapi perubahan tetap ada    | Jika ingin edit sebelum commit ulang                |
| **Revert**    | Membuat commit baru yang membatalkan commit 2 & 3  | Jika commit sudah di-push ke remote & ingin aman    |

---

## 9. Menghapus Branch `dev` Setelah Merge 🚮

Jika `dev` sudah tidak diperlukan setelah merge:
```bash
git branch -d dev  # Hapus branch di lokal
git push origin --delete dev  # Hapus branch di remote
```

---