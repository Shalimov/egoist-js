import fp from 'lodash/fp'

import ERROR_KEYS from './defaults/keys'
import ERROR_MESSAGES from './defaults/messages'

const isValid = (specFn, value) => fp.isEmpty(specFn(value, { untilFail: true }))
const isInvalid = (specFn, value) => !fp.isEmpty(specFn(value, { untilFail: true }))

const createValidateFunction = (messageFuncs, untilFail = false) => {
	const getLabel = fp.getOr('value', 'key')
	const getParent = fp.get('parent')

	const getFullPath = (context) => {
		const fullpath = []
		let currentContext = context

		while (currentContext != null) {
			fullpath.push(currentContext.key)
			currentContext = context.parent
		}

		return fullpath
	}

	const formatValidationOutput = fp.flow(
		fp.map(({ result, value, context }) => {
			const messageFn = messageFuncs[result] || messageFuncs[ERROR_KEYS.ANY.UNKNOWN]
			const path = getFullPath(getParent(context))

			return {
				message: messageFn({
					label: getLabel(context),
					path,
					value,
				}),
				value,
				path,
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
