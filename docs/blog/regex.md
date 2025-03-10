
# What is Regex?

---

# **1️⃣ Dasar Regex dalam Find & Replace**
Saat menggunakan **Find & Replace di VS Code**, kamu bisa mengaktifkan **Regex Mode** dengan mengklik ikon `.*` di kolom pencarian atau menggunakan **shortcut `Alt + R`**.

🔹 **Simbol Penting dalam Regex**  
| **Regex** | **Fungsi** | **Contoh** |
|-----------|-----------|-----------|
| `.` | Mewakili **karakter apa saja** kecuali newline | `h.t` cocok dengan `"hat"`, `"hit"`, `"hot"` |
| `.*` | Mencocokkan **semua karakter** dalam satu baris | `hello.*world` cocok dengan `"hello amazing world"` |
| `.*?` | **Versi non-greedy** (berhenti saat menemukan kecocokan pertama) | `<b>.*?</b>` hanya mengambil teks dalam `<b></b>` pertama |
| `\d` | Mencocokkan **angka (0-9)** | `\d+` cocok dengan `"123"` dalam `"ID: 123"` |
| `\w` | Mencocokkan **huruf, angka, dan underscore** | `\w+` cocok dengan `"username_1"` |
| `\s` | Mencocokkan **spasi, tab, newline** | `Hello\sWorld` cocok dengan `"Hello World"` |
| `\b` | **Word boundary** (batas kata) | `\bcat\b` hanya cocok dengan `"cat"`, tidak `"category"` |

---

### **2️⃣ Contoh Find & Replace Praktis**

#### **🟢 2.1 Menghapus Tag `<span>` Tanpa Menghapus Isinya**
> 🔹 **Kasus:**  
> Kamu ingin menghapus **`<span class="title">...</span>`** tapi **tetap mempertahankan teks di dalamnya**.

#### ✅ **Find (Regex Mode)**
```regex
<span class="title">(.*?)</span>
```
### ✅ **Replace dengan**
```regex
$1
```
🔹 **Hasil Perubahan:**  
```html
<span class="title">Web Development Tutorials</span>
```
➡ **Menjadi:**
```html
Web Development Tutorials
```
📝 **Penjelasan:**  
- `(.*?)` → **Menangkap teks di dalam `<span>`** dengan mode **non-greedy** supaya berhenti di `</span>` pertama yang ditemukan.  
- `$1` → **Mengganti hasil pencarian dengan teks yang ditangkap (tanpa `<span>`).**  

---

## **🟢 2.2 Mengubah `<span>` Menjadi `<strong>` Tanpa Mengubah Teks**
> 🔹 **Kasus:**  
> Mengubah `<span class="title">...</span>` menjadi `<strong>...</strong>`

### ✅ **Find (Regex Mode)**
```regex
<span class="title">(.*?)</span>
```
### ✅ **Replace dengan**
```regex
<strong>$1</strong>
```
🔹 **Hasil Perubahan:**  
```html
<span class="title">Important Text</span>
```
➡ **Menjadi:**
```html
<strong>Important Text</strong>
```

---

## **🟢 2.3 Menambahkan `class="highlight"` ke Semua `<h2>` Tanpa Mengubah Teks**
> 🔹 **Kasus:**  
> Kamu ingin **menambahkan class `highlight` ke semua `<h2>` yang belum punya class**.

### ✅ **Find (Regex Mode)**
```regex
<h2>(.*?)</h2>
```
### ✅ **Replace dengan**
```regex
<h2 class="highlight">$1</h2>
```
🔹 **Hasil Perubahan:**  
```html
<h2>My Title</h2>
```
➡ **Menjadi:**
```html
<h2 class="highlight">My Title</h2>
```

---

## **🟢 2.4 Menemukan dan Menghapus Baris yang Kosong**
> 🔹 **Kasus:**  
> Menghapus **semua baris kosong atau hanya berisi spasi/tab**.

### ✅ **Find (Regex Mode)**
```regex
^\s*$\n
```
### ✅ **Replace dengan (Kosongkan)**

🔹 **Hasil Perubahan:**  
```html
<h2>Title</h2>

<p>Some content</p>

<p>Another paragraph</p>
```
➡ **Menjadi:**
```html
<h2>Title</h2>
<p>Some content</p>
<p>Another paragraph</p>
```

📝 **Penjelasan:**  
- `^` → Awal baris  
- `\s*` → Semua spasi/tab  
- `$` → Akhir baris  
- `\n` → Baris baru  

