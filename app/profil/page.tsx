import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Users, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2,
  Landmark,
  Compass,
  FileText,
  Sparkles,
  HelpCircle,
  Layers,
  Heart
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
            Profil & Sejarah Resmi Desa Banyuurip
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Profil, Sejarah, & Visi Misi Desa Banyuurip
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 font-light leading-relaxed">
            Menelusuri sejarah panjang, tata kelola pemerintahan yang transparan dan akuntabel, serta pemahaman tentang hakikat dan keilmuan perdesaan Desa Banyuurip, Kecamatan Klego, Kabupaten Boyolali.
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

      {/* Visi & Misi Desa Section (Matches Official Image Standard) */}
      <section id="visi-misi" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Visi & Misi Desa Banyuurip</h2>
            <p className="text-xs text-slate-500">Pedoman dan Arah Kebijakan Pembangunan Pemerintah Desa Banyuurip</p>
          </div>
        </div>

        {/* Visi Block */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
            <Compass className="w-5 h-5 text-emerald-600" />
            <h3>Visi Desa</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Visi adalah suatu gambaran yang menantang tentang keadaan masa depan yang diinginkan dengan melihat potensi dan kebutuhan desa. Penyusunan Visi Desa Banyuurip dilakukan dengan pendekatan partisipatif, melibatkan pihak-pihak yang berkepentingan di Desa Banyuurip seperti pemerintah Desa, BPD, Tokoh Masyarakat, tokoh agama, lembaga masyarakat desa dan masyarakat desa pada umumnya. Pertimbangan kondisi eksternal di desa seperti satuan kerja wilayah pembangunan di Kecamatan. Maka berdasarkan pertimbangan diatas Visi Desa Banyuurip adalah:
          </p>
          
          <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white p-6 sm:p-8 rounded-2xl shadow-md text-center space-y-2 my-4 border border-emerald-700/50">
            <p className="text-lg sm:text-2xl font-black italic tracking-wide uppercase leading-tight font-serif text-emerald-300">
              “MENUJU BANYUURIP YANG TRANSPARAN, AKUNTABEL, DAN SEPENUH HATI DALAM PELAYANAN”
            </p>
          </div>
        </div>

        {/* Misi Block */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3>Misi Desa</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Selain Penyusunan Visi juga telah ditetapkan misi-misi yang memuat sesuatu pernyataan yang harus dilaksanakan oleh Desa agar tercapainya visi desa tersebut. Visi berada di atas Misi. Pernyataan Visi kemudian dijabarkan ke dalam misi agar dapat di operasionalkan/dikerjakan. Sebagaimana penyusunan Visi, misipun dalam penyusunannya menggunakan pendekatan partisipatif dan pertimbangan potensi dan kebutuhan Desa Banyuurip, sebagaimana proses yang dilakukan maka misi Desa Banyuurip adalah:
          </p>

          <div className="space-y-3 pt-2">
            {profile.misi.map((item, idx) => (
              <div key={idx} className="bg-slate-50 hover:bg-emerald-50/60 transition-colors p-4 rounded-2xl border border-slate-200/80 flex items-start gap-3.5 text-xs sm:text-sm text-slate-800">
                <span className="w-7 h-7 rounded-xl bg-emerald-800 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                  {idx + 1}
                </span>
                <span className="font-medium pt-0.5 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sejarah Desa Section */}
      <section id="sejarah" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Sejarah & Asal-Usul Desa Banyuurip</h2>
            <p className="text-xs text-slate-500">Dokumentasi Historiografi & Asal Usul Nama Desa Banyuurip</p>
          </div>
        </div>

        <div className="prose prose-emerald max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
          {profile.sejarah.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-justify leading-relaxed">{paragraph}</p>
          ))}
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

      {/* Tentang Kami Section: Pengertian, Fungsi, & Ciri-Ciri Desa */}
      <section id="tentang-kami" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-3 rounded-2xl bg-teal-100 text-teal-800">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Tentang Kami & Keilmuan Perdesaan</h2>
            <p className="text-xs text-slate-500">Kajian Pengertian Desa, Fungsi Desa, dan Ciri-Ciri Masyarakat Desa</p>
          </div>
        </div>

        {/* Bagian A: Pengertian Desa */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-teal-900 font-bold text-lg">
            <FileText className="w-5 h-5 text-teal-700" />
            <h3>A. Pengertian Desa</h3>
          </div>
          
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
            <p>
              Definisi universal desa adalah sebuah aglomerasi permukiman di area perdesaan (rural). Sementara di Indonesia, istilah desa yaitu pembagian wilayah administratif dibawah kecamatan yang dipimpin oleh seorang Kepala Desa. Sebuah desa merupakan kumpulan dari beberapa unit permukiman kecil yang disebut juga kampung/dusun/banjar/jorong.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">Pengertian Desa Menurut Para Ahli Kependudukan:</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/80 space-y-1">
                <span className="font-bold text-emerald-900 block">1. Menurut R. Bintarto</span>
                <p className="text-slate-700 leading-relaxed">
                  Desa yaitu perwujudan atau kesatuan sosial, ekonomi, geografi, politik, serta kultural yang ada di suatu daerah dalam hubungan dan pengaruhnya secara timbal balik dengan daerah lain.
                </p>
              </div>

              <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-200/80 space-y-1">
                <span className="font-bold text-blue-900 block">2. Menurut Rifhi Siddiq</span>
                <p className="text-slate-700 leading-relaxed">
                  Desa adalah suatu wilayah yang memiliki tingkat kepadatan rendah yang dihuni oleh penduduk dengan interaksi sosial yang bersifat homogen, bermatapencaharian di bidang agraris dan juga mampu berinteraksi dengan wilayah lain di sekitarnya.
                </p>
              </div>

              <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-200/80 space-y-1">
                <span className="font-bold text-purple-900 block">3. Menurut Sutardjo Kartohadikusumo</span>
                <p className="text-slate-700 leading-relaxed">
                  Desa adalah suatu kesatuan hukum yang di dalamnya bertempat tinggal sekelompok masyarakat yang berkuasa mengadakan pemerintahan sendiri.
                </p>
              </div>

              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 space-y-1">
                <span className="font-bold text-amber-900 block">4. Menurut Paul H. Landis</span>
                <p className="text-slate-700 leading-relaxed">
                  Desa adalah daerah dimana hubungan pergaulannya ditandai dengan intensitas tinggi dengan jumlah penduduk yang kurang dari 2.500 orang.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-950 text-emerald-100 p-5 rounded-2xl space-y-2 text-xs sm:text-sm">
            <span className="font-extrabold text-emerald-300 block uppercase tracking-wider">Kesimpulan Pengertian Desa:</span>
            <p className="leading-relaxed font-light">
              Berdasarkan penjabaran para ahli di atas dapat disimpulkan bahwa desa adalah suatu wilayah yang merupakan perwujudan atau kesatuan sosial, ekonomi, geografis, politik, dan kultural, dihuni oleh penduduk dengan interaksi sosial bersifat homogen dan sebagian besar bermatapencaharian di bidang agraris serta berkuasa mengadakan pemerintahan sendiri.
            </p>
          </div>

          {/* UU No 6 / 2014 & Perbandingan Kelurahan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" /> Menurut UU Desa No. 6 Tahun 2014:
              </span>
              <p className="text-slate-700 leading-relaxed">
                Desa adalah kesatuan masyarakat hukum yang mempunyai batas wilayah yang berwenang untuk mengatur dan mengurus urusan pemerintahan, kepentingan masyarakat setempat berdasarkan prakarsa masyarakat, hak asal usul, dan/atau hak tradisional yang diakui dan dihormati dalam sistem pemerintahan Negara Kesatuan Republik Indonesia.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-teal-600" /> Perbandingan Desa vs Kelurahan:
              </span>
              <p className="text-slate-700 leading-relaxed">
                Apabila dibandingkan dengan kelurahan maka dapat dijelaskan bahwa desa bukan bawahan dari kecamatan karena kecamatan adalah bagian dari perangkat daerah kabupaten/kota dan desa bukan bagian dari perangkat daerah, sedangkan kelurahan secara struktural merupakan bagian dari perangkat daerah kabupaten/kota. Berbeda dengan kelurahan, desa mempunyai hak mengatur wilayahnya dengan lebih luas dan leluasa.
              </p>
            </div>
          </div>
        </div>

        {/* Bagian B: Fungsi Desa */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-teal-900 font-bold text-lg">
            <Layers className="w-5 h-5 text-teal-700" />
            <h3>B. Fungsi Desa</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 space-y-1">
              <span className="w-6 h-6 rounded-lg bg-emerald-800 text-white font-bold flex items-center justify-center text-xs mb-2">1</span>
              <span className="font-bold text-emerald-900 block">Pemasok Kebutuhan (Hinterland)</span>
              <p className="text-slate-600">Desa berfungsi sebagai hinterland yang memasok kebutuhan pangan dan bahan baku bagi kota.</p>
            </div>

            <div className="bg-teal-50/80 p-4 rounded-2xl border border-teal-200 space-y-1">
              <span className="w-6 h-6 rounded-lg bg-teal-800 text-white font-bold flex items-center justify-center text-xs mb-2">2</span>
              <span className="font-bold text-teal-900 block">Mitra Pembangunan Kota</span>
              <p className="text-slate-600">Desa adalah mitra yang saling mendukung dalam proses pertumbuhan dan pembangunan kawasan kota.</p>
            </div>

            <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-200 space-y-1">
              <span className="w-6 h-6 rounded-lg bg-blue-800 text-white font-bold flex items-center justify-center text-xs mb-2">3</span>
              <span className="font-bold text-blue-900 block">Pemerintahan Terkecil NKRI</span>
              <p className="text-slate-600">Desa merupakan bentuk tata kelola pemerintahan terkecil yang berdaulat di wilayah NKRI.</p>
            </div>

            <div className="bg-purple-50/80 p-4 rounded-2xl border border-purple-200 space-y-1">
              <span className="w-6 h-6 rounded-lg bg-purple-800 text-white font-bold flex items-center justify-center text-xs mb-2">4</span>
              <span className="font-bold text-purple-900 block">Sumber Tenaga Kerja</span>
              <p className="text-slate-600">Desa menyediakan sumber daya manusia dan tenaga kerja potensial bagi pembangunan perkotaan.</p>
            </div>
          </div>
        </div>

        {/* Bagian C: Ciri-ciri Masyarakat Desa */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-teal-900 font-bold text-lg">
            <Heart className="w-5 h-5 text-teal-700" />
            <h3>C. Ciri-ciri Masyarakat Desa</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
            {[
              "Pembagian waktu yang lebih teliti dan sangat penting, untuk bisa mengejar kebutuhan individu.",
              "Penduduk di desa cenderung saling tolong menolong karena adanya rasa kebersamaan yang tinggi.",
              "Pembagian kerja antar penduduk desa cenderung membaur dan tidak memiliki batasan yang jelas.",
              "Penduduk desa cenderung mengerjakan pekerjaan yang sama seperti anggota keluarganya terdahulu.",
              "Kehidupan keagamaan di desa lebih kuat jika dibandingkan dengan perkotaan.",
              "Perubahan-perubahan sosial cenderung terjadi lebih lambat, tergantung pada keterbukaan masyarakat desa dalam menerima pengaruh dari adat istiadat setempat.",
              "Kreatifitas dan inovasi cenderung belum diimplementasikan jika penduduk desa tidak mencaritahu informasi terkini tentang perkembangan zaman dan teknologi.",
              "Interaksi banyak terjadi berdasarkan pada faktor kepentingan bersama daripada faktor kepentingan pribadi."
            ].map((ciri, idx) => (
              <div key={idx} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-slate-700 leading-relaxed">{ciri}</span>
              </div>
            ))}
          </div>
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
