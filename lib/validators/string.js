import fp from 'lodash/fp'
import ERROR_KEYS from '../defaults/keys'
import { toValidator } from '../utils'

const isString = toValidator(ERROR_KEYS.STRING.TYPE, fp.isString)
const isNotEmpty = toValidator(ERROR_KEYS.STRING.EMPTY, value => value !== '')

export { isString, isNotEmpty }
