/**
 * ============================================================================
 * MODULE        : COMPONENTS.TS
 * DESCRIPTION   : Komponen Reusable, Helper Layout, Kop Surat & Penomoran (AP3)
 * AUTHOR/OWNER  : AP3 Development Team
 * LAST UPDATED  : 2026
 * ============================================================================
 */
export declare function generateKopSurat(jenisDokumen?: string): string;
export declare function tteBadge(): string;
export declare function buildTableKv(rows: any[]): string;
export declare function getDocNum(type: string, customInput?: string): string;
export declare function baseReport(title: string, no: string, isBA?: boolean, docType?: string): string;
export declare function getTLNumFormat(type: string): string;
export declare function renderTtdPejabat(pejabat: {
    kota?: string;
    tanggal?: string;
    jabatan: string;
    nama: string;
    pangkatGol?: string;
    nip: string;
}): string;
export declare function closeTLReportTag(customSignHTML: string, tglStr: string): string;
export declare const toLetter: (i: number) => string;
export declare function renderBastItemBlock(title: string, rowsHtml: string): string;
export declare function renderPlaceholderRow(): string;
