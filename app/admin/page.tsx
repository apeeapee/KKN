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
  Check,
  Package
} from 'lucide-react';
import { useData } from '@/components/DataProvider';
import { ISPALogItem, NewsItem, UMKMItem, AdminUser } from '@/lib/mock-data';

export default function AdminDashboardPage() {
  const router = useRouter();
  const data = useData();

  // Active Menu Section State
  const [activeMenu, setActiveMenu] = useState<
    'ikhtisar' | 'berita' | 'sejarah' | 'perangkat' | 'komoditas' | 'aset_tani' | 'regulasi' | 'apbdes' | 'antikorupsi' | 'umkm' | 'ispa' | 'users'
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
  const [editingNewsItem, setEditingNewsItem] = useState<NewsItem | null>(null);

  const [showAddDoc, setShowAddDoc] = useState(false);
  const [docForm, setDocForm] = useState({ nomor: '', tahun: 2026, judul: '', kategori: 'Perdes', deskripsi: '', fileUrl: '#', tglTerbit: '2026-01-15', status: 'Berlaku' });

  const [showAddUMKM, setShowAddUMKM] = useState(false);
  const [umkmForm, setUmkmForm] = useState({ namaUsaha: '', pemilik: '', kategori: 'Kuliner', deskripsi: '', alamat: '', kontak: '', omzetBulanan: 3000000, produkUtama: '', imageUrl: '' });
  const [editingUMKMItem, setEditingUMKMItem] = useState<UMKMItem | null>(null);

  const [showAddUser, setShowAddUser] = useState(false);
  const [userForm, setUserForm] = useState<{
    username: string;
    namaLengkap: string;
    jabatan: string;
    role: 'Super Admin' | 'Admin Perangkat Desa';
    password: string;
    status: 'Aktif' | 'Nonaktif';
    avatarUrl: string;
  }>({
    username: '',
    namaLengkap: '',
    jabatan: 'Admin Perangkat Desa',
    role: 'Admin Perangkat Desa',
    password: 'banyuurip2026',
    status: 'Aktif',
    avatarUrl: ''
  });
  const [editingUserItem, setEditingUserItem] = useState<AdminUser | null>(null);

  const [showAddAgri, setShowAddAgri] = useState(false);
  const [agriForm, setAgriForm] = useState({ nama: '', kategori: 'Tanaman Pangan', luasLahan: 10, estimasiHasil: '50 Ton / Musim', musimTanam: 'MT 1 (Nov - Feb)', musimPanen: 'Maret', kelompokTani: 'Poktan Tani Makmur', lokasi: 'Sawah Blok Krajan' });

  const [showAddBalaiAsset, setShowAddBalaiAsset] = useState(false);
  const [balaiAssetForm, setBalaiAssetForm] = useState({
    namaAset: '',
    kategori: 'Peralatan Acara & Hajatan',
    kapasitas: '',
    lokasi: 'Gudang Balai Desa Banyuurip',
    status: 'Tersedia',
    syarat: 'KTP Warga Banyuurip & Surat Permohonan ke Kaur Umum',
    penanggungJawab: 'Pak Bambang (Kaur Umum)'
  });

  const [showAddAntiKorupsiModal, setShowAddAntiKorupsiModal] = useState(false);
  const [antiKorupsiForm, setAntiKorupsiForm] = useState({
    kodeIndikator: `IND-0${data.antiKorupsiIndikatorList.length + 1}`,
    judul: '',
    kategori: 'Penataan Tatalaksana',
    deskripsi: '',
    status: 'Terpenuhi 100%' as const,
    gdriveUrl: '',
    tahun: 2026
  });

  const [showAddPerangkat, setShowAddPerangkat] = useState(false);
  const [perangkatForm, setPerangkatForm] = useState({ nama: '', jabatan: '', foto: '' });

  const [showEditSejarah, setShowEditSejarah] = useState(false);
  const [sejarahText, setSejarahText] = useState(data.villageProfile.sejarah);

  const [showEditAPBDes, setShowEditAPBDes] = useState(false);
  const [apbdesItemsForm, setApbdesItemsForm] = useState(data.apbdesData.pendapatan || []);
  const [apbdesBelanjaForm, setApbdesBelanjaForm] = useState(data.apbdesData.totalBelanja || 1550000000);

  const [agriSubTab, setAgriSubTab] = useState<'komoditas' | 'poktan' | 'lahan'>('komoditas');
  const [showAddPoktanModal, setShowAddPoktanModal] = useState(false);
  const [poktanForm, setPoktanForm] = useState({ nama: '', ketua: '', alamat: '', anggota: 50 });
  const [gapoktanForm, setGapoktanForm] = useState({
    nama: data.agriData.gapoktanInfo?.nama || 'Subur Makmur',
    ketua: data.agriData.gapoktanInfo?.ketua || 'Bapak Darji'
  });
  const [lahanForm, setLahanForm] = useState(data.agriData.luasWilayahPertanian || []);

  const handleLogout = async () => {
    localStorage.removeItem('byu_admin_session');
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

  // Image File Upload Helper (converts to Base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran foto terlalu besar! Maksimal 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          callback(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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

  const handleEditNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNewsItem) return;
    data.updateNews(editingNewsItem.id, {
      title: editingNewsItem.title,
      category: editingNewsItem.category,
      author: editingNewsItem.author,
      summary: editingNewsItem.summary,
      content: editingNewsItem.content,
      imageUrl: editingNewsItem.imageUrl || 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80'
    });
    setEditingNewsItem(null);
    alert('Data berita berhasil diperbarui!');
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

  const handleEditUMKMSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUMKMItem) return;
    data.updateUMKM(editingUMKMItem.id, {
      namaUsaha: editingUMKMItem.namaUsaha,
      pemilik: editingUMKMItem.pemilik,
      kategori: editingUMKMItem.kategori,
      produkUtama: editingUMKMItem.produkUtama,
      omzetBulanan: Number(editingUMKMItem.omzetBulanan),
      alamat: editingUMKMItem.alamat,
      kontak: editingUMKMItem.kontak,
      deskripsi: editingUMKMItem.deskripsi,
      imageUrl: editingUMKMItem.imageUrl || 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=600&q=80'
    });
    setEditingUMKMItem(null);
    alert('Data UMKM berhasil diperbarui!');
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.username || !userForm.namaLengkap) {
      alert('Mohon lengkapi username dan nama lengkap admin.');
      return;
    }
    const exists = (data.adminUsers || []).some(u => u.username.toLowerCase() === userForm.username.toLowerCase());
    if (exists) {
      alert(`Username "${userForm.username}" sudah digunakan! Gunakan username lain.`);
      return;
    }

    data.addAdminUser({
      username: userForm.username.toLowerCase().trim(),
      namaLengkap: userForm.namaLengkap,
      jabatan: userForm.jabatan || 'Admin Perangkat Desa',
      role: userForm.role,
      password: userForm.password || 'banyuurip2026',
      status: userForm.status,
      avatarUrl: userForm.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    });
    setShowAddUser(false);
    setUserForm({
      username: '',
      namaLengkap: '',
      jabatan: 'Admin Perangkat Desa',
      role: 'Admin Perangkat Desa',
      password: 'banyuurip2026',
      status: 'Aktif',
      avatarUrl: ''
    });
    alert('Akun Admin baru berhasil didaftarkan! Akun ini dapat langsung digunakan untuk login.');
  };

  const handleEditUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUserItem) return;
    data.updateAdminUser(editingUserItem.id, {
      username: editingUserItem.username.toLowerCase().trim(),
      namaLengkap: editingUserItem.namaLengkap,
      jabatan: editingUserItem.jabatan,
      role: editingUserItem.role,
      password: editingUserItem.password,
      status: editingUserItem.status,
      avatarUrl: editingUserItem.avatarUrl
    });
    setEditingUserItem(null);
    alert('Data akun admin berhasil diperbarui!');
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

  const handleAddBalaiAssetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    data.addBalaiDesaAsset(balaiAssetForm);
    setShowAddBalaiAsset(false);
    setBalaiAssetForm({
      namaAset: '',
      kategori: 'Peralatan Acara & Hajatan',
      kapasitas: '',
      lokasi: 'Gudang Balai Desa Banyuurip',
      status: 'Tersedia',
      syarat: 'KTP Warga Banyuurip & Surat Permohonan ke Kaur Umum',
      penanggungJawab: 'Pak Bambang (Kaur Umum)'
    });
    alert('Aset Balai Desa baru berhasil ditambahkan ke inventaris publik!');
  };

  const handleAddAntiKorupsiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    data.addAntiKorupsiIndikator(antiKorupsiForm);
    setShowAddAntiKorupsiModal(false);
    setAntiKorupsiForm({
      kodeIndikator: `IND-0${data.antiKorupsiIndikatorList.length + 2}`,
      judul: '',
      kategori: 'Penataan Tatalaksana',
      deskripsi: '',
      status: 'Terpenuhi 100%',
      gdriveUrl: '',
      tahun: 2026
    });
    alert('Indikator Integritas Desa Anti Korupsi baru berhasil disimpan!');
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
    const calculatedTotalPendapatan = apbdesItemsForm.reduce((acc, curr) => acc + Number(curr.anggaran), 0);
    const calculatedTotalRealisasi = apbdesItemsForm.reduce((acc, curr) => acc + Number(curr.realisasi), 0);
    
    const updatedPendapatanList = apbdesItemsForm.map((item) => {
      const angg = Number(item.anggaran) || 1;
      const real = Number(item.realisasi) || 0;
      const porsi = calculatedTotalPendapatan > 0 ? Number(((angg / calculatedTotalPendapatan) * 100).toFixed(2)) : 0;
      const pct = Number(((real / angg) * 100).toFixed(1));
      return {
        ...item,
        anggaran: angg,
        realisasi: real,
        jumlah: angg,
        persen: pct,
        porsiAnggaran: porsi
      };
    });

    data.updateAPBDes({
      totalPendapatan: calculatedTotalPendapatan,
      totalRealisasiPendapatan: calculatedTotalRealisasi,
      totalBelanja: Number(apbdesBelanjaForm),
      pendapatan: updatedPendapatanList
    });
    setShowEditAPBDes(false);
    alert('Data Rincian Anggaran & Realisasi APBDes 2026 berhasil diperbarui!');
  };

  const handleAddPoktanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentList = data.agriData.poktanList || [];
    data.updateAgriData({
      poktanList: [...currentList, { ...poktanForm, anggota: Number(poktanForm.anggota) }]
    });
    setShowAddPoktanModal(false);
    setPoktanForm({ nama: '', ketua: '', alamat: '', anggota: 50 });
    alert('Kelompok Tani (Poktan) baru berhasil ditambahkan!');
  };

  const handleDeletePoktan = (idx: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus kelompok tani ini?')) return;
    const currentList = data.agriData.poktanList || [];
    const updated = currentList.filter((_, i) => i !== idx);
    data.updateAgriData({ poktanList: updated });
  };

  const handleUpdateGapoktan = (e: React.FormEvent) => {
    e.preventDefault();
    data.updateAgriData({
      gapoktanInfo: {
        nama: gapoktanForm.nama,
        ketua: gapoktanForm.ketua,
        jumlahPoktan: (data.agriData.poktanList || []).length
      }
    });
    alert('Data Gapoktan berhasil diperbarui!');
  };

  const handleUpdateLahan = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedTotalLuas = lahanForm.reduce((acc, curr) => acc + Number(curr.luas || 0), 0);
    const formattedList = lahanForm.map(l => ({ jenisLahan: l.jenisLahan, luas: Number(l.luas || 0) }));
    data.updateAgriData({
      luasWilayahPertanian: formattedList,
      totalLuasWilayah: Number(calculatedTotalLuas.toFixed(2))
    });
    alert(`Data Sebaran Luas Wilayah Pertanian berhasil diperbarui! (Total: ${calculatedTotalLuas.toFixed(2)} Ha)`);
  };

  const handleAddLahanRow = () => {
    setLahanForm([...lahanForm, { jenisLahan: 'Lahan Baru', luas: 10 }]);
  };

  const handleDeleteLahanRow = (idx: number) => {
    setLahanForm(lahanForm.filter((_, i) => i !== idx));
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
                      <Package className="w-3.5 h-3.5 text-slate-400" />
                      <span>Peminjaman Aset Balai Desa</span>
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

              {/* 7. Kelola Pengguna & Akun Admin */}
              <button
                onClick={() => setActiveMenu('users')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                  activeMenu === 'users' ? 'bg-slate-950 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Users className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-bold">Kelola Akun Admin</span>
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
                    <th className="py-3.5 px-6 text-right">AKSI</th>
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
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Hapus data log skrining ISPA atas nama "${log.namaWarga}"?`)) {
                              data.deleteISPALog(log.id);
                            }
                          }}
                          className="p-2 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors inline-flex items-center justify-center"
                          title="Hapus Log ISPA"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
                <div key={n.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                      <img src={n.imageUrl} alt={n.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">{n.category}</span>
                      <h4 className="font-bold text-slate-900 text-sm mt-0.5">{n.title}</h4>
                      <p className="text-slate-500 line-clamp-1">{n.summary}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingNewsItem(n)}
                      className="p-2 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold flex items-center gap-1"
                      title="Sunting Berita"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => data.deleteNews(n.id)} className="p-2 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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
              <p className="whitespace-pre-line">{data.villageProfile.sejarah}</p>
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

        {/* 4. KOMODITAS & DATA PERTANIAN SECTION */}
        {activeMenu === 'komoditas' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Kelola Sektor Pertanian Desa Banyuurip</h3>
                <p className="text-xs text-slate-500">Pendataan komoditas, kelembagaan 9 Poktan/Gapoktan, dan sebaran lahan pertanian.</p>
              </div>

              {/* Sub-tabs */}
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setAgriSubTab('komoditas')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${agriSubTab === 'komoditas' ? 'bg-white shadow text-emerald-800' : 'text-slate-600'}`}
                >
                  Komoditas Tani
                </button>
                <button
                  onClick={() => setAgriSubTab('poktan')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${agriSubTab === 'poktan' ? 'bg-white shadow text-emerald-800' : 'text-slate-600'}`}
                >
                  9 Poktan & Gapoktan
                </button>
                <button
                  onClick={() => setAgriSubTab('lahan')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${agriSubTab === 'lahan' ? 'bg-white shadow text-emerald-800' : 'text-slate-600'}`}
                >
                  Luas Wilayah Pertanian
                </button>
              </div>
            </div>

            {/* Sub-tab 1: Komoditas */}
            {agriSubTab === 'komoditas' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm text-slate-900">Daftar Komoditas Tani & Hasil Panen</h4>
                  <button
                    onClick={() => setShowAddAgri(true)}
                    className="bg-slate-950 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Komoditas
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

            {/* Sub-tab 2: 9 Poktan & Gapoktan */}
            {agriSubTab === 'poktan' && (
              <div className="space-y-6">
                
                {/* Gapoktan Form Card */}
                <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-200 space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-emerald-900 text-sm">Informasi Gapoktan (Gabungan Kelompok Tani)</span>
                    <button onClick={handleUpdateGapoktan} className="bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-xl">Simpan Gapoktan</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Nama Gapoktan</label>
                      <input
                        type="text"
                        value={gapoktanForm.nama}
                        onChange={(e) => setGapoktanForm({ ...gapoktanForm, nama: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Ketua Gapoktan</label>
                      <input
                        type="text"
                        value={gapoktanForm.ketua}
                        onChange={(e) => setGapoktanForm({ ...gapoktanForm, ketua: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 9 Poktan List */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-sm text-slate-900">Daftar 9 Kelompok Tani (Poktan) Terdaftar</h4>
                    <button
                      onClick={() => setShowAddPoktanModal(true)}
                      className="bg-slate-950 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Tambah Poktan Baru
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {(data.agriData.poktanList || []).map((p, idx) => (
                      <div key={idx} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2 relative">
                        <div className="flex justify-between items-center border-b pb-1.5">
                          <h5 className="font-bold text-slate-900">{p.nama}</h5>
                          <button onClick={() => handleDeletePoktan(idx)} className="p-1 rounded text-rose-600 hover:bg-rose-50"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className="text-[11px] text-slate-600 space-y-0.5">
                          <p><strong className="text-slate-500">Ketua:</strong> {p.ketua}</p>
                          <p><strong className="text-slate-500">Alamat:</strong> {p.alamat}</p>
                          <p><strong className="text-slate-500">Anggota:</strong> <span className="font-bold text-emerald-700">{p.anggota} Orang</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Sub-tab 3: Luas Wilayah Pertanian (Editable) */}
            {agriSubTab === 'lahan' && (
              <form onSubmit={handleUpdateLahan} className="space-y-6 text-xs">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Sunting Data Sebaran Luas Wilayah Pertanian (BPP Kecamatan Klego)</h4>
                    <p className="text-slate-500">Ubah nominal hektar (Ha) tiap jenis penggunaan lahan. Total otomatis dihitung oleh sistem.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAddLahanRow}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-2 rounded-xl flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Tambah Baris Lahan
                    </button>
                    <button
                      type="submit"
                      className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-4 py-2 rounded-xl shadow-xs"
                    >
                      Simpan Data Luas Lahan
                    </button>
                  </div>
                </div>

                {/* Calculated Total Callout */}
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 flex items-center justify-between">
                  <span className="font-semibold text-emerald-900">Total Akumulasi Luas Wilayah Pertanian:</span>
                  <span className="text-xl font-black text-emerald-700">
                    {lahanForm.reduce((acc, curr) => acc + Number(curr.luas || 0), 0).toFixed(2)} Ha
                  </span>
                </div>

                {/* Form Input Rows Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lahanForm.map((lahan, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase">Kategori #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteLahanRow(idx)}
                          className="p-1 rounded text-rose-600 hover:bg-rose-100 transition-colors"
                          title="Hapus Baris Ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Jenis Penggunaan Lahan</label>
                        <input
                          type="text"
                          required
                          value={lahan.jenisLahan}
                          onChange={(e) => {
                            const newArr = [...lahanForm];
                            newArr[idx].jenisLahan = e.target.value;
                            setLahanForm(newArr);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Luas (Hektar / Ha)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={lahan.luas}
                          onChange={(e) => {
                            const newArr = [...lahanForm];
                            newArr[idx].luas = Number(e.target.value);
                            setLahanForm(newArr);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono font-bold text-emerald-700"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-2 border-t">
                  <button
                    type="submit"
                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-6 py-2.5 rounded-xl shadow-xs"
                  >
                    Simpan Data Luas Lahan
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

        {/* 5. PEMINJAMAN ASET BALAI DESA SECTION */}
        {activeMenu === 'aset_tani' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Peminjaman & Inventaris Aset Balai Desa</h3>
                <p className="text-xs text-slate-500">Kelola inventarisasi barang Balai Desa dan ubah status ketersediaannya secara real-time.</p>
              </div>
              <button
                onClick={() => setShowAddBalaiAsset(true)}
                className="bg-slate-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Tambah Barang Aset
              </button>
            </div>

            <div className="space-y-3">
              {data.agriData.logistikAset.map((aset) => (
                <div key={aset.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="bg-slate-200 text-slate-800 font-bold px-2 py-0.5 rounded text-[10px]">{aset.kategori}</span>
                    <h4 className="font-bold text-slate-900 mt-1 text-sm">{aset.namaAset}</h4>
                    <p className="text-slate-500">Kapasitas: {aset.kapasitas} • Lokasi: {aset.lokasi}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={aset.status}
                      onChange={(e) => data.updateBalaiDesaAssetStatus(aset.id, e.target.value)}
                      className={`p-2 rounded-xl border text-xs font-bold ${
                        aset.status === 'Tersedia' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}
                    >
                      <option value="Tersedia">Tersedia</option>
                      <option value="Sedang Dipinjam">Sedang Dipinjam</option>
                    </select>
                    <button onClick={() => data.deleteBalaiDesaAsset(aset.id)} className="p-2 rounded-xl bg-rose-100 text-rose-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. REGULASI HUKUM JDIH SECTION */}
        {activeMenu === 'regulasi' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Peraturan Desa & JDIH Hukum</h3>
                <p className="text-xs text-slate-500">Pengarsipan Perdes, Perkades, Keputusan Kades, & APBDes.</p>
              </div>
              <button
                onClick={() => setShowAddDoc(true)}
                className="bg-slate-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Tambah Berkas JDIH
              </button>
            </div>

            <div className="space-y-3">
              {data.legalDocs.map((doc) => (
                <div key={doc.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded text-[10px]">{doc.kategori} • {doc.tahun}</span>
                    <h4 className="font-bold text-slate-900 mt-1 text-sm">{doc.judul}</h4>
                    <p className="text-slate-500">Nomor: {doc.nomor} • {doc.deskripsi}</p>
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
                <h3 className="font-bold text-lg text-slate-900">Kelola Anggaran & Realisasi APBDes 2026</h3>
                <p className="text-xs text-slate-500">Kelola rincian 5 sumber pendapatan desa (Anggaran & Realisasi) dan total belanja.</p>
              </div>
              <button
                onClick={() => {
                  setApbdesItemsForm(data.apbdesData.pendapatan || []);
                  setApbdesBelanjaForm(data.apbdesData.totalBelanja || 1550000000);
                  setShowEditAPBDes(true);
                }}
                className="bg-slate-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" /> Sunting Rincian APBDes 2026
              </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 space-y-1 text-xs">
                <span className="text-emerald-800 font-semibold block">Total Anggaran Pendapatan</span>
                <span className="text-2xl font-black text-emerald-700">Rp {(data.apbdesData.totalPendapatan || 0).toLocaleString('id-ID')}</span>
              </div>
              <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200 space-y-1 text-xs">
                <span className="text-blue-800 font-semibold block">Total Realisasi Terkumpul</span>
                <span className="text-2xl font-black text-blue-700">Rp {(data.apbdesData.totalRealisasiPendapatan || 0).toLocaleString('id-ID')}</span>
              </div>
              <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-1 text-xs">
                <span className="text-amber-800 font-semibold block">Total Anggaran Belanja</span>
                <span className="text-2xl font-black text-amber-700">Rp {(data.apbdesData.totalBelanja || 0).toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* 5 Revenue Items Table */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Rincian 5 Sumber Pendapatan Desa</h4>
              <div className="space-y-2">
                {(data.apbdesData.pendapatan || []).map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.warna || '#10b981' }}></span>
                      <div>
                        <h5 className="font-bold text-slate-900 text-sm">{item.sumber}</h5>
                        <p className="text-slate-500">Porsi: <strong>{item.porsiAnggaran}%</strong> dari Rp 1,59M</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-right">
                      <div>
                        <span className="text-slate-400 text-[10px] block font-medium">Anggaran Target</span>
                        <span className="font-extrabold text-slate-900">Rp {(item.anggaran || 0).toLocaleString('id-ID')}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block font-medium">Realisasi Kas</span>
                        <span className="font-extrabold text-emerald-700">Rp {(item.realisasi || 0).toLocaleString('id-ID')} ({item.persen}%)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 8. DESA ANTIKORUPSI SECTION */}
        {activeMenu === 'antikorupsi' && (
          <div className="space-y-6">
            
            {/* Part 1: Indikator & Dokumen GDrive */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    Kelola Indikator & Dokumen GDrive Desa Anti Korupsi
                  </h3>
                  <p className="text-xs text-slate-500">Kelola 5 Indikator Integritas KPK beserta Tautan File Bukti di Google Drive.</p>
                </div>
                <button
                  onClick={() => setShowAddAntiKorupsiModal(true)}
                  className="bg-slate-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Tambah Indikator Anti Korupsi
                </button>
              </div>

              <div className="space-y-3">
                {data.antiKorupsiIndikatorList.map((ind) => (
                  <div key={ind.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">{ind.kategori}</span>
                        <span className="font-mono text-slate-400 text-[10px] font-bold">{ind.kodeIndikator}</span>
                        <span className="text-emerald-700 font-bold text-[10px]">✓ {ind.status}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{ind.judul}</h4>
                      <p className="text-slate-500 line-clamp-1">{ind.deskripsi}</p>
                      {ind.gdriveUrl && (
                        <a href={ind.gdriveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] text-blue-600 font-bold hover:underline">
                          <ExternalLink className="w-3 h-3" /> Link GDrive: {ind.gdriveUrl}
                        </a>
                      )}
                    </div>
                    <button onClick={() => data.deleteAntiKorupsiIndikator(ind.id)} className="p-2 rounded-xl bg-rose-100 text-rose-700 shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 9. DIREKTORI UMKM SECTION */}
        {activeMenu === 'umkm' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Direktori UMKM Desa</h3>
                <p className="text-xs text-slate-500">Verifikasi usaha warga & pendataan katalog produk UMKM.</p>
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
                <div key={u.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                      <img src={u.imageUrl} alt={u.namaUsaha} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{u.namaUsaha}</h4>
                      <p className="text-slate-500">Pemilik: <strong>{u.pemilik}</strong> • Produk: <span className="text-emerald-700 font-bold">{u.produkUtama}</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => data.toggleVerifyUMKM(u.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold ${u.isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}
                    >
                      {u.isVerified ? 'Verified' : 'Belum Verifikasi'}
                    </button>
                    <button
                      onClick={() => setEditingUMKMItem(u)}
                      className="p-2 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold flex items-center gap-1"
                      title="Sunting UMKM"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => data.deleteUMKM(u.id)} className="p-2 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 11. KELOLA PENGGUNA & AKUN ADMIN SECTION */}
        {activeMenu === 'users' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" /> Kelola Pengguna & Akun Admin Desa
                </h3>
                <p className="text-xs text-slate-500">Kelola hak akses login, perbarui kata sandi, atau tambahkan akun admin baru untuk Perangkat Desa.</p>
              </div>
              <button
                onClick={() => setShowAddUser(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" /> Tambah Akun Admin Baru
              </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 text-xs font-medium block">Total Akun Admin</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">{(data.adminUsers || []).length} Akun</span>
              </div>
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                <span className="text-emerald-800 text-xs font-medium block">Akun Admin Aktif</span>
                <span className="text-2xl font-black text-emerald-700 mt-1 block">
                  {(data.adminUsers || []).filter(u => u.status === 'Aktif').length} Akun
                </span>
              </div>
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
                <span className="text-blue-800 text-xs font-medium block">Super Admin Sistem</span>
                <span className="text-2xl font-black text-blue-700 mt-1 block">
                  {(data.adminUsers || []).filter(u => u.role === 'Super Admin').length} Akun
                </span>
              </div>
            </div>

            {/* Admin Users Table / Cards List */}
            <div className="space-y-3">
              {(data.adminUsers || []).map((u) => (
                <div key={u.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-emerald-900 shrink-0 border border-slate-300">
                      <img src={u.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'} alt={u.namaLengkap} className="w-full h-full object-cover" />
                      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${u.status === 'Aktif' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{u.namaLengkap}</h4>
                        <span className="font-mono text-[10px] text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded">@{u.username}</span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Jabatan: <strong className="text-slate-700">{u.jabatan}</strong> • Dibuat: {u.createdAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold ${
                      u.role === 'Super Admin' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-blue-100 text-blue-800 border border-blue-300'
                    }`}>
                      {u.role}
                    </span>

                    <button
                      onClick={() => data.toggleStatusAdminUser(u.id)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
                        u.status === 'Aktif' ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-slate-300 text-slate-700 hover:bg-slate-400'
                      }`}
                    >
                      {u.status}
                    </button>

                    <button
                      onClick={() => setEditingUserItem(u)}
                      className="p-2 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold flex items-center gap-1"
                      title="Sunting Akun"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Apakah Anda yakin ingin menghapus akun admin @${u.username}?`)) {
                          data.deleteAdminUser(u.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200"
                      title="Hapus Akun"
                    >
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
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
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
                <label className="block font-bold text-slate-700 mb-1">Foto Sampul / Thumbnail Berita</label>
                <div className="space-y-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 block mb-1">Unggah Foto dari Perangkat (Galeri HP / Laptop):</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, (url) => setNewsForm({ ...newsForm, imageUrl: url }))}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 cursor-pointer"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 block mb-1">Atau Gunakan Link Foto (URL Gambar):</span>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={newsForm.imageUrl}
                      onChange={(e) => setNewsForm({ ...newsForm, imageUrl: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono text-[11px]"
                    />
                  </div>
                  {newsForm.imageUrl && (
                    <div className="pt-2 border-t flex items-center gap-3">
                      <div className="w-20 h-14 rounded-xl overflow-hidden border border-slate-300 shrink-0 bg-slate-200">
                        <img src={newsForm.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-[11px]">
                        <span className="font-bold text-emerald-800 block">Preview Foto Terpilih</span>
                        <span className="text-slate-500">Tampil di beranda & portal berita publik</span>
                      </div>
                    </div>
                  )}
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

      {/* Modal Edit Berita */}
      {editingNewsItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-emerald-600" /> Sunting Artikel Berita
                </h3>
                <p className="text-[11px] text-slate-500">Perbarui judul, konten, atau foto sampul artikel berita.</p>
              </div>
              <button onClick={() => setEditingNewsItem(null)} className="p-1.5 rounded-full hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleEditNewsSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Utama Berita</label>
                <input
                  type="text"
                  required
                  value={editingNewsItem.title}
                  onChange={(e) => setEditingNewsItem({ ...editingNewsItem, title: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Artikel</label>
                  <select
                    value={editingNewsItem.category}
                    onChange={(e) => setEditingNewsItem({ ...editingNewsItem, category: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300"
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
                    value={editingNewsItem.author}
                    onChange={(e) => setEditingNewsItem({ ...editingNewsItem, author: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Foto Sampul / Thumbnail Berita</label>
                <div className="space-y-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 block mb-1">Unggah Foto Baru dari Perangkat:</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, (url) => setEditingNewsItem({ ...editingNewsItem, imageUrl: url }))}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 cursor-pointer"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 block mb-1">Atau Ubah Link Foto (URL):</span>
                    <input
                      type="url"
                      value={editingNewsItem.imageUrl}
                      onChange={(e) => setEditingNewsItem({ ...editingNewsItem, imageUrl: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono text-[11px]"
                    />
                  </div>
                  {editingNewsItem.imageUrl && (
                    <div className="pt-2 border-t flex items-center gap-3">
                      <div className="w-20 h-14 rounded-xl overflow-hidden border border-slate-300 shrink-0 bg-slate-200">
                        <img src={editingNewsItem.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-[11px]">
                        <span className="font-bold text-emerald-800 block">Preview Foto Terpilih</span>
                        <span className="text-slate-500">Tampil di portal berita & beranda publik</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ringkasan Singkat (Lead Paragraph)</label>
                <textarea
                  rows={2}
                  required
                  value={editingNewsItem.summary}
                  onChange={(e) => setEditingNewsItem({ ...editingNewsItem, summary: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Isi Konten Berita Lengkap</label>
                <textarea
                  rows={4}
                  required
                  value={editingNewsItem.content}
                  onChange={(e) => setEditingNewsItem({ ...editingNewsItem, content: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setEditingNewsItem(null)} className="px-4 py-2.5 rounded-xl bg-slate-100 font-bold">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold">Simpan Berita</button>
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
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
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
                <label className="block font-bold text-slate-700 mb-1">Foto Produk / Banner Toko UMKM</label>
                <div className="space-y-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 block mb-1">Unggah Foto dari Perangkat (Galeri HP / Laptop):</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, (url) => setUmkmForm({ ...umkmForm, imageUrl: url }))}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200 cursor-pointer"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 block mb-1">Atau Gunakan Link Foto (URL Gambar):</span>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={umkmForm.imageUrl}
                      onChange={(e) => setUmkmForm({ ...umkmForm, imageUrl: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono text-[11px]"
                    />
                  </div>
                  {umkmForm.imageUrl && (
                    <div className="pt-2 border-t flex items-center gap-3">
                      <div className="w-20 h-14 rounded-xl overflow-hidden border border-slate-300 shrink-0 bg-slate-200">
                        <img src={umkmForm.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-[11px]">
                        <span className="font-bold text-amber-800 block">Preview Foto Produk</span>
                        <span className="text-slate-500">Tampil di Katalog UMKM Publik</span>
                      </div>
                    </div>
                  )}
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

      {/* Modal Edit UMKM */}
      {editingUMKMItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-amber-600" /> Sunting Data UMKM Desa
                </h3>
                <p className="text-[11px] text-slate-500">Perbarui rincian usaha, produk unggulan, atau foto produk UMKM.</p>
              </div>
              <button onClick={() => setEditingUMKMItem(null)} className="p-1.5 rounded-full hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleEditUMKMSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Usaha / Merk Toko</label>
                  <input
                    type="text"
                    required
                    value={editingUMKMItem.namaUsaha}
                    onChange={(e) => setEditingUMKMItem({ ...editingUMKMItem, namaUsaha: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Pemilik Usaha</label>
                  <input
                    type="text"
                    required
                    value={editingUMKMItem.pemilik}
                    onChange={(e) => setEditingUMKMItem({ ...editingUMKMItem, pemilik: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Produk Unggulan Utama</label>
                <input
                  type="text"
                  required
                  value={editingUMKMItem.produkUtama}
                  onChange={(e) => setEditingUMKMItem({ ...editingUMKMItem, produkUtama: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Foto Produk / Banner Toko UMKM</label>
                <div className="space-y-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 block mb-1">Unggah Foto Baru dari Perangkat:</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, (url) => setEditingUMKMItem({ ...editingUMKMItem, imageUrl: url }))}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200 cursor-pointer"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 block mb-1">Atau Ubah Link Foto (URL):</span>
                    <input
                      type="url"
                      value={editingUMKMItem.imageUrl}
                      onChange={(e) => setEditingUMKMItem({ ...editingUMKMItem, imageUrl: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono text-[11px]"
                    />
                  </div>
                  {editingUMKMItem.imageUrl && (
                    <div className="pt-2 border-t flex items-center gap-3">
                      <div className="w-20 h-14 rounded-xl overflow-hidden border border-slate-300 shrink-0 bg-slate-200">
                        <img src={editingUMKMItem.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-[11px]">
                        <span className="font-bold text-amber-800 block">Preview Foto Produk</span>
                        <span className="text-slate-500">Tampil di Katalog UMKM Publik</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Alamat Dusun / RT / RW</label>
                  <input
                    type="text"
                    required
                    value={editingUMKMItem.alamat}
                    onChange={(e) => setEditingUMKMItem({ ...editingUMKMItem, alamat: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">No. WhatsApp / Kontak HP</label>
                  <input
                    type="text"
                    required
                    value={editingUMKMItem.kontak}
                    onChange={(e) => setEditingUMKMItem({ ...editingUMKMItem, kontak: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Singkat Keunggulan Usaha</label>
                <textarea
                  rows={2}
                  required
                  value={editingUMKMItem.deskripsi}
                  onChange={(e) => setEditingUMKMItem({ ...editingUMKMItem, deskripsi: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setEditingUMKMItem(null)} className="px-4 py-2.5 rounded-xl bg-slate-100 font-bold">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold">Simpan UMKM</button>
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
                <label className="block font-bold text-slate-700 mb-1">Foto Profil Perangkat Desa</label>
                <div className="space-y-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 block mb-1">Unggah Foto dari Perangkat (Galeri HP / Laptop):</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, (url) => setPerangkatForm({ ...perangkatForm, foto: url }))}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-100 file:text-indigo-800 hover:file:bg-indigo-200 cursor-pointer"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 block mb-1">Atau Gunakan Link Foto (URL Gambar):</span>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={perangkatForm.foto}
                      onChange={(e) => setPerangkatForm({ ...perangkatForm, foto: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono text-[11px]"
                    />
                  </div>
                  {perangkatForm.foto && (
                    <div className="pt-2 border-t flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-300 shrink-0 bg-slate-200">
                        <img src={perangkatForm.foto} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-[11px]">
                        <span className="font-bold text-indigo-900 block">Preview Foto Profil</span>
                        <span className="text-slate-500">Tampil di Struktur Perangkat Desa</span>
                      </div>
                    </div>
                  )}
                </div>
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
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-emerald-600" /> Sunting Nominal APBDes 2026
                </h3>
                <p className="text-[11px] text-slate-500">Perbarui anggaran & realisasi 5 sumber pendapatan dan total belanja.</p>
              </div>
              <button onClick={() => setShowEditAPBDes(false)} className="p-1.5 rounded-full hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleEditAPBDesSubmit} className="space-y-4 text-xs">
              
              <div className="space-y-3 border-b pb-4">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Anggaran & Realisasi 5 Sumber Pendapatan:</h4>
                
                {apbdesItemsForm.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-900 block text-xs">{item.sumber}</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">Nominal Anggaran (Rp)</label>
                        <input
                          type="number"
                          required
                          value={item.anggaran}
                          onChange={(e) => {
                            const newArr = [...apbdesItemsForm];
                            newArr[idx].anggaran = Number(e.target.value);
                            setApbdesItemsForm(newArr);
                          }}
                          className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">Nominal Realisasi (Rp)</label>
                        <input
                          type="number"
                          required
                          value={item.realisasi}
                          onChange={(e) => {
                            const newArr = [...apbdesItemsForm];
                            newArr[idx].realisasi = Number(e.target.value);
                            setApbdesItemsForm(newArr);
                          }}
                          className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Total Nominal Belanja Desa (Rp)</label>
                <input
                  type="number"
                  required
                  placeholder="1550000000"
                  value={apbdesBelanjaForm}
                  onChange={(e) => setApbdesBelanjaForm(Number(e.target.value))}
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

      {/* Modal Add Poktan Baru */}
      {showAddPoktanModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="border-b pb-3 flex justify-between items-center">
              <h3 className="font-bold text-base text-slate-900">Tambah Kelompok Tani (Poktan)</h3>
              <button onClick={() => setShowAddPoktanModal(false)} className="p-1.5 rounded-full hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleAddPoktanSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Kelompok Tani</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Poktan Sidomukti I"
                  value={poktanForm.nama}
                  onChange={(e) => setPoktanForm({ ...poktanForm, nama: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Ketua Poktan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sukardi"
                  value={poktanForm.ketua}
                  onChange={(e) => setPoktanForm({ ...poktanForm, ketua: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Alamat RT / RW / Dusun</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Tlogosari RT22 RW06"
                  value={poktanForm.alamat}
                  onChange={(e) => setPoktanForm({ ...poktanForm, alamat: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Jumlah Anggota</label>
                <input
                  type="number"
                  required
                  value={poktanForm.anggota}
                  onChange={(e) => setPoktanForm({ ...poktanForm, anggota: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowAddPoktanModal(false)} className="px-4 py-2.5 rounded-xl bg-slate-100 font-bold">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold">Simpan Poktan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. Modal Add Aset Balai Desa */}
      {showAddBalaiAsset && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-600" /> Form Tambah Aset Balai Desa
                </h3>
                <p className="text-[11px] text-slate-500">Pendataan barang & inventaris milik Balai Desa yang dapat dipinjam warga.</p>
              </div>
              <button onClick={() => setShowAddBalaiAsset(false)} className="p-1.5 rounded-full hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleAddBalaiAssetSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Barang / Aset Inventaris</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Tenda Hajatan (6x12m) / Sound System Portable"
                  value={balaiAssetForm.namaAset}
                  onChange={(e) => setBalaiAssetForm({ ...balaiAssetForm, namaAset: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Barang</label>
                  <select
                    value={balaiAssetForm.kategori}
                    onChange={(e) => setBalaiAssetForm({ ...balaiAssetForm, kategori: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option>Peralatan Acara & Hajatan</option>
                    <option>Alat Pertanian Komunal</option>
                    <option>Mesin & Konstruksi</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kapasitas / Jumlah Unit</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 4 Unit / 100 Kursi"
                    value={balaiAssetForm.kapasitas}
                    onChange={(e) => setBalaiAssetForm({ ...balaiAssetForm, kapasitas: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lokasi Gudang Penyimpanan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Gudang Balai Desa Banyuurip"
                    value={balaiAssetForm.lokasi}
                    onChange={(e) => setBalaiAssetForm({ ...balaiAssetForm, lokasi: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Ketersediaan Awal</label>
                  <select
                    value={balaiAssetForm.status}
                    onChange={(e) => setBalaiAssetForm({ ...balaiAssetForm, status: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Tersedia">🟢 Tersedia</option>
                    <option value="Sedang Dipinjam">🟡 Sedang Dipinjam</option>
                    <option value="Pemeliharaan">🛠️ Pemeliharaan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Syarat & Ketentuan Peminjaman</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: KTP Warga Banyuurip & Surat Permohonan H-3 ke Kaur Umum"
                  value={balaiAssetForm.syarat}
                  onChange={(e) => setBalaiAssetForm({ ...balaiAssetForm, syarat: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Penanggung Jawab / Kontak Perangkat Desa</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pak Bambang (Kaur Umum - 0812-3456-7890)"
                  value={balaiAssetForm.penanggungJawab}
                  onChange={(e) => setBalaiAssetForm({ ...balaiAssetForm, penanggungJawab: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowAddBalaiAsset(false)} className="px-4 py-2.5 rounded-xl bg-slate-100 font-bold">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold">Simpan Aset Baru</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. Modal Add Indikator Desa Anti Korupsi */}
      {showAddAntiKorupsiModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" /> Form Indikator Desa Anti Korupsi
                </h3>
                <p className="text-[11px] text-slate-500">Pendataan kriteria integritas KPK & unggah tautan dokumen bukti di Google Drive.</p>
              </div>
              <button onClick={() => setShowAddAntiKorupsiModal(false)} className="p-1.5 rounded-full hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleAddAntiKorupsiSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kode Indikator</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: IND-06"
                    value={antiKorupsiForm.kodeIndikator}
                    onChange={(e) => setAntiKorupsiForm({ ...antiKorupsiForm, kodeIndikator: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Integritas</label>
                  <select
                    value={antiKorupsiForm.kategori}
                    onChange={(e) => setAntiKorupsiForm({ ...antiKorupsiForm, kategori: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option>Penataan Tatalaksana</option>
                    <option>Pengawasan</option>
                    <option>Pelayanan Publik</option>
                    <option>Partisipasi Masyarakat</option>
                    <option>Kearifan Lokal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Indikator Integritas</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Indikator 6: Penataan Sistem Akuntabilitas & Transparansi"
                  value={antiKorupsiForm.judul}
                  onChange={(e) => setAntiKorupsiForm({ ...antiKorupsiForm, judul: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Uraian / Deskripsi Pemenuhan Standar</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Jelaskan mengenai bukti fisik dan standar pemenuhan indikator antikorupsi..."
                  value={antiKorupsiForm.deskripsi}
                  onChange={(e) => setAntiKorupsiForm({ ...antiKorupsiForm, deskripsi: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Link Google Drive Dokumen Bukti (PDF / Folder GDrive)</label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/drive/folders/10pKDWF_VgqKaSjPiAsweJlod8Y8a5uy2"
                  value={antiKorupsiForm.gdriveUrl}
                  onChange={(e) => setAntiKorupsiForm({ ...antiKorupsiForm, gdriveUrl: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Masukkan URL Google Drive publik agar warga dapat membaca berkas bukti pemenuhan indikator</span>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowAddAntiKorupsiModal(false)} className="px-4 py-2.5 rounded-xl bg-slate-100 font-bold">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold">Simpan Indikator</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Admin User */}
      {showAddUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" /> Form Tambah Akun Admin Baru
                </h3>
                <p className="text-[11px] text-slate-500">Buatkan kredensial login baru untuk Perangkat Desa atau Pengelola Website.</p>
              </div>
              <button onClick={() => setShowAddUser(false)} className="p-1.5 rounded-full hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap Admin</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bapak Ir. H. Triyono"
                  value={userForm.namaLengkap}
                  onChange={(e) => setUserForm({ ...userForm, namaLengkap: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Username Login</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: kaur_pembangunan"
                    value={userForm.username}
                    onChange={(e) => setUserForm({ ...userForm, username: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Huruf kecil tanpa spasi</span>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kata Sandi / Password</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: banyuurip2026"
                    value={userForm.password}
                    onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jabatan / Unit Kerja</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kaur Pembangunan / Sekdes"
                    value={userForm.jabatan}
                    onChange={(e) => setUserForm({ ...userForm, jabatan: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hak Akses / Peran</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value as 'Super Admin' | 'Admin Perangkat Desa' })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Admin Perangkat Desa">Admin Perangkat Desa</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Foto Profil / Avatar Admin</label>
                <div className="space-y-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 block mb-1">Unggah Foto dari Perangkat:</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, (url) => setUserForm({ ...userForm, avatarUrl: url }))}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 cursor-pointer"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 block mb-1">Atau Link Foto URL:</span>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={userForm.avatarUrl}
                      onChange={(e) => setUserForm({ ...userForm, avatarUrl: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono text-[11px]"
                    />
                  </div>
                  {userForm.avatarUrl && (
                    <div className="pt-2 border-t flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-300 shrink-0 bg-slate-200">
                        <img src={userForm.avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[11px] font-bold text-emerald-800">Preview Foto Admin</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowAddUser(false)} className="px-4 py-2.5 rounded-xl bg-slate-100 font-bold">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold">Daftarkan Admin Baru</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit Admin User */}
      {editingUserItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-emerald-600" /> Sunting Akun Admin
                </h3>
                <p className="text-[11px] text-slate-500">Perbarui username, password, atau jabatan admin.</p>
              </div>
              <button onClick={() => setEditingUserItem(null)} className="p-1.5 rounded-full hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleEditUserSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap Admin</label>
                <input
                  type="text"
                  required
                  value={editingUserItem.namaLengkap}
                  onChange={(e) => setEditingUserItem({ ...editingUserItem, namaLengkap: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Username Login</label>
                  <input
                    type="text"
                    required
                    value={editingUserItem.username}
                    onChange={(e) => setEditingUserItem({ ...editingUserItem, username: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                    className="w-full p-3 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kata Sandi / Password</label>
                  <input
                    type="text"
                    required
                    value={editingUserItem.password || ''}
                    onChange={(e) => setEditingUserItem({ ...editingUserItem, password: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jabatan / Unit Kerja</label>
                  <input
                    type="text"
                    required
                    value={editingUserItem.jabatan}
                    onChange={(e) => setEditingUserItem({ ...editingUserItem, jabatan: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hak Akses / Peran</label>
                  <select
                    value={editingUserItem.role}
                    onChange={(e) => setEditingUserItem({ ...editingUserItem, role: e.target.value as 'Super Admin' | 'Admin Perangkat Desa' })}
                    className="w-full p-3 rounded-xl border border-slate-300"
                  >
                    <option value="Admin Perangkat Desa">Admin Perangkat Desa</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Foto Profil / Avatar Admin</label>
                <div className="space-y-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 block mb-1">Unggah Foto Baru dari Perangkat:</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, (url) => setEditingUserItem({ ...editingUserItem, avatarUrl: url }))}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 cursor-pointer"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 block mb-1">Atau Ubah Link Foto URL:</span>
                    <input
                      type="url"
                      value={editingUserItem.avatarUrl || ''}
                      onChange={(e) => setEditingUserItem({ ...editingUserItem, avatarUrl: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono text-[11px]"
                    />
                  </div>
                  {editingUserItem.avatarUrl && (
                    <div className="pt-2 border-t flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-300 shrink-0 bg-slate-200">
                        <img src={editingUserItem.avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[11px] font-bold text-emerald-800">Preview Foto Admin</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setEditingUserItem(null)} className="px-4 py-2.5 rounded-xl bg-slate-100 font-bold">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
