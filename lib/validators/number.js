import fp from 'lodash/fp'

import ERROR_KEYS from '../defaults/keys'
import { toValidator, toValidatorWithArgs } from '../utils'

const gt = toValidatorWithArgs(ERROR_KEYS.NUMBER.GT, (min, value) => min < value)
const lt = toValidatorWithArgs(ERROR_KEYS.NUMBER.LT, (max, value) => max > value)
const gte = toValidatorWithArgs(ERROR_KEYS.NUMBER.GTE, (min, value) => min <= value)
const lte = toValidatorWithArgs(ERROR_KEYS.NUMBER.LTE, (max, value) => max >= value)
const isNumber = toValidator(ERROR_KEYS.NUMBER.TYPE, fp.isNumber)

export {
	lt,
	gt,
	gte,
	lte,
	isNumber,
}
