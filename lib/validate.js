/** @module ego */
/** @namespace module:ego */
import fp from './like.lodash'

import ERROR_KEYS from './defaults/keys'
import ERROR_MESSAGES from './defaults/messages'

const isValid = (specFn, value) => fp.isEmpty(specFn(value, { untilFail: true }))
const isInvalid = (specFn, value) => !fp.isEmpty(specFn(value, { untilFail: true }))
const toTuple = collection => (fp.isArray(collection) ? collection : [])

const createValidateFunction = ({ untilFail, messageFuncs }) => {
  const getLabel = fp.getOr('value', 'alias')
  const getParent = fp.get('parent')

  const makeFullPathGetter = (context) => {
    const fullpath = []

    if (!fp.isObject(context)) {
      return () => []
    }

    const cicularRefs = new Set()
    let currentContext = context

    do {
      fullpath.push(currentContext.key)
      cicularRefs.add(currentContext)
      currentContext = getParent(currentContext)
    } while (!(currentContext == null || cicularRefs.has(currentContext)))

    return () => fp.reverse(fullpath)
  }

  const formatValidationOutput = (specOutput, customMessages) => {
    if (specOutput == null) {
      return null
    }

    const validationResults = []
    const defaultMessageFunc = messageFuncs[ERROR_KEYS.ANY.UNKNOWN]

    for (let { result, value, context } of specOutput) {
      const [name, args] = toTuple(result)
      const messageFn = fp.get(name, customMessages) ||
        messageFuncs[name] ||
        defaultMessageFunc

      const path = makeFullPathGetter(context)

      validationResults.push({
        message: messageFn({
          label: getLabel(context),
          value,
          get path() { return path() },
          args,
        }),
        value,
        get path() { return path() },
        args,
      })
    }

    return validationResults.length > 0 ? validationResults : null
  }

  return [
    (specFn, value) => {
      const specOutput = specFn(value, { untilFail })
      return formatValidationOutput(specOutput)
    },
    (specFn, options, value) => {
      const customMessages = fp.get('customMessages', options)
      const specOutput = specFn(value, { untilFail })
      return formatValidationOutput(specOutput, customMessages)
    },
  ]
}

const [validate, validateWithOpts] = createValidateFunction({
  messageFuncs: ERROR_MESSAGES,
  untilFail: true,
})
const [validateAll, validateAllWithOpts] = createValidateFunction({
  messageFuncs: ERROR_MESSAGES,
  untilFail: false,
})

