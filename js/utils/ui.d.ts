/**
 * ============================================================================
 * MODUL         : UI.TS
 * DESKRIPSI     : Controller Antarmuka, Toast, Paginasi, & Modal Dialog (AP3)
 * AUTHOR/OWNER  : AP3 Development Team
 * LAST UPDATED  : 2026
 * ============================================================================
 */
export declare function showToast(title: string, desc: string, type?: string): void;
export declare function showToastConfirm(title: string, desc: string, onConfirm: () => void): void;
export declare function changePaperSize(size: string): void;
export declare function autoPaginateReports(containerId?: string): void;
export declare function applyPageNumbers(containerId?: string): void;
export declare function navigatePreviewPage(pageIndex: number, reportContainerId?: string): void;
export declare function renderPageSelector(totalDocs: number, containerId?: string, reportContainerId?: string): void;
export declare function selectPreviewPage(pageIndex: any, reportContainerId?: string, clickedBtn?: HTMLElement | null): void;
export declare function updatePreviewHeaderUI(docType: string): void;
export declare function handleEditDocFocus(type: string): void;
export declare function closeEditDocModal(): void;
export declare function saveAndCloseEditDocModal(): void;
export declare function updateTLPreviewHeaderUI(docType: string): void;
export declare function focusEditTLDoc(docType: string): void;
export declare function closeEditTLDocModal(): void;
export declare function saveAndCloseEditTLDocModal(): void;
export declare function handleSingleValidation(): void;
export declare function handleSingleValidationTL(): void;
