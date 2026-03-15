import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

export default {
	input: 'index.ts',
	output: [
		{
			file: './dist/index.js',
			format: 'umd',
			sourcemap: false,
			name: 'ReactSmoothDnD',
			globals: {
				'smooth-dnd': 'SmoothDnD',
				react: 'React',
			},
		},
		{
			file: './dist/index.esm.js',
			format: 'esm',
			sourcemap: false,
		},
	],
	external: ['react', 'smooth-dnd'],
	plugins: [
		resolve(),
		typescript({
			tsconfig: './tsconfig.json',
			useTsconfigDeclarationDir: true,
		}),
		terser(),
	],
};
