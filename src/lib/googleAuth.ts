import { MasterPackageData } from '../types/spmk';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/documents');
provider.addScope('https://www.googleapis.com/auth/drive.file');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken && onAuthSuccess) {
        onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn && onAuthFailure) {
        onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Gagal mendapatkan Google Workspace OAuth Access Token.');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign in error:', error);
    if (error?.code === 'auth/unauthorized-domain' || error?.message?.includes('unauthorized-domain')) {
      // Automatic fallback for custom Vercel / external domains
      window.open('https://docs.google.com/document/u/0/create', '_blank');
      throw new Error(`Domain '${window.location.hostname}' belum terdaftar di Firebase Authorized Domains. Google Docs baru telah dibuka secara langsung untuk Anda!`);
    }
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// Aliases for compatibility
export const signInWithGoogleWorkspace = googleSignIn;
export const logoutGoogle = logout;
export const getCachedToken = getAccessToken;
export const initAuthListener = (onUserChanged: (user: any) => void, onNeedsAuth: () => void) => {
  return initAuth(
    (user, token) => onUserChanged({ displayName: user.displayName, email: user.email, photoURL: user.photoURL, token }),
    onNeedsAuth
  );
};

/**
 * Creates a fully formatted Google Doc document via Google Docs API.
 */
export const createGoogleDocFromSPMK = async (
  spmk: MasterPackageData,
  accessToken?: string | null
) => {
  let token = accessToken || getAccessToken();

  if (!token) {
    const authResult = await googleSignIn();
    if (!authResult?.accessToken) {
      throw new Error('Diperlukan izin Google Workspace untuk membuat dokumen di Google Docs.');
    }
    token = authResult.accessToken;
  }

  const docTitle = `SPMK_${spmk.penyedia.namaPerusahaan.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}`;

  // 1. Create Google Doc via official REST API
  const createRes = await fetch('https://docs.googleapis.com/v1/documents', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: docTitle,
    }),
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Google Docs API Error (${createRes.status}): ${errText}`);
  }

  const docData = await createRes.json();
  const documentId = docData.documentId;

  // 2. Draft document text with complete PBJ formatting
  const documentText = `${spmk.header.provinsi.toUpperCase()}
${spmk.header.dinas.toUpperCase()}
Alamat : ${spmk.header.alamat}
E-mail : ${spmk.header.email} | Website : ${spmk.header.website}
${spmk.header.kota.toUpperCase()}

=================================================================================

SURAT PERINTAH MULAI KERJA (SPMK)
Nomor : ${spmk.nomorSPMK || spmk.nomorSurat}
Tanggal : ${spmk.tanggalSPMK || spmk.tanggalSurat}

Paket Pekerjaan: ${spmk.paketPekerjaan}

Yang bertandatangan di bawah ini:
1. Nama      : ${spmk.ppk.nama}
   NIP       : ${spmk.ppk.nip}
   Jabatan   : ${spmk.ppk.jabatan}
   Alamat    : ${spmk.ppk.alamat}
   Website   : ${spmk.ppk.website}
   E-mail    : ${spmk.ppk.email}
   Faksimili : ${spmk.ppk.faksimili}
   selanjutnya disebut sebagai Pejabat Penandatangan Kontrak ;

berdasarkan SPK ${spmk.paketPekerjaan} nomor : ${spmk.nomorSPK} tanggal ${spmk.tanggalSPK}${
    spmk.nomorBASTL ? `, serta Berita Acara Serah Terima Lapangan (BA-STL) nomor : ${spmk.nomorBASTL} tanggal ${spmk.tanggalBASTL}` : ''
  }, bersama ini memerintahkan:

2. Nama      : ${spmk.penyedia.namaPerusahaan}
   Alamat    : ${spmk.penyedia.alamat}
   yang dalam hal ini diwakili oleh: ${spmk.penyedia.diwakiliOleh} (${spmk.penyedia.jabatanWakil})
   selanjutnya disebut sebagai Penyedia;

untuk segera memulai pelaksanaan pekerjaan dengan memperhatikan ketentuan-ketentuan sebagai berikut:

1. Paket Pengadaan : ${spmk.paketPekerjaan}
2. Tanggal mulai kerja : ${spmk.tanggalMulaiKerja}
3. Syarat-syarat pekerjaan : ${spmk.syaratPekerjaan}
4. Waktu penyelesaian : Selama ${spmk.waktuPenyelesaianHari} (${spmk.waktuPenyelesaianTerbilang}) Hari Kalender dan pekerjaan harus sudah selesai pada tanggal ${spmk.tanggalSelesai}
5. Denda : ${spmk.dendaKetentuan}


                                                  ${spmk.header.kota}, ${spmk.tanggalSPMK || spmk.tanggalSurat}

Untuk dan atas nama                             Untuk dan atas nama
${spmk.penyedia.namaPerusahaan}                 pejabat penandatangan kontrak



${spmk.penyedia.diwakiliOleh}                   ${spmk.ppk.nama}
${spmk.penyedia.jabatanWakil}                    NIP. ${spmk.ppk.nip}

Tembusan Yth:
1. Kepala Dinas Pendidikan dan Kebudayaan (selaku PA)
2. Inspektur Daerah Provinsi (APIP)
3. Pejabat Pelaksana Teknis Kegiatan (PPTK)
4. Konsultan Pengawas Lapangan
`;

  // 3. BatchUpdate for text insertion & font styling
  const requests = [
    {
      insertText: {
        location: { index: 1 },
        text: documentText,
      },
    },
    {
      updateTextStyle: {
        range: {
          startIndex: 1,
          endIndex: documentText.length + 1,
        },
        style: {
          weightedFontFamily: {
            fontFamily: 'Times New Roman',
          },
          fontSize: {
            magnitude: 11,
            unit: 'PT',
          },
        },
        fields: 'weightedFontFamily,fontSize',
      },
    },
  ];

  await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ requests }),
  });

  const docUrl = `https://docs.google.com/document/d/${documentId}/edit`;
  return { docId: documentId, docUrl };
};
