/** @module ego */
/** @namespace module:ego~validators/string */
import fp from '../like.lodash'

import ERROR_KEYS from '../defaults/keys'
import { toValidator, toValidatorWithArgs } from '../utils'

const DIGITS_PATTERN = /^\d+$/
const ALPHANUM_PATTERN = /^[a-zA-Z0-9]+$/
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const ISO_DATE_PATTERN = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/

const isString = toValidator(ERROR_KEYS.STRING.TYPE, fp.isString)
const isNotEmpty = toValidator(ERROR_KEYS.STRING.EMPTY, value => value !== '')

const isEmail = toValidator(ERROR_KEYS.STRING.EMAIL, value => EMAIL_PATTERN.test(value))
const isDigits = toValidator(ERROR_KEYS.STRING.DIGITS, value => DIGITS_PATTERN.test(value))
const isAlphanum = toValidator(ERROR_KEYS.STRING.ALPHANUM, value => ALPHANUM_PATTERN.test(value))
const isISODate = toValidator(ERROR_KEYS.STRING.ISO_DATE, value => ISO_DATE_PATTERN.test(value))

const minLength = toValidatorWithArgs(ERROR_KEYS.STRING.MIN_LENGTH, (minLength, value) => value.length >= minLength)
const maxLength = toValidatorWithArgs(ERROR_KEYS.STRING.MAX_LENGTH, (maxLength, value) => value.length <= maxLength)
const length = toValidatorWithArgs(ERROR_KEYS.STRING.LENGTH, (length, value) => value.length === length)

const match = toValidatorWithArgs(ERROR_KEYS.STRING.MATCH, (pattern, value) => pattern.test(value))

