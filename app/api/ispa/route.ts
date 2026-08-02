import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, usia, dusun, gejala, skorRisiko, kategoriRisiko, rekomendasi } = body;

    if (process.env.DATABASE_URL) {
      const record = await prisma.iSPARecord.create({
        data: {
          nama,
          usia: parseInt(usia) || 0,
          dusun,
          gejala: JSON.stringify(gejala || []),
          skorRisiko: parseInt(skorRisiko) || 0,
          kategoriRisiko,
          rekomendasi: Array.isArray(rekomendasi) ? rekomendasi.join('; ') : rekomendasi,
        },
      });
      return NextResponse.json({ success: true, data: record });
    }

    return NextResponse.json({ success: true, message: 'Assessment saved in memory' });
  } catch (error) {
    console.error('Error saving ISPA record:', error);
    return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
  }
}
