import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Users, 
  Calendar, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2,
  Landmark,
  Sparkles
} from 'lucide-react';
import { getVillageProfile } from '@/lib/mock-data';

export default async function ProfilPage() {
  const profile = await getVillageProfile();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden gradient-hero text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="bg-emerald-800/80 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/40">
            Penyusunan Konten Sejarah & Profil Desa • Catur Purna Laras (FIB / Sejarah)
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Profil & Sejarah Desa Banyuurip
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 font-light leading-relaxed">
            Menelusuri sejarah panjang, nilai-nilai kearifan lokal, serta jajaran pemerintahan Desa Banyuurip, Kecamatan Klego, Kabupaten Boyolali.
          </p>
        </div>
      </div>

      {/* Geografis & Ringkasan Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1">
          <MapPin className="w-6 h-6 text-emerald-600 mx-auto" />
          <span className="text-xs text-slate-500 block font-medium">Kecamatan & Kab.</span>
          <span className="font-bold text-slate-900 text-sm">Klego, Boyolali</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1">
          <Building2 className="w-6 h-6 text-emerald-600 mx-auto" />
          <span className="text-xs text-slate-500 block font-medium">Luas Wilayah</span>
          <span className="font-bold text-slate-900 text-sm">{profile.luasWilayah}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1">
          <Users className="w-6 h-6 text-emerald-600 mx-auto" />
          <span className="text-xs text-slate-500 block font-medium">Jumlah Penduduk</span>
          <span className="font-bold text-slate-900 text-sm">{profile.jumlahPenduduk} Jiwa</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1">
          <Landmark className="w-6 h-6 text-emerald-600 mx-auto" />
          <span className="text-xs text-slate-500 block font-medium">Jumlah Kepala Keluarga</span>
          <span className="font-bold text-slate-900 text-sm">{profile.jumlahKK} KK</span>
        </div>
      </div>

      {/* Sejarah Desa Section */}
      <section id="sejarah" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Sejarah & Asal-Usul Desa Banyuurip</h2>
            <p className="text-xs text-slate-500">Dokumentasi sejarah oleh Catur Purna Laras (FIB / Sejarah)</p>
          </div>
        </div>

        <div className="prose prose-emerald max-w-none text-slate-600 text-sm leading-relaxed space-y-4">
          <p>{profile.sejarah}</p>
          <p>
            Secara historis, mata air di wilayah Banyuurip menjadi tumpuan utama bagi pertanian padi dan tanaman pangan di wilayah Klego utara. Nilai-nilai kedisiplinan dan kegotongroyongan warga terawat dari generasi ke generasi, menjadikan Desa Banyuurip sebagai salah satu desa lumbung pangan yang tangguh di Boyolali.
          </p>
        </div>

        <div className="pt-4">
          <h4 className="font-bold text-sm text-slate-900 mb-3">Wilayah Dusun di Desa Banyuurip:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {profile.dusunList.map((dusun, idx) => (
              <div key={idx} className="bg-emerald-50 text-emerald-900 px-4 py-2.5 rounded-xl text-xs font-semibold border border-emerald-200/60 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {dusun}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-8 rounded-3xl shadow-lg space-y-4">
          <div className="p-3 rounded-2xl bg-emerald-700/50 w-fit text-emerald-300">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold">Visi Desa Banyuurip</h3>
          <blockquote className="text-sm font-light text-emerald-100 leading-relaxed italic border-l-4 border-emerald-400 pl-4 py-1">
            "{profile.visi}"
          </blockquote>
        </div>

        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Misi Pembangunan Desa
          </h3>
          <ul className="space-y-3 text-xs text-slate-600">
            {profile.misi.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Perangkat Desa */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">Struktur Aparatur Pemerintah Desa</h2>
          <p className="text-xs text-slate-500">Perangkat Desa Banyuurip yang siap melayani masyarakat</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {profile.perangkatDesa.map((p, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow text-center p-4 space-y-3">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm">
                <img src={p.foto} alt={p.nama} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">{p.nama}</h4>
                <p className="text-[11px] font-medium text-emerald-700 mt-0.5">{p.jabatan}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
