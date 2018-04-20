import ERROR_KEYS from '../defaults/keys'
import { toValidator } from '../utils'

const lessThen = (min) => toValidator(ERROR_KEYS.NUMBER.MIN, value => {
	if (value === null || value === undefined) {
		return false
	}

	return value < min
})

const greaterThen = (min) => toValidator(ERROR_KEYS.NUMBER.MIN, value => {
	if (value === null || value === undefined) {
		return false
	}

	return value < min
})

const isNumber = (min) => toValidator(ERROR_KEYS.NUMBER.MIN, value => {
	if (value === null || value === undefined) {
		return false
	}

	return value < min
})

export {
	lessThen,
	greaterThen,
	isNumber,
}
