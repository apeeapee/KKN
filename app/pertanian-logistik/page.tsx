'use client';

import React, { useState } from 'react';
import { 
  Sprout, 
  Calendar, 
  Truck, 
  Warehouse, 
  MapPin, 
  TrendingUp,
  Building2,
  CheckCircle2,
  FileText,
  Clock,
  Send,
  MessageCircle,
  Package,
  ShieldCheck,
  AlertCircle,
  ChevronRight,
  Info,
  Wrench,
  Sparkles,
  Users,
  Search,
  X
} from 'lucide-react';
import { useData } from '@/components/DataProvider';

export default function PertanianLogistikPage() {
  const { agriData } = useData();
  const [activeTab, setActiveTab] = useState<'peminjaman' | 'sop' | 'pertanian'>('peminjaman');
  const [selectedKategori, setSelectedKategori] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssetForModal, setSelectedAssetForModal] = useState<any | null>(null);

  // Form Peminjaman State
  const [formPeminjaman, setFormPeminjaman] = useState({
    namaWarga: '',
    alamatDusun: '',
    kontakHP: '',
    tglPinjam: '',
    durasiHari: 1,
    keperluan: ''
  });

  const filteredAssets = agriData.logistikAset.filter((aset) => {
    const matchSearch = aset.namaAset.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        aset.kategori.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedKategori === 'Semua' || aset.kategori === selectedKategori;
    return matchSearch && matchCat;
  });

  const handleSendWhatsAppPeminjaman = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssetForModal) return;

    const message = `Halo Bapak Kaur Umum Desa Banyuurip,
Saya ingin mengajukan *Peminjaman Aset Balai Desa*:

• *Nama Pemohon*: ${formPeminjaman.namaWarga}
• *Alamat*: ${formPeminjaman.alamatDusun}
• *No. WhatsApp*: ${formPeminjaman.kontakHP}
• *Barang / Aset*: ${selectedAssetForModal.namaAset}
• *Tanggal Pinjam*: ${formPeminjaman.tglPinjam} (${formPeminjaman.durasiHari} Hari)
• *Tujuan Keperluan*: ${formPeminjaman.keperluan}

Mohon petunjuk dan verifikasi ketersediaan barang di Balai Desa. Terima kasih!`;

    const waUrl = `https://wa.me/6281327349963?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setSelectedAssetForModal(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans">
      
      {/* HEADER BANNER */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="bg-emerald-800/80 text-emerald-200 text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-500/40 inline-flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-emerald-300" />
            Layanan Publik Desa Banyuurip • Inventaris Balai Desa
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight flex items-center gap-3">
            <Building2 className="w-10 h-10 text-emerald-400 shrink-0" />
            Peminjaman Aset Balai Desa & Potensi Tani
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 font-light leading-relaxed">
            Fasilitas layanan peminjaman inventaris Balai Desa Banyuurip (Tenda, Sound System, Hand Tractor, Pompa Air, Genset, Molen Cor) secara transparan disertai SOP peminjaman barang dan data potensi agribisnis.
          </p>
        </div>
      </div>

      {/* NAVIGATION TABS BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('peminjaman')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'peminjaman' 
                ? 'bg-emerald-800 text-white shadow-md' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Package className="w-4 h-4" />
            Peminjaman Aset Balai Desa
          </button>

          <button
            onClick={() => setActiveTab('sop')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'sop' 
                ? 'bg-emerald-800 text-white shadow-md' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            SOP Peminjaman Barang
          </button>

          <button
            onClick={() => setActiveTab('pertanian')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'pertanian' 
                ? 'bg-emerald-800 text-white shadow-md' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Sprout className="w-4 h-4" />
            Komoditas & Musim Tanam
          </button>
        </div>

        <div className="text-xs text-slate-500 font-semibold bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Layanan Gratis / Bebas Pungli • Balai Desa Banyuurip</span>
        </div>
      </div>

      {/* TAB 1: KATALOG PEMINJAMAN ASET BALAI DESA */}
      {activeTab === 'peminjaman' && (
        <section className="space-y-8">
          
          {/* Section Info Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Katalog Inventaris Desa
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                Daftar Barang & Aset Balai Desa Banyuurip
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Pilih barang inventaris desa yang tersedia untuk acara hajatan, kerja bakti, atau pengairan pertanian.
              </p>
            </div>

            {/* Filter Category Buttons */}
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              {['Semua', 'Peralatan Acara & Hajatan', 'Alat Pertanian Komunal', 'Mesin & Konstruksi'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedKategori(cat)}
                  className={`px-3.5 py-2 rounded-xl border transition-all ${
                    selectedKategori === cat 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs' 
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Asset Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((aset) => (
              <div 
                key={aset.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  {/* Top Badge & Status */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200">
                      {aset.kategori}
                    </span>
                    <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                      aset.status === 'Tersedia' 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                        : 'bg-amber-50 text-amber-800 border-amber-300'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${aset.status === 'Tersedia' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                      {aset.status}
                    </span>
                  </div>

                  {/* Asset Title */}
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {aset.namaAset}
                  </h3>

                  {/* Details Specs */}
                  <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-start gap-2">
                      <Package className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Kapasitas / Jumlah Unit:</span>
                        <strong className="text-slate-900">{aset.kapasitas}</strong>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-1 border-t border-slate-200/60">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Lokasi Penyimpanan:</span>
                        <span>{aset.lokasi}</span>
                      </div>
                    </div>

                    {aset.syarat && (
                      <div className="flex items-start gap-2 pt-1 border-t border-slate-200/60">
                        <FileText className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Syarat Peminjaman:</span>
                          <span className="text-slate-700 font-semibold">{aset.syarat}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    {aset.penanggungJawab || 'Pengelola Balai Desa'}
                  </span>

                  <button
                    disabled={aset.status !== 'Tersedia'}
                    onClick={() => setSelectedAssetForModal(aset)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center gap-2 ${
                      aset.status === 'Tersedia'
                        ? 'bg-emerald-800 hover:bg-emerald-900 text-white'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    {aset.status === 'Tersedia' ? 'Ajukan Pinjam' : 'Sedang Dipinjam'}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </section>
      )}

      {/* TAB 2: VISUAL SOP PEMINJAMAN BARANG BALAI DESA */}
      {activeTab === 'sop' && (
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200 inline-block">
              STANDAR OPERASIONAL PROSEDUR (SOP)
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              SOP Peminjaman Barang & Aset Balai Desa
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Panduan resmi tata cara peminjaman inventaris barang Balai Desa Banyuurip agar aman, tertib, dan terpelihara dengan baik bagi seluruh warga desa.
            </p>
          </div>

          {/* 4 STEPS SOP CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4 relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white font-black text-lg flex items-center justify-center shadow-md">
                1
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Cek Ketersediaan Aset</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Masyarakat memeriksa ketersediaan barang/aset (Tenda, Sound System, Hand Tractor, Pompa Air, Genset, Molen Cor, Kursi) pada portal desa atau bertanya langsung di Balai Desa.
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Katalog Update Real-Time</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4 relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white font-black text-lg flex items-center justify-center shadow-md">
                2
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Pengajuan Permohonan</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mengisi formulir permohonan peminjaman di Balai Desa / pesan WhatsApp resmi Kaur Umum (Pak Bambang) maksimal **H-3 sebelum acara** dengan melampirkan fotokopi KTP Warga.
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Pengajuan Minimal H-3</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4 relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white font-black text-lg flex items-center justify-center shadow-md">
                3
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Verifikasi & Serah Terima</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Perangkat Desa (Kaur Umum) melakukan verifikasi jadwal, pengecekan kelayakan fisik barang bersama pemohon, dan penandatanganan Berita Acara Serah Terima (BAST).
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Penandatanganan BAST</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4 relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white font-black text-lg flex items-center justify-center shadow-md">
                4
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Pengembalian & Cek Fisik</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Peminjam mengembalikan aset barang tepat waktu sesuai jadwal dalam keadaan bersih, aman, dan utuh. Pengecekan ulang fisik barang dilakukan oleh Perangkat Desa.
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Cek Fisik Pengembalian</span>
              </div>
            </div>

          </div>

          {/* SOP Rules Box */}
          <div className="bg-emerald-950 text-white p-6 sm:p-8 rounded-3xl space-y-3 border border-emerald-800">
            <h4 className="font-bold text-base text-emerald-300 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-emerald-400" />
              Ketentuan Penting Peminjaman Barang Balai Desa:
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-emerald-100">
              <li className="flex items-start gap-2 bg-emerald-900/60 p-3 rounded-xl border border-emerald-800">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Prioritas peminjaman diberikan untuk kegiatan warga Desa Banyuurip (hajatan, duka cita, kerja bakti dusun, & pengairan tani).</span>
              </li>
              <li className="flex items-start gap-2 bg-emerald-900/60 p-3 rounded-xl border border-emerald-800">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Peminjam bertanggung jawab penuh terhadap kebersihan, keamanan, dan keutuhan unit barang selama masa peminjaman.</span>
              </li>
            </ul>
          </div>

        </section>
      )}

      {/* TAB 3: DATA POTENSI PERTANIAN DESA BANYUURIP */}
      {activeTab === 'pertanian' && (
        <section className="space-y-10">
          
          {/* A. GAMBARAN UMUM */}
          <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-800 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-800/80 px-3 py-1 rounded-full border border-emerald-500/40 inline-flex items-center gap-1.5">
              <Sprout className="w-3.5 h-3.5 text-emerald-400" />
              A. Gambaran Umum Sektor Pertanian
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Data Potensi Pertanian Desa Banyuurip
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-4xl">
              Desa Banyuurip adalah salah satu desa di mana sektor pertanian menjadi sumber penghasilan utama bagi warganya. Komoditas utama yang diproduksi di desa adalah <strong className="text-emerald-300">padi</strong> dan <strong className="text-amber-300">jagung</strong>, dengan sistem penanamannya disesuaikan berdasarkan kondisi tanah dan musim.
            </p>
          </div>

          {/* B. LUAS WILAYAH PERTANIAN */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  B. Luas Wilayah Pertanian
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2 flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-emerald-600" />
                  Sebaran & Penggunaan Lahan Pertanian (Total 450,01 Ha)
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                Sumber : BPP Kecamatan Klego
              </span>
            </div>

            {/* Total Land Stat Callout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 text-center space-y-1">
                <span className="text-xs text-emerald-800 font-medium block">Total Luas Wilayah Pertanian</span>
                <span className="text-3xl font-black text-emerald-700 block">450,01 Ha</span>
                <span className="text-[11px] text-emerald-800">Kecamatan Klego, Boyolali</span>
              </div>
              <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200 text-center space-y-1">
                <span className="text-xs text-blue-800 font-medium block">Sawah Irigasi Setengah Teknis</span>
                <span className="text-3xl font-black text-blue-700 block">309,01 Ha</span>
                <span className="text-[11px] text-blue-800">Lahan Basah Utama</span>
              </div>
              <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 text-center space-y-1">
                <span className="text-xs text-amber-800 font-medium block">Lahan Tegal & Pekarangan</span>
                <span className="text-3xl font-black text-amber-700 block">238,22 Ha</span>
                <span className="text-[11px] text-amber-800">Tegal (76 Ha) & Pekarangan (162,22 Ha)</span>
              </div>
            </div>

            {/* Land Breakdown Table Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {[
                { jenis: 'Lahan sawah', luas: '141,00 Ha', desc: 'Sawah Pokok Desa', color: 'bg-emerald-500' },
                { jenis: 'Sawah irigasi setengah teknis', luas: '309,01 Ha', desc: 'Pengairan Irigasi Teknisi', color: 'bg-blue-500' },
                { jenis: 'Sawah tadah hujan', luas: '65,00 Ha', desc: 'Pengairan Musim Hujan', color: 'bg-cyan-500' },
                { jenis: 'Tegal / Kebun', luas: '76,00 Ha', desc: 'Komoditas Palawija & Jagung', color: 'bg-amber-500' },
                { jenis: 'Pekarangan', luas: '162,22 Ha', desc: 'Tanaman Rumah Tangga', color: 'bg-purple-500' },
                { jenis: 'Lain-lain', luas: '113,38 Ha', desc: 'Fasilitas & Jalan Usaha Tani', color: 'bg-slate-400' }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{item.jenis}</span>
                    <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-lg font-black text-slate-900">{item.luas}</span>
                    <span className="text-[11px] text-slate-500">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* C. KOMODITAS UNGGULAN & POLA TANAM */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Produktivitas Komoditas */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  C. Komoditas Unggulan
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2">
                  Produktivitas Hasil Panen Desa
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-200 space-y-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase block tracking-wider">🌾 Padi</span>
                  <div className="text-2xl font-black text-emerald-700">6,2 ton/ha</div>
                  <p className="text-xs text-slate-600">Produktivitas Rata-rata per Hektar Panen Raya</p>
                </div>

                <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200 space-y-2">
                  <span className="text-xs font-bold text-amber-800 uppercase block tracking-wider">🌽 Jagung Hibrida</span>
                  <div className="text-2xl font-black text-amber-700">4,5 ton/ha</div>
                  <p className="text-xs text-slate-600">Produktivitas Rata-rata per Hektar Musim Kemarau</p>
                </div>
              </div>
            </div>

            {/* Pola Tanam Workflow */}
            <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                  Sistem Pola Tanam
                </span>
                <h3 className="text-xl font-extrabold text-white mt-2">
                  Pola Tanam Berkelanjutan Diterapkan
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 space-y-3">
                  <span className="text-amber-400 font-bold block">Siklus Penanaman 1 Tahun:</span>
                  
                  <div className="flex items-center justify-between gap-2 bg-slate-900 p-3 rounded-xl border border-slate-700 text-center font-bold">
                    <div className="flex-1 bg-emerald-900/80 p-2 rounded-lg text-emerald-300">
                      MT 1: Padi
                    </div>
                    <span className="text-slate-400">➔</span>
                    <div className="flex-1 bg-emerald-900/80 p-2 rounded-lg text-emerald-300">
                      MT 2: Padi
                    </div>
                    <span className="text-slate-400">➔</span>
                    <div className="flex-1 bg-amber-900/80 p-2 rounded-lg text-amber-300">
                      MT 3: Jagung / Kacang
                    </div>
                  </div>

                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Sistem rotasi penanaman <strong className="text-white">Padi ➔ Padi ➔ Jagung / Kacang Tanah</strong> disesuaikan dengan kondisi ketersediaan air irigasi setengah teknis dan musim hujan/kemarau Desa Banyuurip.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* D. KELOMPOK TANI & GAPOKTAN SUBUR MAKMUR */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  D. Kelompok Tani Desa
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  Kelembagaan Gapoktan & 9 Kelompok Tani (Poktan)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Di Desa Banyuurip terdapat <strong className="text-slate-900">9 kelompok tani (Poktan)</strong> aktif yang mendukung kegiatan pertanian masyarakat di bawah bimbingan Gapoktan.
                </p>
              </div>

              {/* Gapoktan Badge */}
              <div className="bg-emerald-900 text-white p-4 rounded-2xl border border-emerald-700 text-xs space-y-1">
                <span className="text-emerald-300 font-extrabold block uppercase tracking-wider text-[10px]">
                  Gabungan Kelompok Tani (Gapoktan)
                </span>
                <div className="text-base font-black text-white">SUBUR MAKMUR</div>
                <div className="text-emerald-200 text-[11px]">Ketua: <strong>Bapak Darji</strong></div>
              </div>
            </div>

            {/* 9 Poktan Table / Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {[
                { nama: 'Poktan Sidomukti I', ketua: 'Sukardi', alamat: 'Tlogosari RT22 RW06', anggota: 85 },
                { nama: 'Poktan Sidomukti II', ketua: 'Purwanto', alamat: 'Banyuurip RT16 RW05', anggota: 43 },
                { nama: 'Poktan Sidomuncul I', ketua: 'Muadif', alamat: 'Ngijo RT04 RW01', anggota: 50 },
                { nama: 'Poktan Sidomuncul II', ketua: 'Shodiq', alamat: 'Ngijo RT03 RW01', anggota: 60 },
                { nama: 'Poktan Harapan I', ketua: 'Basuki', alamat: 'Banyuurip RT14 RW01', anggota: 47 },
                { nama: 'Poktan Harapan II', ketua: 'Muh Thoha', alamat: 'Palemrejo RT09 RW02', anggota: 60 },
                { nama: 'Poktan Ngudi Rejeki I', ketua: 'Supadi', alamat: 'Ngeliyangan RT24 RW07', anggota: 26 },
                { nama: 'Poktan Ngudi Rejeki II', ketua: 'Juwadi', alamat: 'Jlegong RT11 RW03', anggota: 82 },
                { nama: 'Poktan Ngudi Rejeki III', ketua: 'Jumanto', alamat: 'Ngeliyangan RT27 RW07', anggota: 54 }
              ].map((poktan, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all"
                >
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <h4 className="font-extrabold text-slate-900 text-sm">{poktan.nama}</h4>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                      {poktan.anggota} Anggota
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-600 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Ketua Poktan:</span>
                      <strong className="text-slate-800">{poktan.ketua}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Wilayah / Alamat:</span>
                      <span className="font-medium text-slate-700">{poktan.alamat}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Total keseluruhan anggota petani terdaftar di Gapoktan Subur Makmur: <strong>507 Petani Aktif</strong>.
              </span>
              <span className="text-emerald-700 font-bold">Data Resmi BPP Kec. Klego</span>
            </div>

          </div>



        </section>
      )}

      {/* MODAL PENGAJUAN PEMINJAMAN ASET BALAI DESA */}
      {selectedAssetForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  Formulir Permohonan
                </span>
                <h3 className="font-extrabold text-slate-900 text-lg mt-1 flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-700" />
                  Pengajuan Pinjam Aset Balai Desa
                </h3>
              </div>
              <button 
                onClick={() => setSelectedAssetForModal(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Selected Item Brief */}
            <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 space-y-1 text-xs">
              <span className="text-emerald-800 font-bold block text-[11px]">Barang Inventaris yang Dipilih:</span>
              <h4 className="font-extrabold text-slate-900 text-sm">{selectedAssetForModal.namaAset}</h4>
              <p className="text-slate-600">• Kapasitas/Jumlah: <strong>{selectedAssetForModal.kapasitas}</strong></p>
              <p className="text-slate-600">• Lokasi: <span>{selectedAssetForModal.lokasi}</span></p>
            </div>

            <form onSubmit={handleSendWhatsAppPeminjaman} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Lengkap Pemohon</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bapak Sriyanto"
                    value={formPeminjaman.namaWarga}
                    onChange={(e) => setFormPeminjaman({ ...formPeminjaman, namaWarga: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Alamat Dusun / RT / RW</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Krajan RT 02 / RW 01"
                    value={formPeminjaman.alamatDusun}
                    onChange={(e) => setFormPeminjaman({ ...formPeminjaman, alamatDusun: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">No. WhatsApp / Kontak</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 0812-3456-7890"
                    value={formPeminjaman.kontakHP}
                    onChange={(e) => setFormPeminjaman({ ...formPeminjaman, kontakHP: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rencana Tanggal Pinjam</label>
                  <input
                    type="date"
                    required
                    value={formPeminjaman.tglPinjam}
                    onChange={(e) => setFormPeminjaman({ ...formPeminjaman, tglPinjam: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tujuan & Keperluan Peminjaman</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Contoh: Untuk keperluan acara hajatan pernikahan warga di Dusun Krajan..."
                  value={formPeminjaman.keperluan}
                  onChange={(e) => setFormPeminjaman({ ...formPeminjaman, keperluan: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button 
                  type="button" 
                  onClick={() => setSelectedAssetForModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold flex items-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  Kirim via WhatsApp (Kaur Umum)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
