import fp from 'lodash/fp'

import ERROR_KEYS from '../defaults/keys'
import { toValidator, toValidatorWithArgs } from '../utils'

const gt = toValidatorWithArgs(ERROR_KEYS.NUMBER.GT, (min, value) => min < value)
const lt = toValidatorWithArgs(ERROR_KEYS.NUMBER.LT, (max, value) => max > value)
const ge = toValidatorWithArgs(ERROR_KEYS.NUMBER.GE, (min, value) => min <= value)
const le = toValidatorWithArgs(ERROR_KEYS.NUMBER.LE, (max, value) => max >= value)
const inRange = toValidatorWithArgs(ERROR_KEYS.NUMBER.RANGE, ([min, max], value) => value >= min && max > value)
const isNumber = toValidator(ERROR_KEYS.NUMBER.TYPE, fp.isNumber)

export {
	lt,
	gt,
	ge,
	le,
	inRange,
	isNumber,
}
