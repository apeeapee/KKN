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

export interface AgricultureData {
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
  }>;
  jalurDistribusi: Array<{
    rute: string;
    tujuan: string;
    jenisKomoditas: string;
    volumeBulan: string;
    modaTransportasi: string;
  }>;
}

export interface APBDesData {
  tahun: number;
  totalPendapatan: number;
  totalBelanja: number;
  pendapatan: Array<{ sumber: string; jumlah: number; persen: number }>;
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

export interface ISPALogItem {
  id: string;
  namaWarga: string;
  usia: string;
  risiko: 'Rendah' | 'Sedang' | 'Tinggi';
  tanggalInput: string;
  tindakanAdmin: 'Edukasi Selesai' | 'Pemantauan Kader' | 'Dirujuk ke Faskes';
}

export interface LaporanAntiKorupsiItem {
  id: string;
  kodeLaporan: string;
  judulLaporan: string;
  kategori: string;
  deskripsi: string;
  lokasiKejadian: string;
  isAnonim: boolean;
  namaPelapor: string;
  kontakPelapor: string;
  status: 'Diproses' | 'Diverifikasi' | 'Selesai';
  date: string;
}

export interface DesaAntiKorupsiInfo {
  judul: string;
  deskripsi: string;
  indikatorKPK: Array<{
    nomor: number;
    judul: string;
    subIndikator: string[];
    statusPencapaian: string;
  }>;
  paktaIntegritas: string[];
}

// Fallback Mock Dataset for Desa Banyuurip
export const mockVillageProfile: VillageProfile = {
  nama: "Desa Banyuurip",
  kecamatan: "Klego",
  kabupaten: "Boyolali",
  provinsi: "Jawa Tengah",
  kodePos: "57385",
  luasWilayah: "342,5 Hektar",
  jumlahPenduduk: 3420,
  jumlahKK: 1120,
  dusunList: ["Dusun Banyuurip I", "Dusun Banyuurip II", "Dusun Krajan", "Dusun Wonosari"],
  sejarah: "Nama Desa Banyuurip berasal dari bahasa Jawa 'Banyu' (Air) dan 'Urip' (Kehidupan), yang bermakna 'Air Kehidupan'. Sejak zaman dahulu, sumber air dan aliran sungai di wilayah Banyuurip tidak pernah kering serta memberi penghidupan dan kesuburan bagi tanah pertanian masyarakat setempat. Masyarakat Banyuurip dikenal dengan kearifan lokal yang menjunjung tinggi kebersamaan, gotong royong, dan nilai-nilai leluhur.",
  visi: "Mewujudkan Desa Banyuurip yang Mandiri, Sejahtera, Berbudaya, dan Terdigitalisasi Berbasis Potensi Pertanian dan Ekonomi Kerakyatan.",
  misi: [
    "Meningkatkan kualitas pelayanan publik melalui digitalisasi tata kelola desa terpadu.",
    "Mengembangkan potensi pertanian, peternakan, dan UMKM desa berbasis teknologi modern.",
    "Meningkatkan kualitas kesehatan dan kesejahteraan masyarakat secara berkelanjutan.",
    "Mewujudkan keterbukaan informasi publik dan transparansi tata kelola keuangan desa.",
    "Melestarikan budaya lokal serta membudayakan perilaku hidup bersih dan tertib di masyarakat."
  ],
  perangkatDesa: [
    { nama: "Bapak Sriyanto", jabatan: "Kepala Desa Banyuurip", foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
    { nama: "Ibu Nur Hidayah, S.Sos", jabatan: "Sekretaris Desa", foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
    { nama: "Bapak Joko Wahyudi", jabatan: "Kaur Keuangan", foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
    { nama: "Ibu Rahmawati", jabatan: "Kaur Perencanaan & Umum", foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
    { nama: "Bapak Bambang Sutrisno", jabatan: "Kasi Pelayanan & Kesejahteraan", foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" }
  ]
};

export const mockISPALogs: ISPALogItem[] = [
  {
    id: "log-1",
    namaWarga: "Agus Priyanto",
    usia: "28 Tahun",
    risiko: "Rendah",
    tanggalInput: "24 July 2026",
    tindakanAdmin: "Edukasi Selesai"
  },
  {
    id: "log-2",
    namaWarga: "Dewi Sartika",
    usia: "3 Tahun",
    risiko: "Sedang",
    tanggalInput: "24 July 2026",
    tindakanAdmin: "Pemantauan Kader"
  },
  {
    id: "log-3",
    namaWarga: "Slamet Rahardjo",
    usia: "54 Tahun",
    risiko: "Tinggi",
    tanggalInput: "24 July 2026",
    tindakanAdmin: "Dirujuk ke Faskes"
  },
  {
    id: "log-4",
    namaWarga: "Bapak Suparman",
    usia: "45 Tahun",
    risiko: "Tinggi",
    tanggalInput: "24 July 2026",
    tindakanAdmin: "Dirujuk ke Faskes"
  },
  {
    id: "log-5",
    namaWarga: "Agus Priyanto",
    usia: "28 Tahun",
    risiko: "Rendah",
    tanggalInput: "20 July 2026",
    tindakanAdmin: "Edukasi Selesai"
  }
];

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
    author: "Muhammad Daffa Fahreza",
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
    fileUrl: "https://drive.google.com/file/d/1A2b3C4d5E6f7G8h9I0j-rpjmdes-banyuurip/view",
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
    fileUrl: "https://drive.google.com/file/d/1B2c3D4e5F6g7H8i9J0k-apbdes-banyuurip-2026/view",
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
    fileUrl: "https://drive.google.com/file/d/1C2d3E4f5G6h7I8j9K0l-perkades-digital-gateway/view",
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
    fileUrl: "https://drive.google.com/file/d/1D2e3F4g5H6i7J8k9L0m-sk-posyandu-respira/view",
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
    deskripsi: "Olahan makanan ringan keripik khas Banyuurip berbahan singkong mentega dan pisang kepok lokal renyah & gurih.",
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
  komoditas: [
    {
      id: "agr-1",
      nama: "Padi IR-64 & Inpari 32",
      kategori: "Tanaman Pangan",
      luasLahan: 145.5,
      estimasiHasil: "870 Ton / Musim Panen",
      musimTanam: "November - Februari (MT 1), Maret - Juni (MT 2)",
      musimPanen: "Maret & Juli",
      kelompokTani: "Poktan Tani Makmur I & II",
      lokasi: "Sawah Blok Krajan & Wonosari"
    },
    {
      id: "agr-2",
      nama: "Jagung Hibrida",
      kategori: "Tanaman Pangan",
      luasLahan: 62.0,
      estimasiHasil: "310 Ton / Musim",
      musimTanam: "July - Oktober (MT 3)",
      musimPanen: "Oktober - November",
      kelompokTani: "Poktan Sumber Rejeki",
      lokasi: "Lahan Tegal Banyuurip II"
    },
    {
      id: "agr-3",
      nama: "Cabai Merah Keriting",
      kategori: "Hortikultura",
      luasLahan: 28.0,
      estimasiHasil: "140 Ton / Tahun",
      musimTanam: "April - Mei",
      musimPanen: "Agustus - Oktober (Panen Berkala)",
      kelompokTani: "Gapoktan Banyuurip Sejahtera",
      lokasi: "Lahan Hortikultura Wonosari"
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
  totalPendapatan: 1845000000,
  totalBelanja: 1812000000,
  pendapatan: [
    { sumber: "Dana Desa (APBN)", jumlah: 980000000, persen: 53.1 },
    { sumber: "Alokasi Dana Desa (ADD Boyolali)", jumlah: 540000000, persen: 29.3 },
    { sumber: "Bagi Hasil Pajak & Retribusi", jumlah: 125000000, persen: 6.8 },
    { sumber: "Pendapatan Asli Desa (PADes)", jumlah: 110000000, persen: 6.0 },
    { sumber: "Bantuan Keuangan Provinsi/Kabupaten", jumlah: 90000000, persen: 4.8 }
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

export const mockDesaAntiKorupsiInfo: DesaAntiKorupsiInfo = {
  judul: "Desa Banyuurip Bebas Korupsi & Berintegritas",
  deskripsi: "Komitmen penuh Pemerintah Desa Banyuurip dalam memenuhi 5 Indikator Program Desa Anti Korupsi Komisi Pemberantasan Korupsi (KPK) untuk mewujudkan tata kelola pemerintahan yang jujur, terbuka, dan bertanggung jawab.",
  indikatorKPK: [
    {
      nomor: 1,
      judul: "Penguatan Tata Kelola Pemerintahan Desa",
      subIndikator: [
        "Adanya Peraturan Desa tentang Keterbukaan Informasi Publik.",
        "Sistem Pembayaran dan Pengadaan Barang/Jasa secara Non-Tunai (Digital).",
        "Pencatatan Aset Pertanian dan Barang Milik Desa yang Akurat."
      ],
      statusPencapaian: "100% Terpenuhi"
    },
    {
      nomor: 2,
      judul: "Penguatan Pengawasan Internal & Eksternal",
      subIndikator: [
        "Pemeriksaan berkala laporan keuangan oleh BPD (Badan Permusyawaratan Desa).",
        "Penyediaan Kanal Whistleblowing System (WBS) Pengaduan Warga.",
        "Tindak lanjut cepat laporan pengaduan masyarakat secara terbuka."
      ],
      statusPencapaian: "100% Terpenuhi"
    },
    {
      nomor: 3,
      judul: "Penguatan Kualitas Pelayanan Publik",
      subIndikator: [
        "Kepastian standar waktu dan biaya pelayanan administrasi (Tanpa Pungli).",
        "Portal Pelayanan Satu Pintu (Banyuurip Digital Gateway).",
        "Survei Kepuasan Masyarakat secara berkala."
      ],
      statusPencapaian: "100% Terpenuhi"
    },
    {
      nomor: 4,
      judul: "Penguatan Peran Serta Masyarakat",
      subIndikator: [
        "Pelibatan warga dalam Musrenbangdes penyusunan APBDes.",
        "Akses publik terhadap Baliho & Grafik APBDes di Balai Desa.",
        "Gotong royong dan kesadaran hukum masyarakat."
      ],
      statusPencapaian: "100% Terpenuhi"
    },
    {
      nomor: 5,
      judul: "Kearifan Lokal & Budaya Integritas",
      subIndikator: [
        "Penerapan Budaya 5S (Ringkas, Rapi, Resik, Rawat, Rajin) Perangkat Desa.",
        "Pakta Integritas Bebas Pungli Perangkat Desa Banyuurip.",
        "Nilai-nilai kejujuran leluhur 'Air Kehidupan Banyuurip'."
      ],
      statusPencapaian: "100% Terpenuhi"
    }
  ],
  paktaIntegritas: [
    "Tidak menerima suap, gratifikasi, atau imbalan dalam bentuk apa pun atas pelayanan publik desa.",
    "Mengelola Dana Desa dan APBDes secara transparan, akuntabel, dan tepat sasaran bagi kesejahteraan warga.",
    "Menolak segala bentuk nepotisme dan komersialisasi jabatan perangkat desa.",
    "Siap ditindak tegas apabila terbukti melakukan pelanggaran hukum atau tindakan koruptif."
  ]
};

export const mockAntiKorupsiLaporan: LaporanAntiKorupsiItem[] = [
  {
    id: "wbs-1",
    kodeLaporan: "WBS-BYU-782910",
    judulLaporan: "Pemeriksaan Transparansi Penggunaan Anggaran Pembelian Benih Padi Dusun Krajan",
    kategori: "Transparansi Anggaran",
    deskripsi: "Mohon informasi rincian pembagian benih bantuan tani agar tepat sasaran sesuai daftar Poktan.",
    lokasiKejadian: "Balai Tani Dusun Krajan",
    isAnonim: true,
    namaPelapor: "Anonim (Rahasia)",
    kontakPelapor: "-",
    status: "Diverifikasi",
    date: "2026-07-26"
  },
  {
    id: "wbs-2",
    kodeLaporan: "WBS-BYU-319402",
    judulLaporan: "Saran Peningkatan Kecepatan Pengurusan Keterangan Usaha UMKM",
    kategori: "Pelayanan Publik",
    deskripsi: "Pelayanan pengurusan surat Keterangan Usaha (SKU) sangat baik, mohon dipertahankan kelancarannya.",
    lokasiKejadian: "Kantor Desa Banyuurip",
    isAnonim: false,
    namaPelapor: "Bpk. Sutrisno (UMKM Wonosari)",
    kontakPelapor: "0812-9988-7711",
    status: "Selesai",
    date: "2026-07-20"
  }
];

// Pure Mock Getter Helpers
export async function getVillageProfile(): Promise<VillageProfile> {
  return mockVillageProfile;
}

export async function getNewsList(): Promise<NewsItem[]> {
  return mockNews;
}

export async function getLegalDocuments(): Promise<LegalDocument[]> {
  return mockLegalDocs;
}

export async function getUMKMList(): Promise<UMKMItem[]> {
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

export async function getDesaAntiKorupsiData(): Promise<DesaAntiKorupsiInfo> {
  return mockDesaAntiKorupsiInfo;
}

export async function getWBSLaporanList(): Promise<LaporanAntiKorupsiItem[]> {
  return mockAntiKorupsiLaporan;
}
