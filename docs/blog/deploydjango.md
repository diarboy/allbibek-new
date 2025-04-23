---
title: Deploy Django Backend ke EC2 dengan Gunicorn + Nginx + Supabase 🛠️
author: Ardi Syah
---

<script setup>
import ReadingTime from '../.vitepress/theme/components/ReadingTime.vue';
</script>

# {{ $frontmatter.title }} <Badge type="info" text="guide" />

<ReadingTime />

## 🚀 1. Membuat Instance EC2

AWS EC2 (Amazon Elastic Compute Cloud) adalah **layanan server virtual** di cloud yang disediakan oleh AWS. Gampangnya, **EC2 itu kayak kamu sewa komputer/server di internet** yang bisa kamu pakai buat install sistem operasi, jalankan aplikasi, hosting website, dan lainnya.

---

### 🧠 Konsep Dasar EC2:
| Konsep | Penjelasan |
|--------|------------|
| **Instance** | Satu unit “server virtual” yang kamu jalankan |
| **AMI (Amazon Machine Image)** | Template OS (misal Ubuntu, Windows, Amazon Linux) |
| **Instance Type** | Menentukan spek server (CPU, RAM, dsb), contoh: `t2.micro`, `t3.large` |
| **Elastic IP** | Alamat IP publik tetap yang bisa kamu hubungkan ke instance |
| **Security Group** | Firewall-nya EC2 (atur port yang boleh diakses, misal port 22 untuk SSH, 80 untuk HTTP) |

---

### 💸 Apakah Berbayar?
Ya, **berbayar**, tapi kamu bisa pakai **Free Tier**:
- 750 jam per bulan untuk `t2.micro` (cukup untuk 1 server nyala nonstop sebulan penuh)
- Gratis 12 bulan pertama

---

### 🧩 EC2 vs Layanan Lain?
| Layanan | Fungsi | Cocok Untuk |
|---------|--------|--------------|
| **EC2** | Full control server | Web server, app, database |
| **Lambda** | Jalankan fungsi tanpa server | Otomatisasi, microservice |
| **Elastic Beanstalk** | Deploy app otomatis | Developer yang nggak mau ribet setup EC2 |
| **Lightsail** | Simpel, mirip VPS | Website kecil, pemula |

### Langkah-langkah
1. Buka AWS Console → EC2 → Launch Instance.
2. Pilih OS: **Ubuntu Server 22.04** (gratis dalam free tier).
3. Pilih tipe: `t2.micro` (untuk free tier).
4. Buat/gunakan key pair (misalnya: `your-key.pem`).
5. Atur Security Group: buka port 22 (SSH), 80 (HTTP), dan 443 (HTTPS).

✅ **Setelah berhasil launch**, catat public IPv4 address untuk digunakan pada SSH dan SCP.

---

### ✅ **Tips Setup Security Group EC2 yang Aman**

#### 1. **Hanya buka port yang diperlukan**
> Jangan buka semua port ke publik!

| Port | Fungsi | Kapan dibuka? |
|------|--------|----------------|
| `22` | SSH (akses ke server) | **Hanya untuk IP kamu sendiri**, jangan `0.0.0.0/0` |
| `80` | HTTP (website) | Kalau kamu hosting web tanpa HTTPS |
| `443` | HTTPS | Untuk web yang pakai SSL |
| `3306` | MySQL | Jangan dibuka ke publik! Cukup local IP atau VPC |
| `5432` | PostgreSQL | Sama, hanya untuk internal/whitelist |
| `8000`, `5000`, `3000` | Port dev Django, Node, dll | Hanya sementara untuk testing, idealnya non-public |

#### 📌 Contoh konfigurasi aman:
```txt
Port: 22 | Source: Custom IP → [alamat IP kamu] (misalnya: 36.74.20.55/32)
Port: 80 | Source: Anywhere (0.0.0.0/0)
Port: 443 | Source: Anywhere (0.0.0.0/0)
```

---

#### 2. **Gunakan IP Whitelist**
- Jangan asal pakai `0.0.0.0/0` untuk port sensitif seperti SSH, MySQL.
- Gunakan `/32` untuk hanya 1 IP. Misal:
  ```
  36.74.20.55/32 → hanya bisa diakses dari satu IP ini
  ```

#### 3. **Gunakan Bastion Host (kalau kompleks)**
Kalau kamu punya banyak EC2, jangan semua bisa SSH. Gunakan 1 EC2 (bastion) sebagai gerbang masuk, lalu akses internal EC2 lain lewat private network.

---

