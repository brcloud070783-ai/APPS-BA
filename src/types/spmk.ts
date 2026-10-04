export interface HeaderData {
  provinsi: string;
  dinas: string;
  alamat: string;
  teleponFax: string;
  email: string;
  website: string;
  kota: string;
  logoUrl?: string;
}

export interface PPKData {
  nama: string;
  nip: string;
  jabatan: string;
  alamat: string;
  website: string;
  email: string;
  faksimili: string;
}

export interface PenyediaData {
  namaPerusahaan: string; // e.g. CV. SUMBER MAKMUR
  alamat: string;
  diwakiliOleh: string; // e.g. JACKIE MATIAS ST
  jabatanWakil: string; // e.g. Direktur
}

export interface MasterPackageData {
  id: string;
  header: HeaderData;
  paketPekerjaan: string;
  lokasiPekerjaan: string;
  nilaiKontrakRp: number;
  nilaiKontrakTerbilang: string;
  kodeDPA: string;
  tahunAnggaran: string;

  // SPK & Kontrak Induk
  nomorSPK: string;
  tanggalSPK: string;

  // SPMK
  nomorSPMK: string;
  tanggalSPMK: string;
  nomorSurat?: string;
  tanggalSurat?: string;
  tanggalMulaiKerja: string;
  waktuPenyelesaianHari: number;
  waktuPenyelesaianTerbilang: string;
  tanggalSelesai: string;
  syaratPekerjaan: string;
  dendaKetentuan: string;

  // Compliance Extras (Perpres 12/2021 & LKPP)
  nomorBASTL?: string;
  tanggalBASTL?: string;
  masaPemeliharaanHari?: number;
  sertakanTembusan?: boolean;
  tembusanList?: string[];

  // Stakeholders
  ppk: PPKData;
  penyedia: PenyediaData;
  penggunaAnggaranNama: string;
  penggunaAnggaranNIP: string;
  konsultanPengawasNama: string;
  konsultanPengawasDirektur: string;

  // Legalisasi
  ttdPenyediaUrl?: string;
  ttdPPKUrl?: string;
  stempelPenyediaUrl?: string;
  ttdPAUrl?: string;
  ttdKonsultanUrl?: string;

  createdAt: string;
  updatedAt: string;
}

export type SPMKData = MasterPackageData;

export interface DocumentInfo {
  id: string;
  code: string;
  title: string;
  shortTitle: string;
  fungsi: string;
  landasanHukum: string;
  status: 'active';
  iconName: string;
}

