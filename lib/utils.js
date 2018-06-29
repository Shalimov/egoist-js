import fp from './like.lodash'

const toValidator = (name, isValidFn) =>
  (value, params) => {
    if (value === null || value === undefined) {
      return null
    }

    return isValidFn(value, params) !== true ? [name] : null
  }

const toValidatorWithArgs = (name, isValidFn) => (args) => (value, params) => {
  if (value === null || value === undefined) {
    return null
  }

  return isValidFn(args, value, params) !== true ? [name, args] : null
}

const freeze = (shape) => {
  const resultShape = {}
  const entries = fp.entries(shape)

  entries.forEach(([key, value]) => {
    if (fp.isObject(value)) {
      resultShape[key] = Object.freeze(freeze(value))
    } else {
      resultShape[key] = value
    }
  })

  return Object.freeze(resultShape)
}

export {
  toValidatorWithArgs,
  toValidator,
  freeze,
}
