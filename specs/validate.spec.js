import should from 'should'

import {
  spec,
  validators,
  isValid,
  isInvalid,
  validate,
  validateWithOpts,
  validateAll,
  validateAllWithOpts,
  ERROR_KEYS,
} from '../lib'

describe('Validate Module Spec', () => {
  const createUserModel = (username, age, city, hasAddressBlock = true) => {
    const addressBlock = hasAddressBlock ? { address: { city } } : {}

    return {
      username,
      age,
      ...addressBlock,
    }
  }

  const adultUserModelSpec = spec.compose(
    spec.flow(validators.any.required),
    spec.of({
      username: spec.flow(
        validators.string.isString,
        validators.string.match(/^[a-zA-Z\s]+$/),
        validators.string.isNotEmpty,
        validators.any.required,
      ),
      age: spec.flow(
        validators.number.isNumber,
        validators.number.ge(18),
        validators.any.required,
      ),
      address: spec.of({
        city: spec.flow(
          validators.string.isString,
          validators.string.isNotEmpty,
          validators.any.required,
        ),
      }),
    })
  )

  describe('#isInvalid function Spec', () => {
    it('should return true if value is invalid, otherwise false', () => {
      const isInvalidAdultModel = isInvalid(adultUserModelSpec)

      isInvalidAdultModel(createUserModel('Mark', 18, 'New-York')).should.be.False()
      isInvalidAdultModel(createUserModel(null, 18, 'New-York')).should.be.True()
      isInvalidAdultModel(createUserModel('Mark', 17, 'New-York')).should.be.True()
      isInvalidAdultModel(createUserModel('Mark', 17, null)).should.be.True()
      isInvalidAdultModel(createUserModel('Mark', 17, null, false)).should.be.True()
    })
  })

  describe('#isValid function Spec', () => {
    it('should return true if value is valid, otherwise false', () => {
      const isInvalidAdultModel = isValid(adultUserModelSpec)

      isInvalidAdultModel(createUserModel('Mark', 18, 'New-York')).should.be.True()
      isInvalidAdultModel(createUserModel(null, 18, 'New-York')).should.be.False()
      isInvalidAdultModel(createUserModel('Mark', 17, 'New-York')).should.be.False()
      isInvalidAdultModel(createUserModel('Mark', 17, null)).should.be.False()
      isInvalidAdultModel(createUserModel('Mark', 17, null, false)).should.be.False()
    })
  })

  describe('#validate function Spec', () => {
    it('should return only first error description if value is invalid, otherwise null', () => {
      const validateAdultModel = validate(adultUserModelSpec)

      should(validateAdultModel(createUserModel('Mark', 18, 'New-York'))).be.Null()
      validateAdultModel(undefined).should.matchEach((it) => {
        it.message.should.be.eql('value is required')
        should(it.value).be.Undefined()
      })

      validateAdultModel(createUserModel(null, 17, 'New-York')).should.matchEach((it) => {
        it.message.should.be.eql('username is required')
        should(it.value).be.Null()
      })

      validateAdultModel(createUserModel('Mark', 17, 'New-York')).should.matchEach((it) => {
        it.message.should.be.eql('age should be greater or equal than 18')
        should(it.value).be.eql(17)
      })

      validateAdultModel(createUserModel('Mark', 18, null)).should.matchEach((it) => {
        it.message.should.be.eql('city is required')
        should(it.value).be.Null()
      })

      validateAdultModel(createUserModel('Mark', 18, null, false)).should.matchEach((it) => {
        it.message.should.be.eql('city is required')
        should(it.value).be.Undefined()
      })
    })

    it('should use custom error messages if it is defined for #withOpts, otherwise default messages', () => {
      const adultUserValidate = validateWithOpts(adultUserModelSpec, {
        customMessages: {
          [ERROR_KEYS.ANY.REQUIRED]: () => 'field is mandatory',
        },
      })

      adultUserValidate(createUserModel('Mark', null, null)).should.matchEach((it) => {
        it.message.should.be.eql('field is mandatory')
      })
    })
  })

  describe('#validateAll function Spec', () => {
    it('should return all error descriptions if value is invalid, otherwise null', () => {
      const validateAllAdultModel = validateAll(adultUserModelSpec)

      should(validateAllAdultModel(createUserModel('Mark', 18, 'New-York'))).be.Null()

      validateAllAdultModel(undefined).should.matchEach((it) => {
        it.message.should.be.oneOf([
          'value is required',
          'username is required',
          'age is required',
          'age should be greater or equal than 18',
          'city is required',
        ])
        should(it.value).be.Undefined()
      })

      validateAllAdultModel(createUserModel('Mark', 17, null)).should.matchEach((it) => {
        it.message.should.be.oneOf([
          'age should be greater or equal than 18',
          'city is required',
        ])
        should(it.value).be.oneOf([null, 17])
      })

      validateAllAdultModel(createUserModel(null, 17, null)).should.matchEach((it) => {
        it.message.should.be.oneOf([
          'username is required',
          'age should be greater or equal than 18',
          'city is required',
        ])
        should(it.value).be.oneOf([null, 17])
      })

      validateAllAdultModel(createUserModel(null, 17, null, false)).should.matchEach((it) => {
        it.message.should.be.oneOf([
          'username is required',
          'age should be greater or equal than 18',
          'city is required',
        ])

        should(it.value).be.oneOf([null, undefined, 17])
      })
    })

    it('should use custom error messages if it is defined for #allWithOpts, otherwise default messages', () => {
      const adultUserValidate = validateAllWithOpts(adultUserModelSpec, {
        customMessages: {
          [ERROR_KEYS.ANY.REQUIRED]: () => 'field is mandatory',
        },
      })

      adultUserValidate(createUserModel('Mark', null, null)).should.matchEach((it) => {
        it.message.should.be.eql('field is mandatory')
      })
    })
  })

  describe('labeling Spec', () => {
    it('should use alias instead of key for error messages which were set by using spec.designate', () => {
      const simpleSpec = spec.of({
        username: spec.designate(
          'User Name',
          spec.flow(validators.any.required),
        ),
      })

      const metainfos = simpleSpec({})

      metainfos.should.matchEach((it) => {
        it.context.alias.should.be.eql('User Name')
        it.context.key.should.be.eql('username')
        it.context.alias.should.not.be.eql(it.context.key)
      })

      const validationInfo = validate(simpleSpec, {})

      validationInfo.should.matchEach((it) => {
        it.message.should.be.eql('User Name is required')
      })
    })
  })
})
