import ERROR_KEYS from '../../lib/defaults/keys'
import ERROR_MESSAGES from '../../lib/defaults/messages'

describe('Messages Module Spec', () => {
  const label = 'Superfield'
  const MSG = ERROR_MESSAGES

  it('should return proper messages for ANY keys', () => {
    ERROR_KEYS.ANY.UNKNOWN.should.be.eql('any.unknown')
    ERROR_KEYS.ANY.REQUIRED.should.be.eql('any.required')
    ERROR_KEYS.ANY.ALLOW.should.be.eql('any.allow')

    MSG[ERROR_KEYS.ANY.UNKNOWN]({ label }).should.be.eql(`${label} contains errors`)
    MSG[ERROR_KEYS.ANY.REQUIRED]({ label }).should.be.eql(`${label} is required`)
    MSG[ERROR_KEYS.ANY.ALLOW]({ label, args: [1, 2, 3] }).should.be.eql(`${label} should be one of allowed values: 1, 2, 3`)
  })

  it('should return proper messages for NUMBER keys', () => {
    ERROR_KEYS.NUMBER.TYPE.should.be.eql('number.type')
    ERROR_KEYS.NUMBER.GT.should.be.eql('number.gt')
    ERROR_KEYS.NUMBER.LT.should.be.eql('number.lt')
    ERROR_KEYS.NUMBER.GE.should.be.eql('number.ge')
    ERROR_KEYS.NUMBER.LE.should.be.eql('number.le')
    ERROR_KEYS.NUMBER.RANGE.should.be.eql('number.range')

    MSG[ERROR_KEYS.NUMBER.TYPE]({ label }).should.be.eql(`${label} should be a number`)
    MSG[ERROR_KEYS.NUMBER.GT]({ label, args: 5 }).should.be.eql(`${label} should be greater than 5`)
    MSG[ERROR_KEYS.NUMBER.LT]({ label, args: 5 }).should.be.eql(`${label} should be less than 5`)
    MSG[ERROR_KEYS.NUMBER.LE]({ label, args: 5 }).should.be.eql(`${label} should be less than or equal to 5`)
    MSG[ERROR_KEYS.NUMBER.GE]({ label, args: 5 }).should.be.eql(`${label} should be greater than or equal to 5`)
    MSG[ERROR_KEYS.NUMBER.RANGE]({ label, args: [5, 10] }).should.be.eql(`${label} should be less than 10 and greater than or equal to 5`)
  })

  it('should return proper messages for STRING keys', () => {
    MSG[ERROR_KEYS.STRING.TYPE]({ label }).should.be.eql(`${label} should be a string`)
    MSG[ERROR_KEYS.STRING.EMPTY]({ label }).should.be.eql(`${label} should not be blank`)
    MSG[ERROR_KEYS.STRING.MATCH]({ label, args: /[a-zA-Z]/ }).should.be.eql(`${label} should match the pattern /[a-zA-Z]/`)

    MSG[ERROR_KEYS.STRING.MIN_LENGTH]({ label, args: 5 }).should.be.eql(`${label} should have at least 5 characters`)
    MSG[ERROR_KEYS.STRING.MAX_LENGTH]({ label, args: 5 }).should.be.eql(`${label} should have at most 5 characters`)
    MSG[ERROR_KEYS.STRING.LENGTH]({ label, args: 5 }).should.be.eql(`${label} should have only 5 characters`)

    MSG[ERROR_KEYS.STRING.EMAIL]({ label }).should.be.eql(`${label} should be a valid email address`)
    MSG[ERROR_KEYS.STRING.DIGITS]({ label }).should.be.eql(`${label} should contain only digits`)
    MSG[ERROR_KEYS.STRING.ALPHANUM]({ label }).should.be.eql(`${label} should contain only alphanumeric characters`)
    MSG[ERROR_KEYS.STRING.ISO_DATE]({ label }).should.be.eql(`${label} should be an ISO Date`)
  })

  it('should return proper messages for BOOLEAN keys', () => {
    MSG[ERROR_KEYS.BOOLEAN.TYPE]({ label }).should.be.eql(`${label} should be a boolean`)
    MSG[ERROR_KEYS.BOOLEAN.TRUTHY]({ label }).should.be.eql(`${label} should be true`)
    MSG[ERROR_KEYS.BOOLEAN.FALSY]({ label }).should.be.eql(`${label} should be false`)
  })

  it('should return proper messages for SHAPE keys', () => {
    MSG[ERROR_KEYS.SHAPE.TYPE]({ label }).should.be.eql(`${label} should be an object`)
    
    MSG[ERROR_KEYS.SHAPE.ALLOWED_KEYS]({
      label,
      value: { z: 0, x: 0 },
      args: ['a', 'b', 'c'],
    }).should.be.eql(`${label} contains: z, x, but should contain only keys: a, b, c`)
    
    MSG[ERROR_KEYS.SHAPE.EXPECTED_KEYS]({
      label,
      value: { z: 0, x: 0 },
      args: ['a', 'b', 'c'],
    }).should.be.eql(`${label} contains: z, x, but should have keys: a, b, c`)

    MSG[ERROR_KEYS.SHAPE.FORBIDDEN_KEYS]({
      label,
      value: { a: 0, b: 0 },
      args: ['a', 'b', 'c'],
    }).should.be.eql(`${label} contains forbidden keys: a, b, c`)
  })

  it('should return proper messages for ARRAY keys', () => {
    MSG[ERROR_KEYS.ARRAY.TYPE]({ label }).should.be.eql(`${label} should be an array`)
    MSG[ERROR_KEYS.ARRAY.LENGTH]({ label, args: 5 }).should.be.eql(`${label} should have 5 items`)
    MSG[ERROR_KEYS.ARRAY.MIN_LENGTH]({ label, args: 5 }).should.be.eql(`${label} should have at least 5 items`)
    MSG[ERROR_KEYS.ARRAY.MAX_LENGTH]({ label, args: 5 }).should.be.eql(`${label} should have at most 5 items`)
    MSG[ERROR_KEYS.ARRAY.IN_RANGE]({ label, args: [5, 10] }).should.be.eql(`${label} should have length between 5 and 10`)
    MSG[ERROR_KEYS.ARRAY.SOME]({ label }).should.be.eql(`${label} should have at least one item that follows the rule`)
    MSG[ERROR_KEYS.ARRAY.EVERY]({ label }).should.be.eql(`${label} items should follow the rule`)
  })
})
