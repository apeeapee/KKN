'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  Home, 
  HeartPulse, 
  Sprout, 
  FileText, 
  PieChart, 
  BookOpenCheck, 
  Newspaper, 
  Store, 
  Menu, 
  X,
  ChevronDown,
  Scale,
  UserCheck
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Beranda', icon: Home },
    { href: '/profil', label: 'Profil & Sejarah', icon: Building2 },
    { 
      href: '/services', 
      label: 'Layanan & Program', 
      icon: ChevronDown,
      isDropdown: true,
      subItems: [
        { href: '/kesehatan-respira', label: 'E-Book & Skrining ISPA (RESPIRA)', icon: HeartPulse, desc: 'Edukasi & Cek Mandiri Kesehatan' },
        { href: '/pertanian-logistik', label: 'Pertanian & Peminjaman Aset Balai Desa', icon: Sprout, desc: 'Komoditas Tani, Peminjaman Aset & SOP Balai Desa' },
        { href: '/jdih-hukum', label: 'Pusat Hukum Desa (JDIH)', icon: FileText, desc: 'Perdes, Perkades & Dokumen Resmi' },
        { href: '/apbdes-pajak', label: 'Transparansi APBDes & PBB-P2', icon: PieChart, desc: 'Grafik APBDes & Bayar Pajak Online' },
        { href: '/edukasi-5s', label: 'Edukasi Budaya 5S Jepang', icon: BookOpenCheck, desc: 'Panduan Hidup Bersih & Disiplin' },
        { href: '/umkm', label: 'Direktori UMKM Desa', icon: Store, desc: 'Katalog Produk & Usaha Warga' },
      ]
    },
    { href: '/desa-anti-korupsi', label: 'Desa Anti Korupsi', icon: Scale },
    { href: '/berita', label: 'Berita Desa', icon: Newspaper },
    { href: '/umkm', label: 'UMKM Desa', icon: Store },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-emerald-950 text-white text-xs py-1.5 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-emerald-800">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-700 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase">Portal Resmi</span>
          <span>Desa Banyuurip, Kecamatan Klego, Kabupaten Boyolali</span>
        </div>
        <div className="flex items-center gap-4 text-emerald-200 text-xs">
          <span>Jam Pelayanan: Senin - Jumat (08.00 - 14.00 WIB)</span>
          <span className="hidden md:inline">|</span>
          <Link href="/login" className="text-emerald-300 hover:text-white font-bold flex items-center gap-1 underline underline-offset-2">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            Login Admin Perangkat Desa
          </Link>
        </div>
      </div>

      {/* Main Navbar Container */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          
          {/* Logo & Brand (Left) */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <img src="/logo-boyolali.png" alt="Logo Kab. Boyolali" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                DESA BANYUURIP
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">Digitalisasi Profil, Ekonomi & Kesehatan Satu Pintu</p>
            </div>
          </Link>

          {/* Desktop Navigation (Center) - Clean, Un-cluttered, Consistent */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                return (
                  <div 
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setServicesDropdown(true)}
                    onMouseLeave={() => setServicesDropdown(false)}
                  >
                    <button className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70 transition-colors whitespace-nowrap shrink-0">
                      <span>{link.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdown ? 'rotate-180 text-emerald-600' : ''}`} />
                    </button>

                    {/* Mega Dropdown */}
                    {servicesDropdown && (
                      <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-2.5 grid grid-cols-1 gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
                        {link.subItems?.map((sub) => {
                          const SubIcon = sub.icon;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group"
                            >
                              <div className="p-2 rounded-lg bg-emerald-100/70 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <SubIcon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">{sub.label}</div>
                                <div className="text-[11px] text-slate-500 leading-tight mt-0.5">{sub.desc}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const Icon = link.icon;
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                    active 
                      ? 'bg-emerald-700 text-white shadow-xs' 
                      : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Button (Right) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              href="/kesehatan-respira"
              className="gradient-emerald text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <HeartPulse className="w-4 h-4" />
              Skrining ISPA
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 border-b border-slate-100"
          >
            Beranda
          </Link>
          <Link
            href="/profil"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 border-b border-slate-100"
          >
            Profil & Sejarah Desa
          </Link>
          <Link
            href="/desa-anti-korupsi"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-bold text-slate-900 border-b border-slate-100"
          >
            Desa Anti Korupsi
          </Link>
          <div className="py-2 space-y-2 border-b border-slate-100">
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Layanan & Program KKN</div>
            <Link
              href="/kesehatan-respira"
              onClick={() => setIsOpen(false)}
              className="block text-xs font-medium text-slate-600 hover:text-emerald-700 py-1"
            >
              • E-Book & Skrining ISPA (RESPIRA)
            </Link>
            <Link
              href="/pertanian-logistik"
              onClick={() => setIsOpen(false)}
              className="block text-xs font-medium text-slate-600 hover:text-emerald-700 py-1"
            >
              • Pertanian, Musim Tanam & Logistik
            </Link>
            <Link
              href="/jdih-hukum"
              onClick={() => setIsOpen(false)}
              className="block text-xs font-medium text-slate-600 hover:text-emerald-700 py-1"
            >
              • JDIH / Pusat Dokumentasi Hukum
            </Link>
            <Link
              href="/apbdes-pajak"
              onClick={() => setIsOpen(false)}
              className="block text-xs font-medium text-slate-600 hover:text-emerald-700 py-1"
            >
              • Transparansi APBDes & Bayar PBB-P2
            </Link>
            <Link
              href="/edukasi-5s"
              onClick={() => setIsOpen(false)}
              className="block text-xs font-medium text-slate-600 hover:text-emerald-700 py-1"
            >
              • Edukasi Budaya 5S Jepang
            </Link>
            <Link
              href="/umkm"
              onClick={() => setIsOpen(false)}
              className="block text-xs font-medium text-slate-600 hover:text-emerald-700 py-1"
            >
              • Katalog & Direktori UMKM Desa
            </Link>
          </div>
          <Link
            href="/berita"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 border-b border-slate-100"
          >
            Berita & Pengumuman
          </Link>
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-bold text-emerald-800 border-b border-slate-100"
          >
            🔐 Login Admin Perangkat Desa
          </Link>
        </div>
      )}
    </header>
  );
}
