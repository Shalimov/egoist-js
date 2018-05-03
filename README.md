# Validation Specs
Designed with functional programming in mind
***
Docs in progress:
However you can look at [Egoist-JS](https://shalimov.github.io/egoist-js) pages

Guides:
- [Custom Validators](https://shalimov.github.io/egoist-js/tutorial-custom-validators.html)

## Getting Started

- `yarn add egoist-js` or `npm i egoist-js`
- to use version without deps `import * as ego from 'egoist-js`
- to work with uncompiled version you can `import * as ego from 'egoist-js/lib'` (nb: it requires [lodash](https://github.com/lodash/lodash/wiki/FP-Guide))

```javascript
import { spec, validate, validators } from 'egoist-js'

const {
  any,
  string,
  number,
  shape,
} = validators

const userModelSpec = spec.compose(
  spec.flow(any.requied),
  spec.of({
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
)

// you can create separate function to validate user
const validateUser = validate(userModelSpec)
// then use it 

const someUserData = {...}
console.log(validateUser(someUserData))

// OR

console.log(validate(userModelSpec, someUserData))
```
