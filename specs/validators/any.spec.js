import should from 'should'

import { required } from '../../lib/validators/any'
import ERROR_KEYS from '../../lib/defaults/keys'

describe('Validators Module ANY Spec', () => {
	it('should return one item tuple with key if value has an error, otherwise return null', () => {
		should(required('hello')).be.Null()
		should(required('')).be.Null()
		should(required(0)).be.Null()
		should(required(false)).be.Null()
		should(required(NaN)).be.Null()

		required(null).should.be.eql([ERROR_KEYS.ANY.REQUIRED])
		required(undefined).should.be.eql([ERROR_KEYS.ANY.REQUIRED])
	})
})
