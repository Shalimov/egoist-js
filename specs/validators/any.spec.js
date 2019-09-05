import should from 'should'

import { required, allow } from '../../lib/validators/any'
import ERROR_KEYS from '../../lib/defaults/keys'

describe('Validators Module ANY Spec', () => {
  it('should return one item tuple with key if value has an error, otherwise null', () => {
    should(required('hello')).be.Null()
    should(required('')).be.Null()
    should(required(0)).be.Null()
    should(required(false)).be.Null()
    should(required(NaN)).be.Null()

    required(null).should.be.eql([ERROR_KEYS.ANY.REQUIRED])
    required(undefined).should.be.eql([ERROR_KEYS.ANY.REQUIRED])
  })

  it('should return tuple with key and allowed values if value has an error, otherwise null', () => {
    const helloWorldAllowed = allow(['hello', 'world'])
    const oneToFiveAllowed = allow([1, 2, 3, 4, 5])

    should(helloWorldAllowed('hello')).be.Null()
    should(helloWorldAllowed('world')).be.Null()
    should(helloWorldAllowed('not hello')).be.eql([ERROR_KEYS.ANY.ALLOW, ['hello', 'world']])
    should(helloWorldAllowed('not world')).be.eql([ERROR_KEYS.ANY.ALLOW, ['hello', 'world']])

    should(oneToFiveAllowed(1)).be.Null()
    should(oneToFiveAllowed(2)).be.Null()
    should(oneToFiveAllowed(3)).be.Null()
    should(oneToFiveAllowed(4)).be.Null()
    should(oneToFiveAllowed(5)).be.Null()

    should(oneToFiveAllowed(0)).be.eql([ERROR_KEYS.ANY.ALLOW, [1, 2, 3, 4, 5]])
    should(oneToFiveAllowed(6)).be.eql([ERROR_KEYS.ANY.ALLOW, [1, 2, 3, 4, 5]])
  })
})
