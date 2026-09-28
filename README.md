# 🐾 Web Interaktif Lucu Tema Snoopy (Edisi HTS) 💖

Web ini dirancang khusus buat kamu yang lagi HTS / deket sama seseorang!
Penuh dengan kejutan, interaksi manis, dan kado lucu.

---

## 🛠️ Cara Edit Teks dan Foto Sesuai Keinginanmu

Semua yang ada di web ini bisa kamu ubah sendiri loh! Ini caranya:

### 1. Mengubah Teks & Kalimat:
Buka file `index.html` dan `script.js` pakai Notepad atau aplikasi text editor favoritmu (contoh: VS Code).
- **Teks Halaman Depan:** Buka `index.html`, cari baris yang ada tulisan *"Halo Seseorang yang Spesial!"*. Ganti jadi namanya!
- **Isi Kupon:** Di `index.html` cari kata *"Kupon Traktir Boba"*. Kamu bisa ganti sesuai janji yang kamu mau!
- **Isi Surat Amplop:** Di bagian paling bawah `index.html`, cari *"Hai kamu!"* dan ganti curhatan / pesan spesialmu di situ.
- **Teks Ketik Otomatis:** Buka `script.js`, di bagian atas cari tulisan `const textStr = "Aku bikin sesuatu..."`. Ubah teksnya di situ.
- **Respon Slider Seneng Meter:** Buka `script.js`, cari kata *"Wah, lumayan ya"*. Kamu bisa ubah respon lucunya di situ.

### 2. Mengubah Foto (Galeri Polaroid):
Kamu pengen masukin foto berdua? Bisa!
1. Buka folder `assets/`.
2. Masukkan foto kalian berdua ke folder itu (misal: `fotokita1.jpg`).
3. Buka `index.html`, cari baris `<img src="assets/snoopy_hero.png" alt="Polaroid 1">`.
4. Ubah `assets/snoopy_hero.png` menjadi `assets/fotokita1.jpg`.

### 3. Mengubah Lagu Latar (Music Player):
Saat ini musik pakai link bawaan instrumen lo-fi. Mau ganti lagu spesial kalian?
1. Cari link lagu berformat `.mp3` di internet.
2. Buka `index.html`.
3. Cari `<audio id="bgAudio" loop src="LINK_DISINI"></audio>`.
4. Ganti bagian tulisan di dalam `src="..."` menjadi link mp3 lagu kesukaan kalian.

---

## 🚀 Cara Online-kan Web Ini (Deploy ke Netlify) - GRATIS!

Biar link webnya bisa kamu kasih ke dia dan dibuka lewat HP-nya, kamu perlu jadikan web ini *Online*. Caranya super gampang, gak perlu ngoding lagi:

1. Buka browser dan pergi ke website: **[https://app.netlify.com/drop](https://app.netlify.com/drop)**
2. Kalau diminta login/daftar, daftar aja pakai akun Google kamu secara gratis.
3. Buka File Explorer di laptop/komputer kamu. Cari folder utama `WEBLUCU` yang berisi semua file ini (`index.html`, `style.css`, dll).
4. Klik tahan folder `WEBLUCU` tersebut, lalu **Drag & Drop** (tarik dan lepaskan) ke dalam kotak lingkaran putus-putus di halaman Netlify Drop tadi.
5. Tunggu beberapa detik... *Tada!* 🎉 Netlify akan ngasih kamu sebuah link URL panjang berwarna hijau (misal: `https://cheerful-turing-123abc.netlify.app`).
6. Web kamu udah online! Link itu bisa kamu copy dan chat kirim langsung ke si doi!

*Note: Kamu juga bisa mengganti nama URL-nya di pengaturan Netlify (Site Settings -> Change site name) biar lebih estetik, misal: `https://untuk-kamu-spesial.netlify.app`.*

Selamat mencoba dan semoga misinya berhasil ya! 🐾🥰
