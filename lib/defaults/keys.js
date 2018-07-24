/** @module ego */
/** @namespace module:ego~ERROR_KEYS */
import { freeze } from '../utils'

const ERROR_KEYS = freeze({
  /**
   * @memberof module:ego~ERROR_KEYS
   * 
   * @example
   * ANY: {
   *  UNKNOWN: 'any.unknown',
   *  REQUIRED: 'any.required',
   *  ALLOW: 'any.allow',
   * }
   */
  ANY: {
    UNKNOWN: 'any.unknown',
    REQUIRED: 'any.required',
    ALLOW: 'any.allow',
  },
  /**
   * @memberof module:ego~ERROR_KEYS
   * 
   * @example
   * 
   * NUMBER: {
   *  TYPE: 'number.type',
   *  GE: 'number.ge',
   *  GT: 'number.gt',
   *  LE: 'number.le',
   *  LT: 'number.lt',
   *  RANGE: 'number.range',
   * }
   * 
   */
  NUMBER: {
    TYPE: 'number.type',
    GE: 'number.ge',
    GT: 'number.gt',
    LE: 'number.le',
    LT: 'number.lt',
    RANGE: 'number.range',
  },
  /**
   * @memberof module:ego~ERROR_KEYS
   * 
   * @example
   * 
   * STRING: {
   *  EMPTY: 'string.empty',
   *  TYPE: 'string.type',
   *  EMAIL: 'string.email',
   *  MATCH: 'string.match',
   *  MIN_LENGTH: 'string.min.length',
   *  MAX_LENGTH: 'string.max.length',
   *  LENGTH: 'string.exact.length',
   *  DIGITS: 'string.digits',
   *  ALPHANUM: 'string.alphanum',
   *  ISO_DATE: 'string.iso.date',
   * }
   * 
   */
  STRING: {
    EMPTY: 'string.empty',
    TYPE: 'string.type',
    EMAIL: 'string.email',
    MATCH: 'string.match',
    MIN_LENGTH: 'string.min.length',
    MAX_LENGTH: 'string.max.length',
    LENGTH: 'string.exact.length',
    DIGITS: 'string.digits',
    ALPHANUM: 'string.alphanum',
    ISO_DATE: 'string.iso.date',
  },
  /**
   * @memberof module:ego~ERROR_KEYS
   * 
   * @example
   * 
   * BOOLEAN: {
   *  TYPE: 'boolean.type',
   * }
   * 
   */
  BOOLEAN: {
    TYPE: 'boolean.type',
  },
  /**
   * @memberof module:ego~ERROR_KEYS
   * 
   * @example
   * 
   * SHAPE: {
   *  TYPE: 'shape.type',
   *  ALLOWED_KEYS: 'shape.allowed.keys',
   *  FORBIDDEN_KEYS: 'shape.forbidden.keys',
   *  EXPECTED_KEYS: 'shape.expected.keys',
   * }
   * 
   */
  SHAPE: {
    TYPE: 'shape.type',
    ALLOWED_KEYS: 'shape.allowed.keys',
    FORBIDDEN_KEYS: 'shape.forbidden.keys',
    EXPECTED_KEYS: 'shape.expected.keys',
  },
  /**
   * @memberof module:ego~ERROR_KEYS
   * 
   * @example
   * 
   * ARRAY: {
   *  TYPE: 'array.type',
   *  MIN_LENGTH: 'array.min.length',
   *  MAX_LENGTH: 'array.max.length',
   *  IN_RANGE: 'array.range',
   *  LENGTH: 'array.exact.length',
   *  EVERY: 'array.every',
   *  SOME: 'array.some',
   * }
   * 
   */
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
