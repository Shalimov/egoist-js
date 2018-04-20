import fp from 'lodash/fp'

export default {
  flow: (...validators) => (value, options) => {
    const results = []
    const {
      context,
      untilFail,
    } = fp.assign({
      context: null,
      untilFail: false,
    }, options)

    for (let i = 0, l = validators.length; i < l; i += 1) {
      const validator = validators[i]
      const result = validator(value, { context })

      if (fp.isString(result)) {
        results.push({
          result,
          value,
          context,
        })
      }

      if (untilFail && results.length > 0) {
        return results
      }
    }

    return fp.isEmpty(results) ? null : results
  },

  of: shape => (value, options) => {
    const results = []
    const { context, untilFail } = fp.assign({
      context: null,
      untilFail: false,
    }, options)

    const kvPairs = fp.entries(shape)

    for (let i = 0, l = kvPairs.length; i < l; i += 1) {
      const [key, spec] = kvPairs[i]
      const result = spec(fp.get(key, value), {
        context: {
          key,
          current: value,
          parent: context,
        },
        untilFail,
      })

      if (fp.isArray(result)) {
        results.push(...result)
      }

      if (untilFail && results.length > 0) {
        return results
      }
    }

    return fp.isEmpty(results) ? null : results
  },
}
