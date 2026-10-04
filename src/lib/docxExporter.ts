import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} from 'docx';
import { saveAs } from 'file-saver';
import { SPMKData } from '../types/spmk';

export const exportSPMKToDocx = async (spmk: SPMKData) => {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              bottom: 1440,
              left: 1440,
              right: 1440,
            },
          },
        },
        children: [
          // Kop Surat Header
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: spmk.header.provinsi.toUpperCase(),
                bold: true,
                size: 26,
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: spmk.header.dinas.toUpperCase(),
                bold: true,
                size: 28,
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `${spmk.header.alamat}, ${spmk.header.teleponFax}`,
                size: 18,
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `E-mail: ${spmk.header.email} | Website: ${spmk.header.website}`,
                size: 18,
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: spmk.header.kota.toUpperCase(),
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          }),

          // Divider Line
          new Paragraph({
            alignment: AlignmentType.CENTER,
            border: {
              bottom: { style: BorderStyle.DOUBLE, size: 24, color: '000000' },
            },
            children: [],
          }),

          new Paragraph({ text: '' }), // Spacer

          // Document Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'SURAT PERINTAH MULAI KERJA (SPMK)',
                bold: true,
                underline: {},
                size: 24,
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Nomor : ${spmk.nomorSPMK || spmk.nomorSurat}`,
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Tanggal : ${spmk.tanggalSPMK || spmk.tanggalSurat}`,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          }),

          new Paragraph({ text: '' }),

          // Paket Pekerjaan
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'Paket Pekerjaan:',
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: spmk.paketPekerjaan,
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          }),

          new Paragraph({ text: '' }),

          // Pihak Pertama (PPK)
          new Paragraph({
            children: [
              new TextRun({
                text: 'Yang bertandatangan di bawah ini:',
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Nama               :  ${spmk.ppk.nama}\n`,
                size: 22,
                font: 'Times New Roman',
              }),
              new TextRun({
                text: `NIP                  :  ${spmk.ppk.nip}\n`,
                size: 22,
                font: 'Times New Roman',
              }),
              new TextRun({
                text: `Jabatan           :  ${spmk.ppk.jabatan}\n`,
                size: 22,
                font: 'Times New Roman',
              }),
              new TextRun({
                text: `Alamat             :  ${spmk.ppk.alamat}\n`,
                size: 22,
                font: 'Times New Roman',
              }),
              new TextRun({
                text: `Website          :  ${spmk.ppk.website}\n`,
                size: 22,
                font: 'Times New Roman',
              }),
              new TextRun({
                text: `E-mail             :  ${spmk.ppk.email}\n`,
                size: 22,
                font: 'Times New Roman',
              }),
              new TextRun({
                text: `Faksimili         :  ${spmk.ppk.faksimili}`,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: 'selanjutnya disebut sebagai Pejabat Penandatangan Kontrak ;',
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          }),

          new Paragraph({ text: '' }),

          // Dasar SPK
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: `berdasarkan SPK ${spmk.paketPekerjaan} nomor : ${spmk.nomorSPK} tanggal ${spmk.tanggalSPK}, bersama ini memerintahkan:`,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          }),

          new Paragraph({ text: '' }),

          // Pihak Kedua (Penyedia)
          new Paragraph({
            children: [
              new TextRun({
                text: `Nama               :  ${spmk.penyedia.namaPerusahaan}\n`,
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
              new TextRun({
                text: `Alamat             :  ${spmk.penyedia.alamat}\n`,
                size: 22,
                font: 'Times New Roman',
              }),
              new TextRun({
                text: `yang dalam hal ini diwakili oleh: `,
                size: 22,
                font: 'Times New Roman',
              }),
              new TextRun({
                text: `${spmk.penyedia.diwakiliOleh}`,
                bold: true,
                underline: {},
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: 'selanjutnya disebut sebagai Penyedia;',
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          }),

          new Paragraph({ text: '' }),

          new Paragraph({
            children: [
              new TextRun({
                text: 'untuk segera memulai pelaksanaan pekerjaan dengan memperhatikan ketentuan-ketentuan sebagai berikut:',
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          }),

          new Paragraph({ text: '' }),

          // Poin-poin ketentuan
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({ text: '1. Paket Pengadaan : ', bold: true, size: 22, font: 'Times New Roman' }),
              new TextRun({ text: spmk.paketPekerjaan, size: 22, font: 'Times New Roman' }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({ text: '2. Tanggal mulai kerja : ', bold: true, size: 22, font: 'Times New Roman' }),
              new TextRun({ text: spmk.tanggalMulaiKerja, size: 22, font: 'Times New Roman' }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({ text: '3. Syarat-syarat pekerjaan : ', bold: true, size: 22, font: 'Times New Roman' }),
              new TextRun({ text: spmk.syaratPekerjaan, size: 22, font: 'Times New Roman' }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: '4. Waktu penyelesaian : ',
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
              new TextRun({
                text: `Selama ${spmk.waktuPenyelesaianHari} (${spmk.waktuPenyelesaianTerbilang}) Hari Kalender dan pekerjaan harus sudah selesai pada tanggal ${spmk.tanggalSelesai}`,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({ text: '5. Denda : ', bold: true, size: 22, font: 'Times New Roman' }),
              new TextRun({ text: spmk.dendaKetentuan, size: 22, font: 'Times New Roman' }),
            ],
          }),

          new Paragraph({ text: '' }),
          new Paragraph({ text: '' }),

          // Table TTD
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: 'AUTO' },
              bottom: { style: BorderStyle.NONE, size: 0, color: 'AUTO' },
              left: { style: BorderStyle.NONE, size: 0, color: 'AUTO' },
              right: { style: BorderStyle.NONE, size: 0, color: 'AUTO' },
              insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'AUTO' },
              insideVertical: { style: BorderStyle.NONE, size: 0, color: 'AUTO' },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: 'Untuk dan atas nama', size: 20, font: 'Times New Roman' }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: spmk.penyedia.namaPerusahaan, bold: true, size: 20, font: 'Times New Roman' }),
                        ],
                      }),
                      new Paragraph({ text: '\n\n\n' }), // TTD Gap
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: spmk.penyedia.diwakiliOleh, bold: true, underline: {}, size: 20, font: 'Times New Roman' }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: spmk.penyedia.jabatanWakil, size: 20, font: 'Times New Roman' }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: 'Untuk dan atas nama', size: 20, font: 'Times New Roman' }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: 'pejabat penandatangan kontrak', size: 20, font: 'Times New Roman' }),
                        ],
                      }),
                      new Paragraph({ text: '\n\n\n' }), // TTD Gap
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: spmk.ppk.nama, bold: true, underline: {}, size: 20, font: 'Times New Roman' }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: `NIP. ${spmk.ppk.nip}`, size: 20, font: 'Times New Roman' }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `SPMK_${spmk.penyedia.namaPerusahaan.replace(/[^a-zA-Z0-9]/g, '_')}.docx`;
  saveAs(blob, fileName);
};
