/** @module ego */
/** @namespace module:ego~validators/boolean */
import fp from '../lodash.imports'

import ERROR_KEYS from '../defaults/keys'
import { toValidator } from '../utils'

const isBoolean = toValidator(ERROR_KEYS.BOOLEAN.TYPE, fp.isBoolean)

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
   * import { validators } from 'ego'
   * 
   * const { boolean } = validators
   * 
   * console.log(boolean.isBoolean(undefined)) // null
   * console.log(boolean.isBoolean(null)) // null
   * console.log(boolean.isBoolean(true)) // null
   * console.log(boolean.isBoolean([])) // null
   * 
   * console.log(boolean.isBoolean(1)) // ['boolean.type']
   * 
   */
  isBoolean,
}
