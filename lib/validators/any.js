/** @module ego */
/** @namespace module:ego~validators/any */
import fp from '../like.lodash'

import ERROR_KEYS from '../defaults/keys'
import { toValidatorWithArgs } from '../utils'

const required = value => (value === null || value === undefined ?
  [ERROR_KEYS.ANY.REQUIRED] :
  null
)

const allow = toValidatorWithArgs(ERROR_KEYS.ANY.ALLOW, (args, value) => fp.includes(value, args))

export {
  /**
   * Checks whether value is null/undefined
   * @function required
   * @memberof module:ego~validators/any
   * 
   * @arg {any} value any possible value
   * 
   * @returns {string[]|null} returns one item array with key [{@link module:ego~ERROR_KEYS.ANY|'any.required'}]
   * 
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { any } = validators
   * 
   * console.log(any.required(undefined)) // ['any.required']
   * console.log(any.required(null)) // ['any.required']
   * console.log(any.required('')) // null
   * 
   */
  required, 
  /**
   * Checks whether value is related to one of expected values
   * @function allow
   * @memberof module:ego~validators/any
   * 
   * @arg {any} value any possible value
   * 
   * @returns {any[]|null} returns tuple [{@link module:ego~ERROR_KEYS.ANY|'any.allow'}, [...allowedValues]]
   * 
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { any } = validators
   * const isHelloOrWorld = any.allow(['hello', 'world'])
   * 
   * console.log(isHelloOrWorld(undefined)) // null
   * console.log(isHelloOrWorld(null)) // null
   * console.log(isHelloOrWorld('hello')) // null
   * console.log(isHelloOrWorld('world')) // null
   * 
   * console.log(isHelloOrWorld('cosmic')) // ['any.allow', ['hello', 'world']]
   * 
   */
  allow,
}
