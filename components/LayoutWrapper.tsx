'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide public navbar and footer on admin & login pages
  const isAdminOrLoginPage = pathname.startsWith('/admin') || pathname.startsWith('/login');

  if (isAdminOrLoginPage) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col">
        <main className="flex-grow">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
