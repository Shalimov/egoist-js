import should from 'should'

import { freeze, toValidator, toValidatorWithArgs } from '../lib/utils'

describe('Utils Module Spec', () => {
	it('should freeze node and subnodes of object', () => {
		const test = {
			a: 1,
			b: 2,
			c: {
				d: 3,
				g: {
					f: 4,
				},
			},
		}

		const frozenTest = freeze(test)

		should.throws(() => { frozenTest.a = 2 })
		should.throws(() => { frozenTest.c = 2 })
		should.throws(() => { frozenTest.c.d = 2 })
		should.throws(() => { frozenTest.c.g = 2 })
		should.throws(() => { frozenTest.c.g.f = 2 })
	})

	it('should create a validation function that returns [key] based on result of predicate', () => {
		const key = 'hello.world'
		const helloWorldValidator = toValidator(key, v => Boolean(v))

		helloWorldValidator(false).should.be.eql([key])
		should(helloWorldValidator(true)).be.Null()
	})

	it('should create a validation function with args that returns [key, args] based on result of predicate', () => {
		const key = 'hello.world'
		const args = [1, 2, 3, 4, 5]
		const helloWorldValidatorWithArgs = toValidatorWithArgs(key, (args, v) => Boolean(v))

		helloWorldValidatorWithArgs(args)(false).should.be.eql([key, args])
		should(helloWorldValidatorWithArgs(args)(true)).be.Null()
	})
})
