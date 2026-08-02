'use client';

import React, { useState } from 'react';
import { 
  Newspaper, 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  Filter,
  X
} from 'lucide-react';
import { useData } from '@/components/DataProvider';
import { NewsItem } from '@/lib/mock-data';

export default function BeritaPage() {
  const { newsList } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [activeNewsModal, setActiveNewsModal] = useState<NewsItem | null>(null);

  const filteredNews = newsList.filter((n) => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          n.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Semua' || n.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="bg-emerald-800/80 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/40">
            Copywriting & Media Informasi Publik • Nabila Putri Wibowo (FISIP / Ilmu Komunikasi)
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight flex items-center gap-3">
            <Newspaper className="w-10 h-10 text-emerald-300" />
            Portal Berita & Informasi Desa
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 font-light leading-relaxed">
            Menyajikan berita resmi, pengumuman pemerintah desa, potensi unggulan, dan kegiatan kemasyarakatan Desa Banyuurip dengan gaya bahasa informatif & mudah dipahami.
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari berita atau pengumuman desa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Kategori:
            </span>
            {['Semua', 'Pemerintahan', 'Pertanian', 'Masyarakat', 'Kesehatan'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
                  selectedCategory === cat
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

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredNews.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-emerald-900/90 text-emerald-200 text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-md">
                  {item.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    {item.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    {item.author}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setActiveNewsModal(item)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
              >
                Baca Artikel Lengkap
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* News Article Modal */}
      {activeNewsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            
            <button
              onClick={() => setActiveNewsModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 inline-block">
              {activeNewsModal.category}
            </span>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {activeNewsModal.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-slate-500 border-y border-slate-100 py-3">
              <span>Tanggal: {activeNewsModal.date}</span>
              <span>•</span>
              <span>Penulis: {activeNewsModal.author}</span>
            </div>

            <div className="relative h-64 w-full rounded-2xl overflow-hidden">
              <img src={activeNewsModal.imageUrl} alt={activeNewsModal.title} className="w-full h-full object-cover" />
            </div>

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
              <p className="font-semibold text-slate-900 text-sm">{activeNewsModal.summary}</p>
              <p>{activeNewsModal.content}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveNewsModal(null)}
                className="bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-slate-800"
              >
                Tutup Artikel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
