// One scene per app. Each `run` starts from `start` and returns to the home
// screen (music starts on the lock screen and ends by unlocking), so scenes
// chain freely in a tour and also stand alone as single-app clips.
//
// Coordinates in `{ at: [x, y] }` are phone points inside the 440×956 frame.

const FOLDER = { at: [132, 300] };
const FOLDER_BACKDROP = { at: [220, 800] };

async function openFromFolder(h, label) {
  await h.tap(FOLDER);
  await h.wait(900);
  await h.tap({ label });
}

async function closeFolder(h) {
  await h.tap(FOLDER_BACKDROP);
  await h.wait(800);
}

export const SCENES = {
  // ── featured in the main video ────────────────────────────────────────
  lock: {
    start: 'lock',
    label: 'Layar Kunci',
    title: 'Semuanya dimulai dari layar kunci',
    sub: 'Tekan putar dan playlist pernikahan mulai berbunyi. Ponsel terbuka sendiri.',
    async run(h) {
      await h.wait(2300);
      await h.tap({ label: 'Putar' });
      await h.wait(1500);
    },
  },
  home: {
    start: 'home',
    label: 'Layar Utama',
    title: 'Semua yang Anda butuhkan, sekilas pandang',
    sub: 'Widget jadwal, lokasi acara dan formulir RSVP.',
    async run(h) {
      await h.wait(2300);
    },
  },
  calendar: {
    start: 'home',
    label: 'Kalender',
    title: 'Rencana untuk hari itu',
    sub: 'Ketuk acara untuk melihat waktu dan tempatnya.',
    async run(h) {
      await h.wait(700);
      await h.tap({ text: 'Resepsi' });
      await h.wait(2300);
      await h.tap({ label: 'Kembali' });
      await h.wait(900);
    },
  },
  notes: {
    start: 'home',
    label: 'Catatan',
    title: 'Undangan, ditulis sebagai catatan',
    sub: 'Beberapa kata dari kami, plus waktu, tempat dan cara menuju ke sana.',
    async run(h) {
      await h.wait(600);
      await openFromFolder(h, 'Catatan');
      await h.wait(2800);
      await h.tap({ label: 'Kembali' });
      await h.wait(800);
      await closeFolder(h);
    },
  },
  photos: {
    start: 'home',
    label: 'Foto',
    title: 'Album pernikahan',
    sub: 'Ketuk foto untuk membukanya, geser untuk melihat foto berikutnya.',
    async run(h) {
      await h.wait(500);
      await h.tap({ label: 'Foto' });
      await h.wait(1200);
      await h.scroll(640, 1300);
      await h.wait(250);
      await h.tap({ at: [330, 420] });
      await h.wait(1150);
      await h.drag([330, 480], [90, 470], 260);
      await h.wait(1150);
      await h.tap({ label: 'Tutup' });
      await h.wait(800);
      await h.tap({ label: 'Tutup' });
      await h.wait(900);
    },
  },
  messages: {
    start: 'home',
    label: 'Pesan',
    title: 'Intip obrolan kedua mempelai',
    sub: 'Contoh percakapan. Ganti dengan cerita Anda sendiri.',
    async run(h) {
      await h.wait(500);
      await h.tap({ label: 'Pesan' });
      await h.wait(2800);
      await h.tap({ label: 'Tutup' });
      await h.wait(900);
    },
  },
  wallet: {
    start: 'home',
    label: 'Dompet',
    title: 'Hadiah, cukup satu pindai',
    sub: 'Kartu dompet untuk kode QR bank Anda.',
    async run(h) {
      await h.wait(600);
      await openFromFolder(h, 'Dompet');
      await h.wait(3400);
      await h.tap({ label: 'Tutup' });
      await h.wait(800);
      await closeFolder(h);
    },
  },

  // ── the rest of the phone ─────────────────────────────────────────────
  music: {
    start: 'lock',
    label: 'Musik',
    title: 'Playlist pernikahan',
    sub: 'Lagu bebas royalti, siap diputar. Lewati atau geser langsung dari layar kunci.',
    async run(h) {
      await h.wait(1200);
      await h.tap({ label: 'Berikutnya' });
      await h.settle(400); // let the new track's metadata (duration) load
      await h.wait(1500);
      await h.tap({ label: 'Berikutnya' });
      await h.settle(400);
      await h.wait(1500);
      await h.tap({ selector: 'div.cursor-pointer.h-2' }); // seek to the middle
      await h.wait(1500);
      await h.drag([220, 936], [220, 430], 380); // swipe up to unlock
      await h.wait(1300);
    },
  },
  phone: {
    start: 'home',
    label: 'Telepon',
    title: 'Riwayat panggilan ikut bercerita',
    sub: 'Setiap panggilan menyelesaikan satu hal: menu, busana, fotografer, mobil.',
    async run(h) {
      await h.wait(500);
      await h.tap({ label: 'Telepon' });
      await h.wait(3600);
      await h.tap({ label: 'Tutup' });
      await h.wait(900);
    },
  },
  youtube: {
    start: 'home',
    label: 'YouTube',
    title: 'Video musik pernikahan, langsung di dalam',
    sub: 'Lagu pernikahan pilihan, di halaman YouTube yang tampil rapi.',
    async run(h) {
      await h.wait(500);
      await openFromFolder(h, 'YouTube');
      await h.wait(250);
      await h.settle(3500); // the embed loads over the network in real time
      await h.wait(1900);
      await h.scroll(280, 1100, [220, 760]);
      await h.wait(1000);
      await h.tap({ label: 'Tutup' });
      await h.wait(800);
      await closeFolder(h);
    },
  },
  settings: {
    start: 'home',
    label: 'Pengaturan',
    title: 'Bahkan Pengaturan ikut dirapikan',
    sub: 'Akun mempelai, Wi-Fi bernama “lemdeptry”, dan tombol yang benar-benar berfungsi.',
    async run(h) {
      await h.wait(500);
      await openFromFolder(h, 'Pengaturan');
      await h.wait(1500);
      await h.tap({ selector: 'button[aria-pressed]', first: true });
      await h.wait(1000);
      await h.scroll(330, 1100);
      await h.wait(900);
      await h.tap({ label: 'Tutup' });
      await h.wait(800);
      await closeFolder(h);
    },
  },
  calculator: {
    start: 'home',
    label: 'Kalkulator',
    title: 'Ya, kalkulatornya benar-benar berfungsi',
    sub: '50 × 2 = 100. Untuk seratus tahun bahagia.',
    async run(h) {
      await h.wait(500);
      await openFromFolder(h, 'Kalkulator');
      await h.wait(1000);
      for (const key of ['5', '0', '×', '2', '=']) {
        await h.tap({ label: key }, { hold: 90 });
        await h.wait(260);
      }
      await h.wait(1500);
      await h.tap({ label: 'Tutup' });
      await h.wait(800);
      await closeFolder(h);
    },
  },
};

export const OUTRO = {
  n: 0,
  label: 'Sumber terbuka',
  title: 'Terima kasih sudah datang.',
  sub: 'Jadikan milik Anda: github.com/nguyenhuugiatri/iphone-wedding-invitation',
};

/** Numbered caption for a scene inside a multi-scene video. */
export const caption = (key, n) => {
  const { label, title, sub } = SCENES[key];
  return { n, label, title, sub };
};

// Pull the lock screen back down and sign off.
export async function outro(h) {
  h.mark('outro');
  await h.drag([220, 14], [220, 520], 420);
  await h.wait(200);
  await h.stage('caption', OUTRO);
  await h.wait(3200);
  await h.stage('fadeOut', 1000);
  await h.wait(1100);
}
