import ERROR_KEYS from './keys'

const {
  ANY,
  NUMBER,
  STRING,
  BOOLEAN,
} = ERROR_KEYS

const MESSAGES = Object.freeze({
  [ANY.UNKNOWN]: ({ label }) => `${label} field contains errors`,
  [ANY.REQUIRED]: ({ label }) => `${label} is required`,

  [NUMBER.TYPE]: ({ label }) => `${label} should be a number`,
  [NUMBER.GT]: ({ label, args }) => `${label} should be greater then ${args}`,
  [NUMBER.LT]: ({ label, args }) => `${label} should be less then ${args}`,
  [NUMBER.GTE]: ({ label, args }) => `${label} should be greater then or equal ${args}`,
  [NUMBER.LTE]: ({ label, args }) => `${label} should be less then or equal ${args}`,
  [NUMBER.RANGE]: ({ label, args: [min, max] }) => `${label} should be less then ${max} and greater or equal ${min}`,

  [STRING.EMPTY]: ({ label }) => `${label} should not be blank`,
  [STRING.TYPE]: ({ label }) => `${label} should be a string`,
  [STRING.MATCH]: ({ label, args }) => `${label} should match the pattern ${args}`,
  [STRING.EMAIL]: ({ label }) => `${label} should be a valid email address`,

  [BOOLEAN.TYPE]: ({ label }) => `${label} should be a boolean`,
})

export default MESSAGES
