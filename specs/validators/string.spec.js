import should from 'should'

import {
	isString,
	isNotEmpty,
	isEmail,
	match,
	isAlphanum,
	isDigits,
	isISODate,
} from '../../lib/validators/string'
import ERROR_KEYS from '../../lib/defaults/keys'

describe('Validators Module String Spec', () => {
	it('should return one item tuple with key if value is not a string, otherwise null', () => {
		isString(NaN).should.be.eql([ERROR_KEYS.STRING.TYPE])
		isString(0).should.be.eql([ERROR_KEYS.STRING.TYPE])
		isString({}).should.be.eql([ERROR_KEYS.STRING.TYPE])
		isString([]).should.be.eql([ERROR_KEYS.STRING.TYPE])
		isString(false).should.be.eql([ERROR_KEYS.STRING.TYPE])
		isString(true).should.be.eql([ERROR_KEYS.STRING.TYPE])

		should(isString(undefined)).be.Null()
		should(isString(null)).be.Null()
		should(isString('Test')).be.Null()
		should(isString('')).be.Null()
	})

	it('should return one item tuple with key if value has an error, otherwise null', () => {
		isNotEmpty('').should.be.eql([ERROR_KEYS.STRING.EMPTY])

		should(isNotEmpty(undefined)).be.Null()
		should(isNotEmpty(null)).be.Null()
		should(isNotEmpty('Test')).be.Null()
	})

	it('should return a tuple with key and regex pattern if value has an error, otherwise null', () => {
		const pattern = /^[a-zA-Z\s]+$/
		const username = match(pattern)

		should(username('James Budron')).be.Null()
		should(username('James')).be.Null()
		should(username(undefined)).be.Null()
		should(username(null)).be.Null()

		username('Test 123').should.be.eql([ERROR_KEYS.STRING.MATCH, pattern])
	})

	it('should return a tuple with key if value is an invalid email address, otherwise null', () => {
		should(isEmail('hello@world.com')).be.Null()
		should(isEmail('he@wo.by')).be.Null()
		should(isEmail(undefined)).be.Null()
		should(isEmail(null)).be.Null()

		isEmail('shalimich@mail').should.be.eql([ERROR_KEYS.STRING.EMAIL])
		isEmail('shalimich@mail.').should.be.eql([ERROR_KEYS.STRING.EMAIL])
		isEmail('@mail.com').should.be.eql([ERROR_KEYS.STRING.EMAIL])
		isEmail('www.com.com').should.be.eql([ERROR_KEYS.STRING.EMAIL])
	})

	it('should return a tuple with key if value is not a digit line, otherwise null', () => {
		should(isDigits('0')).be.Null()
		should(isDigits('10')).be.Null()
		should(isDigits('999')).be.Null()
		should(isDigits('9999')).be.Null()
		should(isDigits('10101')).be.Null()
		should(isDigits(undefined)).be.Null()
		should(isDigits(null)).be.Null()

		isDigits('01@10').should.be.eql([ERROR_KEYS.STRING.DIGITS])
		isDigits('shalimich').should.be.eql([ERROR_KEYS.STRING.DIGITS])
		isDigits('0@mail0').should.be.eql([ERROR_KEYS.STRING.DIGITS])
		isDigits('101010-10201').should.be.eql([ERROR_KEYS.STRING.DIGITS])
	})

	// Here we have a blind spots but believe in regex (shallow examination)
	it('should return a tuple with key if value is non-alphanumeric, otherwise null', () => {
		should(isAlphanum('0')).be.Null()
		should(isAlphanum('10')).be.Null()
		should(isAlphanum('a999b')).be.Null()
		should(isAlphanum('a999B')).be.Null()
		should(isAlphanum('a9CDE9B')).be.Null()
		should(isAlphanum('010ABCDE')).be.Null()
		should(isAlphanum('10101')).be.Null()
		should(isAlphanum(undefined)).be.Null()
		should(isAlphanum(null)).be.Null()

		isAlphanum('01@10').should.be.eql([ERROR_KEYS.STRING.ALPHANUM])
		isAlphanum('0@mail0').should.be.eql([ERROR_KEYS.STRING.ALPHANUM])
		isAlphanum('10-1010-10201').should.be.eql([ERROR_KEYS.STRING.ALPHANUM])
		isAlphanum('10.1010.10201').should.be.eql([ERROR_KEYS.STRING.ALPHANUM])
	})

	it('should return a tuple with key if value is non-alphanumeric, otherwise null', () => {
		should(isISODate(new Date().toISOString())).be.Null()
		should(isISODate(undefined)).be.Null()
		should(isISODate(null)).be.Null()

		should(isISODate(new Date().toString())).be.eql([ERROR_KEYS.STRING.ISO_DATE])
		isISODate('01@10').should.be.eql([ERROR_KEYS.STRING.ISO_DATE])
		isISODate('0@mail0').should.be.eql([ERROR_KEYS.STRING.ISO_DATE])
		isISODate('10-1010-10201').should.be.eql([ERROR_KEYS.STRING.ISO_DATE])
		isISODate('10.1010.10201').should.be.eql([ERROR_KEYS.STRING.ISO_DATE])
	})
})
