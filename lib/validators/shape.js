import fp from 'lodash/fp'

import ERROR_KEYS from '../defaults/keys'
import { toValidator, toValidatorWithArgs } from '../utils'

const toSet = keys => new Set(keys)
const toKeySet = fp.flow(fp.keys, toSet)

const isShape = toValidator(ERROR_KEYS.SHAPE.TYPE, fp.isObject)

const allowedKeys = toValidatorWithArgs(ERROR_KEYS.SHAPE.ALLOWED_KEYS, fp.overArgs(
	(allowedKeysSet, existingKeys) => existingKeys.every(key => allowedKeysSet.has(key)),
	[toSet, fp.keys],
))

const forbiddenKeys = toValidatorWithArgs(ERROR_KEYS.SHAPE.FORBIDDEN_KEYS, fp.overArgs(
	(forbiddenKeys, existingKeySet) => !forbiddenKeys.some(key => existingKeySet.has(key)),
	[fp.identity, toKeySet]
))

const expectKeys = toValidatorWithArgs(ERROR_KEYS.SHAPE.EXPECTED_KEYS, fp.overArgs(
	(expectedKeys, existingKeysSet) =>
		expectedKeys.length === existingKeysSet.size &&
		expectedKeys.every(key => existingKeysSet.has(key)),
	[fp.identity, toKeySet]
))

export { isShape, allowedKeys, forbiddenKeys, expectKeys }
