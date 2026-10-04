import React, { useState } from 'react';
import { MasterPackageData, OFFICIAL_PBJ_DOCUMENTS } from '../types/spmk';
import {
  FileCheck,
  Calendar,
  Hash,
  Settings2,
  Building,
  UserCheck,
  Briefcase,
  PenTool,
  X,
  Sparkles,
  Info,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface FormEditorProps {
  data: MasterPackageData;
  onChange: (updated: MasterPackageData) => void;
  selectedDocId: string;
  onResetToSample: () => void;
}

export const FormEditorSPMK: React.FC<FormEditorProps> = ({
  data,
  onChange,
  selectedDocId,
  onResetToSample,
}) => {
  const [showMasterModal, setShowModal] = useState<boolean>(false);
  const currentDoc = OFFICIAL_PBJ_DOCUMENTS.find((d) => d.id === selectedDocId) || OFFICIAL_PBJ_DOCUMENTS[0];

  const handleHeaderChange = (field: keyof MasterPackageData['header'], value: string) => {
    onChange({
      ...data,
      header: {
        ...data.header,
        [field]: value,
      },
      updatedAt: new Date().toISOString(),
    });
  };

  const handlePPKChange = (field: keyof MasterPackageData['ppk'], value: string) => {
    onChange({
      ...data,
      ppk: {
        ...data.ppk,
        [field]: value,
      },
      updatedAt: new Date().toISOString(),
    });
  };

  const handlePenyediaChange = (field: keyof MasterPackageData['penyedia'], value: string) => {
    onChange({
      ...data,
      penyedia: {
        ...data.penyedia,
        [field]: value,
      },
      updatedAt: new Date().toISOString(),
    });
  };

  const handleImageUpload = (
    field: 'ttdPenyediaUrl' | 'ttdPPKUrl' | 'stempelPenyediaUrl' | 'logoUrl',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (field === 'logoUrl') {
          handleHeaderChange('logoUrl', result);
        } else {
          onChange({
            ...data,
            [field]: result,
            updatedAt: new Date().toISOString(),
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Super Clean Primary Input Card: Nomor & Tanggal Surat ONLY */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-200 space-y-4 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-purple-600 uppercase tracking-wider">
                {currentDoc.code}
              </span>
              <h2 className="text-sm font-bold text-slate-900">
                Input Nomor & Tanggal Surat
              </h2>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200 transition-colors"
            title="Buka Pengaturan Data Umum Paket Pekerjaan"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>Data Umum Paket</span>
          </button>
        </div>

        {/* The 2 Primary Input Fields: Nomor Surat & Tanggal Surat */}
        <div className="space-y-3 pt-1">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-purple-600" />
              <span>Nomor Surat Dokumen ({currentDoc.code})</span>
            </label>
            <input
              type="text"
              value={data.nomorSPMK}
              onChange={(e) => onChange({ ...data, nomorSPMK: e.target.value, nomorSurat: e.target.value })}
              placeholder="Contoh: 000.4.3/66804903/PPK-SPMK/DIKBUD/IX/2026"
              className="w-full p-2.5 rounded-xl border border-slate-300 font-mono font-bold text-xs text-slate-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-600" />
              <span>Tanggal Surat Dokumen ({currentDoc.code})</span>
            </label>
            <input
              type="text"
              value={data.tanggalSPMK}
              onChange={(e) => onChange({ ...data, tanggalSPMK: e.target.value, tanggalSurat: e.target.value })}
              placeholder="Contoh: 10 September 2026"
              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50/50"
            />
          </div>
        </div>

        {/* Informational Summary Card */}
        <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100/80 space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
              <span>Data Umum Otomatis Terhubung:</span>
            </span>
            <button
              onClick={() => setShowModal(true)}
              className="text-[10px] text-purple-700 underline font-semibold"
            >
              Ubah Data Paket
            </button>
          </div>
          <p className="font-bold text-slate-900 truncate">
            {data.paketPekerjaan}
          </p>
          <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
            <span>PPK: <strong className="text-slate-800">{data.ppk.nama}</strong></span>
            <span>Penyedia: <strong className="text-slate-800">{data.penyedia.namaPerusahaan}</strong></span>
          </div>
        </div>
      </div>

      {/* MODAL: Data Umum Paket Pekerjaan (Input 1 Kali per Paket) */}
      {showMasterModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Data Umum Paket Pekerjaan (Input 1 Kali)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Diisi sekali untuk 1 paket pekerjaan. Otomatis mengisi 14 dokumen pengadaan.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={onResetToSample}
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Contoh</span>
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Forms */}
            <div className="space-y-4 text-xs">
              {/* Section 1: Rincian Paket & Nilai */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-purple-600" />
                  <span>1. Paket Pekerjaan & Nilai Kontrak</span>
                </h4>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Nama Paket Pekerjaan</label>
                  <textarea
                    value={data.paketPekerjaan}
                    onChange={(e) => onChange({ ...data, paketPekerjaan: e.target.value })}
                    rows={2}
                    className="w-full p-2 rounded-lg border border-slate-300 font-medium bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Nilai Kontrak Bruto (Rp)</label>
                    <input
                      type="number"
                      value={data.nilaiKontrakRp}
                      onChange={(e) =>
                        onChange({ ...data, nilaiKontrakRp: parseFloat(e.target.value) || 0 })
                      }
                      className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Nilai Kontrak Terbilang</label>
                    <input
                      type="text"
                      value={data.nilaiKontrakTerbilang}
                      onChange={(e) => onChange({ ...data, nilaiKontrakTerbilang: e.target.value })}
                      className="w-full p-2 rounded-lg border border-slate-300 italic bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Nomor SPK Induk</label>
                    <input
                      type="text"
                      value={data.nomorSPK}
                      onChange={(e) => onChange({ ...data, nomorSPK: e.target.value })}
                      className="w-full p-2 rounded-lg border border-slate-300 font-mono bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Tanggal SPK Induk</label>
                    <input
                      type="text"
                      value={data.tanggalSPK}
                      onChange={(e) => onChange({ ...data, tanggalSPK: e.target.value })}
                      className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Kop Surat Dinas */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-purple-600" />
                  <span>2. Kop Surat Header Dinas / Instansi</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Pemerintah Daerah</label>
                    <input
                      type="text"
                      value={data.header.provinsi}
                      onChange={(e) => handleHeaderChange('provinsi', e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-300 font-semibold bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Nama Dinas</label>
                    <input
                      type="text"
                      value={data.header.dinas}
                      onChange={(e) => handleHeaderChange('dinas', e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-300 font-semibold bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Alamat Kantor Dinas</label>
                  <input
                    type="text"
                    value={data.header.alamat}
                    onChange={(e) => handleHeaderChange('alamat', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              </div>

              {/* Section 3: Stakeholders PPK & Penyedia */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-purple-600" />
                  <span>3. Stakeholders (PPK & Penyedia / Rekanan)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Nama PPK</label>
                    <input
                      type="text"
                      value={data.ppk.nama}
                      onChange={(e) => handlePPKChange('nama', e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-300 font-semibold bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">NIP PPK</label>
                    <input
                      type="text"
                      value={data.ppk.nip}
                      onChange={(e) => handlePPKChange('nip', e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-300 font-mono bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Nama CV / PT Rekanan</label>
                    <input
                      type="text"
                      value={data.penyedia.namaPerusahaan}
                      onChange={(e) => handlePenyediaChange('namaPerusahaan', e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-300 font-bold uppercase bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Direktur / Kuasa Wakil</label>
                    <input
                      type="text"
                      value={data.penyedia.diwakiliOleh}
                      onChange={(e) => handlePenyediaChange('diwakiliOleh', e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-300 font-bold uppercase bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: TTD & Stempel Upload */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <PenTool className="w-4 h-4 text-purple-600" />
                  <span>4. Unggah Stempel & TTD Digital</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">TTD PPK</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload('ttdPPKUrl', e)}
                      className="w-full text-[10px] text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">TTD Direktur</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload('ttdPenyediaUrl', e)}
                      className="w-full text-[10px] text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Stempel CV/PT</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload('stempelPenyediaUrl', e)}
                      className="w-full text-[10px] text-slate-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                Simpan & Gunakan Data Paket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
