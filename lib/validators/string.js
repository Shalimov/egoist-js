import fp from 'lodash/fp'
import ERROR_KEYS from '../defaults/keys'
import { toValidator, toValidatorWithArgs } from '../utils'

const isString = toValidator(ERROR_KEYS.STRING.TYPE, fp.isString)
const isNotEmpty = toValidator(ERROR_KEYS.STRING.EMPTY, value => value !== '')
const match = toValidatorWithArgs(ERROR_KEYS.STRING.MATCH, (pattern, value) => pattern.test(value))

export { isString, isNotEmpty, match }
