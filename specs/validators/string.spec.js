import should from 'should'

import { isString, isNotEmpty, isEmail, match } from '../../lib/validators/string'
import ERROR_KEYS from '../../lib/defaults/keys'

describe('Validators Module String Spec', () => {
	it('should return one item tuple with key if value is not a string, otherwise return null', () => {
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

	it('should return one item tuple with key if value has an error, otherwise return null', () => {
		isNotEmpty('').should.be.eql([ERROR_KEYS.STRING.EMPTY])

		should(isNotEmpty(undefined)).be.Null()
		should(isNotEmpty(null)).be.Null()
		should(isNotEmpty('Test')).be.Null()
	})

	it('should return a tuple with key and regex pattern if value has an error, otherwise return null', () => {
		const pattern = /^[a-zA-Z\s]+$/
		const username = match(pattern)

		should(username('James Budron')).be.Null()
		should(username('James')).be.Null()
		should(username(undefined)).be.Null()
		should(username(null)).be.Null()

		username('Test 123').should.be.eql([ERROR_KEYS.STRING.MATCH, pattern])
	})

	it('should return a tuple with key if value is not an email addres, otherwise return null', () => {

		should(isEmail('hello@world.com')).be.Null()
		should(isEmail('he@wo.by')).be.Null()
		should(isEmail(undefined)).be.Null()
		should(isEmail(null)).be.Null()

		isEmail('shalimich@mail').should.be.eql([ERROR_KEYS.STRING.EMAIL])
		isEmail('shalimich@mail.').should.be.eql([ERROR_KEYS.STRING.EMAIL])
		isEmail('@mail.com').should.be.eql([ERROR_KEYS.STRING.EMAIL])
		isEmail('www.com.com').should.be.eql([ERROR_KEYS.STRING.EMAIL])
	})
})
