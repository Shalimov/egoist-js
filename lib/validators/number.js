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
	 * Checks whether value is lower than defined values
	 * @function lt
	 * @memberof module:ego~validators/number
	 * 
	 * @arg {any} value accepts a number value
	 * 
	 * @returns {any[]|null} returns tuple [{@link module:ego~ERROR_KEYS.NUMBER|'number.lt'}, lt]
	 *  
	 * @example
	 * 
	 * import { validators } from 'ego'
	 * 
	 * const { number } = validators
	 * 
	 * const lowerThan = number.lt(3)
	 * 
	 * console.log(lowerThan(undefined)) // null
	 * console.log(lowerThan(null)) // null
	 * console.log(lowerThan(2)) // null
	 * 
	 * console.log(lowerThan(3)) // ['number.lt', 3]
	 * console.log(lowerThan(4)) // ['number.lt', 3]
	 * 
	 */
	lt,
	/**
	 * Checks whether value is greater than defined values
	 * @function gt
	 * @memberof module:ego~validators/number
	 * 
	 * @arg {any} value accepts a number value
	 * 
	 * @returns {any[]|null} returns tuple [{@link module:ego~ERROR_KEYS.NUMBER|'number.gt'}, gt]
	 *  
	 * @example
	 * 
	 * import { validators } from 'ego'
	 * 
	 * const { number } = validators
	 * 
	 * const greaterThan = number.gt(3)
	 * 
	 * console.log(greaterThan(undefined)) // null
	 * console.log(greaterThan(null)) // null
	 * console.log(greaterThan(4)) // null
	 * 
	 * console.log(greaterThan(3)) // ['number.gt', 3]
	 * console.log(greaterThan(2)) // ['number.gt', 3]
	 * 
	 */
	gt,
	/**
	 * Checks whether value is greater or equal than defined values
	 * @function ge
	 * @memberof module:ego~validators/number
	 * 
	 * @arg {any} value accepts a number value
	 * 
	 * @returns {any[]|null} returns tuple [{@link module:ego~ERROR_KEYS.NUMBER|'number.ge'}, ge]
	 *  
	 * @example
	 * 
	 * import { validators } from 'ego'
	 * 
	 * const { number } = validators
	 * 
	 * const greaterEqual = number.ge(3)
	 * 
	 * console.log(greaterEqual(undefined)) // null
	 * console.log(greaterEqual(null)) // null
	 * console.log(greaterEqual(4)) // null
	 * console.log(greaterEqual(3)) // null
	 * 
	 * console.log(greaterEqual(2)) // ['number.ge', 3]
	 * 
	 */
	ge,
	/**
	 * Checks whether value is lower or equal than defined values
	 * @function le
	 * @memberof module:ego~validators/number
	 * 
	 * @arg {any} value accepts a number value
	 * 
	 * @returns {any[]|null} returns tuple [{@link module:ego~ERROR_KEYS.NUMBER|'number.le'}, le]
	 *  
	 * @example
	 * 
	 * import { validators } from 'ego'
	 * 
	 * const { number } = validators
	 * 
	 * const lowerOrEqual = number.le(3)
	 * 
	 * console.log(lowerOrEqual(undefined)) // null
	 * console.log(lowerOrEqual(null)) // null
	 * console.log(lowerOrEqual(2)) // null
	 * console.log(lowerOrEqual(3)) // null
	 * 
	 * console.log(lowerOrEqual(4)) // ['number.le', 3]
	 * 
	 */
	le,
	/**
	 * Checks whether value is in defined range
	 * @function inRange
	 * @memberof module:ego~validators/number
	 * 
	 * @arg {any} value accepts a number value
	 * 
	 * @returns {any[]|null} returns tuple [{@link module:ego~ERROR_KEYS.NUMBER|'number.range'}, [min, max]]
	 *  
	 * @example
	 * 
	 * import { validators } from 'ego'
	 * 
	 * const { number } = validators
	 * 
	 * const inRng = number.inRange([2, 5])
	 * 
	 * console.log(inRng(undefined)) // null
	 * console.log(inRng(null)) // null
	 * console.log(inRng(2)) // null
	 * console.log(inRng(3)) // null
	 * console.log(inRng(4)) // null
	 * 
	 * console.log(inRng(5)) // ['number.range', [2, 5]]
	 * console.log(inRng(6)) // ['number.range', [2, 5]]
	 * 
	 */
	inRange,
	/**
	 * Checks whether value is number
	 * @function isNumber
	 * @memberof module:ego~validators/number
	 * 
	 * @arg {any} value accepts a number value
	 * 
	 * @returns {any[]|null} returns [{@link module:ego~ERROR_KEYS.NUMBER|'number.type'}]
	 *  
	 * @example
	 * 
	 * import { validators } from 'ego'
	 * 
	 * const { number } = validators
	 * 
	 * console.log(number.isNumber(undefined)) // null
	 * console.log(number.isNumber(null)) // null
	 * console.log(number.isNumber(2)) // null
	 * 
	 * console.log(number.isNumber('5')) // ['number.type']
	 * console.log(number.isNumber([])) // ['number.type']
	 * 
	 */
	isNumber,
}
