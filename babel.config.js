module.exports = function (api) {
	api.cache(true);

	return {
		presets: [
			'@babel/preset-typescript',
			['@babel/preset-react', { runtime: 'classic' }],
			'@babel/preset-env',
		],
	};
};
