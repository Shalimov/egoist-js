/** @module ego */
/** @namespace module:ego~validators/boolean */
import fp from '../like.lodash'

import ERROR_KEYS from '../defaults/keys'
import { toValidator } from '../utils'

const isBoolean = toValidator(ERROR_KEYS.BOOLEAN.TYPE, fp.isBoolean)
const isFalsy = toValidator(ERROR_KEYS.BOOLEAN.FALSY, value => !value)
const isTruthy = value => value ? null : [ERROR_KEYS.BOOLEAN.TRUTHY]

export {
  /**
   * @function isBoolean
   * @memberof module:ego~validators/boolean
   * 
   * @arg {any} value any possible value
   * 
   * @returns {string[]|null} returns one item array with key [{@link module:ego~ERROR_KEYS.BOOLEAN|'boolean.type'}]
   * 
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { boolean } = validators
   * 
   * console.log(boolean.isBoolean(undefined)) // null
   * console.log(boolean.isBoolean(null)) // null
   * console.log(boolean.isBoolean(false)) // null
   * console.log(boolean.isBoolean(true)) // null
   * 
   * console.log(boolean.isBoolean(1)) // ['boolean.type']
   * console.log(boolean.isBoolean([])) // ['boolean.type']
   * console.log(boolean.isBoolean('')) // ['boolean.type']
   * console.log(boolean.isBoolean(0)) // ['boolean.type']
   * 
   */
  isBoolean,
   /**
   * @function isTruthy
   * @memberof module:ego~validators/boolean
   * 
   * @arg {any} value any possible value
   * 
   * @returns {string[]|null} returns one item array with key [{@link module:ego~ERROR_KEYS.BOOLEAN|'boolean.truthy'}]
   * 
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { boolean } = validators
   * 
   * console.log(boolean.isTruthy(1)) // null
   * console.log(boolean.isTruthy([])) // null
   * console.log(boolean.isTruthy('string')) // null
   * 
   * console.log(boolean.isTruthy(undefined)) // ['boolean.truthy']
   * console.log(boolean.isTruthy(null)) // ['boolean.truthy']
   * console.log(boolean.isTruthy(false)) // ['boolean.truthy']
   * console.log(boolean.isTruthy(NaN)) // ['boolean.truthy']
   * console.log(boolean.isTruthy(0)) // ['boolean.truthy']
   * console.log(boolean.isTruthy('')) // ['boolean.truthy']
   */
  isTruthy,
  /**
   * @function isFalsy
   * @memberof module:ego~validators/boolean
   * 
   * @arg {any} value any possible value
   * 
   * @returns {string[]|null} returns one item array with key [{@link module:ego~ERROR_KEYS.BOOLEAN|'boolean.falsy'}]
   * 
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { boolean } = validators
   * 
   * console.log(boolean.isFalsy(undefined)) // null
   * console.log(boolean.isFalsy(null)) // null
   * console.log(boolean.isFalsy(false)) // null
   * console.log(boolean.isFalsy(NaN)) // null
   * console.log(boolean.isFalsy(0)) // null
   * console.log(boolean.isFalsy('')) // null
   * 
   * console.log(boolean.isFalsy(1)) // ['boolean.falsy']
   * console.log(boolean.isFalsy([])) // ['boolean.falsy']
   * console.log(boolean.isFalsy('string')) // ['boolean.falsy']
   */
  isFalsy,
}
