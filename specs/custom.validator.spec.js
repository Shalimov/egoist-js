import should from 'should'

import {
  spec,
  validators,
  validateWithOpts,
  toValidatorWithArgs,
} from '../lib'

describe('Custom Validator Spec', () => {
  it('should create cross validator for object', () => {
    const customErrorKey = 'custom.key'
    const crossPropertyEqual = toValidatorWithArgs(
      customErrorKey,
      (crossPropName, value, { context }) => {
        const node = context.current
        return value === node[crossPropName]
      }
    )

    const { any } = validators
    const userSpec = spec.of({
      password: spec.flow(any.required),
      confirmPassword: spec.flow(crossPropertyEqual('password'), any.required),
    })

    const validateUser = validateWithOpts(userSpec, {
      customMessages: {
        [customErrorKey]: ({ label }) => `${label} should match password field`,
      },
    })

    should(validateUser({
      password: '123123qQ',
      confirmPassword: '123123qQ',
    })).be.Null()

    should(validateUser({
      password: '123123q',
      confirmPassword: '123123qQ',
    })).matchEach((it) => {
      it.message.should.be.eql('confirmPassword should match password field')
    })
  })
})
