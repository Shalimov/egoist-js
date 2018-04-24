import should from 'should'

import { lt, lte, gt, gte, isNumber } from '../../lib/validators/number'
import ERROR_KEYS from '../../lib/defaults/keys'

describe('Spec Number validators', () => {
	it('should return one item tuple with key if value is not a number, otherwise return null', () => {
		isNumber('').should.be.eql([ERROR_KEYS.NUMBER.TYPE])
		isNumber({}).should.be.eql([ERROR_KEYS.NUMBER.TYPE])
		isNumber([]).should.be.eql([ERROR_KEYS.NUMBER.TYPE])
		isNumber(false).should.be.eql([ERROR_KEYS.NUMBER.TYPE])
		isNumber(true).should.be.eql([ERROR_KEYS.NUMBER.TYPE])

		should(isNumber(undefined)).be.Null()
		should(isNumber(null)).be.Null()
		should(isNumber(0)).be.Null()
	})

	it('should return tuple with key and args if value greater then variable, otherwise return null', () => {
		const lowerThen10 = lt(10)

		should(isNumber(null)).be.Null()
		should(isNumber(undefined)).be.Null()
		should(lowerThen10(9)).be.Null()

		lowerThen10(10).should.be.eql([ERROR_KEYS.NUMBER.LT, [10]])
		lowerThen10(15).should.be.eql([ERROR_KEYS.NUMBER.LT, [10]])
	})


	it('should return tuple with key and args if value less then variable, otherwise return null', () => {
		const greaterThen10 = gt(10)

		should(isNumber(null)).be.Null()
		should(isNumber(undefined)).be.Null()
		should(greaterThen10(15)).be.Null()

		greaterThen10(10).should.be.eql([ERROR_KEYS.NUMBER.GT, [10]])
		greaterThen10(5).should.be.eql([ERROR_KEYS.NUMBER.GT, [10]])
	})


	it('should return tuple with key and args if value strict greater then variable, otherwise return null', () => {
		const lowerEqual10 = lte(10)

		should(isNumber(null)).be.Null()
		should(isNumber(undefined)).be.Null()
		should(lowerEqual10(9)).be.Null()
		should(lowerEqual10(10)).be.Null()

		lowerEqual10(11).should.be.eql([ERROR_KEYS.NUMBER.LTE, [10]])
		lowerEqual10(15).should.be.eql([ERROR_KEYS.NUMBER.LTE, [10]])
	})


	it('should return tuple with key and args if value strict less then variable, otherwise return null', () => {
		const greaterEqual10 = gte(10)

		should(isNumber(null)).be.Null()
		should(isNumber(undefined)).be.Null()
		should(greaterEqual10(10)).be.Null()
		should(greaterEqual10(15)).be.Null()

		greaterEqual10(9).should.be.eql([ERROR_KEYS.NUMBER.GTE, [10]])
		greaterEqual10(5).should.be.eql([ERROR_KEYS.NUMBER.GTE, [10]])
	})
})
