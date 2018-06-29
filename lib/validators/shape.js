/** @module ego */
/** @namespace module:ego~validators/shape */
import fp from '../like.lodash'

import ERROR_KEYS from '../defaults/keys'
import { toValidator, toValidatorWithArgs } from '../utils'

const toSet = keys => new Set(keys)
const toKeySet = fp.flow(fp.keys, toSet)

const isShape = toValidator(ERROR_KEYS.SHAPE.TYPE, fp.isObject)

const allowedKeys = toValidatorWithArgs(ERROR_KEYS.SHAPE.ALLOWED_KEYS, fp.overArgs(
  (allowedKeysSet, existingKeys) => existingKeys.every(key => allowedKeysSet.has(key)),
  [toSet, fp.keys],
))

const forbiddenKeys = toValidatorWithArgs(ERROR_KEYS.SHAPE.FORBIDDEN_KEYS, fp.overArgs(
  (forbiddenKeys, existingKeySet) => !forbiddenKeys.some(key => existingKeySet.has(key)),
  [fp.identity, toKeySet]
))

const expectKeys = toValidatorWithArgs(ERROR_KEYS.SHAPE.EXPECTED_KEYS, fp.overArgs(
  (expectedKeys, existingKeysSet) =>
    expectedKeys.length === existingKeysSet.size &&
    expectedKeys.every(key => existingKeysSet.has(key)),
  [fp.identity, toKeySet]
))

export {
  /**
   * Checks whether value is an object
   * @function isShape
   * @memberof module:ego~validators/shape
   * 
   * @arg {any} value accepts any value
   * 
   * @returns {any[]|null} returns [{@link module:ego~ERROR_KEYS.SHAPE|'shape.type'}]
   *  
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { shape } = validators
   * 
   * console.log(shape.isShape(undefined)) // null
   * console.log(shape.isShape(null)) // null
   * console.log(shape.isShape({ a: 1 })) // null
   * console.log(shape.isShape({})) // null
   * 
   * console.log(shape.isShape('5')) // ['shape.type']
   * console.log(shape.isShape([])) // ['shape.type']
   * 
   */
  isShape,

  /**
   * Checks whether value has only allowed properties
   * @function allowedKeys
   * @memberof module:ego~validators/shape
   * 
   * @arg {any} value accepts an object
   * 
   * @returns {any[]|null} returns [{@link module:ego~ERROR_KEYS.SHAPE|'shape.allowed.keys'}]
   *  
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { shape } = validators
   * 
   * const isAllowedKeys = shape.allowedKeys(['prop1', 'prop2'])
   * 
   * console.log(isAllowedKeys(undefined)) // null
   * console.log(isAllowedKeys(null)) // null
   * console.log(isAllowedKeys({ prop1: 1, prop2: 1 })) // null
   * console.log(isAllowedKeys({ prop1: 1 })) // null
   * console.log(isAllowedKeys({ prop2: 1 })) // null
   * console.log(isAllowedKeys({})) // null
   * 
   * console.log(isAllowedKeys({ prop3: 1 })) // ['shape.allowed.keys', ['prop1', 'prop2']]
   * console.log(isAllowedKeys({ prop1: 1, prop3: 1})) // ['shape.allowed.keys', ['prop1', 'prop2']]
   * 
   */
  allowedKeys,

  // EXPECTED_KEYS: 'shape.expected.keys',
  /**
   * Checks whether value has forbidden properties
   * @function forbiddenKeys
   * @memberof module:ego~validators/shape
   * 
   * @arg {any} value accepts an object
   * 
   * @returns {any[]|null} returns [{@link module:ego~ERROR_KEYS.SHAPE|'shape.forbidden.keys'}]
   * 
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { shape } = validators
   * 
   * const isForbiddenKeys = shape.forbiddenKeys(['prop1', 'prop2'])
   * 
   * console.log(isForbiddenKeys(undefined)) // null
   * console.log(isForbiddenKeys(null)) // null
   * console.log(isForbiddenKeys({ prop3: 1, prop4: 1 })) // null
   * console.log(isForbiddenKeys({ prop3: 1 })) // null
   * console.log(isForbiddenKeys({ prop5: 1 })) // null
   * console.log(isForbiddenKeys({})) // null
   * 
   * console.log(isForbiddenKeys({ prop1: 1 })) // ['shape.forbidden.keys', ['prop1', 'prop2']]
   * console.log(isForbiddenKeys({ prop1: 1, prop3: 1})) // ['shape.forbidden.keys', ['prop1', 'prop2']]
   * 
   */
  forbiddenKeys,

  /**
   * Checks whether value has forbidden properties
   * @function expectKeys
   * @memberof module:ego~validators/shape
   * 
   * @arg {any} value accepts an object
   * 
   * @returns {any[]|null} returns [{@link module:ego~ERROR_KEYS.SHAPE|'shape.expected.keys'}]
   *  
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { shape } = validators
   * 
   * const isExpectedKeys = shape.expectKeys(['prop1', 'prop2'])
   * 
   * console.log(isExpectedKeys(undefined)) // null
   * console.log(isExpectedKeys(null)) // null
   * console.log(isExpectedKeys({ prop1: 1, prop2: 1 })) // null
   * 
   * console.log(isExpectedKeys({ prop1: 1 })) // ['shape.expected.keys', ['prop1', 'prop2']]
   * console.log(isExpectedKeys({ prop2: 1 })) // ['shape.expected.keys', ['prop1', 'prop2']]
   * console.log(isExpectedKeys({})) // ['shape.expected.keys', ['prop1', 'prop2']]
   * 
   */
  expectKeys,
}
