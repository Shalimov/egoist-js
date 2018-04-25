# JS Functional Validation library
## **Docs in progress as well as work on this lib** but here is the example of what we have under the hood

**Example of `spec#flow`:**

```javascript
import {
	spec,
	validate,
	isValid,
	isInvalid
} from 'ego'

import { 
	required,
	isNotEmpty,
	isString,
	match,
	lt,
	gt,
	isNumber
} from 'ego/validators'


const desiredNumberSpec = spec.flow(
	isNumber,
	lt(20)
	gt(10)
	required,
)

const isValidNumber = isValid(desiredNumberSpec) // it returns function

console.log(
	isValidNumber(15) // or
	isValid(desiredNumberSpec)(15) // or
	isValid(desiredNumberSpec, 15)
)

const usernameSpec = spec.flow(
	isString,
	match(/^[a-zA-Z\s]+$/),
	isNotEmpty,
	required
)

const isValidUsername = isValid(usernameSpec) // it returns function

console.log(
	isValidUsername('hulio') // or
	isValidUsername(usernameSpec)('mark') // or
	isValidUsername(usernameSpec, 'twins')
)

```

**Example of `spec#of`:**
```javascript

import {
	spec,
	validate,
	isValid,
} from 'ego'

import { 
	required,
	isNotEmpty,
	isString,
	match,
	lt,
	gt,
	isNumber
} from 'ego/validators'

/*
	let's say we have a model of user with some fields
	and we want to create a validation for this user model
*/

const usernameSpec = spec.flow(
	isString,
	match(/^[a-zA-Z\s]+$/),
	isNotEmpty,
	required,
)

const userModelSpec = spec.of({
	username: usernameSpec,
	// here we have spec declaration inside or u can do it outside of declaration (pretty nice, isn't it)
	email: spec.flow(
		isString,
		isEmail,
		isNotEmpty,
		required,
	),
	// it allows unlimited nesting and circular reference to spec
	bestFriend: spec.lazy(() => userModelSpec),
})


const isValidUsermodel = isValid(userModelSpec)
const getModelErrors = validate(userModelSpec)

console.log(isValidUsermodel({ ... })) // returns the result of validation true of false

console.log(getModelErrors({ ... })) // it returns an array of errors or null if there are no errors

/*
	error is presented in array in such form:
	{
		message: 'string'
		value: any,
		path: array(string)
		args: any or array of any (for lt(10) -> args is number 10)
	}

	lt(10) is one of validators check example above
*/
```

**Example of `spec#compose`:**
```javascript

import {
	spec,
} from 'ego'

import {
	allowedKeys,
	hasKeys,
} from 'ego/validators'

const userModelSpec = spec.of({
	username: spec.flow(required),
	bestFriend: spec.lazy(() => userModelSpec),
	address: spec.of({
		city: spec.flow(required),
		country: spec.flow(required),
	})
})

const userModelFullSpec = spec.compose(
	userModelSpec,
	spec.flow(
		expectKeys(['username', 'bestFriends']),
		allowedKeys(['username', 'bestFriends']),
		required
	)
)
```