---

## **🟢 2.5 Mengganti URL dalam Tag `<a>` Tanpa Mengubah Label**
> 🔹 **Kasus:**  
> Kamu ingin **mengubah semua tautan dari `http://` menjadi `https://`** tapi **tanpa mengubah teks di dalam `<a>`**.

### ✅ **Find (Regex Mode)**
```regex
<a href="http://(.*?)">
```
### ✅ **Replace dengan**
```regex
<a href="https://$1">
```
🔹 **Hasil Perubahan:**  
```html
<a href="http://example.com">Klik di sini</a>
```
➡ **Menjadi:**
```html
<a href="https://example.com">Klik di sini</a>
```

---

# **3️⃣ Tips & Best Practices**
✅ **Gunakan `.*?` untuk pencarian non-greedy** agar tidak menangkap lebih dari yang diinginkan.  
✅ **Gunakan `$1`, `$2`, ... untuk menggantikan teks yang ditangkap oleh regex.**  
✅ **Cek hasil dengan "Find All" sebelum mengganti seluruh file!**  
✅ **Gunakan fitur multi-cursor (`Ctrl + D` atau `Alt + Click`) jika ada pola yang bisa diubah manual.**  

---

Kalau kamu ingin **mengubah hanya kondisi `##` (h2 dalam Markdown) tanpa mengubah `#` (h1) atau `###` (h3)** di VS Code menggunakan **Find & Replace dengan Regex**, berikut caranya:

---

## **🔹 Regex untuk Menemukan Hanya `##` (h2)**
### ✅ **Find (Regex Mode)**
```regex
(?<!#)##(?!#)
```
### 📝 **Penjelasan:**
- `(?<!#)` → **Pastikan di depan `##` tidak ada `#`** (agar tidak menangkap `###`).
- `##` → **Menangkap `##` sebagai target penggantian.**
- `(?!#)` → **Pastikan setelah `##` tidak ada `#`** (agar tidak menangkap `###`).

---

## **🔹 Contoh Perubahan**
Sebelum:
```md
# Ini H1
## Ini H2
### Ini H3
## H2 Kedua
#### Ini H4
```
Misalnya, ingin menambahkan `class="highlight"` hanya ke `##` (h2):

### ✅ **Replace dengan:**
```regex
## <span class="highlight">
```

**Hasil Akhir:**
```md
# Ini H1
## <span class="highlight"> Ini H2
### Ini H3
## <span class="highlight"> H2 Kedua
#### Ini H4
```

---

## **🔹 Contoh Kasus Lain**
### **Mengubah `##` menjadi `== ... ==` (Markdown Highlight)**
Jika kamu ingin mengganti `##` dengan format highlight `==text==`:

### ✅ **Find (Regex Mode)**
```regex
(?<!#)## (.*)
```
### ✅ **Replace dengan**
```regex
== $1 ==
```

🔹 **Sebelum:**
```md
# Ini H1
## Ini H2
### Ini H3
## H2 Kedua
```

🔹 **Setelah Replace:**
```md
# Ini H1
== Ini H2 ==
### Ini H3
== H2 Kedua ==
```

---

# **🎯 Kesimpulan**
| **Keperluan** | **Find (Regex)** | **Replace Dengan** |
|--------------|----------------|----------------|
| **Hapus `<span>` tanpa hapus teks** | `<span class="title">(.*?)</span>` | `$1` |
| **Ubah `<span>` jadi `<strong>`** | `<span class="title">(.*?)</span>` | `<strong>$1</strong>` |
| **Tambah class ke `<h2>`** | `<h2>(.*?)</h2>` | `<h2 class="highlight">$1</h2>` |
| **Hapus baris kosong** | `^\s*$\n` | *(kosongkan)* |
| **Ganti `http://` jadi `https://` di `<a>`** | `<a href="http://(.*?)">` | `<a href="https://$1">` |

| **Keperluan** | **Find (Regex)** | **Replace Dengan** |
|--------------|----------------|----------------|
| **Ubah hanya `##` menjadi `h2` HTML** | `(?<!#)## (.*)` | `<h2>$1</h2>` |
| **Tambahkan `class="highlight"` ke `##`** | `(?<!#)## (.*)` | `## <span class="highlight">$1</span>` |
| **Ganti `##` dengan highlight Markdown `==`** | `(?<!#)## (.*)` | `== $1 ==` |

Dengan regex ini, kamu bisa **target hanya `##` tanpa kena `#` atau `###`**! 🚀