#### 4. **Hapus Rule yang Nggak Dipakai**
Jangan biarkan port terbuka kalau udah nggak kamu gunakan. Tutup akses ke port seperti:
- `8000`, `8080`, `3000`, dst. setelah development selesai
- Port database kalau nggak perlu remote access

---

#### 5. **Gunakan Security Group Terpisah per Role**
Misal:
- **SG-Web**: hanya untuk web (port 80/443)
- **SG-DB**: hanya untuk MySQL/PostgreSQL (tidak menerima publik)
- **SG-SSH**: hanya untuk SSH dan dari IP kamu

---

### Hindari Password Login via SSH
- **Gunakan key-pair (.pem)** yang disediakan AWS saat buat EC2.
- Disable password login di konfigurasi SSH (`/etc/ssh/sshd_config`).

---

## 🔐 2. Remote Server via SSH

### Perintah Login dari PowerShell:
```bash
ssh -i your-key.pem ubuntu@<EC2-IP>
```

🧠 **Note:** Pastikan permission file `.pem` benar:
```bash
chmod 400 your-key.pem
```

Jika berhasil, kamu akan melihat prompt seperti:
```bash
ubuntu@ip-172-31-xx-xx:~$
```

---

## 📦 3. Upload Project ke Server

### Perintah upload file dari lokal ke server:
```bash
scp -i your-key.pem yourproject_backend.zip ubuntu@<EC2-IP>:/home/ubuntu/
```

Setelah itu remote kembali via SSH dan cek file:
```bash
ls
```

Kalau file belum bisa dibuka:
```bash
sudo apt update && sudo apt install unzip
unzip yourproject_backend.zip
```

---

## 🐍 4. Install Python + Django

Django adalah **framework web** berbasis **Python** yang bersifat **open-source** dan dirancang untuk memudahkan pembuatan aplikasi web dengan cepat, aman, dan terstruktur. Django sangat populer di kalangan developer karena:

### 🔧 Fitur Utama Django:
1. **MTV (Model-Template-View)**: Mirip dengan MVC, tapi dengan istilah yang sedikit berbeda.
2. **ORM (Object-Relational Mapping)**: Menghubungkan database dengan model Python secara otomatis, tanpa perlu banyak SQL.
3. **Admin Panel Otomatis**: Django bisa secara otomatis membuat halaman admin dari model database.
4. **Routing URL yang fleksibel**: Mudah mengatur URL dan views sesuai kebutuhan.
5. **Keamanan Tinggi**: Melindungi dari serangan seperti CSRF, XSS, SQL injection, dll.
6. **Skalabilitas dan Modularitas**: Cocok untuk proyek kecil maupun besar.

### 🔍 Contoh Penggunaan Django:
- Aplikasi web seperti blog, toko online, manajemen pengguna, forum.
- Backend untuk aplikasi mobile.
- Sistem manajemen konten (CMS).

### ⚡ Contoh Kode Sederhana:
```python
# models.py
from django.db import models

class Artikel(models.Model):
    judul = models.CharField(max_length=100)
    isi = models.TextField()

# views.py
from django.shortcuts import render
from .models import Artikel

def index(request):
    artikel = Artikel.objects.all()
    return render(request, 'index.html', {'artikel': artikel})
```

### Cek dan install Python:
```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

### Setup Virtual Environment:
```bash
python3 -m venv venv
tsource venv/bin/activate
```

### Install dependensi dari `requirements.txt`:
```bash
pip install -r requirements.txt
```

📌 Gunakan `requirements.txt` yang sudah kamu buat di lokal.

---

## 🔥 5. Jalankan Django

### Cek struktur direktori:
Pastikan kamu pakai struktur `apps/` di dalam proyek Django.
```bash
.
├── manage.py
├── apps/
├── yourproject/
└── requirements.txt
```

### Jalankan server dev (untuk cek awal):
```bash
python manage.py runserver 0.0.0.0:8000
```

Coba akses di browser: `http://<EC2-IP>:8000`

---

## 🐿️ 6. Setup Gunicorn (WSGI Server)

Gunicorn adalah **WSGI HTTP Server** untuk aplikasi Python seperti Django. Dibutuhkan agar Django bisa jalan di production dengan performa optimal dan memungkinkan multiple worker (multi-process), jadi aplikasimu bisa melayani banyak permintaan secara paralel (lebih cepat dan stabil).

### Kenapa nggak pakai `python manage.py runserver`?
- `runserver` hanya untuk development.
- Tidak aman dan tidak efisien untuk production (nggak bisa handle banyak trafik).
- Gunicorn lebih cepat, stabil, dan cocok untuk deployment.

