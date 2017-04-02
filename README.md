# validus

[![Greenkeeper badge](https://badges.greenkeeper.io/krainboltgreene/validus.js.svg)](https://greenkeeper.io/)

Take an iterable and ensure that the members match a set of constraints.

![Version][BADGE_VERSION]
![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]


## using

Lets say we have some account data from a form or API request:



``` javascript
const subject = {
  type: "accounts",
  attributes: {
    email: "kurtis+1@amazon.com",
    name: "",
    age: 24
  }
}
```

Consider this list of validations for a new account:

``` javascript
const validations = {
  email: {
    "You must have an email": pathSatisfies(isPresent, ["attributes", "email"]),
    "You must be a Google Employee": pathSatisfies(both(isPopulated, endsWith("@google.com")), ["attributes", "email"]),
    "You can't have suffix address": pathSatisfies(both(isPopulated, lacksText("+")), ["attributes", "email"]),
  },
  name: {
    "You must have a name": pathSatisfies(isPresent, ["attributes", "name"]),
  },
  age: {
    "You must have an age": pathSatisfies(isPresent, ["attributes", "age"]),
    "You must be older than 30": pathSatisfies(both(isPresent, lt(30)), ["attributes", "age"]),
  },
  friends: {
    "You must have at least one friend": pathSatisfies(both(isPresent, isPopulated), ["attributes", "friends"]),
  },
}
```

Now you add water:

``` javascript
validates(validations)(subject)
```

Which results in this payload:

``` javascript
{
  email: [
    "You must be a Google Employee",
    "You can't have suffix address"
  ],
  name: [
    "You must have a name"
  ],
  age: [
    "You must be older than 30"
  ],
  friends: [
    "You must have at least one friend"
  ],
}
```

You can also do partial validation, say for form inputs:

``` javascript
validates(validations)("email")(subject)
```

Which returns:

``` javascript
[
  "You must be a Google Employee",
  "You can't have suffix address"
]
```


[BADGE_TRAVIS]: https://img.shields.io/travis/krainboltgreene/validus.js.svg?maxAge=2592000&style=flat-square
[BADGE_VERSION]: https://img.shields.io/npm/v/validus.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/krainboltgreene/validus.js.svg?maxAge=2592000&style=flat-square
