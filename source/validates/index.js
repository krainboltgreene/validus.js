import {map} from "ramda"
import {compact} from "ramda-extra"

import validated from "../validated"

export default function validates (validations: ValidationsType): Function {
  return function validatesWithValidations (subject: SubjectType): ErrorsType {
    return compact(map(validated(subject))(validations))
  }
}
