import React from 'react';
import {
  FileText,
  Download,
  Printer,
  Sparkles,
  LogOut,
  Layers,
  Share2,
  FolderKanban,
  Home
} from 'lucide-react';
import { User } from 'firebase/auth';

interface HeaderProps {
  currentView: 'home' | 'editor' | 'hub' | 'projects';
  setCurrentView: (view: 'home' | 'editor' | 'hub' | 'projects') => void;
  user: User | null;
  needsAuth: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onLoadSample: () => void;
  onExportDocx: () => void;
  onExportGoogleDocs: () => void;
  onPrint: () => void;
  isExportingGoogle: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  user,
  onLogin,
  onLogout,
  onLoadSample,
  onExportDocx,
  onExportGoogleDocs,
  onPrint,
  isExportingGoogle,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: View Breadcrumbs / Toggles */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentView('home')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentView === 'home'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Beranda</span>
            </button>

            <button
              onClick={() => setCurrentView('editor')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentView === 'editor'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Editor A4</span>
            </button>

            <button
              onClick={() => setCurrentView('hub')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentView === 'hub'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">14 Dokumen</span>
            </button>
          </div>

          {/* Center Title */}
          <div className="hidden lg:flex items-center space-x-2 bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Otomasi Dokumen PBJ & Google Workspace</span>
          </div>

          {/* Right Action buttons & User auth */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onLoadSample}
              className="hidden md:flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 text-xs font-semibold transition-colors"
              title="Isi contoh data Kalimantan Utara"
            >
              <span>Contoh Data</span>
            </button>

            {/* Google Docs Export */}
            <button
              onClick={onExportGoogleDocs}
              disabled={isExportingGoogle}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors disabled:opacity-50"
              title="Buat Google Docs di Google Drive Anda"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{isExportingGoogle ? 'Mengekspor...' : 'Google Docs'}</span>
            </button>

            {/* Docx Export */}
            <button
              onClick={onExportDocx}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition-colors"
              title="Unduh file .docx"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">.DOCX</span>
            </button>

            {/* Print / PDF */}
            <button
              onClick={onPrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
              title="Cetak atau PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cetak</span>
            </button>

            {/* Google Auth Status */}
            {user ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-8 h-8 rounded-full border border-slate-300"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                  title="Keluar Google"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="gsi-material-button text-xs py-1 px-2.5 h-8 flex items-center gap-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-semibold transition-all shadow-xs"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>Google Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
