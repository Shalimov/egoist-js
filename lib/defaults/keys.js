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
  },

  STRING: {
    EMPTY: 'string.empty',
    TYPE: 'string.type',
    MATCH: 'string.match',
  },

  BOOLEAN: {
    TYPE: 'boolean.type',
  },
})

export default ERROR_KEYS
