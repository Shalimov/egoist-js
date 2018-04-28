import ERROR_KEYS from './keys'

const {
  ANY,
  NUMBER,
  STRING,
  BOOLEAN,
  SHAPE,
  ARRAY,
} = ERROR_KEYS

const MESSAGES = Object.freeze({
  [ANY.UNKNOWN]: ({ label }) => `${label} contains errors`,
  [ANY.REQUIRED]: ({ label }) => `${label} is required`,
  [ANY.ALLOW]: ({ label, args }) => `${label} should be one of allowed values ${args}`,

  [NUMBER.TYPE]: ({ label }) => `${label} should be a number`,
  [NUMBER.GT]: ({ label, args }) => `${label} should be greater than ${args}`,
  [NUMBER.LT]: ({ label, args }) => `${label} should be less than ${args}`,
  [NUMBER.GE]: ({ label, args }) => `${label} should be greater than or equal ${args}`,
  [NUMBER.LE]: ({ label, args }) => `${label} should be less than or equal ${args}`,
  [NUMBER.RANGE]: ({ label, args: [min, max] }) => `${label} should be less than ${max} and greater or equal ${min}`,

  [STRING.EMPTY]: ({ label }) => `${label} should not be blank`,
  [STRING.TYPE]: ({ label }) => `${label} should be a string`,
  [STRING.MATCH]: ({ label, args }) => `${label} should match the pattern ${args}`,
  [STRING.EMAIL]: ({ label }) => `${label} should be a valid email address`,
  [STRING.DIGITS]: ({ label }) => `${label} should contain only digits`,
  [STRING.ALPHANUM]: ({ label }) => `${label} should contain only alphanumeric characters`,
  [STRING.ISO_DATE]: ({ label }) => `${label} should be an ISO Date`,

  [BOOLEAN.TYPE]: ({ label }) => `${label} should be a boolean`,

  [SHAPE.TYPE]: ({ label }) => `${label} should be an object`,
  [SHAPE.ALLOWED_KEYS]: ({ label, args }) => `${label} should contain only allowed keys: ${args.join(', ')}`,
  [SHAPE.EXPECTED_KEYS]: ({ label, args }) => `${label} should has keys: ${args.join(', ')}`,
  [SHAPE.FORBIDDEN_KEYS]: ({ label, args }) => `${label} contains forbidden keys: ${args.join(', ')}`,

  [ARRAY.TYPE]: ({ label }) => `${label} should be an array`,
  [ARRAY.LENGTH]: ({ label, args }) => `${label} should have ${args}`,
  [ARRAY.MIN_LENGTH]: ({ label, args }) => `${label} should have at least ${args} items`,
  [ARRAY.MAX_LENGTH]: ({ label, args }) => `${label} should have at most ${args} items`,
  [ARRAY.IN_RANGE]: ({ label, args: [min, max] }) => `${label} should have length between ${min} and ${max}`,
  [ARRAY.SOME]: ({ label }) => `${label} should have at least one item that follows the rule`,
  [ARRAY.EVERY]: ({ label }) => `${label} items should follow the rule`,
})

export default MESSAGES
