---
title: "Docker-Based Development Workflow with GitHub Actions"
description: Docker adalah alat yang memungkinkan kamu untuk membuat, menjalankan, dan membagi aplikasi dalam lingkungan terisolasi yang disebut container, tanpa khawatir tentang perbedaan konfigurasi di komputer berbeda.
date: June 1, 2025
author: Ardi Syah
tags: [Tutorial, Guide]
banner: https://images.unsplash.com/photo-1697058149199-bc6d94639a82?q=80&w=966&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

<script setup>
import ReadingTime from '../../.vitepress/theme/components/ReadingTime.vue';
import SocialShare from '../../.vitepress/theme/components/SocialShare.vue';
</script>

<ReadingTime />
<SocialShare/>
---

# Local Development with Docker, MySQL, and GitHub Automation

## 🐳 Apa Itu Docker?

**Docker** adalah platform **open-source** yang digunakan untuk mengembangkan, menjalankan, dan mendistribusikan aplikasi dalam bentuk **container**. Singkatnya, Docker adalah alat yang memungkinkan kamu untuk membuat, menjalankan, dan membagi aplikasi dalam lingkungan terisolasi yang disebut container, tanpa khawatir tentang perbedaan konfigurasi di komputer berbeda.

**Container** adalah unit ringan dan mandiri yang berisi segala sesuatu yang dibutuhkan agar aplikasi bisa berjalan:
* Kode aplikasi
* Library (pustaka)
* Runtime
* Pengaturan (dependencies)

Container pada docker mirip dengan mesin virtual (VM), tapi jauh lebih ringan karena tidak memerlukan sistem operasi lengkap.

### 🐳 Komponen Utama Docker

| Komponen | Penjelasan |
|---------|------------|
| **Dockerfile** | File teks yang berisi instruksi untuk membuat image. |
| **Image** | Template read-only yang digunakan untuk membuat container. |
| **Container** | Instansi dari image yang sedang berjalan. |
| **Docker Hub** | Repositori online tempat menyimpan dan berbagi image. |
| **docker-compose.yml** | File konfigurasi untuk menjalankan beberapa container sekaligus. |

### 🧩 Perintah Dasar Docker

Berikut adalah **daftar perintah Docker penting** yang sering digunakan dalam pengembangan dan manajemen aplikasi berbasis container. Perintah-perintah ini bisa kamu jalankan di terminal (Command Prompt, PowerShell, atau Terminal Unix/Linux/macOS).

**Menjalankan Container**

```bash
docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]
```

Contoh:
```bash
# Menjalankan container dari image ubuntu
docker run ubuntu

# Jalankan container dan masuk ke shell-nya
docker run -it ubuntu bash

# Jalankan container dengan port mapping
docker run -d -p 80:80 nginx
```

> - `-d` → menjalankan container di background (detached mode)  
> - `-p` → mapping port host ke container  
> - `-it` → interactive + TTY (untuk akses shell)

#### 🧩 Perintah-perintah lainnya

```bash
# 📦 Melihat container yang sedang berjalan
docker ps

# Melihat semua container (termasuk yang berhenti)
docker ps -a

# ⏸️ Berhenti, mulai, dan restart container
docker stop <container_id_or_name>
docker start <container_id_or_name>
docker restart <container_id_or_name>

# 🔥 Menghapus container
docker rm <container_id_or_name>                   # Hapus satu container
docker rm container1 container2                    # Hapus beberapa container sekaligus
docker container prune                              # Hapus semua container yang berhenti

# 🖼️ Mengelola image
docker images                                       # Lihat semua image lokal
docker rmi <image_name_or_id>                      # Hapus image
docker pull nginx                                  # Pull image dari Docker Hub

# 🔨 Build image dari Dockerfile
docker build -t nama_image:tag .                   # Build image dengan tag
# Contoh:
docker build -t my-app:v1 .

# 🧪 Melihat log container
docker logs <container_id_or_name>                # Lihat log biasa
docker logs -f <container_id_or_name>             # Lihat log realtime (follow)

# 💬 Eksekusi perintah di dalam container
docker exec -it <container_id_or_name> <command>  # Eksekusi perintah
# Contoh:
docker exec -it my_container bash
docker exec -it my_container ls /app

# 🌐 Docker Network
docker network ls                                  # Lihat semua network
docker network inspect <network_name>              # Lihat detail sebuah network
docker network create <network_name>               # Buat network baru (default: bridge)
docker network create --driver overlay my_overlay  # Buat network dengan driver overlay
docker network connect <network> <container>       # Sambungkan container ke network
docker network disconnect <network> <container>    # Putuskan container dari network
docker network rm <network_name>                   # Hapus network tertentu
docker network prune                               # Hapus semua network yang tidak digunakan

# 🧩 Docker Compose (untuk aplikasi multi-container)
docker-compose up                                 # Jalankan aplikasi
docker-compose up --build                         # Jalankan + build ulang image
docker-compose down                               # Hentikan dan hapus container
docker-compose down -v                            # Termasuk volume

# 🧹 Pembersihan sistem
docker container prune                            # Hapus container yang berhenti
docker image prune -a                             # Hapus image yang tidak terpakai
docker network prune                              # Hapus network yang tidak dipakai
docker system prune                               # Bersihkan semua resource tak terpakai
docker system prune -a --volumes                  # Termasuk volume dan semua image
```

