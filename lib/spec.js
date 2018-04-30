import fp from './lodash.imports'

const SPEC_FN_SYMBOL = Symbol('spec-fn-symbol')

const nullOrCollection = fp.cond([
  [fp.isEmpty, () => null],
  [fp.stubTrue, fp.identity],
])

const isSpec = spec => Boolean(spec[SPEC_FN_SYMBOL])
const asSpec = (specFn) => {
  specFn[SPEC_FN_SYMBOL] = true
  return Object.freeze(specFn)
}

export default {
  lazy: (getSpecLazy) => {
    if (!fp.isFunction(getSpecLazy)) {
      throw new Error('lazy accepts only function as an argument')
    }

    return { lazy: getSpecLazy }
  },

  // todo: support specs inside
  flow: (...validators) => asSpec((value, options) => {
    const results = []
    const { context, untilFail } = fp.assign({
      context: null,
      untilFail: false,
    }, options)

    for (let i = 0, l = validators.length; i < l; i += 1) {
      const validator = validators[i]
      const result = validator(value, { context })

      if (fp.isArray(result)) {
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

    return nullOrCollection(results)
  }),

  compose: (...specs) => {
    if (!specs.every(isSpec)) {
      throw new Error('compose args should be the specs')
    }

    return asSpec((value, options) => {
      const results = []
      const extOptions = fp.assign({
        context: null,
        untilFail: false,
      }, options)

      for (let i = 0, l = specs.length; i < l; i += 1) {
        const spec = specs[i]
        const result = spec(value, extOptions)

        if (fp.isArray(result)) {
          results.push(...result)
        }

        if (extOptions.untilFail && results.length > 0) {
          return results
        }
      }

      return nullOrCollection(results)
    })
  },

  // TODO: mb use template method to support diff forms of spec generators
  of: specDescriptor => {
    if (fp.isArray(specDescriptor)) {
      // spec generator for arrays aka collections
      return asSpec((collection, options) => {
        const results = []
        const { context, untilFail } = fp.assign({
          context: null,
          untilFail: false,
        }, options)

        const [spec] = specDescriptor
        const specFn = spec.lazy ? spec.lazy() : spec

        if (!fp.isArray(collection)) {
          return null
        }

        for (let i = 0, l = collection.length; i < l; i += 1) {
          const value = collection[i]

          const result = specFn(value, {
            context: {
              key: i,
              current: collection,
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

        return nullOrCollection(results)
      })
    }

    // spec generator for objects aka shapes
    return asSpec((value, options) => {
      const results = []
      const { context, untilFail } = fp.assign({
        context: null,
        untilFail: false,
      }, options)

      const kvPairs = fp.entries(specDescriptor)

      for (let i = 0, l = kvPairs.length; i < l; i += 1) {
        const [key, spec] = kvPairs[i]
        const specFn = spec.lazy ? spec.lazy() : spec

        const result = specFn(fp.get(key, value), {
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

      return nullOrCollection(results)
    })
  },
}
