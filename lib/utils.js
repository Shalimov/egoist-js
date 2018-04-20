import fp from 'lodash/fp'

const toValidator = (name, isValidFn) =>
  (value, params) => {
    if (value === null || value === undefined) {
      return false
    }

    return isValidFn(value, params) === true ? name : null
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
  toValidator,
  freeze,
}
