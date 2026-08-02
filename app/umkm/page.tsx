'use client';

import React, { useState } from 'react';
import { 
  Store, 
  Search, 
  MapPin, 
  Phone, 
  PlusCircle, 
  ShieldCheck, 
  Calculator,
  X
} from 'lucide-react';
import { useData } from '@/components/DataProvider';

export default function UMKMPage() {
  const { umkmList, addUMKM } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('Semua');
  const [showAddModal, setShowAddModal] = useState(false);

  // New UMKM Form State
  const [newForm, setNewForm] = useState({
    namaUsaha: '',
    pemilik: '',
    kategori: 'Kuliner',
    deskripsi: '',
    alamat: '',
    kontak: '',
    omzetBulanan: '',
    produkUtama: '',
  });

  const filteredUMKM = umkmList.filter((u) => {
    const matchesSearch = u.namaUsaha.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.pemilik.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.produkUtama.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedKategori === 'Semua' || u.kategori === selectedKategori;
    return matchesSearch && matchesCat;
  });

  const handleAddUMKM = (e: React.FormEvent) => {
    e.preventDefault();
    const omzet = parseFloat(newForm.omzetBulanan) || 3000000;
    addUMKM({
      namaUsaha: newForm.namaUsaha,
      pemilik: newForm.pemilik,
      kategori: newForm.kategori,
      deskripsi: newForm.deskripsi,
      alamat: newForm.alamat,
      kontak: newForm.kontak,
      omzetBulanan: omzet,
      produkUtama: newForm.produkUtama,
      imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=600&q=80",
    });

    setShowAddModal(false);
    setNewForm({
      namaUsaha: '',
      pemilik: '',
      kategori: 'Kuliner',
      deskripsi: '',
      alamat: '',
      kontak: '',
      omzetBulanan: '',
      produkUtama: '',
    });
    alert('Usaha UMKM Anda berhasil terdaftar dan langsung tampil di Katalog Desa Banyuurip!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-950 text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="bg-emerald-800/80 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/40">
            Pendataan Profil & Keuangan Sederhana UMKM • Sekar Ayu Tiara Murti (FEB / Akuntansi)
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight flex items-center gap-3">
            <Store className="w-10 h-10 text-emerald-300" />
            Katalog & Keuangan UMKM Desa
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 font-light leading-relaxed">
            Direktori promosi usaha warga Desa Banyuurip serta pencatatan keuangan sederhana untuk mendukung daya saing UMKM lokal.
          </p>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold px-5 py-2.5 rounded-xl shadow-md transition-all text-xs inline-flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-emerald-700" />
            Daftarkan Usaha UMKM Anda
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama usaha, pemilik, atau produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {['Semua', 'Kuliner', 'Pertanian', 'Kerajinan'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedKategori(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
                  selectedKategori === cat
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* UMKM List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredUMKM.map((u) => (
          <div 
            key={u.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img src={u.imageUrl} alt={u.namaUsaha} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-emerald-900/90 text-emerald-200 text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-md">
                  {u.kategori}
                </span>
                {u.isVerified && (
                  <span className="absolute top-3 right-3 bg-white/90 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified
                  </span>
                )}
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-base text-slate-900">{u.namaUsaha}</h3>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">Pemilik: {u.pemilik}</p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {u.deskripsi}
                </p>

                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Store className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Produk: <strong>{u.produkUtama}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{u.alamat}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{u.kontak}</span>
                  </div>
                </div>

                {/* Financial Highlights */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1 text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1 text-[11px]">
                    <Calculator className="w-3.5 h-3.5 text-emerald-600" /> Visualisasi Keuangan Sederhana:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div>
                      <span className="text-slate-400 block">Omzet Bulanan:</span>
                      <span className="font-bold text-emerald-700">Rp {u.omzetBulanan.toLocaleString('id-ID')}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Laba Bersih Est.:</span>
                      <span className="font-bold text-slate-900">Rp {(u.keuanganSimulasi?.labaBersih || u.omzetBulanan * 0.4).toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <a
                href={`https://wa.me/${u.kontak.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-center block transition-all shadow-xs text-xs"
              >
                Hubungi Pemilik Usaha
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Add UMKM Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b pb-3">
              <h3 className="font-bold text-lg text-slate-900">Pendaftaran Usaha UMKM Desa</h3>
              <p className="text-xs text-slate-500">Formulir pendaftaran profil UMKM ke database Desa Banyuurip.</p>
            </div>

            <form onSubmit={handleAddUMKM} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Usaha / Toko</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Keripik Singkong Barokah"
                  value={newForm.namaUsaha}
                  onChange={(e) => setNewForm({ ...newForm, namaUsaha: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Pemilik</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ibu Tri Astuti"
                    value={newForm.pemilik}
                    onChange={(e) => setNewForm({ ...newForm, pemilik: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={newForm.kategori}
                    onChange={(e) => setNewForm({ ...newForm, kategori: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option>Kuliner</option>
                    <option>Pertanian</option>
                    <option>Kerajinan</option>
                    <option>Jasa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Produk Unggulan Utama</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Keripik Singkong Mentega"
                  value={newForm.produkUtama}
                  onChange={(e) => setNewForm({ ...newForm, produkUtama: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Alamat Dusun/RT/RW</label>
                  <input
                    type="text"
                    required
                    placeholder="Dusun Krajan RT 01 / RW 02"
                    value={newForm.alamat}
                    onChange={(e) => setNewForm({ ...newForm, alamat: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">No. WhatsApp / Kontak</label>
                  <input
                    type="text"
                    required
                    placeholder="081234567890"
                    value={newForm.kontak}
                    onChange={(e) => setNewForm({ ...newForm, kontak: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Estimasi Omzet Bulanan (Rp)</label>
                <input
                  type="number"
                  placeholder="Contoh: 3500000"
                  value={newForm.omzetBulanan}
                  onChange={(e) => setNewForm({ ...newForm, omzetBulanan: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi Singkat Usaha</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Ceritakan singkat mengenai keunggulan produk usaha Anda..."
                  value={newForm.deskripsi}
                  onChange={(e) => setNewForm({ ...newForm, deskripsi: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl shadow-md transition-all"
              >
                Simpan & Daftarkan UMKM
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
