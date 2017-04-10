import {prop} from "ramda"

import validated from "../validated"

export default function validate (validations: ValidationsType): Function {
  return function validateWithValidations (scope: ScopeType): Function {
    const property = prop(scope)(validations)

    return function validateWithValidationsAndScope (subject: SubjectType): Array<MessageType> {
      return validated(subject)(property)
    }
  }
}
