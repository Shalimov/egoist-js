const baseToString = Object.prototype.toString

// slice(8, -1) goes from skip '[object' and takes only constructor name bypassing closing square bracket
export const getInternalCtor = value => baseToString.call(value).slice(8, -1)
export const flow = (...fncs) => value => fncs.reduce((result, fn) => fn(result), value)
export const curry = (fn) => {
  const currierX = (...xargs) => {
    const currierY = (...yargs) => {
      const fullArgs = [...xargs, ...yargs]

      if (fn.length <= fullArgs.length) {
        return fn(...fullArgs)
      }

      return currierX(...fullArgs)
    }

    if (fn.length <= xargs.length) {
      return fn(...xargs)
    }

    return currierY
  }

  return currierX
}

export const isType = curry((type, value) => getInternalCtor(value) === type)
export const isNumber = isType('Number')
export const isDate = isType('Date')
export const isBoolean = isType('Boolean')
export const isString = isType('String')
export const isFunction = isType('Function')
export const isObject = value => (typeof value === 'object' && value !== null)
export const isArray = value => Array.isArray(value)
export const isEmpty = (value) => {
  if (value == null) {
    return true
  }

  return Object.keys(value).length === 0
}

export const identity = v => v
export const every = curry((predicate, value) => {
  if (isArray(value)) {
    return Array.prototype.every.call(value, predicate)
  }

  return true
})

export const some = curry((predicate, value) => {
  if (isArray(value)) {
    return Array.prototype.some.call(value, predicate)
  }

  return true
})

export const has = (prop, value) => Object.prototype.hasOwnProperty.call(value, prop)
export const reverse = value => Array.prototype.reverse.call(value)
export const assign = (a, b) => Object.assign(a, b)
export const keys = value => Object.keys(value)
export const entries = value => Object.entries(value)
export const stubTrue = () => true
export const includes = (value, args) => Array.prototype.includes.call(args, value)
export const cond = rules => (value) => {
  for (let [predicate, action] of rules) {
    if (predicate(value)) {
      return action(value)
    }
  }
}

export const get = curry((path, value) => {
  if (value == null) {
    return undefined
  }

  if (has(path, value)) {
    return value[path]
  }

  let stage = value
  const pathParts = path.split('.')

  for (let part of pathParts) {
    if (isObject(stage)) {
      stage = stage[part]
      continue
    }

    return undefined
  }

  return stage
})

export const getOr = (defValue, path) => (value) => {
  const result = get(path, value)
  return result === undefined ? defValue : result
}

export const overArgs = (transform, fnsFlow) => (...args) => {
  const results = []

  for (let i = 0, l = args.length; i < l; i += 1) {
    const fn = fnsFlow[i] || identity
    results.push(fn(args[i]))
  }

  return transform(...results)
}

export default {
  flow,
  curry,
  assign,
  cond,
  entries,
  every,
  some,
  get,
  getOr,
  identity,
  includes,
  keys,
  overArgs,
  reverse,
  stubTrue,
  isEmpty,
  isArray,
  isNumber,
  isBoolean,
  isObject,
  isString,
  isFunction,
}