export const OFFICIAL_PBJ_DOCUMENTS: DocumentInfo[] = [
  {
    id: 'spmk',
    code: 'SPMK',
    title: 'Surat Perintah Mulai Kerja',
    shortTitle: '1. SPMK',
    fungsi: 'Surat perintah penetapan tanggal mulai kerja resmi penyedia (Pasal 50 Perpres 12/2021).',
    landasanHukum: 'Perpres No. 12/2021',
    status: 'active',
    iconName: 'FileText'
  },
  {
    id: 'ba_stl',
    code: 'BA-STL',
    title: 'Berita Acara Serah Terima Lapangan',
    shortTitle: '2. BA-STL (Lap.)',
    fungsi: 'Penyerahan tapak/lokasi fisik sekolah kepada rekanan saat awal mulai kontrak.',
    landasanHukum: 'Syarat Umum Kontrak LKPP',
    status: 'active',
    iconName: 'MapPin'
  },
  {
    id: 'ba_mc0',
    code: 'BA-MC0',
    title: 'Berita Acara Mutual Check 0% (MC-0)',
    shortTitle: '3. BA-MC0 (0%)',
    fungsi: 'Penyelarasan volume dan gambar kerja awal di lokasi sekolah bersama konsultan pengawas.',
    landasanHukum: 'Mutual Check Lapangan 0%',
    status: 'active',
    iconName: 'Ruler'
  },
  {
    id: 'ba_um',
    code: 'BA-UM',
    title: 'Berita Acara Pembayaran Uang Muka',
    shortTitle: '4. BA-UM (Uang Muka)',
    fungsi: 'Pembayaran uang muka kontrak (20% - 30%) dengan jaminan bank/asuransi.',
    landasanHukum: 'Jaminan Bank / Asuransi',
    status: 'active',
    iconName: 'Banknote'
  },
  {
    id: 'bakp',
    code: 'BAKP',
    title: 'Berita Acara Kemajuan Prestasi Pekerjaan',
    shortTitle: '5. BAKP (Progres)',
    fungsi: 'Laporan opname pengukuran progres fisik lapangan (35%, 50%, 70%, 100%).',
    landasanHukum: 'Laporan Opname Fisik Lapangan',
    status: 'active',
    iconName: 'TrendingUp'
  },
  {
    id: 'baphp',
    code: 'BAPHP',
    title: 'Berita Acara Pemeriksaan Hasil Pekerjaan 100%',
    shortTitle: '6. BAPHP (Fisik 100%)',
    fungsi: 'Pemeriksaan fisik & mutu 100% di lokasi sekolah bersama Konsultan, PPTK, dan Rekanan.',
    landasanHukum: 'Format Resmi Dinas 2 Halaman',
    status: 'active',
    iconName: 'ClipboardCheck'
  },
  {
    id: 'bastp',
    code: 'BASTP',
    title: 'Berita Acara Serah Terima Pertama Pekerjaan (PHO)',
    shortTitle: '7. BASTP (PHO 100%)',
    fungsi: 'Penyerahan resmi hasil pekerjaan dari Penyedia/Rekanan kepada Pejabat Pembuat Komitmen (PPK).',
    landasanHukum: 'Perpres No. 12/2021',
    status: 'active',
    iconName: 'FileCheck'
  },
  {
    id: 'bast_pa_kpa',
    code: 'BAST PA/KPA',
    title: 'BAST PPK ke Pengguna Anggaran (PA/KPA)',
    shortTitle: '8. BAST PA/KPA',
    fungsi: 'Penyerahan hasil pengadaan dari PPK kepada Kepala Dinas/PA untuk pencatatan Aset Daerah / BMD.',
    landasanHukum: 'Sesuai Perpres No. 12/2021',
    status: 'active',
    iconName: 'Building2'
  },
  {
    id: 'bAP',
    code: 'BAP',
    title: 'Berita Acara Pembayaran 100% / Termin',
    shortTitle: '9. BAP (Keuangan)',
    fungsi: 'Rincian perhitungan keuangan: Bruto, Potongan PPh (2%), Retensi 5%, dan Netto cair.',
    landasanHukum: 'Permendagri No. 77/2020',
    status: 'active',
    iconName: 'Calculator'
  },
  {
    id: 'bast_fho',
    code: 'BAST-FHO',
    title: 'Berita Acara Serah Terima Akhir (FHO)',
    shortTitle: '10. BAST-FHO (Akhir)',
    fungsi: 'Penyerahan akhir setelah masa pemeliharaan 180 hari & pengembalian jaminan retensi 5%.',
    landasanHukum: 'Masa Pemeliharaan Kontrak',
    status: 'active',
    iconName: 'Award'
  },
  {
    id: 'kuitansi',
    code: 'Kuitansi',
    title: 'Kuitansi Dinas Bermeterai Rp 10.000',
    shortTitle: '11. Kuitansi Dinas',
    fungsi: 'Format kuitansi resmi dinas bermeterai Rp 10.000 lengkap dengan kode DPA.',
    landasanHukum: 'Bea Meterai & Kode DPA APBD',
    status: 'active',
    iconName: 'Receipt'
  },
  {
    id: 'checklist_spp_ls',
    code: 'SPP-LS',
    title: 'Lembar Verifikasi Checklist SPP-LS',
    shortTitle: '12. Checklist SPP-LS',
    fungsi: 'Lembar audit kelengkapan 10 berkas pencairan.',
    landasanHukum: 'Permendagri No. 77/2020',
    status: 'active',
    iconName: 'CheckSquare'
  },
  {
    id: 'permohonan_bayar',
    code: 'Surat Penagihan',
    title: 'Surat Permohonan Pembayaran Rekanan',
    shortTitle: '13. Permohonan Bayar',
    fungsi: 'Surat penagihan resmi dari Direktur Penyedia kepada PPK.',
    landasanHukum: 'Permohonan Resmi Penyedia',
    status: 'active',
    iconName: 'Send'
  },
  {
    id: 'foto_dokumentasi',
    code: 'Foto Fisik',
    title: 'Lampiran Foto Dokumentasi Fisik (0%, 50%, 100%)',
    shortTitle: '14. Foto Dokumentasi',
    fungsi: 'Laporan visual perbandingan fisik 0%, 50%, dan 100% di lokasi sekolah.',
    landasanHukum: 'Lampiran Progres Fisik',
    status: 'active',
    iconName: 'Camera'
  }
];

