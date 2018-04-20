import ERROR_KEYS from '../defaults/keys'
import { toValidator } from '../utils'

const isString = toValidator(ERROR_KEYS.STRING.TYPE, value => typeof value === 'string')
const isEmpty = toValidator(ERROR_KEYS.STRING.TYPE, value => value !== '')

export { isString, isEmpty }
