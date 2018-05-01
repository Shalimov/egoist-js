module.exports = {
	source: {
		include: ['./lib'],
	},
	plugins: [
		'plugins/markdown',
		'plugins/summarize',
	],
	opts: {
		template: './node_modules/jsdoc-template',
		encoding: 'utf8',
		destination: './docs/',
		recurse: true,
	},
	tags: {
		allowUnknownTags: true,
		dictionaries: ['jsdoc', 'closure'],
	},
}
