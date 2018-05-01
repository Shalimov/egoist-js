/** @module ego */
/** @namespace module:ego */
import fp from './lodash.imports'

import ERROR_KEYS from './defaults/keys'
import ERROR_MESSAGES from './defaults/messages'

const isValid = (specFn, value) => fp.isEmpty(specFn(value, { untilFail: true }))
const isInvalid = (specFn, value) => !fp.isEmpty(specFn(value, { untilFail: true }))
const toTuple = collection => (fp.isArray(collection) ? collection : [])

const createValidateFunction = ({ untilFail, messageFuncs }) => {
  const getLabel = fp.getOr('value', 'key')
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
   * 
   * @arg {function} specFn - generated data spec {@link specification.flow|flow},
   * {@link specification.of|of},
   * {@link specification.compose|compose}
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
   * 
   * @arg {function} specFn - generated data spec {@link specification.flow|flow},
   * {@link specification.of|of},
   * {@link specification.compose|compose}
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
   * 
   * @arg {function} specFn - generated data spec {@link specification.flow|flow},
   * {@link specification.of|of},
   * {@link specification.compose|compose}
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
   * // [{ message: '', value: 17, args: 18, path: ['age'] }]
   * 
   */
  validate: fp.curry(validate),
  validateWithOpts: fp.curry(validateWithOpts),
  validateAll: fp.curry(validateAll),
  validateAllWithOpts: fp.curry(validateAllWithOpts),
  createValidateFunction,
}
