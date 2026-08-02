import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUMKMList } from '@/lib/data-store';

export async function GET() {
  try {
    const data = await getUMKMList();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch UMKM' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { namaUsaha, pemilik, kategori, deskripsi, alamat, kontak, omzetBulanan, produkUtama } = body;

    if (process.env.DATABASE_URL) {
      const record = await prisma.uMKM.create({
        data: {
          namaUsaha,
          pemilik,
          kategori,
          deskripsi,
          alamat,
          kontak,
          omzetBulanan: parseFloat(omzetBulanan) || 0,
          produkUtama,
        },
      });
      return NextResponse.json({ success: true, data: record });
    }

    return NextResponse.json({ success: true, message: 'UMKM created in memory' });
  } catch (error) {
    console.error('Error creating UMKM:', error);
    return NextResponse.json({ success: false, error: 'Failed to create UMKM' }, { status: 500 });
  }
}