---

### 🔥 Apa itu `systemd`?
`systemd` adalah sistem init di Linux yang bisa menjalankan service saat booting dan menjaga proses tetap hidup. Jadi kalau server di-restart, **Gunicorn jalan otomatis**.

---

### 💡 Fungsi dan Manfaat Jalankan Gunicorn via `systemd`

| Fitur | Fungsi |
|-------|--------|
| ✅ Auto-start | Gunicorn jalan otomatis saat server reboot |
| ✅ Logging | Mudah di-log dengan `journalctl` |
| ✅ Restart otomatis | Kalau crash, bisa otomatis di-restart |
| ✅ Bisa di-manage | Start/Stop/Restart lebih rapi:  
```bash
sudo systemctl start gunicorn  
sudo systemctl stop gunicorn  
sudo systemctl restart gunicorn  
```

Langkah-langkahnya adalah:

### Install Gunicorn:
```bash
pip install gunicorn
```

### Jalankan Gunicorn:
```bash
gunicorn yourproject.wsgi:application --bind 0.0.0.0:8000
```

Kalau jalan, lanjut bikin service:

### Konfigurasi `gunicorn.service`:
```ini
# /etc/systemd/system/gunicorn.service
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/home/ubuntu/yourproject
ExecStart=/home/ubuntu/yourproject/venv/bin/gunicorn --access-logfile - --workers 3 --bind unix:/home/ubuntu/yourproject/yourproject.sock yourproject.wsgi:application

[Install]
WantedBy=multi-user.target
```

### Jalankan dan enable:
```bash
sudo systemctl start gunicorn
sudo systemctl enable gunicorn
```

Cek status:
```bash
sudo systemctl status gunicorn
```

---

## 🌐 7. Setup Nginx (Reverse Proxy)

**Nginx** digunakan sebagai **reverse proxy**. Ia meneruskan request dari port 80/443 ke Gunicorn (yang biasanya berjalan di socket atau port internal).

### Install Nginx:
```bash
sudo apt install nginx
```

### Konfigurasi Nginx:
```bash
sudo nano /etc/nginx/sites-available/yourproject
```
Isi dengan:
```nginx
server {
    listen 80;
    server_name your-ec2-ip;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /home/ubuntu/yourproject;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/home/ubuntu/yourproject/yourproject.sock;
    }
}
```

Aktifkan konfigurasi:
```bash
sudo ln -s /etc/nginx/sites-available/yourproject /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
```

Cek akses: `http://<EC2-IP>` 🔥

---

## 🧩 8. Connect ke Supabase

Supabase adalah **backend-as-a-service** yang menyediakan fitur database PostgreSQL + autentikasi + API siap pakai.

### Gunakan URL dan `anon/public key` dari Supabase:
```env
SUPABASE_URL=https://xyzcompany.supabase.co
SUPABASE_KEY=public-anon-key
```

Gunakan di Django via `python-dotenv` atau langsung di `settings.py`.

🔐 Gunakan `psycopg2` untuk koneksi database PostgreSQL:
```bash
pip install psycopg2-binary
```

---

## 🧱 9. Django REST Framework (DRF)

**Django REST Framework (DRF)** adalah **library powerful** untuk membangun **API (Application Programming Interface)** menggunakan Django. DRF (Django REST Framework) mempermudah kita membangun **RESTful API** dengan Django. 

Kalau Django itu buat bikin web app (HTML-based), maka DRF itu buat bikin **backend RESTful API** — bisa diakses oleh frontend (misalnya React, Flutter, atau aplikasi mobile).

---

### 📦 Fitur Utama DRF:

| Fitur | Penjelasan |
|-------|------------|
| ✅ **Serializer** | Mengubah data Python (QuerySet, Model) jadi JSON, dan sebaliknya. |
| ✅ **Viewsets & Routers** | Otomatis generate endpoint (GET, POST, PUT, DELETE) dengan sedikit kode. |
| ✅ **Authentication & Permissions** | Mudah atur login, token, dan hak akses pengguna. |
| ✅ **Browsable API** | Ada UI web interaktif untuk tes API langsung di browser (enak banget buat debugging!). |
| ✅ **Support Format** | Bisa hasilkan response dalam format JSON, XML, dll. |
| ✅ **Pagination, Filtering, Search** | Fitur-fitur API lengkap built-in.

---

### Install dan aktivasi:
```bash
pip install djangorestframework
```
```python
# settings.py
INSTALLED_APPS = [
    ...
    'rest_framework',
]
```

