import React from 'react';
import {
  Home,
  PlusCircle,
  Folder,
  Layers,
  FileText,
  Share2,
  Settings,
  Sparkles,
  FolderKanban
} from 'lucide-react';

interface CanvaSidebarProps {
  currentView: 'home' | 'editor' | 'hub' | 'projects';
  setCurrentView: (view: 'home' | 'editor' | 'hub' | 'projects') => void;
  onNewPackage: () => void;
}

export const CanvaSidebar: React.FC<CanvaSidebarProps> = ({
  currentView,
  setCurrentView,
  onNewPackage,
}) => {
  return (
    <aside className="w-18 sm:w-20 bg-white border-r border-slate-200 flex flex-col items-center py-4 space-y-6 shrink-0 z-30 select-none print:hidden shadow-xs">
      {/* Brand Logo Icon */}
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-500/20">
        PBJ
      </div>

      {/* Primary Action Button (+) */}
      <button
        onClick={onNewPackage}
        className="flex flex-col items-center space-y-1 group"
        title="Buat Paket Pekerjaan Baru"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
          <PlusCircle className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-semibold text-purple-700">Buat</span>
      </button>

      {/* Navigation Links */}
      <nav className="flex flex-col items-center space-y-5 w-full pt-2">
        <button
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center space-y-1 w-full py-1.5 transition-colors ${
            currentView === 'home'
              ? 'text-purple-600 font-bold border-r-4 border-purple-600 bg-purple-50/60'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Beranda</span>
        </button>

        <button
          onClick={() => setCurrentView('editor')}
          className={`flex flex-col items-center space-y-1 w-full py-1.5 transition-colors ${
            currentView === 'editor'
              ? 'text-purple-600 font-bold border-r-4 border-purple-600 bg-purple-50/60'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px]">Editor</span>
        </button>

        <button
          onClick={() => setCurrentView('hub')}
          className={`flex flex-col items-center space-y-1 w-full py-1.5 transition-colors ${
            currentView === 'hub'
              ? 'text-purple-600 font-bold border-r-4 border-purple-600 bg-purple-50/60'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px]">14 Dokumen</span>
        </button>

        <button
          onClick={() => setCurrentView('projects')}
          className={`flex flex-col items-center space-y-1 w-full py-1.5 transition-colors ${
            currentView === 'projects'
              ? 'text-purple-600 font-bold border-r-4 border-purple-600 bg-purple-50/60'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FolderKanban className="w-5 h-5" />
          <span className="text-[10px]">Proyek</span>
        </button>
      </nav>

      {/* Footer Info Badge */}
      <div className="mt-auto pt-4 flex flex-col items-center space-y-1">
        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">
          Docs
        </div>
        <span className="text-[9px] text-slate-400 font-medium">Drive Sync</span>
      </div>
    </aside>
  );
};
