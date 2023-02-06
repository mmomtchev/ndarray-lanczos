import type { NdArray, TypedArray } from 'ndarray';
export declare const convolve: (src: NdArray<TypedArray>, dst: NdArray<TypedArray>, filters: TypedArray, fixedFracBits: number) => void;
