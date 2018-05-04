<!-- 1. [Simple Custom Validator](#simpleCustomValidator)
2. [Custom Validator with arguments](#customValidatorWithArgs) -->
1. [Cross Field Validator](#crossValidator)
2. [Cross Field Validator Without Helpers](#crossValidatorWithoutHelpers)

Example **<a name="crossValidator"></a>Cross Field Validator**
```
import fp from 'lodash/fp'
import { spec, validators, validateWithOpts, toValidatorWithArgs } from 'egoist-js'

const MY_CUSTOM_ERROR_KEY = 'my.custom.error.key'

const propEqualProp = toValidatorWithArgs(MY_CUSTOM_ERROR_KEY, (propToCheck, value, { context }) => {
  const propValue = fp.get(`current.${propToCheck}`, context)
  return value === propValue
})

const userSpec = spec.of({
  name: spec.flow(any.required),
  password: spec.flow(any.required),
  confirmPassword: spec.flow(
    propEqualProp('password'),
    any.required
  ),
})

const validateUser = validate(userSpec, {
  customMessages: {
    [MY_CUSTOM_ERROR_KEY]: ({ label }) => `${label} should match password`,
  }
})

const result = validateUser({
  name: 'John Doe',
  password: '123123qQ',
  confirmPassword: 'should-fail',
})

console.log(result)
/*
[{
  value: 'should-fail',
  args: 'password',
  path: ['confirmPassword'],
  message: 'confirmPassword should match password',
}]
*/
```

Example **<a name="crossValidatorWithoutHelpers"></a>Cross Field Validator Without Helper**
```
import { spec, validators, validateWithOpts } from 'egoist-js'

const MY_CUSTOM_ERROR_KEY = 'my.custom.error.key'

const allowedToBeSelected = (property) => (value, { context }) => {
  const ctxPropValue = context.current[property]
  if (ctxPropValue === 'zoom' && value === 'out') {
    return null
  }

  // second element of tuple you will find out in error reason object (args prop)
  return [MY_CUSTOM_ERROR_KEY, [property, ctxPropValue]]
} 

const someStuffSpec = spec.of({
  baseType: spec.flow(any.required),
  derivedType: spec.flow(
    allowedToBeSelected('baseType'),
    any.required
  ),
})

const validateSomeStuff = validate(userSpec, {
  customMessages: {
    [MY_CUSTOM_ERROR_KEY]: ({ label, args: [prop ,propValue], value }) => 
      `${label} should be 'out' and ${prop} should be 'zoom' instead of '${propValue}'`,
  }
})

const result = validateSomeStuff({
  baseType: 'term',
  derivedType: 'zsh'
})

console.log(result)
/*
[{
  value: 'zsh',
  args: ['baseType', 'term'],
  path: ['derivedType'],
  message: 'derivedType should be \'out\' and baseType should be \'zoom\' instead of \'term\'',
}]
*/
```