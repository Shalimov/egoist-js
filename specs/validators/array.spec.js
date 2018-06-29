import should from 'should'
import fp from '../../lib/like.lodash'

import { isArray, minLength, maxLength, inRange, length, every, some } from '../../lib/validators/array'
import ERROR_KEYS from '../../lib/defaults/keys'

describe('Validators Module Array Spec', () => {
	it('should return one item tuple with key if value is not an array, otherwise null', () => {
		should(isArray([])).be.Null()
		should(isArray([1, 2, 3, 4])).be.Null()
		should(isArray(undefined)).be.Null()
		should(isArray(null)).be.Null()

		should(isArray({})).be.eql([ERROR_KEYS.ARRAY.TYPE])
		should(isArray(1)).be.eql([ERROR_KEYS.ARRAY.TYPE])
		should(isArray('')).be.eql([ERROR_KEYS.ARRAY.TYPE])
		should(isArray(true)).be.eql([ERROR_KEYS.ARRAY.TYPE])
		should(isArray(false)).be.eql([ERROR_KEYS.ARRAY.TYPE])
		should(isArray(NaN)).be.eql([ERROR_KEYS.ARRAY.TYPE])
		should(isArray(() => { })).be.eql([ERROR_KEYS.ARRAY.TYPE])
		should(isArray(/regex/)).be.eql([ERROR_KEYS.ARRAY.TYPE])
	})

	it('should return tuple with key and min accepted length if value has invalid length, otherwise null', () => {
		const mlength5 = minLength(5)

		should(mlength5(null)).be.Null()
		should(mlength5(undefined)).be.Null()
		should(mlength5([1, 2, 3, 4, 5])).be.Null()
		should(mlength5([1, 2, 3, 4, 5, 6])).be.Null()

		should(mlength5([1, 2, 3, 4])).be.eql([ERROR_KEYS.ARRAY.MIN_LENGTH, 5])
		should(mlength5([])).be.eql([ERROR_KEYS.ARRAY.MIN_LENGTH, 5])
	})

	it('should return tuple with key and max accepted length if value has invalid length, otherwise null', () => {
		const mxLength5 = maxLength(5)

		should(mxLength5(null)).be.Null()
		should(mxLength5(undefined)).be.Null()
		should(mxLength5([])).be.Null()
		should(mxLength5([1, 2, 3, 4])).be.Null()
		should(mxLength5([1, 2, 3, 4, 5])).be.Null()

		should(mxLength5([1, 2, 3, 4, 5, 6])).be.eql([ERROR_KEYS.ARRAY.MAX_LENGTH, 5])
	})


	it('should return tuple with key and exact length if value has invalid length, otherwise null', () => {
		const exLength5 = length(5)

		should(exLength5(null)).be.Null()
		should(exLength5(undefined)).be.Null()
		should(exLength5([1, 2, 3, 4, 5])).be.Null()

		should(exLength5([])).be.eql([ERROR_KEYS.ARRAY.LENGTH, 5])
		should(exLength5([1, 2, 3, 4])).be.eql([ERROR_KEYS.ARRAY.LENGTH, 5])
		should(exLength5([1, 2, 3, 4, 5, 6])).be.eql([ERROR_KEYS.ARRAY.LENGTH, 5])
	})

	it('should return tuple with key and range if value has length outside of range, otherwise null', () => {
		const rangeBorders = [2, 4]
		const between2and4 = inRange(rangeBorders)

		should(between2and4(null)).be.Null()
		should(between2and4(undefined)).be.Null()
		should(between2and4([1, 2])).be.Null()
		should(between2and4([1, 2, 3])).be.Null()
		should(between2and4([1, 2, 3, 4])).be.Null()

		should(between2and4([])).be.eql([ERROR_KEYS.ARRAY.IN_RANGE, rangeBorders])
		should(between2and4([1])).be.eql([ERROR_KEYS.ARRAY.IN_RANGE, rangeBorders])
		should(between2and4([1, 2, 3, 4, 5])).be.eql([ERROR_KEYS.ARRAY.IN_RANGE, rangeBorders])
	})

	it('should return tuple with key and predicate if value items follow the predicate rule', () => {
		const isNumbersArray = every(fp.isNumber)

		should(isNumbersArray(null)).be.Null()
		should(isNumbersArray(undefined)).be.Null()
		should(isNumbersArray([])).be.Null()
		should(isNumbersArray([1, 2])).be.Null()
		should(isNumbersArray([1, 2, 3])).be.Null()
		should(isNumbersArray([1, 2, 3, 4])).be.Null()

		should(isNumbersArray([true, false])).be.eql([ERROR_KEYS.ARRAY.EVERY, fp.isNumber])
		should(isNumbersArray([1, 2, 3, {}])).be.eql([ERROR_KEYS.ARRAY.EVERY, fp.isNumber])
		should(isNumbersArray([1, 2, 3, 'false'])).be.eql([ERROR_KEYS.ARRAY.EVERY, fp.isNumber])
	})


	it('should return tuple with key and range if value has length outside of range, otherwise null', () => {
		const getAdminFlag = fp.get('isAdmin')
		const userHasAdminPermissions = some(getAdminFlag)

		should(userHasAdminPermissions(null)).be.Null()
		should(userHasAdminPermissions(undefined)).be.Null()
		should(userHasAdminPermissions([{ isAdmin: false }, { isAdmin: true }])).be.Null()

		should(userHasAdminPermissions([{ isAdmin: false }, { isAdmin: false }])).be.eql([ERROR_KEYS.ARRAY.SOME, getAdminFlag])
	})
})
