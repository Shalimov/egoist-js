import spec from './spec'
import validateModule from './validate'
import validators from './validators'

import ERROR_KEYS from './defaults/keys'
import ERROR_MESSAGES from './defaults/messages'

const {
	isValid,
	isInvalid,
	validate,
	validateAll,
	createValidateFunction,
} = validateModule

export {
	validators,
	spec,
	isValid,
	isInvalid,
	validate,
	validateAll,
	createValidateFunction,
	ERROR_KEYS,
	ERROR_MESSAGES,
}
