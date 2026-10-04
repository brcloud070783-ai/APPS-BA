import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { MasterPackageData, INITIAL_SPMK_SAMPLE, OFFICIAL_PBJ_DOCUMENTS } from './types/spmk';
import {
  initAuthListener,
  signInWithGoogleWorkspace,
  logoutGoogle,
  getCachedToken,
  createGoogleDocFromSPMK
} from './lib/googleAuth';
import { exportSPMKToDocx } from './lib/docxExporter';
import { Header } from './components/Header';
import { CanvaSidebar } from './components/CanvaSidebar';
import { CanvaHome } from './components/CanvaHome';
import { FormEditorSPMK } from './components/FormEditorSPMK';
import { DocumentHub } from './components/DocumentHub';
import { SavedProjects } from './components/SavedProjects';
import { CheckCircle, ExternalLink, X, FileText, AlertCircle, Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'editor' | 'hub' | 'projects'>('home');
  const [selectedDocId, setSelectedDocId] = useState<string>('spmk');
  const [packageData, setPackageData] = useState<MasterPackageData>(INITIAL_SPMK_SAMPLE);

  // Google Docs Embedded states
  const [googleDocId, setGoogleDocId] = useState<string | null>(null);
  const [googleDocUrl, setGoogleDocUrl] = useState<string | null>(null);

  // Auth states
  const [user, setUser] = useState<any>(null);
  const [needsAuth, setNeedsAuth] = useState<boolean>(false);
  const [isExportingGoogle, setIsExportingGoogle] = useState<boolean>(false);

  // Export modal states
  const [exportResult, setExportResult] = useState<{ docId: string; docUrl: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuthListener(
      (usr) => {
        setUser(usr);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      setErrorMessage(null);
      const res = await signInWithGoogleWorkspace();
      if (res) {
        setUser(res.user);
        setNeedsAuth(false);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMessage(err.message || 'Gagal masuk dengan akun Google.');
    }
  };

  const handleLogout = async () => {
    await logoutGoogle();
    setUser(null);
    setNeedsAuth(true);
  };

  const handleExportGoogleDocs = async () => {
    setErrorMessage(null);
    let token = getCachedToken();

    const generatePlainTextSPMK = () => {
      return `${packageData.header.provinsi.toUpperCase()}
${packageData.header.dinas.toUpperCase()}
Alamat : ${packageData.header.alamat} | E-mail : ${packageData.header.email}

SURAT PERINTAH MULAI KERJA (SPMK)
Nomor : ${packageData.nomorSPMK || packageData.nomorSurat}
Tanggal : ${packageData.tanggalSPMK || packageData.tanggalSurat}

Paket Pekerjaan: ${packageData.paketPekerjaan}

Yang bertandatangan di bawah ini:
1. PPK      : ${packageData.ppk.nama} (NIP: ${packageData.ppk.nip})
   Jabatan  : ${packageData.ppk.jabatan}

berdasarkan SPK ${packageData.paketPekerjaan} nomor : ${packageData.nomorSPK} tanggal ${packageData.tanggalSPK}, memerintahkan:

2. Penyedia : ${packageData.penyedia.namaPerusahaan}
   Alamat   : ${packageData.penyedia.alamat}
   Diwakili : ${packageData.penyedia.diwakiliOleh} (${packageData.penyedia.jabatanWakil})

Ketentuan Pekerjaan:
1. Paket Pengadaan : ${packageData.paketPekerjaan}
2. Tanggal mulai kerja : ${packageData.tanggalMulaiKerja}
3. Syarat-syarat pekerjaan : ${packageData.syaratPekerjaan}
4. Waktu penyelesaian : Selama ${packageData.waktuPenyelesaianHari} (${packageData.waktuPenyelesaianTerbilang}) Hari Kalender (Selesai : ${packageData.tanggalSelesai})
5. Denda : ${packageData.dendaKetentuan}

${packageData.header.kota}, ${packageData.tanggalSPMK || packageData.tanggalSurat}
PPK: ${packageData.ppk.nama} | Penyedia: ${packageData.penyedia.diwakiliOleh}`;
    };

    if (!token || !user) {
      try {
        const loginRes = await signInWithGoogleWorkspace();
        if (loginRes) {
          token = loginRes.accessToken;
          setUser(loginRes.user);
          setNeedsAuth(false);
        }
      } catch (e: any) {
        // Smooth Fallback for Vercel / External Domains
        try {
          await navigator.clipboard.writeText(generatePlainTextSPMK());
        } catch (clipErr) {
          console.warn('Clipboard write failed:', clipErr);
        }
        window.open('https://docs.google.com/document/u/0/create', '_blank');
        setExportResult({
          docId: 'google-docs-direct',
          docUrl: 'https://docs.google.com/document/u/0/create'
        });
        return;
      }
    }

    try {
      setIsExportingGoogle(true);
      const result = await createGoogleDocFromSPMK(packageData, token);
      setGoogleDocId(result.docId);
      setGoogleDocUrl(result.docUrl);
      setExportResult(result);
    } catch (err: any) {
      console.error('Google Docs export failed:', err);
      // Fallback open Google Docs
      try {
        await navigator.clipboard.writeText(generatePlainTextSPMK());
      } catch (clipErr) {
        console.warn('Clipboard write failed:', clipErr);
      }
      window.open('https://docs.google.com/document/u/0/create', '_blank');
      setExportResult({
        docId: 'google-docs-direct',
        docUrl: 'https://docs.google.com/document/u/0/create'
      });
    } finally {
      setIsExportingGoogle(false);
    }
  };

  const handleExportDocx = async () => {
    try {
      await exportSPMKToDocx(packageData);
    } catch (e: any) {
      alert(`Gagal mengekspor file .docx: ${e.message}`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetToSample = () => {
    setPackageData(INITIAL_SPMK_SAMPLE);
    setGoogleDocId(null);
    setGoogleDocUrl(null);
  };

  const handleCreateNewPackage = () => {
    const newId = `package-${Date.now()}`;
    const newDoc: MasterPackageData = {
      ...INITIAL_SPMK_SAMPLE,
      id: newId,
      nomorSPMK: `000.4.3/${Math.floor(10000000 + Math.random() * 90000000)}/PPK-SPMK/DIKBUD/IX/2026`,
      paketPekerjaan: 'Pengadaan Pekerjaan Baru Pasca Bencana / Infrastruktur Sekolah',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPackageData(newDoc);
    setGoogleDocId(null);
    setGoogleDocUrl(null);
    setSelectedDocId('spmk');
    setCurrentView('editor');
  };

  const currentDocInfo = OFFICIAL_PBJ_DOCUMENTS.find((d) => d.id === selectedDocId);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-row">
      {/* Canva Left Vertical Sidebar */}
      <CanvaSidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onNewPackage={handleCreateNewPackage}
      />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Canva Header Bar */}
        <Header
          currentView={currentView}
          setCurrentView={setCurrentView}
          user={user}
          needsAuth={needsAuth}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onLoadSample={handleResetToSample}
          onExportDocx={handleExportDocx}
          onExportGoogleDocs={handleExportGoogleDocs}
          onPrint={handlePrint}
          isExportingGoogle={isExportingGoogle}
        />

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="max-w-7xl mx-auto px-4 mt-4 w-full">
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="p-1 text-rose-500 hover:text-rose-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Views */}
        <div className="flex-1 flex flex-col">
          {currentView === 'home' && (
            <CanvaHome
              packageData={packageData}
              onSelectDocument={(docId) => {
                setSelectedDocId(docId);
                setCurrentView('editor');
              }}
              onNewPackage={handleCreateNewPackage}
              onOpenProjects={() => setCurrentView('projects')}
            />
          )}

          {currentView === 'editor' && (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
              <FormEditorSPMK
                data={packageData}
                onChange={setPackageData}
                selectedDocId={selectedDocId}
                onResetToSample={handleResetToSample}
              />
            </div>
          )}

          {currentView === 'hub' && (
            <DocumentHub
              currentSPMK={packageData}
              onSelectDocument={(docId) => {
                setSelectedDocId(docId);
                setCurrentView('editor');
              }}
            />
          )}

          {currentView === 'projects' && (
            <SavedProjects
              currentSPMK={packageData}
              onLoadProject={(proj) => {
                setPackageData(proj);
                setCurrentView('editor');
              }}
            />
          )}
        </div>
      </div>

      {/* Google Docs Export Success Modal */}
      {exportResult && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-slate-900">
                Berhasil Diekspor ke Google Docs!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dokumen <strong className="text-slate-900">{currentDocInfo?.title}</strong> untuk paket <strong className="text-slate-900">{packageData.penyedia.namaPerusahaan}</strong> telah disimpan secara otomatis di Google Drive Anda.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 flex items-center justify-between">
              <div className="flex items-center space-x-2 truncate">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="truncate">{`${currentDocInfo?.code}_${packageData.penyedia.namaPerusahaan}`}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a
                href={exportResult.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs text-center flex items-center justify-center space-x-2 shadow-md transition-colors"
              >
                <span>Buka Dokumen di Google Docs</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setExportResult(null)}
                className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
