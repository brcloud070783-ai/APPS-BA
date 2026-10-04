import React, { useState } from 'react';
import { MasterPackageData, OFFICIAL_PBJ_DOCUMENTS } from '../types/spmk';
import {
  Search,
  X,
  Sparkles,
  FileText,
  ClipboardCheck,
  FileCheck,
  Building2,
  Calculator,
  TrendingUp,
  MapPin,
  Ruler,
  Banknote,
  Award,
  Receipt,
  CheckSquare,
  Send,
  Camera,
  ArrowRight,
  Plus,
  FolderKanban,
  CheckCircle2
} from 'lucide-react';

interface CanvaHomeProps {
  packageData: MasterPackageData;
  onSelectDocument: (docId: string) => void;
  onNewPackage: () => void;
  onOpenProjects: () => void;
}

export const CanvaHome: React.FC<CanvaHomeProps> = ({
  packageData,
  onSelectDocument,
  onNewPackage,
  onOpenProjects,
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTabFilter, setActiveTabFilter] = useState<'beranda' | 'template'>('beranda');

  // Color mapping matching Canva Image 2 icons
  const getIconBg = (id: string) => {
    switch (id) {
      case 'spmk': return 'bg-orange-500 shadow-orange-500/20';
      case 'ba_stl': return 'bg-rose-500 shadow-rose-500/20';
      case 'ba_mc0': return 'bg-fuchsia-600 shadow-fuchsia-600/20';
      case 'ba_um': return 'bg-purple-600 shadow-purple-600/20';
      case 'bakp': return 'bg-teal-500 shadow-teal-500/20';
      case 'baphp': return 'bg-emerald-500 shadow-emerald-500/20';
      case 'bastp': return 'bg-sky-500 shadow-sky-500/20';
      case 'bast_pa_kpa': return 'bg-violet-600 shadow-violet-600/20';
      case 'bAP': return 'bg-indigo-600 shadow-indigo-600/20';
      case 'bast_fho': return 'bg-blue-600 shadow-blue-600/20';
      case 'kuitansi': return 'bg-pink-600 shadow-pink-600/20';
      case 'checklist_spp_ls': return 'bg-cyan-600 shadow-cyan-600/20';
      case 'permohonan_bayar': return 'bg-blue-500 shadow-blue-500/20';
      case 'foto_dokumentasi': return 'bg-purple-500 shadow-purple-500/20';
      default: return 'bg-purple-600 shadow-purple-600/20';
    }
  };

  const getDocIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText className="w-6 h-6 text-white" />;
      case 'MapPin': return <MapPin className="w-6 h-6 text-white" />;
      case 'Ruler': return <Ruler className="w-6 h-6 text-white" />;
      case 'Banknote': return <Banknote className="w-6 h-6 text-white" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-white" />;
      case 'ClipboardCheck': return <ClipboardCheck className="w-6 h-6 text-white" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6 text-white" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-white" />;
      case 'Calculator': return <Calculator className="w-6 h-6 text-white" />;
      case 'Award': return <Award className="w-6 h-6 text-white" />;
      case 'Receipt': return <Receipt className="w-6 h-6 text-white" />;
      case 'CheckSquare': return <CheckSquare className="w-6 h-6 text-white" />;
      case 'Send': return <Send className="w-6 h-6 text-white" />;
      case 'Camera': return <Camera className="w-6 h-6 text-white" />;
      default: return <FileText className="w-6 h-6 text-white" />;
    }
  };

  const filteredDocs = OFFICIAL_PBJ_DOCUMENTS.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.fungsi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-slate-50 min-h-screen pb-16 font-sans">
      {/* Top Canva Announcement Banner */}
      {showBanner && (
        <div className="bg-gradient-to-r from-sky-400 via-purple-600 to-indigo-600 text-white px-4 py-2 text-xs font-medium flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2 mx-auto">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span>
              Pengguna instansi dinas dapat mengakses 14 template dokumen pengadaan barang & jasa (PBJ) dan integrasi Google Docs secara otomatis.
            </span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Canva Hero Header with Soft Pastel Gradient */}
      <div className="relative mx-4 sm:mx-8 mt-4 rounded-3xl bg-gradient-to-tr from-cyan-100/70 via-purple-100/80 to-pink-100/70 p-6 sm:p-12 border border-white/60 shadow-xs overflow-hidden">
        {/* Floating Top Badge */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur text-purple-900 text-xs font-bold border border-purple-200/60 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Integrasi Google Docs & Drive</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-800">
            Mau buat dokumen pengadaan apa hari ini?
          </h1>

          {/* Pill Switcher */}
          <div className="inline-flex items-center bg-white/80 backdrop-blur p-1 rounded-full border border-purple-200/80 shadow-xs space-x-1">
            <button
              onClick={() => setActiveTabFilter('beranda')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTabFilter === 'beranda'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏠 Beranda Paket
            </button>
            <button
              onClick={() => setActiveTabFilter('template')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTabFilter === 'template'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📑 14 Template Dokumen
            </button>
          </div>

          {/* Canva Search Bar */}
          <div className="relative max-w-xl mx-auto mt-4">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-purple-500">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari dokumen pengadaan, SPMK, BAPHP, BASTP, Kuitansi..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white text-slate-900 placeholder-slate-400 text-xs sm:text-sm border border-purple-200 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>
        </div>

        {/* Image 2: Canva Row of 14 Circular Procurement Document Icons */}
        <div className="mt-10 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center space-x-4 sm:space-x-6 min-w-max px-2 justify-center">
            {filteredDocs.map((doc, idx) => (
              <button
                key={doc.id}
                onClick={() => onSelectDocument(doc.id)}
                className="flex flex-col items-center space-y-2 group cursor-pointer"
              >
                <div className="relative">
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${getIconBg(
                      doc.id
                    )}`}
                  >
                    {getDocIcon(doc.iconName)}
                  </div>
                  {doc.id === 'spmk' && (
                    <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 font-extrabold text-[9px] px-1.5 py-0.2 rounded-full border border-white uppercase shadow-xs">
                      Utama
                    </span>
                  )}
                  {doc.id === 'kuitansi' && (
                    <span className="absolute -top-1 -right-1 bg-purple-600 text-white font-extrabold text-[9px] px-1.5 py-0.2 rounded-full border border-white uppercase shadow-xs">
                      Baru
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-bold text-slate-700 group-hover:text-purple-700 max-w-[80px] text-center line-clamp-2 transition-colors">
                  {doc.shortTitle.replace(/^\d+\.\s*/, '')}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Section Below Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 space-y-10">
        {/* Active Package Banner Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Paket Pekerjaan Aktif</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              {packageData.paketPekerjaan}
            </h2>
            <p className="text-xs text-slate-500">
              Penyedia: <strong className="text-slate-800">{packageData.penyedia.namaPerusahaan}</strong> | Nilai: <strong className="text-blue-700">Rp {packageData.nilaiKontrakRp.toLocaleString('id-ID')}</strong>
            </p>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onOpenProjects}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5"
            >
              <FolderKanban className="w-4 h-4 text-slate-500" />
              <span>Arsip Proyek</span>
            </button>
            <button
              onClick={onNewPackage}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-500/20 transition-all flex items-center justify-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Paket Baru</span>
            </button>
          </div>
        </div>

        {/* Section: Template Dokumen untuk Anda (Grid of 14 Documents) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              Template Dokumen untuk Anda
            </h2>
            <span className="text-xs text-purple-600 font-bold hover:underline cursor-pointer">
              Lihat semua (14 Dokumen)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => onSelectDocument(doc.id)}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-purple-300 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                      {doc.code}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-purple-600 transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {doc.fungsi}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">{doc.landasanHukum}</span>
                  <span className="font-bold text-purple-600 group-hover:translate-x-0.5 transition-transform">
                    Buka Editor →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
