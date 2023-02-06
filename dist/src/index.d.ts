import { NdArray } from 'ndarray';
export type SupportedTypes = Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array;
export declare function lanczos3(src: NdArray<SupportedTypes>, dst: NdArray<SupportedTypes>): void;
export declare function lanczos2(src: NdArray<SupportedTypes>, dst: NdArray<SupportedTypes>): void;
