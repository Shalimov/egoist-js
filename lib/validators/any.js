import ERROR_KEYS from '../defaults/keys'

const required = value => (value === null || value === undefined ?
	[ERROR_KEYS.ANY.REQUIRED] :
	null
)

export { required }
