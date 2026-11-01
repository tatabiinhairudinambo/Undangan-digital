# CLAUDE.md

## Gaya desain

- Seluruh UI dan animasi harus sesuai iOS / Apple HIG.
  - Spacing, corner radius, tipografi, hierarki: mengikuti iOS lock-screen / Music / Control Center.
  - Latar glass/blur (vibrancy, highlight dalam yang halus, shadow lembut).
  - Animasi: easing khas iOS (`cubic-bezier(0.4, 0, 0.2, 1)` atau spring ringan), durasi pendek (150-250ms untuk micro-interaction), hindari bounce berlebihan.
  - Pergantian ikon = crossfade + scale ringan (0.7 → 1.0), tanpa potongan keras.
  - Umpan balik ketukan: scale 0.95-0.98, bukan ripple gaya Material.
- Bila belum jelas, acu perilaku aplikasi asli iOS (Music, Mail, Photos, Control Center), bukan konvensi web.
