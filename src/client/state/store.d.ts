import { StoreState, PerkaraRecord } from '../types/index.js';
export declare const store: StoreState;
export declare function getStore(): StoreState;
export declare function savePerkaraToStorage(): void;
export declare function loadPerkaraFromStorage(): PerkaraRecord[];
