import React from 'react';
import { OFFICIAL_PBJ_DOCUMENTS, SPMKData } from '../types/spmk';
import {
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
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface DocumentHubProps {
  currentSPMK: SPMKData;
  onSelectDocument: (docId: string) => void;
}

export const DocumentHub: React.FC<DocumentHubProps> = ({
  currentSPMK,
  onSelectDocument,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'FileText': return <FileText className="w-5 h-5" />;
      case 'ClipboardCheck': return <ClipboardCheck className="w-5 h-5" />;
      case 'FileCheck': return <FileCheck className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Calculator': return <Calculator className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'MapPin': return <MapPin className="w-5 h-5" />;
      case 'Ruler': return <Ruler className="w-5 h-5" />;
      case 'Banknote': return <Banknote className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      case 'Receipt': return <Receipt className="w-5 h-5" />;
      case 'CheckSquare': return <CheckSquare className="w-5 h-5" />;
      case 'Send': return <Send className="w-5 h-5" />;
      case 'Camera': return <Camera className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner / Intro */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-800/40 relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold uppercase tracking-wider">
            <span>Matriks 14 Dokumen Resmi Pengadaan Barang & Jasa (PBJ)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Sistem Administrasi Otomasi Dokumen Perkantoran
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Aplikasi ini mendukung 14 alur dokumen utama pengadaan barang dan jasa instansi pemerintah (Sesuai Perpres No. 12/2021 & Permendagri No. 77/2020). Dokumen utama <strong className="text-white">SPMK (Surat Perintah Mulai Kerja)</strong> sudah dapat diolah secara penuh dengan output Google Docs, Word .DOCX, dan PDF.
          </p>

          <div className="pt-2 flex items-center space-x-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Proyek Aktif: <strong className="text-white">{currentSPMK.penyedia.namaPerusahaan}</strong>
            </span>
            <span className="text-slate-500">•</span>
            <span>{currentSPMK.paketPekerjaan.substring(0, 45)}...</span>
          </div>
        </div>
      </div>

      {/* Grid of 14 Documents */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Daftar 14 Dokumen Administrasi Pengadaan</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            1 Dokumen Siap Digunakan | 13 Dokumen Integrasi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {OFFICIAL_PBJ_DOCUMENTS.map((doc, idx) => {
            const isActive = doc.status === 'active';

            return (
              <div
                key={doc.id}
                className={`group rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between relative ${
                  isActive
                    ? 'bg-white border-blue-500/50 shadow-md ring-2 ring-blue-500/20 hover:border-blue-600'
                    : 'bg-slate-50/80 border-slate-200/80 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {getIcon(doc.iconName)}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-slate-400">
                          #{idx + 1} • {doc.code}
                        </span>
                        <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                          {doc.shortTitle}
                        </h3>
                      </div>
                    </div>

                    {isActive ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-200/70 text-slate-600 border border-slate-300">
                        <Clock className="w-3 h-3" />
                        Fase Berikut
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-medium text-slate-800 mb-2">
                    {doc.title}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">
                    {doc.fungsi}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-medium text-slate-400">
                    {doc.landasanHukum}
                  </span>

                  {isActive ? (
                    <button
                      onClick={() => onSelectDocument(doc.id)}
                      className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-sm transition-colors"
                    >
                      <span>Buka Editor SPMK</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-200 text-slate-400 text-[11px] cursor-not-allowed"
                    >
                      <span>Gunakan Data SPMK</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
