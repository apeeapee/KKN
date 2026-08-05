'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Calendar, 
  Filter,
  ExternalLink
} from 'lucide-react';
import { useData } from '@/components/DataProvider';

export default function JDIHHukumPage() {
  const { legalDocs } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('Semua');

  const filteredDocs = legalDocs.filter((doc) => {
    const matchesSearch = doc.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.nomor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedKategori === 'Semua' || doc.kategori === selectedKategori;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="bg-blue-800/80 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/40">
            Jaringan Dokumentasi & Informasi Hukum (JDIH) Desa Banyuurip
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight flex items-center gap-3">
            <FileText className="w-10 h-10 text-blue-300" />
            Pusat Informasi Hukum Desa
          </h1>
          <p className="text-sm sm:text-base text-blue-100 font-light leading-relaxed">
            Pengarsipan dan inventarisasi produk hukum resmi Desa Banyuurip: Perdes, Perkades, Keputusan Kepala Desa, RPJMDes, RKPDes, dan Laporan APBDes.
          </p>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari judul dokumen atau nomor perdes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Category Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {['Semua', 'Perdes', 'Perkades', 'Keputusan Kades', 'APBDes'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedKategori(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
                  selectedKategori === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Document List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>Menampilkan {filteredDocs.length} Dokumen Hukum Terverifikasi</span>
          <span>Status: Berlaku Resmi</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredDocs.map((doc) => (
            <div 
              key={doc.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-grow">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-md border border-blue-200">
                    {doc.kategori}
                  </span>
                  <span className="font-bold text-slate-900">{doc.nomor}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    {doc.tglTerbit}
                  </span>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[10px]">
                    ✓ {doc.status}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 leading-snug">
                  {doc.judul}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {doc.deskripsi}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={doc.fileUrl && doc.fileUrl !== '#' ? doc.fileUrl : `https://drive.google.com/search?q=${encodeURIComponent(doc.nomor)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 group"
                >
                  <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Buka & Baca Dokumen (Google Drive)
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
