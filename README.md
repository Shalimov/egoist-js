# Validation 
## Small size, no deps, best validation experience!
Designed with functional programming in mind
***
Docs in progress:
However you can look at [Egoist-JS](https://shalimov.github.io/egoist-js) pages

## Getting Started

- `yarn add egoist-js` or `npm i egoist-js`
- to use version without deps `import * as ego from 'egoist-js`
- to work with uncompiled version you can `import * as ego from 'egoist-js/lib'`

```javascript
import { spec, validate, validateAll, validators } from 'egoist-js'

const {
  any,
  string,
  number,
  shape,
} = validators

const userModelDetailedSpec = spec.of({
  name: spec.flow(
    string.isString,
    string.match(/^[A-Z][a-z]+\s[A-Z][a-z]+$/),
    string.isNotEmpty,
    any.required,
  ),
  age: spec.flow(
    number.isNumber,
    number.ge(18),
    any.required,
  )
})

const userModelSpec = spec.compose(
  spec.flow(any.requied),
  userModelDetailedSpec
)

// you can create separate function to validate user
const validateUser = validate(userModelSpec)
// then use it 

console.log(validateUser(null))
// [{ message: 'value is required', args: undefined, value: null, path: [] }]

// OR

const someUserData = {
  name: 'Igor Shalimov',
  age: 10
}

console.log(validate(userModelSpec, someUserData))
// [{ message: 'age should be greater or equal than 18', args: 18, value: 10, path: ['age'] }]

const adultUserSpec2 = spec.compose(
  spec.designate('user', spec.flow(any.required)),
  userModelDetailedSpec
)

validate(adultUserSpec2, null)
// [{ message: 'user is required', args: undefined, value: null, path: [] }]


```
