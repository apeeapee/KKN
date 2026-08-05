import React from 'react';
import Link from 'next/link';
import { 
  BookOpenCheck, 
  Sparkles, 
  Scissors, 
  LayoutGrid, 
  ShieldCheck, 
  HeartHandshake,
  CheckCircle2,
  Smile
} from 'lucide-react';
import { getEdukasi5SData } from '@/lib/mock-data';

export default async function Edukasi5SPage() {
  const data5s = await getEdukasi5SData();

  const iconMap: Record<string, React.ReactNode> = {
    Scissors: <Scissors className="w-6 h-6" />,
    LayoutGrid: <LayoutGrid className="w-6 h-6" />,
    Sparkles: <Sparkles className="w-6 h-6" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6" />,
    HeartHandshake: <HeartHandshake className="w-6 h-6" />
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-950 text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="bg-purple-800/80 text-purple-200 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/40">
            Digitalisasi Edukasi Budaya 5S Desa Banyuurip
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight flex items-center gap-3">
            <BookOpenCheck className="w-10 h-10 text-purple-300" />
            Budaya 5S Jepang di Desa Banyuurip
          </h1>
          <p className="text-sm sm:text-base text-purple-100 font-light leading-relaxed">
            Penguatan budaya hidup bersih, tertib, dan disiplin masyarakat melalui pengenalan konsep 5S (Seiri, Seiton, Seiso, Seiketsu, Shitsuke) yang disesuaikan dengan kearifan lokal desa.
          </p>
        </div>
      </div>

      {/* 5S Cards Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            5 Pilar Kebersihan & Kedisiplinan
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Penerapan Konsep 5S Jepang di Banyuurip
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {data5s.konsep.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center shadow-xs">
                  {iconMap[item.icon] || <Sparkles className="w-6 h-6" />}
                </div>

                <div>
                  <span className="text-xs font-bold text-purple-700 block">{item.istilahJepang}</span>
                  <h3 className="text-lg font-extrabold text-slate-900">{item.istilahIndo}</h3>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.arti}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-800 block mb-1">Penerapan Desa:</span>
                <p className="text-[11px] text-slate-600 leading-snug bg-purple-50/60 p-2.5 rounded-xl border border-purple-100">
                  {item.penerapanDesa}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Manfaat Penerapan */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Smile className="w-6 h-6 text-purple-600" />
          Manfaat Utama Penerapan Budaya 5S Bagi Warga Banyuurip
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data5s.manfaat.map((m, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <span className="text-xs font-semibold text-slate-800 leading-relaxed">{m}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
