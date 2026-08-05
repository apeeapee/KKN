'use client';

import React, { useState } from 'react';
import { 
  PieChart as PieIcon, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  HelpCircle,
  Sparkles,
  Info,
  Layers,
  Target
} from 'lucide-react';
import { APBDesData, APBDesPendapatan } from '@/lib/data-store';

interface APBDesChartsProps {
  data: APBDesData;
}

export function APBDesCharts({ data }: APBDesChartsProps) {
  const [activeTab, setActiveTab] = useState<'pie-anggaran' | 'pie-realisasi' | 'pie-per-sumber' | 'all'>('all');
  const [hoveredSlice, setHoveredSlice] = useState<APBDesPendapatan | null>(null);
  const [hoveredRealSlice, setHoveredRealSlice] = useState<APBDesPendapatan | null>(null);

  const pendapatanList = data.pendapatan || [];
  const totalAnggaran = data.totalPendapatan || 1590000000;
  const totalRealisasi = data.totalRealisasiPendapatan || pendapatanList.reduce((acc, curr) => acc + (curr.realisasi || 0), 0);
  const totalSisa = totalAnggaran - totalRealisasi;
  const overallPercentage = Number(((totalRealisasi / totalAnggaran) * 100).toFixed(1));

  // Helper formatting currency
  const formatRupiahJuta = (val: number) => {
    if (val >= 1000000000) {
      return `Rp ${(val / 1000000000).toFixed(2)} Miliar`;
    }
    return `Rp ${(val / 1000000).toFixed(0)} Juta`;
  };

  const formatRupiahFull = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  // Pie chart geometry constants
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  // Pie 1: Anggaran offset calculations
  let offsetAccumulatorAnggaran = 0;

  // Pie 3: Realisasi offset calculations
  let offsetAccumulatorRealisasi = 0;

  return (
    <div className="space-y-8">
      
      {/* Header Stat Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          <div className="space-y-2">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 inline-flex items-center gap-1.5">
              <PieIcon className="w-3.5 h-3.5 text-emerald-400" />
              Visualisasi Pie Chart APBDes 2026
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Grafik Lingkaran Pendapatan Desa
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Transparansi anggaran & realisasi pendapatan Desa Banyuurip sebesar <strong>Rp 1,59 Miliar</strong> disajikan dalam bentuk Pie Chart yang atraktif dan mudah dipahami.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:col-span-2">
            <div className="bg-slate-800/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-700/80 space-y-1">
              <span className="text-xs text-slate-400 font-medium block">Total Target Anggaran</span>
              <div className="text-xl sm:text-2xl font-black text-emerald-400">
                {formatRupiahJuta(totalAnggaran)}
              </div>
              <span className="text-[11px] text-slate-400">100% Target APBDes 2026</span>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-700/80 space-y-1">
              <span className="text-xs text-slate-400 font-medium block">Total Pendapatan Terkumpul</span>
              <div className="text-xl sm:text-2xl font-black text-blue-400">
                {formatRupiahJuta(totalRealisasi)}
              </div>
              <span className="text-[11px] text-emerald-300 font-semibold inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {overallPercentage}% Terkumpul Kas Desa
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua Pie Chart (3 Visualisasi)
          </button>
          <button
            onClick={() => setActiveTab('pie-anggaran')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'pie-anggaran'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            Pie 1: Komposisi Anggaran
          </button>
          <button
            onClick={() => setActiveTab('pie-realisasi')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'pie-realisasi'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            Pie 2: Realisasi vs Sisa
          </button>
          <button
            onClick={() => setActiveTab('pie-per-sumber')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'pie-per-sumber'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Pie 3: Pie Chart per Sumber
          </button>
        </div>

        <span className="text-xs text-slate-400 font-medium hidden lg:inline-flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          Arahkan kursor ke potongan lingkaran untuk detail
        </span>
      </div>

      {/* PIE CHART 1: KOMPOSISI ANGGARAN PENDAPATAN (TOTAL RP 1.59 MILIAR) */}
      {(activeTab === 'all' || activeTab === 'pie-anggaran') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Pie Chart 1 — Komposisi Anggaran Pendapatan
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-2 flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-emerald-600" />
              Pie Chart Porsi Sumber Pendapatan (Total Rp 1,59 Miliar)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Menunjukkan persentase porsi tiap sumber pendapatan dalam wujud lingkaran berwarna dari total target anggaran desa Rp 1.590.000.000.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Pie SVG Container */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
              <div className="relative w-64 h-64 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                  {pendapatanList.map((item, idx) => {
                    const porsi = item.porsiAnggaran || 0;
                    const strokeDasharray = `${(porsi / 100) * circumference} ${circumference}`;
                    const currentOffset = offsetAccumulatorAnggaran;
                    offsetAccumulatorAnggaran -= (porsi / 100) * circumference;

                    const isHovered = hoveredSlice?.sumber === item.sumber;

                    return (
                      <circle
                        key={idx}
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="transparent"
                        stroke={item.warna || '#10b981'}
                        strokeWidth={isHovered ? "36" : "30"}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={currentOffset}
                        onMouseEnter={() => setHoveredSlice(item)}
                        onMouseLeave={() => setHoveredSlice(null)}
                        className="transition-all duration-300 cursor-pointer hover:opacity-90"
                      />
                    );
                  })}
                </svg>

                {/* Donut Center Display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none">
                  {hoveredSlice ? (
                    <div className="animate-fade-in space-y-1">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
                        {hoveredSlice.sumber}
                      </span>
                      <span className="text-lg font-black text-slate-900 block">
                        {formatRupiahJuta(hoveredSlice.anggaran)}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white inline-block shadow-sm" style={{ backgroundColor: hoveredSlice.warna }}>
                        {hoveredSlice.porsiAnggaran}% dari total
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
                        Total Anggaran
                      </span>
                      <span className="text-2xl font-black text-slate-900 block tracking-tight">
                        Rp 1,59 M
                      </span>
                      <span className="text-xs text-emerald-600 font-semibold block">
                        100% (5 Sumber)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <span className="text-[11px] text-slate-400 mt-4 text-center">
                Arahkan kursor ke warna lingkaran untuk melihat nominal & persentase
              </span>
            </div>

            {/* Legend & Details */}
            <div className="lg:col-span-7 space-y-3">
              <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                Rincian Porsi Pendapatan Desa Banyuurip 2026
              </h4>

              <div className="space-y-2.5">
                {pendapatanList.map((item, idx) => {
                  const isSelected = hoveredSlice?.sumber === item.sumber;

                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredSlice(item)}
                      onMouseLeave={() => setHoveredSlice(null)}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                        isSelected 
                          ? 'bg-slate-50 border-slate-400 shadow-md translate-x-1' 
                          : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span 
                          className="w-4 h-4 rounded-lg flex-shrink-0 shadow-sm" 
                          style={{ backgroundColor: item.warna }}
                        ></span>
                        <div>
                          <h5 className="font-bold text-xs text-slate-900">{item.sumber}</h5>
                          <span className="text-[11px] text-slate-500">
                            Realisasi: {formatRupiahJuta(item.realisasi)} ({item.persen}%)
                          </span>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="font-extrabold text-xs text-slate-900 block">
                          {formatRupiahJuta(item.anggaran)}
                        </span>
                        <span 
                          className="text-[11px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 text-white"
                          style={{ backgroundColor: item.warna }}
                        >
                          {item.porsiAnggaran}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>
      )}

      {/* PIE CHART 2: REALISASI VS SISA ANGGARAN PENDAPATAN */}
      {(activeTab === 'all' || activeTab === 'pie-realisasi') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Pie Chart 2 — Realisasi Terkumpul vs Sisa Target
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-2 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Pie Chart Pencapaian Realisasi APBDes (88,9% Terkumpul)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Visualisasi lingkaran perbandingan antara total pendapatan yang sudah masuk kas desa (<strong className="text-blue-600">88,9% / Rp 1,41 Miliar</strong>) vs sisa target yang belum terkumpul (<strong className="text-slate-400">11,1% / Rp 177 Juta</strong>).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Pie SVG Realisasi vs Sisa */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
              <div className="relative w-64 h-64 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                  {/* Slice 1: Realisasi (88.9%) */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="transparent"
                    stroke="#2563eb"
                    strokeWidth="32"
                    strokeDasharray={`${(overallPercentage / 100) * circumference} ${circumference}`}
                    strokeDashoffset="0"
                    className="transition-all duration-300 hover:brightness-110"
                  />
                  {/* Slice 2: Sisa Target (11.1%) */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="transparent"
                    stroke="#cbd5e1"
                    strokeWidth="32"
                    strokeDasharray={`${((100 - overallPercentage) / 100) * circumference} ${circumference}`}
                    strokeDashoffset={-((overallPercentage / 100) * circumference)}
                    className="transition-all duration-300 hover:brightness-110"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none space-y-0.5">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
                    Ketercapaian
                  </span>
                  <span className="text-3xl font-black text-blue-600 block tracking-tight">
                    {overallPercentage}%
                  </span>
                  <span className="text-xs font-bold text-slate-600 block">
                    {formatRupiahJuta(totalRealisasi)}
                  </span>
                </div>
              </div>
            </div>

            {/* Readout Details & Cards */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-blue-50/80 p-4 sm:p-5 rounded-2xl border border-blue-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-lg bg-blue-600 shadow-sm flex-shrink-0"></span>
                  <div>
                    <h5 className="font-bold text-sm text-slate-900">Pendapatan Sudah Terrealisasi</h5>
                    <p className="text-xs text-slate-600">Masuk Rekening Kas Desa Banyuurip</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-black text-base text-blue-700 block">{formatRupiahFull(totalRealisasi)}</span>
                  <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full inline-block mt-0.5">
                    {overallPercentage}% Target
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-lg bg-slate-300 shadow-sm flex-shrink-0"></span>
                  <div>
                    <h5 className="font-bold text-sm text-slate-900">Sisa Target Anggaran Belum Terkumpul</h5>
                    <p className="text-xs text-slate-500">Proses pencairan / penerimaan sisa APBDes</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-black text-base text-slate-700 block">{formatRupiahFull(totalSisa)}</span>
                  <span className="text-xs font-bold text-slate-600 bg-slate-200 px-2.5 py-0.5 rounded-full inline-block mt-0.5">
                    {(100 - overallPercentage).toFixed(1)}% Sisa
                  </span>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  <strong>Status Kas Desa:</strong> Realisasi pendapatan 88,9% tergolong <strong>sangat baik</strong> untuk triwulan berjalan tahun anggaran 2026.
                </span>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* PIE CHART 3: PIE CHART LINGKARAN PER MASING-MASING SUMBER PENDAPATAN */}
      {(activeTab === 'all' || activeTab === 'pie-per-sumber') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Pie Chart 3 — Pie Chart Realisasi per Sumber
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-2 flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-600" />
              5 Pie Charts Tingkat Realisasi per Sumber Pendapatan
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Menampilkan grafik lingkaran (Pie Chart) mini untuk tiap-tiap sumber pendapatan desa — memperlihatkan porsi realisasi dibanding target anggarannya secara visual.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendapatanList.map((item, idx) => {
              const miniRadius = 36;
              const miniCircumference = 2 * Math.PI * miniRadius;
              const realPct = item.persen;

              return (
                <div key={idx} className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200 space-y-4 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
                  
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.warna }}></span>
                      <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{item.sumber}</h4>
                    </div>
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-md text-white" style={{ backgroundColor: item.warna }}>
                      {realPct}%
                    </span>
                  </div>

                  <div className="flex items-center gap-4 py-2">
                    {/* Mini Donut Pie SVG */}
                    <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background ring */}
                        <circle cx="50" cy="50" r={miniRadius} fill="transparent" stroke="#e2e8f0" strokeWidth="14" />
                        {/* Realisasi slice */}
                        <circle
                          cx="50"
                          cy="50"
                          r={miniRadius}
                          fill="transparent"
                          stroke={item.warna || '#10b981'}
                          strokeWidth="14"
                          strokeDasharray={`${(realPct / 100) * miniCircumference} ${miniCircumference}`}
                          strokeDashoffset="0"
                          className="transition-all duration-700"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-center">
                        <span className="text-xs font-black text-slate-900">{realPct}%</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] font-medium uppercase">Anggaran</span>
                        <span className="font-bold text-slate-800">{formatRupiahJuta(item.anggaran)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-medium uppercase">Realisasi</span>
                        <span className="font-bold text-emerald-600">{formatRupiahJuta(item.realisasi)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex justify-between items-center">
                    <span>Porsi Anggaran Total:</span>
                    <strong className="text-slate-900">{item.porsiAnggaran}% (Rp 1.59M)</strong>
                  </div>

                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Footer Info Note */}
      <div className="bg-amber-50 rounded-2xl p-4 sm:p-6 border border-amber-200 text-amber-900 text-xs space-y-2">
        <h5 className="font-bold text-sm text-amber-950 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-amber-700" />
          Keterangan Grafik Lingkaran (Pie Chart) Pendapatan Desa Banyuurip:
        </h5>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-700 list-disc list-inside leading-relaxed">
          <li><strong>Dana Desa (DD):</strong> Menyumbang porsi terbesar yaitu <strong>47,2%</strong> (Rp 750 Juta) dari total anggaran desa.</li>
          <li><strong>Alokasi Dana Desa (ADD):</strong> Porsi kedua terbesar yaitu <strong>28,3%</strong> (Rp 450 Juta) berasal dari APBD Boyolali.</li>
          <li><strong>Pajak Bagi Hasil:</strong> Memberikan kontribusi <strong>9,4%</strong> (Rp 150 Juta) hasil bagi pajak & retribusi daerah.</li>
          <li><strong>PADes & Bantuan Keuangan:</strong> Masing-masing berkontribusi <strong>7,5%</strong> (Rp 120 Juta) untuk menopang APBDes 2026.</li>
        </ul>
      </div>

    </div>
  );
}
