import mapValues from "@unction/mapvalues"
import compact from "@unction/compact"

import validated from "../validated"

export default function validates (validations: ValidationsType): Function {
  return function validatesWithValidations (subject: SubjectType): ErrorsType {
    return compact(mapValues(validated(subject))(validations))
  }
}
