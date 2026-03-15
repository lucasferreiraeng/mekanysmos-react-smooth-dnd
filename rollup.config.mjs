import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

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
			globals: {
				'smooth-dnd': 'SmoothDnD',
				react: 'React',
			},
		},
	],
	external: ['react', 'smooth-dnd'],
	plugins: [
		resolve({ extensions }),
		babel({
			extensions,
			babelHelpers: 'bundled',
			include: ['./index.ts', 'src/**/*'],
			exclude: 'node_modules/**',
		}),
		commonjs(),
		terser(),
	],
};
