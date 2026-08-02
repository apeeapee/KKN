import type { Metadata } from 'next';
import './globals.css';
import { DataProvider } from '@/components/DataProvider';
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata: Metadata = {
  title: 'Desa Banyuurip - Digital Gateway & Portal Resmi Desa',
  description: 'Portal Web Resmi Desa Banyuurip, Kec. Klego, Kab. Boyolali. Menampilkan Profil Desa, Potensi Pertanian, E-Book & Skrining ISPA RESPIRA, JDIH Hukum Desa, Transparansi APBDes, & Katalog UMKM.',
  keywords: ['Desa Banyuurip', 'Boyolali', 'Digital Gateway Desa', 'Profil Desa', 'ISPA RESPIRA', 'Pertanian Boyolali', 'JDIH Desa', 'APBDes Banyuurip', 'UMKM Banyuurip'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased selection:bg-emerald-600 selection:text-white">
        <DataProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </DataProvider>
      </body>
    </html>
  );
}