## Automation Flow

Berikut adalah langkah-langkah otomatisasi workflow pengembangan aplikasi dengan Docker, dari setup hingga distribusi image ke Docker Hub.

| Langkah | Deskripsi                                             |
| ------- | ----------------------------------------------------- |
| 1       | Clone repo                                            |
| 2       | Buat folder & jalankan MySQL dengan DB `contact_form` |
| 3       | Import `contact_form.sql` ke mysql1                   |
| 4       | Jalankan phpMyAdmin                                   |
| 5       | Build image `sempaner-web`                            |
| 6       | Jalankan `sempaner-container`                         |
| 7       | Buat network & hubungkan semua container              |
| 8       | Push image ke Docker Hub                              |


docker-compose adalah tool untuk mendefinisikan dan menjalankan multi-container Docker application menggunakan file YAML. Ini sangat berguna untuk mengatur database, frontend, backend dalam satu konfigurasi.

### 🧩 1. `.env` File – *Konfigurasi Terpisah*
Memisahkan nilai variabel seperti password, nama database, atau port agar **mudah diubah**, tanpa menyentuh file `docker-compose.yml`.

📄 Contoh `.env`

Buat file `.env` di direktori yang sama dengan `docker-compose1.yml`:

```env
MYSQL_ROOT_PASSWORD=1234
MYSQL_DATABASE=contact_form
PMA_PORT=8082
WEB_PORT=8088
```

::: warning ⚠️ *Jangan upload file .env ke public repo!*
Gunakan `.gitignore` dan simpan kredensial sensitif via GitHub Secrets atau `.env.local`.
:::

🔁 Lalu ubah `docker-compose1.yml` menjadi:

```yaml
services:
  mysql1:
    image: mysql:latest
    container_name: mysql1
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_ROOT_HOST: "%"
      MYSQL_DATABASE: ${MYSQL_DATABASE}
    volumes:
      - ./data-mysql:/var/lib/mysql
      - ./SEMPANER-WEB/uploads/contact_form.sql:/docker-entrypoint-initdb.d/contact_form.sql
    networks:
      - network1

  phpmyadmin:
    image: phpmyadmin
    container_name: pma-container
    ports:
      - "${PMA_PORT}:80"
    environment:
      PMA_HOST: mysql1
    depends_on:
      - mysql1
    networks:
      - network1

  sempaner-web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: sempaner-container
    ports:
      - "${WEB_PORT}:80"
    depends_on:
      - mysql1
    networks:
      - network1
```

---

### 🚀 2. Automation Build + Push ke Docker Hub

Agar kamu **tidak perlu build & push manual** tiap kali ada perubahan pada project lokal.

🔧 Opsi 1: Gunakan Skrip Shell/Powershell

**build-and-push.ps1**

```powershell
docker build -t allbibek/sempaner-web:latest -f Dockerfile .
docker login
docker push allbibek/sempaner-web:latest
```

Jalankan:

```powershell
.\build-and-push.ps1
```

🔧 Opsi 2: Gunakan GitHub Actions

Jika kamu ingin *CI/CD otomatis* dari GitHub (misalnya saat push ke branch `main`), bisa pakai GitHub Actions:

