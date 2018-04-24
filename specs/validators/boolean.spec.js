import should from 'should'

import { isBoolean } from '../../lib/validators/boolean'
import ERROR_KEYS from '../../lib/defaults/keys'

describe('Spec Number validators', () => {
	it('should return one item tuple with key if value is not a boolean, otherwise return null', () => {
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
})
