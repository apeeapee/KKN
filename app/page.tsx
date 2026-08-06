'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  HeartPulse, 
  Sprout, 
  FileText, 
  PieChart, 
  BookOpenCheck, 
  Newspaper, 
  Store, 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  Calendar,
  Sparkles,
  TrendingUp,
  Landmark,
  Scale
} from 'lucide-react';
import { useData } from '@/components/DataProvider';

export default function HomePage() {
  const { newsList, apbdesData } = useData();

  const services = [
    {
      title: "Skrining ISPA & RESPIRA",
      author: "Layanan Kesehatan Desa",
      desc: "Modul e-book edukasi kesehatan & form skrining risiko ISPA mandiri untuk keluarga.",
      icon: HeartPulse,
      href: "/kesehatan-respira",
      color: "from-rose-500 to-pink-600",
      badge: "Kesehatan"
    },
    {
      title: "Pertanian & Musim Tanam",
      author: "Potensi Agribisnis Desa",
      desc: "Pendataan komoditas unggulan (Padi, Jagung, Cabai, Sapi) & Kalender Musim Tanam.",
      icon: Sprout,
      href: "/pertanian-logistik",
      color: "from-emerald-500 to-teal-600",
      badge: "Agribisnis"
    },
    {
      title: "JDIH & Hukum Desa",
      author: "Regulasi & Dokumentasi Hukum",
      desc: "Pusat dokumentasi Peraturan Desa (Perdes, Perkades, RPJMDes, & Keputusan Kades).",
      icon: FileText,
      href: "/jdih-hukum",
      color: "from-blue-600 to-indigo-700",
      badge: "Regulasi"
    },
    {
      title: "Transparansi APBDes & PBB",
      author: "Transparansi Keuangan Desa",
      desc: "Visualisasi grafik realisasi anggaran desa & panduan praktis bayar pajak PBB-P2 online.",
      icon: PieChart,
      href: "/apbdes-pajak",
      color: "from-amber-500 to-orange-600",
      badge: "Keuangan"
    },
    {
      title: "Edukasi Budaya 5S",
      author: "Budaya Kerja & Lingkungan",
      desc: "Infografis & panduan budaya Ringkas, Rapi, Resik, Rawat, Rajin untuk kebersihan desa.",
      icon: BookOpenCheck,
      href: "/edukasi-5s",
      color: "from-purple-500 to-indigo-600",
      badge: "Budaya"
    },
    {
      title: "Logistik & Aset Pertanian",
      author: "Fasilitas & Aset Desa",
      desc: "Peta jalur distribusi hasil panen & pendataan gudang/lumbung aset pertanian desa.",
      icon: Truck,
      href: "/pertanian-logistik#logistik",
      color: "from-cyan-600 to-blue-700",
      badge: "Logistik"
    },
    {
      title: "Katalog & Profil UMKM",
      author: "Pemberdayaan Ekonomi Warga",
      desc: "Direktori promosi produk dan usaha unggulan warga Desa Banyuurip.",
      icon: Store,
      href: "/umkm",
      color: "from-emerald-600 to-green-700",
      badge: "Ekonomi"
    },
    {
      title: "Desa Anti Korupsi",
      author: "Pemerintah Desa Banyuurip",
      desc: "18 Indikator transparansi integritas KPK & Dokumentasi Resmi Desa Anti Korupsi.",
      icon: Scale,
      href: "/desa-anti-korupsi",
      color: "from-emerald-800 to-teal-950",
      badge: "Integritas"
    },
    {
      title: "Profil & Sejarah Desa",
      author: "Informasi Publik Desa",
      desc: "Dokumentasi asal-usul, nilai budaya, struktur pemerintahan & identitas Banyuurip.",
      icon: Building2,
      href: "/profil",
      color: "from-slate-700 to-slate-900",
      badge: "Profil"
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden gradient-hero text-white pt-20 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-15 mix-blend-overlay"></div>
        
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-800/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-emerald-500/40 text-emerald-200 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
              Portal Informasi & Pelayanan Digital Resmi Desa Banyuurip
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Selamat Datang di Portal Resmi <span className="text-emerald-300 underline underline-offset-8 decoration-emerald-400">Desa Banyuurip</span>
            </h1>

            <p className="text-base sm:text-lg text-emerald-100 max-w-2xl font-light leading-relaxed">
              Pusat digitalisasi profil desa, transparansi tata kelola pemerintahan, potensi pertanian agribisnis, direktori UMKM, serta pelayanan kesehatan masyarakat satu pintu.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/kesehatan-respira"
                className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold px-6 py-3.5 rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2 text-sm"
              >
                <HeartPulse className="w-5 h-5 text-emerald-700" />
                Cek Skrining ISPA
              </Link>
              <Link
                href="/desa-anti-korupsi"
                className="bg-emerald-800/80 hover:bg-emerald-700 text-white font-semibold px-6 py-3.5 rounded-2xl border border-emerald-500/40 backdrop-blur-md transition-all flex items-center gap-2 text-sm"
              >
                <Scale className="w-4 h-4 text-emerald-300" />
                Portal Anti Korupsi
              </Link>
            </div>

            {/* Sub Info */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-emerald-700/50 text-emerald-100 text-xs">
              <div>
                <span className="font-bold text-white block text-sm sm:text-base">Kec. Klego</span>
                <span>Kab. Boyolali</span>
              </div>
              <div>
                <span className="font-bold text-white block text-sm sm:text-base">3.840 Jiwa</span>
                <span>Penduduk Desa</span>
              </div>
              <div>
                <span className="font-bold text-white block text-sm sm:text-base">342.5 Ha</span>
                <span>Luas Wilayah</span>
              </div>
            </div>
          </div>

          {/* Hero Card Visual */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 text-white animate-float">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/30 text-emerald-300">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Layanan Digital Satu Pintu</h3>
                    <p className="text-xs text-emerald-200">Terintegrasi 11 Program KKN</p>
                  </div>
                </div>
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
              </div>

              <div className="space-y-3 text-xs text-emerald-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>E-Book & Form Tes Mandiri Risiko ISPA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Kalender Musim Tanam Padi, Jagung & Cabai</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Dokumentasi JDIH Perdes & APBDes 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Panduan Pembayaran Pajak PBB Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Direktori & Katalog UMKM Desa</span>
                </div>
              </div>

              <div className="pt-2">
                <Link 
                  href="/jdih-hukum"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-center block transition-all shadow-md text-xs"
                >
                  Lihat Dokumen Resmi Desa
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid (11 KKN Integrated Modules) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Inovasi Multidisiplin
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Portal Layanan Terpadu Desa Banyuurip
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Akses cepat ke seluruh fitur integratif digitalisasi profil, potensi agribisnis, JDIH hukum, APBDes, & anti korupsi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv) => {
              const Icon = srv.icon;
              return (
                <Link
                  key={srv.title}
                  href={srv.href}
                  className="group bg-slate-50 hover:bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${srv.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase bg-slate-200 group-hover:bg-emerald-100 text-slate-700 group-hover:text-emerald-800 px-2 py-0.5 rounded-full">
                        {srv.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-[11px] font-medium text-emerald-700 mt-0.5">
                        {srv.author}
                      </p>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        {srv.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                    <span>Akses Layanan</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Financial Transparency & 5S Culture Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-700">
              Transparansi Keuangan & Budaya Desa
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Transparansi APBDes 2026 & Penerapan Budaya 5S
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Pemerintah Desa Banyuurip berkomitmen menyajikan transparansi realisasi APBDes (Rp 1.84 Miliar) secara grafik visual serta membudayakan nilai 5S Jepang (Ringkas, Rapi, Resik, Rawat, Rajin) dalam aktivitas warga.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs pt-2">
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                <span className="text-slate-400 block">Total APBDes 2026</span>
                <span className="text-lg font-bold text-emerald-400">Rp 1,84 Miliar</span>
              </div>
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                <span className="text-slate-400 block">Bayar Pajak PBB</span>
                <span className="text-lg font-bold text-amber-400">Online / e-Samsat</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/apbdes-pajak"
                className="gradient-gold text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md hover:scale-105 transition-all flex items-center gap-2"
              >
                <PieChart className="w-4 h-4" />
                Visualisasi APBDes
              </Link>
              <Link
                href="/edukasi-5s"
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-5 py-3 rounded-xl border border-slate-700 transition-all flex items-center gap-2"
              >
                <BookOpenCheck className="w-4 h-4 text-purple-400" />
                Pelajari Budaya 5S
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-800/60 p-6 rounded-2xl border border-slate-700 space-y-4">
            <h4 className="font-bold text-sm text-amber-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Rincian Alokasi Belanja APBDes 2026
            </h4>

            <div className="space-y-3 text-xs">
              {apbdesData.belanja.map((b, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-300">{b.bidang}</span>
                    <span className="text-emerald-400 font-bold">{b.persen}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${b.persen}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Latest News Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Informasi Publik
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
              Berita & Pengumuman Desa Terkini
            </h2>
          </div>
          <Link
            href="/berita"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
          >
            Lihat Semua Berita
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsList.slice(0, 3).map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-900/90 text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.author}</span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href="/berita"
                  className="text-xs font-semibold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1"
                >
                  Baca Selengkapnya
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
