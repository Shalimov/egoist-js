import { freeze } from '../utils'

const ERROR_KEYS = freeze({
  ANY: {
    UNKNOWN: 'any.unknown',
    REQUIRED: 'any.required',
  },

  NUMBER: {
    TYPE: 'number.type',
    GTE: 'number.gte',
    GT: 'number.gt',
    LTE: 'number.lte',
    LT: 'number.lt',
    RANGE: 'number.range',
  },

  STRING: {
    EMPTY: 'string.empty',
    TYPE: 'string.type',
    EMAIL: 'string.email',
    MATCH: 'string.match',
  },

  BOOLEAN: {
    TYPE: 'boolean.type',
  },

  SHAPE: {
    TYPE: 'shape.type',
    ALLOWED_KEYS: 'shape.allowed.keys',
    HAS_KEYS: 'shape.has.keys',
  },
})

export default ERROR_KEYS
