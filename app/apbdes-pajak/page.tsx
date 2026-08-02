'use client';

import React from 'react';
import { 
  PieChart, 
  CreditCard, 
  TrendingUp, 
  Landmark
} from 'lucide-react';
import { useData } from '@/components/DataProvider';

export default function APBDesPajakPage() {
  const { apbdesData } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-800 via-orange-900 to-amber-950 text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="bg-amber-800/80 text-amber-200 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/40">
            Visualisasi APBDes & Pajak PBB • Lintang Qonita Rayaraudha (SV / Akuntansi Perpajakan)
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight flex items-center gap-3">
            <PieChart className="w-10 h-10 text-amber-300" />
            Transparansi APBDes & Panduan Pajak
          </h1>
          <p className="text-sm sm:text-base text-amber-100 font-light leading-relaxed">
            Visualisasi grafis realisasi keuangan Anggaran Pendapatan dan Belanja Desa (APBDes) 2026 serta panduan praktis pembayaran Pajak Bumi dan Bangunan (PBB-P2) secara digital.
          </p>
        </div>
      </div>

      {/* APBDes Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Pendapatan */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Pendapatan Desa 2026</h3>
                <p className="text-xs text-slate-500">Total Anggaran Pendapatan</p>
              </div>
            </div>
            <span className="text-lg font-extrabold text-emerald-600">
              Rp {(apbdesData.totalPendapatan / 1000000000).toFixed(2)} Miliar
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {apbdesData.pendapatan.map((p, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-700">{p.sumber}</span>
                  <span className="text-emerald-700 font-bold">
                    Rp {(p.jumlah / 1000000).toFixed(0)} Jt ({p.persen}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${p.persen}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Belanja */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Belanja Desa 2026</h3>
                <p className="text-xs text-slate-500">Alokasi Pembangunan & Pelayanan</p>
              </div>
            </div>
            <span className="text-lg font-extrabold text-amber-600">
              Rp {(apbdesData.totalBelanja / 1000000000).toFixed(2)} Miliar
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {apbdesData.belanja.map((b, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-700">{b.bidang}</span>
                  <span className="text-amber-700 font-bold">
                    Rp {(b.jumlah / 1000000).toFixed(0)} Jt ({b.persen}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${b.persen}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Panduan Pajak PBB-P2 Online */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
        <div className="space-y-2 border-b border-slate-800 pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800">
            Panduan Kemudahan Warga Desa
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-amber-400" />
            Panduan Pembayaran Pajak PBB-P2 Online
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Tingkatkan kesadaran pajak warga Desa Banyuurip dengan metode bayar e-Samsat & Kanal Digital Boyolali.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {apbdesData.panduanPajakPBB.map((p) => (
            <div key={p.langkah} className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-extrabold text-sm flex items-center justify-center shadow-md">
                {p.langkah}
              </span>
              <h4 className="font-bold text-sm text-white">{p.judul}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{p.deskripsi}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4 text-xs text-slate-300">
          <span className="font-semibold text-amber-400">Kanal Resmi Pembayaran Online:</span>
          <span>• e-Samsat Jateng</span>
          <span>• Mobile Banking Bank Jateng / BRI</span>
          <span>• DANA / OVO / Shopee</span>
          <span>• Kasir Indomaret / Alfamart</span>
        </div>
      </section>

    </div>
  );
}
