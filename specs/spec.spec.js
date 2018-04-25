/* eslint-disable no-unused-expressions */
import should from 'should'

import { required } from '../lib/validators/any'
import { isNotEmpty } from '../lib/validators/string'
import ERROR_KEYS from '../lib/defaults/keys'

import spec from '../lib/spec'

describe('Spec Creators', () => {
  it('should create a composed function in order to validate value', () => {
    spec.flow(isNotEmpty, require).should.be.a.Function

    spec.of({
      key1: spec.flow(isNotEmpty, required),
      key2: spec.flow(isNotEmpty, required),
    }).should.be.a.Function
  })

  it('should return error description if error exists, otherwise null', () => {
    const specFn = spec.flow(isNotEmpty, required)
    
    specFn(null).should.be.matchEach((it) => {
      it.result.should.be.oneOf([[ERROR_KEYS.STRING.EMPTY], [ERROR_KEYS.ANY.REQUIRED]])
      should(it.value).be.Null()
    })

    specFn('').should.be.matchEach((it) => {
      it.result.should.be.eql([ERROR_KEYS.STRING.EMPTY])
      it.value.should.be.eql('')
    })

    should(specFn('text')).be.Null()
  })

  it('should return error description if error exists for complex shapes, otherwise null', () => {
    const specFn = spec.of({
      n: spec.flow(required),
      s: spec.flow(isNotEmpty, required),
      nest: spec.of({
        ns: spec.flow(isNotEmpty, required),
      }),
    })

    should(specFn({
      n: 1,
      s: 'text',
      nest: {
        ns: 'text',
      },
    })).be.a.Null()

    specFn({
      n: 1,
      s: 'text',
      nest: {
        ns: null,
      },
    }).should.matchEach((it) => {
      it.result.should.be.oneOf([[ERROR_KEYS.STRING.EMPTY], [ERROR_KEYS.ANY.REQUIRED]])
      should(it.value).be.Null()
      it.context.key.should.be.eql('ns')
    })

    specFn({
      n: 1,
      s: '',
      nest: {
        ns: 'hello world',
      },
    }).should.matchEach((it) => {
      it.result.should.eql([ERROR_KEYS.STRING.EMPTY])
      it.value.should.be.eql('')
      it.context.key.should.be.eql('s')
    })
  })

  it('should return error description if error exists with parent context chain', () => {
    const specTrainer = {
      n: 1,
      s: 'text',
      nest0: {
        ns: 'text',
        nest1: {
          onix: 'test',
          nest2: {
            level: '',
          },
        },
      },
    }

    const specFn = spec.of({
      nest0: spec.of({
        nest1: spec.of({
          nest2: spec.of({
            level: spec.flow(isNotEmpty, required),
          }),
        }),
      }),
    })

    const keys = []
    let level = specFn(specTrainer)[0].context

    do {
      keys.push(level.key)
      level = level.parent
    } while (level)

    keys.should.be.eql(['level', 'nest2', 'nest1', 'nest0'])
  })

  it('should return only one error if option has [untilFail] flag is true', () => {
    const specFn = spec.flow(isNotEmpty, required)
    specFn(null, { untilFail: true }).length.should.be.eql(1)

    const specOfFn = spec.of({
      t1: spec.flow(isNotEmpty, required),
      t2: spec.flow(required),
    })

    specOfFn({}, { untilFail: true }).length.should.be.eql(1)
  })
})
