import fp from 'lodash/fp'

import ERROR_KEYS from '../defaults/keys'
import { toValidator, toValidatorWithArgs } from '../utils'

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const isString = toValidator(ERROR_KEYS.STRING.TYPE, fp.isString)
const isNotEmpty = toValidator(ERROR_KEYS.STRING.EMPTY, value => value !== '')
const isEmail = toValidator(ERROR_KEYS.STRING.EMAIL, value => EMAIL_PATTERN.test(value))

const match = toValidatorWithArgs(ERROR_KEYS.STRING.MATCH, (pattern, value) => pattern.test(value))

export { isString, isNotEmpty, match, isEmail }
