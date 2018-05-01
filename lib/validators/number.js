/** @module ego */
/** @namespace module:ego~validators/number */
import fp from '../lodash.imports'

import ERROR_KEYS from '../defaults/keys'
import { toValidator, toValidatorWithArgs } from '../utils'

const gt = toValidatorWithArgs(ERROR_KEYS.NUMBER.GT, (min, value) => min < value)
const lt = toValidatorWithArgs(ERROR_KEYS.NUMBER.LT, (max, value) => max > value)
const ge = toValidatorWithArgs(ERROR_KEYS.NUMBER.GE, (min, value) => min <= value)
const le = toValidatorWithArgs(ERROR_KEYS.NUMBER.LE, (max, value) => max >= value)
const inRange = toValidatorWithArgs(ERROR_KEYS.NUMBER.RANGE, ([min, max], value) => value >= min && max > value)
const isNumber = toValidator(ERROR_KEYS.NUMBER.TYPE, fp.isNumber)

export {
	/**
	 * Checks whether an array has exact length
	 * @function length
	 * @memberof module:ego~validators/array
	 * 
	 * @arg {any} accepts an array of any type values
	 * 
	 * @returns {any[]|null} returns tuple [{@link module:ego~ERROR_KEYS.ARRAY|'array.exact.length'}, length]
	 *  
	 * @example
	 * 
	 * import { validators } from 'ego'
	 * 
	 * const { array } = validators
	 * 
	 * const exlength3 = array.length(3)
	 * 
	 * console.log(exlength3(undefined)) // null
	 * console.log(exlength3(null)) // null
	 * console.log(exlength3([1, 2, 3])) // null
	 * 
	 * console.log(exlength3([1, 2, 3, 4, 5])) // ['array.exact.length', 3]
	 * console.log(exlength3([1, 2])) // ['array.exact.length', 3]
	 * 
	 */
	lt,
	gt,
	ge,
	le,
	inRange,
	isNumber,
}
