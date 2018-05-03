module.exports = {
	source: {
		include: ['./lib', 'README.md'],
	},
	plugins: ['plugins/markdown'],
	opts: {
		template: './node_modules/jsdoc-template',
		tutorials: './tutorials',
		destination: './docs/',
		encoding: 'utf8',
		recurse: true,
	},
	templates: {
		referenceTitle: 'FP Validation Library',
	},
	tags: {
		allowUnknownTags: true,
		dictionaries: ['jsdoc', 'closure'],
	},
}
