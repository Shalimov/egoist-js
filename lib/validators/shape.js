import fp from 'lodash/fp'
import ERROR_KEYS from '../defaults/keys'
import { toValidator, toValidatorWithArgs } from '../utils'

const isShape = toValidator(ERROR_KEYS.SHAPE.TYPE, fp.isObject)

const allowedKeys = toValidatorWithArgs(ERROR_KEYS.SHAPE.ALLOWED_KEYS, fp.flow(
	// fp.overArgs(
	// 	(diffAllowedKeys, receivedKeys) => diffAllowedKeys(receivedKeys),
	// 	[fp.xor, fp.keys]
	// ),
	// fp.isEmpty
))

const hasKeys = toValidatorWithArgs(ERROR_KEYS.SHAPE.HAS_KEYS, fp.flow(

	// fp.isEmpty
))

export { isShape, allowedKeys, hasKeys }
