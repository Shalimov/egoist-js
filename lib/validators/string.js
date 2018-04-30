import fp from '../lodash.imports'

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

const match = toValidatorWithArgs(ERROR_KEYS.STRING.MATCH, (pattern, value) => pattern.test(value))

export {
	match,
	isString,
	isNotEmpty,
	isEmail,
	isDigits,
	isAlphanum,
	isISODate,
}
