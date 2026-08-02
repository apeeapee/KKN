import { NextResponse } from 'next/server';
import { setAdminSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Default admin credentials (Can be changed in database/env)
    if ((username === 'admin' || username === 'perangkatdesa') && password === 'banyuurip2026') {
      await setAdminSession();
      return NextResponse.json({ success: true, message: 'Login Admin Berhasil' });
    }

    return NextResponse.json({ success: false, message: 'Username atau Password salah!' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}
