export type TypedArrayConstructor = Int8ArrayConstructor | Int16ArrayConstructor | Int32ArrayConstructor | Uint8ArrayConstructor | Uint8ClampedArrayConstructor | Uint16ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor;
export declare const filters: (srcSize: number, destSize: number, scale: number, offset: number, use2: boolean, floatType: TypedArrayConstructor, intType: TypedArrayConstructor, fixedFracBits: number) => Int8Array | Int16Array | Int32Array | Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | Float32Array | Float64Array;
