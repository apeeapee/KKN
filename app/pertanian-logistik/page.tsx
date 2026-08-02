'use client';

import React from 'react';
import { 
  Sprout, 
  Calendar, 
  Truck, 
  Warehouse, 
  MapPin, 
  TrendingUp
} from 'lucide-react';
import { useData } from '@/components/DataProvider';

export default function PertanianLogistikPage() {
  const { agriData } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden gradient-hero text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="bg-emerald-800/80 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/40">
            Pendataan Agribisnis & Logistik • Dienka Hanun T. & Salwa Khalishah S.
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight flex items-center gap-3">
            <Sprout className="w-10 h-10 text-emerald-300" />
            Potensi Pertanian & Logistik Desa
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 font-light leading-relaxed">
            Database komoditas unggulan pertanian & peternakan, kalender musim tanam, peta jalur distribusi hasil panen, serta aset penyimpanan desa Banyuurip.
          </p>
        </div>
      </div>

      {/* Komoditas & Kalender Tanam */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Komoditas Unggulan
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
              Pendataan Komoditas & Kalender Musim Tanam
            </h2>
          </div>
          <div className="text-xs text-slate-500 font-medium bg-slate-100 px-3.5 py-1.5 rounded-full">
            Lokasi: Lahan Pertanian Dusun Krajan, Wonosari & Banyuurip
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agriData.komoditas.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                    {item.kategori}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{item.kelompokTani}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">{item.nama}</h3>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-slate-500 block text-[11px]">Luas / Populasi</span>
                    <span className="font-bold text-slate-900">
                      {item.luasLahan ? `${item.luasLahan} Hektar` : `${item.jumlahTernak} Ekor`}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-slate-500 block text-[11px]">Estimasi Hasil Panen</span>
                    <span className="font-bold text-emerald-700">{item.estimasiHasil}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex items-start gap-2 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                    <Calendar className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-emerald-900 block">Jadwal Musim Tanam (MT):</span>
                      <span className="text-slate-600">{item.musimTanam}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-amber-50/60 p-3 rounded-xl border border-amber-100">
                    <TrendingUp className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-amber-900 block">Estimasi Panen Raya:</span>
                      <span className="text-slate-600">{item.musimPanen}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {item.lokasi}
                </span>
                <span className="font-semibold text-emerald-700">Terdaftar Resmi</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Logistik & Peta Jalur Distribusi (Salwa Khalishah Salsabila) */}
      <section id="logistik" className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
        <div className="space-y-2 border-b border-slate-800 pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
            Administrasi Logistik & Aset Pertanian • Salwa Khalishah (SV / Logistik)
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Peta Jalur Distribusi Panen & Database Aset Desa
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Pemetaan rantai pasok dan lokasi fasilitas penyimpanan komoditas pertanian Desa Banyuurip.
          </p>
        </div>

        {/* Assets Grid */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Warehouse className="w-4 h-4" />
            Fasilitas & Aset Gudang Logistik Desa:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agriData.logistikAset.map((aset) => (
              <div key={aset.id} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-3">
                <span className="text-[10px] font-bold uppercase bg-cyan-950 text-cyan-300 px-2.5 py-1 rounded-md border border-cyan-800 inline-block">
                  {aset.kategori}
                </span>
                <h4 className="font-bold text-sm text-white">{aset.namaAset}</h4>
                <div className="text-xs text-slate-400 space-y-1">
                  <p>• Kapasitas: <span className="text-emerald-400 font-semibold">{aset.kapasitas}</span></p>
                  <p>• Lokasi: <span>{aset.lokasi}</span></p>
                  <p>• Status: <span className="text-cyan-300 font-semibold">{aset.status}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distribution Routes */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Rute Distribusi Hasil Panen Keluar Desa:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agriData.jalurDistribusi.map((rute, idx) => (
              <div key={idx} className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold">
                  <Truck className="w-4 h-4 shrink-0" />
                  <span>{rute.rute}</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <p><strong className="text-slate-400">Tujuan:</strong> {rute.tujuan}</p>
                  <p><strong className="text-slate-400">Komoditas:</strong> {rute.jenisKomoditas}</p>
                  <p><strong className="text-slate-400">Volume Rata-rata:</strong> <span className="text-emerald-400 font-bold">{rute.volumeBulan}</span></p>
                  <p><strong className="text-slate-400">Moda:</strong> {rute.modaTransportasi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
