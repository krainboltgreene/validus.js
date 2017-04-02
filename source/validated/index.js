import {pipe} from "ramda"
import {map} from "ramda"
import {call} from "ramda"
import {flip} from "ramda"
import {equals} from "ramda"
import {keys} from "ramda"
import {reject as except} from "ramda"

const thrush = flip(call)

export default function validated (subject: SubjectType): Function {
  return pipe(map(thrush(subject)), except(equals(true)), keys)
}
