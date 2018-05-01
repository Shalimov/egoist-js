# Validation Specs
Inspired by functional programming
***
Docs in progress.
However you can look at [Egoist-JS](https://shalimov.github.io/egoist-js/module-ego.html) pages

## Get started

```
yarn add egoist-js
OR
npm i egoist-js
```

**Example of what we have:**
```javascript

import {
  spec,
  validate,
  validateWithOpts,
  validateAll
  validateAllWithOpts,
  isValid,
  isInvalid,
  validators,
  toValidator,
  toValidatorWithArgs,
  ERROR_KEYS,
  ERROR_MESSAGES,
} from 'egoist-js'

const {
  any,
  number,
  string,
  shape,
} = validators

const nameSpec = spec.flow(
  string.isString,
  string.match(/^[a-zA-Z]$/),
  string.isNotEmpty,
  any.required,
)

const adultPersonModelSpec = spec.of({
  username: spec.compose(
    spec.of({
      first: nameSpec,
      last: nameSpec,
    }),
    spec.flow(any.requied)
  ),

  age: spec.flow(
    number.isNumber,
    number.gte(18),
    any.required,
  ),

  // we use lazy here because we use the same spec inside (lazy helps us with recoursive structures)
  // Here is an array of adult friends
  friends: spec.of([spec.lazy(() => adultPersonModelSpec)]),

  address: spec.of({
    city: spec.flow(
      string.isString,
      any.required,
    ),

    street: spec.flow(
      string.isString,
      any.required,
    ),
  }),
})

// isValid is curried function
const isValidAdultPerson = isValid(adultPersonModelSpec)
isValidAdultPerson({ ... }) // returns boolean value as a result

// isInvalid is curried function
const isInvalidAdultPerson = isInvalid(adultPersonModelSpec)
isInvalidAdultPerson({ ... }) // returns boolean value as a result


// validate is curried function
const validateAdultPerson = validate(adultPersonModelSpec)
validateAdultPerson({ ... }) // returns an array with only one item - first caused error description, otherwise null if there are no errors

/*
  [{
    message: 'string'
    value: any,
    path: fn -> array(string)
    args: any type of value
  }]
*/

// validateAll is curried function
const validateAllAdultPerson = validateAll(adultPersonModelSpec)
validateAllAdultPerson({ ... }) // returns an array with all error descriptions, otherwise null if there are no errors

/*
  [{
    message: 'string'
    value: any,
    path: fn -> array(string) // could be helpful for nested objects
    args: any type of value // if validator required some args they will be available here
  }, ...]
*/

// validateWithOpts is curried function
const validateAdultPerson = validateWithOpts(adultPersonModelSpec, {
  customMessages: {
    [ERROR_KEYS.ANY.REQUIRED]: ({ label }) => `${label} is mandatory`,
    'or.your.custom.error.key': ({ label, path, args, value }) => ...,
  }
})
validateAdultPerson({ ... })

// The same u can find for #validateAll

// validateAllWithOpts is curried function
const validateAllAdultPerson = validateAllWithOpts(adultPersonModelSpec, {
  customMessages: {
    [ERROR_KEYS.ANY.REQUIRED]: ({ label }) => `${label} is mandatory`,
    'or.your.custom.error.key': ({ label, path, args, value }) => ...,
  }
})

validateAllAdultPerson({ ... })

// ------------------------------

// also u can redefind default messages by creation your own validate functions

const customSetOfMessages = Object.create(ERROR_MESSAGES, {
  [ERROR_KEYS.ANY.REQUIRED]: () => 'new default message for required',
  'custom.validator.error.key': () => 'boom! my own validation message',
})

// it returns tuple with new #validate and #validateWithOpts functions
const [cvalidate, cvalidateWithOpts] = createValidateFunction({ 
  messageFuncs: customSetOfMessages,
  untilFail: true | false // this option tells to stop validation process if we face an error and the return error
  /*
    validateAll <- untilFail: false,
    validate <- untilFail: true,
  */
})

cvalidate(spec.flow(any.required), null) // [{ message, ...}] -> new default message for required


//-----------------------------------
// if u want to create a custom validation func we provide u with a few ways how to do it

// first of we suggest u to use simple helpers for lig
const MY_CUSTOM_ERROR_KEY = 'my.custom.error.key'
const predicate = (value, { context }) => value !== 2
const customValidator = toValidator(MY_CUSTOM_ERROR_KEY, predicate)

const notEqualTwo = validateWithOpts(spec.flow(customValidator), {
  customMessages: {
    [MY_CUSTOM_ERROR_KEY]: () => 'aaaaaa, it equals two',
  }
})

const MY_CUSTOM_ERROR_KEY_2 = 'my.custom.error.key'
const predicateWA = (forbiddenValue, value, { context }) => value !== forbiddenValue

const customValidatorWithArgs = toValidatorWithArgs(MY_CUSTOM_ERROR_KEY_2, predicateWA)


const notEqualSeven = validateWithOpts(
  spec.flow(customValidatorWithArgs(7)), {
  customMessages: {
    [MY_CUSTOM_ERROR_KEY_2]: ({ args }) => `aaaaaa, it equals ${args}`,
  }
})


// -------------------------------------
// if u don't want to use helprs u should create ur validation function by following simple rule

const simpelValidationFunction = (value, { context }) => {
  if (value) {
    return null
  }

  return ['error.key']
}

// or if ur validator has args

const simpelValidationFunctionWithArg = arg => (value, { context }) => {
  if (value) {
    return null
  }

  return ['error.key', arg]
}

```
