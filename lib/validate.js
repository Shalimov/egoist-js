import fp from './lodash.imports'

import ERROR_KEYS from './defaults/keys'
import ERROR_MESSAGES from './defaults/messages'

const isValid = (specFn, value) => fp.isEmpty(specFn(value, { untilFail: true }))
const isInvalid = (specFn, value) => !fp.isEmpty(specFn(value, { untilFail: true }))

const toTuple = collection => (fp.isArray(collection) ? collection : [])

// TODO: custom messages as options
const createValidateFunction = ({ untilFail, messageFuncs }) => {
	const getLabel = fp.getOr('value', 'key')
	const getParent = fp.get('parent')

	const makeFullPathGetter = (context) => {
		const fullpath = []

		if (!fp.isObject(context)) {
			return () => []
		}

		const cicularRefs = new Set()
		let currentContext = context

		do {
			fullpath.push(currentContext.key)
			cicularRefs.add(currentContext)
			currentContext = getParent(currentContext)
		} while (!(currentContext == null || cicularRefs.has(currentContext)))

		return () => fp.reverse(fullpath)
	}

	const formatValidationOutput = (specOutput, customMessages) => {
		if (specOutput == null) {
			return null
		}

		const validationResults = []
		const defaultMessageFunc = messageFuncs[ERROR_KEYS.ANY.UNKNOWN]

		for (let { result, value, context } of specOutput) {
			const [name, args] = toTuple(result)
			const messageFn = fp.get(name, customMessages) ||
				messageFuncs[name] ||
				defaultMessageFunc

			const path = makeFullPathGetter(context)

			validationResults.push({
				message: messageFn({
					label: getLabel(context),
					value,
					path,
					args,
				}),
				value,
				path,
				args,
			})
		}

		return validationResults.length > 0 ? validationResults : null
	}

	return [
		(specFn, value) => {
			const specOutput = specFn(value, { untilFail })
			return formatValidationOutput(specOutput)
		},
		(specFn, options, value) => {
			const customMessages = fp.get('customMessages', options)
			const specOutput = specFn(value, { untilFail })
			return formatValidationOutput(specOutput, customMessages)
		},
	]
}

const [validate, validateWithOpts] = createValidateFunction({
	messageFuncs: ERROR_MESSAGES,
	untilFail: true,
})
const [validateAll, validateAllWithOpts] = createValidateFunction({
	messageFuncs: ERROR_MESSAGES,
	untilFail: false,
})

export default {
	isValid: fp.curry(isValid),
	isInvalid: fp.curry(isInvalid),
	validate: fp.curry(validate),
	validateWithOpts: fp.curry(validateWithOpts),
	validateAll: fp.curry(validateAll),
	validateAllWithOpts: fp.curry(validateAllWithOpts),
	createValidateFunction,
}