export default {
  /**
   * Curried function tells whether value is valid
   * @function isValid
   * @static
   * 
   * @arg {function} specFn - generated spec function by: {@link module:ego~spec.flow|flow},
   * {@link module:ego~spec.of|of} or
   * {@link module:ego~spec.compose|compose}
   * @arg {any} value - value to check
   * 
   * @returns {boolean} True if value is valid, othervise false
   * 
   * @example
   * 
   * import { isValid, spec, validators } from 'egoist-js'
   * 
   * const { string, any } = validators
   * 
   * const usernameSpec = spec.flow(string.isString, string.isNotEmpty, any.required)
   * console.log(isValid(usernameSpec, 'hello')) // true
   * 
   * const isValidUsernameFn = isValid(usernameSpec)
   * console.log(isValidUsernameFn('nope')) // true
   * console.log(isValidUsernameFn(undefined)) // false
   * console.log(isValidUsernameFn(null)) // false
   * console.log(isValidUsernameFn('')) // false
   * 
   */
  isValid: fp.curry(isValid),
  /**
   * Curried function tells whether value is invalid
   * @function isInvalid
   * @static
   * 
   * @arg {function} specFn - generated spec function by: {@link module:ego~spec.flow|flow},
   * {@link module:ego~spec.of|of} or
   * {@link module:ego~spec.compose|compose}
   * @arg {any} value - value to check
   * 
   * @returns {boolean} True if value is invalid, othervise false
   * 
   * @example
   * 
   * import { isInvalid, spec, validators } from 'egoist-js'
   * 
   * const { string, any } = validators
   * 
   * const usernameSpec = spec.flow(string.isString, string.isNotEmpty, any.required)
   * console.log(isInvalid(usernameSpec, 'hello')) // false
   * 
   * const isInvalidUsernameFn = isInvalid(usernameSpec)
   * console.log(isInvalidUsernameFn('nope')) // false
   * console.log(isInvalidUsernameFn(undefined)) // true
   * console.log(isInvalidUsernameFn(null)) // true
   * console.log(isInvalidUsernameFn('')) // true
   * 
   */
  isInvalid: fp.curry(isInvalid),
  /**
   * Curried function returns validation info if data has errors
   * @function validate
   * @static
   * 
   * @arg {function} specFn - generated spec function by: {@link module:ego~spec.flow|flow},
   * {@link module:ego~spec.of|of} or
   * {@link module:ego~spec.compose|compose}
   * @arg {any} value - value to check
   * 
   * @returns {Object[]|Null} Null if data is valid, otherwise one item array with reason of error
   * 
   * @example
   * 
   * import { validate, spec, validators } from 'egoist-js'
   * 
   * const { shape, number, string, any } = validators
   * 
   * const usernameSpec = spec.flow(string.isString, string.isNotEmpty, any.required)
   * console.log(validate(usernameSpec, 'hello')) // null
   * 
   * const validateUsername = validate(usernameSpec)
   * 
   * console.log(validateUsername(null)) 
   * // [{
   * //  message: 'value is required', 
   * //  value: null, 
   * //  args: undefined, 
   * //  path: [] // path is computed property
   * // }]
   * 
   * 
   * const adultUserModelSpec = spec.compose(
   *  spec.flow(
   *   shape.isShape,
   *   shape.hasKeys('name', 'age'),
   *   any.required,
   *  ),
   *  spec.of({
   *   name: spec.flow(string.isString, string.isNotEmpty, any.required),
   *   age: spec.flow(number.isNumber, number.ge(18), any.required),
   *  })
   * )
   * 
   * const validateAdultUser = validate(adultUserModelSpec)
   * 
   * const validationResult = validateAdultUser({
   *  name: 'Oliver Darkside',
   *  age: 17,
   * })
   * 
   * console.log(validationResult) 
   * // [{ message: 'age should be greater or equal than 18', value: 17, args: 18, path: ['age'] }]
   * 
   */
  validate: fp.curry(validate),
  /**
   * Curried function with opts, returns validation info if data has errors
   * @function validateWithOpts
   * @static
   * 
   * @arg {function} specFn - generated spec function by: {@link module:ego~spec.flow|flow},
   * {@link module:ego~spec.of|of} or
   * {@link module:ego~spec.compose|compose}
   * @arg {Object} opts - options object
   * @arg {Object} opts.customMessages - overrides validation messages for standart library
   * @arg {any} value - value to check
   * 
   * @returns {Object[]|Null} Null if data is valid, otherwise one item array with reason of error
   * 
   * @example
   * 
   * import { validateWithOpts, spec, validators, ERROR_KEYS } from 'egoist-js'
   * 
   * const { shape, number, string, any } = validators
   * 
   * const adultUserModelSpec = spec.of({
   *   name: spec.flow(string.isString, string.isNotEmpty, any.required),
   *   age: spec.flow(number.isNumber, number.ge(18), any.required),
   *   address: spec.of({
   *    city: spec.flow(string.isString, any.required),
   *    street: spec.flow(string.isString, any.required),
   *   })
   * })
   * 
   * const validateAdultUser = validateWithOpts(adultUserModelSpec, {
   *   customMessages: {
   *     [ERROR_KEYS.NUMBER.GE]: ({ label, path, value, args }) => 
   *        `${label} can not contain [${value}], because expects something greater or equal than ${args}`
   *   },
   * })
   * 
   * const reasons = validateAdultUser({
   *  name: 'Alice Morgan',
   *  age: 17,
   *  address: {
   *    city: 'London',
   *    street: 'Fitsrovia st.'
   *  }
   * })
   * 
   * console.log(reasons) 
   * // [{
   * //   message: 'age can not contain [17], because expects something greater or equal than 18',
   * //   args: 18,
   * //   value: 17,
   * //   path: ['age'],
   * // }]
   * 
   */
  validateWithOpts: fp.curry(validateWithOpts),
  /**
   * Curried function returns info about all errors if data has them
   * @function validateAll
   * @static
   * 
   * @arg {function} specFn - generated spec function by: {@link module:ego~spec.flow|flow},
   * {@link module:ego~spec.of|of} or
   * {@link module:ego~spec.compose|compose}
   * @arg {any} value - value to check
   * 
   * @returns {Object[]|Null} Null if data is valid, otherwise array with all reasons of error
   * 
   * @example
   * 
   * import { validateAll, spec, validators } from 'egoist-js'
   * 
   * const { shape, number, string, any } = validators
   * 
   * const simpleSpec = spec.flow(
   *  string.isString,
   *  string.isDigits,
   *  string.isNotEmpty,
   *  any.required
   * )
   * 
   * console.log(validateAll(simpleSpec, 'hello'))
   * // [
   * //   { message: 'value should be a string', value: 'hello', args: undefined, path: [] },
   * //   { message: 'value should contain only digits', value: 'hello', args: undefined, path: [] },
   * // ]
   */
  validateAll: fp.curry(validateAll),
  /**
   * Curried function with opts, returns info about all errors if data has them
   * @function validateAllWithOpts
   * @static
   * 
   * @arg {function} specFn - generated spec function by: {@link module:ego~spec.flow|flow},
   * {@link module:ego~spec.of|of} or
   * {@link module:ego~spec.compose|compose}
   * @arg {Object} opts - options object
   * @arg {Object} opts.customMessages - overrides validation messages for standart library
   * @arg {any} value - value to check
   * 
   * @returns {Object[]|Null} Null if data is valid, otherwise one item array with reason of error
   * 
   * @example
   * 
   * import { validateWithOpts, spec, validators, ERROR_KEYS } from 'egoist-js'
   * 
   * const { shape, number, string, any } = validators
   * 
   * const simpleSpec = spec.flow(
   *  string.isString,
   *  string.isDigits,
   *  string.isNotEmpty,
   *  any.required
   * )
   * 
   * const extValidateAll = validateAll(simpleSpec, {
   *  customMessages: {
   *   [ERROR_KEYS.STRING.TYPE]: ({ label, value, args, path }) => 'yeah, yeah, yeah ${label} should be a string',
   *  },
   * })
   * 
   * console.log(extValidateAll(simpleSpec, 'hello'))
   * // [
   * //   { message: 'yeah, yeah, yeah value should be a string', value: 'hello', args: undefined, path: [] },
   * //   { message: 'value should contain only digits', value: 'hello', args: undefined, path: [] },
   * // ]
   */
  validateAllWithOpts: fp.curry(validateAllWithOpts),
  /**
   * Function helps to create your own validation functions and define your own validation messages
   * @function createValidateFunction
   * @static
   * 
   * @arg {Object} opts - object with `customMessages`, pls look at the example below
   * @arg {boolean} opts.untilFail - tells validation functions when to stop,
   * if true check validators until first fail, else check all of them
   * @arg {Object<string, function>} opts.messageFuncs - object with {@link module:ego~ERROR_KEYS|error keys} and {@link module:ego~ERROR_MESSAGES|error message function}
   *
   * @returns {function[]} tuple with two functions e.g: [validate, validateWithOpts]
   *
   * @example
   * 
   * import {
   *  spec,
   *  createValidateFunction,
   *  toValidator,
   *  toValidatorWithArgs,
   *  ERROR_KEYS,
   *  ERROR_MESSAGES,
   * } from 'egoist-js'
   * 
   * const customeErrorKey = 'my.custom.error.key'
   * 
   * const customMessageFunc = {
   *   ...ERROR_MESSAGES,
   *   [ERROR_KEYS.ANY.REQUIRED]: ({ label, args, value, path }) => `${label} is mandatory`,
   *   [customeErrorKey]: ({ label, args, value, path }) => `${label} bla bla bla`,
   * }
   * 
   * const [cvalidate, cvalidateWithOpts] = createValidateFunction({
   *  untilFail: true,
   *  messageFuncs: customMessageFunc,
   * })
   * 
   *
   * const [cvalidateAll, cvalidateAllWithOpts] = createValidateFunction({
   *  untilFail: true,
   *  messageFuncs: customMessageFunc,
   * })
   * 
   * const customValidator = toValidator(customeErrorKey, (value) => Boolean(value))
   * 
   * console.log(cvalidate(spec.flow(customValidator), 0))
   * // [{ messsge: 'value bla bla bla', value: 0, args: undefined, path: [] }]
   *
   */
  createValidateFunction,
}