export {
  /**
   * Checks whether value is string
   * @function isString
   * @memberof module:ego~validators/string
   * 
   * @arg {any} value accepts any value
   * 
   * @returns {any[]|null} returns [{@link module:ego~ERROR_KEYS.STRING|'string.type'}]
   * 
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { string } = validators
   * 
   * console.log(string.isString(undefined)) // null
   * console.log(string.isString(null)) // null
   * console.log(string.isString('-\/-')) // null
   * console.log(string.isString('')) // null
   * 
   * console.log(string.isString({})) // ['string.type']
   * console.log(string.isString(1)) // ['string.type']
   * 
   */
  isString,
  /**
   * Checks whether value is empty string
   * @function isNotEmpty
   * @memberof module:ego~validators/string
   * 
   * @arg {any} value accepts string
   * 
   * @returns {any[]|null} returns [{@link module:ego~ERROR_KEYS.STRING|'string.empty'}]
   * 
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { string } = validators
   * 
   * console.log(string.isNotEmpty(undefined)) // null
   * console.log(string.isNotEmpty(null)) // null
   * console.log(string.isNotEmpty('-\/-')) // null
   * 
   * console.log(string.isNotEmpty('')) // ['string.empty']
   * 
   */
  isNotEmpty,
  /**
   * Checks whether value is valid email address
   * @function isEmail
   * @memberof module:ego~validators/string
   * 
   * @arg {any} value accepts string
   * 
   * @returns {any[]|null} returns [{@link module:ego~ERROR_KEYS.STRING|'string.email'}]
   * 
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { string } = validators
   * 
   * console.log(string.isEmail(undefined)) // null
   * console.log(string.isEmail(null)) // null
   * console.log(string.isEmail('email@address.com')) // null
   * 
   * console.log(string.isEmail('email@address')) // ['string.email']
   * console.log(string.isEmail('email@')) // ['string.email']
   * 
   */
  isEmail,
  /**
   * Checks whether value contains only digits
   * @function isDigits
   * @memberof module:ego~validators/string
   * 
   * @arg {any} value accepts string
   * 
   * @returns {any[]|null} returns [{@link module:ego~ERROR_KEYS.STRING|'string.digits'}]
   * 
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { string } = validators
   * 
   * console.log(string.isDigits(undefined)) // null
   * console.log(string.isDigits(null)) // null
   * console.log(string.isDigits('1991')) // null
   * 
   * console.log(string.isDigits('email@address')) // ['string.digits']
   * console.log(string.isDigits('email@')) // ['string.digits']
   * 
   */
  isDigits,
  /**
   * Checks whether value contains only alphanumeric characters
   * @function isAlphanum
   * @memberof module:ego~validators/string
   * 
   * @arg {any} value accepts string
   * 
   * @returns {any[]|null} returns [{@link module:ego~ERROR_KEYS.STRING|'string.alphanum'}]
   * 
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { string } = validators
   * 
   * console.log(string.isAlphanum(undefined)) // null
   * console.log(string.isAlphanum(null)) // null
   * console.log(string.isAlphanum('abcd')) // null
   * console.log(string.isAlphanum('abcd192')) // null
   * console.log(string.isAlphanum('12abcd192')) // null
   * console.log(string.isAlphanum('192')) // null
   * 
   * console.log(string.isAlphanum('email@address')) // ['string.alphanum']
   * console.log(string.isAlphanum('email@')) // ['string.alphanum']
   * 
   */
  isAlphanum,
  /**
   * Checks whether value is iso date string
   * @function isISODate
   * @memberof module:ego~validators/string
   * 
   * @arg {any} value accepts string
   * 
   * @returns {any[]|null} returns [{@link module:ego~ERROR_KEYS.STRING|'string.iso.date'}]
   * 
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { string } = validators
   * 
   * console.log(string.isISODate(undefined)) // null
   * console.log(string.isISODate(null)) // null
   * console.log(string.isISODate('2018-05-01T09:31:21.156Z')) // null
   * 
   * console.log(string.isISODate('Tue May 01 2018 12:29:30 GMT+0300 (+03)')) // ['string.iso.date']
   * console.log(string.isISODate('email@')) // ['string.iso.date']
   * 
   */
  isISODate,
  /**
   * Checks whether value is match a specific pattern
   * @function match
   * @memberof module:ego~validators/string
   * 
   * @arg {any} value accepts string
   * 
   * @returns {any[]|null} returns [{@link module:ego~ERROR_KEYS.STRING|'string.match'}, pattern]
   * 
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { string } = validators
   * 
   * const isUsername = string.match(/^[a-zA-Z\s]+$/)
   * 
   * console.log(isUsername(undefined)) // null
   * console.log(isUsername(null)) // null
   * console.log(isUsername('John Margin')) // null
   * 
   * console.log(isUsername('10292929')) // ['string.match']
   * console.log(isUsername('19 192 191.ds.')) // ['string.match']
   * console.log(isUsername('')) // ['string.match']
   * 
   */
  match,
  /**
   * Checks whether value has length greater or equal than expected min length
   * @function minLength
   * @memberof module:ego~validators/string
   * 
   * @arg {number} value accepts min length for a string
   * 
   * @returns {any[]|null} returns [{@link module:ego~ERROR_KEYS.STRING|'string.min.length'}, minLength]
   * 
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { string } = validators
   * 
   * const minLength = string.minLength(5)
   * 
   * console.log(minLength(undefined)) // null
   * console.log(minLength(null)) // null
   * console.log(minLength('John Margin')) // null
   * console.log(minLength('Tommy')) // null
   * 
   * console.log(minLength('Tom')) // ['string.min.length', 5]
   * console.log(minLength('Jedi')) // ['string.min.length', 5]
   * console.log(minLength('')) // ['string.min.length', 5]
   * 
   */
  minLength,
  /**
   * Checks whether value has length less or equal than expected max length
   * @function maxLength
   * @memberof module:ego~validators/string
   * 
   * @arg {number} value accepts max length for a string
   * 
   * @returns {any[]|null} returns [{@link module:ego~ERROR_KEYS.STRING|'string.max.length'}, maxLength]
   * 
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { string } = validators
   * 
   * const maxLength = string.maxLength(5)
   * 
   * console.log(maxLength(undefined)) // null
   * console.log(maxLength(null)) // null
   * console.log(maxLength('John')) // null
   * console.log(maxLength('Tommy')) // null
   * 
   * console.log(maxLength('Tom Martin')) // ['string.max.length', 5]
   * console.log(maxLength('Ronny Ronney')) // ['string.max.length', 5]
   * 
   */
  maxLength,
  /**
   * Checks whether value has length equal expected size
   * @function length
   * @memberof module:ego~validators/string
   * 
   * @arg {number} value accepts exact length for a string
   * 
   * @returns {any[]|null} returns [{@link module:ego~ERROR_KEYS.STRING|'string.exact.length'}, length]
   * 
   * @example
   * 
   * import { validators } from 'egoist-js'
   * 
   * const { string } = validators
   * 
   * const length = string.length(5)
   * 
   * console.log(length(undefined)) // null
   * console.log(length(null)) // null
   * console.log(length('Tommy')) // null
   * 
   * console.log(length('Todd')) // ['string.exact.length', 5]
   * console.log(length('Ronney')) // ['string.exact.length', 5]
   * 
   */
  length,
}
