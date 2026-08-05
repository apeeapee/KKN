import { prisma } from './prisma';

export interface VillageProfile {
  nama: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kodePos: string;
  luasWilayah: string;
  jumlahPenduduk: number;
  jumlahKK: number;
  dusunList: string[];
  sejarah: string;
  visi: string;
  misi: string[];
  perangkatDesa: Array<{ nama: string; jabatan: string; foto: string }>;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  views: number;
}

export interface LegalDocument {
  id: string;
  nomor: string;
  tahun: number;
  judul: string;
  kategori: string;
  deskripsi: string;
  fileUrl: string;
  tglTerbit: string;
  status: string;
}

export interface UMKMItem {
  id: string;
  namaUsaha: string;
  pemilik: string;
  kategori: string;
  deskripsi: string;
  alamat: string;
  kontak: string;
  omzetBulanan: number;
  produkUtama: string;
  imageUrl: string;
  isVerified: boolean;
  keuanganSimulasi: {
    pendapatan: number;
    pengeluaran: number;
    labaBersih: number;
  };
}

export interface AdminUser {
  id: string;
  username: string;
  namaLengkap: string;
  jabatan: string;
  role: 'Super Admin' | 'Admin Perangkat Desa';
  password?: string;
  createdAt: string;
  status: 'Aktif' | 'Nonaktif';
  avatarUrl?: string;
}

export interface AgricultureData {
  gambaranUmum?: string;
  luasWilayahPertanian?: Array<{ jenisLahan: string; luas: number }>;
  totalLuasWilayah?: number;
  sumberDataLuas?: string;
  komoditasUnggulanData?: Array<{ nama: string; produktivitas: string }>;
  polaTanam?: string;
  gapoktanInfo?: { nama: string; ketua: string; jumlahPoktan: number };
  poktanList?: Array<{ nama: string; ketua: string; alamat: string; anggota: number }>;
  komoditas: Array<{
    id: string;
    nama: string;
    kategori: string;
    luasLahan?: number;
    jumlahTernak?: number;
    estimasiHasil: string;
    musimTanam: string;
    musimPanen: string;
    kelompokTani: string;
    lokasi: string;
  }>;
  logistikAset: Array<{
    id: string;
    namaAset: string;
    kategori: string;
    kapasitas: string;
    lokasi: string;
    status: string;
    syarat?: string;
    penanggungJawab?: string;
  }>;
  jalurDistribusi: Array<{
    rute: string;
    tujuan: string;
    jenisKomoditas: string;
    volumeBulan: string;
    modaTransportasi: string;
  }>;
}

export interface APBDesPendapatan {
  sumber: string;
  anggaran: number;
  realisasi: number;
  jumlah: number;
  persen: number;
  porsiAnggaran: number;
  warna: string;
}

export interface APBDesData {
  tahun: number;
  totalPendapatan: number;
  totalRealisasiPendapatan: number;
  totalBelanja: number;
  pendapatan: APBDesPendapatan[];
  belanja: Array<{ bidang: string; jumlah: number; persen: number }>;
  panduanPajakPBB: Array<{ langkah: number; judul: string; deskripsi: string }>;
}

export interface Edukasi5S {
  konsep: Array<{
    istilahJepang: string;
    istilahIndo: string;
    arti: string;
    penerapanDesa: string;
    icon: string;
  }>;
  manfaat: string[];
}

export interface ISPAArticle {
  judul: string;
  ringkasan: string;
  pengertian: string;
  penyebab: string[];
  gejala: string[];
  faktorRisiko: string[];
  pencegahan: string[];
  kapanKeFaskes: string[];
}

