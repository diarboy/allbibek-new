---
title: Github Dev Workflow
author: Ardi Syah
date: March 9, 2025
---

<script setup>
import ReadingTime from '../.vitepress/theme/components/ReadingTime.vue';
</script>

# {{ $frontmatter.title }} <Badge type="info" text="guide" />

<ReadingTime />

Saat kita meng-clone sebuah repository, hanya akan menampilkan **branch default** (biasanya `main` atau `master`) yang akan otomatis di-checkout. Namun, branch lainnya hanya tersedia di remote repository.

Jika kita menjalankan perintah berikut setelah cloning:

```bash
git checkout dev
```

Kemungkinan besar akan muncul error seperti ini:

```
error: pathspec 'dev' did not match any file(s) known to git
```

Ini terjadi karena branch `dev` belum tersedia secara lokal hanya dengan clone saja. kita perlu mengambil daftar branch dari remote dengan:

```bash
git fetch origin

# Fetch branch terbaru dari remote jika tidak terdeteksi
git fetch --all
```
### Membuat Branch Baru
1. Membuat Branch Baru
   ```bash
   git branch nama-branch
   ```

2. Membuat Branch Baru Sekaligus Berpindah
   ```bash
   git checkout -b nama-branch

   git push -u origin nama-branch
   ```
   `-b` pada checkout berarti membuat dan berpindah ke branch baru.
   
3. Kemudian, untuk beralih ke branch, gunakan:
   ```bash
   git checkout nama-branch
   ```
   
   Atau lebih sederhana di versi terbaru Git (>=2.23):
   ```bash
   git switch nama-branch
   ```

Jika `dev` sudah ada di remote, Git akan otomatis membuat branch lokal dan melacaknya dari remote.

Selain branch `main` atau `master` **tidak otomatis terbaca** setelah cloning. kita perlu menjalankan `git fetch` dan `git checkout` atau `git switch` untuk mulai bekerja di branch tersebut. 🚀

### **Apa itu Remote di Git?**  
**Remote** dalam Git adalah repositori yang tersimpan di server (misalnya di GitHub, GitLab, atau Bitbucket) yang digunakan untuk berbagi kode dengan tim atau menyimpan salinan repositori secara online.  

Ketika kamu melakukan `git push`, perubahan dikirim dari repositori lokal ke **remote repo**. Contoh umum remote adalah `origin`, yang secara default mengacu pada repo yang di-clone dari GitHub.

### **Dimana Harus Menjalankan `git branch -r`?**  
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
3. **Jalankan perintah berikut untuk melihat branch remote:**  
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

### **Bagaimana Jika Branch `dev` Belum Ada di Remote?**  
Jika branch `dev` belum ada di remote, jalankan:  
```bash
git push origin dev
```
Ini akan mengunggah branch `dev` ke GitHub agar bisa diakses di StackBlitz atau komputer lain.

`git push origin dev` berfungsi untuk mengunggah (push) perubahan dari branch `dev` di repositori lokal ke branch `dev` di remote repository (`origin`, biasanya GitHub, GitLab, atau Bitbucket).  

::: tip Notes
- `git push` → Mengirim perubahan dari lokal ke remote.  
- `origin` → Nama default remote repository.  
- `dev` → Nama branch yang ingin dikirim ke remote.  
:::

- Perintah git push `origin dev` tidak akan mempengaruhi `origin/main`.
- Perintah hanya mendorong (push) branch `dev` ke remote (origin).
- Tidak ada perubahan yang dikirim ke `main`, karena tidak ada perintah **merge** atau **rebase** ke `main`.
- `origin/main` tetap seperti sebelumnya, kecuali kamu melakukan `merge` atau `rebase` ke branch `main` secara eksplisit.

### **Kapan git push `origin dev` digunakan?**
- Setelah melakukan commit di branch `dev`, untuk menyimpan perubahan ke remote.  
- Jika branch `dev` belum ada di remote, perintah ini juga membuat branch `dev` di sana.  
- Agar branch `dev` bisa diakses di tempat lain, seperti StackBlitz atau komputer lain.

### **Kapan `origin/main` Bisa Terpengaruh?**
`origin/main` hanya akan terpengaruh jika kamu melakukan salah satu dari ini:
1. **Merge `dev` ke `main`**, misalnya:
   ```bash
   git checkout main
   git merge dev
   git push origin main
   ```
2. **Mengubah branch default di GitHub ke `dev`**, tapi ini tidak terjadi otomatis.  
3. **Membuka Pull Request di GitHub** dan menggabungkan perubahan dari `dev` ke `main`.

Jadi, aman untuk menjalankan `git push origin dev` tanpa takut mengubah `origin/main`.

**Contoh penggunaan:**
```bash
git add .
git commit -m "Menambahkan fitur baru di dev"
git push origin dev
```
`git add .` berfungsi untuk menambahkan semua perubahan (file baru, perubahan, dan penghapusan) dalam direktori kerja ke staging area sebelum commit.

### Set branch default di GitHub (Opsional)
- Buka repo di GitHub
- Masuk ke Settings → Branches
- Ubah default branch ke dev

