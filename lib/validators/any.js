import fp from '../lodash.imports'

import ERROR_KEYS from '../defaults/keys'
import { toValidatorWithArgs } from '../utils'

const required = value => (value === null || value === undefined ?
	[ERROR_KEYS.ANY.REQUIRED] :
	null
)

const allow = toValidatorWithArgs(ERROR_KEYS.ANY.ALLOW, (args, value) => fp.includes(value, args))

export { required, allow }