// Fallback Mock Dataset for Desa Banyuurip
export const mockVillageProfile: VillageProfile = {
  nama: "Desa Banyuurip",
  kecamatan: "Klego",
  kabupaten: "Boyolali",
  provinsi: "Jawa Tengah",
  kodePos: "57385",
  luasWilayah: "342,5 Hektar",
  jumlahPenduduk: 3840,
  jumlahKK: 1120,
  dusunList: ["Dusun Banyuurip I", "Dusun Banyuurip II", "Dusun Krajan", "Dusun Wonosari"],
  sejarah: `Pada zaman dahulu Desa Banyuurip berupa hutan belantara dan suatu ketika datanglah seseorang dengan naik kuda yang diikuti beberapa orang. Orang tersebut bernama Pangeran Kajoran dari Kerajaan Mataram dengan beberapa prajuritnya untuk mengintai musuh (penjajah Belanda). Mereka tinggal cukup lama di wilayah Banyuurip dan agar tidak diketahui musuh, Pangeran Kajoran mengubah nama menjadi Mbah Ijo (Eyang Ijo) dan mereka menetap di wilayah Desa Banyuurip bagian utara yang sekarang dinamakan Dukuh Ngijo. Mereka dalam melaksanakan pengintaian berbaur dengan masyarakat (orang-orang sakti) yang ada di Desa Banyuurip saat itu antara lain Eyang Liyang penguasa padukuhan Ngliyangan, Eyang Jegrek penguasa di padukuhan Banyuurip, dan eyang-eyang lainnya yang kesemuanya bersatu untuk mengusir Belanda.

Sepeninggal Eyang Ijo, tidak lama kemudian datang lagi seseorang pemuda yang sangat gagah berani dengan mengendarai seekor kuda dan diikuti beberapa orang prajurit, beliau adalah Sumendhi Amijaya atau yang dikenal dengan nama Eyang Sumendhi. Beliau adalah punggawa Kerajaan Mataram yang bekerja sebagai tukang hewan yang berasal dari Jatinom, Klaten untuk mencari harimau karena harimau hewan kesayangan sang Raja mati dan beliau disuruh untuk mencari gantinya.

Dalam melaksanakan pencarian harimau tersebut, Sumendhi Amijaya keluar masuk hutan dan karena pihak Belanda mengetahui masih ada punggawa Mataram yang ada di sekitar wilayah Desa Banyuurip, Eyang Sumendhi Amijaya lari ke Gondanglegi dan singgah di rumah Lurah Sukiman. Eyang Sumendhi Amijaya karena masih dikejar-kejar oleh Belanda lari ke arah Timur dan bersembunyi di Kedung Bantheng wilayah Dukuh Gandhu Desa Karanggatak yakni sebuah tempat yang memiliki goa. Belanda mengetahui jika Eyang Sumendhi masuk ke gua, maka Belanda mengepung gua tersebut. Eyang Sumendhi tergesa-gesa sampai cemethi/cethen dalam Bahasa Jawa ketinggalan di rumah Lurah Sukiman dan lapak kudanya ketinggalan di Gua Kedhung Banteng. Suatu hari lapak tersebut ditemukan oleh seorang warga yang akhirnya diserahkan kepada Lurah Karanggatak saat itu. Eyang Sumendhi yang masih dikejar oleh Belanda akhirnya lari ke Timur untuk kembali lagi ke wilayah Banyuurip namun beliau tidak langsung menuju ke wilayah Banyuurip tetapi berputar-putar dengan tujuan untuk menghindari kejaran Belanda. Eyang Sumendhi karena berputar sangat jauh, pada saat istirahat bersama prajuritnya beliau bertanya kepada abdinya, "Sapa sing isih nduwe sangu?" (Siapa yang masih ada bekal?). Abdinya menjawab, "Sampun Telas Sedaya Sinuwun" (Sudah habis semua Tuan). Eyang Sumendhi kemudian berujar, "Nggejruake tekenne ono padas" (Menancapkan tongkatnya ke batu padas) dan tidak lama kemudian keluar air yang selanjutnya air tersebut diminum oleh para prajurit. Tempat tersebut kini disebut dengan nama Mur Genthong, yang berarti sebuah lubang kecil namun airnya tidak pernah habis meskipun di musim kemarau. Tempat Mur Genthong tersebut berada di sebelah utara dukuh Jlegong. Eyang Sumendhi kemudian melanjutkan perjalanan ke arah timur dan beristirahat di dukuh Jlegong. Saat itulah Eyang Sumendhi berbincang-bincang dengan para prajurit diantaranya Eyang Jegrek, Eyang Kasnawi, Mbah Gowek, Mbah Bandol Kawak, Mbah Kasnawi dan Eyang Kodim. Eyang Sumendhi Amijaya berpesan bahwa tongkat (teken) miliknya tidak dibawa pulang namun dikuburkan di tempat tersebut karena tongkat tersebut merupakan pengganti dirinya. Eyang Sumendhi berpesan untuk memperingati atau disadrani setiap Jumat Wage di bulan Safar dan dalam pelaksanaannya beliau juga berpesan untuk melarang membawa tempe kedelai namun tempe bongkrek. Pesan Eyang Sumendhi: “Ojo nggawa tempe dele ning tempe bongkrek karo sega tumpeng sak panggangge” (Jangan membawa tempe kedelai namun tempe bongkrek lengkap dengan nasi tumpeng dengan panggangnya). Beliau juga berpesan, “Lan nak ora ana dina Jumat wage ing Sasi Syafar tindakno ing dina Rebo Wage” (dan kalau tidak ada hari Jumat wage di bulan Safar laksanakan di hari Rabu Wage). Makam tersebut kini dikenal dengan nama Makam Eyang Sumendhi Amijaya yang terletak di tengah-tengah antara Dukuh Jlegong dan Dukuh Banyuurip. Pesan dari Eyang Sumendhi Amijaya hingga kini masih dilaksanakan oleh masyarakat Banyuurip, Jlegong dan sekitarnya yakni dengan melaksanakan nyadran di bulan Safar pada hari dan ketentuan sesuai pesan Eyang Sumendhi Amijaya.

Eyang Sumendhi Amijaya setelah selesai melepas rasa lelah dan perbincangannya, Eyang Sumendhi Amijaya kembali ke Mataram dengan membawa delapan ekor atau empat pasang harimau dengan cara digirekake. Untuk mengenang tempat terakhir peristirahatan Eyang Sumendhi Amijaya dan tempat tongkatnya yang dikubur dibangun cungkup oleh warga Banyuurip dan sekitarnya di bawah pengawasan Lurah Sukiman Gondanglegi dan Bayan Mitro Wiyono pada saat itu. Kini makam dan cungkup tersebut telah dibangun secara permanen dan pada tahun 2001 oleh warga Dukuh Banyuurip, Jlegong dan sekitarnya diadakan pelebaran dengan cara membeli tanah di sekitarnya dengan gotong royong.

Desa Banyuurip dimasa itu belum ada yang memimpin dan orang pada umumnya masih bertindak seenaknya seperti hukum rimba, siapa yang kuat dialah yang menang. Pada saat itu, Banyuurip merupakan bumi perdikan atau tanah bebas pajak dengan nama Kademangan Pangrembe Banyuurip. Pada saat itu kademangan dipimpin oleh Eyang Demang Admo Wirono dari tahun 1914 sampai dengan 1954, kemudian pada tahun 1954 dilaksanakan pemilihan lurah yang diikuti oleh Mardiharjo dan Citro Pawiro yang kemudian dimenangkan oleh Citro Pawiro. Lurah Citro Pawiro menjabat dari tahun 1954-1971. Lengsernya Lurah Citro Pawiro kemudian digantikan oleh Samsul Bahri dari tahun 1971-1980. Selepas Samsul Bahri menjabat lurah, dilaksanakan pemilihan lurah yang diikuti oleh tiga orang calon yakni Mukri Effendi, Samsul Bahri dan Bagiyo. Pemilihan ini dimenangkan oleh Samsul Bahri sehingga menjabat untuk kedua kalinya dari tahun 1980 hingga 1989.

Tahun 1991 diadakan pemilihan kepala desa yang diikuti oleh Mashuri dan Sukardi, dimenangkan oleh Mashuri dan menjabat sampai tahun 1999.

Tahun 1999 diadakan pemilihan kepala desa yang diikuti Mashuri, Munajad dan Kaelani, dimenangkan oleh Mashuri. Mashuri menjabat yang kedua kali sampai tahun 2007. Tahun 2007 diadakan pemilihan kepala desa yang diikuti oleh Eko Budi Hartopo, Joko Widayanto dan Mukorobin, dimenangkan oleh Mukorobin dan menjabat sampai 2013. Tahun 2013 kembali dilaksanakan pilkades dengan calon tunggal Mukorobin, menjabat sampai 2019. Tahun 2019 dilaksanakan pemilihan kepala desa dengan peserta Mukorobin, Haryanto dan Haris Sudrajat. Pemilihan ini dimenangkan oleh Haryanto dimana Haryanto adalah buyut dari Demang Atmo Wirono (Demang pertama kali Kademangan Banyuurip).

Nama Banyuurip sendiri memiliki makna bahwa warga masyarakat Kelurahan Banyuurip adalah orang yang baik serta mempunyai harapan bahwa dengan nama Kelurahan Banyuurip menjadi kelurahan yang ayem tentrem, subur makmur, gemah ripah lohjinawi.`,
  visi: "MENUJU BANYUURIP YANG TRANSPARAN, AKUNTABEL, DAN SEPENUH HATI DALAM PELAYANAN",
  misi: [
    "Mengedepankan Pelayanan dengan Kejujuran dan Musyawarah Mufakat dalam setiap kegiatan, baik dengan Aparatur Desa maupun Masyarakat Desa Banyuurip;",
    "Meningkatkan profesionalitas dan melakukan renovasi system kerja aparatur Desa guna meningkatkan kualitas pelayanan kepada masyarakat;",
    "Mendengar, Menampung, Menerima, dan Melaksanakan aspirasi Masyarakat untuk mewujudkan pemerintahan yang bersih, jujur, adil, dan terhindar dari segala bentuk penyelewengan;",
    "Melaksanakan Pembangunan dengan paradigma baru, yaitu pembangunan tidak hanya di bidang sarana prasarana tetapi juga pembangunan dibidang Ekonomi, Sosial, dan Budaya, serta Kesehatan;",
    "Mendukung penuh segala bentuk kegiatan kepemudaan baik olahraga maupun kegiatan ekonomi kreatif."
  ],
  perangkatDesa: [
    { nama: "Bapak Sriyanto", jabatan: "Kepala Desa Banyuurip", foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
    { nama: "Ibu Nur Hidayah, S.Sos", jabatan: "Sekretaris Desa", foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
    { nama: "Bapak Joko Wahyudi", jabatan: "Kaur Keuangan", foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
    { nama: "Ibu Rahmawati", jabatan: "Kaur Perencanaan & Umum", foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
    { nama: "Bapak Bambang Sutrisno", jabatan: "Kasi Pelayanan & Kesejahteraan", foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" }
  ]
};

export const mockNews: NewsItem[] = [
  {
    id: "news-1",
    title: "Peluncuran Platform Banyuurip Digital Gateway Resmi Diuji Coba di Kantor Desa",
    slug: "peluncuran-banyuurip-digital-gateway",
    category: "Pemerintahan",
    summary: "Pemerintah Desa Banyuurip meluncurkan platform digital integratif hasil kolaborasi program KKN untuk mempermudah akses layanan publik dan informasi potensi desa.",
    content: "Desa Banyuurip melangkah maju dalam era transformasi digital dengan meresmikan peluncuran portal 'Banyuurip Digital Gateway'. Platform ini mengintegrasikan seluruh informasi desa, layanan masyarakat, database UMKM, transparansi anggaran APBDes, pendataan komoditas pertanian, hingga layanan edukasi kesehatan mandiri ISPA dalam satu pintu portal web yang mudah diakses warga melalui smartphone.",
    author: "Tim Media Desa Banyuurip",
    date: "2026-07-28",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    views: 342
  },
  {
    id: "news-2",
    title: "Pendataan Komoditas Unggulan Pertanian dan Pemetaaan Jalur Distribusi Logistik Hasil Panen Desa Banyuurip",
    slug: "pendataan-komoditas-pertanian-logistik-banyuurip",
    category: "Pertanian",
    summary: "Kelompok Tani Desa Banyuurip bersama perangkat desa menyelesaikan pemetaan aset gudang simpan dan kalender musim tanam padi serta cabai.",
    content: "Sektor pertanian dan peternakan Desa Banyuurip terus diperkuat dengan adanya pendataan komoditas unggulan secara digital. Data mencakup kalender musim tanam padi, jagung, cabai merah, serta jumlah populasi sapi potong di tiap dusun. Hal ini memudahkan pembeli dan mitra pedagang besar melacak jalur distribusi dan waktu panen raya.",
    author: "Dien-Salwa Agribisnis",
    date: "2026-07-25",
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    views: 289
  },
  {
    id: "news-3",
    title: "Sosialisasi Edukasi Budaya 5S Jepang untuk Warga Banyuurip: Mewujudkan Desa Bersih, Rapi, dan Disiplin",
    slug: "sosialisasi-budaya-5s-jepang-banyuurip",
    category: "Masyarakat",
    summary: "Penerapan konsep Seiri, Seiton, Seiso, Seiketsu, dan Shitsuke disesuaikan dengan kehidupan sehari-hari dan lingkungan balai desa Banyuurip.",
    content: "Program edukasi budaya 5S Jepang (Ringkas, Rapi, Resik, Rawat, Rajin) resmi diperkenalkan kepada warga dan pelaku usaha di Desa Banyuurip. Konsep ini bertujuan membangun kebiasaan hidup bersih, penataan peralatan kerja yang sistematis, serta kedisiplinan lingkungan sekitar dusun.",
    author: "Pemdes Banyuurip",
    date: "2026-07-22",
    imageUrl: "https://images.unsplash.com/photo-1528164344705-47542687990d?auto=format&fit=crop&w=800&q=80",
    views: 215
  }
];

export const mockLegalDocs: LegalDocument[] = [
  {
    id: "doc-1",
    nomor: "Perdes No. 03 Tahun 2025",
    tahun: 2025,
    judul: "Peraturan Desa tentang Rencana Pembangunan Jangka Menengah Desa (RPJMDes) Banyuurip 2025-2030",
    kategori: "Perdes",
    deskripsi: "Pedoman arah kebijakan dan strategi pembangunan fisik, sosial, ekonomi, dan digitalisasi Desa Banyuurip kurun waktu 5 tahun.",
    fileUrl: "#",
    tglTerbit: "2025-01-15",
    status: "Berlaku"
  },
  {
    id: "doc-2",
    nomor: "Perdes No. 01 Tahun 2026",
    tahun: 2026,
    judul: "Peraturan Desa tentang Anggaran Pendapatan dan Belanja Desa (APBDes) Banyuurip Tahun Anggaran 2026",
    kategori: "APBDes",
    deskripsi: "Rincian alokasi Dana Desa, Alokasi Dana Desa (ADD), Pendapatan Asli Desa (PADes) serta penggunaan belanja bidang pembangunan & pemberdayaan.",
    fileUrl: "#",
    tglTerbit: "2025-12-28",
    status: "Berlaku"
  },
  {
    id: "doc-3",
    nomor: "Perkades No. 04 Tahun 2025",
    tahun: 2025,
    judul: "Peraturan Kepala Desa tentang Pengelolaan Pusat Layanan Informasi Publik dan Digital Gateway Desa",
    kategori: "Perkades",
    deskripsi: "Petunjuk teknis operasional pengelolaan website desa, transparansi dokumen publik, dan standar pelayanan informasi warga.",
    fileUrl: "#",
    tglTerbit: "2025-04-10",
    status: "Berlaku"
  },
  {
    id: "doc-4",
    nomor: "Keputusan Kades No. 12/2026",
    tahun: 2026,
    judul: "Keputusan Kepala Desa tentang Pembentukan Pengelola Posyandu Kesehatan Integratif dan Tim Skrining Kesehatan Mandiri",
    kategori: "Keputusan Kades",
    deskripsi: "Penetapan kader kesehatan dan struktur pendampingan posyandu seluruh golongan usia di Desa Banyuurip.",
    fileUrl: "#",
    tglTerbit: "2026-02-05",
    status: "Berlaku"
  }
];

export const mockUMKM: UMKMItem[] = [
  {
    id: "umkm-1",
    namaUsaha: "Keripik Singkong & Pisang Crisp Banyuurip",
    pemilik: "Ibu Maryati",
    kategori: "Kuliner",
    deskripsi: "Olahan olahan olahan olahan olahan makanan ringan keripik khas Banyuurip berbahan singkong mentega dan pisang kepok lokal renyah & gurih.",
    alamat: "Dusun Krajan RT 02 / RW 01, Banyuurip",
    kontak: "0812-3456-7890",
    omzetBulanan: 4500000,
    produkUtama: "Keripik Singkong Balado & Pisang Karamel",
    imageUrl: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
    keuanganSimulasi: {
      pendapatan: 4500000,
      pengeluaran: 2700000,
      labaBersih: 1800000
    }
  },
  {
    id: "umkm-2",
    namaUsaha: "Peternakan Sapi Potong & Susu Subur Makmur",
    pemilik: "Bapak Supardi",
    kategori: "Pertanian",
    deskripsi: "Penyedia bibit sapi simmental, sapi limosin berkualitas serta pakan konsentrat ramah lingkungan.",
    alamat: "Dusun Wonosari RT 05 / RW 02, Banyuurip",
    kontak: "0857-1122-3344",
    omzetBulanan: 18500000,
    produkUtama: "Sapi Potong & Pupuk Organik Kandang",
    imageUrl: "https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
    keuanganSimulasi: {
      pendapatan: 18500000,
      pengeluaran: 11200000,
      labaBersih: 7300000
    }
  },
  {
    id: "umkm-3",
    namaUsaha: "Kerajinan Besi & Las Sinar Jaya",
    pemilik: "Bapak Agus Setiawan",
    kategori: "Kerajinan",
    deskripsi: "Pembuatan pagar besi, kanopi, perkakas pertanian tradisional (cangkul, sabit, egrek) bermutu tinggi.",
    alamat: "Dusun Banyuurip I RT 01 / RW 03, Banyuurip",
    kontak: "0821-9988-7766",
    omzetBulanan: 8000000,
    produkUtama: "Alat Pertanian & Kanopi Rumah",
    imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
    isVerified: true,
    keuanganSimulasi: {
      pendapatan: 8000000,
      pengeluaran: 5100000,
      labaBersih: 2900000
    }
  }
];

export const mockAgriculture: AgricultureData = {
  gambaranUmum: "Desa Banyuurip adalah salah satu desa di mana sektor pertanian menjadi sumber penghasilan utama bagi warganya. Komoditas utama yang diproduksi di desa adalah padi dan jagung, dengan sistem penanamannya disesuaikan berdasarkan kondisi tanah dan musim.",
  luasWilayahPertanian: [
    { jenisLahan: "Lahan sawah", luas: 141.00 },
    { jenisLahan: "Sawah irigasi setengah teknis", luas: 309.01 },
    { jenisLahan: "Sawah tadah hujan", luas: 65.00 },
    { jenisLahan: "Tegal/Kebun", luas: 76.00 },
    { jenisLahan: "Pekarangan", luas: 162.22 },
    { jenisLahan: "Lain-lain", luas: 113.38 }
  ],
  totalLuasWilayah: 450.01,
  sumberDataLuas: "BPP Kecamatan Klego",
  komoditasUnggulanData: [
    { nama: "Padi", produktivitas: "6,2 ton/ha" },
    { nama: "Jagung Hibrida", produktivitas: "4,5 ton/ha" }
  ],
  polaTanam: "Padi ➔ Padi ➔ Jagung / Kacang Tanah",
  gapoktanInfo: {
    nama: "Subur Makmur",
    ketua: "Bapak Darji",
    jumlahPoktan: 9
  },
  poktanList: [
    { nama: "Sidomukti I", ketua: "Sukardi", alamat: "Tlogosari RT22 RW06", anggota: 85 },
    { nama: "Sidomukti II", ketua: "Purwanto", alamat: "Banyuurip RT16 RW05", anggota: 43 },
    { nama: "Sidomuncul I", ketua: "Muadif", alamat: "Ngijo RT04 RW01", anggota: 50 },
    { nama: "Sidomuncul II", ketua: "Shodiq", alamat: "Ngijo RT03 RW01", anggota: 60 },
    { nama: "Harapan I", ketua: "Basuki", alamat: "Banyuurip RT14 RW01", anggota: 47 },
    { nama: "Harapan II", ketua: "Muh Thoha", alamat: "Palemrejo RT09 RW02", anggota: 60 },
    { nama: "Ngudi Rejeki I", ketua: "Supadi", alamat: "Ngeliyangan RT24 RW07", anggota: 26 },
    { nama: "Ngudi Rejeki II", ketua: "Juwadi", alamat: "Jlegong RT11 RW03", anggota: 82 },
    { nama: "Ngudi Rejeki III", ketua: "Jumanto", alamat: "Ngeliyangan RT27 RW07", anggota: 54 }
  ],
  komoditas: [
    {
      id: "agr-1",
      nama: "Padi IR-64 & Inpari 32",
      kategori: "Tanaman Pangan",
      luasLahan: 141.0,
      estimasiHasil: "6,2 ton/ha (Panen Raya MT 1 & MT 2)",
      musimTanam: "November - Februari (MT 1), Maret - Juni (MT 2)",
      musimPanen: "Maret & Juli (Panen Padi)",
      kelompokTani: "Gapoktan Subur Makmur (9 Poktan)",
      lokasi: "Sawah Irigasi & Tadah Hujan Banyuurip"
    },
    {
      id: "agr-2",
      nama: "Jagung Hibrida",
      kategori: "Tanaman Pangan",
      luasLahan: 76.0,
      estimasiHasil: "4,5 ton/ha (MT 3 Kemarau)",
      musimTanam: "Juli - Oktober (MT 3 Kemarau)",
      musimPanen: "Oktober - November",
      kelompokTani: "Gapoktan Subur Makmur",
      lokasi: "Lahan Tegal & Kebun Desa Banyuurip"
    },
    {
      id: "agr-3",
      nama: "Kacang Tanah & Hortikultura",
      kategori: "Palawija",
      luasLahan: 65.0,
      estimasiHasil: "2,8 ton/ha",
      musimTanam: "Agustus - November",
      musimPanen: "November (Akhir Kemarau)",
      kelompokTani: "Poktan Sidomukti & Harapan",
      lokasi: "Lahan Tegal & Sawah Tadah Hujan"
    },
    {
      id: "agr-4",
      nama: "Sapi Potong Simmental & Limosin",
      kategori: "Peternakan",
      luasLahan: 12.0,
      jumlahTernak: 420,
      estimasiHasil: "85 Ekor Panen Ternak / Tahun",
      musimTanam: "Sepanjang Tahun",
      musimPanen: "Menjelang Idul Adha & Hari Raya",
      kelompokTani: "Kelompok Peternak Lembu Suro",
      lokasi: "Kandang Komunal Dusun Banyuurip I & II"
    }
  ],
  logistikAset: [
    {
      id: "ast-1",
      namaAset: "Gudang Penyimpanan Padi & Rice Milling Unit (RMU)",
      kategori: "Gudang & Pengolahan",
      kapasitas: "150 Ton Padi Kering",
      lokasi: "Balai Desa / Sentra Logistik Banyuurip",
      status: "Beroperasi Aktif"
    },
    {
      id: "ast-2",
      namaAset: "Lumbung Pangan Poktan Tani Makmur",
      kategori: "Lumbung Cadangan",
      kapasitas: "50 Ton Cadangan Pangan Desa",
      lokasi: "Dusun Krajan",
      status: "Beroperasi Aktif"
    },
    {
      id: "ast-3",
      namaAset: "Kandang Komunal & Unit Pengolahan Pupuk Organik (UPPO)",
      kategori: "Peternakan & Pupuk",
      kapasitas: "200 Ekor Sapi & Produksi Pupuk 5 Ton/Bulan",
      lokasi: "Dusun Banyuurip II",
      status: "Beroperasi Aktif"
    }
  ],
  jalurDistribusi: [
    {
      rute: "Banyuurip -> Pasar Klego",
      tujuan: "Pasar Lokal Kecamatan Klego",
      jenisKomoditas: "Hasil Cabai, Sayur, & Beras",
      volumeBulan: "25 Ton / Bulan",
      modaTransportasi: "Pick-up & Truk Engkel"
    },
    {
      rute: "Banyuurip -> Pasar Ampel & Boyolali Kota",
      tujuan: "Pasar Induk Kabupaten Boyolali",
      jenisKomoditas: "Beras Medium/Super & Jagung Pipil",
      volumeBulan: "45 Ton / Bulan",
      modaTransportasi: "Truk 6 Roda"
    },
    {
      rute: "Banyuurip -> Sentra Ternak Solo / Semarang",
      tujuan: "Pasar Hewan Regional",
      jenisKomoditas: "Sapi Potong & Daging",
      volumeBulan: "15-20 Ekor / Bulan",
      modaTransportasi: "Truk Ternak Khusus"
    }
  ]
};

export const mockAPBDes: APBDesData = {
  tahun: 2026,
  totalPendapatan: 1590000000,
  totalRealisasiPendapatan: 1413000000,
  totalBelanja: 1550000000,
  pendapatan: [
    { 
      sumber: "Dana Desa (DD)", 
      anggaran: 750000000, 
      realisasi: 675000000, 
      jumlah: 750000000, 
      persen: 90.0, 
      porsiAnggaran: 47.17, 
      warna: "#10b981" 
    },
    { 
      sumber: "Alokasi Dana Desa (ADD)", 
      anggaran: 450000000, 
      realisasi: 405000000, 
      jumlah: 450000000, 
      persen: 90.0, 
      porsiAnggaran: 28.30, 
      warna: "#3b82f6" 
    },
    { 
      sumber: "Pajak Bagi Hasil", 
      anggaran: 150000000, 
      realisasi: 135000000, 
      jumlah: 150000000, 
      persen: 90.0, 
      porsiAnggaran: 9.43, 
      warna: "#8b5cf6" 
    },
    { 
      sumber: "Pendapatan Asli Desa (PADes)", 
      anggaran: 120000000, 
      realisasi: 102000000, 
      jumlah: 120000000, 
      persen: 85.0, 
      porsiAnggaran: 7.55, 
      warna: "#f59e0b" 
    },
    { 
      sumber: "Bantuan Keuangan", 
      anggaran: 120000000, 
      realisasi: 96000000, 
      jumlah: 120000000, 
      persen: 80.0, 
      porsiAnggaran: 7.55, 
      warna: "#ec4899" 
    }
  ],
  belanja: [
    { bidang: "Penyelenggaraan Pemerintahan Desa", jumlah: 580000000, persen: 32.0 },
    { bidang: "Pelaksanaan Pembangunan Desa (Fisik & Digital)", jumlah: 690000000, persen: 38.1 },
    { bidang: "Pembinaan Kemasyarakatan Desa", jumlah: 195000000, persen: 10.8 },
    { bidang: "Pemberdayaan Masyarakat & UMKM", jumlah: 247000000, persen: 13.6 },
    { bidang: "Penanggulangan Bencana & Keadaan Darurat", jumlah: 100000000, persen: 5.5 }
  ],
  panduanPajakPBB: [
    {
      langkah: 1,
      judul: "Cek NOP (Nomor Objek Pajak)",
      deskripsi: "Buka Surat Pemberitahuan Pajak Terhutang (SPPT) PBB-P2 tahun berjalan dan temukan 18 digit Nomor Objek Pajak (NOP) lahan/bangunan Anda."
    },
    {
      langkah: 2,
      judul: "Pilih Kanal Pembayaran Digital",
      deskripsi: "Anda dapat menggunakan aplikasi e-Samsat Jateng, Mobile Banking (Bank Jateng, BRI, Mandiri, BCA), DANA, OVO, Shopee, atau Indomaret/Alfamart."
    },
    {
      langkah: 3,
      judul: "Masukkan NOP & Tahun Pajak",
      deskripsi: "Pilih menu Pajak PBB -> Wilayah Kab. Boyolali -> Masukkan NOP Anda dan pilih tahun pajak (misal 2026)."
    },
    {
      langkah: 4,
      judul: "Konfirmasi & Simpan Bukti Bayar",
      deskripsi: "Periksa kembali nama wajib pajak dan jumlah tagihan. Lakukan pembayaran dan simpan struk/bukti transaksi digital untuk arsip desa."
    }
  ]
};

export const mockEdukasi5S: Edukasi5S = {
  konsep: [
    {
      istilahJepang: "Seiri (整理)",
      istilahIndo: "Ringkas",
      arti: "Memilah barang/peralatan yang diperlukan dan membuang/menyingkirkan yang tidak diperlukan lagi.",
      penerapanDesa: "Memilah dokumen administrasi desa yang aktif dan arsip lama, serta membersihkan barang bekas yang berpotensi menampung air hujan.",
      icon: "Scissors"
    },
    {
      istilahJepang: "Seiton (整頓)",
      istilahIndo: "Rapi",
      arti: "Menata dan menempatkan barang pada posisi yang jelas sehingga mudah dicari dan diambil saat dibutuhkan.",
      penerapanDesa: "Menata alat-alat pertanian di gudang kelompok tani dan kerapian berkas di meja kerja Balai Desa Banyuurip.",
      icon: "LayoutGrid"
    },
    {
      istilahJepang: "Seiso (清掃)",
      istilahIndo: "Resik",
      arti: "Membersihkan lingkungan kerja dan tempat tinggal dari debu, kotoran, dan sampah secara rutin.",
      penerapanDesa: "Kerja bakti gotong royong warga setiap Minggu pagi membersihkan saluran irigasi dan pekarangan rumah.",
      icon: "Sparkles"
    },
    {
      istilahJepang: "Seiketsu (清潔)",
      istilahIndo: "Rawat",
      arti: "Memehara standar kebersihan dan kerapian (Seiri, Seiton, Seiso) secara konsisten dan terus-menerus.",
      penerapanDesa: "Pembuatan tempat sampah terpilah organik/anorganik di depan tiap rumah dan pos ronda warga.",
      icon: "ShieldCheck"
    },
    {
      istilahJepang: "Shitsuke (躾)",
      istilahIndo: "Rajin",
      arti: "Membentuk kebiasaan dan kedisiplinan diri untuk mematuhi aturan dan tata tertib kebersihan secara mandiri.",
      penerapanDesa: "Kedisiplinan perangkat desa dalam melayani warga serta kesadaran masyarakat menjaga kebersihan sarana umum.",
      icon: "HeartHandshake"
    }
  ],
  manfaat: [
    "Menciptakan lingkungan Desa Banyuurip yang lebih sehat, bersih, dan nyaman bagi seluruh warga.",
    "Meningkatkan efisiensi kerja perangkat desa dan kelompok tani dalam menyimpan serta menemukan peralatan.",
    "Mencegah timbulnya sarang penyakit (seperti DBD dan ISPA) dengan kebersihan saluran air dan tempat tinggal.",
    "Membangun karakter masyarakat yang disiplin, tanggap, dan berbudaya tinggi."
  ]
};

export const mockISPAInfo: ISPAArticle = {
  judul: "E-Book RESPIRA: Panduan Edukasi & Skrining Mandiri ISPA Desa Banyuurip",
  ringkasan: "Modul edukasi kesehatan terintegrasi mengenai Infeksi Saluran Pernapasan Akut (ISPA), faktor risiko, pencegahan dini, dan fitur skrining mandiri untuk warga Desa Banyuurip.",
  pengertian: "Infeksi Saluran Pernapasan Akut (ISPA) adalah infeksi yang menyerang organ saluran pernapasan, seperti hidung, tenggorokan, saluran udara, atau paru-paru. ISPA mudah menular melalui percikan ludah (droplet) saat penderita batuk atau bersin, atau dari debu lingkungan.",
  penyebab: [
    "Virus pernapasan (Seperti Influenza virus, Rhinovirus, RSV).",
    "Bakteri pernapasan (Seperti Streptococcus pneumoniae).",
    "Paparan asap pembakaran sampah, debu jalanan, dan asap rokok.",
    "Perubahan cuaca ekstrem dan kelembapan udara yang buruk."
  ],
  gejala: [
    "Batuk berdahak atau batuk kering.",
    "Pilek, hidung tersumbat, atau bersin-bersin.",
    "Demam dan suhu tubuh meningkat (di atas 37.5°C).",
    "Nyeri tenggorokan atau rasa gatal saat menelan.",
    "Nyeri kepala, sesak napas ringan hingga sedang, dan badan terasa lemas."
  ],
  faktorRisiko: [
    "Balita dan Lansia (memiliki sistem kekebalan tubuh yang rentan).",
    "Kebiasaan merokok di dalam rumah atau dekat anggota keluarga.",
    "Paparan polusi udara dan sirkulasi ventilasi rumah yang kurang memadai.",
    "Kurangnya konsumsi gizi seimbang dan kurang istirahat."
  ],
  pencegahan: [
    "Mencuci tangan pakai sabun dan air mengalir secara teratur.",
    "Menggunakan masker saat berada di kerumunan atau lingkungan berdebu.",
    "Menjaga kebersihan sirkulasi udara rumah dan membuka jendela tiap pagi.",
    "Tidak membakar sampah sembarangan di sekitar lingkungan permukiman.",
    "Melakukan imunisasi dan konsumsi vitamin pendukung daya tahan tubuh."
  ],
  kapanKeFaskes: [
    "Sesak napas berat atau napas berbunyi (mengi/stridor).",
    "Demam tinggi bertahan lebih dari 3 hari berturut-turut.",
    "Bibir atau kuku tampak kebiruan (sianosis).",
    "Anak/Balita tampak sangat lemas, menolak minum/menyusu, atau kejang."
  ]
};

// Data Store Access Helper Functions (Supports PostgreSQL DB with Fallback)
export async function getVillageProfile(): Promise<VillageProfile> {
  return mockVillageProfile;
}

export async function getNewsList(): Promise<NewsItem[]> {
  try {
    if (process.env.DATABASE_URL && prisma) {
      const dbNews = await prisma.berita.findMany({
        orderBy: { date: 'desc' }
      });
      if (dbNews.length > 0) {
        return dbNews.map(n => ({
          id: n.id,
          title: n.title,
          slug: n.slug,
          category: n.category,
          summary: n.summary,
          content: n.content,
          author: n.author,
          date: n.date.toISOString().split('T')[0],
          imageUrl: n.imageUrl || mockNews[0].imageUrl,
          views: n.views
        }));
      }
    }
  } catch (error) {
    console.warn("PostgreSQL not connected yet, using mock news list.");
  }
  return mockNews;
}

export async function getLegalDocuments(): Promise<LegalDocument[]> {
  try {
    if (process.env.DATABASE_URL && prisma) {
      const dbDocs = await prisma.dokumenHukum.findMany({
        orderBy: { tahun: 'desc' }
      });
      if (dbDocs.length > 0) {
        return dbDocs.map(d => ({
          id: d.id,
          nomor: d.nomor,
          tahun: d.tahun,
          judul: d.judul,
          kategori: d.kategori,
          deskripsi: d.deskripsi,
          fileUrl: d.fileUrl || "#",
          tglTerbit: d.tglTerbit.toISOString().split('T')[0],
          status: d.status
        }));
      }
    }
  } catch (error) {
    console.warn("PostgreSQL not connected yet, using mock legal docs.");
  }
  return mockLegalDocs;
}

export async function getUMKMList(): Promise<UMKMItem[]> {
  try {
    if (process.env.DATABASE_URL && prisma) {
      const dbUMKM = await prisma.uMKM.findMany({
        orderBy: { createdAt: 'desc' }
      });
      if (dbUMKM.length > 0) {
        return dbUMKM.map(u => ({
          id: u.id,
          namaUsaha: u.namaUsaha,
          pemilik: u.pemilik,
          kategori: u.kategori,
          deskripsi: u.deskripsi,
          alamat: u.alamat,
          kontak: u.kontak,
          omzetBulanan: u.omzetBulanan || 0,
          produkUtama: u.produkUtama,
          imageUrl: u.imageUrl || mockUMKM[0].imageUrl,
          isVerified: u.isVerified,
          keuanganSimulasi: {
            pendapatan: u.omzetBulanan || 5000000,
            pengeluaran: (u.omzetBulanan || 5000000) * 0.6,
            labaBersih: (u.omzetBulanan || 5000000) * 0.4
          }
        }));
      }
    }
  } catch (error) {
    console.warn("PostgreSQL not connected yet, using mock UMKM list.");
  }
  return mockUMKM;
}

export async function getAgricultureData(): Promise<AgricultureData> {
  return mockAgriculture;
}

export async function getAPBDesData(): Promise<APBDesData> {
  return mockAPBDes;
}

export async function getEdukasi5SData(): Promise<Edukasi5S> {
  return mockEdukasi5S;
}

export async function getISPAData(): Promise<ISPAArticle> {
  return mockISPAInfo;
}
