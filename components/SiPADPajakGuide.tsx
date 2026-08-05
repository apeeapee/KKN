'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  QrCode, 
  Search, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  Printer, 
  ExternalLink, 
  Phone, 
  Mail, 
  MapPin, 
  Info, 
  Building2, 
  Download,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export function SiPADPajakGuide() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'perorangan' | 'kolektif' | 'cetak'>('all');
  const [expandedService, setExpandedService] = useState<number | null>(3); // default QRIS expanded

  const toggleService = (id: number) => {
    setExpandedService(expandedService === id ? null : id);
  };

  const services = [
    {
      id: 1,
      category: 'perorangan',
      title: 'Layanan 1 — Cek NJOP PBB',
      link: 'https://sipad.id/publik/pbb_cek_njop',
      urlDisplay: 'sipad.id/publik/pbb_cek_njop',
      tag: 'Cek Nilai Tanah/Sawah',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: Search,
      summary: 'Gunakan layanan ini untuk mengetahui Nilai Jual Objek Pajak (NJOP) tanah atau sawah Anda sebelum melakukan pembayaran.',
      kapan: 'Saat ingin tahu apakah Nilai Objek Pajak (NJOP) sawah/rumah Anda sudah sesuai atau merasa perlu mengecek detailnya.',
      steps: [
        'Buka alamat resmi sipad.id/publik/pbb_cek_njop',
        'Pilih Tahun SPPT yang ingin dicek (tersedia dari tahun 2013 hingga 2026)',
        'Masukkan NOP (Nomor Objek Pajak) Anda — diawali kode 33-09 (Kode Kabupaten Boyolali)',
        'Klik tombol "Cari Data"',
        'Hasil pencarian menampilkan: Nama Subyek, Letak Objek Pajak, Total NJOP Bumi, NJOP Bumi per m², Total NJOP Bangunan, dan NJOP Bangunan per m².'
      ]
    },
    {
      id: 2,
      category: 'perorangan',
      title: 'Layanan 2 — Cek Tagihan PBB & Tunggakan',
      link: 'https://sipad.id/publik/pbb_cek_tagihan',
      urlDisplay: 'sipad.id/publik/pbb_cek_tagihan',
      tag: 'Cek Tagihan & Denda',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: FileText,
      summary: 'Cek nominal pasti tagihan PBB-P2 tahun berjalan serta mengecek apakah terdapat denda atau tunggakan pajak tahun-tahun sebelumnya.',
      kapan: 'Saat ingin tahu berapa total PBB yang harus dibayar dan apakah ada sisa tunggakan.',
      steps: [
        'Buka alamat resmi sipad.id/publik/pbb_cek_tagihan',
        'Masukkan NOP diawali kode 33-09 (Contoh: 33.09.XXX.XXX...)',
        'Klik tombol "Cari Data"',
        'Tabel hasil pencarian menampilkan: Tahun Pajak, Nama Wajib Pajak, Tanggal Jatuh Tempo, Jumlah Bulan Denda, Pokok PBB, Denda (2% per bulan), dan Jumlah yang Harus Dibayar.',
        'Hasil Tagihan dapat diunduh langsung dari halaman web sebagai rincian.'
      ],
      outcomes: [
        { status: 'Terdapat tunggakan', desc: 'Data NOP yang dimasukkan masih memiliki sisa tunggakan, mohon segera lakukan pembayaran.' },
        { status: 'Tidak terdapat tunggakan', desc: 'Terima kasih atas kepatuhan pajak Anda, data NOP sudah LUNAS dan tidak memiliki tunggakan.' },
        { status: 'Terjadi kesalahan', desc: 'Data NOP tidak ditemukan di sistem atau terdapat kesalahan pengetikan NOP.' }
      ]
    },
    {
      id: 3,
      category: 'perorangan',
      title: 'Layanan 3 — Bayar PBB Perorangan via QRIS (Paling Cepat!)',
      link: 'https://sipad.id/qrisgen/pbb',
      urlDisplay: 'sipad.id/qrisgen/pbb',
      tag: 'Bayar Langsung via HP',
      badgeColor: 'bg-amber-400 text-slate-950 font-extrabold border-amber-500',
      icon: QrCode,
      highlight: true,
      summary: 'Metode pembayaran PBB perorangan tercepat dan terpaling praktis untuk warga Desa Banyuurip — cukup scan kode QRIS menggunakan HP!',
      kapan: 'Cara paling direkomendasikan untuk warga yang ingin membayar PBB perorangan tanpa antri dan tanpa kode bayar khusus.',
      steps: [
        'Buka portal sipad.id/qrisgen/pbb dari browser smartphone atau komputer',
        'Masukkan NOP Anda (diawali 33-09) dan pilih Tahun Pajak (misal 2026)',
        'Klik tombol "Bayar QRIS"',
        'Kode QRIS resmi BKD Boyolali akan otomatis muncul di layar HP',
        'Buka aplikasi dompet digital favorit Anda (GoPay, OVO, DANA, ShopeePay) atau Mobile Banking (Bank Jateng, BRI, Mandiri, BCA, dll)',
        'Pilih menu "Scan QR" atau "Bayar" pada aplikasi dompet digital / m-banking',
        'Arahkan kamera HP ke Kode QRIS di layar',
        'Periksa kembali Nama Wajib Pajak dan Nominal Tagihan PBB yang tampil',
        'Masukkan PIN pembayaran aplikasi Anda untuk konfirmasi',
        'Selesai! Simpan tangkapan layar (screenshot) struk pembayaran sebagai bukti transaksi sah.'
      ],
      advantages: [
        'Tanpa perlu memiliki rekening bank khusus',
        'Tidak perlu antri di loket atau kasir',
        'Bisa bayar dari rumah menggunakan e-Wallet (GoPay, DANA, ShopeePay, OVO) atau Mobile Banking apapun'
      ]
    },
    {
      id: 4,
      category: 'kolektif',
      title: 'Layanan 4 — Bayar PBB Kolektif (Untuk Perangkat Desa / RT)',
      link: 'https://sipad.id/publik/pbb_bayar',
      urlDisplay: 'sipad.id/publik/pbb_bayar',
      tag: 'Khusus RT & Perangkat Desa',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      icon: Users,
      summary: 'Layanan khusus untuk Perangkat Desa Banyuurip atau Ketua RT yang membantu membayarkan PBB banyak warga sekaligus dalam satu transaksi.',
      kapan: 'Digunakan oleh Pengurus RT/Dusun saat menghimpun titipan PBB warga untuk disetorkan secara kolektif.',
      steps: [
        'Buka sipad.id/publik/pbb_bayar',
        'Isi data pemohon: Nama Lengkap (sesuai KTP), Email aktif, Nomor Telepon/HP, dan Tahun SPPT',
        'Pilih wilayah: Pilih Kecamatan Klego dan Desa Banyuurip',
        'Klik "Cari Data" — seluruh daftar NOP warga di Desa Banyuurip akan tampil',
        'Pilih NOP warga yang ingin dibayarkan (bisa dicentang sekaligus atau pilih satu per satu)',
        'Sistem SiPAD akan otomatis menghitung total PBB Terutang, Denda, dan Diskon',
        'Pilih Bank untuk pembayaran: Virtual Account Bank Jateng atau Virtual Account Bank BNI',
        'Centang syarat & ketentuan, lalu klik "Bentuk Kode Bayar"',
        'Pastikan alamat email dan nomor HP benar untuk menerima Kode Bayar Kolektif',
        'Lakukan transfer sesuai kode Virtual Account yang diterbitkan melalui ATM / m-Banking Bank Jateng atau BNI.'
      ]
    },
    {
      id: 5,
      category: 'cetak',
      title: 'Layanan 5 — Cetak Bukti Bayar Resmi (SSPD)',
      link: 'https://sipad.id/publik/pbb_cetak_sspd',
      urlDisplay: 'sipad.id/publik/pbb_cetak_sspd',
      tag: 'Cetak Bukti Lunas Resmi',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
      icon: Printer,
      summary: 'Unduh dan cetak Surat Setoran Pajak Daerah (SSPD) resmi yang sah secara hukum setelah pembayaran selesai dilakukan.',
      kapan: 'Saat memerlukan bukti pelunasan PBB tertulis resmi untuk keperluan administrasi, jual beli tanah, atau perbankan.',
      steps: [
        'Buka sipad.id/publik/pbb_cetak_sspd',
        'Pilih Tahun SPPT (tersedia dari tahun 2013 hingga 2026)',
        'Masukkan NOP diawali kode 33-09',
        'Klik tombol "Cari Data"',
        'Tampil rincian data: Nama Subyek, Pokok, Diskon, Sanksi, Jumlah Bayar, dan Tanggal Bayar',
        'Klik tombol "File SSPD" untuk mengunduh bukti bayar resmi dalam format PDF.'
      ],
      note: 'SSPD (Surat Setoran Pajak Daerah) ini adalah bukti pelunasan pajak resmi yang sah secara hukum. Harap disimpan dengan baik.'
    },
    {
      id: 6,
      category: 'cetak',
      title: 'Layanan 6 — Cetak Salinan SPPT PBB',
      link: 'https://sipad.id/salinansppt',
      urlDisplay: 'sipad.id/salinansppt',
      tag: 'Cetak Ulang SPPT Hilang',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: Download,
      summary: 'Cetak ulang berkas Surat Pemberitahuan Pajak Terhutang (SPPT) jika lembar fisik hilang, rusak, atau belum diterima.',
      kapan: 'Saat SPPT fisik tidak sampai ke rumah, hilang, atau ingin menyimpan arsip digital di HP/komputer.',
      steps: [
        'Buka sipad.id/salinansppt',
        'Masukkan 18 digit NOP tanah/sawah/rumah Anda',
        'Klik tombol "Download Salinan"',
        'Berkas SPPT format PDF akan otomatis terunduh ke HP/komputer Anda',
        'Dapat dicetak sendiri atau disimpan sebagai dokumen arsip digital.'
      ]
    },
    {
      id: 7,
      category: 'kolektif',
      title: 'Layanan 7 — Cetak Ulang Kode Bayar Kolektif',
      link: 'https://sipad.id/publik/pbb_cetak_kode_bayar',
      urlDisplay: 'sipad.id/publik/pbb_cetak_kode_bayar',
      tag: 'Arsip Kode Bayar Kolektif',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      icon: FileText,
      summary: 'Layanan untuk mencetak ulang Kode Bayar Kolektif yang sebelumnya telah dibuat oleh Perangkat Desa / Ketua RT.',
      kapan: 'Digunakan jika Perangkat Desa / RT lupa mencetak atau kehilangan resi Kode Bayar Kolektif.',
      steps: [
        'Buka sipad.id/publik/pbb_cetak_kode_bayar',
        'Masukkan Kode Bayar Kolektif yang telah dibuat sebelumnya',
        'Rincian kode bayar akan tampil di layar dan siap untuk dicetak atau disimpan.'
      ]
    }
  ];

  const filteredServices = services.filter((s) => {
    if (activeFilter === 'all') return true;
    return s.category === activeFilter;
  });

  return (
    <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 space-y-10">
      
      {/* Header Title Section */}
      <div className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-950/90 px-3 py-1 rounded-full border border-amber-700/60 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Panduan Pembayaran PBB-P2 Boyolali
          </span>
          <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            KKN Undip — Desa Banyuurip
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />
          Panduan Pembayaran PBB Melalui SiPAD Boyolali
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
          <strong>SiPAD (Sistem Informasi Pajak Daerah)</strong> adalah portal resmi dikelola oleh Badan Keuangan Daerah (BKD) Kabupaten Boyolali. Melalui SiPAD, warga Desa Banyuurip kini bisa mengurus cek tagihan, bayar PBB via QRIS, cetak SPPT, hingga cetak bukti bayar secara online tanpa harus datang ke kantor BKD.
        </p>

        <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-4 h-4 text-amber-400" />
            <span>Website Resmi Portal SiPAD Boyolali:</span>
            <a 
              href="https://sipad.id" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-300 font-extrabold underline hover:text-amber-200 inline-flex items-center gap-1"
            >
              sipad.id <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <span className="text-slate-400">Pajak Anda untuk Pembangunan Desa Banyuurip & Kabupaten Boyolali</span>
        </div>
      </div>

      {/* Perbedaan Penting (Warga Perorangan vs Perangkat Desa / RT) */}
      <div className="bg-gradient-to-r from-amber-950/90 via-slate-800 to-slate-900 p-6 rounded-2xl border border-amber-700/50 space-y-4">
        <h3 className="font-extrabold text-base text-amber-300 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-400" />
          HAL PENTING SEBELUM MULAI BAYAR PBB
        </h3>
        
        <p className="text-xs text-slate-200 leading-relaxed">
          Sistem SiPAD membedakan tata cara pembayaran berdasarkan status pembayar sebagai berikut:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-900/90 p-4 rounded-xl border border-emerald-500/40 space-y-2">
            <span className="text-emerald-400 font-extrabold uppercase text-[11px] tracking-wider block">
              1. Warga Perorangan (Bayar Mandiri)
            </span>
            <p className="text-slate-300 leading-relaxed">
              Cukup siapkan <strong className="text-white">NOP (Nomor Objek Pajak)</strong> & <strong className="text-white">Tahun Pajak</strong> saja, <strong className="text-amber-300">TANPA Perlu Kode Bayar</strong>. Langsung bisa bayar via QRIS di HP!
            </p>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-xl border border-purple-500/40 space-y-2">
            <span className="text-purple-300 font-extrabold uppercase text-[11px] tracking-wider block">
              2. Perangkat Desa / Ketua RT (Bayar Kolektif)
            </span>
            <p className="text-slate-300 leading-relaxed">
              Bayar untuk banyak warga sekaligus $\rightarrow$ Perlu membuat <strong className="text-white">Kode Bayar Kolektif</strong> terlebih dahulu melalui fitur Bayar Kolektif di website <strong className="text-purple-300">sipad.id</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Category Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            7 Layanan Terpadu SiPAD Boyolali
          </h3>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Semua Layanan (7)
            </button>
            <button
              onClick={() => setActiveFilter('perorangan')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === 'perorangan'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Bayar Perorangan & QRIS
            </button>
            <button
              onClick={() => setActiveFilter('kolektif')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === 'kolektif'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Kolektif RT / Perangkat Desa
            </button>
            <button
              onClick={() => setActiveFilter('cetak')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === 'cetak'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Cetak Dokumen & SSPD
            </button>
          </div>
        </div>

        {/* Services Accordion List */}
        <div className="space-y-4">
          {filteredServices.map((service) => {
            const IconComp = service.icon;
            const isOpen = expandedService === service.id;

            return (
              <div 
                key={service.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  service.highlight 
                    ? 'bg-gradient-to-r from-slate-800 via-slate-800 to-amber-950/40 border-amber-500/80 shadow-lg'
                    : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                }`}
              >
                {/* Accordion Header */}
                <div 
                  onClick={() => toggleService(service.id)}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className={`p-2.5 rounded-xl flex-shrink-0 ${
                      service.highlight ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-700 text-amber-400'
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${service.badgeColor}`}>
                          {service.tag}
                        </span>
                        {service.highlight && (
                          <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full shadow-sm">
                            ⭐ Paling Direkomendasikan
                          </span>
                        )}
                      </div>
                      <h4 className="font-extrabold text-base text-white">{service.title}</h4>
                      <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{service.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-2 rounded-xl transition-all inline-flex items-center gap-1.5 shadow-sm"
                    >
                      Buka Web <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button 
                      type="button" 
                      className="p-1.5 rounded-lg bg-slate-700/80 text-slate-300 hover:text-white"
                    >
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Accordion Body Details */}
                {isOpen && (
                  <div className="px-5 pb-6 border-t border-slate-700/80 pt-4 space-y-4 animate-fade-in text-xs">
                    
                    {/* Direct Link Banner */}
                    <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-700 flex items-center justify-between flex-wrap gap-2 text-slate-300">
                      <span>Link Akses Langsung Layanan:</span>
                      <a 
                        href={service.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-amber-400 font-extrabold hover:underline inline-flex items-center gap-1"
                      >
                        {service.urlDisplay} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {service.kapan && (
                      <div className="text-amber-200/90 font-medium">
                        <strong>Kapan Digunakan:</strong> {service.kapan}
                      </div>
                    )}

                    {/* Step by step list */}
                    <div className="space-y-2">
                      <h5 className="font-bold text-amber-400 uppercase text-[11px] tracking-wider">
                        Langkah-Langkah Penggunaan:
                      </h5>
                      <ol className="space-y-2 list-none counter-reset-step">
                        {service.steps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-200 leading-relaxed">
                            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center flex-shrink-0 border border-amber-500/40">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Service specific outcomes / status descriptions */}
                    {service.outcomes && (
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 space-y-2">
                        <h6 className="font-bold text-slate-300">Cara Membaca Hasil Pencarian Status:</h6>
                        <ul className="space-y-1 text-slate-300">
                          {service.outcomes.map((out, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="font-bold text-amber-400">• "{out.status}"</span>
                              <span>$\rightarrow$ {out.desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* QRIS Advantages */}
                    {service.advantages && (
                      <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-800/80 space-y-2 text-emerald-200">
                        <h6 className="font-bold text-emerald-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          Keunggulan Utama Bayar QRIS:
                        </h6>
                        <ul className="list-disc list-inside space-y-1 text-slate-300">
                          {service.advantages.map((adv, idx) => (
                            <li key={idx}>{adv}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* SSPD Note */}
                    {service.note && (
                      <div className="bg-amber-950/60 p-3 rounded-xl border border-amber-700 text-amber-200 font-semibold">
                        ⚠️ {service.note}
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Contact Info BKD Kabupaten Boyolali */}
      <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 space-y-4">
        <h3 className="font-extrabold text-base text-amber-400 flex items-center gap-2 border-b border-slate-700 pb-3">
          <Building2 className="w-5 h-5 text-amber-400" />
          Kontak Resmi BKD (Badan Keuangan Daerah) Kabupaten Boyolali
        </h3>
        
        <p className="text-xs text-slate-300">
          Jika Anda mengalami kendala teknis NOP tidak ditemukan, kendala pembayaran, atau memerlukan konfirmasi resmi PBB-P2:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700 space-y-1">
            <span className="text-slate-400 flex items-center gap-1.5 font-semibold">
              <MapPin className="w-4 h-4 text-amber-400" /> Alamat Kantor
            </span>
            <p className="text-slate-200 font-bold">
              Jl. Merdeka Timur, Kemiri, Boyolali, Jawa Tengah
            </p>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700 space-y-1">
            <span className="text-slate-400 flex items-center gap-1.5 font-semibold">
              <Mail className="w-4 h-4 text-amber-400" /> Email Layanan
            </span>
            <p className="text-slate-200 font-bold">
              pajakdaerah@boyolali.go.id
            </p>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700 space-y-1">
            <span className="text-slate-400 flex items-center gap-1.5 font-semibold">
              <Phone className="w-4 h-4 text-amber-400" /> Telepon & Fax
            </span>
            <p className="text-slate-200 font-bold">
              (0276) 321073 <span className="text-slate-400 font-normal">/ Fax: (0276) 322602</span>
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}

// Simple Globe Icon helper
function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}
