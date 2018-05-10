Section gives you an answer how to change a label for validation messages in the following case:

```javascript
import { spec, validators, validate } from 'egoist-js'

const { any } = validators

const specFn = spec.compose(
	spec.flow(any.required),
	spec.of({
		name: spec.flow(any.required),
	})
)
const validateAny = validate(specFn)

const reasons = validateAny(null)
// => [{ message: 'value is required', ... }]
```

The problem here is we treat the data as value but in the context it would be good to have something more specific, so
here is a way how to handle that

```javascript

// curried function, it may accept second param (specFn)
const asUserFlow = spec.designate('user')

// first way
const specFn = spec.compose(
	asUserFlow(spec.flow(any.required)), // returns named spec
	spec.of({
		name: spec.flow(any.required),
	})
)

// second way
const specFn = spec.compose(
	spec.flow(any.required),
	spec.of({
		name: spec.flow(any.required),
	})
)

const namedSpecFn = asUserFlow(specFn) 
// returns spec but named

const validateAny = validate(namedSpecFn)

const reasons = validateAny(null)
// => [{ message: 'user is required', ... }]
```