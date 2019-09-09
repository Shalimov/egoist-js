/** @module ego */
/** @namespace module:ego~spec */
import fp from './like.lodash'
import { Context } from './context'

const SPEC_FN_SYMBOL = Symbol('spec-fn-symbol')

const LazySpec = class {
  constructor(lazy) {
    this.lazy = lazy
  }
  
  static isLazy(value) {
    return value instanceof LazySpec
  }
}

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
  /**
   * Usage of function makes sense only if u have spec flow outside of object context
   * or collection context and want to rename output label for validation message
   * @function designate
   * @memberof module:ego~spec
   * 
   * @arg {string} key - key to use instead of 'value' for label to output validation message
   * @arg {function} spec - Accpets spec function
   * 
   * @returns {function} - Spec function which could be used as argument for lib functions
   * 
   * @example
   * 
   * import { spec } from 'egoist-js'
   * 
   * const asUserSpec = spec.designate('user')
   * 
   * const userModelSpec = spec.compose(
   *   asUserSpec(spec.flow(required)),
   *   spec.of({
   *     username: spec.flow(isNotEmpty, required),
   *     friends: spec.of([spec.lazy(() => userModelSpec)]),
   *   })
   * )
   * 
   * const result = validate(null, { untilFail: true })
   * // [{ message: 'user is required', value: null, args: undefined, path: [] }]
   * 
   */
  designate: fp.curry((alias, spec) => asSpec((value, options = {}) => {
    const refinedOpts = {
      ...options,
      context: Context.from({
        ...options.context,
        alias,
      }),
    }

    return spec(value, refinedOpts)
  })),
  /**
   * Function is used to create a lazy evaluate specification item
   * @function lazy
   * @memberof module:ego~spec
   * 
   * @arg {function} getSpecLazy - Expected spec function to be passed 
   * 
   * @returns {LazySpec} - Object which could be used as argument for #compose, #of functions
   * 
   * @example
   *    
   * import { spec } from 'egoist-js'
   * 
   * const userModelSpec = spec.of({
   *  username: spec.flow(string.isNotEmpty, any.required),
   *  bestFriend: spec.lazy(() => userModelSpec), // returns lazy evaluated spec function
   * })
   * 
   */
  lazy: (getSpecLazy) => {
    if (!fp.isFunction(getSpecLazy)) {
      throw new Error('lazy expects function as an argument')
    }

    return new LazySpec(getSpecLazy)
  },

  /**
   * Function is used to create validation flow
   * @function flow
   * @memberof module:ego~spec
   * 
   * @arg {function[]} ...validators - Accepts validation functions as list of arguments
   * 
   * @returns {function} - Spec function which could be used as argument
   * 
   * @example
   * 
   * import { spec } from 'egoist-js'
   * 
   * const usernameSpec = spec.flow(
   *  string.isString,
   *  string.match(/^[A-Z][a-z]+\s[A-Z][a-z]+$/)
   *  string.isNotMatch,
   *  any.required
   * )
   * 
   */
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

  /**
   * Function is used to create a composition between specification functions
   * @function compose
   * @memberof module:ego~spec
   * 
   * @arg {function[]} ...specs - Accpets spec functions as list of arguments
   * 
   * @returns {function} - Spec function which could be used as argument
   * 
   * @example
   * 
   * import { spec } from 'egoist-js'
   * 
   * const userModelBodySpec = spec.of({
   *  username: spec.flow(string.isNotEmpty, any.required),
   *  bestFriend: spec.lazy(() => userModelBodySpec),
   * })
   * 
   * const userModelRequiredSpec = spec.flow(any.requied)
   * 
   * const fullUserModelSpec = spec.compose(
   *  userModelRequiredSpec,
   *  spec.flow(shape.expectKeys(['username', 'bestFriend'])),
   *  userModelBodySpec,
   * )
   * 
   */
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
  /**
   * Function helps to create spec fof complex object such as arrays or shapes (aka objects)
   * @function of
   * @memberof module:ego~spec
   * 
   * @arg {Object|Array} specDescriptor - Accepts object where properties' values must be spec functions
   * or array with only one item that is a spec function
   * 
   * @returns {function} - Spec function which could be used as argument
   * 
   * @example
   * 
   * import { spec } from 'egoist-js'
   * 
   * const simpleHeroSpec = spec.of({
   *  name: spec.flow(string.isString, string.isNotEmpty, any.required),
   *  abilities: spec.of([spec.flow(any.required)])
   *  address: spec.of({
   *    city: spec.flow(any.required),
   *    // pls note - spec can be complex
   *    streets: spec.of([spec.of({ zip: spec.flow(any.required) })])
   *  })
   * })
   * 
   */
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
        const specFn = LazySpec.isLazy(spec) ? spec.lazy() : spec

        if (!fp.isArray(collection)) {
          return null
        }

        for (let i = 0, l = collection.length; i < l; i += 1) {
          const value = collection[i]

          const result = specFn(value, {
            context: Context.create(collection, context, i),
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
          context: Context.create(value, context, key),
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
