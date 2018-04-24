import fp from 'lodash/fp'
import ERROR_KEYS from '../defaults/keys'
import { toValidator } from '../utils'

const isBoolean = toValidator(ERROR_KEYS.BOOLEAN.TYPE, fp.isBoolean)

export { isBoolean }
