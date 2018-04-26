import spec from './spec'
import validateModule from './validate'
import validators from './validators'

import ERROR_KEYS from './defaults/keys'
import ERROR_MESSAGES from './defaults/messages'

const {
	isValid,
	isInvalid,
	validate,
	validateWithOpts,
	validateAll,
	validateAllWithOpts,
	createValidateFunction,
} = validateModule

export {
	validators,
	spec,
	isValid,
	isInvalid,
	validate,
	validateWithOpts,
	validateAll,
	validateAllWithOpts,
	createValidateFunction,
	ERROR_KEYS,
	ERROR_MESSAGES,
}
