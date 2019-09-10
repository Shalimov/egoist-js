/** @module ego */
/** @namespace module:ego~ERROR_MESSAGES */
import ERROR_KEYS from './keys'
import fp from '../like.lodash'

const {
  ANY,
  NUMBER,
  STRING,
  BOOLEAN,
  SHAPE,
  ARRAY,
} = ERROR_KEYS

const MESSAGES = Object.freeze({
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.ANY|any.unknown}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.ANY.UNKNOWN]
   * console.log(messageFn({ label: 'Superfield' })) // Superfield contains errors
   * 
   */
  [ANY.UNKNOWN]: ({ label }) => `${label} contains errors`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.ANY|any.required}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.ANY.REQUIRED]
   * console.log(messageFn({ label: 'Superfield' })) // Superfield is required
   * 
   */
  [ANY.REQUIRED]: ({ label }) => `${label} is required`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.ANY|any.allow}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.ANY.ALLOW]
   * console.log(messageFn({ label: 'Superfield', args: ['hello', 'world'] })) 
   * // Superfield should be one of allowed values: hello, world
   * 
   */
  [ANY.ALLOW]: ({ label, args }) => `${label} should be one of allowed values: ${args.join(', ')}`,

  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.NUMBER|number.type}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.NUMBER.TYPE]
   * console.log(messageFn({ label: 'Superfield' })) 
   * // Superfield should be a number
   * 
   */
  [NUMBER.TYPE]: ({ label }) => `${label} should be a number`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.NUMBER|number.gt}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.NUMBER.GT]
   * console.log(messageFn({ label: 'Superfield', args: 5 })) 
   * // Superfield should be greater than 5
   * 
   */
  [NUMBER.GT]: ({ label, args }) => `${label} should be greater than ${args}`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.NUMBER|number.lt}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.NUMBER.LT]
   * console.log(messageFn({ label: 'Superfield', args: 5 })) 
   * // Superfield should be lower than 5
   * 
   */
  [NUMBER.LT]: ({ label, args }) => `${label} should be lower than ${args}`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.NUMBER|number.ge}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.NUMBER.GE]
   * console.log(messageFn({ label: 'Superfield', args: 5 })) 
   * // Superfield should be greater than or equal 5
   * 
   */
  [NUMBER.GE]: ({ label, args }) => `${label} should be greater or equal than ${args}`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.NUMBER|number.le}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.NUMBER.LE]
   * console.log(messageFn({ label: 'Superfield', args: 5 })) 
   * // Superfield should be lower than or equal 5
   * 
   */
  [NUMBER.LE]: ({ label, args }) => `${label} should be lower or equal than ${args}`,
  /**
  * @memberof module:ego~ERROR_MESSAGES
  * 
  * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.NUMBER|number.range}
  * @example
  * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
  * 
  * const messageFn = ERROR_MESSAGES[ERROR_KEYS.NUMBER.RANGE]
  * console.log(messageFn({ label: 'Superfield', args: [5, 10] })) 
  * // Superfield should be lower than 10 and greater or equal 5
  * 
  */
  [NUMBER.RANGE]: ({ label, args: [min, max] }) => `${label} should be lower than ${max} and greater or equal ${min}`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.STRING|string.empty}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.STRING.EMPTY]
   * console.log(messageFn({ label: 'Superfield' })) 
   * // Superfield should not be blank
   * 
   */
  [STRING.EMPTY]: ({ label }) => `${label} should not be blank`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.STRING|string.type}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.STRING.TYPE]
   * console.log(messageFn({ label: 'Superfield' })) 
   * // Superfield should be a string
   * 
   */
  [STRING.TYPE]: ({ label }) => `${label} should be a string`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.STRING|string.match}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.STRING.MATCH]
   * console.log(messageFn({ label: 'Superfield', args: /[a-zA-Z]/ })) 
   * // Superfield should match the pattern /[a-zA-Z]
   * 
   */
  [STRING.MATCH]: ({ label, args }) => `${label} should match the pattern ${args}`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.STRING|string.min.length}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.STRING.MIN_LENGTH]
   * console.log(messageFn({ label: 'Superfield', args: 5 })) 
   * // Superfield should have at least 5 characters
   * 
   */
  [STRING.MIN_LENGTH]: ({ label, args }) => `${label} should have at least ${args} characters`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.STRING|string.max.length}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.STRING.MAX_LENGTH]
   * console.log(messageFn({ label: 'Superfield', args: 5 })) 
   * // Superfield should have at most 5 characters
   * 
   */
  [STRING.MAX_LENGTH]: ({ label, args }) => `${label} should have at most ${args} characters`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.STRING|string.exact.length}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.STRING.LENGTH]
   * console.log(messageFn({ label: 'Superfield', args: 5 })) 
   * // Superfield should have only 5 characters
   * 
   */
  [STRING.LENGTH]: ({ label, args }) => `${label} should have only ${args} characters`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.STRING|string.email}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.STRING.EMAIL]
   * console.log(messageFn({ label: 'Superfield' })) 
   * // Superfield should be a valid email address
   * 
   */
  [STRING.EMAIL]: ({ label }) => `${label} should be a valid email address`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.STRING|string.digits}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.STRING.DIGITS]
   * console.log(messageFn({ label: 'Superfield' })) 
   * // Superfield should contain only digits
   * 
   */
  [STRING.DIGITS]: ({ label }) => `${label} should contain only digits`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.STRING|string.alphanum}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.STRING.ALPHANUM]
   * console.log(messageFn({ label: 'Superfield' })) 
   * // Superfield should contain only alphanumeric characters
   * 
   */
  [STRING.ALPHANUM]: ({ label }) => `${label} should contain only alphanumeric characters`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.STRING|string.iso.date}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.STRING.ISO_DATE]
   * console.log(messageFn({ label: 'Superfield' })) 
   * // Superfield should be an ISO Date
   * 
   */
  [STRING.ISO_DATE]: ({ label }) => `${label} should be an ISO Date`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.BOOLEAN|boolean.type}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.BOOLEAN.TYPE]
   * console.log(messageFn({ label: 'Superfield' })) 
   * // Superfield should be a boolean
   * 
   */
  [BOOLEAN.TYPE]: ({ label }) => `${label} should be a boolean`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.BOOLEAN|boolean.truthy}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.BOOLEAN.TRUTHY]
   * console.log(messageFn({ label: 'Superfield' })) 
   * // Superfield should be true
   * 
   */
  [BOOLEAN.TRUTHY]: ({ label }) => `${label} should be true`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.BOOLEAN|boolean.falsy}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.BOOLEAN.FALSY]
   * console.log(messageFn({ label: 'Superfield' })) 
   * // Superfield should be false
   * 
   */
  [BOOLEAN.FALSY]: ({ label }) => `${label} should be false`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.SHAPE|shape.type}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.SHAPE.TYPE]
   * console.log(messageFn({ label: 'Superfield' })) 
   * // Superfield should be an object
   * 
   */
  [SHAPE.TYPE]: ({ label }) => `${label} should be an object`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.SHAPE|shape.allowed.keys}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.SHAPE.ALLOWED_KEYS]
   * console.log(messageFn({ label: 'Superfield', value: { prop3: null }, args: ['prop1', 'prop2'] })) 
   * // Superfield contains: prop3, but should contain only keys: prop1, prop2
   * 
   */
  [SHAPE.ALLOWED_KEYS]: ({ label, value, args }) => {
    const keys = fp.keys(value).join(', ') || 'no keys'
    return `${label} contains: ${keys}, but should contain only keys: ${args.join(', ')}`
  },
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.SHAPE|shape.expected.keys}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.SHAPE.EXPECTED_KEYS]
   * console.log(messageFn({ label: 'Superfield', value: { prop3: 1 }, args: ['prop1', 'prop2'] })) 
   * // Superfield contains: prop3, but should have keys: prop1, prop2
   * 
   */
  [SHAPE.EXPECTED_KEYS]: ({ label, value, args }) => {
    const keys = fp.keys(value).join(', ') || 'no keys'
    return `${label} contains: ${keys}, but should have keys: ${args.join(', ')}`
  },
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.SHAPE|shape.forbidden.keys}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.SHAPE.FORBIDDEN_KEYS]
   * console.log(messageFn({ label: 'Superfield', args: ['prop1', 'prop2'] })) 
   * // Superfield contains forbidden keys: prop1, prop2 
   * 
   */
  [SHAPE.FORBIDDEN_KEYS]: ({ label, args }) => `${label} contains forbidden keys: ${args.join(', ')}`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.ARRAY|array.type}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.ARRAY.TYPE]
   * console.log(messageFn({ label: 'Superfield' })) 
   * // Superfield should be an array
   * 
   */
  [ARRAY.TYPE]: ({ label }) => `${label} should be an array`,
  /**
  * @memberof module:ego~ERROR_MESSAGES
  * 
  * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.ARRAY|array.exact.length}
  * @example
  * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
  * 
  * const messageFn = ERROR_MESSAGES[ERROR_KEYS.ARRAY.LENGTH]
  * console.log(messageFn({ label: 'Superfield', args: 5 }))
  * // Superfield should have 5 items
  * 
  */
  [ARRAY.LENGTH]: ({ label, args }) => `${label} should have ${args} items`,
  /**
  * @memberof module:ego~ERROR_MESSAGES
  * 
  * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.ARRAY|array.min.length}
  * @example
  * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
  * 
  * const messageFn = ERROR_MESSAGES[ERROR_KEYS.ARRAY.MIN_LENGTH]
  * console.log(messageFn({ label: 'Superfield', args: 5 }))
  * // Superfield should have at least 5 items
  * 
  */
  [ARRAY.MIN_LENGTH]: ({ label, args }) => `${label} should have at least ${args} items`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.ARRAY|array.max.length}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.ARRAY.MAX_LENGTH]
   * console.log(messageFn({ label: 'Superfield', args: 5 }))
   * // Superfield should have at most 5 items
   * 
   */
  [ARRAY.MAX_LENGTH]: ({ label, args }) => `${label} should have at most ${args} items`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.ARRAY|array.range}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.ARRAY.IN_RANGE]
   * console.log(messageFn({ label: 'Superfield', args: [5, 10] }))
   * // Superfield should have length between 5 and 10
   * 
   */
  [ARRAY.IN_RANGE]: ({ label, args: [min, max] }) => `${label} should have length between ${min} and ${max}`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.ARRAY|array.some}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.ARRAY.SOME]
   * console.log(messageFn({ label: 'Superfield' }))
   * // Superfield should have at least one item that follows the rule
   * 
   */
  [ARRAY.SOME]: ({ label }) => `${label} should have at least one item that follows the rule`,
  /**
   * @memberof module:ego~ERROR_MESSAGES
   * 
   * @arg {Object} params - Returns message related to {@link module:ego~ERROR_KEYS.ARRAY|array.every}
   * @example
   * import { ERROR_MESSAGES, ERROR_KEYS } from 'egoist-js'
   * 
   * const messageFn = ERROR_MESSAGES[ERROR_KEYS.ARRAY.EVERY]
   * console.log(messageFn({ label: 'Superfield' }))
   * // Superfield items should follow the rule
   * 
   */
  [ARRAY.EVERY]: ({ label }) => `${label} items should follow the rule`,
})

export default MESSAGES
