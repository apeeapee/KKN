import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Heart, 
  ShieldCheck, 
  ExternalLink,
  CheckCircle2,
  Scale,
  UserCheck
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Col 1: About */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-md">
              <img src="/logo-boyolali.png" alt="Logo Kab. Boyolali" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-bold text-lg text-white block">DESA BANYUURIP</span>
              <span className="text-xs text-emerald-400 font-medium">Banyuurip Digital Gateway</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Portal Informasi Resmi & Layanan Satu Pintu Desa Banyuurip, Kec. Klego, Kab. Boyolali, Jawa Tengah. Platform hasil kerja sama Tim Multidisplin KKN dengan Pemerintah Desa Banyuurip.
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] bg-emerald-950/80 text-emerald-400 px-3 py-1 rounded-full border border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              Sistem Informasi Terverifikasi Bebas Pungli
            </span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">Layanan & Fitur Utama</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/desa-anti-korupsi" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                Portal Desa Anti Korupsi
              </Link>
            </li>
            <li>
              <Link href="/kesehatan-respira" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                E-Book & Skrining ISPA (RESPIRA)
              </Link>
            </li>
            <li>
              <Link href="/pertanian-logistik" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Pendataan Pertanian & Musim Tanam
              </Link>
            </li>
            <li>
              <Link href="/jdih-hukum" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                JDIH & Pusat Informasi Hukum Desa
              </Link>
            </li>
            <li>
              <Link href="/apbdes-pajak" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Transparansi APBDes & Pajak PBB-P2
              </Link>
            </li>
            <li>
              <Link href="/umkm" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Direktori Profil UMKM Desa
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Legal & Governance */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">Pemerintahan & Akses</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/profil" className="hover:text-emerald-400 transition-colors">Profil & Perangkat Desa</Link>
            </li>
            <li>
              <Link href="/profil#sejarah" className="hover:text-emerald-400 transition-colors">Sejarah & Budaya Banyuurip</Link>
            </li>
            <li>
              <Link href="/berita" className="hover:text-emerald-400 transition-colors">Berita & Pengumuman Publik</Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-slate-300">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> Login Perangkat Desa
              </Link>
            </li>
            <li>
              <a href="https://boyolali.go.id" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                Portal Kab. Boyolali <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">Kantor Desa Banyuurip</h4>
          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Jl. Raya Banyuurip - Klego No. 01, Kecamatan Klego, Kabupaten Boyolali, Jawa Tengah 57385</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>(0276) 800-BANYU / 0812-9900-BANYU</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>pemdes@banyuurip.desa.id</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>www.banyuurip.desa.id</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© 2026 Pemerintah Desa Banyuurip. Hak Cipta Dilindungi.</p>
        <p className="flex items-center gap-1">
          Dikembangkan dengan <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> Tim KKN Multidisiplin Banyuurip Digital Gateway.
        </p>
      </div>
    </footer>
  );
}
