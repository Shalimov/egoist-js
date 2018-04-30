import fp from '../lodash.imports'

import ERROR_KEYS from '../defaults/keys'
import { toValidator, toValidatorWithArgs } from '../utils'

const isArray = toValidator(ERROR_KEYS.ARRAY.TYPE, fp.isArray)

const minLength = toValidatorWithArgs(ERROR_KEYS.ARRAY.MIN_LENGTH, (minLength, value) => value.length >= minLength)
const maxLength = toValidatorWithArgs(ERROR_KEYS.ARRAY.MAX_LENGTH, (maxLength, value) => value.length <= maxLength)
const length = toValidatorWithArgs(ERROR_KEYS.ARRAY.LENGTH, (length, value) => value.length === length)
const inRange = toValidatorWithArgs(ERROR_KEYS.ARRAY.IN_RANGE, ([min, max], value) => {
	const clength = value.length
	return min <= clength && clength <= max
})

const every = toValidatorWithArgs(ERROR_KEYS.ARRAY.EVERY, (predicate, value) => fp.every(predicate, value))
const some = toValidatorWithArgs(ERROR_KEYS.ARRAY.SOME, (predicate, value) => fp.some(predicate, value))

export {
	isArray,
	some,
	every,
	inRange,
	minLength,
	maxLength,
	length,
}
