import type { NdArray, TypedArray } from 'ndarray';
export declare const convolve: (src: NdArray<TypedArray | number[]>, dst: NdArray<TypedArray>, filters: TypedArray, fixedFracBits: number) => void;
