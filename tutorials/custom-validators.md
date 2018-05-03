<!-- 1. [Simple Custom Validator](#simpleCustomValidator)
2. [Custom Validator with arguments](#customValidatorWithArgs) -->
1. [Cross Field Validator](#crossValidator)

Example **<a name="crossValidator"></a>Cross Field Validator**
```
import fp from 'lodash/fp'
import { toValidatorWithArgs } from 'egoist-js'

const MY_CUSTOM_ERROR_KEY = 'my.custom.error.key'

const crossValidator = toValidatorWithArgs(MY_CUSTOM_ERROR_KEY, (propToCheck, value, { context }) => {
  const propValue = fp.get(`current.${propToCheck}`, context)
  return value === propValue
})
```