Mulai buat views, serializers, dan routes.

---


### 🚀 Contoh Sederhana: API untuk Buku

```python
# models.py
class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
```

```python
# serializers.py
from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
```

```python
# views.py
from rest_framework import viewsets
from .models import Book
from .serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
```

```python
# urls.py
from rest_framework.routers import DefaultRouter
from .views import BookViewSet

router = DefaultRouter()
router.register(r'books', BookViewSet)

urlpatterns = router.urls
```

➡️ Setelah itu kamu bisa akses:
- `GET /books/` (list semua buku)
- `POST /books/` (tambah buku)
- `GET /books/1/` (detail buku)
- `PUT /books/1/`, `DELETE /books/1/` dll

---

### 🔐 Contoh Fitur Otentikasi:
DRF bisa digabung dengan:
- Token Auth (`rest_framework.authtoken`)
- JWT (pakai `SimpleJWT`)
- OAuth2 (pakai `django-oauth-toolkit`)
- Session Auth Django

---

## 🧾 **Perintah-perintah File Permission di Linux**

### 🔍 1. **Cek permission**
```bash
ls -l
```
Contoh output:
```
-rw-r--r-- 1 ubuntu ubuntu  1234 Apr 24 10:00 file.txt
```
Arti `-rw-r--r--`:
- `r` = read
- `w` = write
- `x` = execute
- urutannya: `owner | group | others`

---

### 🔐 2. **Ubah permission (chmod)**

```bash
chmod [opsi] [file]
```

Contoh:
```bash
chmod 600 file.pem     # Hanya owner bisa baca/tulis
chmod 755 script.sh    # Owner bisa semua, yang lain bisa baca & eksekusi
chmod +x program.sh    # Tambahkan izin eksekusi
```

Angka dalam `chmod`:
| Angka | Artinya          |
|-------|------------------|
| 7     | read + write + execute |
| 6     | read + write     |
| 5     | read + execute   |
| 4     | read             |
| 0     | tidak ada izin   |

---

### 👤 3. **Ubah pemilik file (chown)**
```bash
chown username:group file.txt
```
Contoh:
```bash
chown ubuntu:ubuntu file.txt
```

---

### 🔄 4. **Ubah group file (chgrp)**
```bash
chgrp groupname file.txt
```

---

### 🧰 Contoh Kasus Praktis
**Kamu punya file `rahasia.txt` yang cuma kamu sendiri yang boleh baca:**
```bash
chmod 600 rahasia.txt
```

**Kamu buat skrip `backup.sh` yang perlu bisa dijalankan:**
```bash
chmod +x backup.sh
```

---

## 🔐 **Saran Keamanan File & Data di Linux**

### ✅ 1. Gunakan Permission yang Sesuai
- Jangan kasih akses `777` sembarangan! Ini berarti semua orang bisa baca, tulis, dan eksekusi.
- Untuk file sensitif (seperti `.pem`, config DB), gunakan `600`.

### ✅ 2. Batasi Akses Root
- Jangan login langsung sebagai `root`
- Gunakan `sudo` hanya saat dibutuhkan

### ✅ 3. Gunakan `ufw` (firewall)
```bash
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 80
```

### ✅ 4. Audit file penting secara berkala
Gunakan `ls -l` atau `find` untuk cek permission yang aneh:
```bash
find / -type f -perm 777
```

### ✅ 5. Backup dan enkripsi file sensitif
Pakai `gpg` atau `openssl` untuk enkripsi file:
```bash
gpg -c rahasia.txt
```

---

## 🧰 Kumpulan Command Penting di Server

| Perintah | Keterangan |
|---------|------------|
| `ls` | Lihat isi direktori |
| `cd` | Pindah direktori |
| `cp file tujuan/` | Copy file |
| `mv file tujuan/` | Pindah/rename file |
| `rm file` | Hapus file |
| `chmod 600 file.pem` | Ubah permission aman file (khusus SSH) |
| `chown user:group file` | Ganti pemilik file |
| `cat file.txt` | Tampilkan isi file |
| `nano file` / `vim file` | Edit file |
| `systemctl status <service>` | Lihat status service (misal gunicorn) |
| `journalctl -u gunicorn` | Lihat log gunicorn |
| `df -h` | Lihat penggunaan disk |
| `htop` / `top` | Cek resource server |

---

✨ Kalau ada error atau service tidak jalan, baca log dan cek konfigurasi satu per satu. Kamu selalu bisa restart service atau cek port yang sedang digunakan dengan:
```bash
sudo lsof -i :8000
```