import { freeze } from '../utils'

const ERROR_KEYS = freeze({
  ANY: {
    UNKNOWN: 'any.unknown',
    REQUIRED: 'any.required',
    ALLOW: 'any.allow',
  },

  NUMBER: {
    TYPE: 'number.type',
    GE: 'number.ge',
    GT: 'number.gt',
    LE: 'number.le',
    LT: 'number.lt',
    RANGE: 'number.range',
  },

  STRING: {
    EMPTY: 'string.empty',
    TYPE: 'string.type',
    EMAIL: 'string.email',
    MATCH: 'string.match',
    DIGITS: 'string.digits',
    ALPHANUM: 'string.alphanum',
    ISO_DATE: 'string.iso.date',
  },

  BOOLEAN: {
    TYPE: 'boolean.type',
  },

  SHAPE: {
    TYPE: 'shape.type',
    ALLOWED_KEYS: 'shape.allowed.keys',
    FORBIDDEN_KEYS: 'shape.forbidden.keys',
    EXPECTED_KEYS: 'shape.expected.keys',
  },

  ARRAY: {
    TYPE: 'array.type',
    MIN_LENGTH: 'array.min.length',
    MAX_LENGTH: 'array.max.length',
    IN_RANGE: 'array.range',
    LENGTH: 'array.exact.length',
    EVERY: 'array.every',
    SOME: 'array.some',
  },
})

export default ERROR_KEYS
