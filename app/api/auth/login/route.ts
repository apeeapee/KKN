import { NextResponse } from 'next/server';
import { setAdminSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password, customAccounts } = await request.json();

    const normalizedUsername = (username || '').toLowerCase().trim();

    // 1. Default admin credentials
    const defaultAdmins = [
      { username: 'admin', pass: 'banyuurip2026' },
      { username: 'perangkatdesa', pass: 'banyuurip2026' },
      { username: 'kaurkeuangan', pass: 'banyuurip2026' },
      { username: 'kkn_banyuurip', pass: 'banyuurip2026' }
    ];

    const isDefaultMatch = defaultAdmins.some(
      a => a.username === normalizedUsername && a.pass === password
    );

    // 2. Custom dynamic admin accounts stored in localStorage
    const isCustomMatch = Array.isArray(customAccounts) && customAccounts.some(
      (u: { username: string; password?: string; status: string }) =>
        (u.username || '').toLowerCase().trim() === normalizedUsername &&
        u.password === password &&
        u.status === 'Aktif'
    );

    if (isDefaultMatch || isCustomMatch) {
      await setAdminSession();
      return NextResponse.json({ success: true, message: 'Login Admin Berhasil' });
    }

    return NextResponse.json({ success: false, message: 'Username atau Password salah (atau akun sedang Nonaktif)!' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}