export const INITIAL_SPMK_SAMPLE: MasterPackageData = {
  id: 'package-sample-1',
  header: {
    provinsi: 'PEMERINTAH PROVINSI KALIMANTAN UTARA',
    dinas: 'DINAS PENDIDIKAN DAN KEBUDAYAAN',
    alamat: 'Jl. Kol. Soetadji No. 01, Tanjung Selor Hilir Kode Pos 77212',
    teleponFax: 'Telp/Fax (0552) 2020530',
    email: 'kaltara.pendidikan@yahoo.com/kaltara.pendidikan@gmail.com',
    website: 'www.kaltara-pendidikan.com',
    kota: 'TANJUNG SELOR'
  },
  paketPekerjaan: 'Pembangunan Siring dan Semenisasi Jalan Masuk Sekolah SMAN 5 Tarakan',
  lokasiPekerjaan: 'SMAN 5 Tarakan, Kota Tarakan, Kalimantan Utara',
  nilaiKontrakRp: 485500000,
  nilaiKontrakTerbilang: 'Empat Ratus Delapan Puluh Lima Juta Lima Ratus Ribu Rupiah',
  kodeDPA: 'DPA/A.1/1.01.0.00.0.00.01.0000/001/2026',
  tahunAnggaran: '2026',

  // SPK & Kontrak Induk
  nomorSPK: '000.4.3/66804903/PPK-SPK-TENDER /DIKBUD/IX/2026',
  tanggalSPK: '10 September 2026',

  // SPMK
  nomorSPMK: '000.4.3/66804903/PPK-SPMK/DIKBUD/IX/2026',
  tanggalSPMK: '10 September 2026',
  nomorSurat: '000.4.3/66804903/PPK-SPMK/DIKBUD/IX/2026',
  tanggalSurat: '10 September 2026',
  tanggalMulaiKerja: '10 September 2026',
  waktuPenyelesaianHari: 97,
  waktuPenyelesaianTerbilang: 'Sembilan Puluh Tujuh',
  tanggalSelesai: '15 Desember 2026',
  syaratPekerjaan: 'sesuai dengan persyaratan dan ketentuan SPK;',
  dendaKetentuan: 'Terhadap setiap hari keterlambatan pelaksanaan/penyelesaian pekerjaan Penyedia akan dikenakan Denda Keterlambatan sebesar 1/1000 (satu pemil) dari nilai sisa Kontrak yang belum di selesaikan (tidak termasuk PPN) sesuai ketentuan dalam Kontrak dan menyelesaikan sisa kontrak.',

  // Compliance Extras (Perpres 12/2021 & LKPP)
  nomorBASTL: '000.4.3/66804903/PPK-BASTL/DIKBUD/IX/2026',
  tanggalBASTL: '10 September 2026',
  masaPemeliharaanHari: 180,
  sertakanTembusan: true,
  tembusanList: [
    'Kepala Dinas Pendidikan dan Kebudayaan Provinsi (selaku PA)',
    'Inspektur Daerah Provinsi Kalimantan Utara (APIP)',
    'Pejabat Pelaksana Teknis Kegiatan (PPTK)',
    'Konsultan PengawasLapangan'
  ],

  // Stakeholders
  ppk: {
    nama: 'Hasanuddin, S.Pd.,M.Si',
    nip: '19740527 200701 1 010',
    jabatan: 'PPK (Pejabat Pembuat Komitmen)',
    alamat: 'Jl. Kol. H. Soetadji No. 01 Tanjung Selor Hilir Kode Pos 77212, Telp/Fax (0552) 2020530',
    website: 'www.kaltara-pendidikan.com',
    email: 'hudin8076@gmail.com',
    faksimili: '(0552) 2024228'
  },
  penyedia: {
    namaPerusahaan: 'CV. SUMBER MAKMUR',
    alamat: 'Jl. Jendral Soedirman No.5 RT 11 RW 04 Tanjung Selor',
    diwakiliOleh: 'JACKIE MATIAS ST',
    jabatanWakil: 'Direktur'
  },
  penggunaAnggaranNama: 'Drs. H. Teguh Suhasinto, M.Pd',
  penggunaAnggaranNIP: '19680312 199403 1 005',
  konsultanPengawasNama: 'CV. KALIMANTAN ENGINEERING CONSULTANT',
  konsultanPengawasDirektur: 'IR. HENDRA WIJAYA, ST',

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
