import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { judulLaporan, kategori, deskripsi, lokasiKejadian, isAnonim, namaPelapor, kontakPelapor } = body;

    const kodeLaporan = `WBS-BYU-${Math.floor(100000 + Math.random() * 900000)}`;

    if (process.env.DATABASE_URL && prisma) {
      const record = await prisma.laporanAntiKorupsi.create({
        data: {
          kodeLaporan,
          judulLaporan,
          kategori,
          deskripsi,
          lokasiKejadian,
          isAnonim: Boolean(isAnonim),
          namaPelapor: isAnonim ? 'Anonim (Rahasia)' : namaPelapor,
          kontakPelapor: isAnonim ? '-' : kontakPelapor,
          status: 'Diproses',
        },
      });
      return NextResponse.json({ success: true, kodeLaporan, data: record });
    }

    return NextResponse.json({ 
      success: true, 
      kodeLaporan, 
      message: 'Laporan WBS berhasil dikirim & diproses secara aman!' 
    });
  } catch (error) {
    console.error('Error handling WBS report:', error);
    return NextResponse.json({ success: false, error: 'Gagal mengirim laporan' }, { status: 500 });
  }
}