Setelah menjalankan ini, perubahan di `dev` akan tersedia di GitHub, dan bisa diakses oleh tim. 🚀

---

## **Rollback Commit di Branch `dev`**

### **a) Hard Reset (Menghapus Commit Secara Permanen)**

```bash
git reset --hard <commit_id>
git push origin dev --force
```
    
**Catatan:** Menghapus commit sepenuhnya tanpa bisa dikembalikan.

### **b) Soft Reset (Hapus Commit Tapi Simpan Perubahan di Staging)**
```bash
git reset --soft <commit_id>
```
**Catatan:** Commit dihapus, tapi perubahan tetap ada untuk diedit ulang.

### **c) Revert (Membatalkan Commit Tanpa Menghapus Riwayat)**

```bash
git revert HEAD  # Membatalkan commit terakhir
git revert HEAD~1  # Membatalkan commit ke-2 terakhir
git push origin dev
```

**Catatan:** Cocok jika commit sudah di-push dan ingin menjaga riwayat commit tetap rapi.

---

### Push Perubahan branch `dev` pada `main`
Selanjutnya langkah terbaik untuk menerapkan perubahan dari `dev` ke `main` tergantung pada apakah kamu bekerja sendiri atau dalam tim. Berikut adalah dua pendekatan utama:

### **Jika Bekerja Sendiri (`git merge`)**  
Jika kamu satu-satunya yang mengembangkan proyek ini, kamu bisa langsung **merge `dev` ke `main`** di lokal lalu push ke remote.

#### **Langkah-langkahnya:**
1. **Pindah ke branch `main`**  
   ```bash
   git checkout main
   ```
2. **Pastikan branch `main` terbaru**  
   ```bash
   git pull origin main
   ```
3. **Merge branch `dev` ke `main`**  
   ```bash
   git merge dev
   ```
Jika tidak ada konflik, perubahan akan langsung digabungkan.
Jika ada konflik, Git akan meminta kamu menyelesaikannya secara manual sebelum melanjutkan, kemudian ketikkan perintah:
```bash
git commit -m "Resolve merge conflict"
```

4. **Push ke remote**  
   ```bash
   git push origin main
   ```
   Sekarang, `main` sudah diperbarui dengan perubahan dari `dev`.

---

### **Jika Bekerja dalam Tim (Pull Request di GitHub)**  
Jika proyek dikerjakan bersama tim, **gunakan Pull Request (PR)** agar bisa ditinjau sebelum perubahan diterapkan.

#### **Langkah-langkahnya:**
1. **Pastikan branch `dev` sudah di-push ke remote**  
   ```bash
   git push origin dev
   ```
2. **Buka GitHub dan buat Pull Request:**  
   - Buka repo di GitHub.  
   - Klik tombol **"Compare & pull request"**.  
   - Pastikan base branch = `main` dan compare branch = `dev`.  
   - Tambahkan deskripsi perubahan dan klik **"Create pull request"**.  
3. **Review dan Merge:**  
   - Jika perlu, diskusikan perubahan dengan tim.  
   - Setelah siap, klik **"Merge pull request"** di GitHub.  
   - Setelah merge selesai, bisa hapus branch `dev` jika tidak lagi dibutuhkan.

4. **Sinkronisasi lokal dengan branch `main` yang terbaru:**  
    ```bash
    # Beralih ke branch main
    git checkout main

    # Pastikan branch main up to date
    git pull origin main

    # Merge branch dev ke main
    git merge dev

    # Push hasil merge ke remote
    git push origin main
    ```

---

### **Mana yang Harus Digunakan?**
- **Bekerja sendiri** → `git merge dev` lebih cepat dan sederhana.  
- **Bekerja dalam tim** → Pull Request lebih disarankan agar ada review sebelum merge ke `main`.  

Jika sudah stabil dan siap untuk produksi, pastikan `main` tetap bersih dengan hanya menggabungkan perubahan yang telah diuji di `dev`. 🚀

## Rollback di Branch `main` (Jika Terlanjur Merge `dev`)

### **a) Hard Reset (Menghapus Merge & Commit Setelahnya)**
```bash
git reset --hard <commit_id>
git push origin main --force
```
**Catatan:** Menghapus perubahan secara permanen.

### **b) Revert Merge Tanpa Menghapus Riwayat**
```bash
git revert -m 1 <commit_id_merge>
git push origin main
```
**Catatan:** Gunakan `git log --oneline` untuk mencari `<commit_id_merge>`.

---

| Metode | Efek | Kapan Digunakan? |
|--------|------|-----------------|
| **Hard Reset** | Hapus commit 2 & 3 secara permanen | Jika yakin tidak butuh commit 2 & 3 lagi |
| **Soft Reset** | Commit 2 & 3 dihapus tapi perubahan tetap ada di staging | Jika ingin edit sebelum commit ulang |
| **Revert** | Membuat commit baru yang membatalkan commit 2 & 3 | Jika commit sudah di-push ke remote & ingin aman |

## Menghapus Branch `dev` Setelah Merge (Opsional)
Jika `dev` sudah tidak diperlukan setelah merge:
```bash
git branch -d dev  # Hapus branch di lokal
git push origin --delete dev  # Hapus branch di remote
```