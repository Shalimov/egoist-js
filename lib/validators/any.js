import ERROR_KEYS from '../defaults/keys'

const required = (
	value => value === null || value === undefined ?
		ERROR_KEYS.ANY.ERROR_KEYS :
		null
)

export { required }
