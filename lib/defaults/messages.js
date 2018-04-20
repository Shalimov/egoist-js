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
  [NUMBER.MIN]: ({ label, args }) => `${label} should be greater then ${args}`,
  [NUMBER.MAX]: ({ label, args }) => `${label} should be less then ${args}`,

  [STRING.EMPTY]: ({ label }) => `${label} should not be blank`,
  [STRING.TYPE]: ({ label }) => `${label} should be a string`,

  [BOOLEAN.TYPE]: ({ label }) => `${label} should be a boolean`,
})

export default MESSAGES
