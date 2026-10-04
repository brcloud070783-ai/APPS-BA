import React, { useState, useEffect } from 'react';
import { SPMKData, INITIAL_SPMK_SAMPLE } from '../types/spmk';
import { FolderKanban, Plus, Trash2, Edit3, Sparkles, Calendar, Building, FileText, Download, Check } from 'lucide-react';

interface SavedProjectsProps {
  currentSPMK: SPMKData;
  onLoadProject: (spmk: SPMKData) => void;
}

const STORAGE_KEY = 'sidokumen_pbj_spmk_projects';

export const SavedProjects: React.FC<SavedProjectsProps> = ({
  currentSPMK,
  onLoadProject,
}) => {
  const [projects, setProjects] = useState<SPMKData[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
          return;
        }
      } catch (e) {
        console.error('Failed to parse saved projects:', e);
      }
    }
    // Default initial sample project
    setProjects([INITIAL_SPMK_SAMPLE]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([INITIAL_SPMK_SAMPLE]));
  }, []);

  const saveCurrentToProjects = () => {
    const existingIdx = projects.findIndex((p) => p.id === currentSPMK.id);
    let updatedProjects: SPMKData[];

    if (existingIdx >= 0) {
      updatedProjects = [...projects];
      updatedProjects[existingIdx] = { ...currentSPMK, updatedAt: new Date().toISOString() };
    } else {
      updatedProjects = [{ ...currentSPMK, updatedAt: new Date().toISOString() }, ...projects];
    }

    setProjects(updatedProjects);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
    showNotification('Dokumen SPMK berhasil disimpan ke arsip lokal!');
  };

  const createNewProject = () => {
    const newId = `spmk-project-${Date.now()}`;
    const newDoc: SPMKData = {
      ...INITIAL_SPMK_SAMPLE,
      id: newId,
      nomorSPMK: `000.4.3/${Math.floor(10000000 + Math.random() * 90000000)}/PPK-SPMK/DIKBUD/IX/2026`,
      nomorSurat: `000.4.3/${Math.floor(10000000 + Math.random() * 90000000)}/PPK-SPMK/DIKBUD/IX/2026`,
      paketPekerjaan: 'Pengadaan Pekerjaan Baru Pasca Bencana / Infrastruktur Sekolah',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newDoc, ...projects];
    setProjects(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    onLoadProject(newDoc);
    showNotification('Proyek SPMK baru berhasil dibuat!');
  };

  const deleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (projects.length <= 1) {
      alert('Arsip harus memiliki setidaknya 1 proyek.');
      return;
    }
    if (window.confirm('Apakah Anda yakin ingin menghapus arsip proyek ini?')) {
      const filtered = projects.filter((p) => p.id !== id);
      setProjects(filtered);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      if (currentSPMK.id === id && filtered.length > 0) {
        onLoadProject(filtered[0]);
      }
      showNotification('Proyek berhasil dihapus.');
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-blue-600" />
            <span>Arsip Proyek & Draf Dokumen SPMK</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Simpan, kelola, dan muat draf SPMK untuk berbagai proyek pengadaan di sekolah/instansi Anda.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={saveCurrentToProjects}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-sm transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Simpan Dokumen Saat Ini</span>
          </button>
          <button
            onClick={createNewProject}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Proyek Baru</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between animate-fade-in">
          <span>{notification}</span>
        </div>
      )}

      {/* List of Saved Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((proj) => {
          const isSelected = proj.id === currentSPMK.id;

          return (
            <div
              key={proj.id}
              onClick={() => onLoadProject(proj)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-50/50 border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                    {proj.nomorSPMK || proj.nomorSurat}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                      Aktif di Editor
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm text-slate-900 line-clamp-2">
                  {proj.paketPekerjaan}
                </h3>

                <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center space-x-2">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-medium truncate">{proj.penyedia.namaPerusahaan}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>SPMK: {proj.tanggalSPMK || proj.tanggalSurat}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400">
                  Diperbarui: {new Date(proj.updatedAt || Date.now()).toLocaleDateString('id-ID')}
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => deleteProject(proj.id, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Hapus proyek"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onLoadProject(proj)}
                    className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-medium text-xs transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Buka</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
