'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Send, 
  CheckCircle2, 
  Award, 
  Info,
  Scale,
  ExternalLink,
  FileText,
  Eye,
  X,
  Search,
  Calendar,
  Filter
} from 'lucide-react';
import { mockDesaAntiKorupsiInfo } from '@/lib/mock-data';
import { useData } from '@/components/DataProvider';

export default function DesaAntiKorupsiPage() {
  const info = mockDesaAntiKorupsiInfo;
  const { addWBSReport, antiKorupsiIndikatorList } = useData();

  // Search and Category Filter States (Matching JDIH Hukum & 18 KPK Indicators)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndikator, setSelectedIndikator] = useState('Semua');

  // PDF Preview Modal State
  const [activePdfModal, setActivePdfModal] = useState<{ title: string; url: string } | null>(null);

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

      {/* Filter & Search Controls (Disesuaikan dengan 18 Indikator Resmi KPK) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kata kunci atau nomor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Dropdown Selector 18 Indikator Spesifik */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-700 shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-emerald-700" /> Indikator (1-18):
            </span>
            <select
              value={selectedIndikator}
              onChange={(e) => setSelectedIndikator(e.target.value)}
              className="w-full lg:w-72 p-2.5 rounded-xl border border-slate-300 bg-white font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs"
            >
              <option value="Semua">Semua 18 Indikator KPK</option>
              <option value="IND-01">Indikator 01: Pertanggungjawaban APBDes</option>
              <option value="IND-02">Indikator 02: Pengawasan & Evaluasi Perangkat</option>
              <option value="IND-03">Indikator 03: Pengendalian Gratifikasi & Suap</option>
              <option value="IND-04">Indikator 04: Pengadaan Barang/Jasa Desa</option>
              <option value="IND-05">Indikator 05: Pakta Integritas Perangkat Desa</option>
              <option value="IND-06">Indikator 06: Evaluasi Kinerja Perangkat Desa</option>
              <option value="IND-07">Indikator 07: Tindak Lanjut Hasil Examination</option>
              <option value="IND-08">Indikator 08: Aparatur Bebas Pidana Korupsi</option>
              <option value="IND-09">Indikator 09: Layanan Pengaduan WBS</option>
              <option value="IND-10">Indikator 10: Survei Kepuasan Masyarakat (IKM)</option>
              <option value="IND-11">Indikator 11: Standar Pelayanan Minimal (SPM)</option>
              <option value="IND-12">Indikator 12: Media Informasi APBDes</option>
              <option value="IND-13">Indikator 13: Maklumat Pelayanan</option>
              <option value="IND-14">Indikator 14: Partisipasi Penyusunan RKP Desa</option>
              <option value="IND-15">Indikator 15: Kesadaran Mencegah Gratifikasi</option>
              <option value="IND-16">Indikator 16: Keterlibatan LKD Pembangunan</option>
              <option value="IND-17">Indikator 17: Budaya Lokal & Hukum Adat</option>
              <option value="IND-18">Indikator 18: Peran Tokoh Warga & Perempuan</option>
            </select>
          </div>

        </div>
      </div>

      {/* Document List (Tampilan Persis Seperti Fitur Peraturan Desa / JDIH Hukum) */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>Menampilkan {
            antiKorupsiIndikatorList.filter((doc) => {
              const matchesSearch = doc.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    doc.kodeIndikator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    doc.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
              const matchesInd = selectedIndikator === 'Semua' || doc.kodeIndikator === selectedIndikator;
              return matchesSearch && matchesInd;
            }).length
          } Dokumen Indikator & Berkas Terverifikasi</span>
          <span>Status: Terpenuhi 100% KPK</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {antiKorupsiIndikatorList
            .filter((doc) => {
              const matchesSearch = doc.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    doc.kodeIndikator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    doc.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
              const matchesInd = selectedIndikator === 'Semua' || doc.kodeIndikator === selectedIndikator;
              return matchesSearch && matchesInd;
            })
            .map((doc) => (
              <div 
                key={doc.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-3 flex-grow">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-md border border-emerald-200">
                      {doc.kategori}
                    </span>
                    <span className="font-bold text-slate-900">{doc.kodeIndikator}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      Tahun {doc.tahun}
                    </span>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[10px]">
                      ✓ {doc.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 leading-snug">
                    {doc.judul}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {doc.deskripsi}
                  </p>

                  {/* Sub PDF File Links (Langsung Mengarah ke GDrive PDF) */}
                  {doc.pdfFiles && doc.pdfFiles.length > 0 && (
                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-400 block w-full">File Berkas Bukti PDF Terkait:</span>
                      {doc.pdfFiles.map((pdf) => (
                        <a
                          key={pdf.id}
                          href={pdf.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 text-[11px] font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all group/file"
                          title="Klik untuk langsung membaca file PDF di Google Drive"
                        >
                          <FileText className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{pdf.namaBerkas}</span>
                          <ExternalLink className="w-3 h-3 text-slate-400 group-hover/file:text-emerald-700 transition-colors" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
                  <a
                    href={doc.gdriveUrl && doc.gdriveUrl !== '#' ? doc.gdriveUrl : `https://drive.google.com/drive/folders/10pKDWF_VgqKaSjPiAsweJlod8Y8a5uy2`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 group"
                  >
                    <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Buka Dokumen (Google Drive)
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>

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

      {/* PDF Preview Modal */}
      {activePdfModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden relative border border-slate-700">
            <div className="p-4 sm:p-5 border-b flex justify-between items-center bg-slate-900 text-white">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-emerald-400 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  {activePdfModal.title}
                </h3>
                <p className="text-[11px] text-slate-400">Dokumen PDF Resmi Desa Anti-Korupsi Desa Banyuurip</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={activePdfModal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Buka Tab Baru
                </a>
                <button
                  onClick={() => setActivePdfModal(null)}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-slate-100 relative">
              <iframe
                src={activePdfModal.url.replace('/view', '/preview')}
                className="w-full h-full border-0"
                title={activePdfModal.title}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
