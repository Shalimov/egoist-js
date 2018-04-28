import should from 'should'

import { lt, le, gt, ge, inRange, isNumber } from '../../lib/validators/number'
import ERROR_KEYS from '../../lib/defaults/keys'

describe('Validators Module Number Spec', () => {
	it('should return one item tuple with key if value is not a number, otherwise null', () => {
		isNumber('').should.be.eql([ERROR_KEYS.NUMBER.TYPE])
		isNumber({}).should.be.eql([ERROR_KEYS.NUMBER.TYPE])
		isNumber([]).should.be.eql([ERROR_KEYS.NUMBER.TYPE])
		isNumber(false).should.be.eql([ERROR_KEYS.NUMBER.TYPE])
		isNumber(true).should.be.eql([ERROR_KEYS.NUMBER.TYPE])

		should(isNumber(undefined)).be.Null()
		should(isNumber(null)).be.Null()
		should(isNumber(0)).be.Null()
	})

	it('should return tuple with key and args if value greater then variable, otherwise null', () => {
		const lowerThen10 = lt(10)

		should(lowerThen10(null)).be.Null()
		should(lowerThen10(undefined)).be.Null()
		should(lowerThen10(9)).be.Null()

		lowerThen10(10).should.be.eql([ERROR_KEYS.NUMBER.LT, 10])
		lowerThen10(15).should.be.eql([ERROR_KEYS.NUMBER.LT, 10])
	})


	it('should return tuple with key and args if value less then variable, otherwise null', () => {
		const greaterThen10 = gt(10)

		should(greaterThen10(null)).be.Null()
		should(greaterThen10(undefined)).be.Null()
		should(greaterThen10(15)).be.Null()

		greaterThen10(10).should.be.eql([ERROR_KEYS.NUMBER.GT, 10])
		greaterThen10(5).should.be.eql([ERROR_KEYS.NUMBER.GT, 10])
	})


	it('should return tuple with key and args if value strict greater then variable, otherwise null', () => {
		const lowerEqual10 = le(10)

		should(lowerEqual10(null)).be.Null()
		should(lowerEqual10(undefined)).be.Null()
		should(lowerEqual10(9)).be.Null()
		should(lowerEqual10(10)).be.Null()

		lowerEqual10(11).should.be.eql([ERROR_KEYS.NUMBER.LE, 10])
		lowerEqual10(15).should.be.eql([ERROR_KEYS.NUMBER.LE, 10])
	})


	it('should return tuple with key and args if value strict less then variable, otherwise null', () => {
		const greaterEqual10 = ge(10)

		should(greaterEqual10(null)).be.Null()
		should(greaterEqual10(undefined)).be.Null()
		should(greaterEqual10(10)).be.Null()
		should(greaterEqual10(15)).be.Null()

		greaterEqual10(9).should.be.eql([ERROR_KEYS.NUMBER.GE, 10])
		greaterEqual10(5).should.be.eql([ERROR_KEYS.NUMBER.GE, 10])
	})

	it('should return tuple with key and args if value outside of range, otherwise null', () => {
		const inRange10to20 = inRange([10, 20])

		should(inRange10to20(null)).be.Null()
		should(inRange10to20(undefined)).be.Null()
		should(inRange10to20(10)).be.Null()
		should(inRange10to20(19)).be.Null()

		inRange10to20(8).should.be.eql([ERROR_KEYS.NUMBER.RANGE, [10, 20]])
		inRange10to20(9).should.be.eql([ERROR_KEYS.NUMBER.RANGE, [10, 20]])
		inRange10to20(20).should.be.eql([ERROR_KEYS.NUMBER.RANGE, [10, 20]])
		inRange10to20(21).should.be.eql([ERROR_KEYS.NUMBER.RANGE, [10, 20]])
	})
})
