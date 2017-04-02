import {isEmpty} from "ramda"
import {map} from "ramda"
import {reject} from "ramda"

import validated from "../validated"

export default function validates (validations: ValidationsType): Function {
  return function validatesWithValidations (subject: SubjectType): ErrorsType {
    return reject(isEmpty, map(validated(subject), validations))
  }
}
