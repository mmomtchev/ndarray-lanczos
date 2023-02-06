import type { NdArray, TypedArray } from 'ndarray';

export const convolve = (src: NdArray<TypedArray | number[]>, dst: NdArray<TypedArray>, filters: TypedArray, fixedFracBits: number) => {
	const [_, srcHeight] = src.shape;
	const [dstWidth] = dst.shape;

	const maxValue = 2 ** (dst.data.BYTES_PER_ELEMENT * 8) - 1;
	const clamp = (v: number): number => v < 0 ? 0 : (v > maxValue ? maxValue : v);
	const fixedFracMul = 2 ** (fixedFracBits - 1);
	const fixedFracMul2 = 2 * fixedFracMul;

	const pixel = Array(src.shape[2]);

	// For each row
	for (let srcY = 0; srcY < srcHeight; srcY++) {
		const dstY = srcY;

		// Apply precomputed filters to each destination row point
		let filterPtr = 0;
		for (let dstX = 0; dstX < dstWidth; dstX++) {
			// Get the filter that determines the current output pixel.
			let srcX = filters[filterPtr++];

			for (let i = 0; i < src.shape[2]; i++)
				pixel[i] = 0;

			// Apply the filter to the row to get the destination pixel r, g, b, a
			for (let filterSize = filters[filterPtr++]; filterSize > 0; filterSize--) {
				const filterValue = filters[filterPtr++];

				for (let i = 0; i < src.shape[2]; i++)
					pixel[i] = (pixel[i] + filterValue * src.get(srcX, srcY, i));

				srcX++;
			}

			// Bring this value back in range. All of the filter scaling factors
			// are in fixed point with fixedFracBits bits of fractional part.
			//
			// (!) Add 1/2 of value before clamping to get proper rounding. In other
			// case brightness loss will be noticeable if you resize image with white
			// border and place it on white background.
			for (let i = 0; i < src.shape[2]; i++)
				dst.set(dstX, dstY, i, clamp( ( pixel[i] + fixedFracMul ) / fixedFracMul2 ) );
		}
	}
}
