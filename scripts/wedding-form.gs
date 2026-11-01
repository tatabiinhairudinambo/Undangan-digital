/**
 * Google Apps Script — membuat Google Form RSVP untuk Resepsi Pernikahan Raka & Sinta.
 *
 * Cara pakai:
 *   1. https://script.google.com → New project → tempel file ini ke Code.gs
 *   2. Jalankan createWeddingForm() — setujui izin Forms/Drive
 *   3. Lihat Execution log untuk mendapatkan link formulir
 *   4. (Opsional) Ubah daftar GUESTS lalu jalankan generatePrefillUrls()
 */

const VENUE = 'Gedung Serbaguna Melati, Jl. Jend. Sudirman No. 123, Jakarta Selatan';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Gedung+Serbaguna+Melati+Jakarta+Selatan';
const DATE_LABEL = 'Minggu, 14/06/2026';
const CEREMONY_TIME = '17.30';
const BUS_DEPART = '14.30';
Calendar;
const CONTACT = 'Raka - 0812 0000 0000';

function createWeddingForm() {
  const form = FormApp.create('Resepsi Pernikahan — Raka & Sinta')
    .setDescription(
      '📅 ' +
        DATE_LABEL +
        ' — 🕐 ' +
        CEREMONY_TIME +
        '\n' +
        '📍 ' +
        VENUE +
        '\n' +
        '🗺️ ' +
        MAPS_URL +
        '\n' +
        '☎️ Kontak: ' +
        CONTACT +
        '\n\n' +
        'Kami dengan hormat mengundang Bapak/Ibu/Saudara untuk hadir dan berbagi kebahagiaan. Mohon luangkan sedikit waktu untuk mengonfirmasi kehadiran ❤️',
    )
    .setAllowResponseEdits(true)
    .setCollectEmail(false)
    .setConfirmationMessage(
      'Data Anda sudah kami terima, terima kasih banyak. Jika perlu mengubah, buka kembali link formulirnya untuk mengedit. Untuk pertanyaan lain, silakan hubungi ' +
        CONTACT +
        '.',
    );

  // ----- Bagian 1: Data tamu -----
  const nameItem = form.addTextItem().setTitle('Nama lengkap').setRequired(true);

  // ----- Bagian 2: Konfirmasi kehadiran -----
  form.addPageBreakItem().setTitle('Konfirmasi kehadiran');
  const attendItem = form
    .addMultipleChoiceItem()
    .setTitle('Apakah Bapak/Ibu/Saudara dapat hadir?')
    .setRequired(true);

  // ----- Bagian 3: Informasi kehadiran -----
  const sectionFeast = form.addPageBreakItem().setTitle('Informasi kehadiran');
  form
    .addTextItem()
    .setTitle('Jumlah tamu yang hadir (termasuk anak-anak)')
    .setRequired(true)
    .setValidation(intAtLeast(1));
  const busOptItem = form
    .addMultipleChoiceItem()
    .setTitle('Apakah Anda ingin ikut shuttle bus?')
    .setHelpText(
      'Bus berangkat pukul ' +
        BUS_DEPART +
        ', tersedia 2 titik penjemputan.',
    )
    .setRequired(true);

  // ----- Bagian 4: Shuttle bus -----
  const sectionBus = form.addPageBreakItem().setTitle('Shuttle bus');
  form
    .addMultipleChoiceItem()
    .setTitle('Titik penjemputan (bus akan mengantar kembali ke titik yang sama)')
    .setChoiceValues(['Titik 1', 'Titik 2'])
    .setRequired(true);
  form
    .addMultipleChoiceItem()
    .setTitle('Berangkat (pukul ' + BUS_DEPART + ')')
    .setChoiceValues(['Ikut berangkat', 'Tidak ikut berangkat'])
    .setRequired(true);
  form
    .addTextItem()
    .setTitle('Jumlah orang yang berangkat')
    .setHelpText('Kosongkan jika tidak ikut')
    .setValidation(intAtLeast(0));
  form
    .addMultipleChoiceItem()
    .setTitle('Pulang (setelah acara)')
    .setChoiceValues(['Ikut pulang', 'Tidak ikut pulang'])
    .setRequired(true);
  form
    .addTextItem()
    .setTitle('Jumlah orang yang pulang')
    .setHelpText('Kosongkan jika tidak ikut')
    .setValidation(intAtLeast(0));
  form
    .addParagraphTextItem()
    .setTitle('Daftar penumpang bus (nama + tahun lahir)')
    .setHelpText(
      'Pihak bus memerlukan daftar penumpang untuk keperluan administrasi, mohon dibantu mengisinya.\n' +
        'Satu orang per baris, format: Nama - Tahun lahir\n' +
        'Contoh: Budi Santoso - 1990',
    )
    .setRequired(true);

  // ----- Bagian 5: Catatan lain (hanya untuk tamu yang hadir) -----
  const sectionOtherNotes = form.addPageBreakItem().setTitle('Catatan lain');
  form
    .addParagraphTextItem()
    .setTitle('Catatan lain')
    .setHelpText('Apa pun yang ingin Anda sampaikan');

  // ----- Bagian 6: Ucapan -----
  const sectionWishes = form.addPageBreakItem().setTitle('Ucapan');
  form.addParagraphTextItem().setTitle('Ucapan untuk kedua mempelai ❤️');

  // ----- Percabangan: diatur setelah semua bagian dibuat -----
  attendItem.setChoices([
    attendItem.createChoice('Ya, saya akan hadir', sectionFeast),
    attendItem.createChoice('Maaf, tidak bisa hadir', sectionWishes),
  ]);
  busOptItem.setChoices([
    busOptItem.createChoice('Ya, saya ikut bus', sectionBus),
    busOptItem.createChoice('Tidak, saya datang sendiri', sectionOtherNotes),
  ]);

  const meta = {
    formId: form.getId(),
    publishedUrl: form.getPublishedUrl(),
    editUrl: form.getEditUrl(),
    nameId: nameItem.getId(),
  };
  PropertiesService.getScriptProperties().setProperty(
    'WEDDING_FORM_META',
    JSON.stringify(meta),
  );

  Logger.log('✅ Formulir selesai dibuat');
  Logger.log('📝 Edit:   ' + meta.editUrl);
  Logger.log('🔗 Publik: ' + meta.publishedUrl);
  return meta;
}

function intAtLeast(min) {
  return FormApp.createTextValidation()
    .requireNumberGreaterThanOrEqualTo(min)
    .setHelpText('Silakan masukkan bilangan bulat ≥ ' + min)
    .build();
}

/**
 * Membuat URL pre-fill untuk setiap tamu. Ubah GUESTS di bawah lalu jalankan.
 */
function generatePrefillUrls() {
  const GUESTS = ['Budi Santoso', 'Siti Aminah'];

  const metaRaw =
    PropertiesService.getScriptProperties().getProperty('WEDDING_FORM_META');
  if (!metaRaw)
    throw new Error('Formulir belum dibuat — jalankan createWeddingForm() dulu.');
  const meta = JSON.parse(metaRaw);
  const form = FormApp.openById(meta.formId);
  const nameItem = form.getItemById(meta.nameId).asTextItem();

  const rows = [['Nama', 'URL']];
  GUESTS.forEach(function (name) {
    const url = form
      .createResponse()
      .withItemResponse(nameItem.createResponse(name))
      .toPrefilledUrl();
    rows.push([name, url]);
  });
  Logger.log('Tempel TSV di bawah ini ke Google Sheets:');
  Logger.log(
    rows
      .map(function (r) {
        return r.join('\t');
      })
      .join('\n'),
  );
}
