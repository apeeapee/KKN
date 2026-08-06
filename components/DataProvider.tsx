'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  mockNews, 
  mockLegalDocs, 
  mockUMKM, 
  mockAgriculture, 
  mockAPBDes, 
  mockAntiKorupsiLaporan,
  mockAntiKorupsiIndikator,
  mockISPALogs,
  mockVillageProfile,
  mockAdminUsers,
  NewsItem, 
  LegalDocument, 
  UMKMItem, 
  AgricultureData, 
  APBDesData, 
  LaporanAntiKorupsiItem,
  IndikatorAntiKorupsiItem,
  ISPALogItem,
  VillageProfile,
  AdminUser
} from '@/lib/mock-data';

interface DataContextType {
  newsList: NewsItem[];
  legalDocs: LegalDocument[];
  umkmList: UMKMItem[];
  agriData: AgricultureData;
  apbdesData: APBDesData;
  wbsList: LaporanAntiKorupsiItem[];
  antiKorupsiIndikatorList: IndikatorAntiKorupsiItem[];
  ispaLogs: ISPALogItem[];
  villageProfile: VillageProfile;
  adminUsers: AdminUser[];

  // CRUD Actions
  addNews: (news: Omit<NewsItem, 'id' | 'views'>) => void;
  updateNews: (id: string, updated: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;

  addLegalDoc: (doc: Omit<LegalDocument, 'id'>) => void;
  updateLegalDoc: (id: string, updated: Partial<LegalDocument>) => void;
  deleteLegalDoc: (id: string) => void;

  addUMKM: (umkm: Omit<UMKMItem, 'id' | 'isVerified' | 'keuanganSimulasi'>) => void;
  updateUMKM: (id: string, updated: Partial<UMKMItem>) => void;
  toggleVerifyUMKM: (id: string) => void;
  deleteUMKM: (id: string) => void;

  updateAgriKomoditas: (id: string, updated: Partial<AgricultureData['komoditas'][0]>) => void;
  addAgriKomoditas: (kom: Omit<AgricultureData['komoditas'][0], 'id'>) => void;
  deleteAgriKomoditas: (id: string) => void;
  updateAgriData: (updated: Partial<AgricultureData>) => void;

  addBalaiDesaAsset: (asset: Omit<AgricultureData['logistikAset'][0], 'id'>) => void;
  updateBalaiDesaAssetStatus: (id: string, status: string) => void;
  deleteBalaiDesaAsset: (id: string) => void;

  updateAPBDes: (updated: Partial<APBDesData>) => void;

  addWBSReport: (report: Omit<LaporanAntiKorupsiItem, 'id' | 'kodeLaporan' | 'status' | 'date'>) => string;
  updateWBSStatus: (id: string, status: 'Diproses' | 'Diverifikasi' | 'Selesai') => void;
  deleteWBSReport: (id: string) => void;

  addAntiKorupsiIndikator: (ind: Omit<IndikatorAntiKorupsiItem, 'id'>) => void;
  updateAntiKorupsiIndikator: (id: string, updated: Partial<IndikatorAntiKorupsiItem>) => void;
  deleteAntiKorupsiIndikator: (id: string) => void;

  updateISPATindakan: (id: string, tindakan: ISPALogItem['tindakanAdmin']) => void;
  deleteISPALog: (id: string) => void;

  addPerangkatDesa: (p: { nama: string; jabatan: string; foto: string }) => void;
  deletePerangkatDesa: (nama: string) => void;
  updateSejarahDesa: (sejarah: string) => void;

  addAdminUser: (user: Omit<AdminUser, 'id' | 'createdAt'>) => void;
  updateAdminUser: (id: string, updated: Partial<AdminUser>) => void;
  deleteAdminUser: (id: string) => void;
  toggleStatusAdminUser: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [newsList, setNewsList] = useState<NewsItem[]>(mockNews);
  const [legalDocs, setLegalDocs] = useState<LegalDocument[]>(mockLegalDocs);
  const [umkmList, setUmkmList] = useState<UMKMItem[]>(mockUMKM);
  const [agriData, setAgriData] = useState<AgricultureData>(mockAgriculture);
  const [apbdesData, setApbdesData] = useState<APBDesData>(mockAPBDes);
  const [wbsList, setWbsList] = useState<LaporanAntiKorupsiItem[]>(mockAntiKorupsiLaporan);
  const [antiKorupsiIndikatorList, setAntiKorupsiIndikatorList] = useState<IndikatorAntiKorupsiItem[]>(mockAntiKorupsiIndikator);
  const [ispaLogs, setIspaLogs] = useState<ISPALogItem[]>(mockISPALogs);
  const [villageProfile, setVillageProfile] = useState<VillageProfile>(mockVillageProfile);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(mockAdminUsers);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedNews = localStorage.getItem('byu_news');
      if (savedNews) setNewsList(JSON.parse(savedNews));

      const savedDocs = localStorage.getItem('byu_docs');
      if (savedDocs) setLegalDocs(JSON.parse(savedDocs));

      const savedUMKM = localStorage.getItem('byu_umkm');
      if (savedUMKM) setUmkmList(JSON.parse(savedUMKM));

      const savedAgri = localStorage.getItem('byu_agri');
      if (savedAgri) setAgriData(JSON.parse(savedAgri));

      const savedApbdes = localStorage.getItem('byu_apbdes');
      if (savedApbdes) setApbdesData(JSON.parse(savedApbdes));

      const savedWbs = localStorage.getItem('byu_wbs');
      if (savedWbs) setWbsList(JSON.parse(savedWbs));

      const savedIndikator = localStorage.getItem('byu_anti_korupsi_indikator');
      if (savedIndikator) setAntiKorupsiIndikatorList(JSON.parse(savedIndikator));

      const savedIspa = localStorage.getItem('byu_ispa_logs');
      if (savedIspa) setIspaLogs(JSON.parse(savedIspa));

      const savedProfile = localStorage.getItem('byu_profile');
      if (savedProfile) setVillageProfile(JSON.parse(savedProfile));

      const savedAdminUsers = localStorage.getItem('byu_admin_users');
      if (savedAdminUsers) setAdminUsers(JSON.parse(savedAdminUsers));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  // Sync to localStorage
  const saveNews = (items: NewsItem[]) => { setNewsList(items); localStorage.setItem('byu_news', JSON.stringify(items)); };
  const saveDocs = (items: LegalDocument[]) => { setLegalDocs(items); localStorage.setItem('byu_docs', JSON.stringify(items)); };
  const saveUMKM = (items: UMKMItem[]) => { setUmkmList(items); localStorage.setItem('byu_umkm', JSON.stringify(items)); };
  const saveAgri = (data: AgricultureData) => { setAgriData(data); localStorage.setItem('byu_agri', JSON.stringify(data)); };
  const saveApbdes = (data: APBDesData) => { setApbdesData(data); localStorage.setItem('byu_apbdes', JSON.stringify(data)); };
  const saveWbs = (items: LaporanAntiKorupsiItem[]) => { setWbsList(items); localStorage.setItem('byu_wbs', JSON.stringify(items)); };
  const saveIndikator = (items: IndikatorAntiKorupsiItem[]) => { setAntiKorupsiIndikatorList(items); localStorage.setItem('byu_anti_korupsi_indikator', JSON.stringify(items)); };
  const saveIspa = (items: ISPALogItem[]) => { setIspaLogs(items); localStorage.setItem('byu_ispa_logs', JSON.stringify(items)); };
  const saveProfile = (p: VillageProfile) => { setVillageProfile(p); localStorage.setItem('byu_profile', JSON.stringify(p)); };
  const saveAdminUsers = (items: AdminUser[]) => { setAdminUsers(items); localStorage.setItem('byu_admin_users', JSON.stringify(items)); };

  // CRUD Handlers
  const addNews = (news: Omit<NewsItem, 'id' | 'views'>) => {
    const newItem: NewsItem = { ...news, id: `news-${Date.now()}`, views: 1 };
    saveNews([newItem, ...newsList]);
  };

  const updateNews = (id: string, updated: Partial<NewsItem>) => {
    saveNews(newsList.map(n => n.id === id ? { ...n, ...updated } : n));
  };

  const deleteNews = (id: string) => {
    saveNews(newsList.filter(n => n.id !== id));
  };

  const addLegalDoc = (doc: Omit<LegalDocument, 'id'>) => {
    const newItem: LegalDocument = { ...doc, id: `doc-${Date.now()}` };
    saveDocs([newItem, ...legalDocs]);
  };

  const updateLegalDoc = (id: string, updated: Partial<LegalDocument>) => {
    saveDocs(legalDocs.map(d => d.id === id ? { ...d, ...updated } : d));
  };

  const deleteLegalDoc = (id: string) => {
    saveDocs(legalDocs.filter(d => d.id !== id));
  };

  const addUMKM = (umkm: Omit<UMKMItem, 'id' | 'isVerified' | 'keuanganSimulasi'>) => {
    const omzet = umkm.omzetBulanan || 3000000;
    const newItem: UMKMItem = {
      ...umkm,
      id: `umkm-${Date.now()}`,
      isVerified: true,
      keuanganSimulasi: {
        pendapatan: omzet,
        pengeluaran: omzet * 0.6,
        labaBersih: omzet * 0.4
      }
    };
    saveUMKM([newItem, ...umkmList]);
  };

  const updateUMKM = (id: string, updated: Partial<UMKMItem>) => {
    saveUMKM(umkmList.map(u => u.id === id ? { ...u, ...updated } : u));
  };

  const toggleVerifyUMKM = (id: string) => {
    saveUMKM(umkmList.map(u => u.id === id ? { ...u, isVerified: !u.isVerified } : u));
  };

  const deleteUMKM = (id: string) => {
    saveUMKM(umkmList.filter(u => u.id !== id));
  };

  const updateAgriKomoditas = (id: string, updated: Partial<AgricultureData['komoditas'][0]>) => {
    const updatedKom = agriData.komoditas.map(k => k.id === id ? { ...k, ...updated } : k);
    saveAgri({ ...agriData, komoditas: updatedKom });
  };

  const addAgriKomoditas = (kom: Omit<AgricultureData['komoditas'][0], 'id'>) => {
    const newItem = { ...kom, id: `agr-${Date.now()}` };
    saveAgri({ ...agriData, komoditas: [...agriData.komoditas, newItem] });
  };

  const deleteAgriKomoditas = (id: string) => {
    saveAgri({ ...agriData, komoditas: agriData.komoditas.filter(k => k.id !== id) });
  };

  const updateAgriData = (updated: Partial<AgricultureData>) => {
    saveAgri({ ...agriData, ...updated });
  };

  const addBalaiDesaAsset = (asset: Omit<AgricultureData['logistikAset'][0], 'id'>) => {
    const newItem = { ...asset, id: `ast-${Date.now()}` };
    saveAgri({ ...agriData, logistikAset: [newItem, ...agriData.logistikAset] });
  };

  const updateBalaiDesaAssetStatus = (id: string, status: string) => {
    const updated = agriData.logistikAset.map(a => a.id === id ? { ...a, status } : a);
    saveAgri({ ...agriData, logistikAset: updated });
  };

  const deleteBalaiDesaAsset = (id: string) => {
    saveAgri({ ...agriData, logistikAset: agriData.logistikAset.filter(a => a.id !== id) });
  };

  const updateAPBDes = (updated: Partial<APBDesData>) => {
    saveApbdes({ ...apbdesData, ...updated });
  };

  const addWBSReport = (report: Omit<LaporanAntiKorupsiItem, 'id' | 'kodeLaporan' | 'status' | 'date'>) => {
    const kode = `WBS-BYU-${Math.floor(100000 + Math.random() * 900000)}`;
    const newItem: LaporanAntiKorupsiItem = {
      ...report,
      id: `wbs-${Date.now()}`,
      kodeLaporan: kode,
      status: 'Diproses',
      date: new Date().toISOString().split('T')[0]
    };
    saveWbs([newItem, ...wbsList]);
    return kode;
  };

  const updateWBSStatus = (id: string, status: 'Diproses' | 'Diverifikasi' | 'Selesai') => {
    saveWbs(wbsList.map(w => w.id === id ? { ...w, status } : w));
  };

  const deleteWBSReport = (id: string) => {
    saveWbs(wbsList.filter(w => w.id !== id));
  };

  const addAntiKorupsiIndikator = (ind: Omit<IndikatorAntiKorupsiItem, 'id'>) => {
    const newItem: IndikatorAntiKorupsiItem = {
      ...ind,
      id: `ind-${Date.now()}`
    };
    saveIndikator([newItem, ...antiKorupsiIndikatorList]);
  };

  const updateAntiKorupsiIndikator = (id: string, updated: Partial<IndikatorAntiKorupsiItem>) => {
    saveIndikator(antiKorupsiIndikatorList.map(i => i.id === id ? { ...i, ...updated } : i));
  };

  const deleteAntiKorupsiIndikator = (id: string) => {
    saveIndikator(antiKorupsiIndikatorList.filter(i => i.id !== id));
  };

  const updateISPATindakan = (id: string, tindakan: ISPALogItem['tindakanAdmin']) => {
    saveIspa(ispaLogs.map(i => i.id === id ? { ...i, tindakanAdmin: tindakan } : i));
  };

  const deleteISPALog = (id: string) => {
    saveIspa(ispaLogs.filter(i => i.id !== id));
  };

  const addPerangkatDesa = (p: { nama: string; jabatan: string; foto: string }) => {
    const updated = {
      ...villageProfile,
      perangkatDesa: [...villageProfile.perangkatDesa, p]
    };
    saveProfile(updated);
  };

  const deletePerangkatDesa = (nama: string) => {
    const updated = {
      ...villageProfile,
      perangkatDesa: villageProfile.perangkatDesa.filter(p => p.nama !== nama)
    };
    saveProfile(updated);
  };

  const updateSejarahDesa = (sejarah: string) => {
    const updated = { ...villageProfile, sejarah };
    saveProfile(updated);
  };

  const addAdminUser = (user: Omit<AdminUser, 'id' | 'createdAt'>) => {
    const newUser: AdminUser = {
      ...user,
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      avatarUrl: user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    };
    saveAdminUsers([...adminUsers, newUser]);
  };

  const updateAdminUser = (id: string, updated: Partial<AdminUser>) => {
    saveAdminUsers(adminUsers.map(u => u.id === id ? { ...u, ...updated } : u));
  };

  const deleteAdminUser = (id: string) => {
    saveAdminUsers(adminUsers.filter(u => u.id !== id));
  };

  const toggleStatusAdminUser = (id: string) => {
    saveAdminUsers(adminUsers.map(u => u.id === id ? { ...u, status: u.status === 'Aktif' ? 'Nonaktif' : 'Aktif' } : u));
  };

  return (
    <DataContext.Provider value={{
      newsList,
      legalDocs,
      umkmList,
      agriData,
      apbdesData,
      wbsList,
      antiKorupsiIndikatorList,
      ispaLogs,
      villageProfile,
      adminUsers,
      addNews,
      updateNews,
      deleteNews,
      addLegalDoc,
      updateLegalDoc,
      deleteLegalDoc,
      addUMKM,
      updateUMKM,
      toggleVerifyUMKM,
      deleteUMKM,
      updateAgriKomoditas,
      addAgriKomoditas,
      deleteAgriKomoditas,
      updateAgriData,
      addBalaiDesaAsset,
      updateBalaiDesaAssetStatus,
      deleteBalaiDesaAsset,
      updateAPBDes,
      addWBSReport,
      updateWBSStatus,
      deleteWBSReport,
      addAntiKorupsiIndikator,
      updateAntiKorupsiIndikator,
      deleteAntiKorupsiIndikator,
      updateISPATindakan,
      deleteISPALog,
      addPerangkatDesa,
      deletePerangkatDesa,
      updateSejarahDesa,
      addAdminUser,
      updateAdminUser,
      deleteAdminUser,
      toggleStatusAdminUser
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
