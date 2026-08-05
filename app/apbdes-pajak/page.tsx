'use client';

import React from 'react';
import { 
  PieChart, 
  TrendingUp, 
  Landmark,
  ShieldCheck
} from 'lucide-react';
import { useData } from '@/components/DataProvider';
import { APBDesCharts } from '@/components/APBDesCharts';
import { SiPADPajakGuide } from '@/components/SiPADPajakGuide';

export default function APBDesPajakPage() {
  const { apbdesData } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-950 text-white p-8 sm:p-12 shadow-xl border border-emerald-800/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/40 inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Visualisasi APBDes & Panduan Pembayaran Pajak PBB-P2 Desa Banyuurip
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight flex items-center gap-3 text-white">
            <PieChart className="w-10 h-10 text-emerald-400" />
            Transparansi APBDes & Panduan Pajak
          </h1>
          <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed">
            Visualisasi grafis realisasi keuangan Anggaran Pendapatan dan Belanja Desa (APBDes) 2026 sebesar <strong>Rp 1,59 Miliar</strong> serta panduan resmi pembayaran Pajak Bumi dan Bangunan (PBB-P2) melalui <strong>SiPAD Boyolali</strong>.
          </p>
        </div>
      </div>

      {/* APBDes Visualisation Charts Section */}
      <section className="space-y-4">
        <APBDesCharts data={apbdesData} />
      </section>

      {/* APBDes Summary Cards: Belanja & Pendapatan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Ringkasan Pendapatan */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Total Pendapatan Desa 2026</h3>
                <p className="text-xs text-slate-500">Anggaran Pendapatan APBDes</p>
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
                    Rp {(p.anggaran / 1000000).toFixed(0)} Jt ({p.porsiAnggaran}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ width: `${p.porsiAnggaran}%`, backgroundColor: p.warna || '#10b981' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Ringkasan Belanja */}
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

      {/* Panduan Pembayaran PBB Melalui SiPAD Boyolali */}
      <SiPADPajakGuide />

    </div>
  );
}
