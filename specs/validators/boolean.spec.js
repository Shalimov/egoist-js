import should from 'should'

import { isBoolean, isFalsy, isTruthy } from '../../lib/validators/boolean'
import ERROR_KEYS from '../../lib/defaults/keys'

describe('Validators Module Boolean Spec', () => {
	it('should return one item tuple with key if value is not a boolean, otherwise null', () => {
		isBoolean(NaN).should.be.eql([ERROR_KEYS.BOOLEAN.TYPE])
		isBoolean(0).should.be.eql([ERROR_KEYS.BOOLEAN.TYPE])
		isBoolean({}).should.be.eql([ERROR_KEYS.BOOLEAN.TYPE])
		isBoolean([]).should.be.eql([ERROR_KEYS.BOOLEAN.TYPE])
		isBoolean('').should.be.eql([ERROR_KEYS.BOOLEAN.TYPE])
		isBoolean('test').should.be.eql([ERROR_KEYS.BOOLEAN.TYPE])

		should(isBoolean(false)).be.Null()
		should(isBoolean(true)).be.Null()
		should(isBoolean(undefined)).be.Null()
		should(isBoolean(null)).be.Null()
	})

	it('should return one item tuple with key if value is not the truth, otherwise null', () => {
		isTruthy(NaN).should.be.eql([ERROR_KEYS.BOOLEAN.TRUTHY])
		isTruthy(0).should.be.eql([ERROR_KEYS.BOOLEAN.TRUTHY])
		isTruthy('').should.be.eql([ERROR_KEYS.BOOLEAN.TRUTHY])
		isTruthy(false).should.be.eql([ERROR_KEYS.BOOLEAN.TRUTHY])
		isTruthy(undefined).should.be.eql([ERROR_KEYS.BOOLEAN.TRUTHY])
		isTruthy(null).should.be.eql([ERROR_KEYS.BOOLEAN.TRUTHY])

		should(isTruthy(1)).be.Null()
		should(isTruthy([])).be.Null()
	})

	it('should return one item tuple with key if value is not a falsy, otherwise null', () => {
		isFalsy(1).should.be.eql([ERROR_KEYS.BOOLEAN.FALSY])
		isFalsy([]).should.be.eql([ERROR_KEYS.BOOLEAN.FALSY])
		isFalsy('123').should.be.eql([ERROR_KEYS.BOOLEAN.FALSY])
		isFalsy(true).should.be.eql([ERROR_KEYS.BOOLEAN.FALSY])

		should(isFalsy(false)).be.Null()
		should(isFalsy(0)).be.Null()
		should(isFalsy('')).be.Null()
		should(isFalsy(null)).be.Null()
		should(isFalsy(undefined)).be.Null()
		should(isFalsy(NaN)).be.Null()
	})
})
