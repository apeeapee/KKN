'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Newspaper, 
  FileText, 
  Store, 
  Sprout, 
  HeartPulse, 
  Scale, 
  LogOut, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  ExternalLink,
  Users,
  Activity,
  AlertTriangle,
  ShoppingBag,
  ChevronDown,
  ClipboardList,
  CheckCircle2,
  PieChart,
  History,
  Wheat,
  Wrench,
  FileCheck,
  Edit3,
  X,
  Check
} from 'lucide-react';
import { useData } from '@/components/DataProvider';
import { ISPALogItem } from '@/lib/mock-data';

export default function AdminDashboardPage() {
  const router = useRouter();
  const data = useData();

  // Active Menu Section State
  const [activeMenu, setActiveMenu] = useState<
    'ikhtisar' | 'berita' | 'sejarah' | 'perangkat' | 'komoditas' | 'aset_tani' | 'regulasi' | 'apbdes' | 'antikorupsi' | 'umkm' | 'ispa'
  >('ikhtisar');

  // Accordion Open States (Sesuai Screenshot Acuan)
  const [openProfil, setOpenProfil] = useState(true);
  const [openAgri, setOpenAgri] = useState(true);
  const [openTransparansi, setOpenTransparansi] = useState(true);

  // Custom Action Dropdown State for Table Rows
  const [activeActionDropdownId, setActiveActionDropdownId] = useState<string | null>(null);

  // Form Modals State
  const [showAddNews, setShowAddNews] = useState(false);
  const [newsForm, setNewsForm] = useState({ title: '', category: 'Pemerintahan', summary: '', content: '', author: 'Admin Desa Banyuurip', imageUrl: '' });

  const [showAddDoc, setShowAddDoc] = useState(false);
  const [docForm, setDocForm] = useState({ nomor: '', tahun: 2026, judul: '', kategori: 'Perdes', deskripsi: '', fileUrl: '#', tglTerbit: '2026-01-15', status: 'Berlaku' });

  const [showAddUMKM, setShowAddUMKM] = useState(false);
  const [umkmForm, setUmkmForm] = useState({ namaUsaha: '', pemilik: '', kategori: 'Kuliner', deskripsi: '', alamat: '', kontak: '', omzetBulanan: 3000000, produkUtama: '', imageUrl: '' });

  const [showAddAgri, setShowAddAgri] = useState(false);
  const [agriForm, setAgriForm] = useState({ nama: '', kategori: 'Tanaman Pangan', luasLahan: 10, estimasiHasil: '50 Ton / Musim', musimTanam: 'MT 1 (Nov - Feb)', musimPanen: 'Maret', kelompokTani: 'Poktan Tani Makmur', lokasi: 'Sawah Blok Krajan' });

  const [showAddPerangkat, setShowAddPerangkat] = useState(false);
  const [perangkatForm, setPerangkatForm] = useState({ nama: '', jabatan: '', foto: '' });

  const [showEditSejarah, setShowEditSejarah] = useState(false);
  const [sejarahText, setSejarahText] = useState(data.villageProfile.sejarah);

  const [showEditAPBDes, setShowEditAPBDes] = useState(false);
  const [apbdesForm, setApbdesForm] = useState({
    totalPendapatan: data.apbdesData.totalPendapatan,
    totalBelanja: data.apbdesData.totalBelanja
  });

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  // Close custom action dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.action-dropdown-container')) {
        setActiveActionDropdownId(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Handlers for Form Submissions
  const handleAddNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    data.addNews({
      title: newsForm.title,
      slug: newsForm.title.toLowerCase().replace(/\s+/g, '-'),
      category: newsForm.category,
      summary: newsForm.summary,
      content: newsForm.content,
      author: newsForm.author || 'Admin Desa Banyuurip',
      date: new Date().toISOString().split('T')[0],
      imageUrl: newsForm.imageUrl || 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80'
    });
    setShowAddNews(false);
    setNewsForm({ title: '', category: 'Pemerintahan', summary: '', content: '', author: 'Admin Desa Banyuurip', imageUrl: '' });
    alert('Berita baru berhasil diterbitkan & langsung tayang di portal publik!');
  };

  const handleAddDocSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    data.addLegalDoc(docForm);
    setShowAddDoc(false);
    setDocForm({ nomor: '', tahun: 2026, judul: '', kategori: 'Perdes', deskripsi: '', fileUrl: '#', tglTerbit: '2026-01-15', status: 'Berlaku' });
    alert('Dokumen regulasi hukum baru berhasil disimpan di database JDIH!');
  };

  const handleAddUMKMSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    data.addUMKM({
      ...umkmForm,
      omzetBulanan: Number(umkmForm.omzetBulanan),
      imageUrl: umkmForm.imageUrl || 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=600&q=80'
    });
    setShowAddUMKM(false);
    setUmkmForm({ namaUsaha: '', pemilik: '', kategori: 'Kuliner', deskripsi: '', alamat: '', kontak: '', omzetBulanan: 3000000, produkUtama: '', imageUrl: '' });
    alert('Usaha UMKM baru berhasil terverifikasi & tampil di Katalog Desa!');
  };

  const handleAddAgriSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    data.addAgriKomoditas({
      ...agriForm,
      luasLahan: Number(agriForm.luasLahan)
    });
    setShowAddAgri(false);
    alert('Data komoditas tani berhasil ditambahkan ke kalender tanam!');
  };

  const handleAddPerangkatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    data.addPerangkatDesa({
      nama: perangkatForm.nama,
      jabatan: perangkatForm.jabatan,
      foto: perangkatForm.foto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    });
    setShowAddPerangkat(false);
    setPerangkatForm({ nama: '', jabatan: '', foto: '' });
    alert('Perangkat Desa baru berhasil ditambahkan!');
  };

  const handleEditSejarahSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    data.updateSejarahDesa(sejarahText);
    setShowEditSejarah(false);
    alert('Narasi sejarah desa berhasil diperbarui di halaman Profil!');
  };

  const handleEditAPBDesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    data.updateAPBDes({
      totalPendapatan: Number(apbdesForm.totalPendapatan),
      totalBelanja: Number(apbdesForm.totalBelanja)
    });
    setShowEditAPBDes(false);
    alert('Anggaran APBDes 2026 berhasil diperbarui!');
  };

  // Helper styling for ISPA Risiko
  const getRisikoBadge = (risiko: ISPALogItem['risiko']) => {
    if (risiko === 'Tinggi') return 'bg-rose-100 text-rose-700 font-bold px-2.5 py-0.5 rounded-md text-[11px]';
    if (risiko === 'Sedang') return 'bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-md text-[11px]';
    return 'bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-md text-[11px]';
  };

  // Helper styling for Tindakan Admin Dot
  const getTindakanDot = (tindakan: ISPALogItem['tindakanAdmin']) => {
    if (tindakan === 'Dirujuk ke Faskes') return 'bg-rose-500';
    if (tindakan === 'Pemantauan Kader') return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getTindakanText = (tindakan: ISPALogItem['tindakanAdmin']) => {
    if (tindakan === 'Dirujuk ke Faskes') return 'text-rose-700 font-bold';
    if (tindakan === 'Pemantauan Kader') return 'text-amber-700 font-bold';
    return 'text-emerald-700 font-bold';
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col lg:flex-row font-sans">
      
      {/* LEFT SIDEBAR (Butter-Smooth Accordions & Clean Presisi) */}
      <aside className="w-full lg:w-72 bg-white border-r border-slate-200 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          
          {/* Logo Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center shadow-xs">
              <img src="/logo-boyolali.png" alt="Logo Kab. Boyolali" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-base block leading-none">Banyuurip</span>
              <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mt-1 block">PANEL PENGELOLA</span>
            </div>
          </div>

          {/* Nav Links Container */}
          <div className="space-y-4 text-xs font-bold">
            
            {/* Group UTAMA */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold px-3 block mb-1">UTAMA</span>
              <button
                onClick={() => setActiveMenu('ikhtisar')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full transition-all duration-200 text-xs ${
                  activeMenu === 'ikhtisar' ? 'bg-slate-950 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <ClipboardList className="w-4 h-4" />
                <span>Ikhtisar Data</span>
              </button>
            </div>

            {/* Group KELOLA PORTAL */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold px-3 block mb-1">KELOLA PORTAL</span>
              
              {/* 1. Kelola Berita */}
              <button
                onClick={() => setActiveMenu('berita')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                  activeMenu === 'berita' ? 'bg-slate-950 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Newspaper className="w-4 h-4 text-slate-500" />
                <span>Kelola Berita</span>
              </button>

              {/* 2. Portal Profil Desa (Accordion Smooth) */}
              <div className="space-y-0.5">
                <button
                  onClick={() => setOpenProfil(!openProfil)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors duration-200"
                >
                  <span className="flex items-center gap-3 font-bold">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    <span>Portal Profil Desa</span>
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${openProfil ? 'rotate-180' : ''}`} />
                </button>

                {/* Submenu Slide Container */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openProfil ? 'max-h-40 opacity-100 pt-1 pb-1' : 'max-h-0 opacity-0'}`}>
                  <div className="pl-7 space-y-1 border-l-2 border-slate-100 ml-4">
                    <button
                      onClick={() => setActiveMenu('sejarah')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-200 ${
                        activeMenu === 'sejarah' ? 'bg-emerald-50 text-emerald-900 font-bold border-l-2 border-emerald-600 pl-3.5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <History className="w-3.5 h-3.5 text-slate-400" />
                      <span>Kelola Sejarah</span>
                    </button>
                    <button
                      onClick={() => setActiveMenu('perangkat')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-200 ${
                        activeMenu === 'perangkat' ? 'bg-emerald-50 text-emerald-900 font-bold border-l-2 border-emerald-600 pl-3.5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>Perangkat Desa</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Portal Agribisnis (Accordion Smooth) */}
              <div className="space-y-0.5">
                <button
                  onClick={() => setOpenAgri(!openAgri)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors duration-200"
                >
                  <span className="flex items-center gap-3 font-bold">
                    <Sprout className="w-4 h-4 text-slate-500" />
                    <span>Portal Agribisnis</span>
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${openAgri ? 'rotate-180' : ''}`} />
                </button>

                {/* Submenu Slide Container */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openAgri ? 'max-h-40 opacity-100 pt-1 pb-1' : 'max-h-0 opacity-0'}`}>
                  <div className="pl-7 space-y-1 border-l-2 border-slate-100 ml-4">
                    <button
                      onClick={() => setActiveMenu('komoditas')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-200 ${
                        activeMenu === 'komoditas' ? 'bg-emerald-50 text-emerald-900 font-bold border-l-2 border-emerald-600 pl-3.5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <Wheat className="w-3.5 h-3.5 text-slate-400" />
                      <span>Komoditas Tani</span>
                    </button>
                    <button
                      onClick={() => setActiveMenu('aset_tani')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-200 ${
                        activeMenu === 'aset_tani' ? 'bg-emerald-50 text-emerald-900 font-bold border-l-2 border-emerald-600 pl-3.5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <Wrench className="w-3.5 h-3.5 text-slate-400" />
                      <span>Aset Mesin Tanam</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. Portal Transparansi (Accordion Smooth) */}
              <div className="space-y-0.5">
                <button
                  onClick={() => setOpenTransparansi(!openTransparansi)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors duration-200"
                >
                  <span className="flex items-center gap-3 font-bold">
                    <PieChart className="w-4 h-4 text-slate-500" />
                    <span>Portal Transparansi</span>
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${openTransparansi ? 'rotate-180' : ''}`} />
                </button>

                {/* Submenu Slide Container */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openTransparansi ? 'max-h-52 opacity-100 pt-1 pb-1' : 'max-h-0 opacity-0'}`}>
                  <div className="pl-7 space-y-1 border-l-2 border-slate-100 ml-4">
                    <button
                      onClick={() => setActiveMenu('regulasi')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-200 ${
                        activeMenu === 'regulasi' ? 'bg-emerald-50 text-emerald-900 font-bold border-l-2 border-emerald-600 pl-3.5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <FileCheck className="w-3.5 h-3.5 text-slate-400" />
                      <span>Regulasi Hukum</span>
                    </button>
                    <button
                      onClick={() => setActiveMenu('apbdes')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-200 ${
                        activeMenu === 'apbdes' ? 'bg-emerald-50 text-emerald-900 font-bold border-l-2 border-emerald-600 pl-3.5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <PieChart className="w-3.5 h-3.5 text-slate-400" />
                      <span>Anggaran APBDes</span>
                    </button>
                    <button
                      onClick={() => setActiveMenu('antikorupsi')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-200 ${
                        activeMenu === 'antikorupsi' ? 'bg-emerald-50 text-emerald-900 font-bold border-l-2 border-emerald-600 pl-3.5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="text-emerald-700 font-bold">Desa Antikorupsi</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 5. Direktori UMKM */}
              <button
                onClick={() => setActiveMenu('umkm')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                  activeMenu === 'umkm' ? 'bg-slate-950 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Store className="w-4 h-4 text-slate-500" />
                <span>Direktori UMKM</span>
              </button>

              {/* 6. Log Skrining ISPA */}
              <button
                onClick={() => setActiveMenu('ispa')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                  activeMenu === 'ispa' ? 'bg-slate-950 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <HeartPulse className="w-4 h-4 text-slate-500" />
                <span>Log Skrining ISPA</span>
              </button>

            </div>

          </div>
        </div>

        {/* Profile Card & Logout (Bottom Sidebar) */}
        <div className="pt-6 space-y-3 border-t border-slate-100">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-950 text-white font-bold text-xs flex items-center justify-center">
              A
            </div>
            <div className="text-xs">
              <span className="font-bold text-slate-900 block leading-tight">Admin Desa</span>
              <span className="text-[10px] text-slate-500">admin@banyuurip.desa.id</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-slate-950 hover:bg-slate-900 text-white font-bold py-2.5 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            Keluar Admin
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT AREA */}
      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-x-hidden">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Ikhtisar Data Desa</h1>
            <p className="text-xs text-slate-500 mt-0.5">Statistik, berita, dan log skrining kesehatan warga</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-slate-950 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Admin Mode
            </span>

            <Link
              href="/"
              className="bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold px-4 py-2 rounded-xl border border-slate-300 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              Portal Publik
            </Link>
          </div>
        </div>

        {/* 8 METRICS STATS CARDS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">TOTAL WARGA</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">3,420</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">SKRINING ISPA</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">{data.ispaLogs.length + 2}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">RISIKO TINGGI</span>
              <span className="text-2xl font-black text-rose-600 mt-1 block">3</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">UMKM TERDAFTAR</span>
              <span className="text-2xl font-black text-amber-600 mt-1 block">{data.umkmList.length + 5}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">DOKUMEN REGULASI</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">{data.legalDocs.length + 5} File</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">WARTA BERITA</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">{data.newsList.length + 3} Artikel</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <Newspaper className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">PERANGKAT DESA</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">{data.villageProfile.perangkatDesa.length + 7} Jiwa</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">DESA ANTIKORUPSI</span>
              <span className="text-2xl font-black text-emerald-600 mt-1 block">5 Drive</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* LOG HASIL SKRINING MANDIRI ISPA TABLE (Custom Floating Dropdown Menu) */}
        {(activeMenu === 'ikhtisar' || activeMenu === 'ispa') && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-visible">
            
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-indigo-600" />
                Log Hasil Skrining Mandiri ISPA (Terbaru)
              </h3>

              <button className="bg-indigo-50 text-indigo-700 font-extrabold text-xs px-3.5 py-1.5 rounded-xl border border-indigo-100">
                Tindakan Rujukan
              </button>
            </div>

            <div className="overflow-x-visible">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 font-extrabold uppercase text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="py-3.5 px-6">NAMA WARGA</th>
                    <th className="py-3.5 px-4">USIA</th>
                    <th className="py-3.5 px-4">RISIKO</th>
                    <th className="py-3.5 px-4">TANGGAL INPUT</th>
                    <th className="py-3.5 px-6">TINDAKAN ADMIN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {data.ispaLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900">{log.namaWarga}</td>
                      <td className="py-4 px-4 text-slate-500">{log.usia}</td>
                      <td className="py-4 px-4">
                        <span className={getRisikoBadge(log.risiko)}>{log.risiko}</span>
                      </td>
                      <td className="py-4 px-4 text-slate-500">{log.tanggalInput}</td>
                      <td className="py-4 px-6 relative action-dropdown-container">
                        {/* Custom Floating Action Trigger Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveActionDropdownId(activeActionDropdownId === log.id ? null : log.id);
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                        >
                          <span className={`w-2 h-2 rounded-full ${getTindakanDot(log.tindakanAdmin)}`}></span>
                          <span className={getTindakanText(log.tindakanAdmin)}>{log.tindakanAdmin}</span>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        </button>

                        {/* Custom Floating Popup Menu */}
                        {activeActionDropdownId === log.id && (
                          <div className="absolute top-full left-6 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                            {(['Edukasi Selesai', 'Pemantauan Kader', 'Dirujuk ke Faskes'] as const).map((opt) => (
                              <button
                                key={opt}
                                onClick={() => {
                                  data.updateISPATindakan(log.id, opt);
                                  setActiveActionDropdownId(null);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                                  log.tindakanAdmin === opt ? 'bg-slate-100 font-bold text-slate-900' : 'hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <span className={`w-2 h-2 rounded-full ${getTindakanDot(opt)}`}></span>
                                  <span>{opt}</span>
                                </span>
                                {log.tindakanAdmin === opt && <Check className="w-3.5 h-3.5 text-slate-900" />}
                              </button>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Dynamic CRUD Sections */}

        {/* 1. BERITA CRUD SECTION */}
        {activeMenu === 'berita' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Kelola Berita & Warta Desa</h3>
                <p className="text-xs text-slate-500">Tambah artikel berita baru atau hapus warta publik yang sudah lampau.</p>
              </div>
              <button
                onClick={() => setShowAddNews(true)}
                className="bg-slate-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Tambah Berita Baru
              </button>
            </div>

            <div className="space-y-3">
              {data.newsList.map((n) => (
                <div key={n.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">{n.category}</span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{n.title}</h4>
                    <p className="text-slate-500 line-clamp-1">{n.summary}</p>
                  </div>
                  <button onClick={() => data.deleteNews(n.id)} className="p-2 rounded-xl bg-rose-100 text-rose-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. KELOLA SEJARAH SECTION */}
        {activeMenu === 'sejarah' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Kelola Narasi Sejarah Desa</h3>
                <p className="text-xs text-slate-500">Sunting teks sejarah dan asal-usul Desa Banyuurip yang tampil di halaman Profil.</p>
              </div>
              <button
                onClick={() => setShowEditSejarah(true)}
                className="bg-slate-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" /> Sunting Sejarah
              </button>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2">
              <span className="font-bold text-slate-900 block text-sm">Teks Narasi Sejarah Aktif:</span>
              <p>{data.villageProfile.sejarah}</p>
            </div>
          </div>
        )}

        {/* 3. PERANGKAT DESA SECTION */}
        {activeMenu === 'perangkat' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Kelola Perangkat Desa Banyuurip</h3>
                <p className="text-xs text-slate-500">Kelola aparatur pemerintahan desa, jabatan, dan foto profil.</p>
              </div>
              <button
                onClick={() => setShowAddPerangkat(true)}
                className="bg-slate-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Tambah Perangkat Desa
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.villageProfile.perangkatDesa.map((p, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={p.foto} alt={p.nama} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{p.nama}</h4>
                      <p className="text-slate-500 font-semibold">{p.jabatan}</p>
                    </div>
                  </div>
                  <button onClick={() => data.deletePerangkatDesa(p.nama)} className="p-2 rounded-xl bg-rose-100 text-rose-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. KOMODITAS TANI SECTION */}
        {activeMenu === 'komoditas' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Komoditas Tani & Kalender Tanam</h3>
                <p className="text-xs text-slate-500">Pendataan tanaman pangan, hortikultura, peternakan, & estimasi hasil panen.</p>
              </div>
              <button
                onClick={() => setShowAddAgri(true)}
                className="bg-slate-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Tambah Komoditas Tani
              </button>
            </div>

            <div className="space-y-3">
              {data.agriData.komoditas.map((k) => (
                <div key={k.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">{k.kategori}</span>
                    <h4 className="font-bold text-slate-900 mt-1 text-sm">{k.nama}</h4>
                    <p className="text-slate-500">Luas/Jumlah: {k.luasLahan ? `${k.luasLahan} Ha` : `${k.jumlahTernak} Ekor`} • Hasil: {k.estimasiHasil} • Tanam: {k.musimTanam}</p>
                  </div>
                  <button onClick={() => data.deleteAgriKomoditas(k.id)} className="p-2 rounded-xl bg-rose-100 text-rose-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. ASET MESIN TANI SECTION */}
        {activeMenu === 'aset_tani' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b pb-4">
              <h3 className="font-bold text-lg text-slate-900">Aset Mesin & Gudang Pertanian Desa</h3>
              <p className="text-xs text-slate-500">Inventarisasi RMU, lumbung pangan, & UPPO pupuk komunal.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.agriData.logistikAset.map((aset) => (
                <div key={aset.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <span className="bg-cyan-100 text-cyan-800 font-bold px-2 py-0.5 rounded text-[10px]">{aset.kategori}</span>
                  <h4 className="font-bold text-slate-900">{aset.namaAset}</h4>
                  <p className="text-slate-500">• Kapasitas: <strong className="text-emerald-700">{aset.kapasitas}</strong></p>
                  <p className="text-slate-500">• Lokasi: {aset.lokasi}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. REGULASI HUKUM SECTION */}
        {activeMenu === 'regulasi' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Regulasi Hukum & Dokumen JDIH</h3>
                <p className="text-xs text-slate-500">Pengarsipan Perdes, Perkades, Keputusan Kades, & APBDes.</p>
              </div>
              <button
                onClick={() => setShowAddDoc(true)}
                className="bg-slate-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Tambah Dokumen Hukum
              </button>
            </div>

            <div className="space-y-3">
              {data.legalDocs.map((doc) => (
                <div key={doc.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px]">{doc.kategori}</span>
                    <h4 className="font-bold text-slate-900 mt-1">{doc.nomor} - {doc.judul}</h4>
                    <p className="text-slate-500 line-clamp-1">{doc.deskripsi}</p>
                  </div>
                  <button onClick={() => data.deleteLegalDoc(doc.id)} className="p-2 rounded-xl bg-rose-100 text-rose-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. ANGGARAN APBDES SECTION */}
        {activeMenu === 'apbdes' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Anggaran APBDes 2026</h3>
                <p className="text-xs text-slate-500">Transparansi nominal pendapatan & belanja desa.</p>
              </div>
              <button
                onClick={() => setShowEditAPBDes(true)}
                className="bg-slate-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" /> Sunting Nominal APBDes
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 space-y-1 text-xs">
                <span className="text-emerald-800 font-semibold block">Total Anggaran Pendapatan</span>
                <span className="text-2xl font-black text-emerald-700">Rp {data.apbdesData.totalPendapatan.toLocaleString('id-ID')}</span>
              </div>
              <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-1 text-xs">
                <span className="text-amber-800 font-semibold block">Total Anggaran Belanja</span>
                <span className="text-2xl font-black text-amber-700">Rp {data.apbdesData.totalBelanja.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        )}

        {/* 8. DESA ANTIKORUPSI SECTION */}
        {activeMenu === 'antikorupsi' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b pb-4">
              <h3 className="font-bold text-lg text-slate-900">Desa Antikorupsi & WBS Reports</h3>
              <p className="text-xs text-slate-500">Penanganan pengaduan anonim masyarakat & status tindak lanjut.</p>
            </div>

            <div className="space-y-4">
              {data.wbsList.map((wbs) => (
                <div key={wbs.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      {wbs.kodeLaporan}
                    </span>
                    <div className="flex gap-1.5">
                      {(['Diproses', 'Diverifikasi', 'Selesai'] as const).map((st) => (
                        <button
                          key={st}
                          onClick={() => data.updateWBSStatus(wbs.id, st)}
                          className={`px-2.5 py-1 rounded-lg font-bold ${wbs.status === st ? 'bg-slate-900 text-white' : 'bg-white border text-slate-600'}`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{wbs.judulLaporan}</h4>
                  <p className="text-slate-600 bg-white p-3 rounded-xl border">{wbs.deskripsi}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. DIREKTORI UMKM SECTION */}
        {activeMenu === 'umkm' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Direktori UMKM Desa</h3>
                <p className="text-xs text-slate-500">Verifikasi usaha warga & peninjauan omzet bulanan.</p>
              </div>
              <button
                onClick={() => setShowAddUMKM(true)}
                className="bg-slate-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Tambah UMKM Baru
              </button>
            </div>

            <div className="space-y-3">
              {data.umkmList.map((u) => (
                <div key={u.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{u.namaUsaha}</h4>
                    <p className="text-slate-500">Pemilik: <strong>{u.pemilik}</strong> • Omzet Bulanan: <span className="text-emerald-700 font-bold">Rp {u.omzetBulanan.toLocaleString('id-ID')}</span></p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => data.toggleVerifyUMKM(u.id)}
                      className={`px-3 py-1 rounded-xl font-bold ${u.isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}
                    >
                      {u.isVerified ? 'Verified' : 'Belum Verifikasi'}
                    </button>
                    <button onClick={() => data.deleteUMKM(u.id)} className="p-2 rounded-xl bg-rose-100 text-rose-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* RICH FORM MODALS WITH HINTS, PLACEHOLDERS & DESCRIPTIONS */}

      {/* 1. Modal Add Berita */}
      {showAddNews && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-emerald-600" /> Form Penerbitan Berita Baru
                </h3>
                <p className="text-[11px] text-slate-500">Lengkapi informasi artikel berita yang akan ditampilkan ke publik.</p>
              </div>
              <button onClick={() => setShowAddNews(false)} className="p-1.5 rounded-full hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleAddNewsSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Utama Berita</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Peluncuran Banyuurip Digital Gateway Resmi Diuji Coba"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Artikel</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option>Pemerintahan</option>
                    <option>Pertanian</option>
                    <option>Masyarakat</option>
                    <option>Kesehatan</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Penulis / Redaksi</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Tim Media Desa"
                    value={newsForm.author}
                    onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ringkasan Singkat (Lead Paragraph)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ringkasan 2-3 kalimat..."
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Isi Konten Berita Lengkap</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan berita secara lengkap..."
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowAddNews(false)} className="px-4 py-2.5 rounded-xl bg-slate-100 font-bold">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold">Terbitkan Berita</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Modal Add Dokumen Hukum */}
      {showAddDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-blue-600" /> Form Dokumen Regulasi JDIH
                </h3>
                <p className="text-[11px] text-slate-500">Pengarsipan peraturan perundang-undangan tingkat Desa Banyuurip.</p>
              </div>
              <button onClick={() => setShowAddDoc(false)} className="p-1.5 rounded-full hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleAddDocSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nomor Resmi Dokumen (Contoh: Perdes No. 05/2026)</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Perdes No. 01 Tahun 2026"
                  value={docForm.nomor}
                  onChange={(e) => setDocForm({ ...docForm, nomor: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jenis Kategori Regulasi</label>
                  <select
                    value={docForm.kategori}
                    onChange={(e) => setDocForm({ ...docForm, kategori: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option>Perdes</option>
                    <option>Perkades</option>
                    <option>Keputusan Kades</option>
                    <option>APBDes</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tahun Pengundangan</label>
                  <input
                    type="number"
                    required
                    placeholder="2026"
                    value={docForm.tahun}
                    onChange={(e) => setDocForm({ ...docForm, tahun: Number(e.target.value) })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Lengkap Dokumen Peraturan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Peraturan Desa tentang APBDes Banyuurip Tahun 2026"
                  value={docForm.judul}
                  onChange={(e) => setDocForm({ ...docForm, judul: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Uraian / Ringkasan Pokok Aturan</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Jelaskan mengenai pokok penetapan pasal..."
                  value={docForm.deskripsi}
                  onChange={(e) => setDocForm({ ...docForm, deskripsi: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Link Google Drive Dokumen (PDF Resmi)</label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/file/d/1A2b3C4d.../view"
                  value={docForm.fileUrl}
                  onChange={(e) => setDocForm({ ...docForm, fileUrl: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Masukkan URL Google Drive publik agar warga dapat langsung membaca berkas PDF Perdes</span>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowAddDoc(false)} className="px-4 py-2.5 rounded-xl bg-slate-100 font-bold">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold">Simpan Dokumen</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Modal Add UMKM */}
      {showAddUMKM && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Store className="w-5 h-5 text-amber-600" /> Form Tambah UMKM Desa
                </h3>
                <p className="text-[11px] text-slate-500">Registrasi usaha warga ke Direktori Publik & Pencatatan Keuangan.</p>
              </div>
              <button onClick={() => setShowAddUMKM(false)} className="p-1.5 rounded-full hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleAddUMKMSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Usaha / Merk Toko</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Keripik Singkong Barokah"
                    value={umkmForm.namaUsaha}
                    onChange={(e) => setUmkmForm({ ...umkmForm, namaUsaha: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Pemilik Usaha</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ibu Maryati"
                    value={umkmForm.pemilik}
                    onChange={(e) => setUmkmForm({ ...umkmForm, pemilik: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Produk Unggulan Utama</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Keripik Singkong Balado"
                    value={umkmForm.produkUtama}
                    onChange={(e) => setUmkmForm({ ...umkmForm, produkUtama: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimasi Omzet Bulanan (Rp)</label>
                  <input
                    type="number"
                    required
                    placeholder="4500000"
                    value={umkmForm.omzetBulanan}
                    onChange={(e) => setUmkmForm({ ...umkmForm, omzetBulanan: Number(e.target.value) })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Alamat Dusun / RT / RW</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Dusun Krajan RT 02 / RW 01"
                    value={umkmForm.alamat}
                    onChange={(e) => setUmkmForm({ ...umkmForm, alamat: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">No. WhatsApp / Kontak HP</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 0812-3456-7890"
                    value={umkmForm.kontak}
                    onChange={(e) => setUmkmForm({ ...umkmForm, kontak: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Singkat Keunggulan Usaha</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Deskripsikan keunggulan usaha..."
                  value={umkmForm.deskripsi}
                  onChange={(e) => setUmkmForm({ ...umkmForm, deskripsi: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowAddUMKM(false)} className="px-4 py-2.5 rounded-xl bg-slate-100 font-bold">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold">Daftarkan UMKM</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Modal Add Komoditas Tani */}
      {showAddAgri && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Wheat className="w-5 h-5 text-emerald-600" /> Form Komoditas & Kalender Tanam
                </h3>
                <p className="text-[11px] text-slate-500">Pendataan potensi agribisnis dan jadwal musim tanam desa.</p>
              </div>
              <button onClick={() => setShowAddAgri(false)} className="p-1.5 rounded-full hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleAddAgriSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Komoditas / Varietas</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Padi IR-64 / Cabai Merah"
                    value={agriForm.nama}
                    onChange={(e) => setAgriForm({ ...agriForm, nama: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Agribisnis</label>
                  <select
                    value={agriForm.kategori}
                    onChange={(e) => setAgriForm({ ...agriForm, kategori: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option>Tanaman Pangan</option>
                    <option>Hortikultura</option>
                    <option>Peternakan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Luas Lahan (Satuan Hektar / Ha)</label>
                  <input
                    type="number"
                    required
                    placeholder="Contoh: 145"
                    value={agriForm.luasLahan}
                    onChange={(e) => setAgriForm({ ...agriForm, luasLahan: Number(e.target.value) })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimasi Total Hasil Panen</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 870 Ton / Panen"
                    value={agriForm.estimasiHasil}
                    onChange={(e) => setAgriForm({ ...agriForm, estimasiHasil: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jadwal Musim Tanam (MT)</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: MT 1 (Nov - Feb)"
                    value={agriForm.musimTanam}
                    onChange={(e) => setAgriForm({ ...agriForm, musimTanam: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimasi Panen Raya</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Maret & Juli"
                    value={agriForm.musimPanen}
                    onChange={(e) => setAgriForm({ ...agriForm, musimPanen: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kelompok Tani (Poktan) Pengelola</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Poktan Tani Makmur I & II"
                  value={agriForm.kelompokTani}
                  onChange={(e) => setAgriForm({ ...agriForm, kelompokTani: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowAddAgri(false)} className="px-4 py-2.5 rounded-xl bg-slate-100 font-bold">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold">Simpan Komoditas</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Modal Add Perangkat Desa */}
      {showAddPerangkat && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600" /> Form Tambah Perangkat Desa
                </h3>
                <p className="text-[11px] text-slate-500">Pendataan aparatur pemerintah Desa Banyuurip.</p>
              </div>
              <button onClick={() => setShowAddPerangkat(false)} className="p-1.5 rounded-full hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleAddPerangkatSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap beserta Gelar</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bapak Sriyanto, S.Sos"
                  value={perangkatForm.nama}
                  onChange={(e) => setPerangkatForm({ ...perangkatForm, nama: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Jabatan Struktur Desa</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kepala Desa / Sekretaris Desa"
                  value={perangkatForm.jabatan}
                  onChange={(e) => setPerangkatForm({ ...perangkatForm, jabatan: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Foto Profil (Opsional)</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={perangkatForm.foto}
                  onChange={(e) => setPerangkatForm({ ...perangkatForm, foto: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowAddPerangkat(false)} className="px-4 py-2.5 rounded-xl bg-slate-100 font-bold">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold">Simpan Perangkat</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Modal Edit Sejarah */}
      {showEditSejarah && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <History className="w-5 h-5 text-indigo-600" /> Sunting Narasi Sejarah Desa
                </h3>
                <p className="text-[11px] text-slate-500">Perbarui teks dokumentasi sejarah Desa Banyuurip.</p>
              </div>
              <button onClick={() => setShowEditSejarah(false)} className="p-1.5 rounded-full hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleEditSejarahSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Narasi Sejarah & Asal-usul Desa</label>
                <textarea
                  rows={6}
                  required
                  value={sejarahText}
                  onChange={(e) => setSejarahText(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowEditSejarah(false)} className="px-4 py-2.5 rounded-xl bg-slate-100 font-bold">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold">Simpan Sejarah</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Modal Edit APBDes */}
      {showEditAPBDes && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-amber-600" /> Sunting Nominal APBDes 2026
                </h3>
                <p className="text-[11px] text-slate-500">Perbarui total nominal pendapatan dan belanja desa.</p>
              </div>
              <button onClick={() => setShowEditAPBDes(false)} className="p-1.5 rounded-full hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleEditAPBDesSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Total Nominal Pendapatan Desa (Rp)</label>
                <input
                  type="number"
                  required
                  placeholder="1845000000"
                  value={apbdesForm.totalPendapatan}
                  onChange={(e) => setApbdesForm({ ...apbdesForm, totalPendapatan: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Total Nominal Belanja Desa (Rp)</label>
                <input
                  type="number"
                  required
                  placeholder="1812000000"
                  value={apbdesForm.totalBelanja}
                  onChange={(e) => setApbdesForm({ ...apbdesForm, totalBelanja: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowEditAPBDes(false)} className="px-4 py-2.5 rounded-xl bg-slate-100 font-bold">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold">Simpan APBDes</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
