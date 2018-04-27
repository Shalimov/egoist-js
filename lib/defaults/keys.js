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
})

export default ERROR_KEYS