**`.github/workflows/docker-publish.yml`**

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2

    - name: Login to DockerHub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Build and push
      uses: docker/build-push-action@v3
      with:
        context: .
        push: true
        tags: allbibek/sempaner-web:latest
```
::: warning Catatan
* Kamu harus menyimpan `DOCKER_USERNAME` dan `DOCKER_PASSWORD` di **GitHub Secrets**.
* **Buildx** adalah builder baru dari Docker yang mendukung build multi-platform dan cache, berguna saat kamu ingin build image untuk ARM64 dan AMD64, atau mempercepat proses CI/CD.
:::

### 🔐 3. Docker Compose versi **Production** (dengan Volume & Persistensi Lebih Baik)
Menghindari data hilang saat container dihapus dan memisahkan data runtime.

🛠 Perubahan:

```yaml
services:
  mysql1:
    ...
    volumes:
      - mysql_data:/var/lib/mysql
      - ./SEMPANER-WEB/uploads/contact_form.sql:/docker-entrypoint-initdb.d/contact_form.sql
    ...

volumes:
  mysql_data:
```

::: tip 
Kamu tidak perlu membuat folder `data-mysql` secara manual, Docker akan kelola `volume` tersebut secara internal dan aman untuk production.
:::
---

🧾 Kesimpulan

| Fitur                | Fungsi               | Direkomendasikan untuk                    |
| -------------------- | -------------------- | ----------------------------------------- |
| `.env`               | Konfigurasi terpisah | Semua environment                         |
| `build-and-push.ps1` | Build + push manual  | Local development                         |
| GitHub Actions       | CI/CD otomatis       | Deployment ke Docker Hub                  |
| Named Volume         | Persistensi data     | Production (lebih bersih dari bind mount) |

::: tip
- 🔍 **Bind Mount**: Menghubungkan folder lokal ke container (berguna saat development).
- 🔐 **Named Volume**: Disimpan oleh Docker di lokasi default, cocok untuk production karena lebih stabil dan terisolasi.
:::

## Production-ready Setup

✅ Struktur Direktori

```
EVALUASI/
├── .env
├── docker-compose.production.yml
├── Dockerfile
├── SEMPANER-WEB/
│   ├── index.php
│   └── uploads/
│       └── contact_form.sql
├── build-and-push.ps1
└── .github/
    └── workflows/
        └── docker-publish.yml
```

---

1️⃣ **`.env` File**

**`EVALUASI/.env`**

```env
MYSQL_ROOT_PASSWORD=1234
MYSQL_DATABASE=contact_form
PMA_PORT=8082
WEB_PORT=8088
```

---

2️⃣ **`docker-compose.production.yml`**

```yaml
version: '3.9'

services:
  mysql1:
    image: mysql:latest
    container_name: mysql1
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_ROOT_HOST: "%"
      MYSQL_DATABASE: ${MYSQL_DATABASE}
    volumes:
      - mysql_data:/var/lib/mysql
      - ./SEMPANER-WEB/uploads/contact_form.sql:/docker-entrypoint-initdb.d/contact_form.sql
    networks:
      - network1

  phpmyadmin:
    image: phpmyadmin
    container_name: pma-container
    restart: unless-stopped
    ports:
      - "${PMA_PORT}:80"
    environment:
      PMA_HOST: mysql1
    depends_on:
      - mysql1
    networks:
      - network1

  sempaner-web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: sempaner-container
    restart: unless-stopped
    ports:
      - "${WEB_PORT}:80"
    depends_on:
      - mysql1
    networks:
      - network1

networks:
  network1:
    driver: bridge

volumes:
  mysql_data:
```
::: warning Catatan
 Mulai Docker Compose v1.27+ (dan terutama v2+), Compose secara otomatis menggunakan versi schema terbaru.*
:::

---

3️⃣ **Dockerfile**

**`EVALUASI/Dockerfile`**

```Dockerfile
FROM php:8.2-apache

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y nano && \
    docker-php-ext-install mysqli

