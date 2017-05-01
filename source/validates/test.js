/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type, no-magic-numbers */
import {test} from "tap"
import {pathSatisfies} from "ramda"
import {both} from "ramda"
import {lt} from "ramda"
import isPresent from "@unction/ispresent"
import isPopulated from "@unction/ispopulated"
import endsWith from "@unction/endswith"
import lacksText from "@unction/lackstext"

import validates from "./index"

const validations = {
  email: {
    "You must have an email": pathSatisfies(isPopulated, ["attributes", "email"]),
    "You must be a Google Employee": pathSatisfies(both(isPopulated, endsWith("@google.com")), ["attributes", "email"]),
    "You can't have suffix address": pathSatisfies(both(isPopulated, lacksText("+")), ["attributes", "email"]),
  },
  name: {"You must have a name": pathSatisfies(isPopulated, ["attributes", "name"])},
  age: {
    "You must have an age": pathSatisfies(isPresent, ["attributes", "age"]),
    "You must be older than 30": pathSatisfies(both(isPresent, lt(30)), ["attributes", "age"]),
  },
  friends: {"You must have at least one friend": pathSatisfies(both(isPresent, isPopulated), ["attributes", "friends"])},
}

test(({include, end}) => {
  const subject = {
    type: "accounts",
    attributes: {
      email: "kurtis+1@amazon.com",
      name: "",
      age: 24
    }
  }

  include(
    validates(validations)(subject),
    {
      email: [
        "You must be a Google Employee",
        "You can't have suffix address"
      ],
      name: ["You must have a name"],
      age: ["You must be older than 30"],
      friends: ["You must have at least one friend"],
    }
  )
  end()
})
