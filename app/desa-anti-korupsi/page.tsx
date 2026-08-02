'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Send, 
  CheckCircle2, 
  Award, 
  Info,
  Scale
} from 'lucide-react';
import { mockDesaAntiKorupsiInfo } from '@/lib/mock-data';
import { useData } from '@/components/DataProvider';

export default function DesaAntiKorupsiPage() {
  const info = mockDesaAntiKorupsiInfo;
  const { addWBSReport } = useData();

  // WBS Form State
  const [formData, setFormData] = useState({
    judulLaporan: '',
    kategori: 'Pelayanan Publik',
    deskripsi: '',
    lokasiKejadian: '',
    isAnonim: true,
    namaPelapor: '',
    kontakPelapor: '',
  });

  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedCode = addWBSReport({
      judulLaporan: formData.judulLaporan,
      kategori: formData.kategori,
      deskripsi: formData.deskripsi,
      lokasiKejadian: formData.lokasiKejadian,
      isAnonim: formData.isAnonim,
      namaPelapor: formData.isAnonim ? 'Anonim (Rahasia)' : formData.namaPelapor,
      kontakPelapor: formData.isAnonim ? '-' : formData.kontakPelapor,
    });

    setSubmittedCode(generatedCode);
    setFormData({
      judulLaporan: '',
      kategori: 'Pelayanan Publik',
      deskripsi: '',
      lokasiKejadian: '',
      isAnonim: true,
      namaPelapor: '',
      kontakPelapor: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 text-white p-8 sm:p-12 shadow-xl border border-emerald-800/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-800/80 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/40">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            Program Desa Anti Korupsi Komisi Pemberantasan Korupsi (KPK)
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight flex items-center gap-3">
            <Scale className="w-10 h-10 text-emerald-400" />
            Desa Banyuurip Anti Korupsi
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 font-light leading-relaxed">
            Wujud komitmen kebebasan dari korupsi, kepastian pelayanan publik tanpa pungli, serta transparansi penuh pengelolaan anggaran Dana Desa Banyuurip.
          </p>
        </div>
      </div>

      {/* 5 Indikator Utama Desa Anti Korupsi KPK */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Standar Integritas KPK
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">
            5 Indikator Utama Desa Anti Korupsi
          </h2>
          <p className="text-xs text-slate-500">
            Pencapaian pemenuhan indikator tata kelola pemerintahan yang jujur & terpercaya di Desa Banyuurip.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {info.indikatorKPK.map((ind) => (
            <div 
              key={ind.nomor}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                    {ind.nomor}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                    {ind.statusPencapaian}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 leading-snug">{ind.judul}</h3>

                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  {ind.subIndikator.map((sub, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-medium">
                Kriteria Pemenuhan Terverifikasi
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Whistleblowing System (WBS) & Form Laporan Anonim */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Pelaporan WBS */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
              Kanal Rahasia & Aman
            </span>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mt-1">
              <Lock className="w-5 h-5 text-rose-600" />
              Whistleblowing System (WBS) - Form Pengaduan
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Laporkan dugaan pelanggaran, pungutan liar, atau ketidaksesuaian pelayanan secara anonim. Identitas Anda terjamin 100% aman.
            </p>
          </div>

          {submittedCode && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-5 rounded-2xl space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Laporan WBS Berhasil Terkirim!</span>
              </div>
              <p className="text-xs">Simpan Kode Resi Laporan Anda untuk melacak penanganan:</p>
              <div className="bg-white px-4 py-2 rounded-xl text-center font-mono font-extrabold text-base border border-emerald-200 text-emerald-700 tracking-wider">
                {submittedCode}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmitReport} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Judul Laporan / Pengaduan</label>
              <input
                type="text"
                required
                placeholder="Contoh: Permohonan Klarifikasi Biaya Pelayanan Administrasi"
                value={formData.judulLaporan}
                onChange={(e) => setFormData({ ...formData, judulLaporan: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kategori Pelaporan</label>
                <select
                  value={formData.kategori}
                  onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option>Pelayanan Publik (Tanpa Pungli)</option>
                  <option>Transparansi Anggaran & APBDes</option>
                  <option>Penyalahgunaan Wewenang / Aset</option>
                  <option>Kritik & Saran Pembangunan</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Lokasi Kejadian</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Balai Desa / Dusun Krajan"
                  value={formData.lokasiKejadian}
                  onChange={(e) => setFormData({ ...formData, lokasiKejadian: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Uraian Detail Laporan / Kejadian</label>
              <textarea
                rows={4}
                required
                placeholder="Jelaskan kronologi, fakta, atau masukan Anda secara jelas dan objektif..."
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Privacy Checkbox */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isAnonim}
                  onChange={(e) => setFormData({ ...formData, isAnonim: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <div>
                  <span className="font-bold text-slate-900">Kirim Secara Anonim (Identitas Terjaga)</span>
                  <span className="text-slate-500 block text-[11px]">Nama & kontak Anda tidak akan dipublikasikan atau disimpan</span>
                </div>
              </label>

              {!formData.isAnonim && (
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 animate-in fade-in">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nama Pelapor</label>
                    <input
                      type="text"
                      placeholder="Nama Anda"
                      value={formData.namaPelapor}
                      onChange={(e) => setFormData({ ...formData, namaPelapor: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">No. WhatsApp / HP</label>
                    <input
                      type="text"
                      placeholder="0812xxxx"
                      value={formData.kontakPelapor}
                      onChange={(e) => setFormData({ ...formData, kontakPelapor: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Kirim Laporan WBS Anti Korupsi
            </button>
          </form>
        </div>

        {/* Pakta Integritas Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Pakta Integritas Perangkat Desa</h3>
                <p className="text-xs text-slate-400">Pernyataan Komitmen Bersama</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              {info.paktaIntegritas.map((pakta, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-800/60 p-3 rounded-xl border border-slate-700/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{pakta}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Callout box */}
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-3xl space-y-2 text-xs text-emerald-950">
            <h4 className="font-bold text-sm text-emerald-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-700" />
              Layanan Administrasi Desa 100% Bebas Pungli
            </h4>
            <p className="leading-relaxed">
              Seluruh pengurusan dokumen KTP, Kartu Keluarga, Surat Keterangan Usaha (SKU), dan perizinan di Balai Desa Banyuurip diselenggarakan tanpa biaya (Gratis).
            </p>
          </div>
        </div>

      </section>

    </div>
  );
}
