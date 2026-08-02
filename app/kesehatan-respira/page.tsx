'use client';

import React, { useState } from 'react';
import { 
  HeartPulse, 
  BookOpen, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  Activity, 
  Stethoscope,
  ChevronRight,
  Info
} from 'lucide-react';
import { mockISPAInfo } from '@/lib/mock-data';

export default function KesehatanRESPIRAPage() {
  const [activeTab, setActiveTab] = useState<'ebook' | 'skrining'>('skrining');
  
  // Interactive Screening Form State
  const [formData, setFormData] = useState({
    nama: '',
    usia: '',
    dusun: 'Dusun Banyuurip I',
    batuk: false,
    pilek: false,
    demam: false,
    nyeriTenggorokan: false,
    sesakNapas: false,
    lemasLuarBiasa: false,
    perokokDiRumah: false,
  });

  const [assessmentResult, setAssessmentResult] = useState<{
    score: number;
    kategori: 'Rendah' | 'Sedang' | 'Tinggi';
    pesan: string;
    rekomendasi: string[];
    colorClass: string;
  } | null>(null);

  const handleCheckboxChange = (field: keyof typeof formData) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const calculateAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    let score = 0;
    if (formData.batuk) score += 1;
    if (formData.pilek) score += 1;
    if (formData.nyeriTenggorokan) score += 1;
    if (formData.demam) score += 2;
    if (formData.lemasLuarBiasa) score += 2;
    if (formData.sesakNapas) score += 4;
    if (formData.perokokDiRumah) score += 1;

    if (score >= 5) {
      setAssessmentResult({
        score,
        kategori: 'Tinggi',
        pesan: 'Anda mengalami indikasi gejala ISPA berat / membutuhkan penanganan medis segera.',
        rekomendasi: [
          'Segera kunjungi Puskesmas Klego / Klinik Kesehatan terdekat.',
          'Gunakan masker medis secara terus menerus agar tidak menulari anggota keluarga.',
          'Istirahat total dan hindari kontak langsung dengan bayi/lansia.',
          'Bila mengalami sesak napas berat atau bibir membiru, kunjungi IGD rumah sakit.'
        ],
        colorClass: 'bg-red-50 text-red-900 border-red-300'
      });
    } else if (score >= 2) {
      setAssessmentResult({
        score,
        kategori: 'Sedang',
        pesan: 'Anda mengalami indikasi gejala ISPA ringan-sedang.',
        rekomendasi: [
          'Perbanyak minum air putih hangat dan konsumsi makanan bergizi seimbang.',
          'Konsumsi vitamin C dan paracetamol apabila mengalami demam.',
          'Gunakan masker saat berinteraksi di dalam atau luar rumah.',
          'Jika gejala tidak membaik dalam 3 hari, periksakan ke kader Posyandu / Puskesmas.'
        ],
        colorClass: 'bg-amber-50 text-amber-900 border-amber-300'
      });
    } else {
      setAssessmentResult({
        score,
        kategori: 'Rendah',
        pesan: 'Kondisi kesehatan pernapasan Anda relatif baik & berisiko rendah.',
        rekomendasi: [
          'Pertahankan kebiasaan cuci tangan pakai sabun secara teratur.',
          'Jaga kebersihan udara dan ventilasi ruangan di rumah.',
          'Hindari pembakaran sampah di area dekat pemukiman.'
        ],
        colorClass: 'bg-emerald-50 text-emerald-900 border-emerald-300'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-900 via-pink-900 to-rose-950 text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="bg-pink-800/80 text-pink-200 text-xs font-bold px-3 py-1 rounded-full border border-pink-500/40">
            Pengembangan E-Book & Skrining ISPA RESPIRA • Azizah Ras Karolina Purba (FK / Keperawatan)
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight flex items-center gap-3">
            <HeartPulse className="w-10 h-10 text-pink-400" />
            Layanan Kesehatan RESPIRA
          </h1>
          <p className="text-sm sm:text-base text-pink-100 font-light leading-relaxed">
            E-Book edukasi kesehatan Infeksi Saluran Pernapasan Akut (ISPA) dan alat skrining mandiri interaktif untuk warga Desa Banyuurip.
          </p>

          {/* Nav Tabs */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setActiveTab('skrining')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === 'skrining'
                  ? 'bg-white text-rose-900 shadow-md'
                  : 'bg-rose-950/60 text-pink-200 hover:bg-rose-900'
              }`}
            >
              <Activity className="w-4 h-4" />
              Skrining Mandiri ISPA
            </button>
            <button
              onClick={() => setActiveTab('ebook')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === 'ebook'
                  ? 'bg-white text-rose-900 shadow-md'
                  : 'bg-rose-950/60 text-pink-200 hover:bg-rose-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              E-Book Edukasi RESPIRA
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: SKRINING MANDIRI ISPA */}
      {activeTab === 'skrining' && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Skrining */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-rose-600" />
                Form Skrining Mandiri Risiko ISPA
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Isi kuesioner berikut sesuai dengan gejala yang Anda/keluarga rasakan saat ini.
              </p>
            </div>

            <form onSubmit={calculateAssessment} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ibu Suparmi"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Usia (Tahun)</label>
                  <input
                    type="number"
                    required
                    placeholder="Contoh: 42"
                    value={formData.usia}
                    onChange={(e) => setFormData({ ...formData, usia: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Dusun / Domisili</label>
                <select
                  value={formData.dusun}
                  onChange={(e) => setFormData({ ...formData, dusun: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                >
                  <option>Dusun Banyuurip I</option>
                  <option>Dusun Banyuurip II</option>
                  <option>Dusun Krajan</option>
                  <option>Dusun Wonosari</option>
                </select>
              </div>

              {/* Symptom Checklist */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-slate-900">
                  Pilih Gejala yang Dirasakan (Bisa Pilih Lebih dari Satu):
                </label>

                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-rose-50/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.batuk}
                      onChange={() => handleCheckboxChange('batuk')}
                      className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                    />
                    <div>
                      <span className="font-semibold text-slate-800">Batuk-Batuk</span>
                      <span className="text-slate-500 block text-[11px]">Batuk berdahak atau batuk kering berulang</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-rose-50/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.pilek}
                      onChange={() => handleCheckboxChange('pilek')}
                      className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                    />
                    <div>
                      <span className="font-semibold text-slate-800">Pilek / Hidung Tersumbat</span>
                      <span className="text-slate-500 block text-[11px]">Keluar lender bening/keruh atau bersin-bersin</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-rose-50/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.nyeriTenggorokan}
                      onChange={() => handleCheckboxChange('nyeriTenggorokan')}
                      className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                    />
                    <div>
                      <span className="font-semibold text-slate-800">Nyeri Tenggorokan</span>
                      <span className="text-slate-500 block text-[11px]">Rasa gatal atau sakit saat menelan</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-rose-50/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.demam}
                      onChange={() => handleCheckboxChange('demam')}
                      className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                    />
                    <div>
                      <span className="font-semibold text-slate-800">Demam Tinggi / Badan Panas</span>
                      <span className="text-slate-500 block text-[11px]">Suhu tubuh terasa panas di atas 37.5°C</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-rose-50/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.sesakNapas}
                      onChange={() => handleCheckboxChange('sesakNapas')}
                      className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                    />
                    <div>
                      <span className="font-semibold text-slate-800 text-rose-700">Sesak Napas / Napas Berbunyi</span>
                      <span className="text-slate-500 block text-[11px]">Sulit menarik napas lega atau terengah-engah</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-rose-50/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.perokokDiRumah}
                      onChange={() => handleCheckboxChange('perokokDiRumah')}
                      className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                    />
                    <div>
                      <span className="font-semibold text-slate-800">Anggota Keluarga Perokok / Pembakaran Sampah</span>
                      <span className="text-slate-500 block text-[11px]">Terpapar asap rokok/pembakaran rutin di lingkungan rumah</span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2"
              >
                <Activity className="w-4 h-4" />
                Proses Skrining Mandiri
              </button>
            </form>
          </div>

          {/* Assessment Result Panel */}
          <div className="lg:col-span-5 space-y-6">
            {assessmentResult ? (
              <div className={`p-6 sm:p-8 rounded-3xl border ${assessmentResult.colorClass} shadow-md space-y-4 animate-in fade-in`}>
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider">Hasil Analisis Skrining</span>
                  <span className="font-extrabold text-sm uppercase px-3 py-1 rounded-full bg-white shadow-xs">
                    Risiko {assessmentResult.kategori}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base">{assessmentResult.pesan}</h3>
                  <p className="text-xs mt-1 opacity-90">Skor Indikasi Gejala: {assessmentResult.score}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-current/20">
                  <h4 className="font-bold text-xs uppercase tracking-wider">Langkah Rekomendasi Kesehatan:</h4>
                  <ul className="space-y-2 text-xs">
                    {assessmentResult.rekomendasi.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 text-center space-y-3 text-slate-500">
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-bold text-sm text-slate-800">Belum Ada Hasil Skrining</h4>
                <p className="text-xs leading-relaxed">
                  Silakan isi form di samping dan klik tombol 'Proses Skrining Mandiri' untuk melihat rekomendasi kesehatan saluran pernapasan Anda.
                </p>
              </div>
            )}

            {/* Faskes Contacts */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h4 className="font-bold text-xs text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                <Info className="w-4 h-4 text-rose-600" />
                Kontak Fasilitas Kesehatan Terdekat
              </h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-800 block">Puskesmas Klego I</span>
                  <span>Jl. Raya Klego - Simo, Kec. Klego, Boyolali</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-800 block">Posyandu Desa Banyuurip</span>
                  <span>Tersedia pelayanan rutin kesehatan balita & lansia</span>
                </div>
              </div>
            </div>
          </div>

        </section>
      )}

      {/* TAB 2: E-BOOK RESPIRA */}
      {activeTab === 'ebook' && (
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-3 rounded-2xl bg-rose-100 text-rose-800">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{mockISPAInfo.judul}</h2>
              <p className="text-xs text-slate-500">Materi Edukasi Resmi disusun oleh Azizah Ras Karolina Purba (FK / Keperawatan)</p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <div className="bg-rose-50 p-5 rounded-2xl border border-rose-100">
              <h3 className="font-bold text-rose-900 text-base mb-1">Apa itu ISPA?</h3>
              <p className="text-xs text-rose-800">{mockISPAInfo.pengertian}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Penyebab & Gejala */}
              <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Gejala Utama ISPA
                </h4>
                <ul className="space-y-2 text-xs">
                  {mockISPAInfo.gejala.map((g, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pencegahan */}
              <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Langkah Pencegahan Dini
                </h4>
                <ul className="space-y-2 text-xs">
                  {mockISPAInfo.pencegahan.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Kapan Harus ke Faskes */}
            <div className="bg-red-900 text-white p-6 rounded-2xl shadow-md space-y-3">
              <h4 className="font-bold text-sm flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-300" />
                Tanda Bahaya: Kapan Harus Segera ke Fasilitas Kesehatan?
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-red-100">
                {mockISPAInfo.kapanKeFaskes.map((k, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-red-950/60 p-2.5 rounded-xl border border-red-800">
                    <span className="font-bold text-yellow-300">•</span>
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
