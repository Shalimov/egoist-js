import should from 'should'

import { isShape, allowedKeys, expectKeys, forbiddenKeys } from '../../lib/validators/shape'
import ERROR_KEYS from '../../lib/defaults/keys'

describe('Validators Module Shape Spec', () => {
	it('should return one item tuple with key if value is not a shape, otherwise null', () => {
		isShape(NaN).should.be.eql([ERROR_KEYS.SHAPE.TYPE])
		isShape(0).should.be.eql([ERROR_KEYS.SHAPE.TYPE])
		isShape('').should.be.eql([ERROR_KEYS.SHAPE.TYPE])
		isShape('test').should.be.eql([ERROR_KEYS.SHAPE.TYPE])

		should(isShape({})).be.Null()
		should(isShape([])).be.Null()
		should(isShape(undefined)).be.Null()
		should(isShape(null)).be.Null()
	})

	it('should return tuple with key and allowed keys if value has forbidden keys, otherwise null', () => {
		const allowedKeysArray = ['username', 'friends']
		const shapeShouldHasOnly = allowedKeys(allowedKeysArray)

		should(shapeShouldHasOnly({
			username: null,
			friends: null,
		})).be.Null()

		should(shapeShouldHasOnly({
			username: null,
		})).be.Null()

		should(shapeShouldHasOnly({
			friends: null,
		})).be.Null()

		shapeShouldHasOnly({
			friends: null,
			dull: true,
		}).should.be.eql([ERROR_KEYS.SHAPE.ALLOWED_KEYS, allowedKeysArray])

		shapeShouldHasOnly({
			username: null,
			dull: true,
		}).should.be.eql([ERROR_KEYS.SHAPE.ALLOWED_KEYS, allowedKeysArray])

		shapeShouldHasOnly({
			username: null,
			friends: null,
			dull: true,
		}).should.be.eql([ERROR_KEYS.SHAPE.ALLOWED_KEYS, allowedKeysArray])
	})

	it('should return tuple with key and forbidden keys if value has forbidden keys, otherwise null', () => {
		const forbiddenKeysArray = ['username', 'friends']
		const forbiddenKeysFn = forbiddenKeys(forbiddenKeysArray)

		should(forbiddenKeysFn({})).be.Null()
		should(forbiddenKeysFn({ dull: 1 })).be.Null()
		should(forbiddenKeysFn(null)).be.Null()
		should(forbiddenKeysFn(undefined)).be.Null()

		forbiddenKeysFn({
			friends: null,
			dull: true,
		}).should.be.eql([ERROR_KEYS.SHAPE.FORBIDDEN_KEYS, forbiddenKeysArray])

		forbiddenKeysFn({
			username: null,
			dull: true,
		}).should.be.eql([ERROR_KEYS.SHAPE.FORBIDDEN_KEYS, forbiddenKeysArray])

		forbiddenKeysFn({
			username: null,
			friends: null,
			dull: true,
		}).should.be.eql([ERROR_KEYS.SHAPE.FORBIDDEN_KEYS, forbiddenKeysArray])
	})

	it('should return tuple with key and expected keys if value has other keys in, otherwise null', () => {
		const expectedKeysArray = ['username', 'friends']
		const expectedKeysFn = expectKeys(expectedKeysArray)

		should(expectedKeysFn(null)).be.Null()
		should(expectedKeysFn(undefined)).be.Null()
		should(expectedKeysFn({ username: 'Piter', friends: [] })).be.Null()

		expectedKeysFn({
			friends: null,
		}).should.be.eql([ERROR_KEYS.SHAPE.EXPECTED_KEYS, expectedKeysArray])

		expectedKeysFn({
			username: null,
		}).should.be.eql([ERROR_KEYS.SHAPE.EXPECTED_KEYS, expectedKeysArray])

		expectedKeysFn({
			username: null,
			friends: null,
			dull: true,
		}).should.be.eql([ERROR_KEYS.SHAPE.EXPECTED_KEYS, expectedKeysArray])
	})
})