COPY SEMPANER-WEB/ /var/www/html/
```

---

4️⃣ **Build dan Push Manual ke Docker Hub**

**`EVALUASI/build-and-push.ps1`**

```powershell
docker build -t allbibek/sempaner-web:latest -f Dockerfile .
docker login
docker push allbibek/sempaner-web:latest
```

> Jalankan dengan:

```powershell
.\build-and-push.ps1
```

---

5️⃣ **CI/CD Otomatis ke Docker Hub (GitHub Actions)**

**`EVALUASI/.github/workflows/docker-publish.yml`**

```yaml
name: Build and Push to Docker Hub

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2

      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and Push Docker Image
        uses: docker/build-push-action@v3
        with:
          context: .
          push: true
          tags: allbibek/sempaner-web:latest
```
::: tip 🎯 **Tambahkan secrets di GitHub repo kamu:**

* `DOCKER_USERNAME` = username Docker Hub kamu
* `DOCKER_PASSWORD` = password Docker Hub kamu
:::
---

### 🔧 Menjalankan `docker-compose.production.yml`

```bash
# Run Docker Compose
docker compose -f docker-compose.production.yml --env-file .env up -d --build

# Cek status container
docker ps

# Hentikan container jika perlu
docker compose -f docker-compose.production.yml down
```

## Catatan Penting!

Supaya semua perubahan yang kamu buat **(termasuk `apt install nano`, konfigurasi, file PHP, dll)** bisa dibagikan atau dipush ulang ke Docker Hub, kamu **perlu membuat ulang (rebuild) imagenya**, lalu push lagi. Berikut langkah-langkah:

---

### ✅ 1. **Commit Container ke Image Baru (jika edit dilakukan di container langsung)**

Jika kamu **mengedit langsung di container** (bukan rebuild Dockerfile), lakukan ini:

```bash
docker commit sempaner-container allbibek/sempaner-web:latest
```

::: tip Ini akan menyimpan kondisi container saat ini ke image baru.
* **Membuat image baru** berdasarkan container `sempaner-container`.
* Semua **perubahan terakhir dalam container** (misalnya: edit file, install nano, perubahan konfigurasi) akan **tersimpan** dalam image tersebut.
* Kamu bisa melihat hasilnya dengan `docker images`.
:::
---

### ✅ 2. **Push ke Docker Hub**

```bash
docker login
docker push allbibek/sempaner-web:latest
```
`docker login` Memastikan kamu login ke Docker Hub agar bisa `push`.

Perintah `docker push allbibek/sempaner-web:latest` akan **Mengupload image hasil `commit` tadi** ke Docker Hub. 
Jika sebelumnya sudah ada image dengan tag `latest`, maka **akan tertimpa** (mirip seperti `git push origin main` menimpa commit lama).

---

### 📝 Kesimpulan

* `docker commit` = seperti `git commit`, menyimpan kondisi terbaru container ke image.
* `docker push` = seperti `git push`, mengirim image itu ke Docker Hub.
* Perubahan container (file, konfigurasi, instalasi) akan diterapkan dan tersedia di Docker Hub **jika sudah di-commit dan di-push**.

## 🧠 Penutup
### 🧾 Ringkasan Singkat

- Gunakan `.env` → agar konfigurasi mudah dikelola
- Gunakan `volume` → untuk simpan data yang tahan hapus
- Build image lokal → `docker build`
- Push otomatis → GitHub Actions + Docker Hub

Dengan struktur ini:

| Komponen                     | Fungsi                                                         | Manfaat                              |
| ---------------------------- | -------------------------------------------------------------- | ------------------------------------ |
| `.env`                       | Konfigurasi terpisah                                           | Mudah ubah tanpa edit YML            |
| `volume`                     | Persistensi data MySQL                                         | Tidak hilang meski container dihapus |
| `docker-entrypoint-initdb.d` | Auto-import `contact_form.sql` saat container pertama kali run | Praktis                              |
| `build-and-push.ps1`         | Build manual                                                   | Untuk development/testing lokal      |
| GitHub Actions               | Build + push otomatis saat push ke `main`                      | CI/CD Docker                         |

🚀 Ingin mencoba? Clone repo [Sempaner-Web](https://github.com/diarboy/SEMPANER-WEB.git) dan jalankan `docker-compose up` sekarang!

## 📚 Referensi Tambahan

- [Docker Documentation](https://docs.docker.com/)
- [Play with Docker](https://labs.play-with-docker.com/)
- [Docker Hub](https://hub.docker.com/)
