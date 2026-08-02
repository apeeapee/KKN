'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  mockNews, 
  mockLegalDocs, 
  mockUMKM, 
  mockAgriculture, 
  mockAPBDes, 
  mockAntiKorupsiLaporan,
  mockISPALogs,
  mockVillageProfile,
  NewsItem, 
  LegalDocument, 
  UMKMItem, 
  AgricultureData, 
  APBDesData, 
  LaporanAntiKorupsiItem,
  ISPALogItem,
  VillageProfile
} from '@/lib/mock-data';

interface DataContextType {
  newsList: NewsItem[];
  legalDocs: LegalDocument[];
  umkmList: UMKMItem[];
  agriData: AgricultureData;
  apbdesData: APBDesData;
  wbsList: LaporanAntiKorupsiItem[];
  ispaLogs: ISPALogItem[];
  villageProfile: VillageProfile;

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

  updateAPBDes: (updated: Partial<APBDesData>) => void;

  addWBSReport: (report: Omit<LaporanAntiKorupsiItem, 'id' | 'kodeLaporan' | 'status' | 'date'>) => string;
  updateWBSStatus: (id: string, status: 'Diproses' | 'Diverifikasi' | 'Selesai') => void;
  deleteWBSReport: (id: string) => void;

  updateISPATindakan: (id: string, tindakan: ISPALogItem['tindakanAdmin']) => void;

  addPerangkatDesa: (p: { nama: string; jabatan: string; foto: string }) => void;
  deletePerangkatDesa: (nama: string) => void;
  updateSejarahDesa: (sejarah: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [newsList, setNewsList] = useState<NewsItem[]>(mockNews);
  const [legalDocs, setLegalDocs] = useState<LegalDocument[]>(mockLegalDocs);
  const [umkmList, setUmkmList] = useState<UMKMItem[]>(mockUMKM);
  const [agriData, setAgriData] = useState<AgricultureData>(mockAgriculture);
  const [apbdesData, setApbdesData] = useState<APBDesData>(mockAPBDes);
  const [wbsList, setWbsList] = useState<LaporanAntiKorupsiItem[]>(mockAntiKorupsiLaporan);
  const [ispaLogs, setIspaLogs] = useState<ISPALogItem[]>(mockISPALogs);
  const [villageProfile, setVillageProfile] = useState<VillageProfile>(mockVillageProfile);

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

      const savedIspa = localStorage.getItem('byu_ispa_logs');
      if (savedIspa) setIspaLogs(JSON.parse(savedIspa));

      const savedProfile = localStorage.getItem('byu_profile');
      if (savedProfile) setVillageProfile(JSON.parse(savedProfile));
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
  const saveIspa = (items: ISPALogItem[]) => { setIspaLogs(items); localStorage.setItem('byu_ispa_logs', JSON.stringify(items)); };
  const saveProfile = (p: VillageProfile) => { setVillageProfile(p); localStorage.setItem('byu_profile', JSON.stringify(p)); };

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

  const updateISPATindakan = (id: string, tindakan: ISPALogItem['tindakanAdmin']) => {
    saveIspa(ispaLogs.map(i => i.id === id ? { ...i, tindakanAdmin: tindakan } : i));
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

  return (
    <DataContext.Provider value={{
      newsList,
      legalDocs,
      umkmList,
      agriData,
      apbdesData,
      wbsList,
      ispaLogs,
      villageProfile,
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
      updateAPBDes,
      addWBSReport,
      updateWBSStatus,
      deleteWBSReport,
      updateISPATindakan,
      addPerangkatDesa,
      deletePerangkatDesa,
      updateSejarahDesa
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
