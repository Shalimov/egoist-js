module.exports = {
	source: {
		include: ['./lib', 'README.md'],
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
	templates: {
		referenceTitle: 'Ego Validation Library',
	},
	tags: {
		allowUnknownTags: true,
		dictionaries: ['jsdoc', 'closure'],
	},
}
