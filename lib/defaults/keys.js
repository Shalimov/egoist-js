import { freeze } from '../utils'

const ERROR_KEYS = freeze({
  ANY: {
    UNKNOWN: 'any.unknown',
    REQUIRED: 'any.required',
  },

  NUMBER: {
    TYPE: 'number.type',
    MIN: 'number.min',
    MAX: 'number.max',
  },

  STRING: {
    EMPTY: 'string.empty',
    TYPE: 'string.type',
  },

  BOOLEAN: {
    TYPE: 'boolean.type',
  },
})

export default ERROR_KEYS
