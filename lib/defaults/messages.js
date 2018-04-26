import ERROR_KEYS from './keys'

const {
  ANY,
  NUMBER,
  STRING,
  BOOLEAN,
  SHAPE,
} = ERROR_KEYS

const MESSAGES = Object.freeze({
  [ANY.UNKNOWN]: ({ label }) => `${label} contains errors`,
  [ANY.REQUIRED]: ({ label }) => `${label} is required`,

  [NUMBER.TYPE]: ({ label }) => `${label} should be a number`,
  [NUMBER.GT]: ({ label, args }) => `${label} should be greater than ${args}`,
  [NUMBER.LT]: ({ label, args }) => `${label} should be less than ${args}`,
  [NUMBER.GTE]: ({ label, args }) => `${label} should be greater than or equal ${args}`,
  [NUMBER.LTE]: ({ label, args }) => `${label} should be less than or equal ${args}`,
  [NUMBER.RANGE]: ({ label, args: [min, max] }) => `${label} should be less than ${max} and greater or equal ${min}`,

  [STRING.EMPTY]: ({ label }) => `${label} should not be blank`,
  [STRING.TYPE]: ({ label }) => `${label} should be a string`,
  [STRING.MATCH]: ({ label, args }) => `${label} should match the pattern ${args}`,
  [STRING.EMAIL]: ({ label }) => `${label} should be a valid email address`,

  [BOOLEAN.TYPE]: ({ label }) => `${label} should be a boolean`,

  [SHAPE.TYPE]: ({ label }) => `${label} should be an object`,
  [SHAPE.ALLOWED_KEYS]: ({ label, args }) => `${label} should contain only allowed keys: ${args.join(', ')}`,
  [SHAPE.EXPECTED_KEYS]: ({ label, args }) => `${label} should has keys: ${args.join(', ')}`,
  [SHAPE.FORBIDDEN_KEYS]: ({ label, args }) => `${label} contains forbidden keys: ${args.join(', ')}`,
})

export default MESSAGES
