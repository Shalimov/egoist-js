/** @module ego */
/** @namespace module:ego~validators/array */
import fp from '../like.lodash'

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
  /**
   * @function isArray
   * @memberof module:ego~validators/array
   * 
   * @arg {any} value any possible value
   * 
   * @returns {string[]|null} returns one item array with key [{@link module:ego~ERROR_KEYS.ARRAY|'array.type'}]
   * 
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { array } = validators
   * 
   * console.log(array.isArray(undefined)) // null
   * console.log(array.isArray(null)) // null
   * console.log(array.isArray([1, 2])) // null
   * console.log(array.isArray([])) // null
   * 
   * console.log(array.isArray(1)) // ['array.type']
   * 
   */
  isArray,
  /**
   * Checks whether at least one item of collection follows a predicate rule
   * @function some
   * @memberof module:ego~validators/array
   * 
   * @arg {any} value accepts an array of any type values
   * 
   * @returns {string[]|null} returns one item array with key [{@link module:ego~ERROR_KEYS.ARRAY|'array.some'}]
   * 
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { array } = validators
   * 
   * const hasEvenValue = array.some(value => value % 2 === 0)
   * 
   * console.log(hasEvenValue(undefined)) // null
   * console.log(hasEvenValue(null)) // null
   * console.log(hasEvenValue([1, 2, 3])) // null
   * 
   * console.log(hasEvenValue([1, 3])) // ['array.some']
   */
  some,
  /**
   * Checks whether each item of collection follows a predicate rule
   * @function every
   * @memberof module:ego~validators/array
   * 
   * @arg {any} value accepts an array of any type values
   * 
   * @returns {string[]|null} returns one item array with key [{@link module:ego~ERROR_KEYS.ARRAY|'array.every'}]
   *  
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { array } = validators
   * 
   * const onlyNumbers = array.every(value => typeof(value === 'number'))
   * 
   * console.log(onlyNumbers(undefined)) // null
   * console.log(onlyNumbers(null)) // null
   * console.log(onlyNumbers([1, 2, 3, 4, 5])) // null
   * 
   * console.log(onlyNumbers(['1', '2', '3'])) // ['array.every']
   * console.log(onlyNumbers([1, 2, null, 4, 5])) // ['array.every']
   */
  every,
  /**
   * Checks whether an array contains desired number of items
   * @function inRange
   * @memberof module:ego~validators/array
   * 
   * @arg {any} value accepts an array of any type values
   * 
   * @returns {any[]|null} returns tuple [{@link module:ego~ERROR_KEYS.ARRAY|'array.range'}, [min_length, max_length]]
   *  
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { array } = validators
   * 
   * const between5and10 = array.inRange([3, 5])
   * 
   * console.log(between5and10(undefined)) // null
   * console.log(between5and10(null)) // null
   * console.log(between5and10([1, 2, 3, 4, 5])) // null
   * console.log(between5and10([1, 2, 3, 4])) // null
   * console.log(between5and10([1, 2, 3])) // null
   * 
   * console.log(between5and10([1, 2, 3, 4, 5, 6])) // ['array.range', [3, 5]]
   * console.log(between5and10([1, 2])) // ['array.range', [3, 5]]
   */
  inRange,
  /**
   * Checks whether an array has at least defined number of items
   * @function minLength
   * @memberof module:ego~validators/array
   * 
   * @arg {any} value accepts an array of any type values
   * 
   * @returns {any[]|null} returns tuple [{@link module:ego~ERROR_KEYS.ARRAY|'array.min.length'}, min_length]
   *  
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { array } = validators
   * 
   * const minLength3 = array.minLength(3)
   * 
   * console.log(minLength3(undefined)) // null
   * console.log(minLength3(null)) // null
   * console.log(minLength3([1, 2, 3, 4, 5])) // null
   * console.log(minLength3([1, 2, 3, 4])) // null
   * console.log(minLength3([1, 2, 3])) // null
   * 
   * console.log(minLength3([1, 2])) // ['array.min.length', 3]
   */
  minLength,
  /**
   * Checks whether an array has at most defined number of items
   * @function maxLength
   * @memberof module:ego~validators/array
   * 
   * @arg {any} value accepts an array of any type values
   * 
   * @returns {any[]|null} returns tuple [{@link module:ego~ERROR_KEYS.ARRAY|'array.max.length'}, max_length]
   *  
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { array } = validators
   * 
   * const maxLength3 = array.maxLength(3)
   * 
   * console.log(maxLength3(undefined)) // null
   * console.log(maxLength3(null)) // null
   * console.log(maxLength3([1, 2, 3])) // null
   * 
   * console.log(maxLength3([1, 2, 3, 4, 5])) // ['array.max.length', 3]
   * console.log(maxLength3([1, 2, 3, 4])) // ['array.max.length', 3]
   * 
   */
  maxLength,
  /**
   * Checks whether an array has exact length
   * @function length
   * @memberof module:ego~validators/array
   * 
   * @arg {any} value accepts an array of any type values
   * 
   * @returns {any[]|null} returns tuple [{@link module:ego~ERROR_KEYS.ARRAY|'array.exact.length'}, length]
   *  
   * @example
   * 
   * import { validators } from 'egoist-js'
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
  length,
}
