import fp from 'lodash/fp'

import ERROR_KEYS from './defaults/keys'
import ERROR_MESSAGES from './defaults/messages'

const isValid = (specFn, value) => fp.isEmpty(specFn(value, { untilFail: true }))
const isInvalid = (specFn, value) => !fp.isEmpty(specFn(value, { untilFail: true }))

const toTuple = collection => (fp.isArray(collection) ? collection : [])

// TODO: custom messages as options
const createValidateFunction = (messageFuncs, untilFail = false) => {
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

	const formatValidationOutput = fp.flow(
		fp.map(({ result, value, context }) => {
			const [name, args] = toTuple(result)
			const messageFn = messageFuncs[name] || messageFuncs[ERROR_KEYS.ANY.UNKNOWN]
			const path = makeFullPathGetter(context)

			return {
				message: messageFn({
					label: getLabel(context),
					value,
					path,
					args,
				}),
				value,
				path,
				args,
			}
		}),
		fp.cond([
			[fp.isEmpty, () => null],
			[fp.stubTrue, fp.identity],
		])
	)

	return (specFn, value) => {
		const validationResult = specFn(value, { untilFail })
		return formatValidationOutput(validationResult)
	}
}

export default {
	isValid: fp.curry(isValid),
	isInvalid: fp.curry(isInvalid),
	validate: fp.curry(createValidateFunction(ERROR_MESSAGES, true)),
	validateAll: fp.curry(createValidateFunction(ERROR_MESSAGES)),
	createValidateFunction,
}
