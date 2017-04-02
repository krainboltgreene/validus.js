/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */
import {test} from "tap"
import {pathSatisfies} from "ramda"
import {both} from "ramda"
import {isPopulated} from "ramda-extra"
import {endsWith} from "ramda-extra"
import {lacksText} from "ramda-extra"

import validate from "./index"

const validations = {
  email: {
    "You must have an email": pathSatisfies(isPopulated, ["attributes", "email"]),
    "You must be a Google Employee": pathSatisfies(both(isPopulated, endsWith("@google.com")), ["attributes", "email"]),
    "You can't have suffix address": pathSatisfies(both(isPopulated, lacksText("+")), ["attributes", "email"]),
  },
}

test(({include, end}) => {
  const scope = "email"
  const subject = {
    type: "accounts",
    attributes: {
      email: "kurtis+1@amazon.com",
      name: "",
      age: 24
    }
  }

  include(validate(validations)(scope)(subject), ["You must be a Google Employee", "You can't have suffix address"])
  end()
})
